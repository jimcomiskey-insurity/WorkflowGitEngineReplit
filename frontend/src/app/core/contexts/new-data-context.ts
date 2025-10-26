import { BaseModel, VertexModel, EdgeModel, DocumentModel } from '@Core/models/model';
import { ReplaySubject } from 'rxjs';
import _ from 'lodash';
import { ModelCollection } from '@Core/contexts/model-collection';
import { BaseDataContext } from '@Core/contexts/base-data-context';
import { DataContextCollection } from './data-context-collection';
import { BaseService } from '@Services/base.service';

export abstract class NewDataContext extends BaseDataContext {

    private entities: Map<string, ReplaySubject<BaseModel>>; // Key is the domaindid of the model
    private entityLists: Map<string, ModelCollection<BaseModel>>; // Key is the domaintype name

    //TODO: SM-4433 Remove this map as it stores duplicate information
    private synchronousEntities: Map<string, BaseModel>;


    // These should be populated in the 'get()' method of the implementing class of DataContextCollection
    public service: BaseService;
    public collection: DataContextCollection<NewDataContext>;

    private _loading = false;

    /**
    * When true, collections do not broadcast changes until loading is set to false, at
    * which time all collections broadcast changes if they had any.  The loading status is
    * ignored when call the set(model, values) method since all values are set in one method.
    */
    get loading(): boolean {
        return this._loading;
    }
    set loading(value: boolean) {
        this._loading = value;
        if (value === false) {
            this.entityLists.forEach((collection, key) => {
                collection.broadcast();
            });
            // reset the loading stores
            this.loadingCollections.clear();
        }
    }

    stopLoadingWithoutBroadcast() {
        this._loading = false;
    }

    // tracks the stores that have been changed while _loading is set to true
    private loadingCollections: Set<string> = new Set<string>();

    constructor(public id: string) {
        super();
        this.initialize();
    }

    private initialize(): void {
        this.entities = new Map<string, ReplaySubject<BaseModel>>();
        this.synchronousEntities = new Map<string, BaseModel>();
        this.entityLists = new Map<string, ModelCollection<BaseModel>>();
    }

    //#region Abstract methods
    protected loadDataItem<T extends BaseModel>(domainId: string, type: BaseModel, keepSubscriptionOpen: boolean = true) {
        throw new Error("loadDataItem needs to be overridden in the concrete class.")

        // This method should load the item in question, and send a 'next' on the observable
    }

    protected loadData<T extends BaseModel>(type: BaseModel, keepSubscriptionOpen: boolean = true) {
        throw new Error("loadData needs to be overridden in the concrete class.")

        // This method should load the item in question, and send a 'next' on the observable
    }
    //#endregion Abstract methods

    // #region Get methods

    public getEntity<T extends BaseModel>(type: BaseModel, domainid: string, keepSubscriptionOpen: boolean = true): ReplaySubject<T> {
        this.collection.resetTimer(this.id);

        // If the entity does not exist, create an empty observable and go load the item
        if (!this.entities.has(domainid)) {
            this.entities.set(domainid, new ReplaySubject<T>(1));
            this.loadDataItem<T>(domainid, type, keepSubscriptionOpen);
        }

        return this.entities.get(domainid) as ReplaySubject<T>;
    }

    public getEntityList<T extends BaseModel>(type: BaseModel, keepSubscriptionOpen: boolean = true): ModelCollection<T> {
        this.collection.resetTimer(this.id);

        if (!type)
            return null;

        // If the entity does not exist, create an empty observable
        if (!this.entityLists.has(type.DomainType)) {
            this.entityLists.set(type.DomainType, new ModelCollection());
        }

        // If all of the items have not been loaded, load the items
        if (!this.entityLists.get(type.DomainType).allValuesLoaded) {
            this.loadData(type, keepSubscriptionOpen);
        }

        return this.entityLists.get(type.DomainType) as ModelCollection<T>;
    }

    // We need this to override the get function in the BaseDataContext so that serialization doesn't have to change.
    get<T extends BaseModel>(domainid: string): T {
        this.collection.resetTimer(this.id);

        if (this.has(domainid) && this.synchronousEntities.has(domainid))
            return this.synchronousEntities.get(domainid) as T;
        else
            return null;
    }
    //#end region Get methods

    has(domainid: string): boolean {
        return this.entities.has(domainid);
    }

    addOrReplace(model: BaseModel): void {
        if (!model.Id)
            throw new Error("Model did not have an Id value");

        if (this.entities.has(model.DomainId))
            this.replace(model);
        else
            this.add(model);
    }

    private add(model: BaseModel): void {
        this.collection.resetTimer(this.id);

        if (!model.Id)
            throw new Error("Model did not have an Id value");

        this.synchronousEntities.set(model.DomainId, model);

        var subject = new ReplaySubject<BaseModel>(1);
        this.entities.set(model.DomainId, subject);
        subject.next(model);

        // Now, we need to update the ModelCollections for the model type and all parent types

        // Gets the prototype of model to pass into getStore
        var parent: BaseModel = this.getParentPrototype(model);

        // parent will not be null as long as model is not a VertexModel, EdgeModel, or BaseModel
        while (parent != null) {
            this.entityLists.get(parent.DomainType)?.addOrReplace(model, !this.loading);

            // Gets the prototype of the inherited class of parent (see getParentPrototype for more information)
            parent = this.getParentPrototype(parent)
        }
    }

