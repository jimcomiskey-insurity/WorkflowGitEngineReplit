import { Injectable } from '@angular/core';
import loader from '@monaco-editor/loader';
import type { Monaco } from '@monaco-editor/loader';

@Injectable({
  providedIn: 'root'
})
export class MonacoService {
  private monacoPromise: Promise<Monaco> | null = null;
  private monacoInstance: Monaco | null = null;

  constructor() {
    loader.config({
      paths: {
        vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs'
      }
    });
  }

  async getMonaco(): Promise<Monaco> {
    if (this.monacoInstance) {
      return this.monacoInstance;
    }

    if (!this.monacoPromise) {
      this.monacoPromise = loader.init().then(monaco => {
        if (!monaco) {
          throw new Error('Failed to load Monaco Editor from CDN');
        }
        this.monacoInstance = monaco;
        console.log('Monaco Editor loaded successfully');
        return monaco;
      });
    }

    return this.monacoPromise;
  }
}
