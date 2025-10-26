import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

import _ from 'lodash';
import { Observable, throwError } from 'rxjs';

import { AppMessage, GlobalMessages } from '@Services/global-messages';
import { LoadingService } from '@Services/loading.service';
import { LoggingService } from '@Services/logging.service';

import { BaseModel, IModelValidationError, ITypedServiceResponse } from '@Core/models/model';
import { HttpHeaderNames } from '@Core/enums/http-header-names';
import { DataContext } from '@Core/contexts/data-context';
import { UserInteractionTypes } from '@Core/enums/user-interaction-type.enum';

import * as fileSaver from 'file-saver';
import { environment } from 'src/environments/environment';

class Response extends HttpResponse<any> { }

export abstract class BaseService {

    protected static baseUrl: string = "";

    /* Number of milliseconds to keep the error message on the screen. (0 = wait to be dismissed) */
    protected readonly errorMessageTimeout: number = 0;

    constructor(
        protected globalMessages: GlobalMessages,
        protected loggingService: LoggingService,
        protected loadingService: LoadingService
    ) {
        BaseService.baseUrl = environment.applicationEndpoint;
    }

    handleError(error: any, filterModelPaths: string[] = null): void {
        var err: { Errors: any; error: string; };

        if (error && error.error) {
            err = error.error;
        }
        else {
            try {
                err = error.json();
            } catch (exception) { }
        }

        if (err && err.Errors) {
            _.forEach(err.Errors, e => {
                let displayError = true;
                if (filterModelPaths) {
                    let modelError = e as IModelValidationError;
                    if (modelError && modelError.Path
                        && _.find(filterModelPaths, p => p === modelError.Path)) {
                        displayError = false;
                    }
                }
                if (displayError && this.globalMessages) {
                    var message = BaseService.convertCommonErrors(e);
                    this.loggingService.logException(new Error(message));
                    this.globalMessages.Add(new AppMessage((message), 'danger', this.errorMessageTimeout));
                }
            });
        }
        else if (err && err.error && this.globalMessages) {
            this.loggingService.logException(new Error(err.error));
            this.globalMessages.Add(new AppMessage(err.error, 'danger', this.errorMessageTimeout));
        }
        else if (this.globalMessages) {
            this.loggingService.logException(error);
            this.globalMessages.Add(new AppMessage(error, 'danger', this.errorMessageTimeout));
        }

        this.loadingService.loading.next(false); //  Ensure the loading flag is cleared as the api call has resolved
        this.loggingService.logInfo('An error occurred'); // for debug purposes only
    }

    public static convertCommonErrors(error: any): string {
        var message = error?.Message;

        if (message == 'Entity with value already exists' && error?.Data) {
            var data = error.Data;
            if (data.ClassName && data.PropertyName && data.PropertyValue) {
                message = data.ClassName + " with a " + data.PropertyName + " of '" + data.PropertyValue + "' already exists.";
            }
        }

        return message;
    }

    handleHttpError(error: HttpErrorResponse) {
        const self = this;
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            this.loggingService.logException(error);
            this.loggingService.logInfo('An error occurred:' + error.error.message);
        } else {
            if (error.error?.Errors) {
                _.forEach(error.error.Errors, e => {
                    if (self.globalMessages) {
                        this.loggingService.logException(new Error(e.Message));
                        self.globalMessages.Add(new AppMessage((e.Message ? e.Message : e), 'danger', this.errorMessageTimeout));
                    }
                });
            }
        }
        // return an observable with a user-facing error message
        return throwError(() => new Error('Something bad happened; please try again later.'));
    };

    public handleNormalGetRequest<T extends BaseModel>(expectedType: new () => T, 
        request: Observable<Response | HttpResponse<ITypedServiceResponse<T>> | ITypedServiceResponse<T>>, 
        context: DataContext) {
        this.handleNonDeleteRequest(expectedType, request, context);
    }

    public handleNormalPostPutRequest<T extends BaseModel>(expectedType: new () => T,
        request: Observable<Response | HttpResponse<ITypedServiceResponse<T>> | ITypedServiceResponse<T>>, 
        context: DataContext) {
        this.handleNonDeleteRequest(expectedType, request, context);
    }

    private handleNonDeleteRequest<T extends BaseModel>(expectedType: new () => T, 
        request: Observable<Response | HttpResponse<ITypedServiceResponse<T>> | ITypedServiceResponse<T>>, 
        context: DataContext) {
        const self = this;
        request.subscribe({
            next: (response) => {
                context.loadApiResponseModels(expectedType, response);
            },
            error: (error) => {
                self.handleError(error)
            }
        });
    }

    public handleNormalDeleteRequest<T extends BaseModel>(expectedType: new () => T, 
        request: Observable<Response | HttpResponse<ITypedServiceResponse<T>> | ITypedServiceResponse<T>>, 
        item: string | BaseModel, 
        context: DataContext) {
        const self = this;
        request.subscribe({
            next: (response: any) => {
                context.remove(item);
            },
            error: (error) => {
                self.handleError(error)
            }
        });
    }

    // Requests where we don't do anything with the response except checking for errors
    public handleRequestWithoutResponse(request: Observable<Response>) {
        const self = this;

        request.subscribe({
            next: (response: any) => { },
            error: (error) => {
                self.handleError(error)
            }
        });
    }

    public handleSoftDeleteRequest<T extends BaseModel>(expectedType: new () => T,
        request: Observable<Response | HttpResponse<ITypedServiceResponse<T>> | ITypedServiceResponse<T>>, 
        context: DataContext) {
        // If the item is expected to be soft-deleted, then don't remove it from the context. It
        // should work just like a non-delete request. 
        this.handleNonDeleteRequest(expectedType, request, context);
    }

    /** Saves the body of an HttpResponse to the client's filesystem using the default filename. */
    protected saveToFileSystem(response: HttpResponse<Blob | string>) {
        const contentDispositionHeader: string = response.headers.get(HttpHeaderNames.ContentDisposition);
        const parts: string[] = contentDispositionHeader.split(';');
        const filename = parts[1].split('=')[1].replace('\"', '').replace('\"', '');

        const blob = response.body;

        fileSaver.saveAs(blob, filename, { autoBom: false });
    }

    public getUserInteractionHeader(isInteractive: boolean): HttpHeaders {
        if (isInteractive) return new HttpHeaders().set(HttpHeaderNames.EventInteractionType, UserInteractionTypes.Interactive);
        else return new HttpHeaders().set(HttpHeaderNames.EventInteractionType, UserInteractionTypes.Noninteractive);
    }
}