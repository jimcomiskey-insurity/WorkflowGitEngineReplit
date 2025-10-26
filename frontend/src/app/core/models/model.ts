import { BaseDataContext } from '@Core/contexts/base-data-context';

import * as _ from 'lodash';
import { EdgeRelationship } from '../utils/model-utils';

/****************  Base Classes  *****************************/

interface Serializable<T> {
    deserialize(input: Object, context: BaseDataContext): T;
}

export abstract class BaseModel implements Serializable<BaseModel> {
    data: any = {};
    Context: BaseDataContext;

    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    abstract get Type(): string;
    abstract get Domain(): string;

    get DomainId(): string {
        return this.Domain + "#" + this.Id;
    }
    get DomainType(): string {
        return this.Domain + ":" + this.Type;
    }

    get ObjectVersionNumber(): number {
        return this.data.ObjectVersionNumber;
    }

    readonly _APIKEY;
    static get DerivedTypes(): { className: string, type: new () => BaseModel }[] { return []; }

    abstract deserialize(input: Object, context: BaseDataContext): BaseModel;

    protected _deserialize(input: Object, context: BaseDataContext): void {
        this.data = input;

        //Remove # from properties
        Object.keys(this.data).forEach((key) => {
            const newKey = key.replace("#", "");
            if (newKey !== key) {
                this.data[newKey] = this.data[key];
                delete this.data[key];
            }
        });
        context.addOrReplace(this);
        this.Context = context;
    }

    abstract clone(): BaseModel;
}

export abstract class VertexModel extends BaseModel {

    /**
    * Stores the relationships loaded in this instance of the Model
    */
    protected _relationships: Map<string, Set<string>> = new Map<string, Set<string>>();

    /**
     * Copies the relationship key and values from the otherRelationship if they key is not
     * present in the internal relationships map
     * @param otherRelationships
     */
    public mergeRelationships(other: VertexModel, override: boolean = false) {
        other._relationships.forEach((values, key) => {
            if (!this._relationships.has(key) || override)
                this._relationships.set(key, values);
        });
    }

    protected _deserialize(input: Object, context: BaseDataContext): void {
        var data: any = _.omit(input, ["@Type"]);
        super._deserialize(data, context);
    }

    public readonly inRelationships: EdgeRelationship[] = [];
    public readonly outRelationships: EdgeRelationship[] = [];
}

export abstract class EdgeModel extends BaseModel {
    get Out(): string {
        var _out = this.data.Out;
        if (!_out)
            _out = this.Domain + "#" + this.data.OutIdPair?.Id;
        return _out;
    }
    set Out(value: string) {
        this.data.Out = value;
    }

    get In(): string {
        var _in = this.data.In;
        if (!_in)
            _in = this.Domain + "#" + this.data.InIdPair?.Id;
        return _in;
    }
    set In(value: string) {
        this.data.In = value;
    }

    protected _deserialize(input: Object, context: BaseDataContext): void {
        var data: any = _.omit(input, ["@Relationship", "@RelationshipId", "@Type"]);
        data.Id = input["@RelationshipId"];
        super._deserialize(data, context);
    }
}

export abstract class DocumentModel extends BaseModel {
    protected _deserialize(input: Object, context: BaseDataContext): void {
        var data: any = _.omit(input, ["@Type"]);
        super._deserialize(data, context);
    }
}

export class PartitionKeyIdPair {
    PartitionKey: string;
    Id: string;
}

export class BaseEnum {
    public data: IEnumEntry[];
    public items: IEnumItem[];

    public getNames(): string[] {
        return _.map(this.data, enumItem => { return enumItem.name; });
    }

    public deserialize(input: any): void {
        var self = this;
        this.data = [];
        this.items = [];

        if (!input)
            return;

        var json = input.Content || input;
        if (!json) { return; }

        _.forEach(json, function (value, key) {
            const enumEntry: IEnumEntry = {
                name: key,
                enumObject: value
            }
            self.data.push(enumEntry);
            self.items.push(value);
        });
    }
}

export interface IMenuItem {
    label: string,
    id?: string,
    route?: string,
    iconClass?: string,
    clickHandler?: Function,
    subMenu?: IMenuItem[],
    subLink?: boolean, // eg - "+ Add" links
    disabled?: boolean | (() => boolean)  // may be either a fixed value or a function
    hidden?: boolean | (() => boolean)  // may be either a fixed value or a function
    external?: boolean
}

export interface IStaticElementType {
    label: string,
    name: string
}

export interface IValidationCode {
    code: string,
    description: string,
    messageTemplate: string,
    resolutionHelp: string,
}

export interface IEnumEntry {
    name: string,
    enumObject: IEnumItem | any,
}

export interface IEnumItem {
    name: string,
    description: string
}

export interface IEditionParticipation {
    Participation: boolean;
    CommittedEditions: number[];
}

export interface IServiceResponse {
    Content: any;
    Errors: IServerMessage[];
    Messages: IServerMessage[];
    RequestId: string;
}

export interface ITypedServiceResponse<T> extends IServiceResponse {
    Content: T;
}

export interface IServerMessage {
    Message: string;
    Data: object;
}

export interface IModelValidationError extends IServerMessage {
    Path: string;
}
