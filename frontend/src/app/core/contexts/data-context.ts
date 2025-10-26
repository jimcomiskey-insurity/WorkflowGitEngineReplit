import * as _ from 'lodash';

import { DataStore } from '@Core/contexts/data-store';
import { BaseModel, VertexModel, EdgeModel, DocumentModel } from '@Core/models/model';
import * as ConfigModels from '@Core/models/codegen/configuration.models';
import { ModelUtils } from '@Core/utils/model-utils';
import { BaseDataContext } from '@Core/contexts/base-data-context';
import { BehaviorSubject } from 'rxjs';

export abstract class DataContext extends BaseDataContext{

    private stores: Map<string, DataStore<BaseModel>>; // Key is the domaintype name
    private models: Map<string, BaseModel>; // Key is the domaindid of the model

    private _loading = false;

    /**
    * When true, datastores do not broadcast changes until loading is set to false, at
    * which time all stores broadcast changes if they had any.  The loading status is
    * ignored when call the set(model, values) method since all values are set in one method.
    */
    get loading(): boolean {
        return this._loading;
    }
    set loading(value: boolean) {
        this._loading = value;
        if (value === false) {
            this.loadingStores.forEach(storeKey => {
                let store = this.stores.get(storeKey);
                store.broadcast();
            });
            // reset the loading stores
            this.loadingStores.clear();
        }
    }

    stopLoadingWithoutBroadcast() {
        this._loading = false;
    }

    // tracks the stores that have been changed while _loading is set to true
    private loadingStores: Set<string> = new Set<string>();

    constructor() {
        super();
        
        this.stores = new Map<string, DataStore<BaseModel>>();
        this.models = new Map<string, BaseModel>();
    }

    getStore<T extends BaseModel>(type: T): DataStore<T> {
        if (!type)
            return null;

        if (!this.stores.has(type.DomainType))
            this.stores.set(type.DomainType, new DataStore<BaseModel>());

        return this.stores.get(type.DomainType) as DataStore<T>;
    }

    getStoreValues<T extends BaseModel>(type: T): BehaviorSubject<T[]> {
        if (!type)
            return null;

        if (!this.stores.has(type.DomainType))
            this.stores.set(type.DomainType, new DataStore<BaseModel>());

        let dataStore = this.stores.get(type.DomainType) as DataStore<T>;

        return dataStore.values;

    }

    

    has(domainid: string): boolean {
        return this.models.has(domainid);
    }

    get<T extends BaseModel>(domainid: string): T {
        return this.models.get(domainid) as T;
    }

    getItems(domainids: Set<string>): BaseModel[] {
        var arr: BaseModel[] = [];

        domainids.forEach(domainid => {
            if (this.has(domainid))
                arr.push(this.get(domainid));
        });

        return arr;
    }

    set<T extends BaseModel>(model: T, values: T[]): void {
        _.forEach(values, val => this.models.set(val.DomainId, val));
        this.getStore(model).set(values);
    }

    addOrReplace(model: BaseModel): void {
        if (!model.Id)
            throw new Error("Model did not have an Id value");

        var existing = this.models.get(model.DomainId);

        if (existing)
            this.replace(model);
        else
            this.add(model);
    }

    /**
     * This method may be used by service classes to deserialize models from an API response.
     * Parameter "expectedType" may be any class that extends BaseModel.
    */
    public loadApiResponseModels<T extends BaseModel>(expectedType: new () => T, response: any,
        postLoadAction?: () => void, remove?: boolean): T[] {
        if (_.isNil(response))
            return null;

        var self = this;
        self.loading = true;
        var body = response._body || response.body || response;
        if (_.isString(body))
            body = JSON.parse(body);

        var responseContent = body.Content || body;
        const models: T[] = [];

        if (_.isArray(responseContent)) {
            // Deserialize each object in the array
            _.forEach(responseContent, obj => {
                if (!remove) {
                    models.push(self.deserializeSingleObject(expectedType, obj));
                } else {
                    self.remove(ModelUtils.createDomainId(new expectedType(), obj.Id));
                }
            });
        }
        else {
            if (!remove) {
                models.push(self.deserializeSingleObject(expectedType, responseContent));
            } else {
                self.remove(ModelUtils.createDomainId(new expectedType(), responseContent.Id));
            }
        }

        self.loading = false;

        if (postLoadAction)
            postLoadAction();
        return models;
    }

    // Use this version if you have models of different types in your response
    public loadResponseModels(response: any, postLoadAction?: () => void): BaseModel[] {
        if (_.isNil(response))
            return null;

        var self = this;
        self.loading = true;
        var body = response._body || response.body || response;
        if (_.isString(body))
            body = JSON.parse(body);
        
        const models: BaseModel[] = [];
        var responseContent = body.Content || body;

        if (responseContent && responseContent.length) {
            // Deserialize each object in the array
            _.forEach(responseContent, obj => {
                models.push(this.deserializeSingleObject(ConfigModels[obj['@Type']], obj));
            });
        }

        self.loading = false;

        if (postLoadAction)
            postLoadAction();

        return models;
    }

    public deserializeSingleObject<T extends BaseModel>(expectedType: { new(): T }, rawObj: any): T {
        const model = (new expectedType() as BaseModel).deserialize(rawObj, this);
        return model as T;
    }

