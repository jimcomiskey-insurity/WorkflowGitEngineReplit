import { ModelUtils, EdgeRelationship } from '@Core/utils/model-utils';
import { BaseDataContext } from '@Core/contexts/base-data-context';
import { BaseModel, EdgeModel, VertexModel, DocumentModel } from '@Core/models/model';
import { ContractDate } from '@Core/utils/contract-date';
import { ActionEligibilityStatus } from '@Core/enums/action-eligibility-status.enum';

import * as _ from 'lodash';

export class AdminInfo extends DocumentModel {
    get Domain(): string {
        return "Admin";
    }
    get Type(): string {
        return "AdminInfo";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get SubscriptionKey(): string {
        return this.data.SubscriptionKey;
    }
    set SubscriptionKey(value: string) {
        this.data.SubscriptionKey = value;
    }


    deserialize(input: Object, datacontext): AdminInfo {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: AdminInfo) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            SubscriptionKey: model.SubscriptionKey,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): AdminInfo {
        let clone = new AdminInfo();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class AreaTier extends DocumentModel {
    get Domain(): string {
        return "Admin";
    }
    get Type(): string {
        return "AreaTier";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get Name(): string {
        return this.data.Name;
    }
    set Name(value: string) {
        this.data.Name = value;
    }
    get DatabaseThroughputRUs(): number {
        return this.data.DatabaseThroughputRUs;
    }
    set DatabaseThroughputRUs(value: number) {
        this.data.DatabaseThroughputRUs = value;
    }


    deserialize(input: Object, datacontext): AreaTier {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: AreaTier) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            Name: model.Name,
            DatabaseThroughputRUs: model.DatabaseThroughputRUs,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): AreaTier {
        let clone = new AreaTier();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class IdentityRepresentsOrganization extends EdgeModel {
    get Domain(): string {
        return "Admin";
    }
    get Type(): string {
        return "IdentityRepresentsOrganization";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to SMIdentity
    private __IsRepresentedBy: SMIdentity;

    IsRepresentedBy(context?: BaseDataContext): SMIdentity {
        if (this.__IsRepresentedBy)
           return this.__IsRepresentedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsRepresentedBy) as SMIdentity;
    }
    setIsRepresentedBy(value: SMIdentity) {
        this.__IsRepresentedBy = value;
    }
    get _IsRepresentedBy(): string {
        return this.Out;
    }
    set _IsRepresentedBy(value: string) {
        this.Out = value;
    }
    //   In to Organization
    private __Represents: Organization;

    Represents(context?: BaseDataContext): Organization {
        if (this.__Represents)
           return this.__Represents;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Represents) as Organization;
    }
    setRepresents(value: Organization) {
        this.__Represents = value;
    }
    get _Represents(): string {
        return this.In;
    }
    set _Represents(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): IdentityRepresentsOrganization {
       return ModelUtils.deserializeEdge<IdentityRepresentsOrganization>(this, input, datacontext, super._deserialize);
    }


    clone(): IdentityRepresentsOrganization {
        let clone = new IdentityRepresentsOrganization();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IOrganization {
    Id: string,
    LegalName: string,
    Website?: string,
    readonly Super: boolean,

    IsRepresentedBy?: object[],
    Owns?: object[]

}

export class Organization extends VertexModel {
    get Domain(): string {
        return "Admin";
    }
    get Type(): string {
        return "Organization";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Organization }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get LegalName(): string {
        return this.data.LegalName;
    }
    set LegalName(value: string) {
        this.data.LegalName = value;
    }
    get Website(): string {
        return this.data.Website;
    }
    set Website(value: string) {
        this.data.Website = value;
    }
    get Super(): boolean {
        return this.data.Super;
    }

    // Relationships

    // Relationship IsRepresentedBy, returns SMIdentity IdentityRepresentsOrganization[]
    private __IsRepresentedBy: IdentityRepresentsOrganization[];
    IsRepresentedBy(_context?: BaseDataContext): IdentityRepresentsOrganization[] {
        if (this.__IsRepresentedBy)
            return this.__IsRepresentedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsRepresentedBy), (id) => context.get(id) as IdentityRepresentsOrganization);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsRepresentedBy(values: IdentityRepresentsOrganization[]) {
         if (this.Context != null)
             throw Error;

        this.__IsRepresentedBy = values;
     }
    get _IsRepresentedBy(): Set<string> {
        if (!this._relationships.has("IsRepresentedBy"))
            this._relationships.set("IsRepresentedBy", new Set<string>());

        return this._relationships.get("IsRepresentedBy");
    }
    set _IsRepresentedBy(values: Set<string>) {
        this._relationships.set("IsRepresentedBy", values);
    }

    // Relationship Owns, returns Tenant OrganizationOwnsTenant[]
    private __Owns: OrganizationOwnsTenant[];
    Owns(_context?: BaseDataContext): OrganizationOwnsTenant[] {
        if (this.__Owns)
            return this.__Owns;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Owns), (id) => context.get(id) as OrganizationOwnsTenant);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setOwns(values: OrganizationOwnsTenant[]) {
         if (this.Context != null)
             throw Error;

        this.__Owns = values;
     }
    get _Owns(): Set<string> {
        if (!this._relationships.has("Owns"))
            this._relationships.set("Owns", new Set<string>());

        return this._relationships.get("Owns");
    }
    set _Owns(values: Set<string>) {
        this._relationships.set("Owns", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsRepresentedBy',
            edgeType: IdentityRepresentsOrganization,
            otherVertexPropertyName: 'Represents',
            otherVertexType: SMIdentity,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Owns',
            edgeType: OrganizationOwnsTenant,
            otherVertexPropertyName: 'IsOwnedBy',
            otherVertexType: Tenant,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Organization {
        return ModelUtils.deserializeVertex<Organization>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Organization) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            LegalName: model.LegalName,
            Website: model.Website,
            Super: model.Super,
            IsRepresentedBy: ModelUtils.serializeShallowEdge(model.IsRepresentedBy(), 'IsRepresentedBy'),
            Owns: ModelUtils.serializeShallowEdge(model.Owns(), 'Owns'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Organization {
        let clone = new Organization();
        clone.data = _.cloneDeep(this.data);
        clone._IsRepresentedBy = _.cloneDeep(this._IsRepresentedBy);
        clone._Owns = _.cloneDeep(this._Owns);

        //clone.Context = this.Context;
        return clone;
    }
}

export class OrganizationOwnsTenant extends EdgeModel {
    get Domain(): string {
        return "Admin";
    }
    get Type(): string {
        return "OrganizationOwnsTenant";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Organization
    private __IsOwnedBy: Organization;

    IsOwnedBy(context?: BaseDataContext): Organization {
        if (this.__IsOwnedBy)
           return this.__IsOwnedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsOwnedBy) as Organization;
    }
    setIsOwnedBy(value: Organization) {
        this.__IsOwnedBy = value;
    }
    get _IsOwnedBy(): string {
        return this.Out;
    }
    set _IsOwnedBy(value: string) {
        this.Out = value;
    }
    //   In to Tenant
    private __Owns: Tenant;

    Owns(context?: BaseDataContext): Tenant {
        if (this.__Owns)
           return this.__Owns;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Owns) as Tenant;
    }
    setOwns(value: Tenant) {
        this.__Owns = value;
    }
    get _Owns(): string {
        return this.In;
    }
    set _Owns(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): OrganizationOwnsTenant {
       return ModelUtils.deserializeEdge<OrganizationOwnsTenant>(this, input, datacontext, super._deserialize);
    }


    clone(): OrganizationOwnsTenant {
        let clone = new OrganizationOwnsTenant();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface ISMIdentity {
    Id: string,
    DisplayName?: string,
    readonly CreatedDate?: Date,
    LastLoginDate?: Date,
    readonly IsActive: boolean,

    IsPermittedFor?: object[],
    Represents?: object[]

}

export class SMIdentity extends VertexModel {
    get Domain(): string {
        return "Admin";
    }
    get Type(): string {
        return "SMIdentity";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof SMIdentity }[] = [
            {className: 'AdminUser', type: AdminUser},
            {className: 'User', type: User},
            {className: 'App', type: App},
            {className: 'Contact', type: Contact},
            {className: 'Developer', type: Developer},
            {className: 'TenantUser', type: TenantUser},

        ];
        return derivedTypes;
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get DisplayName(): string {
        return this.data.DisplayName;
    }
    set DisplayName(value: string) {
        this.data.DisplayName = value;
    }
    get CreatedDate(): Date {
        return this.data.CreatedDate ? new Date(this.data.CreatedDate) : undefined;
    }
    get LastLoginDate(): Date {
        return this.data.LastLoginDate ? new Date(this.data.LastLoginDate) : undefined;
    }
    set LastLoginDate(value: Date) {
        this.data.LastLoginDate = value;
    }
    get IsActive(): boolean {
        return this.data.IsActive;
    }

    // Relationships

    // Relationship IsPermittedFor, returns Tenant TenantPermitsIdentity[]
    private __IsPermittedFor: TenantPermitsIdentity[];
    IsPermittedFor(_context?: BaseDataContext): TenantPermitsIdentity[] {
        if (this.__IsPermittedFor)
            return this.__IsPermittedFor;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsPermittedFor), (id) => context.get(id) as TenantPermitsIdentity);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsPermittedFor(values: TenantPermitsIdentity[]) {
         if (this.Context != null)
             throw Error;

        this.__IsPermittedFor = values;
     }
    get _IsPermittedFor(): Set<string> {
        if (!this._relationships.has("IsPermittedFor"))
            this._relationships.set("IsPermittedFor", new Set<string>());

        return this._relationships.get("IsPermittedFor");
    }
    set _IsPermittedFor(values: Set<string>) {
        this._relationships.set("IsPermittedFor", values);
    }

    // Relationship Represents, returns Organization IdentityRepresentsOrganization[]
    private __Represents: IdentityRepresentsOrganization[];
    Represents(_context?: BaseDataContext): IdentityRepresentsOrganization[] {
        if (this.__Represents)
            return this.__Represents;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Represents), (id) => context.get(id) as IdentityRepresentsOrganization);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setRepresents(values: IdentityRepresentsOrganization[]) {
         if (this.Context != null)
             throw Error;

        this.__Represents = values;
     }
    get _Represents(): Set<string> {
        if (!this._relationships.has("Represents"))
            this._relationships.set("Represents", new Set<string>());

        return this._relationships.get("Represents");
    }
    set _Represents(values: Set<string>) {
        this._relationships.set("Represents", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsPermittedFor',
            edgeType: TenantPermitsIdentity,
            otherVertexPropertyName: 'Permits',
            otherVertexType: Tenant,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Represents',
            edgeType: IdentityRepresentsOrganization,
            otherVertexPropertyName: 'IsRepresentedBy',
            otherVertexType: Organization,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): SMIdentity {
        return ModelUtils.deserializeVertex<SMIdentity>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: SMIdentity) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayName: model.DisplayName,
            CreatedDate: model.CreatedDate,
            LastLoginDate: model.LastLoginDate,
            IsActive: model.IsActive,
            IsPermittedFor: ModelUtils.serializeShallowEdge(model.IsPermittedFor(), 'IsPermittedFor'),
            Represents: ModelUtils.serializeShallowEdge(model.Represents(), 'Represents'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): SMIdentity {
        let clone = new SMIdentity();
        clone.data = _.cloneDeep(this.data);
        clone._IsPermittedFor = _.cloneDeep(this._IsPermittedFor);
        clone._Represents = _.cloneDeep(this._Represents);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITenant {
    Id: string,
    Key: string,
    Summary?: string,
    Description: string,
    DisplayName?: string,
    readonly Mode: string,
    FeatureFacets?: { [index: string]: boolean },
    SubscriptionKey?: string,
    LastAccessed?: Date,
    SalesforceCustomerId?: string,

    IsOwnedBy?: object[],
    DeploysTo?: object[],
    Permits?: object[]

}

export class Tenant extends VertexModel {
    get Domain(): string {
        return "Admin";
    }
    get Type(): string {
        return "Tenant";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Tenant }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get Key(): string {
        return this.data.Key;
    }
    set Key(value: string) {
        this.data.Key = value;
    }
    get Summary(): string {
        return this.data.Summary;
    }
    set Summary(value: string) {
        this.data.Summary = value;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get DisplayName(): string {
        return this.data.DisplayName;
    }
    set DisplayName(value: string) {
        this.data.DisplayName = value;
    }
    get Mode(): string {
        return this.data.Mode;
    }
    get FeatureFacets(): { [index: string]: boolean } {
        return this.data.FeatureFacets;
    }
    set FeatureFacets(value: { [index: string]: boolean }) {
        this.data.FeatureFacets = value;
    }
    get SubscriptionKey(): string {
        return this.data.SubscriptionKey;
    }
    set SubscriptionKey(value: string) {
        this.data.SubscriptionKey = value;
    }
    get LastAccessed(): Date {
        return this.data.LastAccessed ? new Date(this.data.LastAccessed) : undefined;
    }
    set LastAccessed(value: Date) {
        this.data.LastAccessed = value;
    }
    get SalesforceCustomerId(): string {
        return this.data.SalesforceCustomerId;
    }
    set SalesforceCustomerId(value: string) {
        this.data.SalesforceCustomerId = value;
    }

    // Relationships

    // Relationship IsOwnedBy, returns Organization OrganizationOwnsTenant[]
    private __IsOwnedBy: OrganizationOwnsTenant[];
    IsOwnedBy(_context?: BaseDataContext): OrganizationOwnsTenant[] {
        if (this.__IsOwnedBy)
            return this.__IsOwnedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsOwnedBy), (id) => context.get(id) as OrganizationOwnsTenant);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsOwnedBy(values: OrganizationOwnsTenant[]) {
         if (this.Context != null)
             throw Error;

        this.__IsOwnedBy = values;
     }
    get _IsOwnedBy(): Set<string> {
        if (!this._relationships.has("IsOwnedBy"))
            this._relationships.set("IsOwnedBy", new Set<string>());

        return this._relationships.get("IsOwnedBy");
    }
    set _IsOwnedBy(values: Set<string>) {
        this._relationships.set("IsOwnedBy", values);
    }

    // Relationship DeploysTo, returns TenantArea TenantDeploysToArea[]
    private __DeploysTo: TenantDeploysToArea[];
    DeploysTo(_context?: BaseDataContext): TenantDeploysToArea[] {
        if (this.__DeploysTo)
            return this.__DeploysTo;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._DeploysTo), (id) => context.get(id) as TenantDeploysToArea);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setDeploysTo(values: TenantDeploysToArea[]) {
         if (this.Context != null)
             throw Error;

        this.__DeploysTo = values;
     }
    get _DeploysTo(): Set<string> {
        if (!this._relationships.has("DeploysTo"))
            this._relationships.set("DeploysTo", new Set<string>());

        return this._relationships.get("DeploysTo");
    }
    set _DeploysTo(values: Set<string>) {
        this._relationships.set("DeploysTo", values);
    }

    // Relationship Permits, returns SMIdentity TenantPermitsIdentity[]
    private __Permits: TenantPermitsIdentity[];
    Permits(_context?: BaseDataContext): TenantPermitsIdentity[] {
        if (this.__Permits)
            return this.__Permits;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Permits), (id) => context.get(id) as TenantPermitsIdentity);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setPermits(values: TenantPermitsIdentity[]) {
         if (this.Context != null)
             throw Error;

        this.__Permits = values;
     }
    get _Permits(): Set<string> {
        if (!this._relationships.has("Permits"))
            this._relationships.set("Permits", new Set<string>());

        return this._relationships.get("Permits");
    }
    set _Permits(values: Set<string>) {
        this._relationships.set("Permits", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsOwnedBy',
            edgeType: OrganizationOwnsTenant,
            otherVertexPropertyName: 'Owns',
            otherVertexType: Organization,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'DeploysTo',
            edgeType: TenantDeploysToArea,
            otherVertexPropertyName: 'IsFor',
            otherVertexType: TenantArea,
        },
        {
            propertyName: 'Permits',
            edgeType: TenantPermitsIdentity,
            otherVertexPropertyName: 'IsPermittedFor',
            otherVertexType: SMIdentity,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Tenant {
        return ModelUtils.deserializeVertex<Tenant>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Tenant) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            Key: model.Key,
            Summary: model.Summary,
            Description: model.Description,
            DisplayName: model.DisplayName,
            Mode: model.Mode,
            FeatureFacets: model.FeatureFacets,
            SubscriptionKey: model.SubscriptionKey,
            LastAccessed: model.LastAccessed,
            SalesforceCustomerId: model.SalesforceCustomerId,
            IsOwnedBy: ModelUtils.serializeShallowEdge(model.IsOwnedBy(), 'IsOwnedBy'),
            DeploysTo: ModelUtils.serializeShallowEdge(model.DeploysTo(), 'DeploysTo'),
            Permits: ModelUtils.serializeShallowEdge(model.Permits(), 'Permits'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Tenant {
        let clone = new Tenant();
        clone.data = _.cloneDeep(this.data);
        clone._IsOwnedBy = _.cloneDeep(this._IsOwnedBy);
        clone._DeploysTo = _.cloneDeep(this._DeploysTo);
        clone._Permits = _.cloneDeep(this._Permits);

        //clone.Context = this.Context;
        return clone;
    }
}

export class TenantActivity extends DocumentModel {
    get Domain(): string {
        return "Admin";
    }
    get Type(): string {
        return "TenantActivity";
    }

    // Properties
    get DeletedDate(): Date {
        return this.data.DeletedDate ? new Date(this.data.DeletedDate) : undefined;
    }
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get Message(): string {
        return this.data.Message;
    }
    set Message(value: string) {
        this.data.Message = value;
    }
    get TenantKey(): string {
        return this.data.TenantKey;
    }
    set TenantKey(value: string) {
        this.data.TenantKey = value;
    }
    get AreaName(): string {
        return this.data.AreaName;
    }
    set AreaName(value: string) {
        this.data.AreaName = value;
    }
    get EventName(): string {
        return this.data.EventName;
    }
    set EventName(value: string) {
        this.data.EventName = value;
    }
    get IdentityKey(): string {
        return this.data.IdentityKey;
    }
    set IdentityKey(value: string) {
        this.data.IdentityKey = value;
    }
    get ActivityTime(): Date {
        return this.data.ActivityTime ? new Date(this.data.ActivityTime) : undefined;
    }
    set ActivityTime(value: Date) {
        this.data.ActivityTime = value;
    }


    deserialize(input: Object, datacontext): TenantActivity {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: TenantActivity) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DeletedDate: model.DeletedDate,
            Id: model.Id,
            Message: model.Message,
            TenantKey: model.TenantKey,
            AreaName: model.AreaName,
            EventName: model.EventName,
            IdentityKey: model.IdentityKey,
            ActivityTime: model.ActivityTime,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TenantActivity {
        let clone = new TenantActivity();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface ITenantArea {
    Id: string,
    Name: string,
    TenantKey: string,
    Description: string,
    readonly Mode: string,
    readonly IsProduction: boolean,
    readonly LastAccessed?: Date,
    readonly Tier?: string,
    readonly CustomDatabaseThroughputRUs?: number,
    Alias?: string,
    readonly Order: number,
    readonly RebuildApprovals?: any[],
    readonly DeleteApprovals?: any[],
    readonly CollectionDeleted?: boolean,
    FeatureFacets?: { [index: string]: boolean }

    IsFor?: object[],
    IsWorkedBy?: object[]

}

export class TenantArea extends VertexModel {
    get Domain(): string {
        return "Admin";
    }
    get Type(): string {
        return "TenantArea";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof TenantArea }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get Name(): string {
        return this.data.Name;
    }
    set Name(value: string) {
        this.data.Name = value;
    }
    get TenantKey(): string {
        return this.data.TenantKey;
    }
    set TenantKey(value: string) {
        this.data.TenantKey = value;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get Mode(): string {
        return this.data.Mode;
    }
    get IsProduction(): boolean {
        return this.data.IsProduction;
    }
    get LastAccessed(): Date {
        return this.data.LastAccessed ? new Date(this.data.LastAccessed) : undefined;
    }
    get Tier(): string {
        return this.data.Tier;
    }
    get CustomDatabaseThroughputRUs(): number {
        return this.data.CustomDatabaseThroughputRUs;
    }
    get Alias(): string {
        return this.data.Alias;
    }
    set Alias(value: string) {
        this.data.Alias = value;
    }
    get Order(): number {
        return this.data.Order;
    }
    get RebuildApprovals(): any[] {
        return this.data.RebuildApprovals;
    }
    get DeleteApprovals(): any[] {
        return this.data.DeleteApprovals;
    }
    get CollectionDeleted(): boolean {
        return this.data.CollectionDeleted;
    }
    get FeatureFacets(): { [index: string]: boolean } {
        return this.data.FeatureFacets;
    }
    set FeatureFacets(value: { [index: string]: boolean }) {
        this.data.FeatureFacets = value;
    }

    // Relationships

    // Relationship IsFor, returns Tenant TenantDeploysToArea[]
    private __IsFor: TenantDeploysToArea[];
    IsFor(_context?: BaseDataContext): TenantDeploysToArea[] {
        if (this.__IsFor)
            return this.__IsFor;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsFor), (id) => context.get(id) as TenantDeploysToArea);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsFor(values: TenantDeploysToArea[]) {
         if (this.Context != null)
             throw Error;

        this.__IsFor = values;
     }
    get _IsFor(): Set<string> {
        if (!this._relationships.has("IsFor"))
            this._relationships.set("IsFor", new Set<string>());

        return this._relationships.get("IsFor");
    }
    set _IsFor(values: Set<string>) {
        this._relationships.set("IsFor", values);
    }

    // Relationship IsWorkedBy, returns TenantUser TenantUserWorksInArea[]
    private __IsWorkedBy: TenantUserWorksInArea[];
    IsWorkedBy(_context?: BaseDataContext): TenantUserWorksInArea[] {
        if (this.__IsWorkedBy)
            return this.__IsWorkedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsWorkedBy), (id) => context.get(id) as TenantUserWorksInArea);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsWorkedBy(values: TenantUserWorksInArea[]) {
         if (this.Context != null)
             throw Error;

        this.__IsWorkedBy = values;
     }
    get _IsWorkedBy(): Set<string> {
        if (!this._relationships.has("IsWorkedBy"))
            this._relationships.set("IsWorkedBy", new Set<string>());

        return this._relationships.get("IsWorkedBy");
    }
    set _IsWorkedBy(values: Set<string>) {
        this._relationships.set("IsWorkedBy", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsFor',
            edgeType: TenantDeploysToArea,
            otherVertexPropertyName: 'DeploysTo',
            otherVertexType: Tenant,
        },
        {
            propertyName: 'IsWorkedBy',
            edgeType: TenantUserWorksInArea,
            otherVertexPropertyName: 'WorksIn',
            otherVertexType: TenantUser,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): TenantArea {
        return ModelUtils.deserializeVertex<TenantArea>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: TenantArea) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            Name: model.Name,
            TenantKey: model.TenantKey,
            Description: model.Description,
            Mode: model.Mode,
            IsProduction: model.IsProduction,
            LastAccessed: model.LastAccessed,
            Tier: model.Tier,
            CustomDatabaseThroughputRUs: model.CustomDatabaseThroughputRUs,
            Alias: model.Alias,
            Order: model.Order,
            RebuildApprovals: model.RebuildApprovals,
            DeleteApprovals: model.DeleteApprovals,
            CollectionDeleted: model.CollectionDeleted,
            FeatureFacets: model.FeatureFacets,
            IsFor: ModelUtils.serializeShallowEdge(model.IsFor(), 'IsFor'),
            IsWorkedBy: ModelUtils.serializeShallowEdge(model.IsWorkedBy(), 'IsWorkedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TenantArea {
        let clone = new TenantArea();
        clone.data = _.cloneDeep(this.data);
        clone._IsFor = _.cloneDeep(this._IsFor);
        clone._IsWorkedBy = _.cloneDeep(this._IsWorkedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export class TenantDeploysToArea extends EdgeModel {
    get Domain(): string {
        return "Admin";
    }
    get Type(): string {
        return "TenantDeploysToArea";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Tenant
    private __IsFor: Tenant;

    IsFor(context?: BaseDataContext): Tenant {
        if (this.__IsFor)
           return this.__IsFor;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsFor) as Tenant;
    }
    setIsFor(value: Tenant) {
        this.__IsFor = value;
    }
    get _IsFor(): string {
        return this.Out;
    }
    set _IsFor(value: string) {
        this.Out = value;
    }
    //   In to TenantArea
    private __DeploysTo: TenantArea;

    DeploysTo(context?: BaseDataContext): TenantArea {
        if (this.__DeploysTo)
           return this.__DeploysTo;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._DeploysTo) as TenantArea;
    }
    setDeploysTo(value: TenantArea) {
        this.__DeploysTo = value;
    }
    get _DeploysTo(): string {
        return this.In;
    }
    set _DeploysTo(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): TenantDeploysToArea {
       return ModelUtils.deserializeEdge<TenantDeploysToArea>(this, input, datacontext, super._deserialize);
    }


    clone(): TenantDeploysToArea {
        let clone = new TenantDeploysToArea();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class TenantPermitsIdentity extends EdgeModel {
    get Domain(): string {
        return "Admin";
    }
    get Type(): string {
        return "TenantPermitsIdentity";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Tenant
    private __IsPermittedFor: Tenant;

    IsPermittedFor(context?: BaseDataContext): Tenant {
        if (this.__IsPermittedFor)
           return this.__IsPermittedFor;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsPermittedFor) as Tenant;
    }
    setIsPermittedFor(value: Tenant) {
        this.__IsPermittedFor = value;
    }
    get _IsPermittedFor(): string {
        return this.Out;
    }
    set _IsPermittedFor(value: string) {
        this.Out = value;
    }
    //   In to SMIdentity
    private __Permits: SMIdentity;

    Permits(context?: BaseDataContext): SMIdentity {
        if (this.__Permits)
           return this.__Permits;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Permits) as SMIdentity;
    }
    setPermits(value: SMIdentity) {
        this.__Permits = value;
    }
    get _Permits(): string {
        return this.In;
    }
    set _Permits(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): TenantPermitsIdentity {
       return ModelUtils.deserializeEdge<TenantPermitsIdentity>(this, input, datacontext, super._deserialize);
    }


    clone(): TenantPermitsIdentity {
        let clone = new TenantPermitsIdentity();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class TenantUserWorksInArea extends EdgeModel {
    get Domain(): string {
        return "Admin";
    }
    get Type(): string {
        return "TenantUserWorksInArea";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to TenantUser
    private __IsWorkedBy: TenantUser;

    IsWorkedBy(context?: BaseDataContext): TenantUser {
        if (this.__IsWorkedBy)
           return this.__IsWorkedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsWorkedBy) as TenantUser;
    }
    setIsWorkedBy(value: TenantUser) {
        this.__IsWorkedBy = value;
    }
    get _IsWorkedBy(): string {
        return this.Out;
    }
    set _IsWorkedBy(value: string) {
        this.Out = value;
    }
    //   In to TenantArea
    private __WorksIn: TenantArea;

    WorksIn(context?: BaseDataContext): TenantArea {
        if (this.__WorksIn)
           return this.__WorksIn;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._WorksIn) as TenantArea;
    }
    setWorksIn(value: TenantArea) {
        this.__WorksIn = value;
    }
    get _WorksIn(): string {
        return this.In;
    }
    set _WorksIn(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): TenantUserWorksInArea {
       return ModelUtils.deserializeEdge<TenantUserWorksInArea>(this, input, datacontext, super._deserialize);
    }


    clone(): TenantUserWorksInArea {
        let clone = new TenantUserWorksInArea();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class UserDevelopsAsDeveloper extends EdgeModel {
    get Domain(): string {
        return "Admin";
    }
    get Type(): string {
        return "UserDevelopsAsDeveloper";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to User
    private __IsDeveloperFor: User;

    IsDeveloperFor(context?: BaseDataContext): User {
        if (this.__IsDeveloperFor)
           return this.__IsDeveloperFor;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsDeveloperFor) as User;
    }
    setIsDeveloperFor(value: User) {
        this.__IsDeveloperFor = value;
    }
    get _IsDeveloperFor(): string {
        return this.Out;
    }
    set _IsDeveloperFor(value: string) {
        this.Out = value;
    }
    //   In to Developer
    private __DevelopsAs: Developer;

    DevelopsAs(context?: BaseDataContext): Developer {
        if (this.__DevelopsAs)
           return this.__DevelopsAs;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._DevelopsAs) as Developer;
    }
    setDevelopsAs(value: Developer) {
        this.__DevelopsAs = value;
    }
    get _DevelopsAs(): string {
        return this.In;
    }
    set _DevelopsAs(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): UserDevelopsAsDeveloper {
       return ModelUtils.deserializeEdge<UserDevelopsAsDeveloper>(this, input, datacontext, super._deserialize);
    }


    clone(): UserDevelopsAsDeveloper {
        let clone = new UserDevelopsAsDeveloper();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class UserManagesApp extends EdgeModel {
    get Domain(): string {
        return "Admin";
    }
    get Type(): string {
        return "UserManagesApp";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to User
    private __IsManagedBy: User;

    IsManagedBy(context?: BaseDataContext): User {
        if (this.__IsManagedBy)
           return this.__IsManagedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsManagedBy) as User;
    }
    setIsManagedBy(value: User) {
        this.__IsManagedBy = value;
    }
    get _IsManagedBy(): string {
        return this.Out;
    }
    set _IsManagedBy(value: string) {
        this.Out = value;
    }
    //   In to App
    private __Manages: App;

    Manages(context?: BaseDataContext): App {
        if (this.__Manages)
           return this.__Manages;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Manages) as App;
    }
    setManages(value: App) {
        this.__Manages = value;
    }
    get _Manages(): string {
        return this.In;
    }
    set _Manages(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): UserManagesApp {
       return ModelUtils.deserializeEdge<UserManagesApp>(this, input, datacontext, super._deserialize);
    }


    clone(): UserManagesApp {
        let clone = new UserManagesApp();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IApp {
    Id: string,
    DisplayName?: string,
    readonly CreatedDate?: Date,
    LastLoginDate?: Date,
    readonly IsActive: boolean,
    Description?: string,
    readonly ApiManagementSubscriptionPrimaryKey?: string,
    readonly ApiManagementSubscriptionSecondaryKey?: string,

    IsManagedBy?: object[],
    IsPermittedFor?: object[],
    Represents?: object[]

}

export class App extends SMIdentity {
    get Domain(): string {
        return "Admin";
    }
    get Type(): string {
        return "App";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof App }[] = [
            {className: 'Developer', type: Developer},

        ];
        return derivedTypes;
    }

    // Properties
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get ApiManagementSubscriptionPrimaryKey(): string {
        return this.data.ApiManagementSubscriptionPrimaryKey;
    }
    get ApiManagementSubscriptionSecondaryKey(): string {
        return this.data.ApiManagementSubscriptionSecondaryKey;
    }

    // Relationships

    // Relationship IsManagedBy, returns User UserManagesApp[]
    private __IsManagedBy: UserManagesApp[];
    IsManagedBy(_context?: BaseDataContext): UserManagesApp[] {
        if (this.__IsManagedBy)
            return this.__IsManagedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsManagedBy), (id) => context.get(id) as UserManagesApp);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsManagedBy(values: UserManagesApp[]) {
         if (this.Context != null)
             throw Error;

        this.__IsManagedBy = values;
     }
    get _IsManagedBy(): Set<string> {
        if (!this._relationships.has("IsManagedBy"))
            this._relationships.set("IsManagedBy", new Set<string>());

        return this._relationships.get("IsManagedBy");
    }
    set _IsManagedBy(values: Set<string>) {
        this._relationships.set("IsManagedBy", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsManagedBy',
            edgeType: UserManagesApp,
            otherVertexPropertyName: 'Manages',
            otherVertexType: User,
        },
        {
            propertyName: 'IsPermittedFor',
            edgeType: TenantPermitsIdentity,
            otherVertexPropertyName: 'Permits',
            otherVertexType: Tenant,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Represents',
            edgeType: IdentityRepresentsOrganization,
            otherVertexPropertyName: 'IsRepresentedBy',
            otherVertexType: Organization,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): App {
        return ModelUtils.deserializeVertex<App>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: App) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayName: model.DisplayName,
            CreatedDate: model.CreatedDate,
            LastLoginDate: model.LastLoginDate,
            IsActive: model.IsActive,
            Description: model.Description,
            ApiManagementSubscriptionPrimaryKey: model.ApiManagementSubscriptionPrimaryKey,
            ApiManagementSubscriptionSecondaryKey: model.ApiManagementSubscriptionSecondaryKey,
            IsManagedBy: ModelUtils.serializeShallowEdge(model.IsManagedBy(), 'IsManagedBy'),
            IsPermittedFor: ModelUtils.serializeShallowEdge(model.IsPermittedFor(), 'IsPermittedFor'),
            Represents: ModelUtils.serializeShallowEdge(model.Represents(), 'Represents'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): App {
        let clone = new App();
        clone.data = _.cloneDeep(this.data);
        clone._IsManagedBy = _.cloneDeep(this._IsManagedBy);
        clone._IsPermittedFor = _.cloneDeep(this._IsPermittedFor);
        clone._Represents = _.cloneDeep(this._Represents);

        //clone.Context = this.Context;
        return clone;
    }
}

export class TenantUserActivity extends TenantActivity {
    get Domain(): string {
        return "Admin";
    }
    get Type(): string {
        return "TenantUserActivity";
    }

    // Properties
    get AffectedIdentityKey(): string {
        return this.data.AffectedIdentityKey;
    }
    set AffectedIdentityKey(value: string) {
        this.data.AffectedIdentityKey = value;
    }


    deserialize(input: Object, datacontext): TenantUserActivity {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: TenantUserActivity) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DeletedDate: model.DeletedDate,
            Id: model.Id,
            Message: model.Message,
            TenantKey: model.TenantKey,
            AreaName: model.AreaName,
            EventName: model.EventName,
            IdentityKey: model.IdentityKey,
            ActivityTime: model.ActivityTime,
            AffectedIdentityKey: model.AffectedIdentityKey,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TenantUserActivity {
        let clone = new TenantUserActivity();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IUser {
    Id: string,
    DisplayName?: string,
    readonly CreatedDate?: Date,
    LastLoginDate?: Date,
    readonly IsActive: boolean,
    Logon: string,
    Name?: { [index: string]: string },
    Address?: { [index: string]: string },
    Phones?: { [index: string]: any }[],
    Emails?: { [index: string]: any }[],

    IsPermittedFor?: object[],
    Represents?: object[],
    DevelopsAs?: object[],
    Manages?: object[]

}

export class User extends SMIdentity {
    get Domain(): string {
        return "Admin";
    }
    get Type(): string {
        return "User";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof User }[] = [
            {className: 'AdminUser', type: AdminUser},
            {className: 'Contact', type: Contact},
            {className: 'TenantUser', type: TenantUser},

        ];
        return derivedTypes;
    }

    // Properties
    get Logon(): string {
        return this.data.Logon;
    }
    set Logon(value: string) {
        this.data.Logon = value;
    }
    get Name(): { [index: string]: string } {
        return this.data.Name;
    }
    set Name(value: { [index: string]: string }) {
        this.data.Name = value;
    }
    get Address(): { [index: string]: string } {
        return this.data.Address;
    }
    set Address(value: { [index: string]: string }) {
        this.data.Address = value;
    }
    get Phones(): { [index: string]: any }[] {
        return this.data.Phones;
    }
    set Phones(value: { [index: string]: any }[]) {
        this.data.Phones = value;
    }
    get Emails(): { [index: string]: any }[] {
        return this.data.Emails;
    }
    set Emails(value: { [index: string]: any }[]) {
        this.data.Emails = value;
    }

    // Relationships

    // Relationship DevelopsAs, returns Developer UserDevelopsAsDeveloper[]
    private __DevelopsAs: UserDevelopsAsDeveloper[];
    DevelopsAs(_context?: BaseDataContext): UserDevelopsAsDeveloper[] {
        if (this.__DevelopsAs)
            return this.__DevelopsAs;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._DevelopsAs), (id) => context.get(id) as UserDevelopsAsDeveloper);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setDevelopsAs(values: UserDevelopsAsDeveloper[]) {
         if (this.Context != null)
             throw Error;

        this.__DevelopsAs = values;
     }
    get _DevelopsAs(): Set<string> {
        if (!this._relationships.has("DevelopsAs"))
            this._relationships.set("DevelopsAs", new Set<string>());

        return this._relationships.get("DevelopsAs");
    }
    set _DevelopsAs(values: Set<string>) {
        this._relationships.set("DevelopsAs", values);
    }

    // Relationship Manages, returns App UserManagesApp[]
    private __Manages: UserManagesApp[];
    Manages(_context?: BaseDataContext): UserManagesApp[] {
        if (this.__Manages)
            return this.__Manages;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Manages), (id) => context.get(id) as UserManagesApp);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setManages(values: UserManagesApp[]) {
         if (this.Context != null)
             throw Error;

        this.__Manages = values;
     }
    get _Manages(): Set<string> {
        if (!this._relationships.has("Manages"))
            this._relationships.set("Manages", new Set<string>());

        return this._relationships.get("Manages");
    }
    set _Manages(values: Set<string>) {
        this._relationships.set("Manages", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsPermittedFor',
            edgeType: TenantPermitsIdentity,
            otherVertexPropertyName: 'Permits',
            otherVertexType: Tenant,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Represents',
            edgeType: IdentityRepresentsOrganization,
            otherVertexPropertyName: 'IsRepresentedBy',
            otherVertexType: Organization,
        },
        {
            propertyName: 'DevelopsAs',
            edgeType: UserDevelopsAsDeveloper,
            otherVertexPropertyName: 'IsDeveloperFor',
            otherVertexType: Developer,
        },
        {
            propertyName: 'Manages',
            edgeType: UserManagesApp,
            otherVertexPropertyName: 'IsManagedBy',
            otherVertexType: App,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): User {
        return ModelUtils.deserializeVertex<User>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: User) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayName: model.DisplayName,
            CreatedDate: model.CreatedDate,
            LastLoginDate: model.LastLoginDate,
            IsActive: model.IsActive,
            Logon: model.Logon,
            Name: model.Name,
            Address: model.Address,
            Phones: model.Phones,
            Emails: model.Emails,
            IsPermittedFor: ModelUtils.serializeShallowEdge(model.IsPermittedFor(), 'IsPermittedFor'),
            Represents: ModelUtils.serializeShallowEdge(model.Represents(), 'Represents'),
            DevelopsAs: ModelUtils.serializeShallowEdge(model.DevelopsAs(), 'DevelopsAs'),
            Manages: ModelUtils.serializeShallowEdge(model.Manages(), 'Manages'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): User {
        let clone = new User();
        clone.data = _.cloneDeep(this.data);
        clone._IsPermittedFor = _.cloneDeep(this._IsPermittedFor);
        clone._Represents = _.cloneDeep(this._Represents);
        clone._DevelopsAs = _.cloneDeep(this._DevelopsAs);
        clone._Manages = _.cloneDeep(this._Manages);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IAdminUser {
    Id: string,
    DisplayName?: string,
    readonly CreatedDate?: Date,
    LastLoginDate?: Date,
    readonly IsActive: boolean,
    Logon: string,
    Name?: { [index: string]: string },
    Address?: { [index: string]: string },
    Phones?: { [index: string]: any }[],
    Emails?: { [index: string]: any }[],
    Super?: boolean,

    IsPermittedFor?: object[],
    Represents?: object[],
    DevelopsAs?: object[],
    Manages?: object[]

}

export class AdminUser extends User {
    get Domain(): string {
        return "Admin";
    }
    get Type(): string {
        return "AdminUser";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof AdminUser }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get Super(): boolean {
        return this.data.Super;
    }
    set Super(value: boolean) {
        this.data.Super = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsPermittedFor',
            edgeType: TenantPermitsIdentity,
            otherVertexPropertyName: 'Permits',
            otherVertexType: Tenant,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Represents',
            edgeType: IdentityRepresentsOrganization,
            otherVertexPropertyName: 'IsRepresentedBy',
            otherVertexType: Organization,
        },
        {
            propertyName: 'DevelopsAs',
            edgeType: UserDevelopsAsDeveloper,
            otherVertexPropertyName: 'IsDeveloperFor',
            otherVertexType: Developer,
        },
        {
            propertyName: 'Manages',
            edgeType: UserManagesApp,
            otherVertexPropertyName: 'IsManagedBy',
            otherVertexType: App,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): AdminUser {
        return ModelUtils.deserializeVertex<AdminUser>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: AdminUser) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayName: model.DisplayName,
            CreatedDate: model.CreatedDate,
            LastLoginDate: model.LastLoginDate,
            IsActive: model.IsActive,
            Logon: model.Logon,
            Name: model.Name,
            Address: model.Address,
            Phones: model.Phones,
            Emails: model.Emails,
            Super: model.Super,
            IsPermittedFor: ModelUtils.serializeShallowEdge(model.IsPermittedFor(), 'IsPermittedFor'),
            Represents: ModelUtils.serializeShallowEdge(model.Represents(), 'Represents'),
            DevelopsAs: ModelUtils.serializeShallowEdge(model.DevelopsAs(), 'DevelopsAs'),
            Manages: ModelUtils.serializeShallowEdge(model.Manages(), 'Manages'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): AdminUser {
        let clone = new AdminUser();
        clone.data = _.cloneDeep(this.data);
        clone._IsPermittedFor = _.cloneDeep(this._IsPermittedFor);
        clone._Represents = _.cloneDeep(this._Represents);
        clone._DevelopsAs = _.cloneDeep(this._DevelopsAs);
        clone._Manages = _.cloneDeep(this._Manages);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IContact {
    Id: string,
    DisplayName?: string,
    readonly CreatedDate?: Date,
    LastLoginDate?: Date,
    readonly IsActive: boolean,
    Logon: string,
    Name?: { [index: string]: string },
    Address?: { [index: string]: string },
    Phones?: { [index: string]: any }[],
    Emails?: { [index: string]: any }[],

    IsPermittedFor?: object[],
    Represents?: object[],
    DevelopsAs?: object[],
    Manages?: object[]

}

export class Contact extends User {
    get Domain(): string {
        return "Admin";
    }
    get Type(): string {
        return "Contact";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Contact }[] = [

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsPermittedFor',
            edgeType: TenantPermitsIdentity,
            otherVertexPropertyName: 'Permits',
            otherVertexType: Tenant,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Represents',
            edgeType: IdentityRepresentsOrganization,
            otherVertexPropertyName: 'IsRepresentedBy',
            otherVertexType: Organization,
        },
        {
            propertyName: 'DevelopsAs',
            edgeType: UserDevelopsAsDeveloper,
            otherVertexPropertyName: 'IsDeveloperFor',
            otherVertexType: Developer,
        },
        {
            propertyName: 'Manages',
            edgeType: UserManagesApp,
            otherVertexPropertyName: 'IsManagedBy',
            otherVertexType: App,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Contact {
        return ModelUtils.deserializeVertex<Contact>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Contact) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayName: model.DisplayName,
            CreatedDate: model.CreatedDate,
            LastLoginDate: model.LastLoginDate,
            IsActive: model.IsActive,
            Logon: model.Logon,
            Name: model.Name,
            Address: model.Address,
            Phones: model.Phones,
            Emails: model.Emails,
            IsPermittedFor: ModelUtils.serializeShallowEdge(model.IsPermittedFor(), 'IsPermittedFor'),
            Represents: ModelUtils.serializeShallowEdge(model.Represents(), 'Represents'),
            DevelopsAs: ModelUtils.serializeShallowEdge(model.DevelopsAs(), 'DevelopsAs'),
            Manages: ModelUtils.serializeShallowEdge(model.Manages(), 'Manages'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Contact {
        let clone = new Contact();
        clone.data = _.cloneDeep(this.data);
        clone._IsPermittedFor = _.cloneDeep(this._IsPermittedFor);
        clone._Represents = _.cloneDeep(this._Represents);
        clone._DevelopsAs = _.cloneDeep(this._DevelopsAs);
        clone._Manages = _.cloneDeep(this._Manages);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDeveloper {
    Id: string,
    DisplayName?: string,
    readonly CreatedDate?: Date,
    LastLoginDate?: Date,
    readonly IsActive: boolean,
    Description?: string,
    readonly ApiManagementSubscriptionPrimaryKey?: string,
    readonly ApiManagementSubscriptionSecondaryKey?: string,

    IsDeveloperFor?: object[],
    IsManagedBy?: object[],
    IsPermittedFor?: object[],
    Represents?: object[]

}

export class Developer extends App {
    get Domain(): string {
        return "Admin";
    }
    get Type(): string {
        return "Developer";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Developer }[] = [

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships

    // Relationship IsDeveloperFor, returns User UserDevelopsAsDeveloper[]
    private __IsDeveloperFor: UserDevelopsAsDeveloper[];
    IsDeveloperFor(_context?: BaseDataContext): UserDevelopsAsDeveloper[] {
        if (this.__IsDeveloperFor)
            return this.__IsDeveloperFor;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsDeveloperFor), (id) => context.get(id) as UserDevelopsAsDeveloper);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsDeveloperFor(values: UserDevelopsAsDeveloper[]) {
         if (this.Context != null)
             throw Error;

        this.__IsDeveloperFor = values;
     }
    get _IsDeveloperFor(): Set<string> {
        if (!this._relationships.has("IsDeveloperFor"))
            this._relationships.set("IsDeveloperFor", new Set<string>());

        return this._relationships.get("IsDeveloperFor");
    }
    set _IsDeveloperFor(values: Set<string>) {
        this._relationships.set("IsDeveloperFor", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsDeveloperFor',
            edgeType: UserDevelopsAsDeveloper,
            otherVertexPropertyName: 'DevelopsAs',
            otherVertexType: User,
        },
        {
            propertyName: 'IsManagedBy',
            edgeType: UserManagesApp,
            otherVertexPropertyName: 'Manages',
            otherVertexType: User,
        },
        {
            propertyName: 'IsPermittedFor',
            edgeType: TenantPermitsIdentity,
            otherVertexPropertyName: 'Permits',
            otherVertexType: Tenant,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Represents',
            edgeType: IdentityRepresentsOrganization,
            otherVertexPropertyName: 'IsRepresentedBy',
            otherVertexType: Organization,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Developer {
        return ModelUtils.deserializeVertex<Developer>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Developer) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayName: model.DisplayName,
            CreatedDate: model.CreatedDate,
            LastLoginDate: model.LastLoginDate,
            IsActive: model.IsActive,
            Description: model.Description,
            ApiManagementSubscriptionPrimaryKey: model.ApiManagementSubscriptionPrimaryKey,
            ApiManagementSubscriptionSecondaryKey: model.ApiManagementSubscriptionSecondaryKey,
            IsDeveloperFor: ModelUtils.serializeShallowEdge(model.IsDeveloperFor(), 'IsDeveloperFor'),
            IsManagedBy: ModelUtils.serializeShallowEdge(model.IsManagedBy(), 'IsManagedBy'),
            IsPermittedFor: ModelUtils.serializeShallowEdge(model.IsPermittedFor(), 'IsPermittedFor'),
            Represents: ModelUtils.serializeShallowEdge(model.Represents(), 'Represents'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Developer {
        let clone = new Developer();
        clone.data = _.cloneDeep(this.data);
        clone._IsDeveloperFor = _.cloneDeep(this._IsDeveloperFor);
        clone._IsManagedBy = _.cloneDeep(this._IsManagedBy);
        clone._IsPermittedFor = _.cloneDeep(this._IsPermittedFor);
        clone._Represents = _.cloneDeep(this._Represents);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITenantUser {
    Id: string,
    DisplayName?: string,
    readonly CreatedDate?: Date,
    LastLoginDate?: Date,
    readonly IsActive: boolean,
    Logon: string,
    Name?: { [index: string]: string },
    Address?: { [index: string]: string },
    Phones?: { [index: string]: any }[],
    Emails?: { [index: string]: any }[],

    IsPermittedFor?: object[],
    Represents?: object[],
    DevelopsAs?: object[],
    Manages?: object[],
    WorksIn?: object[]

}

export class TenantUser extends User {
    get Domain(): string {
        return "Admin";
    }
    get Type(): string {
        return "TenantUser";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof TenantUser }[] = [

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships

    // Relationship WorksIn, returns TenantArea TenantUserWorksInArea[]
    private __WorksIn: TenantUserWorksInArea[];
    WorksIn(_context?: BaseDataContext): TenantUserWorksInArea[] {
        if (this.__WorksIn)
            return this.__WorksIn;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._WorksIn), (id) => context.get(id) as TenantUserWorksInArea);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setWorksIn(values: TenantUserWorksInArea[]) {
         if (this.Context != null)
             throw Error;

        this.__WorksIn = values;
     }
    get _WorksIn(): Set<string> {
        if (!this._relationships.has("WorksIn"))
            this._relationships.set("WorksIn", new Set<string>());

        return this._relationships.get("WorksIn");
    }
    set _WorksIn(values: Set<string>) {
        this._relationships.set("WorksIn", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsPermittedFor',
            edgeType: TenantPermitsIdentity,
            otherVertexPropertyName: 'Permits',
            otherVertexType: Tenant,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Represents',
            edgeType: IdentityRepresentsOrganization,
            otherVertexPropertyName: 'IsRepresentedBy',
            otherVertexType: Organization,
        },
        {
            propertyName: 'DevelopsAs',
            edgeType: UserDevelopsAsDeveloper,
            otherVertexPropertyName: 'IsDeveloperFor',
            otherVertexType: Developer,
        },
        {
            propertyName: 'Manages',
            edgeType: UserManagesApp,
            otherVertexPropertyName: 'IsManagedBy',
            otherVertexType: App,
        },
        {
            propertyName: 'WorksIn',
            edgeType: TenantUserWorksInArea,
            otherVertexPropertyName: 'IsWorkedBy',
            otherVertexType: TenantArea,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): TenantUser {
        return ModelUtils.deserializeVertex<TenantUser>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: TenantUser) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayName: model.DisplayName,
            CreatedDate: model.CreatedDate,
            LastLoginDate: model.LastLoginDate,
            IsActive: model.IsActive,
            Logon: model.Logon,
            Name: model.Name,
            Address: model.Address,
            Phones: model.Phones,
            Emails: model.Emails,
            IsPermittedFor: ModelUtils.serializeShallowEdge(model.IsPermittedFor(), 'IsPermittedFor'),
            Represents: ModelUtils.serializeShallowEdge(model.Represents(), 'Represents'),
            DevelopsAs: ModelUtils.serializeShallowEdge(model.DevelopsAs(), 'DevelopsAs'),
            Manages: ModelUtils.serializeShallowEdge(model.Manages(), 'Manages'),
            WorksIn: ModelUtils.serializeShallowEdge(model.WorksIn(), 'WorksIn'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TenantUser {
        let clone = new TenantUser();
        clone.data = _.cloneDeep(this.data);
        clone._IsPermittedFor = _.cloneDeep(this._IsPermittedFor);
        clone._Represents = _.cloneDeep(this._Represents);
        clone._DevelopsAs = _.cloneDeep(this._DevelopsAs);
        clone._Manages = _.cloneDeep(this._Manages);
        clone._WorksIn = _.cloneDeep(this._WorksIn);

        //clone.Context = this.Context;
        return clone;
    }
}

export var Types = {
    AdminInfo,
    AdminUser,
    User,
    SMIdentity,
    App,
    Contact,
    Developer,
    IdentityRepresentsOrganization,
    TenantUser,
    UserDevelopsAsDeveloper,
    UserManagesApp,
    Organization,
    OrganizationOwnsTenant,
    Tenant,
    TenantArea,
    TenantDeploysToArea,
    TenantPermitsIdentity,
    TenantUserWorksInArea,
    AreaTier,
    TenantActivity,
    TenantUserActivity,
}
