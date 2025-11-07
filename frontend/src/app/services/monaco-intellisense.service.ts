const iframeId = `intellisage-${generateId()}`;

export class MonacoIntelliSenseService {
  private monaco: any = null;
  private lastCompletions: Map<any, any> | null = null;
  private intellisage: any = null;
  private model: any = null;
  private debouncedResolveCompletionItem: any;
  private debouncedProvideCompletionItems: any;
  private debouncedGetDiagnosticsAsync: any;

  constructor() {
    this.debouncedResolveCompletionItem = debounce(
      this.resolveCompletionItem.bind(this),
      250
    );
    this.debouncedProvideCompletionItems = debounce(
      this.provideCompletionItems.bind(this),
      250
    );
    this.debouncedGetDiagnosticsAsync = debounce(
      this.getDiagnosticsAsync.bind(this),
      2000
    );
  }

  async initialize(monaco: any, model: any, iframeUrl = 'https://intellisage.vercel.app/') {
    this.monaco = monaco;
    this.model = model;
    
    if (!this.monaco) {
      throw new Error('Monaco instance was not defined');
    }
    if (!this.model) {
      throw new Error('Monaco model was not defined');
    }

    let iframe = document.getElementById(iframeId) as HTMLIFrameElement;
    if (!iframe) {
      const initPromise = new Promise<void>(res => {
        const listener = (event: MessageEvent) => {
          if (event.data?.intellisageInitialized) {
            res();
            window.removeEventListener('message', listener);
          }
        };
        window.addEventListener('message', listener);
      });

      iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      iframe.id = iframeId;
      iframe.width = '0';
      iframe.height = '0';
      iframe.src = iframeUrl;
      iframe.title = 'IntelliSage';

      await new Promise<void>((res, rej) => {
        iframe.onload = () => res();
        iframe.onerror = () => rej(new Error('Failed to load IntelliSage iframe'));
      });

      await initPromise;
    }

    this.intellisage = (method: string, ...args: any[]) => {
      if (!iframe?.contentWindow) {
        return Promise.resolve(null);
      }
      return new Promise(res => {
        const id = generateId();
        let handled = false;

        function handleMessage(event: MessageEvent) {
          if (
            event.data?.intellisage &&
            event.data.intellisage.id === id &&
            !handled
          ) {
            window.removeEventListener('message', handleMessage);
            res(event.data.intellisage.payload);
          }
        }

        setTimeout(() => {
          if (!handled) {
            window.removeEventListener('message', handleMessage);
            res(null);
            handled = true;
          }
        }, 10000);

        window.addEventListener('message', handleMessage);
        iframe.contentWindow?.postMessage(
          {
            intellisage: {
              method: method,
              args: args,
              id: id,
            },
          },
          '*'
        );
      });
    };

    this.debouncedGetDiagnosticsAsync(this.model.getValue());
    this.model.onDidChangeContent(() => {
      this.debouncedGetDiagnosticsAsync(this.model.getValue());
    });

    monaco.languages.registerCompletionItemProvider('csharp', {
      triggerCharacters: ['.'],
      resolveCompletionItem: (_model: any, _position: any, item: any) => {
        return this.debouncedResolveCompletionItem(item);
      },
      provideCompletionItems: (model: any, position: any, context: any) => {
        return this.debouncedProvideCompletionItems(model, position, context);
      },
    });

    monaco.languages.registerSignatureHelpProvider('csharp', {
      signatureHelpTriggerCharacters: ['('],
      provideSignatureHelp: (model: any, position: any) => {
        return this.provideSignatureHelp(model, position);
      },
    });

    monaco.languages.registerHoverProvider('csharp', {
      provideHover: (model: any, position: any) => {
        return this.provideHover(model, position);
      },
    });
  }

  dispose() {}

  async getDiagnosticsAsync(code: string) {
    const diagnostics = await this.intellisage('GetDiagnosticsAsync', code);
    if (diagnostics) {
      this.setDiagnostics(diagnostics);
    }
  }

  async provideCompletionItems(model: any, position: any, context: any) {
    const request: any = this._createRequest(position);
    request.CompletionTrigger = context.triggerKind + 1;
    request.TriggerCharacter = context.triggerCharacter;

    try {
      const code = model.getValue();
      const response = await this.intellisage(
        'GetCompletionAsync',
        code,
        request
      );
      if (!response) {
        return { suggestions: [] };
      }
      const mappedItems = response.items.map((item: any) =>
        this._convertToVscodeCompletionItem(item)
      );

      const lastCompletions = new Map();

      for (let i = 0; i < mappedItems.length; i++) {
        lastCompletions.set(mappedItems[i], response.items[i]);
      }

      this.lastCompletions = lastCompletions;

      return { suggestions: mappedItems };
    } catch (error) {
      console.warn('IntelliSense error:', error);
      return { suggestions: [] };
    }
  }