    add(model: BaseModel): void {
        if (!model.Id)
            throw new Error("Model did not have an Id value");

        this.models.set(model.DomainId, model);

        // Now, update the loadingStores set with the "store key" matching the
        // type of the "model" parameter, as well as each type that is derived from,
        // and add the model into the store.

        // Gets the prototype of model to pass into getStore
        var parent: BaseModel = this.getParentPrototype(model);

        // parent will not be null as long as model is not a VertexModel, EdgeModel, or BaseModel
        while (parent != null) {
            this.getStore(parent).add(model, !this.loading);
            if (this.loading)
                this.loadingStores.add(parent.DomainType);

            // Gets the prototype of the inherited class of parent (see getParentPrototype for more information)
            parent = this.getParentPrototype(parent)
        }
    }

    replace(model: BaseModel): void {
        if (!model.Id)
            throw new Error("Model did not have an Id value");

        var existing = this.models.get(model.DomainId);
        if (!existing)
            this.add(model);

        var replaceModel: BaseModel;
        if (_.isNil(existing.ObjectVersionNumber) || existing.ObjectVersionNumber <= model.ObjectVersionNumber) {
            // If the new model is newer (or the same) as the existing model, merge the edges and put
            // it in the store

            if (existing instanceof VertexModel && existing.DomainType == model.DomainType) {
                (model as VertexModel).mergeRelationships(existing);
            }
            replaceModel = model;
        } else {
            // If the existing object is more recent than the new model,
            // take the new models edges and put it onto the existing object
    
            if (existing instanceof VertexModel && existing.DomainType == model.DomainType) {
                // Still take any edges on the new model over the existing model.
                // We may need to revisit this in the future
                existing.mergeRelationships(model as VertexModel, true);
            }
            replaceModel = existing;
        }

        this.models.set(replaceModel.DomainId, replaceModel);

        // Gets the prototype of model to pass into getStore
        var parent: BaseModel = this.getParentPrototype(replaceModel);

        // parent will not be null as long as model is not a VertexModel, EdgeModel, or BaseModel
        while (parent != null) {
            // If the item was added at a higher level, it may not exist yet in the store.
            // I.e. An AccountJournalEntry was added as an Activity before being added as an AccountJournalEntry
            this.getStore(parent).addOrReplace(replaceModel, !this.loading);

            // TODO: make sure back references are removed from
            // objects in the datastore if the new object
            // no longer references them
            if (this.loading)
                this.loadingStores.add(parent.DomainType);

            // Gets the prototype of the inherited class of parent (see getParentPrototype for more information)
            parent = this.getParentPrototype(parent)
        }
    }

    remove(model: BaseModel | string): void {
        if (_.isString(model)) {
            model = this.get(model);

            if (model == null)
                return;
        }

        this.models.delete(model.DomainId);

        if (model instanceof VertexModel) {
            // If this is a vertex model we are removing, we need to find all 
            // edges that are attatched to it and remove them as well
            this.models.forEach((value, key, map) => {
                if (value instanceof EdgeModel) {
                    if (value.Out == (model as BaseModel).DomainId || value.In == (model as BaseModel).DomainId) {
                        this.remove(value);
                    }
                }
            });
        }

        // Gets the prototype of model to pass into getStore
        var parent: BaseModel = this.getParentPrototype(model);

        // parent will not be null as long as model is not a VertexModel, EdgeModel, or BaseModel
        while (parent != null) {
            this.getStore(parent).delete(model, !this.loading);

            if (this.loading)
                this.loadingStores.add(model.DomainType);

            // Gets the prototype of the inherited class of parent (see getParentPrototype for more information)
            parent = this.getParentPrototype(parent)
        }
    }

    clearStore(type: BaseModel, dontBroadcast: boolean = false): void {
        if (!type)
            return;

        let isloading: boolean = this._loading; // are we currently in a loading state?

        if (!this.stores.has(type.DomainType))
            return;

        let store = this.getStore(type);

        if (!isloading)
            this.loading = true; // makes sure we are only broadcasting once all items are removed.

        while (store.values.value.length > 0) {
            let model = store.values.value[0];
            this.remove(model);
        }

        if (!isloading){
            if (dontBroadcast) {
                this.stopLoadingWithoutBroadcast()
            } else {
                this.loading = false;
            }
        }
    }

    // Gets the Prototype of the object that is passed in
    // IE: Passing in an Instantiated TaskFileRequirement would get you a TaskFileRequirement Prototype,
    // but passing in the TaskFileRequirement Prototype would give you a Task Prototype.
    getParentPrototype(model: BaseModel): BaseModel {
        var parent = Object.getPrototypeOf(model);
        if (parent.constructor !== EdgeModel && parent.constructor !== VertexModel
            && parent.constructor !== DocumentModel && parent.constructor !== BaseModel)
            return parent;
        else
            return null;
    }

    public clearAll(broadcast: boolean = true){
        this.stores.forEach(d => {
            d.clear(broadcast);
        });
        this.models.clear();
    }

    public broadcastAll(){
        this.stores.forEach(d => {
            d.broadcast();
        })
    }
}