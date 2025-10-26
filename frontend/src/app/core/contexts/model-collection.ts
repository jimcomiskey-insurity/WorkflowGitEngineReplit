import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

import { ModelUtils } from '@Core/utils/model-utils';
import { BaseModel } from '@Core/models/model';

/*
 * This class is analagous to DataStore<T>, but is intended to be used with NewDataContext (NOT DataContext)
 */
export class ModelCollection<T extends BaseModel>{

    public values: BehaviorSubject<T[]>;
    
    // If all the values have been loaded. 
    public allValuesLoaded: boolean;

    constructor() {
        this.values = new BehaviorSubject<T[]>([]);

        this.allValuesLoaded = false;
    }

    /**
     * Causes the internal collection to broadcast new values to subscribers.
     * This is useful if the datacontext wishes to delay broadcasting until
     * all values are loaded, like during an API serialization.
     */
    broadcast(): void {
        this.values.next(this.values.getValue());
    }

    clear(): void {
        this.values.next([]);
        this.allValuesLoaded = false;
    }

    set(values: T[], keepSubscriptionOpen: boolean = true): void {
        this.values.next(values);
        this.allValuesLoaded = true;

        if (!keepSubscriptionOpen)
            this.values.complete();
    }

    add(item: T, broadcast: boolean = true): void {
        let values = this.values.getValue();
        values.push(item);
        if (broadcast)
            this.values.next(values);
    }

    replace(item: T, id?: string, broadcast: boolean = true): void {
        let values: BaseModel[] = this.values.getValue();
        let index = _.findIndex(values, { Id: (id ? id : item.Id) });

        if (index > -1) {
            values.splice(index, 1, item);
            if (broadcast)
                this.values.next(values as T[]);
        }
    }

    addOrReplace(item: T, broadcast: boolean = true): boolean {
        var found: boolean = ModelUtils.addOrReplace(this.values.getValue(), item);

        // notify the subscribers
        if (broadcast)
            this.broadcast();
        return found;
    }

    delete(item: T | string, broadcast: boolean = true): boolean {
        var index: number;

        if (!item)
            return false;

        let values: BaseModel[] = this.values.getValue();

        if (_.isString(item))
            index = _.findIndex(values, { Id: item });
        else
            index = _.findIndex(values, { Id: item.Id });

        if (index > -1) {
            values.splice(index, 1);
            if (broadcast)
                this.values.next(values as T[]);
            return true;
        }
        return false;
    }
}