  async resolveCompletionItem(item: any) {
    const lastCompletions = this.lastCompletions;
    if (!lastCompletions) {
      return item;
    }

    const lspItem = lastCompletions.get(item);
    if (!lspItem) {
      return item;
    }

    const request = { Item: lspItem };
    try {
      const response = await this.intellisage(
        'GetCompletionResolveAsync',
        request
      );
      if (!response) {
        return undefined;
      }
      return this._convertToVscodeCompletionItem(response.item);
    } catch (error) {
      console.warn('Error resolving completion:', error);
      return item;
    }
  }

  async provideSignatureHelp(model: any, position: any) {
    const req = this._createRequest(position);
    try {
      const code = model.getValue();
      const res = await this.intellisage('GetSignatureHelpAsync', code, req);

      if (!res) {
        return undefined;
      }

      const ret: any = {
        signatures: [],
        activeSignature: res.activeSignature,
        activeParameter: res.activeParameter,
      };

      for (const signature of res.signatures) {
        const signatureInfo: any = {
          label: signature.label,
          documentation: signature.structuredDocumentation.summaryText,
          parameters: [],
        };

        ret.signatures.push(signatureInfo);

        for (const parameter of signature.parameters) {
          const parameterInfo = {
            label: parameter.label,
            documentation: this._getParameterDocumentation(parameter),
          };

          signatureInfo.parameters.push(parameterInfo);
        }
      }

      return {
        value: ret,
        dispose: () => {},
      };
    } catch (error) {
      return undefined;
    }
  }

  async provideHover(_document: any, position: any) {
    const request = this._createRequest(position);
    try {
      const response = await this.intellisage('GetQuickInfoAsync', request);
      if (!response || !response.markdown) {
        return undefined;
      }

      return {
        contents: [
          {
            value: response.markdown,
          },
        ],
      };
    } catch (error) {
      return undefined;
    }
  }

  setDiagnostics(diagnostics: any[]) {
    diagnostics.forEach((diagnostic) => {
      diagnostic.startLineNumber = diagnostic.start.line + 1;
      diagnostic.startColumn = diagnostic.start.character + 1;

      diagnostic.endLineNumber = diagnostic.end.line + 1;
      diagnostic.endColumn = diagnostic.end.character + 1;
    });

    this.monaco.editor.setModelMarkers(this.model, 'intellisage', diagnostics);
  }

  _getParameterDocumentation(parameter: any) {
    const summary = parameter.documentation;
    if (summary && summary.length > 0) {
      const paramText = `**${parameter.name}**: ${summary}`;
      return {
        value: paramText,
      };
    }

    return '';
  }

  _convertToVscodeCompletionItem(omnisharpCompletion: any) {
    const docs = omnisharpCompletion.documentation;

    const mapRange = (edit: any) => {
      const newStart = {
        lineNumber: edit.startLine + 1,
        column: edit.startColumn + 1,
      };
      const newEnd = {
        lineNumber: edit.endLine + 1,
        column: edit.endColumn + 1,
      };
      return {
        startLineNumber: newStart.lineNumber,
        startColumn: newStart.column,
        endLineNumber: newEnd.lineNumber,
        endColumn: newEnd.column,
      };
    };

    const mapTextEdit = (edit: any) => {
      return {
        range: mapRange(edit),
        text: edit.NewText
      };
    };

    const additionalTextEdits = omnisharpCompletion.additionalTextEdits?.map(
      mapTextEdit
    );

    const newText =
      omnisharpCompletion.textEdit?.newText ?? omnisharpCompletion.insertText;
    const insertText = newText;

    const insertRange = omnisharpCompletion.textEdit
      ? mapRange(omnisharpCompletion.textEdit)
      : undefined;

    return {
      label: omnisharpCompletion.label,
      kind: omnisharpCompletion.kind - 1,
      detail: omnisharpCompletion.detail,
      documentation: {
        value: docs,
      },
      commitCharacters: omnisharpCompletion.commitCharacters,
      preselect: omnisharpCompletion.preselect,
      filterText: omnisharpCompletion.filterText,
      insertText: insertText,
      range: insertRange,
      tags: omnisharpCompletion.tags,
      sortText: omnisharpCompletion.sortText,
      additionalTextEdits: additionalTextEdits,
      keepWhitespace: true,
    };
  }

  _createRequest(position: any) {
    return {
      Line: position.lineNumber - 1,
      Column: position.column - 1,
    };
  }
}

function generateId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

function debounce(func: Function, delay: number) {
  let debounceTimer: any;
  return function (...args: any[]) {
    clearTimeout(debounceTimer);
    return new Promise((resolve, reject) => {
      debounceTimer = setTimeout(() => {
        try {
          resolve(func.apply(this, args));
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}
