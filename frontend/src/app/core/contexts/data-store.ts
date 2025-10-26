import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

import { ModelUtils } from '@Core/utils/model-utils';
import { BaseModel } from '@Core/models/model';

export class DataStore<T extends BaseModel>{

    public values: BehaviorSubject<T[]>;

    constructor() {
        this.values = new BehaviorSubject<T[]>([]);
    }


    /**
     * Causes the internal collection to broadcast new values to subscribers.
     * This is useful if the datacontext wishes to delay broadcasting until
     * all values are loaded, like during an API serialization.
     */
    broadcast(): void {
        this.values.next(this.values.getValue());
    }

    clear(broadcast: boolean = true): void {
        let values = this.values.getValue();
        // Deletes entire array
        values.splice(0)
        if (broadcast)
            this.values.next(values);
    }

    set(values: T[]): void {
        this.values.next(values);
    }

    get(id: string): T {
        var values = this.values.getValue() as BaseModel[];
        return _.find(values, { Id: id }) as T;
    }

    add(item: T, broadcast: boolean = true): void {
        let values = this.values.getValue();
        values.push(item);
        if (broadcast)
            this.values.next(values);
    }

    addOrReplace(item: T, broadcast: boolean = true): boolean {
        var found: boolean = ModelUtils.addOrReplace(this.values.getValue(), item);
        // notify the subscribers
        if (broadcast)
            this.values.next(this.values.getValue());
        return found;
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