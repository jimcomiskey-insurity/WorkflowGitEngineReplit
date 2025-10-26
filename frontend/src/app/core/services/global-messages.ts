import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import _ from 'lodash';
import { LoggingService } from './logging.service';
import { SeverityLevel } from '@microsoft/applicationinsights-web';

@Injectable()
export class GlobalMessages {

    private maxLength: number = 100;

    public values: BehaviorSubject<AppMessage[]>;
    public last: BehaviorSubject<AppMessage>;

    constructor(private logger:LoggingService) {
        this.values = new BehaviorSubject<AppMessage[]>([]);
        this.last = new BehaviorSubject<AppMessage>(null);
    }

    Add(message: AppMessage): void {
        if (!_.isString(message.message)) {
            let objectMessage = message.message as any;

            // HttpErrorResponses have their own message property
            if (objectMessage.message && _.isString(objectMessage.message)) {
                message.message = objectMessage.message;
                this.logger.logInfo("Attempted to display a global message " + 
                                     "with an invalid AppMessage.message", objectMessage);
            }
            else {
                const err = new Error("Attempted to add a global message that didn't have a string for the message.");
                this.logger.logException(err, SeverityLevel.Error, {message: message});
                return;
            }
        }

        this.values.getValue().unshift(message);
        if (this.values.getValue.length > this.maxLength)
            this.values.getValue().pop();

        this.last.next(message);

        this.values.next(this.values.getValue());
    }

}

type messageType = 'info' | 'warning' | 'danger' | 'success'

export class AppMessage {
    id: number;
    
    private static count = 0;

    private static nextId() {
        return AppMessage.count++;
    }

    constructor(public message: string, public type: messageType = 'info', 
        public alertDuration?: number, public icon?: string, 
        public dismissible?: boolean, public action?: AppMessageAction) {
        this.id = AppMessage.nextId();

        if (type === 'danger' && _.isUndefined(icon)) {
            icon = 'exclamation-sign'
        }

        // If the alert doesn't auto disapear then it must be dismissable
        if (!alertDuration || alertDuration > 3000)
            this.dismissible = true;
    }
}

export class AppMessageAction {
    constructor(public label: string, public action: Function) { }
}