    private replace(model: BaseModel): void {
        this.collection.resetTimer(this.id);

        if (!model.Id)
            throw new Error("Model did not have an Id value");

        var existing = this.get(model.DomainId);

        if (existing && existing instanceof VertexModel && existing.DomainType == model.DomainType) {
            (model as VertexModel).mergeRelationships(existing);
        }

        this.synchronousEntities.set(model.DomainId, model);
        this.entities.get(model.DomainId).next(model);

        // Now, we need to update the ModelCollections for the model type and all parent types

        // Gets the prototype of model to pass into getStore
        var parent: BaseModel = this.getParentPrototype(model);

        // parent will not be null as long as model is not a VertexModel, EdgeModel, or BaseModel
        while (parent != null) {
            this.entityLists.get(parent.DomainType)?.addOrReplace(model, !this.loading);

            // Gets the prototype of the inherited class of parent (see getParentPrototype for more information)
            parent = this.getParentPrototype(parent)
        }
    }

    remove(model: BaseModel | string): void {
        this.collection.resetTimer(this.id);

        if (_.isString(model)) {
            model = this.get(model);

            if (model == null)
                return;
        }

        this.synchronousEntities.delete(model.DomainId);
        this.entities.delete(model.DomainId);

        // Gets the prototype of model to pass into getStore
        var parent: BaseModel = this.getParentPrototype(model);

        // parent will not be null as long as model is not a VertexModel, EdgeModel, or BaseModel
        while (parent != null) {
            this.entityLists.get(parent.DomainType)?.delete(model, !this.loading);

            if (this.loading)
                this.loadingCollections.add(model.DomainType);

            // Gets the prototype of the inherited class of parent (see getParentPrototype for more information)
            parent = this.getParentPrototype(parent)
        }
    }

    // #region API Response Handling

    /**
     * This method may be used by service classes to deserialize models from an API response.
     * Parameter "expectedType" may be any class that extends BaseModel.
    */
    public loadApiResponseModels<T extends BaseModel>(expectedType: new () => T, response: any,
        postLoadAction?: () => void, keepSubscriptionOpen: boolean = true): T[] {
        if (_.isNil(response))
            return null;

        var body = response._body || response.body || response;
        if (_.isString(body))
            body = JSON.parse(body);

        var responseContent = body.Content || body;
        var models = this.loadModelsIntoContext(expectedType, responseContent, keepSubscriptionOpen)

        if (postLoadAction)
            postLoadAction();
        return models;
    }

    public deserializeSingleObject<T extends BaseModel>(expectedType: { new(): T }, rawObj: any): T {
        const model = (new expectedType() as BaseModel).deserialize(rawObj, this);
        return model as T;
    }

    loadModelsIntoContext<T extends BaseModel>(expectedType: new () => T, responseContent: any, keepSubscriptionOpen: boolean = true): T[] {
        const self = this;
        const models: T[] = [];

        if (_.isArray(responseContent)) {
            // Deserialize each object in the array
            _.forEach(responseContent, obj => {
                // deserializeSingleObject eventaully calls addOrReplace to update the observable
                var model = self.deserializeSingleObject(expectedType, obj);
                models.push(model);
            });

            // Either 
            var listObservable = this.entityLists.get(new expectedType().DomainType);
            if (listObservable)
                listObservable.set(models, keepSubscriptionOpen);
            else {
                var collection = new ModelCollection();
                this.entityLists.set(new expectedType().DomainType, collection);
                collection.set(models, keepSubscriptionOpen);
            }
        }
        else {
            // deserializeSingleObject eventaully calls addOrReplace to update the observable
            var model = self.deserializeSingleObject(expectedType, responseContent);

            this.addOrReplace(model);

            models.push(model);
        }

        return models;
    }

    getContentFromResponse(response: any) {
        var body = response._body || response.body || response;
        if (_.isString(body))
            body = JSON.parse(body);

        return body.Content || body;
    }

    // #endregion API Response Handling    

    clear(type: BaseModel, dontBroadcast: boolean = false): void {
        if (!type)
            return;

        let isloading: boolean = this._loading; // are we currently in a loading state?

        if (!this.entityLists.has(type.DomainType))
            return;

        let collection = this.entityLists.get(type.DomainType);

        if (!isloading)
            this.loading = true; // makes sure we are only broadcasting once all items are removed.

        while (collection.values.value.length > 0) {
            let model = collection.values.value[0];
            this.remove(model);
        }

        if (!isloading) {
            if (dontBroadcast) {
                this.stopLoadingWithoutBroadcast()
            } else {
                this.loading = false;
            }
        }
    }

    clearAll(): void {
        this.entities.clear();
        this.entityLists.clear();
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
}