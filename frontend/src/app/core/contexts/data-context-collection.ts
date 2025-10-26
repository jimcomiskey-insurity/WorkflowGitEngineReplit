import _ from 'lodash';
import { BaseDataContext } from '@Core/contexts/base-data-context';
import { NewDataContext } from './new-data-context';

// Base class for a singleton collection of a specific type of DataContexts.
export abstract class DataContextCollection<T extends BaseDataContext> {
    // This constructor's parameter "typeCtor" is needed to be able to instantiate 
    // an object of type T (see https://stackoverflow.com/a/26696435/2832598)
    private identity: number;

    constructor(protected typeCtor: { new (id: string): T }) {
        this.identity = Math.random();
    }

    protected dataContexts: Map<string, T> = new Map<string, T>(); // Key is the record ID

    // Returns a DataContext of type T for the given id.
    // If none exists yet for that id, this method instantiates a new DataContext.
    public get(id: string): T {
        let dataContext: T = this.dataContexts.get(id);
        if (!dataContext) {
            // If a data context doesn't already exist for this ID, just create a new one.
            dataContext = new this.typeCtor(id);
            this.dataContexts.set(id, dataContext);

            // We are only supporting clearing the contexts after a certain amount of time for NewDataContexts
            if (dataContext instanceof NewDataContext)
                this.timers[id] = setTimeout(() => { dataContext.clearAll()}, this.interval)

        }
        return dataContext;
    }

    public has(id: string): boolean {
        let dataContext: T = this.dataContexts.get(id);
        return (dataContext) ? true : false;
    }

    public remove(id: string): void {
        if (!this.dataContexts.has(id))
            throw "Id does not exist in the collection.";
        this.dataContexts.delete(id);
    }

    public get size(): number {
        return this.dataContexts.size;
    }

    public forEach(callback: (context:BaseDataContext, key: string) => void): void {
        this.dataContexts?.forEach(callback);
    }

    // Schedule a clearing of an old context of 20 minutes
    protected interval = 20* 60 * 1000; // 20 minutes
    protected timers: { [ contextId: string]: any} = {}; // using "any" in place of "number | NodeJS.Timeout"

    public resetTimer(id: string): void {
        let timer = this.timers[id];
        clearInterval(timer);        
        timer = setTimeout(() => { this.dataContexts.get(id).clearAll() }, this.interval);
        this.timers[id] = timer;
    }
}