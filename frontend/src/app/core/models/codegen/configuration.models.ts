import { ModelUtils, EdgeRelationship } from '@Core/utils/model-utils';
import { BaseDataContext } from '@Core/contexts/base-data-context';
import { BaseModel, EdgeModel, VertexModel, DocumentModel } from '@Core/models/model';
import { ContractDate } from '@Core/utils/contract-date';
import { ActionEligibilityStatus } from '@Core/enums/action-eligibility-status.enum';

import * as _ from 'lodash';

export class ApplicationCollectsSection extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ApplicationCollectsSection";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Application
    private __IsCollectedBy: Application;

    IsCollectedBy(context?: BaseDataContext): Application {
        if (this.__IsCollectedBy)
           return this.__IsCollectedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsCollectedBy) as Application;
    }
    setIsCollectedBy(value: Application) {
        this.__IsCollectedBy = value;
    }
    get _IsCollectedBy(): string {
        return this.Out;
    }
    set _IsCollectedBy(value: string) {
        this.Out = value;
    }
    //   In to Section
    private __Collects: Section;

    Collects(context?: BaseDataContext): Section {
        if (this.__Collects)
           return this.__Collects;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Collects) as Section;
    }
    setCollects(value: Section) {
        this.__Collects = value;
    }
    get _Collects(): string {
        return this.In;
    }
    set _Collects(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ApplicationCollectsSection {
       return ModelUtils.deserializeEdge<ApplicationCollectsSection>(this, input, datacontext, super._deserialize);
    }


    clone(): ApplicationCollectsSection {
        let clone = new ApplicationCollectsSection();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ApplicationContainsElementCondition extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ApplicationContainsElementCondition";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Application
    private __IsContainedBy: Application;

    IsContainedBy(context?: BaseDataContext): Application {
        if (this.__IsContainedBy)
           return this.__IsContainedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsContainedBy) as Application;
    }
    setIsContainedBy(value: Application) {
        this.__IsContainedBy = value;
    }
    get _IsContainedBy(): string {
        return this.Out;
    }
    set _IsContainedBy(value: string) {
        this.Out = value;
    }
    //   In to ElementCondition
    private __ContainsCondition: ElementCondition;

    ContainsCondition(context?: BaseDataContext): ElementCondition {
        if (this.__ContainsCondition)
           return this.__ContainsCondition;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._ContainsCondition) as ElementCondition;
    }
    setContainsCondition(value: ElementCondition) {
        this.__ContainsCondition = value;
    }
    get _ContainsCondition(): string {
        return this.In;
    }
    set _ContainsCondition(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ApplicationContainsElementCondition {
       return ModelUtils.deserializeEdge<ApplicationContainsElementCondition>(this, input, datacontext, super._deserialize);
    }


    clone(): ApplicationContainsElementCondition {
        let clone = new ApplicationContainsElementCondition();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ApplicationIsSequencedByApplicationSequence extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ApplicationIsSequencedByApplicationSequence";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Application
    private __Sequences: Application;

    Sequences(context?: BaseDataContext): Application {
        if (this.__Sequences)
           return this.__Sequences;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Sequences) as Application;
    }
    setSequences(value: Application) {
        this.__Sequences = value;
    }
    get _Sequences(): string {
        return this.Out;
    }
    set _Sequences(value: string) {
        this.Out = value;
    }
    //   In to ApplicationSequence
    private __IsSequencedBy: ApplicationSequence;

    IsSequencedBy(context?: BaseDataContext): ApplicationSequence {
        if (this.__IsSequencedBy)
           return this.__IsSequencedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsSequencedBy) as ApplicationSequence;
    }
    setIsSequencedBy(value: ApplicationSequence) {
        this.__IsSequencedBy = value;
    }
    get _IsSequencedBy(): string {
        return this.In;
    }
    set _IsSequencedBy(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ApplicationIsSequencedByApplicationSequence {
       return ModelUtils.deserializeEdge<ApplicationIsSequencedByApplicationSequence>(this, input, datacontext, super._deserialize);
    }


    clone(): ApplicationIsSequencedByApplicationSequence {
        let clone = new ApplicationIsSequencedByApplicationSequence();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ApplicationPopulatesDataStore extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ApplicationPopulatesDataStore";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Application
    private __IsPopulatedBy: Application;

    IsPopulatedBy(context?: BaseDataContext): Application {
        if (this.__IsPopulatedBy)
           return this.__IsPopulatedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsPopulatedBy) as Application;
    }
    setIsPopulatedBy(value: Application) {
        this.__IsPopulatedBy = value;
    }
    get _IsPopulatedBy(): string {
        return this.Out;
    }
    set _IsPopulatedBy(value: string) {
        this.Out = value;
    }
    //   In to DataStore
    private __Populates: DataStore;

    Populates(context?: BaseDataContext): DataStore {
        if (this.__Populates)
           return this.__Populates;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Populates) as DataStore;
    }
    setPopulates(value: DataStore) {
        this.__Populates = value;
    }
    get _Populates(): string {
        return this.In;
    }
    set _Populates(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ApplicationPopulatesDataStore {
       return ModelUtils.deserializeEdge<ApplicationPopulatesDataStore>(this, input, datacontext, super._deserialize);
    }


    clone(): ApplicationPopulatesDataStore {
        let clone = new ApplicationPopulatesDataStore();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IApplicationSequence {
    Sequence?: string[],
    Id: string

    Sequences?: object[]

}

export class ApplicationSequence extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ApplicationSequence";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof ApplicationSequence }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get Sequence(): string[] {
        return this.data.Sequence;
    }
    set Sequence(value: string[]) {
        this.data.Sequence = value;
    }
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    // Relationship Sequences, returns Application ApplicationIsSequencedByApplicationSequence[]
    private __Sequences: ApplicationIsSequencedByApplicationSequence[];
    Sequences(_context?: BaseDataContext): ApplicationIsSequencedByApplicationSequence[] {
        if (this.__Sequences)
            return this.__Sequences;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Sequences), (id) => context.get(id) as ApplicationIsSequencedByApplicationSequence);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setSequences(values: ApplicationIsSequencedByApplicationSequence[]) {
         if (this.Context != null)
             throw Error;

        this.__Sequences = values;
     }
    get _Sequences(): Set<string> {
        if (!this._relationships.has("Sequences"))
            this._relationships.set("Sequences", new Set<string>());

        return this._relationships.get("Sequences");
    }
    set _Sequences(values: Set<string>) {
        this._relationships.set("Sequences", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Sequences',
            edgeType: ApplicationIsSequencedByApplicationSequence,
            otherVertexPropertyName: 'IsSequencedBy',
            otherVertexType: Application,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): ApplicationSequence {
        return ModelUtils.deserializeVertex<ApplicationSequence>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: ApplicationSequence) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Sequence: model.Sequence,
            Id: model.Id,
            Sequences: ModelUtils.serializeShallowEdge(model.Sequences(), 'Sequences'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): ApplicationSequence {
        let clone = new ApplicationSequence();
        clone.data = _.cloneDeep(this.data);
        clone._Sequences = _.cloneDeep(this._Sequences);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IApplicationStructure {
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    FileName?: string,

    BelongsTo?: object[]

}

export class ApplicationStructure extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ApplicationStructure";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof ApplicationStructure }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get CreatedFromId(): string {
        return this.data.CreatedFromId;
    }
    get CreatedFromRevision(): string {
        return this.data.CreatedFromRevision;
    }
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get FileName(): string {
        return this.data.FileName;
    }
    set FileName(value: string) {
        this.data.FileName = value;
    }

    // Relationships

    // Relationship BelongsTo, returns ProgramRevision ApplicationStructureBelongsToProgramRevision[]
    private __BelongsTo: ApplicationStructureBelongsToProgramRevision[];
    BelongsTo(_context?: BaseDataContext): ApplicationStructureBelongsToProgramRevision[] {
        if (this.__BelongsTo)
            return this.__BelongsTo;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._BelongsTo), (id) => context.get(id) as ApplicationStructureBelongsToProgramRevision);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setBelongsTo(values: ApplicationStructureBelongsToProgramRevision[]) {
         if (this.Context != null)
             throw Error;

        this.__BelongsTo = values;
     }
    get _BelongsTo(): Set<string> {
        if (!this._relationships.has("BelongsTo"))
            this._relationships.set("BelongsTo", new Set<string>());

        return this._relationships.get("BelongsTo");
    }
    set _BelongsTo(values: Set<string>) {
        this._relationships.set("BelongsTo", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'BelongsTo',
            edgeType: ApplicationStructureBelongsToProgramRevision,
            otherVertexPropertyName: 'UtilizesAppStructure',
            otherVertexType: ProgramRevision,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): ApplicationStructure {
        return ModelUtils.deserializeVertex<ApplicationStructure>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: ApplicationStructure) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            FileName: model.FileName,
            BelongsTo: ModelUtils.serializeShallowEdge(model.BelongsTo(), 'BelongsTo'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): ApplicationStructure {
        let clone = new ApplicationStructure();
        clone.data = _.cloneDeep(this.data);
        clone._BelongsTo = _.cloneDeep(this._BelongsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export class ApplicationStructureBelongsToProgramRevision extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ApplicationStructureBelongsToProgramRevision";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to ApplicationStructure
    private __UtilizesAppStructure: ApplicationStructure;

    UtilizesAppStructure(context?: BaseDataContext): ApplicationStructure {
        if (this.__UtilizesAppStructure)
           return this.__UtilizesAppStructure;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._UtilizesAppStructure) as ApplicationStructure;
    }
    setUtilizesAppStructure(value: ApplicationStructure) {
        this.__UtilizesAppStructure = value;
    }
    get _UtilizesAppStructure(): string {
        return this.Out;
    }
    set _UtilizesAppStructure(value: string) {
        this.Out = value;
    }
    //   In to ProgramRevision
    private __BelongsTo: ProgramRevision;

    BelongsTo(context?: BaseDataContext): ProgramRevision {
        if (this.__BelongsTo)
           return this.__BelongsTo;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._BelongsTo) as ProgramRevision;
    }
    setBelongsTo(value: ProgramRevision) {
        this.__BelongsTo = value;
    }
    get _BelongsTo(): string {
        return this.In;
    }
    set _BelongsTo(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ApplicationStructureBelongsToProgramRevision {
       return ModelUtils.deserializeEdge<ApplicationStructureBelongsToProgramRevision>(this, input, datacontext, super._deserialize);
    }


    clone(): ApplicationStructureBelongsToProgramRevision {
        let clone = new ApplicationStructureBelongsToProgramRevision();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class AppRepresentedByTenantUser extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "AppRepresentedByTenantUser";
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
    private __IsRepresentedBy: TenantUser;

    IsRepresentedBy(context?: BaseDataContext): TenantUser {
        if (this.__IsRepresentedBy)
           return this.__IsRepresentedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsRepresentedBy) as TenantUser;
    }
    setIsRepresentedBy(value: TenantUser) {
        this.__IsRepresentedBy = value;
    }
    get _IsRepresentedBy(): string {
        return this.Out;
    }
    set _IsRepresentedBy(value: string) {
        this.Out = value;
    }
    //   In to App
    private __IsContactFor: App;

    IsContactFor(context?: BaseDataContext): App {
        if (this.__IsContactFor)
           return this.__IsContactFor;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsContactFor) as App;
    }
    setIsContactFor(value: App) {
        this.__IsContactFor = value;
    }
    get _IsContactFor(): string {
        return this.In;
    }
    set _IsContactFor(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): AppRepresentedByTenantUser {
       return ModelUtils.deserializeEdge<AppRepresentedByTenantUser>(this, input, datacontext, super._deserialize);
    }


    clone(): AppRepresentedByTenantUser {
        let clone = new AppRepresentedByTenantUser();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IArea {
    Id: string,
    Name: string,
    Description?: string,
    InstecBillingEndpoint?: string,
    InstecBillingAuthToken?: string,
    Alias?: string,
    readonly Order: number,

    IsConfiguredFor?: object[],
    IsWorkedBy?: object[],
    Deploys?: object[]

}

export class Area extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Area";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Area }[] = [

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
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get InstecBillingEndpoint(): string {
        return this.data.InstecBillingEndpoint;
    }
    set InstecBillingEndpoint(value: string) {
        this.data.InstecBillingEndpoint = value;
    }
    get InstecBillingAuthToken(): string {
        return this.data.InstecBillingAuthToken;
    }
    set InstecBillingAuthToken(value: string) {
        this.data.InstecBillingAuthToken = value;
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

    // Relationships

    // Relationship IsConfiguredFor, returns ProgramRevision ProgramRevisionConfiguresArea[]
    private __IsConfiguredFor: ProgramRevisionConfiguresArea[];
    IsConfiguredFor(_context?: BaseDataContext): ProgramRevisionConfiguresArea[] {
        if (this.__IsConfiguredFor)
            return this.__IsConfiguredFor;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsConfiguredFor), (id) => context.get(id) as ProgramRevisionConfiguresArea);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsConfiguredFor(values: ProgramRevisionConfiguresArea[]) {
         if (this.Context != null)
             throw Error;

        this.__IsConfiguredFor = values;
     }
    get _IsConfiguredFor(): Set<string> {
        if (!this._relationships.has("IsConfiguredFor"))
            this._relationships.set("IsConfiguredFor", new Set<string>());

        return this._relationships.get("IsConfiguredFor");
    }
    set _IsConfiguredFor(values: Set<string>) {
        this._relationships.set("IsConfiguredFor", values);
    }

    // Relationship IsWorkedBy, returns SMIdentity SMIdentityWorksInArea[]
    private __IsWorkedBy: SMIdentityWorksInArea[];
    IsWorkedBy(_context?: BaseDataContext): SMIdentityWorksInArea[] {
        if (this.__IsWorkedBy)
            return this.__IsWorkedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsWorkedBy), (id) => context.get(id) as SMIdentityWorksInArea);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsWorkedBy(values: SMIdentityWorksInArea[]) {
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

    // Relationship Deploys, returns Deployable AreaDeploysDeployable[]
    private __Deploys: AreaDeploysDeployable[];
    Deploys(_context?: BaseDataContext): AreaDeploysDeployable[] {
        if (this.__Deploys)
            return this.__Deploys;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Deploys), (id) => context.get(id) as AreaDeploysDeployable);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setDeploys(values: AreaDeploysDeployable[]) {
         if (this.Context != null)
             throw Error;

        this.__Deploys = values;
     }
    get _Deploys(): Set<string> {
        if (!this._relationships.has("Deploys"))
            this._relationships.set("Deploys", new Set<string>());

        return this._relationships.get("Deploys");
    }
    set _Deploys(values: Set<string>) {
        this._relationships.set("Deploys", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsConfiguredFor',
            edgeType: ProgramRevisionConfiguresArea,
            otherVertexPropertyName: 'Configures',
            otherVertexType: ProgramRevision,
        },
        {
            propertyName: 'IsWorkedBy',
            edgeType: SMIdentityWorksInArea,
            otherVertexPropertyName: 'WorksIn',
            otherVertexType: SMIdentity,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Deploys',
            edgeType: AreaDeploysDeployable,
            otherVertexPropertyName: 'DeployedTo',
            otherVertexType: Deployable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Area {
        return ModelUtils.deserializeVertex<Area>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Area) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            InstecBillingEndpoint: model.InstecBillingEndpoint,
            InstecBillingAuthToken: model.InstecBillingAuthToken,
            Alias: model.Alias,
            Order: model.Order,
            IsConfiguredFor: ModelUtils.serializeShallowEdge(model.IsConfiguredFor(), 'IsConfiguredFor'),
            IsWorkedBy: ModelUtils.serializeShallowEdge(model.IsWorkedBy(), 'IsWorkedBy'),
            Deploys: ModelUtils.serializeShallowEdge(model.Deploys(), 'Deploys'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Area {
        let clone = new Area();
        clone.data = _.cloneDeep(this.data);
        clone._IsConfiguredFor = _.cloneDeep(this._IsConfiguredFor);
        clone._IsWorkedBy = _.cloneDeep(this._IsWorkedBy);
        clone._Deploys = _.cloneDeep(this._Deploys);

        //clone.Context = this.Context;
        return clone;
    }
}

export class AreaDeploysDeployable extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "AreaDeploysDeployable";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get Status(): string {
        return this.data.Status;
    }
    set Status(value: string) {
        this.data.Status = value;
    }
    get User(): string {
        return this.data.User;
    }
    set User(value: string) {
        this.data.User = value;
    }
    get DeployedDate(): Date {
        return this.data.DeployedDate ? new Date(this.data.DeployedDate) : undefined;
    }
    set DeployedDate(value: Date) {
        this.data.DeployedDate = value;
    }
    get Settings(): { [index: string]: string } {
        return this.data.Settings;
    }
    set Settings(value: { [index: string]: string }) {
        this.data.Settings = value;
    }

    // Relationships

    //   Out to Area
    private __DeployedTo: Area;

    DeployedTo(context?: BaseDataContext): Area {
        if (this.__DeployedTo)
           return this.__DeployedTo;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._DeployedTo) as Area;
    }
    setDeployedTo(value: Area) {
        this.__DeployedTo = value;
    }
    get _DeployedTo(): string {
        return this.Out;
    }
    set _DeployedTo(value: string) {
        this.Out = value;
    }
    //   In to Deployable
    private __Deploys: Deployable;

    Deploys(context?: BaseDataContext): Deployable {
        if (this.__Deploys)
           return this.__Deploys;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Deploys) as Deployable;
    }
    setDeploys(value: Deployable) {
        this.__Deploys = value;
    }
    get _Deploys(): string {
        return this.In;
    }
    set _Deploys(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): AreaDeploysDeployable {
       return ModelUtils.deserializeEdge<AreaDeploysDeployable>(this, input, datacontext, super._deserialize);
    }


    clone(): AreaDeploysDeployable {
        let clone = new AreaDeploysDeployable();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IAsset {
    Id: string,
    Name: string,
    Description: string,
    Extension: string,
    ProductIds?: string[],
    Tags?: string[],
    readonly PayloadSize?: number,
    PayloadFileName?: string,
    readonly Status: string,
    readonly LastUpdatedBy?: string

    IsContainedBy?: object[]

}

export class Asset extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Asset";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Asset }[] = [

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
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get Extension(): string {
        return this.data.Extension;
    }
    set Extension(value: string) {
        this.data.Extension = value;
    }
    get ProductIds(): string[] {
        return this.data.ProductIds;
    }
    set ProductIds(value: string[]) {
        this.data.ProductIds = value;
    }
    get Tags(): string[] {
        return this.data.Tags;
    }
    set Tags(value: string[]) {
        this.data.Tags = value;
    }
    get PayloadSize(): number {
        return this.data.PayloadSize;
    }
    get PayloadFileName(): string {
        return this.data.PayloadFileName;
    }
    set PayloadFileName(value: string) {
        this.data.PayloadFileName = value;
    }
    get Status(): string {
        return this.data.Status;
    }
    get LastUpdatedBy(): string {
        return this.data.LastUpdatedBy;
    }

    // Relationships

    // Relationship IsContainedBy, returns AssetGroup AssetGroupContainsAsset[]
    private __IsContainedBy: AssetGroupContainsAsset[];
    IsContainedBy(_context?: BaseDataContext): AssetGroupContainsAsset[] {
        if (this.__IsContainedBy)
            return this.__IsContainedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsContainedBy), (id) => context.get(id) as AssetGroupContainsAsset);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsContainedBy(values: AssetGroupContainsAsset[]) {
         if (this.Context != null)
             throw Error;

        this.__IsContainedBy = values;
     }
    get _IsContainedBy(): Set<string> {
        if (!this._relationships.has("IsContainedBy"))
            this._relationships.set("IsContainedBy", new Set<string>());

        return this._relationships.get("IsContainedBy");
    }
    set _IsContainedBy(values: Set<string>) {
        this._relationships.set("IsContainedBy", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsContainedBy',
            edgeType: AssetGroupContainsAsset,
            otherVertexPropertyName: 'Contains',
            otherVertexType: AssetGroup,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Asset {
        return ModelUtils.deserializeVertex<Asset>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Asset) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            Extension: model.Extension,
            ProductIds: model.ProductIds,
            Tags: model.Tags,
            PayloadSize: model.PayloadSize,
            PayloadFileName: model.PayloadFileName,
            Status: model.Status,
            LastUpdatedBy: model.LastUpdatedBy,
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Asset {
        let clone = new Asset();
        clone.data = _.cloneDeep(this.data);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export class AssetGroupContainsAsset extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "AssetGroupContainsAsset";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to AssetGroup
    private __IsContainedBy: AssetGroup;

    IsContainedBy(context?: BaseDataContext): AssetGroup {
        if (this.__IsContainedBy)
           return this.__IsContainedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsContainedBy) as AssetGroup;
    }
    setIsContainedBy(value: AssetGroup) {
        this.__IsContainedBy = value;
    }
    get _IsContainedBy(): string {
        return this.Out;
    }
    set _IsContainedBy(value: string) {
        this.Out = value;
    }
    //   In to Asset
    private __Contains: Asset;

    Contains(context?: BaseDataContext): Asset {
        if (this.__Contains)
           return this.__Contains;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Contains) as Asset;
    }
    setContains(value: Asset) {
        this.__Contains = value;
    }
    get _Contains(): string {
        return this.In;
    }
    set _Contains(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): AssetGroupContainsAsset {
       return ModelUtils.deserializeEdge<AssetGroupContainsAsset>(this, input, datacontext, super._deserialize);
    }


    clone(): AssetGroupContainsAsset {
        let clone = new AssetGroupContainsAsset();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IAssignable {
    Id: string,
    Initials: string,
    DisplayName: string,
    BadgePath?: string,
    TasksAssigned: number,
    readonly DateCreated?: Date

    InitialAssigneeFor?: object[]

}

export class Assignable extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Assignable";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Assignable }[] = [
            {className: 'AccountRole', type: AccountRole},
            {className: 'WorkGroup', type: WorkGroup},

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
    get Initials(): string {
        return this.data.Initials;
    }
    set Initials(value: string) {
        this.data.Initials = value;
    }
    get DisplayName(): string {
        return this.data.DisplayName;
    }
    set DisplayName(value: string) {
        this.data.DisplayName = value;
    }
    get BadgePath(): string {
        return this.data.BadgePath;
    }
    set BadgePath(value: string) {
        this.data.BadgePath = value;
    }
    get TasksAssigned(): number {
        return this.data.TasksAssigned;
    }
    set TasksAssigned(value: number) {
        this.data.TasksAssigned = value;
    }
    get DateCreated(): Date {
        return this.data.DateCreated ? new Date(this.data.DateCreated) : undefined;
    }

    // Relationships

    // Relationship InitialAssigneeFor, returns Task TaskAssignedAssignable[]
    private __InitialAssigneeFor: TaskAssignedAssignable[];
    InitialAssigneeFor(_context?: BaseDataContext): TaskAssignedAssignable[] {
        if (this.__InitialAssigneeFor)
            return this.__InitialAssigneeFor;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._InitialAssigneeFor), (id) => context.get(id) as TaskAssignedAssignable);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setInitialAssigneeFor(values: TaskAssignedAssignable[]) {
         if (this.Context != null)
             throw Error;

        this.__InitialAssigneeFor = values;
     }
    get _InitialAssigneeFor(): Set<string> {
        if (!this._relationships.has("InitialAssigneeFor"))
            this._relationships.set("InitialAssigneeFor", new Set<string>());

        return this._relationships.get("InitialAssigneeFor");
    }
    set _InitialAssigneeFor(values: Set<string>) {
        this._relationships.set("InitialAssigneeFor", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'InitialAssigneeFor',
            edgeType: TaskAssignedAssignable,
            otherVertexPropertyName: 'InitiallyAssignedTo',
            otherVertexType: Task,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Assignable {
        return ModelUtils.deserializeVertex<Assignable>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Assignable) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            Initials: model.Initials,
            DisplayName: model.DisplayName,
            BadgePath: model.BadgePath,
            TasksAssigned: model.TasksAssigned,
            DateCreated: model.DateCreated,
            InitialAssigneeFor: ModelUtils.serializeShallowEdge(model.InitialAssigneeFor(), 'InitialAssigneeFor'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Assignable {
        let clone = new Assignable();
        clone.data = _.cloneDeep(this.data);
        clone._InitialAssigneeFor = _.cloneDeep(this._InitialAssigneeFor);

        //clone.Context = this.Context;
        return clone;
    }
}

export class BusinessLocation extends DocumentModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "BusinessLocation";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get TimeZone(): string {
        return this.data.TimeZone;
    }
    set TimeZone(value: string) {
        this.data.TimeZone = value;
    }
    get BusinessDays(): { [index: number]: any } {
        return this.data.BusinessDays;
    }
    set BusinessDays(value: { [index: number]: any }) {
        this.data.BusinessDays = value;
    }
    get ObserveDaylightSavings(): boolean {
        return this.data.ObserveDaylightSavings;
    }
    set ObserveDaylightSavings(value: boolean) {
        this.data.ObserveDaylightSavings = value;
    }


    deserialize(input: Object, datacontext): BusinessLocation {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: BusinessLocation) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            TimeZone: model.TimeZone,
            BusinessDays: model.BusinessDays,
            ObserveDaylightSavings: model.ObserveDaylightSavings,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): BusinessLocation {
        let clone = new BusinessLocation();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface ICompany {
    Id: string,
    Name: string,
    Description?: string,
    Admitted: boolean,

    Writes?: object[]

}

export class Company extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Company";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Company }[] = [

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
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get Admitted(): boolean {
        return this.data.Admitted;
    }
    set Admitted(value: boolean) {
        this.data.Admitted = value;
    }

    // Relationships

    // Relationship Writes, returns Product CompanyWritesProduct[]
    private __Writes: CompanyWritesProduct[];
    Writes(_context?: BaseDataContext): CompanyWritesProduct[] {
        if (this.__Writes)
            return this.__Writes;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Writes), (id) => context.get(id) as CompanyWritesProduct);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setWrites(values: CompanyWritesProduct[]) {
         if (this.Context != null)
             throw Error;

        this.__Writes = values;
     }
    get _Writes(): Set<string> {
        if (!this._relationships.has("Writes"))
            this._relationships.set("Writes", new Set<string>());

        return this._relationships.get("Writes");
    }
    set _Writes(values: Set<string>) {
        this._relationships.set("Writes", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Writes',
            edgeType: CompanyWritesProduct,
            otherVertexPropertyName: 'IsWrittenBy',
            otherVertexType: Product,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Company {
        return ModelUtils.deserializeVertex<Company>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Company) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            Admitted: model.Admitted,
            Writes: ModelUtils.serializeShallowEdge(model.Writes(), 'Writes'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Company {
        let clone = new Company();
        clone.data = _.cloneDeep(this.data);
        clone._Writes = _.cloneDeep(this._Writes);

        //clone.Context = this.Context;
        return clone;
    }
}

export class CompanyWritesProduct extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "CompanyWritesProduct";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Company
    private __IsWrittenBy: Company;

    IsWrittenBy(context?: BaseDataContext): Company {
        if (this.__IsWrittenBy)
           return this.__IsWrittenBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsWrittenBy) as Company;
    }
    setIsWrittenBy(value: Company) {
        this.__IsWrittenBy = value;
    }
    get _IsWrittenBy(): string {
        return this.Out;
    }
    set _IsWrittenBy(value: string) {
        this.Out = value;
    }
    //   In to Product
    private __Writes: Product;

    Writes(context?: BaseDataContext): Product {
        if (this.__Writes)
           return this.__Writes;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Writes) as Product;
    }
    setWrites(value: Product) {
        this.__Writes = value;
    }
    get _Writes(): string {
        return this.In;
    }
    set _Writes(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): CompanyWritesProduct {
       return ModelUtils.deserializeEdge<CompanyWritesProduct>(this, input, datacontext, super._deserialize);
    }


    clone(): CompanyWritesProduct {
        let clone = new CompanyWritesProduct();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class CustomTable extends DocumentModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "CustomTable";
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
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get IsSystem(): boolean {
        return this.data.IsSystem;
    }
    set IsSystem(value: boolean) {
        this.data.IsSystem = value;
    }
    get Created(): Date {
        return this.data.Created ? new Date(this.data.Created) : undefined;
    }
    set Created(value: Date) {
        this.data.Created = value;
    }
    get LastChanged(): Date {
        return this.data.LastChanged ? new Date(this.data.LastChanged) : undefined;
    }
    set LastChanged(value: Date) {
        this.data.LastChanged = value;
    }


    deserialize(input: Object, datacontext): CustomTable {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: CustomTable) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            IsSystem: model.IsSystem,
            Created: model.Created,
            LastChanged: model.LastChanged,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): CustomTable {
        let clone = new CustomTable();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class CustomTableRow extends DocumentModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "CustomTableRow";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get CustomTableId(): string {
        return this.data.CustomTableId;
    }
    set CustomTableId(value: string) {
        this.data.CustomTableId = value;
    }
    get IsSystem(): boolean {
        return this.data.IsSystem;
    }
    set IsSystem(value: boolean) {
        this.data.IsSystem = value;
    }


    deserialize(input: Object, datacontext): CustomTableRow {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: CustomTableRow) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            CustomTableId: model.CustomTableId,
            IsSystem: model.IsSystem,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): CustomTableRow {
        let clone = new CustomTableRow();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class Dashboard extends DocumentModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Dashboard";
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
    get Sections(): any[] {
        return this.data.Sections;
    }
    set Sections(value: any[]) {
        this.data.Sections = value;
    }


    deserialize(input: Object, datacontext): Dashboard {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: Dashboard) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            Name: model.Name,
            Sections: model.Sections,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Dashboard {
        let clone = new Dashboard();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IDataGroup {
    Sequence?: string[],
    Id: string,
    Name: string,
    Description?: string,
    Repeatable: boolean,
    ReferenceObject?: string,
    ProductId?: string,
    readonly IsPredefined: boolean,
    DataGroupType?: string,
    Tag?: string,
    IsDesiredStateAllowed: boolean,
    PopulatedBy?: string[],

    RepeatsToSection?: object[],
    ChildOf?: object[],
    IsContainedBy?: object[],
    MailBy?: object[],
    ParentOf?: object[],
    Contains?: object[],
    IsSequencedBy?: object[]

}

export class DataGroup extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataGroup";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof DataGroup }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get Sequence(): string[] {
        return this.data.Sequence;
    }
    set Sequence(value: string[]) {
        this.data.Sequence = value;
    }
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
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get Repeatable(): boolean {
        return this.data.Repeatable;
    }
    set Repeatable(value: boolean) {
        this.data.Repeatable = value;
    }
    get ReferenceObject(): string {
        return this.data.ReferenceObject;
    }
    set ReferenceObject(value: string) {
        this.data.ReferenceObject = value;
    }
    get ProductId(): string {
        return this.data.ProductId;
    }
    set ProductId(value: string) {
        this.data.ProductId = value;
    }
    get IsPredefined(): boolean {
        return this.data.IsPredefined;
    }
    get DataGroupType(): string {
        return this.data.DataGroupType;
    }
    set DataGroupType(value: string) {
        this.data.DataGroupType = value;
    }
    get Tag(): string {
        return this.data.Tag;
    }
    set Tag(value: string) {
        this.data.Tag = value;
    }
    get IsDesiredStateAllowed(): boolean {
        return this.data.IsDesiredStateAllowed;
    }
    set IsDesiredStateAllowed(value: boolean) {
        this.data.IsDesiredStateAllowed = value;
    }
    get PopulatedBy(): string[] {
        return this.data.PopulatedBy;
    }
    set PopulatedBy(value: string[]) {
        this.data.PopulatedBy = value;
    }

    // Relationships

    // Relationship RepeatsToSection, returns Section SectionRepeatsWithDataGroup[]
    private __RepeatsToSection: SectionRepeatsWithDataGroup[];
    RepeatsToSection(_context?: BaseDataContext): SectionRepeatsWithDataGroup[] {
        if (this.__RepeatsToSection)
            return this.__RepeatsToSection;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._RepeatsToSection), (id) => context.get(id) as SectionRepeatsWithDataGroup);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setRepeatsToSection(values: SectionRepeatsWithDataGroup[]) {
         if (this.Context != null)
             throw Error;

        this.__RepeatsToSection = values;
     }
    get _RepeatsToSection(): Set<string> {
        if (!this._relationships.has("RepeatsToSection"))
            this._relationships.set("RepeatsToSection", new Set<string>());

        return this._relationships.get("RepeatsToSection");
    }
    set _RepeatsToSection(values: Set<string>) {
        this._relationships.set("RepeatsToSection", values);
    }

    // Relationship ChildOf, returns DataGroup DataGroupChildDataGroup[]
    private __ChildOf: DataGroupChildDataGroup[];
    ChildOf(_context?: BaseDataContext): DataGroupChildDataGroup[] {
        if (this.__ChildOf)
            return this.__ChildOf;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._ChildOf), (id) => context.get(id) as DataGroupChildDataGroup);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setChildOf(values: DataGroupChildDataGroup[]) {
         if (this.Context != null)
             throw Error;

        this.__ChildOf = values;
     }
    get _ChildOf(): Set<string> {
        if (!this._relationships.has("ChildOf"))
            this._relationships.set("ChildOf", new Set<string>());

        return this._relationships.get("ChildOf");
    }
    set _ChildOf(values: Set<string>) {
        this._relationships.set("ChildOf", values);
    }

    // Relationship IsContainedBy, returns DataStore DataStoreContainsDataGroup[]
    private __IsContainedBy: DataStoreContainsDataGroup[];
    IsContainedBy(_context?: BaseDataContext): DataStoreContainsDataGroup[] {
        if (this.__IsContainedBy)
            return this.__IsContainedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsContainedBy), (id) => context.get(id) as DataStoreContainsDataGroup);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsContainedBy(values: DataStoreContainsDataGroup[]) {
         if (this.Context != null)
             throw Error;

        this.__IsContainedBy = values;
     }
    get _IsContainedBy(): Set<string> {
        if (!this._relationships.has("IsContainedBy"))
            this._relationships.set("IsContainedBy", new Set<string>());

        return this._relationships.get("IsContainedBy");
    }
    set _IsContainedBy(values: Set<string>) {
        this._relationships.set("IsContainedBy", values);
    }

    // Relationship MailBy, returns TaskCorrespondence TaskCorrespondenceMailToDataGroup[]
    private __MailBy: TaskCorrespondenceMailToDataGroup[];
    MailBy(_context?: BaseDataContext): TaskCorrespondenceMailToDataGroup[] {
        if (this.__MailBy)
            return this.__MailBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._MailBy), (id) => context.get(id) as TaskCorrespondenceMailToDataGroup);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setMailBy(values: TaskCorrespondenceMailToDataGroup[]) {
         if (this.Context != null)
             throw Error;

        this.__MailBy = values;
     }
    get _MailBy(): Set<string> {
        if (!this._relationships.has("MailBy"))
            this._relationships.set("MailBy", new Set<string>());

        return this._relationships.get("MailBy");
    }
    set _MailBy(values: Set<string>) {
        this._relationships.set("MailBy", values);
    }

    // Relationship ParentOf, returns DataGroup DataGroupChildDataGroup[]
    private __ParentOf: DataGroupChildDataGroup[];
    ParentOf(_context?: BaseDataContext): DataGroupChildDataGroup[] {
        if (this.__ParentOf)
            return this.__ParentOf;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._ParentOf), (id) => context.get(id) as DataGroupChildDataGroup);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setParentOf(values: DataGroupChildDataGroup[]) {
         if (this.Context != null)
             throw Error;

        this.__ParentOf = values;
     }
    get _ParentOf(): Set<string> {
        if (!this._relationships.has("ParentOf"))
            this._relationships.set("ParentOf", new Set<string>());

        return this._relationships.get("ParentOf");
    }
    set _ParentOf(values: Set<string>) {
        this._relationships.set("ParentOf", values);
    }

    // Relationship Contains, returns DataPoint DataGroupContainsDataPoint[]
    private __Contains: DataGroupContainsDataPoint[];
    Contains(_context?: BaseDataContext): DataGroupContainsDataPoint[] {
        if (this.__Contains)
            return this.__Contains;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Contains), (id) => context.get(id) as DataGroupContainsDataPoint);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setContains(values: DataGroupContainsDataPoint[]) {
         if (this.Context != null)
             throw Error;

        this.__Contains = values;
     }
    get _Contains(): Set<string> {
        if (!this._relationships.has("Contains"))
            this._relationships.set("Contains", new Set<string>());

        return this._relationships.get("Contains");
    }
    set _Contains(values: Set<string>) {
        this._relationships.set("Contains", values);
    }

    // Relationship IsSequencedBy, returns DataGroupSequence DataGroupIsSequencedByDataGroupSequence[]
    private __IsSequencedBy: DataGroupIsSequencedByDataGroupSequence[];
    IsSequencedBy(_context?: BaseDataContext): DataGroupIsSequencedByDataGroupSequence[] {
        if (this.__IsSequencedBy)
            return this.__IsSequencedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsSequencedBy), (id) => context.get(id) as DataGroupIsSequencedByDataGroupSequence);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsSequencedBy(values: DataGroupIsSequencedByDataGroupSequence[]) {
         if (this.Context != null)
             throw Error;

        this.__IsSequencedBy = values;
     }
    get _IsSequencedBy(): Set<string> {
        if (!this._relationships.has("IsSequencedBy"))
            this._relationships.set("IsSequencedBy", new Set<string>());

        return this._relationships.get("IsSequencedBy");
    }
    set _IsSequencedBy(values: Set<string>) {
        this._relationships.set("IsSequencedBy", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'RepeatsToSection',
            edgeType: SectionRepeatsWithDataGroup,
            otherVertexPropertyName: 'RepeatsWith',
            otherVertexType: Section,
        },
        {
            propertyName: 'ChildOf',
            edgeType: DataGroupChildDataGroup,
            otherVertexPropertyName: 'ParentOf',
            otherVertexType: DataGroup,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: DataStoreContainsDataGroup,
            otherVertexPropertyName: 'Contains',
            otherVertexType: DataStore,
        },
        {
            propertyName: 'MailBy',
            edgeType: TaskCorrespondenceMailToDataGroup,
            otherVertexPropertyName: 'MailTo',
            otherVertexType: TaskCorrespondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'ParentOf',
            edgeType: DataGroupChildDataGroup,
            otherVertexPropertyName: 'ChildOf',
            otherVertexType: DataGroup,
        },
        {
            propertyName: 'Contains',
            edgeType: DataGroupContainsDataPoint,
            otherVertexPropertyName: 'IsContainedBy',
            otherVertexType: DataPoint,
        },
        {
            propertyName: 'IsSequencedBy',
            edgeType: DataGroupIsSequencedByDataGroupSequence,
            otherVertexPropertyName: 'Sequences',
            otherVertexType: DataGroupSequence,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataGroup {
        return ModelUtils.deserializeVertex<DataGroup>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataGroup) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Sequence: model.Sequence,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            Repeatable: model.Repeatable,
            ReferenceObject: model.ReferenceObject,
            ProductId: model.ProductId,
            IsPredefined: model.IsPredefined,
            DataGroupType: model.DataGroupType,
            Tag: model.Tag,
            IsDesiredStateAllowed: model.IsDesiredStateAllowed,
            PopulatedBy: model.PopulatedBy,
            RepeatsToSection: ModelUtils.serializeShallowEdge(model.RepeatsToSection(), 'RepeatsToSection'),
            ChildOf: ModelUtils.serializeShallowEdge(model.ChildOf(), 'ChildOf'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            MailBy: ModelUtils.serializeShallowEdge(model.MailBy(), 'MailBy'),
            ParentOf: ModelUtils.serializeShallowEdge(model.ParentOf(), 'ParentOf'),
            Contains: ModelUtils.serializeShallowEdge(model.Contains(), 'Contains'),
            IsSequencedBy: ModelUtils.serializeShallowEdge(model.IsSequencedBy(), 'IsSequencedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DataGroup {
        let clone = new DataGroup();
        clone.data = _.cloneDeep(this.data);
        clone._RepeatsToSection = _.cloneDeep(this._RepeatsToSection);
        clone._ChildOf = _.cloneDeep(this._ChildOf);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._MailBy = _.cloneDeep(this._MailBy);
        clone._ParentOf = _.cloneDeep(this._ParentOf);
        clone._Contains = _.cloneDeep(this._Contains);
        clone._IsSequencedBy = _.cloneDeep(this._IsSequencedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export class DataGroupChildDataGroup extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataGroupChildDataGroup";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to DataGroup
    private __ChildOf: DataGroup;

    ChildOf(context?: BaseDataContext): DataGroup {
        if (this.__ChildOf)
           return this.__ChildOf;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._ChildOf) as DataGroup;
    }
    setChildOf(value: DataGroup) {
        this.__ChildOf = value;
    }
    get _ChildOf(): string {
        return this.Out;
    }
    set _ChildOf(value: string) {
        this.Out = value;
    }
    //   In to DataGroup
    private __ParentOf: DataGroup;

    ParentOf(context?: BaseDataContext): DataGroup {
        if (this.__ParentOf)
           return this.__ParentOf;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._ParentOf) as DataGroup;
    }
    setParentOf(value: DataGroup) {
        this.__ParentOf = value;
    }
    get _ParentOf(): string {
        return this.In;
    }
    set _ParentOf(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): DataGroupChildDataGroup {
       return ModelUtils.deserializeEdge<DataGroupChildDataGroup>(this, input, datacontext, super._deserialize);
    }


    clone(): DataGroupChildDataGroup {
        let clone = new DataGroupChildDataGroup();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class DataGroupContainsDataPoint extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataGroupContainsDataPoint";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to DataGroup
    private __IsContainedBy: DataGroup;

    IsContainedBy(context?: BaseDataContext): DataGroup {
        if (this.__IsContainedBy)
           return this.__IsContainedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsContainedBy) as DataGroup;
    }
    setIsContainedBy(value: DataGroup) {
        this.__IsContainedBy = value;
    }
    get _IsContainedBy(): string {
        return this.Out;
    }
    set _IsContainedBy(value: string) {
        this.Out = value;
    }
    //   In to DataPoint
    private __Contains: DataPoint;

    Contains(context?: BaseDataContext): DataPoint {
        if (this.__Contains)
           return this.__Contains;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Contains) as DataPoint;
    }
    setContains(value: DataPoint) {
        this.__Contains = value;
    }
    get _Contains(): string {
        return this.In;
    }
    set _Contains(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): DataGroupContainsDataPoint {
       return ModelUtils.deserializeEdge<DataGroupContainsDataPoint>(this, input, datacontext, super._deserialize);
    }


    clone(): DataGroupContainsDataPoint {
        let clone = new DataGroupContainsDataPoint();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class DataGroupIsSequencedByDataGroupSequence extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataGroupIsSequencedByDataGroupSequence";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to DataGroup
    private __Sequences: DataGroup;

    Sequences(context?: BaseDataContext): DataGroup {
        if (this.__Sequences)
           return this.__Sequences;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Sequences) as DataGroup;
    }
    setSequences(value: DataGroup) {
        this.__Sequences = value;
    }
    get _Sequences(): string {
        return this.Out;
    }
    set _Sequences(value: string) {
        this.Out = value;
    }
    //   In to DataGroupSequence
    private __IsSequencedBy: DataGroupSequence;

    IsSequencedBy(context?: BaseDataContext): DataGroupSequence {
        if (this.__IsSequencedBy)
           return this.__IsSequencedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsSequencedBy) as DataGroupSequence;
    }
    setIsSequencedBy(value: DataGroupSequence) {
        this.__IsSequencedBy = value;
    }
    get _IsSequencedBy(): string {
        return this.In;
    }
    set _IsSequencedBy(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): DataGroupIsSequencedByDataGroupSequence {
       return ModelUtils.deserializeEdge<DataGroupIsSequencedByDataGroupSequence>(this, input, datacontext, super._deserialize);
    }


    clone(): DataGroupIsSequencedByDataGroupSequence {
        let clone = new DataGroupIsSequencedByDataGroupSequence();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IDataGroupSequence {
    Sequence?: string[],
    Id: string

    Sequences?: object[]

}

export class DataGroupSequence extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataGroupSequence";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof DataGroupSequence }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get Sequence(): string[] {
        return this.data.Sequence;
    }
    set Sequence(value: string[]) {
        this.data.Sequence = value;
    }
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    // Relationship Sequences, returns DataGroup DataGroupIsSequencedByDataGroupSequence[]
    private __Sequences: DataGroupIsSequencedByDataGroupSequence[];
    Sequences(_context?: BaseDataContext): DataGroupIsSequencedByDataGroupSequence[] {
        if (this.__Sequences)
            return this.__Sequences;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Sequences), (id) => context.get(id) as DataGroupIsSequencedByDataGroupSequence);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setSequences(values: DataGroupIsSequencedByDataGroupSequence[]) {
         if (this.Context != null)
             throw Error;

        this.__Sequences = values;
     }
    get _Sequences(): Set<string> {
        if (!this._relationships.has("Sequences"))
            this._relationships.set("Sequences", new Set<string>());

        return this._relationships.get("Sequences");
    }
    set _Sequences(values: Set<string>) {
        this._relationships.set("Sequences", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Sequences',
            edgeType: DataGroupIsSequencedByDataGroupSequence,
            otherVertexPropertyName: 'IsSequencedBy',
            otherVertexType: DataGroup,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataGroupSequence {
        return ModelUtils.deserializeVertex<DataGroupSequence>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataGroupSequence) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Sequence: model.Sequence,
            Id: model.Id,
            Sequences: ModelUtils.serializeShallowEdge(model.Sequences(), 'Sequences'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DataGroupSequence {
        let clone = new DataGroupSequence();
        clone.data = _.cloneDeep(this.data);
        clone._Sequences = _.cloneDeep(this._Sequences);

        //clone.Context = this.Context;
        return clone;
    }
}

export class DataPanelUsesWidget extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataPanelUsesWidget";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to DataPanel
    private __IsUsedBy: DataPanel;

    IsUsedBy(context?: BaseDataContext): DataPanel {
        if (this.__IsUsedBy)
           return this.__IsUsedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsUsedBy) as DataPanel;
    }
    setIsUsedBy(value: DataPanel) {
        this.__IsUsedBy = value;
    }
    get _IsUsedBy(): string {
        return this.Out;
    }
    set _IsUsedBy(value: string) {
        this.Out = value;
    }
    //   In to Widget
    private __Uses: Widget;

    Uses(context?: BaseDataContext): Widget {
        if (this.__Uses)
           return this.__Uses;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Uses) as Widget;
    }
    setUses(value: Widget) {
        this.__Uses = value;
    }
    get _Uses(): string {
        return this.In;
    }
    set _Uses(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): DataPanelUsesWidget {
       return ModelUtils.deserializeEdge<DataPanelUsesWidget>(this, input, datacontext, super._deserialize);
    }


    clone(): DataPanelUsesWidget {
        let clone = new DataPanelUsesWidget();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class DataStoreContainsDataGroup extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataStoreContainsDataGroup";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to DataStore
    private __IsContainedBy: DataStore;

    IsContainedBy(context?: BaseDataContext): DataStore {
        if (this.__IsContainedBy)
           return this.__IsContainedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsContainedBy) as DataStore;
    }
    setIsContainedBy(value: DataStore) {
        this.__IsContainedBy = value;
    }
    get _IsContainedBy(): string {
        return this.Out;
    }
    set _IsContainedBy(value: string) {
        this.Out = value;
    }
    //   In to DataGroup
    private __Contains: DataGroup;

    Contains(context?: BaseDataContext): DataGroup {
        if (this.__Contains)
           return this.__Contains;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Contains) as DataGroup;
    }
    setContains(value: DataGroup) {
        this.__Contains = value;
    }
    get _Contains(): string {
        return this.In;
    }
    set _Contains(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): DataStoreContainsDataGroup {
       return ModelUtils.deserializeEdge<DataStoreContainsDataGroup>(this, input, datacontext, super._deserialize);
    }


    clone(): DataStoreContainsDataGroup {
        let clone = new DataStoreContainsDataGroup();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class DataStoreIsSequencedByDataStoreSequence extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataStoreIsSequencedByDataStoreSequence";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to DataStore
    private __Sequences: DataStore;

    Sequences(context?: BaseDataContext): DataStore {
        if (this.__Sequences)
           return this.__Sequences;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Sequences) as DataStore;
    }
    setSequences(value: DataStore) {
        this.__Sequences = value;
    }
    get _Sequences(): string {
        return this.Out;
    }
    set _Sequences(value: string) {
        this.Out = value;
    }
    //   In to DataStoreSequence
    private __IsSequencedBy: DataStoreSequence;

    IsSequencedBy(context?: BaseDataContext): DataStoreSequence {
        if (this.__IsSequencedBy)
           return this.__IsSequencedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsSequencedBy) as DataStoreSequence;
    }
    setIsSequencedBy(value: DataStoreSequence) {
        this.__IsSequencedBy = value;
    }
    get _IsSequencedBy(): string {
        return this.In;
    }
    set _IsSequencedBy(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): DataStoreIsSequencedByDataStoreSequence {
       return ModelUtils.deserializeEdge<DataStoreIsSequencedByDataStoreSequence>(this, input, datacontext, super._deserialize);
    }


    clone(): DataStoreIsSequencedByDataStoreSequence {
        let clone = new DataStoreIsSequencedByDataStoreSequence();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IDataStoreSequence {
    Sequence?: string[],
    Id: string

    Sequences?: object[]

}

export class DataStoreSequence extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataStoreSequence";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof DataStoreSequence }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get Sequence(): string[] {
        return this.data.Sequence;
    }
    set Sequence(value: string[]) {
        this.data.Sequence = value;
    }
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    // Relationship Sequences, returns DataStore DataStoreIsSequencedByDataStoreSequence[]
    private __Sequences: DataStoreIsSequencedByDataStoreSequence[];
    Sequences(_context?: BaseDataContext): DataStoreIsSequencedByDataStoreSequence[] {
        if (this.__Sequences)
            return this.__Sequences;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Sequences), (id) => context.get(id) as DataStoreIsSequencedByDataStoreSequence);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setSequences(values: DataStoreIsSequencedByDataStoreSequence[]) {
         if (this.Context != null)
             throw Error;

        this.__Sequences = values;
     }
    get _Sequences(): Set<string> {
        if (!this._relationships.has("Sequences"))
            this._relationships.set("Sequences", new Set<string>());

        return this._relationships.get("Sequences");
    }
    set _Sequences(values: Set<string>) {
        this._relationships.set("Sequences", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Sequences',
            edgeType: DataStoreIsSequencedByDataStoreSequence,
            otherVertexPropertyName: 'IsSequencedBy',
            otherVertexType: DataStore,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataStoreSequence {
        return ModelUtils.deserializeVertex<DataStoreSequence>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataStoreSequence) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Sequence: model.Sequence,
            Id: model.Id,
            Sequences: ModelUtils.serializeShallowEdge(model.Sequences(), 'Sequences'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DataStoreSequence {
        let clone = new DataStoreSequence();
        clone.data = _.cloneDeep(this.data);
        clone._Sequences = _.cloneDeep(this._Sequences);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDeployable {
    Id: string,
    readonly DeploymentStatus?: string,
    UndeployedDate?: Date,
    UndeployedBy?: string

    DeployedTo?: object[]

}

export class Deployable extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Deployable";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Deployable }[] = [
            {className: 'ProgramPatch', type: ProgramPatch},
            {className: 'ProgramRevision', type: ProgramRevision},

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
    get DeploymentStatus(): string {
        return this.data.DeploymentStatus;
    }
    get UndeployedDate(): Date {
        return this.data.UndeployedDate ? new Date(this.data.UndeployedDate) : undefined;
    }
    set UndeployedDate(value: Date) {
        this.data.UndeployedDate = value;
    }
    get UndeployedBy(): string {
        return this.data.UndeployedBy;
    }
    set UndeployedBy(value: string) {
        this.data.UndeployedBy = value;
    }

    // Relationships

    // Relationship DeployedTo, returns Area AreaDeploysDeployable[]
    private __DeployedTo: AreaDeploysDeployable[];
    DeployedTo(_context?: BaseDataContext): AreaDeploysDeployable[] {
        if (this.__DeployedTo)
            return this.__DeployedTo;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._DeployedTo), (id) => context.get(id) as AreaDeploysDeployable);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setDeployedTo(values: AreaDeploysDeployable[]) {
         if (this.Context != null)
             throw Error;

        this.__DeployedTo = values;
     }
    get _DeployedTo(): Set<string> {
        if (!this._relationships.has("DeployedTo"))
            this._relationships.set("DeployedTo", new Set<string>());

        return this._relationships.get("DeployedTo");
    }
    set _DeployedTo(values: Set<string>) {
        this._relationships.set("DeployedTo", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'DeployedTo',
            edgeType: AreaDeploysDeployable,
            otherVertexPropertyName: 'Deploys',
            otherVertexType: Area,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Deployable {
        return ModelUtils.deserializeVertex<Deployable>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Deployable) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DeploymentStatus: model.DeploymentStatus,
            UndeployedDate: model.UndeployedDate,
            UndeployedBy: model.UndeployedBy,
            DeployedTo: ModelUtils.serializeShallowEdge(model.DeployedTo(), 'DeployedTo'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Deployable {
        let clone = new Deployable();
        clone.data = _.cloneDeep(this.data);
        clone._DeployedTo = _.cloneDeep(this._DeployedTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDocumentCategory {
    Id: string,
    Category: string,
    Description: string,
    DateLabel: string,
    Status?: string

    IsAllowedBy?: object[],
    AttachedBy?: object[]

}

export class DocumentCategory extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DocumentCategory";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof DocumentCategory }[] = [

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
    get Category(): string {
        return this.data.Category;
    }
    set Category(value: string) {
        this.data.Category = value;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get DateLabel(): string {
        return this.data.DateLabel;
    }
    set DateLabel(value: string) {
        this.data.DateLabel = value;
    }
    get Status(): string {
        return this.data.Status;
    }
    set Status(value: string) {
        this.data.Status = value;
    }

    // Relationships

    // Relationship IsAllowedBy, returns Program ProgramAllowsDocumentCategory[]
    private __IsAllowedBy: ProgramAllowsDocumentCategory[];
    IsAllowedBy(_context?: BaseDataContext): ProgramAllowsDocumentCategory[] {
        if (this.__IsAllowedBy)
            return this.__IsAllowedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsAllowedBy), (id) => context.get(id) as ProgramAllowsDocumentCategory);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsAllowedBy(values: ProgramAllowsDocumentCategory[]) {
         if (this.Context != null)
             throw Error;

        this.__IsAllowedBy = values;
     }
    get _IsAllowedBy(): Set<string> {
        if (!this._relationships.has("IsAllowedBy"))
            this._relationships.set("IsAllowedBy", new Set<string>());

        return this._relationships.get("IsAllowedBy");
    }
    set _IsAllowedBy(values: Set<string>) {
        this._relationships.set("IsAllowedBy", values);
    }

    // Relationship AttachedBy, returns TaskCorrespondence TaskCorrespondenceAttachesDocumentCategory[]
    private __AttachedBy: TaskCorrespondenceAttachesDocumentCategory[];
    AttachedBy(_context?: BaseDataContext): TaskCorrespondenceAttachesDocumentCategory[] {
        if (this.__AttachedBy)
            return this.__AttachedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._AttachedBy), (id) => context.get(id) as TaskCorrespondenceAttachesDocumentCategory);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setAttachedBy(values: TaskCorrespondenceAttachesDocumentCategory[]) {
         if (this.Context != null)
             throw Error;

        this.__AttachedBy = values;
     }
    get _AttachedBy(): Set<string> {
        if (!this._relationships.has("AttachedBy"))
            this._relationships.set("AttachedBy", new Set<string>());

        return this._relationships.get("AttachedBy");
    }
    set _AttachedBy(values: Set<string>) {
        this._relationships.set("AttachedBy", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsAllowedBy',
            edgeType: ProgramAllowsDocumentCategory,
            otherVertexPropertyName: 'Allows',
            otherVertexType: Program,
        },
        {
            propertyName: 'AttachedBy',
            edgeType: TaskCorrespondenceAttachesDocumentCategory,
            otherVertexPropertyName: 'Attaches',
            otherVertexType: TaskCorrespondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DocumentCategory {
        return ModelUtils.deserializeVertex<DocumentCategory>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DocumentCategory) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            Category: model.Category,
            Description: model.Description,
            DateLabel: model.DateLabel,
            Status: model.Status,
            IsAllowedBy: ModelUtils.serializeShallowEdge(model.IsAllowedBy(), 'IsAllowedBy'),
            AttachedBy: ModelUtils.serializeShallowEdge(model.AttachedBy(), 'AttachedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DocumentCategory {
        let clone = new DocumentCategory();
        clone.data = _.cloneDeep(this.data);
        clone._IsAllowedBy = _.cloneDeep(this._IsAllowedBy);
        clone._AttachedBy = _.cloneDeep(this._AttachedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IElement {
    Id: string,
    DisplayLabel?: string,
    ShowHelp: boolean,
    Help?: string,
    readonly ConditionMet: boolean,
    ExternalId?: string,
    EnableListView: boolean,
    DefaultConditionMet: boolean,
    ScriptFunction?: string,
    InputSources?: any[]

    IsEnabledBy?: object[],
    IsDisplayedBy?: object[]

}

export class Element extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Element";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Element }[] = [
            {className: 'DateField', type: DateField},
            {className: 'Field', type: Field},
            {className: 'DecimalField', type: DecimalField},
            {className: 'EmailField', type: EmailField},
            {className: 'StringField', type: StringField},
            {className: 'IntegerField', type: IntegerField},
            {className: 'ListOfStringsField', type: ListOfStringsField},
            {className: 'MoneyField', type: MoneyField},
            {className: 'PhoneField', type: PhoneField},
            {className: 'Section', type: Section},
            {className: 'StaticElement', type: StaticElement},
            {className: 'StaticText', type: StaticText},
            {className: 'TimestampField', type: TimestampField},
            {className: 'UrlField', type: UrlField},
            {className: 'YearField', type: YearField},
            {className: 'YesNoField', type: YesNoField},
            {className: 'ZipcodeField', type: ZipcodeField},

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
    get DisplayLabel(): string {
        return this.data.DisplayLabel;
    }
    set DisplayLabel(value: string) {
        this.data.DisplayLabel = value;
    }
    get ShowHelp(): boolean {
        return this.data.ShowHelp;
    }
    set ShowHelp(value: boolean) {
        this.data.ShowHelp = value;
    }
    get Help(): string {
        return this.data.Help;
    }
    set Help(value: string) {
        this.data.Help = value;
    }
    get ConditionMet(): boolean {
        return this.data.ConditionMet;
    }
    get ExternalId(): string {
        return this.data.ExternalId;
    }
    set ExternalId(value: string) {
        this.data.ExternalId = value;
    }
    get EnableListView(): boolean {
        return this.data.EnableListView;
    }
    set EnableListView(value: boolean) {
        this.data.EnableListView = value;
    }
    get DefaultConditionMet(): boolean {
        return this.data.DefaultConditionMet;
    }
    set DefaultConditionMet(value: boolean) {
        this.data.DefaultConditionMet = value;
    }
    get ScriptFunction(): string {
        return this.data.ScriptFunction;
    }
    set ScriptFunction(value: string) {
        this.data.ScriptFunction = value;
    }
    get InputSources(): any[] {
        return this.data.InputSources;
    }
    set InputSources(value: any[]) {
        this.data.InputSources = value;
    }

    // Relationships

    // Relationship IsEnabledBy, returns ElementCondition ElementConditionEnablesElement[]
    private __IsEnabledBy: ElementConditionEnablesElement[];
    IsEnabledBy(_context?: BaseDataContext): ElementConditionEnablesElement[] {
        if (this.__IsEnabledBy)
            return this.__IsEnabledBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsEnabledBy), (id) => context.get(id) as ElementConditionEnablesElement);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsEnabledBy(values: ElementConditionEnablesElement[]) {
         if (this.Context != null)
             throw Error;

        this.__IsEnabledBy = values;
     }
    get _IsEnabledBy(): Set<string> {
        if (!this._relationships.has("IsEnabledBy"))
            this._relationships.set("IsEnabledBy", new Set<string>());

        return this._relationships.get("IsEnabledBy");
    }
    set _IsEnabledBy(values: Set<string>) {
        this._relationships.set("IsEnabledBy", values);
    }

    // Relationship IsDisplayedBy, returns Section SectionDisplaysElement[]
    private __IsDisplayedBy: SectionDisplaysElement[];
    IsDisplayedBy(_context?: BaseDataContext): SectionDisplaysElement[] {
        if (this.__IsDisplayedBy)
            return this.__IsDisplayedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsDisplayedBy), (id) => context.get(id) as SectionDisplaysElement);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsDisplayedBy(values: SectionDisplaysElement[]) {
         if (this.Context != null)
             throw Error;

        this.__IsDisplayedBy = values;
     }
    get _IsDisplayedBy(): Set<string> {
        if (!this._relationships.has("IsDisplayedBy"))
            this._relationships.set("IsDisplayedBy", new Set<string>());

        return this._relationships.get("IsDisplayedBy");
    }
    set _IsDisplayedBy(values: Set<string>) {
        this._relationships.set("IsDisplayedBy", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsDisplayedBy',
            edgeType: SectionDisplaysElement,
            otherVertexPropertyName: 'Displays',
            otherVertexType: Section,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Element {
        return ModelUtils.deserializeVertex<Element>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Element) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            EnableListView: model.EnableListView,
            DefaultConditionMet: model.DefaultConditionMet,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsDisplayedBy: ModelUtils.serializeShallowEdge(model.IsDisplayedBy(), 'IsDisplayedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Element {
        let clone = new Element();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsDisplayedBy = _.cloneDeep(this._IsDisplayedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IElementCondition {
    Id: string,
    Name?: string,
    Description?: string,
    DefaultConditionMet: boolean,

    IsContainedBy?: object[],
    Enables?: object[],
    Evaluates?: object[]

}

export class ElementCondition extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ElementCondition";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof ElementCondition }[] = [
            {className: 'ScriptCondition', type: ScriptCondition},

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
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get DefaultConditionMet(): boolean {
        return this.data.DefaultConditionMet;
    }
    set DefaultConditionMet(value: boolean) {
        this.data.DefaultConditionMet = value;
    }

    // Relationships

    // Relationship IsContainedBy, returns Application ApplicationContainsElementCondition[]
    private __IsContainedBy: ApplicationContainsElementCondition[];
    IsContainedBy(_context?: BaseDataContext): ApplicationContainsElementCondition[] {
        if (this.__IsContainedBy)
            return this.__IsContainedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsContainedBy), (id) => context.get(id) as ApplicationContainsElementCondition);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsContainedBy(values: ApplicationContainsElementCondition[]) {
         if (this.Context != null)
             throw Error;

        this.__IsContainedBy = values;
     }
    get _IsContainedBy(): Set<string> {
        if (!this._relationships.has("IsContainedBy"))
            this._relationships.set("IsContainedBy", new Set<string>());

        return this._relationships.get("IsContainedBy");
    }
    set _IsContainedBy(values: Set<string>) {
        this._relationships.set("IsContainedBy", values);
    }

    // Relationship Enables, returns Element ElementConditionEnablesElement[]
    private __Enables: ElementConditionEnablesElement[];
    Enables(_context?: BaseDataContext): ElementConditionEnablesElement[] {
        if (this.__Enables)
            return this.__Enables;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Enables), (id) => context.get(id) as ElementConditionEnablesElement);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setEnables(values: ElementConditionEnablesElement[]) {
         if (this.Context != null)
             throw Error;

        this.__Enables = values;
     }
    get _Enables(): Set<string> {
        if (!this._relationships.has("Enables"))
            this._relationships.set("Enables", new Set<string>());

        return this._relationships.get("Enables");
    }
    set _Enables(values: Set<string>) {
        this._relationships.set("Enables", values);
    }

    // Relationship Evaluates, returns DataPoint ElementConditionEvaluatesDataPoint[]
    private __Evaluates: ElementConditionEvaluatesDataPoint[];
    Evaluates(_context?: BaseDataContext): ElementConditionEvaluatesDataPoint[] {
        if (this.__Evaluates)
            return this.__Evaluates;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Evaluates), (id) => context.get(id) as ElementConditionEvaluatesDataPoint);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setEvaluates(values: ElementConditionEvaluatesDataPoint[]) {
         if (this.Context != null)
             throw Error;

        this.__Evaluates = values;
     }
    get _Evaluates(): Set<string> {
        if (!this._relationships.has("Evaluates"))
            this._relationships.set("Evaluates", new Set<string>());

        return this._relationships.get("Evaluates");
    }
    set _Evaluates(values: Set<string>) {
        this._relationships.set("Evaluates", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsContainedBy',
            edgeType: ApplicationContainsElementCondition,
            otherVertexPropertyName: 'ContainsCondition',
            otherVertexType: Application,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Enables',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'IsEnabledBy',
            otherVertexType: Element,
        },
        {
            propertyName: 'Evaluates',
            edgeType: ElementConditionEvaluatesDataPoint,
            otherVertexPropertyName: 'IsEvaluatedForCondition',
            otherVertexType: DataPoint,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): ElementCondition {
        return ModelUtils.deserializeVertex<ElementCondition>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: ElementCondition) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            DefaultConditionMet: model.DefaultConditionMet,
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
            Evaluates: ModelUtils.serializeShallowEdge(model.Evaluates(), 'Evaluates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): ElementCondition {
        let clone = new ElementCondition();
        clone.data = _.cloneDeep(this.data);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._Enables = _.cloneDeep(this._Enables);
        clone._Evaluates = _.cloneDeep(this._Evaluates);

        //clone.Context = this.Context;
        return clone;
    }
}

export class ElementConditionEnablesElement extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ElementConditionEnablesElement";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to ElementCondition
    private __IsEnabledBy: ElementCondition;

    IsEnabledBy(context?: BaseDataContext): ElementCondition {
        if (this.__IsEnabledBy)
           return this.__IsEnabledBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsEnabledBy) as ElementCondition;
    }
    setIsEnabledBy(value: ElementCondition) {
        this.__IsEnabledBy = value;
    }
    get _IsEnabledBy(): string {
        return this.Out;
    }
    set _IsEnabledBy(value: string) {
        this.Out = value;
    }
    //   In to Element
    private __Enables: Element;

    Enables(context?: BaseDataContext): Element {
        if (this.__Enables)
           return this.__Enables;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Enables) as Element;
    }
    setEnables(value: Element) {
        this.__Enables = value;
    }
    get _Enables(): string {
        return this.In;
    }
    set _Enables(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ElementConditionEnablesElement {
       return ModelUtils.deserializeEdge<ElementConditionEnablesElement>(this, input, datacontext, super._deserialize);
    }


    clone(): ElementConditionEnablesElement {
        let clone = new ElementConditionEnablesElement();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ElementConditionEvaluatesDataPoint extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ElementConditionEvaluatesDataPoint";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get InputLabel(): string {
        return this.data.InputLabel;
    }
    set InputLabel(value: string) {
        this.data.InputLabel = value;
    }
    get FromRepeatable(): boolean {
        return this.data.FromRepeatable;
    }
    set FromRepeatable(value: boolean) {
        this.data.FromRepeatable = value;
    }

    // Relationships

    //   Out to ElementCondition
    private __IsEvaluatedForCondition: ElementCondition;

    IsEvaluatedForCondition(context?: BaseDataContext): ElementCondition {
        if (this.__IsEvaluatedForCondition)
           return this.__IsEvaluatedForCondition;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsEvaluatedForCondition) as ElementCondition;
    }
    setIsEvaluatedForCondition(value: ElementCondition) {
        this.__IsEvaluatedForCondition = value;
    }
    get _IsEvaluatedForCondition(): string {
        return this.Out;
    }
    set _IsEvaluatedForCondition(value: string) {
        this.Out = value;
    }
    //   In to DataPoint
    private __Evaluates: DataPoint;

    Evaluates(context?: BaseDataContext): DataPoint {
        if (this.__Evaluates)
           return this.__Evaluates;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Evaluates) as DataPoint;
    }
    setEvaluates(value: DataPoint) {
        this.__Evaluates = value;
    }
    get _Evaluates(): string {
        return this.In;
    }
    set _Evaluates(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ElementConditionEvaluatesDataPoint {
       return ModelUtils.deserializeEdge<ElementConditionEvaluatesDataPoint>(this, input, datacontext, super._deserialize);
    }


    clone(): ElementConditionEvaluatesDataPoint {
        let clone = new ElementConditionEvaluatesDataPoint();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IEmailTemplate {
    Id: string,
    Subject: string,
    HtmlBody: string,
    Name: string,
    Description: string,
    DataParameters?: string[],
    DocumentParameters?: string[],
    CanDelete: boolean

    MessagedBy?: object[]

}

export class EmailTemplate extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "EmailTemplate";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof EmailTemplate }[] = [

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
    get Subject(): string {
        return this.data.Subject;
    }
    set Subject(value: string) {
        this.data.Subject = value;
    }
    get HtmlBody(): string {
        return this.data.HtmlBody;
    }
    set HtmlBody(value: string) {
        this.data.HtmlBody = value;
    }
    get Name(): string {
        return this.data.Name;
    }
    set Name(value: string) {
        this.data.Name = value;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get DataParameters(): string[] {
        return this.data.DataParameters;
    }
    set DataParameters(value: string[]) {
        this.data.DataParameters = value;
    }
    get DocumentParameters(): string[] {
        return this.data.DocumentParameters;
    }
    set DocumentParameters(value: string[]) {
        this.data.DocumentParameters = value;
    }
    get CanDelete(): boolean {
        return this.data.CanDelete;
    }
    set CanDelete(value: boolean) {
        this.data.CanDelete = value;
    }

    // Relationships

    // Relationship MessagedBy, returns TaskCorrespondence TaskCorrespondenceMessagesEmailTemplate[]
    private __MessagedBy: TaskCorrespondenceMessagesEmailTemplate[];
    MessagedBy(_context?: BaseDataContext): TaskCorrespondenceMessagesEmailTemplate[] {
        if (this.__MessagedBy)
            return this.__MessagedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._MessagedBy), (id) => context.get(id) as TaskCorrespondenceMessagesEmailTemplate);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setMessagedBy(values: TaskCorrespondenceMessagesEmailTemplate[]) {
         if (this.Context != null)
             throw Error;

        this.__MessagedBy = values;
     }
    get _MessagedBy(): Set<string> {
        if (!this._relationships.has("MessagedBy"))
            this._relationships.set("MessagedBy", new Set<string>());

        return this._relationships.get("MessagedBy");
    }
    set _MessagedBy(values: Set<string>) {
        this._relationships.set("MessagedBy", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MessagedBy',
            edgeType: TaskCorrespondenceMessagesEmailTemplate,
            otherVertexPropertyName: 'Messages',
            otherVertexType: TaskCorrespondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): EmailTemplate {
        return ModelUtils.deserializeVertex<EmailTemplate>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: EmailTemplate) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            Subject: model.Subject,
            HtmlBody: model.HtmlBody,
            Name: model.Name,
            Description: model.Description,
            DataParameters: model.DataParameters,
            DocumentParameters: model.DocumentParameters,
            CanDelete: model.CanDelete,
            MessagedBy: ModelUtils.serializeShallowEdge(model.MessagedBy(), 'MessagedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): EmailTemplate {
        let clone = new EmailTemplate();
        clone.data = _.cloneDeep(this.data);
        clone._MessagedBy = _.cloneDeep(this._MessagedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export class FeatureFacet extends DocumentModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "FeatureFacet";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get Code(): string {
        return this.data.Code;
    }
    set Code(value: string) {
        this.data.Code = value;
    }
    get Name(): string {
        return this.data.Name;
    }
    set Name(value: string) {
        this.data.Name = value;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get FacetType(): string {
        return this.data.FacetType;
    }
    set FacetType(value: string) {
        this.data.FacetType = value;
    }
    get Deprecated(): boolean {
        return this.data.Deprecated;
    }
    set Deprecated(value: boolean) {
        this.data.Deprecated = value;
    }


    deserialize(input: Object, datacontext): FeatureFacet {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: FeatureFacet) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            Code: model.Code,
            Name: model.Name,
            Description: model.Description,
            FacetType: model.FacetType,
            Deprecated: model.Deprecated,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): FeatureFacet {
        let clone = new FeatureFacet();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class FieldPopulatesDataPoint extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "FieldPopulatesDataPoint";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Field
    private __IsPopulatedBy: Field;

    IsPopulatedBy(context?: BaseDataContext): Field {
        if (this.__IsPopulatedBy)
           return this.__IsPopulatedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsPopulatedBy) as Field;
    }
    setIsPopulatedBy(value: Field) {
        this.__IsPopulatedBy = value;
    }
    get _IsPopulatedBy(): string {
        return this.Out;
    }
    set _IsPopulatedBy(value: string) {
        this.Out = value;
    }
    //   In to DataPoint
    private __Populates: DataPoint;

    Populates(context?: BaseDataContext): DataPoint {
        if (this.__Populates)
           return this.__Populates;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Populates) as DataPoint;
    }
    setPopulates(value: DataPoint) {
        this.__Populates = value;
    }
    get _Populates(): string {
        return this.In;
    }
    set _Populates(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): FieldPopulatesDataPoint {
       return ModelUtils.deserializeEdge<FieldPopulatesDataPoint>(this, input, datacontext, super._deserialize);
    }


    clone(): FieldPopulatesDataPoint {
        let clone = new FieldPopulatesDataPoint();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class Holiday extends DocumentModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Holiday";
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
    get Date(): ContractDate {
        this.data.Date = ModelUtils.deserializeContractDate(this.data.Date);
        return this.data.Date;
    }
    set Date(value: ContractDate) {
        this.data.Date = value;
    }


    deserialize(input: Object, datacontext): Holiday {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: Holiday) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            Name: model.Name,
            Date: ModelUtils.serializeContractDate(model.data.Date),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Holiday {
        let clone = new Holiday();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IMappable {
    Id: string,
    DataType: string



}

export class Mappable extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Mappable";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Mappable }[] = [
            {className: 'DataPoint', type: DataPoint},
            {className: 'DataPointDate', type: DataPointDate},
            {className: 'DataPointDecimal', type: DataPointDecimal},
            {className: 'DataPointEmail', type: DataPointEmail},
            {className: 'DataPointString', type: DataPointString},
            {className: 'DataPointInteger', type: DataPointInteger},
            {className: 'DataPointListOfStrings', type: DataPointListOfStrings},
            {className: 'DataPointMoney', type: DataPointMoney},
            {className: 'DataPointPhone', type: DataPointPhone},
            {className: 'DataPointTimestamp', type: DataPointTimestamp},
            {className: 'DataPointUrl', type: DataPointUrl},
            {className: 'DataPointYear', type: DataPointYear},
            {className: 'DataPointYesNo', type: DataPointYesNo},
            {className: 'DataPointZipcode', type: DataPointZipcode},
            {className: 'Rule', type: Rule},
            {className: 'RuleDateTime', type: RuleDateTime},
            {className: 'RuleProductSelection', type: RuleProductSelection},
            {className: 'RuleRiskAssessment', type: RuleRiskAssessment},
            {className: 'RuleRoleAssignment', type: RuleRoleAssignment},
            {className: 'RuleTaskObligation', type: RuleTaskObligation},
            {className: 'RuleWorkflowSetStatus', type: RuleWorkflowSetStatus},

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
    get DataType(): string {
        return this.data.DataType;
    }
    set DataType(value: string) {
        this.data.DataType = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Mappable {
        return ModelUtils.deserializeVertex<Mappable>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Mappable) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DataType: model.DataType,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Mappable {
        let clone = new Mappable();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface INotification {
    Id: string,
    Message: string,
    Description: string,
    ExpirationDate?: Date,
    EventId: string,
    IdentityKey: string,
    Subtitles?: any[],
    NotificationType?: string,
    ContextIds?: { [index: string]: string }

    Alerts?: object[]

}

export class Notification extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Notification";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Notification }[] = [

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
    get Message(): string {
        return this.data.Message;
    }
    set Message(value: string) {
        this.data.Message = value;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get ExpirationDate(): Date {
        return this.data.ExpirationDate ? new Date(this.data.ExpirationDate) : undefined;
    }
    set ExpirationDate(value: Date) {
        this.data.ExpirationDate = value;
    }
    get EventId(): string {
        return this.data.EventId;
    }
    set EventId(value: string) {
        this.data.EventId = value;
    }
    get IdentityKey(): string {
        return this.data.IdentityKey;
    }
    set IdentityKey(value: string) {
        this.data.IdentityKey = value;
    }
    get Subtitles(): any[] {
        return this.data.Subtitles;
    }
    set Subtitles(value: any[]) {
        this.data.Subtitles = value;
    }
    get NotificationType(): string {
        return this.data.NotificationType;
    }
    set NotificationType(value: string) {
        this.data.NotificationType = value;
    }
    get ContextIds(): { [index: string]: string } {
        return this.data.ContextIds;
    }
    set ContextIds(value: { [index: string]: string }) {
        this.data.ContextIds = value;
    }

    // Relationships

    // Relationship Alerts, returns UserNotificationCenter UserNotificationCenterIsAlertedByNotification[]
    private __Alerts: UserNotificationCenterIsAlertedByNotification[];
    Alerts(_context?: BaseDataContext): UserNotificationCenterIsAlertedByNotification[] {
        if (this.__Alerts)
            return this.__Alerts;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Alerts), (id) => context.get(id) as UserNotificationCenterIsAlertedByNotification);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setAlerts(values: UserNotificationCenterIsAlertedByNotification[]) {
         if (this.Context != null)
             throw Error;

        this.__Alerts = values;
     }
    get _Alerts(): Set<string> {
        if (!this._relationships.has("Alerts"))
            this._relationships.set("Alerts", new Set<string>());

        return this._relationships.get("Alerts");
    }
    set _Alerts(values: Set<string>) {
        this._relationships.set("Alerts", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Alerts',
            edgeType: UserNotificationCenterIsAlertedByNotification,
            otherVertexPropertyName: 'IsAlertedBy',
            otherVertexType: UserNotificationCenter,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Notification {
        return ModelUtils.deserializeVertex<Notification>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Notification) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            Message: model.Message,
            Description: model.Description,
            ExpirationDate: model.ExpirationDate,
            EventId: model.EventId,
            IdentityKey: model.IdentityKey,
            Subtitles: model.Subtitles,
            NotificationType: model.NotificationType,
            ContextIds: model.ContextIds,
            Alerts: ModelUtils.serializeShallowEdge(model.Alerts(), 'Alerts'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Notification {
        let clone = new Notification();
        clone.data = _.cloneDeep(this.data);
        clone._Alerts = _.cloneDeep(this._Alerts);

        //clone.Context = this.Context;
        return clone;
    }
}

export class PhaseIsSequencedByPhaseSequence extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "PhaseIsSequencedByPhaseSequence";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Phase
    private __Sequences: Phase;

    Sequences(context?: BaseDataContext): Phase {
        if (this.__Sequences)
           return this.__Sequences;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Sequences) as Phase;
    }
    setSequences(value: Phase) {
        this.__Sequences = value;
    }
    get _Sequences(): string {
        return this.Out;
    }
    set _Sequences(value: string) {
        this.Out = value;
    }
    //   In to PhaseSequence
    private __IsSequencedBy: PhaseSequence;

    IsSequencedBy(context?: BaseDataContext): PhaseSequence {
        if (this.__IsSequencedBy)
           return this.__IsSequencedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsSequencedBy) as PhaseSequence;
    }
    setIsSequencedBy(value: PhaseSequence) {
        this.__IsSequencedBy = value;
    }
    get _IsSequencedBy(): string {
        return this.In;
    }
    set _IsSequencedBy(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): PhaseIsSequencedByPhaseSequence {
       return ModelUtils.deserializeEdge<PhaseIsSequencedByPhaseSequence>(this, input, datacontext, super._deserialize);
    }


    clone(): PhaseIsSequencedByPhaseSequence {
        let clone = new PhaseIsSequencedByPhaseSequence();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class PhaseRequiresTask extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "PhaseRequiresTask";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Phase
    private __IsRequiredFor: Phase;

    IsRequiredFor(context?: BaseDataContext): Phase {
        if (this.__IsRequiredFor)
           return this.__IsRequiredFor;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsRequiredFor) as Phase;
    }
    setIsRequiredFor(value: Phase) {
        this.__IsRequiredFor = value;
    }
    get _IsRequiredFor(): string {
        return this.Out;
    }
    set _IsRequiredFor(value: string) {
        this.Out = value;
    }
    //   In to Task
    private __Requires: Task;

    Requires(context?: BaseDataContext): Task {
        if (this.__Requires)
           return this.__Requires;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Requires) as Task;
    }
    setRequires(value: Task) {
        this.__Requires = value;
    }
    get _Requires(): string {
        return this.In;
    }
    set _Requires(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): PhaseRequiresTask {
       return ModelUtils.deserializeEdge<PhaseRequiresTask>(this, input, datacontext, super._deserialize);
    }


    clone(): PhaseRequiresTask {
        let clone = new PhaseRequiresTask();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IPhaseSequence {
    Sequence?: string[],
    Id: string

    Sequences?: object[]

}

export class PhaseSequence extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "PhaseSequence";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof PhaseSequence }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get Sequence(): string[] {
        return this.data.Sequence;
    }
    set Sequence(value: string[]) {
        this.data.Sequence = value;
    }
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    // Relationship Sequences, returns Phase PhaseIsSequencedByPhaseSequence[]
    private __Sequences: PhaseIsSequencedByPhaseSequence[];
    Sequences(_context?: BaseDataContext): PhaseIsSequencedByPhaseSequence[] {
        if (this.__Sequences)
            return this.__Sequences;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Sequences), (id) => context.get(id) as PhaseIsSequencedByPhaseSequence);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setSequences(values: PhaseIsSequencedByPhaseSequence[]) {
         if (this.Context != null)
             throw Error;

        this.__Sequences = values;
     }
    get _Sequences(): Set<string> {
        if (!this._relationships.has("Sequences"))
            this._relationships.set("Sequences", new Set<string>());

        return this._relationships.get("Sequences");
    }
    set _Sequences(values: Set<string>) {
        this._relationships.set("Sequences", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Sequences',
            edgeType: PhaseIsSequencedByPhaseSequence,
            otherVertexPropertyName: 'IsSequencedBy',
            otherVertexType: Phase,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): PhaseSequence {
        return ModelUtils.deserializeVertex<PhaseSequence>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: PhaseSequence) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Sequence: model.Sequence,
            Id: model.Id,
            Sequences: ModelUtils.serializeShallowEdge(model.Sequences(), 'Sequences'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): PhaseSequence {
        let clone = new PhaseSequence();
        clone.data = _.cloneDeep(this.data);
        clone._Sequences = _.cloneDeep(this._Sequences);

        //clone.Context = this.Context;
        return clone;
    }
}

export class Prioritization extends DocumentModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Prioritization";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get PrioritizationTypeOrder(): string[] {
        return this.data.PrioritizationTypeOrder;
    }
    set PrioritizationTypeOrder(value: string[]) {
        this.data.PrioritizationTypeOrder = value;
    }
    get DeadlineImminentValue(): number {
        return this.data.DeadlineImminentValue;
    }
    set DeadlineImminentValue(value: number) {
        this.data.DeadlineImminentValue = value;
    }
    get DeadlineImminentUnitOfTime(): string {
        return this.data.DeadlineImminentUnitOfTime;
    }
    set DeadlineImminentUnitOfTime(value: string) {
        this.data.DeadlineImminentUnitOfTime = value;
    }
    get DueDateImminentValue(): number {
        return this.data.DueDateImminentValue;
    }
    set DueDateImminentValue(value: number) {
        this.data.DueDateImminentValue = value;
    }
    get DueDateImminentUnitOfTime(): string {
        return this.data.DueDateImminentUnitOfTime;
    }
    set DueDateImminentUnitOfTime(value: string) {
        this.data.DueDateImminentUnitOfTime = value;
    }
    get ServiceLevelImminentValue(): number {
        return this.data.ServiceLevelImminentValue;
    }
    set ServiceLevelImminentValue(value: number) {
        this.data.ServiceLevelImminentValue = value;
    }
    get ServiceLevelImminentUnitOfTime(): string {
        return this.data.ServiceLevelImminentUnitOfTime;
    }
    set ServiceLevelImminentUnitOfTime(value: string) {
        this.data.ServiceLevelImminentUnitOfTime = value;
    }
    get LastUpdatedBy(): string {
        return this.data.LastUpdatedBy;
    }
    set LastUpdatedBy(value: string) {
        this.data.LastUpdatedBy = value;
    }


    deserialize(input: Object, datacontext): Prioritization {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: Prioritization) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            PrioritizationTypeOrder: model.PrioritizationTypeOrder,
            DeadlineImminentValue: model.DeadlineImminentValue,
            DeadlineImminentUnitOfTime: model.DeadlineImminentUnitOfTime,
            DueDateImminentValue: model.DueDateImminentValue,
            DueDateImminentUnitOfTime: model.DueDateImminentUnitOfTime,
            ServiceLevelImminentValue: model.ServiceLevelImminentValue,
            ServiceLevelImminentUnitOfTime: model.ServiceLevelImminentUnitOfTime,
            LastUpdatedBy: model.LastUpdatedBy,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Prioritization {
        let clone = new Prioritization();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IProducer {
    Id: string,
    Name: string,
    Dba?: string,
    Phone: string,
    Fax?: string,
    Country?: string,
    Address1: string,
    Address2?: string,
    Address3?: string,
    City: string,
    State?: string,
    Zip: string,
    County?: string,
    Website?: string,
    FEIN?: string,
    NewBusinessCommission: number,
    RenewalCommission: number,
    Code?: string,
    OffersAllPrograms: boolean,

    Offers?: object[]

}

export class Producer extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Producer";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Producer }[] = [

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
    get Dba(): string {
        return this.data.Dba;
    }
    set Dba(value: string) {
        this.data.Dba = value;
    }
    get Phone(): string {
        return this.data.Phone;
    }
    set Phone(value: string) {
        this.data.Phone = value;
    }
    get Fax(): string {
        return this.data.Fax;
    }
    set Fax(value: string) {
        this.data.Fax = value;
    }
    get Country(): string {
        return this.data.Country;
    }
    set Country(value: string) {
        this.data.Country = value;
    }
    get Address1(): string {
        return this.data.Address1;
    }
    set Address1(value: string) {
        this.data.Address1 = value;
    }
    get Address2(): string {
        return this.data.Address2;
    }
    set Address2(value: string) {
        this.data.Address2 = value;
    }
    get Address3(): string {
        return this.data.Address3;
    }
    set Address3(value: string) {
        this.data.Address3 = value;
    }
    get City(): string {
        return this.data.City;
    }
    set City(value: string) {
        this.data.City = value;
    }
    get State(): string {
        return this.data.State;
    }
    set State(value: string) {
        this.data.State = value;
    }
    get Zip(): string {
        return this.data.Zip;
    }
    set Zip(value: string) {
        this.data.Zip = value;
    }
    get County(): string {
        return this.data.County;
    }
    set County(value: string) {
        this.data.County = value;
    }
    get Website(): string {
        return this.data.Website;
    }
    set Website(value: string) {
        this.data.Website = value;
    }
    get FEIN(): string {
        return this.data.FEIN;
    }
    set FEIN(value: string) {
        this.data.FEIN = value;
    }
    get NewBusinessCommission(): number {
        return this.data.NewBusinessCommission;
    }
    set NewBusinessCommission(value: number) {
        this.data.NewBusinessCommission = value;
    }
    get RenewalCommission(): number {
        return this.data.RenewalCommission;
    }
    set RenewalCommission(value: number) {
        this.data.RenewalCommission = value;
    }
    get Code(): string {
        return this.data.Code;
    }
    set Code(value: string) {
        this.data.Code = value;
    }
    get OffersAllPrograms(): boolean {
        return this.data.OffersAllPrograms;
    }
    set OffersAllPrograms(value: boolean) {
        this.data.OffersAllPrograms = value;
    }

    // Relationships

    // Relationship Offers, returns Program ProducerOffersProgram[]
    private __Offers: ProducerOffersProgram[];
    Offers(_context?: BaseDataContext): ProducerOffersProgram[] {
        if (this.__Offers)
            return this.__Offers;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Offers), (id) => context.get(id) as ProducerOffersProgram);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setOffers(values: ProducerOffersProgram[]) {
         if (this.Context != null)
             throw Error;

        this.__Offers = values;
     }
    get _Offers(): Set<string> {
        if (!this._relationships.has("Offers"))
            this._relationships.set("Offers", new Set<string>());

        return this._relationships.get("Offers");
    }
    set _Offers(values: Set<string>) {
        this._relationships.set("Offers", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Offers',
            edgeType: ProducerOffersProgram,
            otherVertexPropertyName: 'IsOfferedBy',
            otherVertexType: Program,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Producer {
        return ModelUtils.deserializeVertex<Producer>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Producer) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            Name: model.Name,
            Dba: model.Dba,
            Phone: model.Phone,
            Fax: model.Fax,
            Country: model.Country,
            Address1: model.Address1,
            Address2: model.Address2,
            Address3: model.Address3,
            City: model.City,
            State: model.State,
            Zip: model.Zip,
            County: model.County,
            Website: model.Website,
            FEIN: model.FEIN,
            NewBusinessCommission: model.NewBusinessCommission,
            RenewalCommission: model.RenewalCommission,
            Code: model.Code,
            OffersAllPrograms: model.OffersAllPrograms,
            Offers: ModelUtils.serializeShallowEdge(model.Offers(), 'Offers'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Producer {
        let clone = new Producer();
        clone.data = _.cloneDeep(this.data);
        clone._Offers = _.cloneDeep(this._Offers);

        //clone.Context = this.Context;
        return clone;
    }
}

export class ProducerOffersProgram extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProducerOffersProgram";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get HasCommissionOverride(): boolean {
        return this.data.HasCommissionOverride;
    }
    set HasCommissionOverride(value: boolean) {
        this.data.HasCommissionOverride = value;
    }
    get NewBusinessCommission(): number {
        return this.data.NewBusinessCommission;
    }
    set NewBusinessCommission(value: number) {
        this.data.NewBusinessCommission = value;
    }
    get RenewalCommission(): number {
        return this.data.RenewalCommission;
    }
    set RenewalCommission(value: number) {
        this.data.RenewalCommission = value;
    }
    get NewBusinessProductCommission(): { [index: string]: number } {
        return this.data.NewBusinessProductCommission;
    }
    set NewBusinessProductCommission(value: { [index: string]: number }) {
        this.data.NewBusinessProductCommission = value;
    }
    get RenewalProductCommission(): { [index: string]: number } {
        return this.data.RenewalProductCommission;
    }
    set RenewalProductCommission(value: { [index: string]: number }) {
        this.data.RenewalProductCommission = value;
    }

    // Relationships

    //   Out to Producer
    private __IsOfferedBy: Producer;

    IsOfferedBy(context?: BaseDataContext): Producer {
        if (this.__IsOfferedBy)
           return this.__IsOfferedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsOfferedBy) as Producer;
    }
    setIsOfferedBy(value: Producer) {
        this.__IsOfferedBy = value;
    }
    get _IsOfferedBy(): string {
        return this.Out;
    }
    set _IsOfferedBy(value: string) {
        this.Out = value;
    }
    //   In to Program
    private __Offers: Program;

    Offers(context?: BaseDataContext): Program {
        if (this.__Offers)
           return this.__Offers;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Offers) as Program;
    }
    setOffers(value: Program) {
        this.__Offers = value;
    }
    get _Offers(): string {
        return this.In;
    }
    set _Offers(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ProducerOffersProgram {
       return ModelUtils.deserializeEdge<ProducerOffersProgram>(this, input, datacontext, super._deserialize);
    }


    clone(): ProducerOffersProgram {
        let clone = new ProducerOffersProgram();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IProduct {
    Id: string,
    Name: string,
    Description: string,
    DefaultTerm: string,
    Tags?: string[]

    IsOfferedBy?: object[],
    IsWrittenBy?: object[]

}

export class Product extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Product";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Product }[] = [

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
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get DefaultTerm(): string {
        return this.data.DefaultTerm;
    }
    set DefaultTerm(value: string) {
        this.data.DefaultTerm = value;
    }
    get Tags(): string[] {
        return this.data.Tags;
    }
    set Tags(value: string[]) {
        this.data.Tags = value;
    }

    // Relationships

    // Relationship IsOfferedBy, returns Program ProgramOffersProduct[]
    private __IsOfferedBy: ProgramOffersProduct[];
    IsOfferedBy(_context?: BaseDataContext): ProgramOffersProduct[] {
        if (this.__IsOfferedBy)
            return this.__IsOfferedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsOfferedBy), (id) => context.get(id) as ProgramOffersProduct);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsOfferedBy(values: ProgramOffersProduct[]) {
         if (this.Context != null)
             throw Error;

        this.__IsOfferedBy = values;
     }
    get _IsOfferedBy(): Set<string> {
        if (!this._relationships.has("IsOfferedBy"))
            this._relationships.set("IsOfferedBy", new Set<string>());

        return this._relationships.get("IsOfferedBy");
    }
    set _IsOfferedBy(values: Set<string>) {
        this._relationships.set("IsOfferedBy", values);
    }

    // Relationship IsWrittenBy, returns Company CompanyWritesProduct[]
    private __IsWrittenBy: CompanyWritesProduct[];
    IsWrittenBy(_context?: BaseDataContext): CompanyWritesProduct[] {
        if (this.__IsWrittenBy)
            return this.__IsWrittenBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsWrittenBy), (id) => context.get(id) as CompanyWritesProduct);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsWrittenBy(values: CompanyWritesProduct[]) {
         if (this.Context != null)
             throw Error;

        this.__IsWrittenBy = values;
     }
    get _IsWrittenBy(): Set<string> {
        if (!this._relationships.has("IsWrittenBy"))
            this._relationships.set("IsWrittenBy", new Set<string>());

        return this._relationships.get("IsWrittenBy");
    }
    set _IsWrittenBy(values: Set<string>) {
        this._relationships.set("IsWrittenBy", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsOfferedBy',
            edgeType: ProgramOffersProduct,
            otherVertexPropertyName: 'Offers',
            otherVertexType: Program,
        },
        {
            propertyName: 'IsWrittenBy',
            edgeType: CompanyWritesProduct,
            otherVertexPropertyName: 'Writes',
            otherVertexType: Company,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Product {
        return ModelUtils.deserializeVertex<Product>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Product) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            DefaultTerm: model.DefaultTerm,
            Tags: model.Tags,
            IsOfferedBy: ModelUtils.serializeShallowEdge(model.IsOfferedBy(), 'IsOfferedBy'),
            IsWrittenBy: ModelUtils.serializeShallowEdge(model.IsWrittenBy(), 'IsWrittenBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Product {
        let clone = new Product();
        clone.data = _.cloneDeep(this.data);
        clone._IsOfferedBy = _.cloneDeep(this._IsOfferedBy);
        clone._IsWrittenBy = _.cloneDeep(this._IsWrittenBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export class ProgramAllowsDocumentCategory extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramAllowsDocumentCategory";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Program
    private __IsAllowedBy: Program;

    IsAllowedBy(context?: BaseDataContext): Program {
        if (this.__IsAllowedBy)
           return this.__IsAllowedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsAllowedBy) as Program;
    }
    setIsAllowedBy(value: Program) {
        this.__IsAllowedBy = value;
    }
    get _IsAllowedBy(): string {
        return this.Out;
    }
    set _IsAllowedBy(value: string) {
        this.Out = value;
    }
    //   In to DocumentCategory
    private __Allows: DocumentCategory;

    Allows(context?: BaseDataContext): DocumentCategory {
        if (this.__Allows)
           return this.__Allows;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Allows) as DocumentCategory;
    }
    setAllows(value: DocumentCategory) {
        this.__Allows = value;
    }
    get _Allows(): string {
        return this.In;
    }
    set _Allows(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ProgramAllowsDocumentCategory {
       return ModelUtils.deserializeEdge<ProgramAllowsDocumentCategory>(this, input, datacontext, super._deserialize);
    }


    clone(): ProgramAllowsDocumentCategory {
        let clone = new ProgramAllowsDocumentCategory();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IProgramChange {
    readonly ChangeNo: number,
    Summary: string,
    Description?: string,
    readonly Status: string,
    readonly Author: string,
    readonly StartDate: Date,
    readonly ValidationStatus: string,
    Id: string,
    ProgramChanges: number,
    WorkflowChanges: number,
    DataChanges: number,

    Edits?: object[]

}

export class ProgramChange extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramChange";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof ProgramChange }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get ChangeNo(): number {
        return this.data.ChangeNo;
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
    get Status(): string {
        return this.data.Status;
    }
    get Author(): string {
        return this.data.Author;
    }
    get StartDate(): Date {
        return this.data.StartDate ? new Date(this.data.StartDate) : undefined;
    }
    get ValidationStatus(): string {
        return this.data.ValidationStatus;
    }
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get ProgramChanges(): number {
        return this.data.ProgramChanges;
    }
    set ProgramChanges(value: number) {
        this.data.ProgramChanges = value;
    }
    get WorkflowChanges(): number {
        return this.data.WorkflowChanges;
    }
    set WorkflowChanges(value: number) {
        this.data.WorkflowChanges = value;
    }
    get DataChanges(): number {
        return this.data.DataChanges;
    }
    set DataChanges(value: number) {
        this.data.DataChanges = value;
    }

    // Relationships

    // Relationship Edits, returns Program ProgramChangeEditsProgram[]
    private __Edits: ProgramChangeEditsProgram[];
    Edits(_context?: BaseDataContext): ProgramChangeEditsProgram[] {
        if (this.__Edits)
            return this.__Edits;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Edits), (id) => context.get(id) as ProgramChangeEditsProgram);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setEdits(values: ProgramChangeEditsProgram[]) {
         if (this.Context != null)
             throw Error;

        this.__Edits = values;
     }
    get _Edits(): Set<string> {
        if (!this._relationships.has("Edits"))
            this._relationships.set("Edits", new Set<string>());

        return this._relationships.get("Edits");
    }
    set _Edits(values: Set<string>) {
        this._relationships.set("Edits", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Edits',
            edgeType: ProgramChangeEditsProgram,
            otherVertexPropertyName: 'IsEditedBy',
            otherVertexType: Program,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): ProgramChange {
        return ModelUtils.deserializeVertex<ProgramChange>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: ProgramChange) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            ChangeNo: model.ChangeNo,
            Summary: model.Summary,
            Description: model.Description,
            Status: model.Status,
            Author: model.Author,
            StartDate: model.StartDate,
            ValidationStatus: model.ValidationStatus,
            Id: model.Id,
            ProgramChanges: model.ProgramChanges,
            WorkflowChanges: model.WorkflowChanges,
            DataChanges: model.DataChanges,
            Edits: ModelUtils.serializeShallowEdge(model.Edits(), 'Edits'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): ProgramChange {
        let clone = new ProgramChange();
        clone.data = _.cloneDeep(this.data);
        clone._Edits = _.cloneDeep(this._Edits);

        //clone.Context = this.Context;
        return clone;
    }
}

export class ProgramChangeEditsProgram extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramChangeEditsProgram";
    }

    // Properties
    get Locked(): Date {
        return this.data.Locked ? new Date(this.data.Locked) : undefined;
    }
    get LockedBy(): string {
        return this.data.LockedBy;
    }
    get Updated(): Date {
        return this.data.Updated ? new Date(this.data.Updated) : undefined;
    }
    get UpdatedBy(): string {
        return this.data.UpdatedBy;
    }
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get NumberOfChanges(): number {
        return this.data.NumberOfChanges;
    }
    set NumberOfChanges(value: number) {
        this.data.NumberOfChanges = value;
    }

    // Relationships

    //   Out to ProgramChange
    private __IsEditedBy: ProgramChange;

    IsEditedBy(context?: BaseDataContext): ProgramChange {
        if (this.__IsEditedBy)
           return this.__IsEditedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsEditedBy) as ProgramChange;
    }
    setIsEditedBy(value: ProgramChange) {
        this.__IsEditedBy = value;
    }
    get _IsEditedBy(): string {
        return this.Out;
    }
    set _IsEditedBy(value: string) {
        this.Out = value;
    }
    //   In to Program
    private __Edits: Program;

    Edits(context?: BaseDataContext): Program {
        if (this.__Edits)
           return this.__Edits;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Edits) as Program;
    }
    setEdits(value: Program) {
        this.__Edits = value;
    }
    get _Edits(): string {
        return this.In;
    }
    set _Edits(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ProgramChangeEditsProgram {
       return ModelUtils.deserializeEdge<ProgramChangeEditsProgram>(this, input, datacontext, super._deserialize);
    }


    clone(): ProgramChangeEditsProgram {
        let clone = new ProgramChangeEditsProgram();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ProgramChangeLog extends DocumentModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramChangeLog";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get RevisionedOwner(): string {
        return this.data.RevisionedOwner;
    }
    get RevisionedComponent(): string {
        return this.data.RevisionedComponent;
    }
    get ChangeType(): string {
        return this.data.ChangeType;
    }
    get RevisionableId(): string {
        return this.data.RevisionableId;
    }
    get RevisionableType(): string {
        return this.data.RevisionableType;
    }
    get ChangeId(): string {
        return this.data.ChangeId;
    }
    get LastChanged(): Date {
        return this.data.LastChanged ? new Date(this.data.LastChanged) : undefined;
    }
    get Rollback(): string {
        return this.data.Rollback;
    }


    deserialize(input: Object, datacontext): ProgramChangeLog {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: ProgramChangeLog) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            RevisionedOwner: model.RevisionedOwner,
            RevisionedComponent: model.RevisionedComponent,
            ChangeType: model.ChangeType,
            RevisionableId: model.RevisionableId,
            RevisionableType: model.RevisionableType,
            ChangeId: model.ChangeId,
            LastChanged: model.LastChanged,
            Rollback: model.Rollback,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): ProgramChangeLog {
        let clone = new ProgramChangeLog();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ProgramCollectsApplication extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramCollectsApplication";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Program
    private __IsCollectedBy: Program;

    IsCollectedBy(context?: BaseDataContext): Program {
        if (this.__IsCollectedBy)
           return this.__IsCollectedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsCollectedBy) as Program;
    }
    setIsCollectedBy(value: Program) {
        this.__IsCollectedBy = value;
    }
    get _IsCollectedBy(): string {
        return this.Out;
    }
    set _IsCollectedBy(value: string) {
        this.Out = value;
    }
    //   In to Application
    private __Collects: Application;

    Collects(context?: BaseDataContext): Application {
        if (this.__Collects)
           return this.__Collects;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Collects) as Application;
    }
    setCollects(value: Application) {
        this.__Collects = value;
    }
    get _Collects(): string {
        return this.In;
    }
    set _Collects(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ProgramCollectsApplication {
       return ModelUtils.deserializeEdge<ProgramCollectsApplication>(this, input, datacontext, super._deserialize);
    }


    clone(): ProgramCollectsApplication {
        let clone = new ProgramCollectsApplication();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ProgramConfiguredByProgramOptions extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramConfiguredByProgramOptions";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Program
    private __Configures: Program;

    Configures(context?: BaseDataContext): Program {
        if (this.__Configures)
           return this.__Configures;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Configures) as Program;
    }
    setConfigures(value: Program) {
        this.__Configures = value;
    }
    get _Configures(): string {
        return this.Out;
    }
    set _Configures(value: string) {
        this.Out = value;
    }
    //   In to ProgramOptions
    private __IsConfiguredBy: ProgramOptions;

    IsConfiguredBy(context?: BaseDataContext): ProgramOptions {
        if (this.__IsConfiguredBy)
           return this.__IsConfiguredBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsConfiguredBy) as ProgramOptions;
    }
    setIsConfiguredBy(value: ProgramOptions) {
        this.__IsConfiguredBy = value;
    }
    get _IsConfiguredBy(): string {
        return this.In;
    }
    set _IsConfiguredBy(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ProgramConfiguredByProgramOptions {
       return ModelUtils.deserializeEdge<ProgramConfiguredByProgramOptions>(this, input, datacontext, super._deserialize);
    }


    clone(): ProgramConfiguredByProgramOptions {
        let clone = new ProgramConfiguredByProgramOptions();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ProgramDefinesWorkflowSet extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramDefinesWorkflowSet";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Program
    private __IsDefinedFor: Program;

    IsDefinedFor(context?: BaseDataContext): Program {
        if (this.__IsDefinedFor)
           return this.__IsDefinedFor;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsDefinedFor) as Program;
    }
    setIsDefinedFor(value: Program) {
        this.__IsDefinedFor = value;
    }
    get _IsDefinedFor(): string {
        return this.Out;
    }
    set _IsDefinedFor(value: string) {
        this.Out = value;
    }
    //   In to WorkflowSet
    private __Defines: WorkflowSet;

    Defines(context?: BaseDataContext): WorkflowSet {
        if (this.__Defines)
           return this.__Defines;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Defines) as WorkflowSet;
    }
    setDefines(value: WorkflowSet) {
        this.__Defines = value;
    }
    get _Defines(): string {
        return this.In;
    }
    set _Defines(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ProgramDefinesWorkflowSet {
       return ModelUtils.deserializeEdge<ProgramDefinesWorkflowSet>(this, input, datacontext, super._deserialize);
    }


    clone(): ProgramDefinesWorkflowSet {
        let clone = new ProgramDefinesWorkflowSet();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ProgramDisplaysDataPanel extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramDisplaysDataPanel";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Program
    private __IsDisplayedBy: Program;

    IsDisplayedBy(context?: BaseDataContext): Program {
        if (this.__IsDisplayedBy)
           return this.__IsDisplayedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsDisplayedBy) as Program;
    }
    setIsDisplayedBy(value: Program) {
        this.__IsDisplayedBy = value;
    }
    get _IsDisplayedBy(): string {
        return this.Out;
    }
    set _IsDisplayedBy(value: string) {
        this.Out = value;
    }
    //   In to DataPanel
    private __Displays: DataPanel;

    Displays(context?: BaseDataContext): DataPanel {
        if (this.__Displays)
           return this.__Displays;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Displays) as DataPanel;
    }
    setDisplays(value: DataPanel) {
        this.__Displays = value;
    }
    get _Displays(): string {
        return this.In;
    }
    set _Displays(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ProgramDisplaysDataPanel {
       return ModelUtils.deserializeEdge<ProgramDisplaysDataPanel>(this, input, datacontext, super._deserialize);
    }


    clone(): ProgramDisplaysDataPanel {
        let clone = new ProgramDisplaysDataPanel();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ProgramEmploysTenantUser extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramEmploysTenantUser";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get IsManager(): boolean {
        return this.data.IsManager;
    }
    set IsManager(value: boolean) {
        this.data.IsManager = value;
    }

    // Relationships

    //   Out to Program
    private __IsEmployedBy: Program;

    IsEmployedBy(context?: BaseDataContext): Program {
        if (this.__IsEmployedBy)
           return this.__IsEmployedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsEmployedBy) as Program;
    }
    setIsEmployedBy(value: Program) {
        this.__IsEmployedBy = value;
    }
    get _IsEmployedBy(): string {
        return this.Out;
    }
    set _IsEmployedBy(value: string) {
        this.Out = value;
    }
    //   In to TenantUser
    private __Employs: TenantUser;

    Employs(context?: BaseDataContext): TenantUser {
        if (this.__Employs)
           return this.__Employs;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Employs) as TenantUser;
    }
    setEmploys(value: TenantUser) {
        this.__Employs = value;
    }
    get _Employs(): string {
        return this.In;
    }
    set _Employs(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ProgramEmploysTenantUser {
       return ModelUtils.deserializeEdge<ProgramEmploysTenantUser>(this, input, datacontext, super._deserialize);
    }


    clone(): ProgramEmploysTenantUser {
        let clone = new ProgramEmploysTenantUser();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ProgramEvaluatesRuleSet extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramEvaluatesRuleSet";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Program
    private __IsEvaluatedBy: Program;

    IsEvaluatedBy(context?: BaseDataContext): Program {
        if (this.__IsEvaluatedBy)
           return this.__IsEvaluatedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsEvaluatedBy) as Program;
    }
    setIsEvaluatedBy(value: Program) {
        this.__IsEvaluatedBy = value;
    }
    get _IsEvaluatedBy(): string {
        return this.Out;
    }
    set _IsEvaluatedBy(value: string) {
        this.Out = value;
    }
    //   In to RuleSet
    private __Evaluates: RuleSet;

    Evaluates(context?: BaseDataContext): RuleSet {
        if (this.__Evaluates)
           return this.__Evaluates;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Evaluates) as RuleSet;
    }
    setEvaluates(value: RuleSet) {
        this.__Evaluates = value;
    }
    get _Evaluates(): string {
        return this.In;
    }
    set _Evaluates(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ProgramEvaluatesRuleSet {
       return ModelUtils.deserializeEdge<ProgramEvaluatesRuleSet>(this, input, datacontext, super._deserialize);
    }


    clone(): ProgramEvaluatesRuleSet {
        let clone = new ProgramEvaluatesRuleSet();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ProgramFormattedByRegion extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramFormattedByRegion";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Program
    private __Formats: Program;

    Formats(context?: BaseDataContext): Program {
        if (this.__Formats)
           return this.__Formats;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Formats) as Program;
    }
    setFormats(value: Program) {
        this.__Formats = value;
    }
    get _Formats(): string {
        return this.Out;
    }
    set _Formats(value: string) {
        this.Out = value;
    }
    //   In to Region
    private __IsFormattedBy: Region;

    IsFormattedBy(context?: BaseDataContext): Region {
        if (this.__IsFormattedBy)
           return this.__IsFormattedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsFormattedBy) as Region;
    }
    setIsFormattedBy(value: Region) {
        this.__IsFormattedBy = value;
    }
    get _IsFormattedBy(): string {
        return this.In;
    }
    set _IsFormattedBy(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ProgramFormattedByRegion {
       return ModelUtils.deserializeEdge<ProgramFormattedByRegion>(this, input, datacontext, super._deserialize);
    }


    clone(): ProgramFormattedByRegion {
        let clone = new ProgramFormattedByRegion();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ProgramObligatesAccountRole extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramObligatesAccountRole";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get InitiallyFilled(): string {
        return this.data.InitiallyFilled;
    }
    set InitiallyFilled(value: string) {
        this.data.InitiallyFilled = value;
    }
    get UserIds(): string[] {
        return this.data.UserIds;
    }
    set UserIds(value: string[]) {
        this.data.UserIds = value;
    }
    get AuthorityLevel(): number {
        return this.data.AuthorityLevel;
    }
    set AuthorityLevel(value: number) {
        this.data.AuthorityLevel = value;
    }

    // Relationships

    //   Out to Program
    private __IsObligatedBy: Program;

    IsObligatedBy(context?: BaseDataContext): Program {
        if (this.__IsObligatedBy)
           return this.__IsObligatedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsObligatedBy) as Program;
    }
    setIsObligatedBy(value: Program) {
        this.__IsObligatedBy = value;
    }
    get _IsObligatedBy(): string {
        return this.Out;
    }
    set _IsObligatedBy(value: string) {
        this.Out = value;
    }
    //   In to AccountRole
    private __Obligates: AccountRole;

    Obligates(context?: BaseDataContext): AccountRole {
        if (this.__Obligates)
           return this.__Obligates;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Obligates) as AccountRole;
    }
    setObligates(value: AccountRole) {
        this.__Obligates = value;
    }
    get _Obligates(): string {
        return this.In;
    }
    set _Obligates(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ProgramObligatesAccountRole {
       return ModelUtils.deserializeEdge<ProgramObligatesAccountRole>(this, input, datacontext, super._deserialize);
    }


    clone(): ProgramObligatesAccountRole {
        let clone = new ProgramObligatesAccountRole();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ProgramOffersProduct extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramOffersProduct";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get DefaultEligibilityStatus(): string {
        return this.data.DefaultEligibilityStatus;
    }
    set DefaultEligibilityStatus(value: string) {
        this.data.DefaultEligibilityStatus = value;
    }
    get WorkflowSetId(): string {
        return this.data.WorkflowSetId;
    }
    set WorkflowSetId(value: string) {
        this.data.WorkflowSetId = value;
    }
    get Tags(): string[] {
        return this.data.Tags;
    }
    set Tags(value: string[]) {
        this.data.Tags = value;
    }
    get RatedByWebhook(): string {
        return this.data.RatedByWebhook;
    }
    set RatedByWebhook(value: string) {
        this.data.RatedByWebhook = value;
    }

    // Relationships

    //   Out to Program
    private __IsOfferedBy: Program;

    IsOfferedBy(context?: BaseDataContext): Program {
        if (this.__IsOfferedBy)
           return this.__IsOfferedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsOfferedBy) as Program;
    }
    setIsOfferedBy(value: Program) {
        this.__IsOfferedBy = value;
    }
    get _IsOfferedBy(): string {
        return this.Out;
    }
    set _IsOfferedBy(value: string) {
        this.Out = value;
    }
    //   In to Product
    private __Offers: Product;

    Offers(context?: BaseDataContext): Product {
        if (this.__Offers)
           return this.__Offers;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Offers) as Product;
    }
    setOffers(value: Product) {
        this.__Offers = value;
    }
    get _Offers(): string {
        return this.In;
    }
    set _Offers(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ProgramOffersProduct {
       return ModelUtils.deserializeEdge<ProgramOffersProduct>(this, input, datacontext, super._deserialize);
    }


    clone(): ProgramOffersProduct {
        let clone = new ProgramOffersProduct();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IProgramOptions {
    Id: string,
    VersionSelection: string,
    DefaultFromAddress?: string,
    readonly BasePoints: number,
    readonly ThresholdLow: number,
    readonly ThresholdMedium: number,
    readonly ThresholdHigh: number,
    readonly ThresholdVeryHigh: number,
    DefaultWorkflowId?: string,
    DefaultDelinquentWorkflowId?: string

    Configures?: object[]

}

export class ProgramOptions extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramOptions";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof ProgramOptions }[] = [

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
    get VersionSelection(): string {
        return this.data.VersionSelection;
    }
    set VersionSelection(value: string) {
        this.data.VersionSelection = value;
    }
    get DefaultFromAddress(): string {
        return this.data.DefaultFromAddress;
    }
    set DefaultFromAddress(value: string) {
        this.data.DefaultFromAddress = value;
    }
    get BasePoints(): number {
        return this.data.BasePoints;
    }
    get ThresholdLow(): number {
        return this.data.ThresholdLow;
    }
    get ThresholdMedium(): number {
        return this.data.ThresholdMedium;
    }
    get ThresholdHigh(): number {
        return this.data.ThresholdHigh;
    }
    get ThresholdVeryHigh(): number {
        return this.data.ThresholdVeryHigh;
    }
    get DefaultWorkflowId(): string {
        return this.data.DefaultWorkflowId;
    }
    set DefaultWorkflowId(value: string) {
        this.data.DefaultWorkflowId = value;
    }
    get DefaultDelinquentWorkflowId(): string {
        return this.data.DefaultDelinquentWorkflowId;
    }
    set DefaultDelinquentWorkflowId(value: string) {
        this.data.DefaultDelinquentWorkflowId = value;
    }

    // Relationships

    // Relationship Configures, returns Program ProgramConfiguredByProgramOptions[]
    private __Configures: ProgramConfiguredByProgramOptions[];
    Configures(_context?: BaseDataContext): ProgramConfiguredByProgramOptions[] {
        if (this.__Configures)
            return this.__Configures;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Configures), (id) => context.get(id) as ProgramConfiguredByProgramOptions);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setConfigures(values: ProgramConfiguredByProgramOptions[]) {
         if (this.Context != null)
             throw Error;

        this.__Configures = values;
     }
    get _Configures(): Set<string> {
        if (!this._relationships.has("Configures"))
            this._relationships.set("Configures", new Set<string>());

        return this._relationships.get("Configures");
    }
    set _Configures(values: Set<string>) {
        this._relationships.set("Configures", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Configures',
            edgeType: ProgramConfiguredByProgramOptions,
            otherVertexPropertyName: 'IsConfiguredBy',
            otherVertexType: Program,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): ProgramOptions {
        return ModelUtils.deserializeVertex<ProgramOptions>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: ProgramOptions) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            VersionSelection: model.VersionSelection,
            DefaultFromAddress: model.DefaultFromAddress,
            BasePoints: model.BasePoints,
            ThresholdLow: model.ThresholdLow,
            ThresholdMedium: model.ThresholdMedium,
            ThresholdHigh: model.ThresholdHigh,
            ThresholdVeryHigh: model.ThresholdVeryHigh,
            DefaultWorkflowId: model.DefaultWorkflowId,
            DefaultDelinquentWorkflowId: model.DefaultDelinquentWorkflowId,
            Configures: ModelUtils.serializeShallowEdge(model.Configures(), 'Configures'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): ProgramOptions {
        let clone = new ProgramOptions();
        clone.data = _.cloneDeep(this.data);
        clone._Configures = _.cloneDeep(this._Configures);

        //clone.Context = this.Context;
        return clone;
    }
}

export class ProgramPatchLog extends DocumentModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramPatchLog";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get RevisionedOwner(): string {
        return this.data.RevisionedOwner;
    }
    get RevisionedComponent(): string {
        return this.data.RevisionedComponent;
    }
    get RevisionableId(): string {
        return this.data.RevisionableId;
    }
    get PatchId(): string {
        return this.data.PatchId;
    }
    get LastPatched(): Date {
        return this.data.LastPatched ? new Date(this.data.LastPatched) : undefined;
    }
    get SourceObjectVersionNumber(): number {
        return this.data.SourceObjectVersionNumber;
    }
    get OriginalProperties(): { [index: string]: any } {
        return this.data.OriginalProperties;
    }
    get PatchedModel(): string {
        return this.data.PatchedModel;
    }


    deserialize(input: Object, datacontext): ProgramPatchLog {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: ProgramPatchLog) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            RevisionedOwner: model.RevisionedOwner,
            RevisionedComponent: model.RevisionedComponent,
            RevisionableId: model.RevisionableId,
            PatchId: model.PatchId,
            LastPatched: model.LastPatched,
            SourceObjectVersionNumber: model.SourceObjectVersionNumber,
            OriginalProperties: model.OriginalProperties,
            PatchedModel: model.PatchedModel,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): ProgramPatchLog {
        let clone = new ProgramPatchLog();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ProgramPatchRevisesRevisioned extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramPatchRevisesRevisioned";
    }

    // Properties
    get Published(): Date {
        return this.data.Published ? new Date(this.data.Published) : undefined;
    }
    get PublishedBy(): string {
        return this.data.PublishedBy;
    }
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to ProgramPatch
    private __IsRevisedBy: ProgramPatch;

    IsRevisedBy(context?: BaseDataContext): ProgramPatch {
        if (this.__IsRevisedBy)
           return this.__IsRevisedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsRevisedBy) as ProgramPatch;
    }
    setIsRevisedBy(value: ProgramPatch) {
        this.__IsRevisedBy = value;
    }
    get _IsRevisedBy(): string {
        return this.Out;
    }
    set _IsRevisedBy(value: string) {
        this.Out = value;
    }
    //   In to Program
    private __Revises: Program;

    Revises(context?: BaseDataContext): Program {
        if (this.__Revises)
           return this.__Revises;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Revises) as Program;
    }
    setRevises(value: Program) {
        this.__Revises = value;
    }
    get _Revises(): string {
        return this.In;
    }
    set _Revises(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ProgramPatchRevisesRevisioned {
       return ModelUtils.deserializeEdge<ProgramPatchRevisesRevisioned>(this, input, datacontext, super._deserialize);
    }


    clone(): ProgramPatchRevisesRevisioned {
        let clone = new ProgramPatchRevisesRevisioned();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ProgramRevisionConfiguresArea extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramRevisionConfiguresArea";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get StandbyWorkflowCountByDef(): { [index: string]: number } {
        return this.data.StandbyWorkflowCountByDef;
    }
    set StandbyWorkflowCountByDef(value: { [index: string]: number }) {
        this.data.StandbyWorkflowCountByDef = value;
    }

    // Relationships

    //   Out to ProgramRevision
    private __IsConfiguredFor: ProgramRevision;

    IsConfiguredFor(context?: BaseDataContext): ProgramRevision {
        if (this.__IsConfiguredFor)
           return this.__IsConfiguredFor;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsConfiguredFor) as ProgramRevision;
    }
    setIsConfiguredFor(value: ProgramRevision) {
        this.__IsConfiguredFor = value;
    }
    get _IsConfiguredFor(): string {
        return this.Out;
    }
    set _IsConfiguredFor(value: string) {
        this.Out = value;
    }
    //   In to Area
    private __Configures: Area;

    Configures(context?: BaseDataContext): Area {
        if (this.__Configures)
           return this.__Configures;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Configures) as Area;
    }
    setConfigures(value: Area) {
        this.__Configures = value;
    }
    get _Configures(): string {
        return this.In;
    }
    set _Configures(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ProgramRevisionConfiguresArea {
       return ModelUtils.deserializeEdge<ProgramRevisionConfiguresArea>(this, input, datacontext, super._deserialize);
    }


    clone(): ProgramRevisionConfiguresArea {
        let clone = new ProgramRevisionConfiguresArea();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IProgramRevisioned {
    Id: string,
    readonly LockedByChange?: string

    IsTrackedFor?: object[]

}

export class ProgramRevisioned extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramRevisioned";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof ProgramRevisioned }[] = [
            {className: 'Application', type: Application},
            {className: 'AssetGroup', type: AssetGroup},
            {className: 'DataPanel', type: DataPanel},
            {className: 'DataStore', type: DataStore},
            {className: 'Program', type: Program},
            {className: 'RuleSet', type: RuleSet},
            {className: 'RuleSetAssignment', type: RuleSetAssignment},
            {className: 'RuleSetDateTime', type: RuleSetDateTime},
            {className: 'RuleSetProduct', type: RuleSetProduct},
            {className: 'RuleSetRequirement', type: RuleSetRequirement},
            {className: 'RuleSetRiskAssessment', type: RuleSetRiskAssessment},
            {className: 'RuleSetWorkflowSetStatus', type: RuleSetWorkflowSetStatus},
            {className: 'Workflow', type: Workflow},
            {className: 'WorkflowSet', type: WorkflowSet},

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
    get LockedByChange(): string {
        return this.data.LockedByChange;
    }

    // Relationships

    // Relationship IsTrackedFor, returns ProgramRevision ProgramRevisionTracksProgramRevisioned[]
    private __IsTrackedFor: ProgramRevisionTracksProgramRevisioned[];
    IsTrackedFor(_context?: BaseDataContext): ProgramRevisionTracksProgramRevisioned[] {
        if (this.__IsTrackedFor)
            return this.__IsTrackedFor;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsTrackedFor), (id) => context.get(id) as ProgramRevisionTracksProgramRevisioned);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsTrackedFor(values: ProgramRevisionTracksProgramRevisioned[]) {
         if (this.Context != null)
             throw Error;

        this.__IsTrackedFor = values;
     }
    get _IsTrackedFor(): Set<string> {
        if (!this._relationships.has("IsTrackedFor"))
            this._relationships.set("IsTrackedFor", new Set<string>());

        return this._relationships.get("IsTrackedFor");
    }
    set _IsTrackedFor(values: Set<string>) {
        this._relationships.set("IsTrackedFor", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsTrackedFor',
            edgeType: ProgramRevisionTracksProgramRevisioned,
            otherVertexPropertyName: 'Tracks',
            otherVertexType: ProgramRevision,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): ProgramRevisioned {
        return ModelUtils.deserializeVertex<ProgramRevisioned>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: ProgramRevisioned) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            LockedByChange: model.LockedByChange,
            IsTrackedFor: ModelUtils.serializeShallowEdge(model.IsTrackedFor(), 'IsTrackedFor'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): ProgramRevisioned {
        let clone = new ProgramRevisioned();
        clone.data = _.cloneDeep(this.data);
        clone._IsTrackedFor = _.cloneDeep(this._IsTrackedFor);

        //clone.Context = this.Context;
        return clone;
    }
}

export class ProgramRevisionPublishesProgram extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramRevisionPublishesProgram";
    }

    // Properties
    get Published(): Date {
        return this.data.Published ? new Date(this.data.Published) : undefined;
    }
    get PublishedBy(): string {
        return this.data.PublishedBy;
    }
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to ProgramRevision
    private __IsPublishedBy: ProgramRevision;

    IsPublishedBy(context?: BaseDataContext): ProgramRevision {
        if (this.__IsPublishedBy)
           return this.__IsPublishedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsPublishedBy) as ProgramRevision;
    }
    setIsPublishedBy(value: ProgramRevision) {
        this.__IsPublishedBy = value;
    }
    get _IsPublishedBy(): string {
        return this.Out;
    }
    set _IsPublishedBy(value: string) {
        this.Out = value;
    }
    //   In to Program
    private __Publishes: Program;

    Publishes(context?: BaseDataContext): Program {
        if (this.__Publishes)
           return this.__Publishes;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Publishes) as Program;
    }
    setPublishes(value: Program) {
        this.__Publishes = value;
    }
    get _Publishes(): string {
        return this.In;
    }
    set _Publishes(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ProgramRevisionPublishesProgram {
       return ModelUtils.deserializeEdge<ProgramRevisionPublishesProgram>(this, input, datacontext, super._deserialize);
    }


    clone(): ProgramRevisionPublishesProgram {
        let clone = new ProgramRevisionPublishesProgram();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ProgramRevisionTracksProgramRevisioned extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramRevisionTracksProgramRevisioned";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get ComponentRevisionNo(): number {
        return this.data.ComponentRevisionNo;
    }
    get ChangeRevisionNo(): number {
        return this.data.ChangeRevisionNo;
    }

    // Relationships

    //   Out to ProgramRevision
    private __IsTrackedFor: ProgramRevision;

    IsTrackedFor(context?: BaseDataContext): ProgramRevision {
        if (this.__IsTrackedFor)
           return this.__IsTrackedFor;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsTrackedFor) as ProgramRevision;
    }
    setIsTrackedFor(value: ProgramRevision) {
        this.__IsTrackedFor = value;
    }
    get _IsTrackedFor(): string {
        return this.Out;
    }
    set _IsTrackedFor(value: string) {
        this.Out = value;
    }
    //   In to ProgramRevisioned
    private __Tracks: ProgramRevisioned;

    Tracks(context?: BaseDataContext): ProgramRevisioned {
        if (this.__Tracks)
           return this.__Tracks;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Tracks) as ProgramRevisioned;
    }
    setTracks(value: ProgramRevisioned) {
        this.__Tracks = value;
    }
    get _Tracks(): string {
        return this.In;
    }
    set _Tracks(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ProgramRevisionTracksProgramRevisioned {
       return ModelUtils.deserializeEdge<ProgramRevisionTracksProgramRevisioned>(this, input, datacontext, super._deserialize);
    }


    clone(): ProgramRevisionTracksProgramRevisioned {
        let clone = new ProgramRevisionTracksProgramRevisioned();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ProgramStoresDataStore extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramStoresDataStore";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Program
    private __IsStoredFor: Program;

    IsStoredFor(context?: BaseDataContext): Program {
        if (this.__IsStoredFor)
           return this.__IsStoredFor;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsStoredFor) as Program;
    }
    setIsStoredFor(value: Program) {
        this.__IsStoredFor = value;
    }
    get _IsStoredFor(): string {
        return this.Out;
    }
    set _IsStoredFor(value: string) {
        this.Out = value;
    }
    //   In to DataStore
    private __Stores: DataStore;

    Stores(context?: BaseDataContext): DataStore {
        if (this.__Stores)
           return this.__Stores;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Stores) as DataStore;
    }
    setStores(value: DataStore) {
        this.__Stores = value;
    }
    get _Stores(): string {
        return this.In;
    }
    set _Stores(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ProgramStoresDataStore {
       return ModelUtils.deserializeEdge<ProgramStoresDataStore>(this, input, datacontext, super._deserialize);
    }


    clone(): ProgramStoresDataStore {
        let clone = new ProgramStoresDataStore();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ProgramUsesWorkGroup extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramUsesWorkGroup";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get AuthorityLevel(): number {
        return this.data.AuthorityLevel;
    }
    set AuthorityLevel(value: number) {
        this.data.AuthorityLevel = value;
    }

    // Relationships

    //   Out to Program
    private __IsUsedBy: Program;

    IsUsedBy(context?: BaseDataContext): Program {
        if (this.__IsUsedBy)
           return this.__IsUsedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsUsedBy) as Program;
    }
    setIsUsedBy(value: Program) {
        this.__IsUsedBy = value;
    }
    get _IsUsedBy(): string {
        return this.Out;
    }
    set _IsUsedBy(value: string) {
        this.Out = value;
    }
    //   In to WorkGroup
    private __Uses: WorkGroup;

    Uses(context?: BaseDataContext): WorkGroup {
        if (this.__Uses)
           return this.__Uses;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Uses) as WorkGroup;
    }
    setUses(value: WorkGroup) {
        this.__Uses = value;
    }
    get _Uses(): string {
        return this.In;
    }
    set _Uses(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ProgramUsesWorkGroup {
       return ModelUtils.deserializeEdge<ProgramUsesWorkGroup>(this, input, datacontext, super._deserialize);
    }


    clone(): ProgramUsesWorkGroup {
        let clone = new ProgramUsesWorkGroup();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ProgramUtilizesAssetGroup extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramUtilizesAssetGroup";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Program
    private __IsUtilizedBy: Program;

    IsUtilizedBy(context?: BaseDataContext): Program {
        if (this.__IsUtilizedBy)
           return this.__IsUtilizedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsUtilizedBy) as Program;
    }
    setIsUtilizedBy(value: Program) {
        this.__IsUtilizedBy = value;
    }
    get _IsUtilizedBy(): string {
        return this.Out;
    }
    set _IsUtilizedBy(value: string) {
        this.Out = value;
    }
    //   In to AssetGroup
    private __Utilizes: AssetGroup;

    Utilizes(context?: BaseDataContext): AssetGroup {
        if (this.__Utilizes)
           return this.__Utilizes;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Utilizes) as AssetGroup;
    }
    setUtilizes(value: AssetGroup) {
        this.__Utilizes = value;
    }
    get _Utilizes(): string {
        return this.In;
    }
    set _Utilizes(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ProgramUtilizesAssetGroup {
       return ModelUtils.deserializeEdge<ProgramUtilizesAssetGroup>(this, input, datacontext, super._deserialize);
    }


    clone(): ProgramUtilizesAssetGroup {
        let clone = new ProgramUtilizesAssetGroup();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ProgramValidationMessage extends DocumentModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramValidationMessage";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get Code(): string {
        return this.data.Code;
    }
    set Code(value: string) {
        this.data.Code = value;
    }
    get Level(): string {
        return this.data.Level;
    }
    set Level(value: string) {
        this.data.Level = value;
    }
    get Message(): string {
        return this.data.Message;
    }
    set Message(value: string) {
        this.data.Message = value;
    }
    get RevisionedId(): string {
        return this.data.RevisionedId;
    }
    set RevisionedId(value: string) {
        this.data.RevisionedId = value;
    }
    get ChangeId(): string {
        return this.data.ChangeId;
    }
    set ChangeId(value: string) {
        this.data.ChangeId = value;
    }
    get RevisionId(): string {
        return this.data.RevisionId;
    }
    set RevisionId(value: string) {
        this.data.RevisionId = value;
    }
    get ComponentId(): string {
        return this.data.ComponentId;
    }
    set ComponentId(value: string) {
        this.data.ComponentId = value;
    }
    get ComponentType(): string {
        return this.data.ComponentType;
    }
    set ComponentType(value: string) {
        this.data.ComponentType = value;
    }
    get EntityId(): string {
        return this.data.EntityId;
    }
    set EntityId(value: string) {
        this.data.EntityId = value;
    }
    get EntityType(): string {
        return this.data.EntityType;
    }
    set EntityType(value: string) {
        this.data.EntityType = value;
    }
    get Entities(): { [index: string]: string } {
        return this.data.Entities;
    }
    set Entities(value: { [index: string]: string }) {
        this.data.Entities = value;
    }


    deserialize(input: Object, datacontext): ProgramValidationMessage {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: ProgramValidationMessage) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            Code: model.Code,
            Level: model.Level,
            Message: model.Message,
            RevisionedId: model.RevisionedId,
            ChangeId: model.ChangeId,
            RevisionId: model.RevisionId,
            ComponentId: model.ComponentId,
            ComponentType: model.ComponentType,
            EntityId: model.EntityId,
            EntityType: model.EntityType,
            Entities: model.Entities,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): ProgramValidationMessage {
        let clone = new ProgramValidationMessage();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IRegion {
    Id: string,
    Name: string,
    Currency: string,
    IsProgramDefault: boolean,
    Country: string,
    Aliases?: { [index: string]: string }

    Formats?: object[]

}

export class Region extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Region";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Region }[] = [

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
    get Currency(): string {
        return this.data.Currency;
    }
    set Currency(value: string) {
        this.data.Currency = value;
    }
    get IsProgramDefault(): boolean {
        return this.data.IsProgramDefault;
    }
    set IsProgramDefault(value: boolean) {
        this.data.IsProgramDefault = value;
    }
    get Country(): string {
        return this.data.Country;
    }
    set Country(value: string) {
        this.data.Country = value;
    }
    get Aliases(): { [index: string]: string } {
        return this.data.Aliases;
    }
    set Aliases(value: { [index: string]: string }) {
        this.data.Aliases = value;
    }

    // Relationships

    // Relationship Formats, returns Program ProgramFormattedByRegion[]
    private __Formats: ProgramFormattedByRegion[];
    Formats(_context?: BaseDataContext): ProgramFormattedByRegion[] {
        if (this.__Formats)
            return this.__Formats;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Formats), (id) => context.get(id) as ProgramFormattedByRegion);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setFormats(values: ProgramFormattedByRegion[]) {
         if (this.Context != null)
             throw Error;

        this.__Formats = values;
     }
    get _Formats(): Set<string> {
        if (!this._relationships.has("Formats"))
            this._relationships.set("Formats", new Set<string>());

        return this._relationships.get("Formats");
    }
    set _Formats(values: Set<string>) {
        this._relationships.set("Formats", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Formats',
            edgeType: ProgramFormattedByRegion,
            otherVertexPropertyName: 'IsFormattedBy',
            otherVertexType: Program,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Region {
        return ModelUtils.deserializeVertex<Region>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Region) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            Name: model.Name,
            Currency: model.Currency,
            IsProgramDefault: model.IsProgramDefault,
            Country: model.Country,
            Aliases: model.Aliases,
            Formats: ModelUtils.serializeShallowEdge(model.Formats(), 'Formats'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Region {
        let clone = new Region();
        clone.data = _.cloneDeep(this.data);
        clone._Formats = _.cloneDeep(this._Formats);

        //clone.Context = this.Context;
        return clone;
    }
}

export class RuleSetContainsRule extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "RuleSetContainsRule";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to RuleSet
    private __IsContainedBy: RuleSet;

    IsContainedBy(context?: BaseDataContext): RuleSet {
        if (this.__IsContainedBy)
           return this.__IsContainedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsContainedBy) as RuleSet;
    }
    setIsContainedBy(value: RuleSet) {
        this.__IsContainedBy = value;
    }
    get _IsContainedBy(): string {
        return this.Out;
    }
    set _IsContainedBy(value: string) {
        this.Out = value;
    }
    //   In to Rule
    private __Contains: Rule;

    Contains(context?: BaseDataContext): Rule {
        if (this.__Contains)
           return this.__Contains;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Contains) as Rule;
    }
    setContains(value: Rule) {
        this.__Contains = value;
    }
    get _Contains(): string {
        return this.In;
    }
    set _Contains(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): RuleSetContainsRule {
       return ModelUtils.deserializeEdge<RuleSetContainsRule>(this, input, datacontext, super._deserialize);
    }


    clone(): RuleSetContainsRule {
        let clone = new RuleSetContainsRule();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class RuleSetRequirementRegulatesWorkflow extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "RuleSetRequirementRegulatesWorkflow";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to RuleSetRequirement
    private __IsRegulatedBy: RuleSetRequirement;

    IsRegulatedBy(context?: BaseDataContext): RuleSetRequirement {
        if (this.__IsRegulatedBy)
           return this.__IsRegulatedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsRegulatedBy) as RuleSetRequirement;
    }
    setIsRegulatedBy(value: RuleSetRequirement) {
        this.__IsRegulatedBy = value;
    }
    get _IsRegulatedBy(): string {
        return this.Out;
    }
    set _IsRegulatedBy(value: string) {
        this.Out = value;
    }
    //   In to Workflow
    private __Regulates: Workflow;

    Regulates(context?: BaseDataContext): Workflow {
        if (this.__Regulates)
           return this.__Regulates;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Regulates) as Workflow;
    }
    setRegulates(value: Workflow) {
        this.__Regulates = value;
    }
    get _Regulates(): string {
        return this.In;
    }
    set _Regulates(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): RuleSetRequirementRegulatesWorkflow {
       return ModelUtils.deserializeEdge<RuleSetRequirementRegulatesWorkflow>(this, input, datacontext, super._deserialize);
    }


    clone(): RuleSetRequirementRegulatesWorkflow {
        let clone = new RuleSetRequirementRegulatesWorkflow();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class RuleSetWorkflowSetStatusCapturesWorkflowSet extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "RuleSetWorkflowSetStatusCapturesWorkflowSet";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to RuleSetWorkflowSetStatus
    private __IsCapturedBy: RuleSetWorkflowSetStatus;

    IsCapturedBy(context?: BaseDataContext): RuleSetWorkflowSetStatus {
        if (this.__IsCapturedBy)
           return this.__IsCapturedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsCapturedBy) as RuleSetWorkflowSetStatus;
    }
    setIsCapturedBy(value: RuleSetWorkflowSetStatus) {
        this.__IsCapturedBy = value;
    }
    get _IsCapturedBy(): string {
        return this.Out;
    }
    set _IsCapturedBy(value: string) {
        this.Out = value;
    }
    //   In to WorkflowSet
    private __Captures: WorkflowSet;

    Captures(context?: BaseDataContext): WorkflowSet {
        if (this.__Captures)
           return this.__Captures;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Captures) as WorkflowSet;
    }
    setCaptures(value: WorkflowSet) {
        this.__Captures = value;
    }
    get _Captures(): string {
        return this.In;
    }
    set _Captures(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): RuleSetWorkflowSetStatusCapturesWorkflowSet {
       return ModelUtils.deserializeEdge<RuleSetWorkflowSetStatusCapturesWorkflowSet>(this, input, datacontext, super._deserialize);
    }


    clone(): RuleSetWorkflowSetStatusCapturesWorkflowSet {
        let clone = new RuleSetWorkflowSetStatusCapturesWorkflowSet();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class RuleTaskObligationSetsRequirementForTask extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "RuleTaskObligationSetsRequirementForTask";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to RuleTaskObligation
    private __GetsRequirementFrom: RuleTaskObligation;

    GetsRequirementFrom(context?: BaseDataContext): RuleTaskObligation {
        if (this.__GetsRequirementFrom)
           return this.__GetsRequirementFrom;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._GetsRequirementFrom) as RuleTaskObligation;
    }
    setGetsRequirementFrom(value: RuleTaskObligation) {
        this.__GetsRequirementFrom = value;
    }
    get _GetsRequirementFrom(): string {
        return this.Out;
    }
    set _GetsRequirementFrom(value: string) {
        this.Out = value;
    }
    //   In to Task
    private __SetsRequirementFor: Task;

    SetsRequirementFor(context?: BaseDataContext): Task {
        if (this.__SetsRequirementFor)
           return this.__SetsRequirementFor;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._SetsRequirementFor) as Task;
    }
    setSetsRequirementFor(value: Task) {
        this.__SetsRequirementFor = value;
    }
    get _SetsRequirementFor(): string {
        return this.In;
    }
    set _SetsRequirementFor(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): RuleTaskObligationSetsRequirementForTask {
       return ModelUtils.deserializeEdge<RuleTaskObligationSetsRequirementForTask>(this, input, datacontext, super._deserialize);
    }


    clone(): RuleTaskObligationSetsRequirementForTask {
        let clone = new RuleTaskObligationSetsRequirementForTask();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class SectionDisplaysElement extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "SectionDisplaysElement";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Section
    private __IsDisplayedBy: Section;

    IsDisplayedBy(context?: BaseDataContext): Section {
        if (this.__IsDisplayedBy)
           return this.__IsDisplayedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsDisplayedBy) as Section;
    }
    setIsDisplayedBy(value: Section) {
        this.__IsDisplayedBy = value;
    }
    get _IsDisplayedBy(): string {
        return this.Out;
    }
    set _IsDisplayedBy(value: string) {
        this.Out = value;
    }
    //   In to Element
    private __Displays: Element;

    Displays(context?: BaseDataContext): Element {
        if (this.__Displays)
           return this.__Displays;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Displays) as Element;
    }
    setDisplays(value: Element) {
        this.__Displays = value;
    }
    get _Displays(): string {
        return this.In;
    }
    set _Displays(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): SectionDisplaysElement {
       return ModelUtils.deserializeEdge<SectionDisplaysElement>(this, input, datacontext, super._deserialize);
    }


    clone(): SectionDisplaysElement {
        let clone = new SectionDisplaysElement();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class SectionIsSequencedBySectionSequence extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "SectionIsSequencedBySectionSequence";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Section
    private __Sequences: Section;

    Sequences(context?: BaseDataContext): Section {
        if (this.__Sequences)
           return this.__Sequences;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Sequences) as Section;
    }
    setSequences(value: Section) {
        this.__Sequences = value;
    }
    get _Sequences(): string {
        return this.Out;
    }
    set _Sequences(value: string) {
        this.Out = value;
    }
    //   In to SectionSequence
    private __IsSequencedBy: SectionSequence;

    IsSequencedBy(context?: BaseDataContext): SectionSequence {
        if (this.__IsSequencedBy)
           return this.__IsSequencedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsSequencedBy) as SectionSequence;
    }
    setIsSequencedBy(value: SectionSequence) {
        this.__IsSequencedBy = value;
    }
    get _IsSequencedBy(): string {
        return this.In;
    }
    set _IsSequencedBy(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): SectionIsSequencedBySectionSequence {
       return ModelUtils.deserializeEdge<SectionIsSequencedBySectionSequence>(this, input, datacontext, super._deserialize);
    }


    clone(): SectionIsSequencedBySectionSequence {
        let clone = new SectionIsSequencedBySectionSequence();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class SectionRepeatsWithDataGroup extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "SectionRepeatsWithDataGroup";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Section
    private __RepeatsToSection: Section;

    RepeatsToSection(context?: BaseDataContext): Section {
        if (this.__RepeatsToSection)
           return this.__RepeatsToSection;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._RepeatsToSection) as Section;
    }
    setRepeatsToSection(value: Section) {
        this.__RepeatsToSection = value;
    }
    get _RepeatsToSection(): string {
        return this.Out;
    }
    set _RepeatsToSection(value: string) {
        this.Out = value;
    }
    //   In to DataGroup
    private __RepeatsWith: DataGroup;

    RepeatsWith(context?: BaseDataContext): DataGroup {
        if (this.__RepeatsWith)
           return this.__RepeatsWith;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._RepeatsWith) as DataGroup;
    }
    setRepeatsWith(value: DataGroup) {
        this.__RepeatsWith = value;
    }
    get _RepeatsWith(): string {
        return this.In;
    }
    set _RepeatsWith(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): SectionRepeatsWithDataGroup {
       return ModelUtils.deserializeEdge<SectionRepeatsWithDataGroup>(this, input, datacontext, super._deserialize);
    }


    clone(): SectionRepeatsWithDataGroup {
        let clone = new SectionRepeatsWithDataGroup();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface ISectionSequence {
    Sequence?: string[],
    Id: string

    Sequences?: object[]

}

export class SectionSequence extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "SectionSequence";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof SectionSequence }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get Sequence(): string[] {
        return this.data.Sequence;
    }
    set Sequence(value: string[]) {
        this.data.Sequence = value;
    }
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    // Relationship Sequences, returns Section SectionIsSequencedBySectionSequence[]
    private __Sequences: SectionIsSequencedBySectionSequence[];
    Sequences(_context?: BaseDataContext): SectionIsSequencedBySectionSequence[] {
        if (this.__Sequences)
            return this.__Sequences;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Sequences), (id) => context.get(id) as SectionIsSequencedBySectionSequence);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setSequences(values: SectionIsSequencedBySectionSequence[]) {
         if (this.Context != null)
             throw Error;

        this.__Sequences = values;
     }
    get _Sequences(): Set<string> {
        if (!this._relationships.has("Sequences"))
            this._relationships.set("Sequences", new Set<string>());

        return this._relationships.get("Sequences");
    }
    set _Sequences(values: Set<string>) {
        this._relationships.set("Sequences", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Sequences',
            edgeType: SectionIsSequencedBySectionSequence,
            otherVertexPropertyName: 'IsSequencedBy',
            otherVertexType: Section,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): SectionSequence {
        return ModelUtils.deserializeVertex<SectionSequence>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: SectionSequence) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Sequence: model.Sequence,
            Id: model.Id,
            Sequences: ModelUtils.serializeShallowEdge(model.Sequences(), 'Sequences'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): SectionSequence {
        let clone = new SectionSequence();
        clone.data = _.cloneDeep(this.data);
        clone._Sequences = _.cloneDeep(this._Sequences);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ISecurityRole {
    Id: string,
    readonly DeletedDate?: Date,
    Name: string,
    Description: string,
    FeatureFacets?: string[],
    CreatedDate?: Date,
    CreatedBy?: string

    IsFilledBy?: object[]

}

export class SecurityRole extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "SecurityRole";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof SecurityRole }[] = [

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
    get DeletedDate(): Date {
        return this.data.DeletedDate ? new Date(this.data.DeletedDate) : undefined;
    }
    get Name(): string {
        return this.data.Name;
    }
    set Name(value: string) {
        this.data.Name = value;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get FeatureFacets(): string[] {
        return this.data.FeatureFacets;
    }
    set FeatureFacets(value: string[]) {
        this.data.FeatureFacets = value;
    }
    get CreatedDate(): Date {
        return this.data.CreatedDate ? new Date(this.data.CreatedDate) : undefined;
    }
    set CreatedDate(value: Date) {
        this.data.CreatedDate = value;
    }
    get CreatedBy(): string {
        return this.data.CreatedBy;
    }
    set CreatedBy(value: string) {
        this.data.CreatedBy = value;
    }

    // Relationships

    // Relationship IsFilledBy, returns SMIdentity SMIdentityFillsSecurityRole[]
    private __IsFilledBy: SMIdentityFillsSecurityRole[];
    IsFilledBy(_context?: BaseDataContext): SMIdentityFillsSecurityRole[] {
        if (this.__IsFilledBy)
            return this.__IsFilledBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsFilledBy), (id) => context.get(id) as SMIdentityFillsSecurityRole);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsFilledBy(values: SMIdentityFillsSecurityRole[]) {
         if (this.Context != null)
             throw Error;

        this.__IsFilledBy = values;
     }
    get _IsFilledBy(): Set<string> {
        if (!this._relationships.has("IsFilledBy"))
            this._relationships.set("IsFilledBy", new Set<string>());

        return this._relationships.get("IsFilledBy");
    }
    set _IsFilledBy(values: Set<string>) {
        this._relationships.set("IsFilledBy", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsFilledBy',
            edgeType: SMIdentityFillsSecurityRole,
            otherVertexPropertyName: 'FillsSecurityRole',
            otherVertexType: SMIdentity,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): SecurityRole {
        return ModelUtils.deserializeVertex<SecurityRole>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: SecurityRole) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DeletedDate: model.DeletedDate,
            Name: model.Name,
            Description: model.Description,
            FeatureFacets: model.FeatureFacets,
            CreatedDate: model.CreatedDate,
            CreatedBy: model.CreatedBy,
            IsFilledBy: ModelUtils.serializeShallowEdge(model.IsFilledBy(), 'IsFilledBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): SecurityRole {
        let clone = new SecurityRole();
        clone.data = _.cloneDeep(this.data);
        clone._IsFilledBy = _.cloneDeep(this._IsFilledBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export class ServiceLevel extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ServiceLevel";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get Event(): string {
        return this.data.Event;
    }
    set Event(value: string) {
        this.data.Event = value;
    }
    get AmountOfTime(): number {
        return this.data.AmountOfTime;
    }
    set AmountOfTime(value: number) {
        this.data.AmountOfTime = value;
    }
    get TimeUnits(): string {
        return this.data.TimeUnits;
    }
    set TimeUnits(value: string) {
        this.data.TimeUnits = value;
    }
    get BusinessHoursOnly(): boolean {
        return this.data.BusinessHoursOnly;
    }
    set BusinessHoursOnly(value: boolean) {
        this.data.BusinessHoursOnly = value;
    }

    // Relationships

    //   Out to Workable
    private __IsTriggeredBy: Workable;

    IsTriggeredBy(context?: BaseDataContext): Workable {
        if (this.__IsTriggeredBy)
           return this.__IsTriggeredBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsTriggeredBy) as Workable;
    }
    setIsTriggeredBy(value: Workable) {
        this.__IsTriggeredBy = value;
    }
    get _IsTriggeredBy(): string {
        return this.Out;
    }
    set _IsTriggeredBy(value: string) {
        this.Out = value;
    }
    //   In to Workable
    private __Triggers: Workable;

    Triggers(context?: BaseDataContext): Workable {
        if (this.__Triggers)
           return this.__Triggers;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Triggers) as Workable;
    }
    setTriggers(value: Workable) {
        this.__Triggers = value;
    }
    get _Triggers(): string {
        return this.In;
    }
    set _Triggers(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ServiceLevel {
       return ModelUtils.deserializeEdge<ServiceLevel>(this, input, datacontext, super._deserialize);
    }


    clone(): ServiceLevel {
        let clone = new ServiceLevel();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ServiceLevelAgreement extends DocumentModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ServiceLevelAgreement";
    }

    // Properties
    get DeletedDate(): Date {
        return this.data.DeletedDate ? new Date(this.data.DeletedDate) : undefined;
    }
    get CorrelationKey(): string {
        return this.data.CorrelationKey;
    }
    get Version(): number {
        return this.data.Version;
    }
    get ReplacedByVersion(): number {
        return this.data.ReplacedByVersion;
    }
    get UpdatedTime(): Date {
        return this.data.UpdatedTime ? new Date(this.data.UpdatedTime) : undefined;
    }
    get UpdatedByIdentity(): string {
        return this.data.UpdatedByIdentity;
    }
    get DeletedByIdentity(): string {
        return this.data.DeletedByIdentity;
    }
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
    get TimeToCompleteValue(): number {
        return this.data.TimeToCompleteValue;
    }
    set TimeToCompleteValue(value: number) {
        this.data.TimeToCompleteValue = value;
    }
    get TimeToCompleteUnits(): string {
        return this.data.TimeToCompleteUnits;
    }
    set TimeToCompleteUnits(value: string) {
        this.data.TimeToCompleteUnits = value;
    }
    get ExcludeWeekends(): boolean {
        return this.data.ExcludeWeekends;
    }
    set ExcludeWeekends(value: boolean) {
        this.data.ExcludeWeekends = value;
    }
    get ExcludeHolidays(): boolean {
        return this.data.ExcludeHolidays;
    }
    set ExcludeHolidays(value: boolean) {
        this.data.ExcludeHolidays = value;
    }
    get Enabled(): boolean {
        return this.data.Enabled;
    }


    deserialize(input: Object, datacontext): ServiceLevelAgreement {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: ServiceLevelAgreement) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DeletedDate: model.DeletedDate,
            CorrelationKey: model.CorrelationKey,
            Version: model.Version,
            ReplacedByVersion: model.ReplacedByVersion,
            UpdatedTime: model.UpdatedTime,
            UpdatedByIdentity: model.UpdatedByIdentity,
            DeletedByIdentity: model.DeletedByIdentity,
            Id: model.Id,
            Name: model.Name,
            TimeToCompleteValue: model.TimeToCompleteValue,
            TimeToCompleteUnits: model.TimeToCompleteUnits,
            ExcludeWeekends: model.ExcludeWeekends,
            ExcludeHolidays: model.ExcludeHolidays,
            Enabled: model.Enabled,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): ServiceLevelAgreement {
        let clone = new ServiceLevelAgreement();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface ISMIdentity {
    Id: string,
    DisplayName?: string,
    BadgePath?: string,
    LastLoginDate?: Date,
    readonly Active: boolean,

    FillsSecurityRole?: object[],
    WorksIn?: object[]

}

export class SMIdentity extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "SMIdentity";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof SMIdentity }[] = [
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
    get BadgePath(): string {
        return this.data.BadgePath;
    }
    set BadgePath(value: string) {
        this.data.BadgePath = value;
    }
    get LastLoginDate(): Date {
        return this.data.LastLoginDate ? new Date(this.data.LastLoginDate) : undefined;
    }
    set LastLoginDate(value: Date) {
        this.data.LastLoginDate = value;
    }
    get Active(): boolean {
        return this.data.Active;
    }

    // Relationships

    // Relationship FillsSecurityRole, returns SecurityRole SMIdentityFillsSecurityRole[]
    private __FillsSecurityRole: SMIdentityFillsSecurityRole[];
    FillsSecurityRole(_context?: BaseDataContext): SMIdentityFillsSecurityRole[] {
        if (this.__FillsSecurityRole)
            return this.__FillsSecurityRole;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._FillsSecurityRole), (id) => context.get(id) as SMIdentityFillsSecurityRole);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setFillsSecurityRole(values: SMIdentityFillsSecurityRole[]) {
         if (this.Context != null)
             throw Error;

        this.__FillsSecurityRole = values;
     }
    get _FillsSecurityRole(): Set<string> {
        if (!this._relationships.has("FillsSecurityRole"))
            this._relationships.set("FillsSecurityRole", new Set<string>());

        return this._relationships.get("FillsSecurityRole");
    }
    set _FillsSecurityRole(values: Set<string>) {
        this._relationships.set("FillsSecurityRole", values);
    }

    // Relationship WorksIn, returns Area SMIdentityWorksInArea[]
    private __WorksIn: SMIdentityWorksInArea[];
    WorksIn(_context?: BaseDataContext): SMIdentityWorksInArea[] {
        if (this.__WorksIn)
            return this.__WorksIn;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._WorksIn), (id) => context.get(id) as SMIdentityWorksInArea);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setWorksIn(values: SMIdentityWorksInArea[]) {
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

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'FillsSecurityRole',
            edgeType: SMIdentityFillsSecurityRole,
            otherVertexPropertyName: 'IsFilledBy',
            otherVertexType: SecurityRole,
        },
        {
            propertyName: 'WorksIn',
            edgeType: SMIdentityWorksInArea,
            otherVertexPropertyName: 'IsWorkedBy',
            otherVertexType: Area,
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
            BadgePath: model.BadgePath,
            LastLoginDate: model.LastLoginDate,
            Active: model.Active,
            FillsSecurityRole: ModelUtils.serializeShallowEdge(model.FillsSecurityRole(), 'FillsSecurityRole'),
            WorksIn: ModelUtils.serializeShallowEdge(model.WorksIn(), 'WorksIn'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): SMIdentity {
        let clone = new SMIdentity();
        clone.data = _.cloneDeep(this.data);
        clone._FillsSecurityRole = _.cloneDeep(this._FillsSecurityRole);
        clone._WorksIn = _.cloneDeep(this._WorksIn);

        //clone.Context = this.Context;
        return clone;
    }
}

export class SMIdentityFillsSecurityRole extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "SMIdentityFillsSecurityRole";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get CreatedDate(): Date {
        return this.data.CreatedDate ? new Date(this.data.CreatedDate) : undefined;
    }

    // Relationships

    //   Out to SMIdentity
    private __IsFilledBy: SMIdentity;

    IsFilledBy(context?: BaseDataContext): SMIdentity {
        if (this.__IsFilledBy)
           return this.__IsFilledBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsFilledBy) as SMIdentity;
    }
    setIsFilledBy(value: SMIdentity) {
        this.__IsFilledBy = value;
    }
    get _IsFilledBy(): string {
        return this.Out;
    }
    set _IsFilledBy(value: string) {
        this.Out = value;
    }
    //   In to SecurityRole
    private __FillsSecurityRole: SecurityRole;

    FillsSecurityRole(context?: BaseDataContext): SecurityRole {
        if (this.__FillsSecurityRole)
           return this.__FillsSecurityRole;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._FillsSecurityRole) as SecurityRole;
    }
    setFillsSecurityRole(value: SecurityRole) {
        this.__FillsSecurityRole = value;
    }
    get _FillsSecurityRole(): string {
        return this.In;
    }
    set _FillsSecurityRole(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): SMIdentityFillsSecurityRole {
       return ModelUtils.deserializeEdge<SMIdentityFillsSecurityRole>(this, input, datacontext, super._deserialize);
    }


    clone(): SMIdentityFillsSecurityRole {
        let clone = new SMIdentityFillsSecurityRole();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class SMIdentityWorksInArea extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "SMIdentityWorksInArea";
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
    private __IsWorkedBy: SMIdentity;

    IsWorkedBy(context?: BaseDataContext): SMIdentity {
        if (this.__IsWorkedBy)
           return this.__IsWorkedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsWorkedBy) as SMIdentity;
    }
    setIsWorkedBy(value: SMIdentity) {
        this.__IsWorkedBy = value;
    }
    get _IsWorkedBy(): string {
        return this.Out;
    }
    set _IsWorkedBy(value: string) {
        this.Out = value;
    }
    //   In to Area
    private __WorksIn: Area;

    WorksIn(context?: BaseDataContext): Area {
        if (this.__WorksIn)
           return this.__WorksIn;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._WorksIn) as Area;
    }
    setWorksIn(value: Area) {
        this.__WorksIn = value;
    }
    get _WorksIn(): string {
        return this.In;
    }
    set _WorksIn(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): SMIdentityWorksInArea {
       return ModelUtils.deserializeEdge<SMIdentityWorksInArea>(this, input, datacontext, super._deserialize);
    }


    clone(): SMIdentityWorksInArea {
        let clone = new SMIdentityWorksInArea();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class TaskAssignedAssignable extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "TaskAssignedAssignable";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Task
    private __InitialAssigneeFor: Task;

    InitialAssigneeFor(context?: BaseDataContext): Task {
        if (this.__InitialAssigneeFor)
           return this.__InitialAssigneeFor;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._InitialAssigneeFor) as Task;
    }
    setInitialAssigneeFor(value: Task) {
        this.__InitialAssigneeFor = value;
    }
    get _InitialAssigneeFor(): string {
        return this.Out;
    }
    set _InitialAssigneeFor(value: string) {
        this.Out = value;
    }
    //   In to Assignable
    private __InitiallyAssignedTo: Assignable;

    InitiallyAssignedTo(context?: BaseDataContext): Assignable {
        if (this.__InitiallyAssignedTo)
           return this.__InitiallyAssignedTo;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._InitiallyAssignedTo) as Assignable;
    }
    setInitiallyAssignedTo(value: Assignable) {
        this.__InitiallyAssignedTo = value;
    }
    get _InitiallyAssignedTo(): string {
        return this.In;
    }
    set _InitiallyAssignedTo(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): TaskAssignedAssignable {
       return ModelUtils.deserializeEdge<TaskAssignedAssignable>(this, input, datacontext, super._deserialize);
    }


    clone(): TaskAssignedAssignable {
        let clone = new TaskAssignedAssignable();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class TaskCorrespondenceAttachesDocumentCategory extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "TaskCorrespondenceAttachesDocumentCategory";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get ParameterName(): string {
        return this.data.ParameterName;
    }
    set ParameterName(value: string) {
        this.data.ParameterName = value;
    }
    get Tags(): string[] {
        return this.data.Tags;
    }
    set Tags(value: string[]) {
        this.data.Tags = value;
    }

    // Relationships

    //   Out to TaskCorrespondence
    private __AttachedBy: TaskCorrespondence;

    AttachedBy(context?: BaseDataContext): TaskCorrespondence {
        if (this.__AttachedBy)
           return this.__AttachedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._AttachedBy) as TaskCorrespondence;
    }
    setAttachedBy(value: TaskCorrespondence) {
        this.__AttachedBy = value;
    }
    get _AttachedBy(): string {
        return this.Out;
    }
    set _AttachedBy(value: string) {
        this.Out = value;
    }
    //   In to DocumentCategory
    private __Attaches: DocumentCategory;

    Attaches(context?: BaseDataContext): DocumentCategory {
        if (this.__Attaches)
           return this.__Attaches;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Attaches) as DocumentCategory;
    }
    setAttaches(value: DocumentCategory) {
        this.__Attaches = value;
    }
    get _Attaches(): string {
        return this.In;
    }
    set _Attaches(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): TaskCorrespondenceAttachesDocumentCategory {
       return ModelUtils.deserializeEdge<TaskCorrespondenceAttachesDocumentCategory>(this, input, datacontext, super._deserialize);
    }


    clone(): TaskCorrespondenceAttachesDocumentCategory {
        let clone = new TaskCorrespondenceAttachesDocumentCategory();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class TaskCorrespondenceDeliversAccountRole extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "TaskCorrespondenceDeliversAccountRole";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get AddressType(): string {
        return this.data.AddressType;
    }
    set AddressType(value: string) {
        this.data.AddressType = value;
    }

    // Relationships

    //   Out to TaskCorrespondence
    private __DeliveredBy: TaskCorrespondence;

    DeliveredBy(context?: BaseDataContext): TaskCorrespondence {
        if (this.__DeliveredBy)
           return this.__DeliveredBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._DeliveredBy) as TaskCorrespondence;
    }
    setDeliveredBy(value: TaskCorrespondence) {
        this.__DeliveredBy = value;
    }
    get _DeliveredBy(): string {
        return this.Out;
    }
    set _DeliveredBy(value: string) {
        this.Out = value;
    }
    //   In to AccountRole
    private __DeliversAccount: AccountRole;

    DeliversAccount(context?: BaseDataContext): AccountRole {
        if (this.__DeliversAccount)
           return this.__DeliversAccount;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._DeliversAccount) as AccountRole;
    }
    setDeliversAccount(value: AccountRole) {
        this.__DeliversAccount = value;
    }
    get _DeliversAccount(): string {
        return this.In;
    }
    set _DeliversAccount(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): TaskCorrespondenceDeliversAccountRole {
       return ModelUtils.deserializeEdge<TaskCorrespondenceDeliversAccountRole>(this, input, datacontext, super._deserialize);
    }


    clone(): TaskCorrespondenceDeliversAccountRole {
        let clone = new TaskCorrespondenceDeliversAccountRole();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class TaskCorrespondenceDeliversDataPointEmail extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "TaskCorrespondenceDeliversDataPointEmail";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get AddressType(): string {
        return this.data.AddressType;
    }
    set AddressType(value: string) {
        this.data.AddressType = value;
    }

    // Relationships

    //   Out to TaskCorrespondence
    private __DeliveredBy: TaskCorrespondence;

    DeliveredBy(context?: BaseDataContext): TaskCorrespondence {
        if (this.__DeliveredBy)
           return this.__DeliveredBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._DeliveredBy) as TaskCorrespondence;
    }
    setDeliveredBy(value: TaskCorrespondence) {
        this.__DeliveredBy = value;
    }
    get _DeliveredBy(): string {
        return this.Out;
    }
    set _DeliveredBy(value: string) {
        this.Out = value;
    }
    //   In to DataPointEmail
    private __DeliversEmail: DataPointEmail;

    DeliversEmail(context?: BaseDataContext): DataPointEmail {
        if (this.__DeliversEmail)
           return this.__DeliversEmail;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._DeliversEmail) as DataPointEmail;
    }
    setDeliversEmail(value: DataPointEmail) {
        this.__DeliversEmail = value;
    }
    get _DeliversEmail(): string {
        return this.In;
    }
    set _DeliversEmail(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): TaskCorrespondenceDeliversDataPointEmail {
       return ModelUtils.deserializeEdge<TaskCorrespondenceDeliversDataPointEmail>(this, input, datacontext, super._deserialize);
    }


    clone(): TaskCorrespondenceDeliversDataPointEmail {
        let clone = new TaskCorrespondenceDeliversDataPointEmail();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class TaskCorrespondenceMailToDataGroup extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "TaskCorrespondenceMailToDataGroup";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to TaskCorrespondence
    private __MailBy: TaskCorrespondence;

    MailBy(context?: BaseDataContext): TaskCorrespondence {
        if (this.__MailBy)
           return this.__MailBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._MailBy) as TaskCorrespondence;
    }
    setMailBy(value: TaskCorrespondence) {
        this.__MailBy = value;
    }
    get _MailBy(): string {
        return this.Out;
    }
    set _MailBy(value: string) {
        this.Out = value;
    }
    //   In to DataGroup
    private __MailTo: DataGroup;

    MailTo(context?: BaseDataContext): DataGroup {
        if (this.__MailTo)
           return this.__MailTo;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._MailTo) as DataGroup;
    }
    setMailTo(value: DataGroup) {
        this.__MailTo = value;
    }
    get _MailTo(): string {
        return this.In;
    }
    set _MailTo(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): TaskCorrespondenceMailToDataGroup {
       return ModelUtils.deserializeEdge<TaskCorrespondenceMailToDataGroup>(this, input, datacontext, super._deserialize);
    }


    clone(): TaskCorrespondenceMailToDataGroup {
        let clone = new TaskCorrespondenceMailToDataGroup();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class TaskCorrespondenceMessagesEmailTemplate extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "TaskCorrespondenceMessagesEmailTemplate";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to TaskCorrespondence
    private __MessagedBy: TaskCorrespondence;

    MessagedBy(context?: BaseDataContext): TaskCorrespondence {
        if (this.__MessagedBy)
           return this.__MessagedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._MessagedBy) as TaskCorrespondence;
    }
    setMessagedBy(value: TaskCorrespondence) {
        this.__MessagedBy = value;
    }
    get _MessagedBy(): string {
        return this.Out;
    }
    set _MessagedBy(value: string) {
        this.Out = value;
    }
    //   In to EmailTemplate
    private __Messages: EmailTemplate;

    Messages(context?: BaseDataContext): EmailTemplate {
        if (this.__Messages)
           return this.__Messages;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Messages) as EmailTemplate;
    }
    setMessages(value: EmailTemplate) {
        this.__Messages = value;
    }
    get _Messages(): string {
        return this.In;
    }
    set _Messages(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): TaskCorrespondenceMessagesEmailTemplate {
       return ModelUtils.deserializeEdge<TaskCorrespondenceMessagesEmailTemplate>(this, input, datacontext, super._deserialize);
    }


    clone(): TaskCorrespondenceMessagesEmailTemplate {
        let clone = new TaskCorrespondenceMessagesEmailTemplate();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class TaskCorrespondenceParameterSubstitutesDataPoint extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "TaskCorrespondenceParameterSubstitutesDataPoint";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get ParameterName(): string {
        return this.data.ParameterName;
    }
    set ParameterName(value: string) {
        this.data.ParameterName = value;
    }
    get Path(): string {
        return this.data.Path;
    }
    set Path(value: string) {
        this.data.Path = value;
    }

    // Relationships

    //   Out to TaskCorrespondence
    private __ParameterSubstitutedBy: TaskCorrespondence;

    ParameterSubstitutedBy(context?: BaseDataContext): TaskCorrespondence {
        if (this.__ParameterSubstitutedBy)
           return this.__ParameterSubstitutedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._ParameterSubstitutedBy) as TaskCorrespondence;
    }
    setParameterSubstitutedBy(value: TaskCorrespondence) {
        this.__ParameterSubstitutedBy = value;
    }
    get _ParameterSubstitutedBy(): string {
        return this.Out;
    }
    set _ParameterSubstitutedBy(value: string) {
        this.Out = value;
    }
    //   In to DataPoint
    private __ParameterSubstitutes: DataPoint;

    ParameterSubstitutes(context?: BaseDataContext): DataPoint {
        if (this.__ParameterSubstitutes)
           return this.__ParameterSubstitutes;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._ParameterSubstitutes) as DataPoint;
    }
    setParameterSubstitutes(value: DataPoint) {
        this.__ParameterSubstitutes = value;
    }
    get _ParameterSubstitutes(): string {
        return this.In;
    }
    set _ParameterSubstitutes(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): TaskCorrespondenceParameterSubstitutesDataPoint {
       return ModelUtils.deserializeEdge<TaskCorrespondenceParameterSubstitutesDataPoint>(this, input, datacontext, super._deserialize);
    }


    clone(): TaskCorrespondenceParameterSubstitutesDataPoint {
        let clone = new TaskCorrespondenceParameterSubstitutesDataPoint();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface ITenantDeveloperOptions {
    Id: string,
    TenantKey: string,
    readonly ApiManagementSubscriptionPrimaryKey?: string,
    readonly ApiManagementSubscriptionSecondaryKey?: string



}

export class TenantDeveloperOptions extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "TenantDeveloperOptions";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof TenantDeveloperOptions }[] = [

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
    get TenantKey(): string {
        return this.data.TenantKey;
    }
    set TenantKey(value: string) {
        this.data.TenantKey = value;
    }
    get ApiManagementSubscriptionPrimaryKey(): string {
        return this.data.ApiManagementSubscriptionPrimaryKey;
    }
    get ApiManagementSubscriptionSecondaryKey(): string {
        return this.data.ApiManagementSubscriptionSecondaryKey;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): TenantDeveloperOptions {
        return ModelUtils.deserializeVertex<TenantDeveloperOptions>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: TenantDeveloperOptions) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            TenantKey: model.TenantKey,
            ApiManagementSubscriptionPrimaryKey: model.ApiManagementSubscriptionPrimaryKey,
            ApiManagementSubscriptionSecondaryKey: model.ApiManagementSubscriptionSecondaryKey,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TenantDeveloperOptions {
        let clone = new TenantDeveloperOptions();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }
}

export class TenantUserDevelopsAsDeveloper extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "TenantUserDevelopsAsDeveloper";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Developer
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
        return this.Out;
    }
    set _DevelopsAs(value: string) {
        this.Out = value;
    }
    //   In to TenantUser
    private __IsPersonaOf: TenantUser;

    IsPersonaOf(context?: BaseDataContext): TenantUser {
        if (this.__IsPersonaOf)
           return this.__IsPersonaOf;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsPersonaOf) as TenantUser;
    }
    setIsPersonaOf(value: TenantUser) {
        this.__IsPersonaOf = value;
    }
    get _IsPersonaOf(): string {
        return this.In;
    }
    set _IsPersonaOf(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): TenantUserDevelopsAsDeveloper {
       return ModelUtils.deserializeEdge<TenantUserDevelopsAsDeveloper>(this, input, datacontext, super._deserialize);
    }


    clone(): TenantUserDevelopsAsDeveloper {
        let clone = new TenantUserDevelopsAsDeveloper();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class TenantUserMemberOfWorkGroup extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "TenantUserMemberOfWorkGroup";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get DateOfMembership(): Date {
        return this.data.DateOfMembership ? new Date(this.data.DateOfMembership) : undefined;
    }
    set DateOfMembership(value: Date) {
        this.data.DateOfMembership = value;
    }

    // Relationships

    //   Out to TenantUser
    private __HasMembers: TenantUser;

    HasMembers(context?: BaseDataContext): TenantUser {
        if (this.__HasMembers)
           return this.__HasMembers;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._HasMembers) as TenantUser;
    }
    setHasMembers(value: TenantUser) {
        this.__HasMembers = value;
    }
    get _HasMembers(): string {
        return this.Out;
    }
    set _HasMembers(value: string) {
        this.Out = value;
    }
    //   In to WorkGroup
    private __IsMemberOf: WorkGroup;

    IsMemberOf(context?: BaseDataContext): WorkGroup {
        if (this.__IsMemberOf)
           return this.__IsMemberOf;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsMemberOf) as WorkGroup;
    }
    setIsMemberOf(value: WorkGroup) {
        this.__IsMemberOf = value;
    }
    get _IsMemberOf(): string {
        return this.In;
    }
    set _IsMemberOf(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): TenantUserMemberOfWorkGroup {
       return ModelUtils.deserializeEdge<TenantUserMemberOfWorkGroup>(this, input, datacontext, super._deserialize);
    }


    clone(): TenantUserMemberOfWorkGroup {
        let clone = new TenantUserMemberOfWorkGroup();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class TransactionType extends DocumentModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "TransactionType";
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
    get Name(): string {
        return this.data.Name;
    }
    set Name(value: string) {
        this.data.Name = value;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get Action(): string {
        return this.data.Action;
    }
    set Action(value: string) {
        this.data.Action = value;
    }
    get PolicyStateConstraint(): string {
        return this.data.PolicyStateConstraint;
    }
    set PolicyStateConstraint(value: string) {
        this.data.PolicyStateConstraint = value;
    }


    deserialize(input: Object, datacontext): TransactionType {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: TransactionType) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DeletedDate: model.DeletedDate,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            Action: model.Action,
            PolicyStateConstraint: model.PolicyStateConstraint,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TransactionType {
        let clone = new TransactionType();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IUserNotificationCenter {
    Id: string,
    IdentityKey: string,
    EnableInAppNotificationPopups: boolean,
    NotificationTypeSettings?: { [index: string]: boolean },
    ExpirationDurationOfReadNotificationsInDays: number,

    IsAlertedBy?: object[]

}

export class UserNotificationCenter extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "UserNotificationCenter";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof UserNotificationCenter }[] = [

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
    get IdentityKey(): string {
        return this.data.IdentityKey;
    }
    set IdentityKey(value: string) {
        this.data.IdentityKey = value;
    }
    get EnableInAppNotificationPopups(): boolean {
        return this.data.EnableInAppNotificationPopups;
    }
    set EnableInAppNotificationPopups(value: boolean) {
        this.data.EnableInAppNotificationPopups = value;
    }
    get NotificationTypeSettings(): { [index: string]: boolean } {
        return this.data.NotificationTypeSettings;
    }
    set NotificationTypeSettings(value: { [index: string]: boolean }) {
        this.data.NotificationTypeSettings = value;
    }
    get ExpirationDurationOfReadNotificationsInDays(): number {
        return this.data.ExpirationDurationOfReadNotificationsInDays;
    }
    set ExpirationDurationOfReadNotificationsInDays(value: number) {
        this.data.ExpirationDurationOfReadNotificationsInDays = value;
    }

    // Relationships

    // Relationship IsAlertedBy, returns Notification UserNotificationCenterIsAlertedByNotification[]
    private __IsAlertedBy: UserNotificationCenterIsAlertedByNotification[];
    IsAlertedBy(_context?: BaseDataContext): UserNotificationCenterIsAlertedByNotification[] {
        if (this.__IsAlertedBy)
            return this.__IsAlertedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsAlertedBy), (id) => context.get(id) as UserNotificationCenterIsAlertedByNotification);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsAlertedBy(values: UserNotificationCenterIsAlertedByNotification[]) {
         if (this.Context != null)
             throw Error;

        this.__IsAlertedBy = values;
     }
    get _IsAlertedBy(): Set<string> {
        if (!this._relationships.has("IsAlertedBy"))
            this._relationships.set("IsAlertedBy", new Set<string>());

        return this._relationships.get("IsAlertedBy");
    }
    set _IsAlertedBy(values: Set<string>) {
        this._relationships.set("IsAlertedBy", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsAlertedBy',
            edgeType: UserNotificationCenterIsAlertedByNotification,
            otherVertexPropertyName: 'Alerts',
            otherVertexType: Notification,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): UserNotificationCenter {
        return ModelUtils.deserializeVertex<UserNotificationCenter>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: UserNotificationCenter) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            IdentityKey: model.IdentityKey,
            EnableInAppNotificationPopups: model.EnableInAppNotificationPopups,
            NotificationTypeSettings: model.NotificationTypeSettings,
            ExpirationDurationOfReadNotificationsInDays: model.ExpirationDurationOfReadNotificationsInDays,
            IsAlertedBy: ModelUtils.serializeShallowEdge(model.IsAlertedBy(), 'IsAlertedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): UserNotificationCenter {
        let clone = new UserNotificationCenter();
        clone.data = _.cloneDeep(this.data);
        clone._IsAlertedBy = _.cloneDeep(this._IsAlertedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export class UserNotificationCenterIsAlertedByNotification extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "UserNotificationCenterIsAlertedByNotification";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get Read(): boolean {
        return this.data.Read;
    }
    set Read(value: boolean) {
        this.data.Read = value;
    }
    get ExpirationDate(): Date {
        return this.data.ExpirationDate ? new Date(this.data.ExpirationDate) : undefined;
    }
    set ExpirationDate(value: Date) {
        this.data.ExpirationDate = value;
    }

    // Relationships

    //   Out to UserNotificationCenter
    private __Alerts: UserNotificationCenter;

    Alerts(context?: BaseDataContext): UserNotificationCenter {
        if (this.__Alerts)
           return this.__Alerts;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Alerts) as UserNotificationCenter;
    }
    setAlerts(value: UserNotificationCenter) {
        this.__Alerts = value;
    }
    get _Alerts(): string {
        return this.Out;
    }
    set _Alerts(value: string) {
        this.Out = value;
    }
    //   In to Notification
    private __IsAlertedBy: Notification;

    IsAlertedBy(context?: BaseDataContext): Notification {
        if (this.__IsAlertedBy)
           return this.__IsAlertedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsAlertedBy) as Notification;
    }
    setIsAlertedBy(value: Notification) {
        this.__IsAlertedBy = value;
    }
    get _IsAlertedBy(): string {
        return this.In;
    }
    set _IsAlertedBy(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): UserNotificationCenterIsAlertedByNotification {
       return ModelUtils.deserializeEdge<UserNotificationCenterIsAlertedByNotification>(this, input, datacontext, super._deserialize);
    }


    clone(): UserNotificationCenterIsAlertedByNotification {
        let clone = new UserNotificationCenterIsAlertedByNotification();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IWebhook {
    Id: string,
    Name: string,
    Description: string,
    IsActive: boolean,
    Security: string,
    HTTPMethod: string,
    AreaUrls?: { [index: string]: string },
    Mode?: string,
    Timeout?: number,
    IsAIIntegration?: boolean



}

export class Webhook extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Webhook";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Webhook }[] = [

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
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get IsActive(): boolean {
        return this.data.IsActive;
    }
    set IsActive(value: boolean) {
        this.data.IsActive = value;
    }
    get Security(): string {
        return this.data.Security;
    }
    set Security(value: string) {
        this.data.Security = value;
    }
    get HTTPMethod(): string {
        return this.data.HTTPMethod;
    }
    set HTTPMethod(value: string) {
        this.data.HTTPMethod = value;
    }
    get AreaUrls(): { [index: string]: string } {
        return this.data.AreaUrls;
    }
    set AreaUrls(value: { [index: string]: string }) {
        this.data.AreaUrls = value;
    }
    get Mode(): string {
        return this.data.Mode;
    }
    set Mode(value: string) {
        this.data.Mode = value;
    }
    get Timeout(): number {
        return this.data.Timeout;
    }
    set Timeout(value: number) {
        this.data.Timeout = value;
    }
    get IsAIIntegration(): boolean {
        return this.data.IsAIIntegration;
    }
    set IsAIIntegration(value: boolean) {
        this.data.IsAIIntegration = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Webhook {
        return ModelUtils.deserializeVertex<Webhook>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Webhook) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            IsActive: model.IsActive,
            Security: model.Security,
            HTTPMethod: model.HTTPMethod,
            AreaUrls: model.AreaUrls,
            Mode: model.Mode,
            Timeout: model.Timeout,
            IsAIIntegration: model.IsAIIntegration,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Webhook {
        let clone = new Webhook();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }
}

export class WebhookActivity extends DocumentModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "WebhookActivity";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get EventId(): string {
        return this.data.EventId;
    }
    set EventId(value: string) {
        this.data.EventId = value;
    }
    get AccountId(): string {
        return this.data.AccountId;
    }
    set AccountId(value: string) {
        this.data.AccountId = value;
    }
    get AreaKey(): string {
        return this.data.AreaKey;
    }
    set AreaKey(value: string) {
        this.data.AreaKey = value;
    }
    get Status(): string {
        return this.data.Status;
    }
    set Status(value: string) {
        this.data.Status = value;
    }
    get EventTimeStamp(): Date {
        return this.data.EventTimeStamp ? new Date(this.data.EventTimeStamp) : undefined;
    }
    set EventTimeStamp(value: Date) {
        this.data.EventTimeStamp = value;
    }
    get SentTimeStamp(): Date {
        return this.data.SentTimeStamp ? new Date(this.data.SentTimeStamp) : undefined;
    }
    set SentTimeStamp(value: Date) {
        this.data.SentTimeStamp = value;
    }
    get CompletedTimeStamp(): Date {
        return this.data.CompletedTimeStamp ? new Date(this.data.CompletedTimeStamp) : undefined;
    }
    set CompletedTimeStamp(value: Date) {
        this.data.CompletedTimeStamp = value;
    }
    get Messages(): string[] {
        return this.data.Messages;
    }
    set Messages(value: string[]) {
        this.data.Messages = value;
    }
    get WebhookDefinitionId(): string {
        return this.data.WebhookDefinitionId;
    }
    set WebhookDefinitionId(value: string) {
        this.data.WebhookDefinitionId = value;
    }
    get SendWebhookMessage(): any {
        return this.data.SendWebhookMessage;
    }
    set SendWebhookMessage(value: any) {
        this.data.SendWebhookMessage = value;
    }
    get Mode(): string {
        return this.data.Mode;
    }
    set Mode(value: string) {
        this.data.Mode = value;
    }
    get WebhookName(): string {
        return this.data.WebhookName;
    }
    set WebhookName(value: string) {
        this.data.WebhookName = value;
    }
    get AccountNumber(): string {
        return this.data.AccountNumber;
    }
    set AccountNumber(value: string) {
        this.data.AccountNumber = value;
    }
    get ActionName(): string {
        return this.data.ActionName;
    }
    set ActionName(value: string) {
        this.data.ActionName = value;
    }
    get EventName(): string {
        return this.data.EventName;
    }
    set EventName(value: string) {
        this.data.EventName = value;
    }
    get EntityName(): string {
        return this.data.EntityName;
    }
    set EntityName(value: string) {
        this.data.EntityName = value;
    }
    get CustomOperation(): string {
        return this.data.CustomOperation;
    }
    set CustomOperation(value: string) {
        this.data.CustomOperation = value;
    }
    get AcknowledgedOn(): Date {
        return this.data.AcknowledgedOn ? new Date(this.data.AcknowledgedOn) : undefined;
    }
    set AcknowledgedOn(value: Date) {
        this.data.AcknowledgedOn = value;
    }
    get WorkflowId(): string {
        return this.data.WorkflowId;
    }
    set WorkflowId(value: string) {
        this.data.WorkflowId = value;
    }
    get ActivityMadeStale(): string {
        return this.data.ActivityMadeStale;
    }
    set ActivityMadeStale(value: string) {
        this.data.ActivityMadeStale = value;
    }


    deserialize(input: Object, datacontext): WebhookActivity {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: WebhookActivity) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            EventId: model.EventId,
            AccountId: model.AccountId,
            AreaKey: model.AreaKey,
            Status: model.Status,
            EventTimeStamp: model.EventTimeStamp,
            SentTimeStamp: model.SentTimeStamp,
            CompletedTimeStamp: model.CompletedTimeStamp,
            Messages: model.Messages,
            WebhookDefinitionId: model.WebhookDefinitionId,
            SendWebhookMessage: model.SendWebhookMessage,
            Mode: model.Mode,
            WebhookName: model.WebhookName,
            AccountNumber: model.AccountNumber,
            ActionName: model.ActionName,
            EventName: model.EventName,
            EntityName: model.EntityName,
            CustomOperation: model.CustomOperation,
            AcknowledgedOn: model.AcknowledgedOn,
            WorkflowId: model.WorkflowId,
            ActivityMadeStale: model.ActivityMadeStale,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): WebhookActivity {
        let clone = new WebhookActivity();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IWidget {
    Sequence?: string[],
    Id: string,
    Title?: string,
    WidgetType?: string,
    AssociatedId?: string,
    ShowDataWhenValueIsNull?: boolean

    IsUsedBy?: object[]

}

export class Widget extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Widget";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Widget }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get Sequence(): string[] {
        return this.data.Sequence;
    }
    set Sequence(value: string[]) {
        this.data.Sequence = value;
    }
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get Title(): string {
        return this.data.Title;
    }
    set Title(value: string) {
        this.data.Title = value;
    }
    get WidgetType(): string {
        return this.data.WidgetType;
    }
    set WidgetType(value: string) {
        this.data.WidgetType = value;
    }
    get AssociatedId(): string {
        return this.data.AssociatedId;
    }
    set AssociatedId(value: string) {
        this.data.AssociatedId = value;
    }
    get ShowDataWhenValueIsNull(): boolean {
        return this.data.ShowDataWhenValueIsNull;
    }
    set ShowDataWhenValueIsNull(value: boolean) {
        this.data.ShowDataWhenValueIsNull = value;
    }

    // Relationships

    // Relationship IsUsedBy, returns DataPanel DataPanelUsesWidget[]
    private __IsUsedBy: DataPanelUsesWidget[];
    IsUsedBy(_context?: BaseDataContext): DataPanelUsesWidget[] {
        if (this.__IsUsedBy)
            return this.__IsUsedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsUsedBy), (id) => context.get(id) as DataPanelUsesWidget);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsUsedBy(values: DataPanelUsesWidget[]) {
         if (this.Context != null)
             throw Error;

        this.__IsUsedBy = values;
     }
    get _IsUsedBy(): Set<string> {
        if (!this._relationships.has("IsUsedBy"))
            this._relationships.set("IsUsedBy", new Set<string>());

        return this._relationships.get("IsUsedBy");
    }
    set _IsUsedBy(values: Set<string>) {
        this._relationships.set("IsUsedBy", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsUsedBy',
            edgeType: DataPanelUsesWidget,
            otherVertexPropertyName: 'Uses',
            otherVertexType: DataPanel,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Widget {
        return ModelUtils.deserializeVertex<Widget>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Widget) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Sequence: model.Sequence,
            Id: model.Id,
            Title: model.Title,
            WidgetType: model.WidgetType,
            AssociatedId: model.AssociatedId,
            ShowDataWhenValueIsNull: model.ShowDataWhenValueIsNull,
            IsUsedBy: ModelUtils.serializeShallowEdge(model.IsUsedBy(), 'IsUsedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Widget {
        let clone = new Widget();
        clone.data = _.cloneDeep(this.data);
        clone._IsUsedBy = _.cloneDeep(this._IsUsedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IWorkable {
    Id: string,
    WaitingForIds?: string[],
    OnBeforeCompleteEventActions?: any[],

    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    Enables?: object[]

}

export class Workable extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Workable";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Workable }[] = [
            {className: 'Phase', type: Phase},
            {className: 'Task', type: Task},
            {className: 'TaskApplication', type: TaskApplication},
            {className: 'TaskApproval', type: TaskApproval},
            {className: 'TaskClearance', type: TaskClearance},
            {className: 'TaskCorrespondence', type: TaskCorrespondence},
            {className: 'TaskDocumentGeneration', type: TaskDocumentGeneration},
            {className: 'TaskFileRequirement', type: TaskFileRequirement},
            {className: 'TaskManual', type: TaskManual},
            {className: 'TaskPolicyDates', type: TaskPolicyDates},
            {className: 'TaskProducts', type: TaskProducts},
            {className: 'TaskRatingSystem', type: TaskRatingSystem},

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
    get WaitingForIds(): string[] {
        return this.data.WaitingForIds;
    }
    set WaitingForIds(value: string[]) {
        this.data.WaitingForIds = value;
    }
    get OnBeforeCompleteEventActions(): any[] {
        return this.data.OnBeforeCompleteEventActions;
    }
    set OnBeforeCompleteEventActions(value: any[]) {
        this.data.OnBeforeCompleteEventActions = value;
    }

    // Relationships

    // Relationship IsTriggeredBy, returns Workable ServiceLevel[]
    private __IsTriggeredBy: ServiceLevel[];
    IsTriggeredBy(_context?: BaseDataContext): ServiceLevel[] {
        if (this.__IsTriggeredBy)
            return this.__IsTriggeredBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsTriggeredBy), (id) => context.get(id) as ServiceLevel);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsTriggeredBy(values: ServiceLevel[]) {
         if (this.Context != null)
             throw Error;

        this.__IsTriggeredBy = values;
     }
    get _IsTriggeredBy(): Set<string> {
        if (!this._relationships.has("IsTriggeredBy"))
            this._relationships.set("IsTriggeredBy", new Set<string>());

        return this._relationships.get("IsTriggeredBy");
    }
    set _IsTriggeredBy(values: Set<string>) {
        this._relationships.set("IsTriggeredBy", values);
    }

    // Relationship WaitsFor, returns Workable WorkableEnablesWorkable[]
    private __WaitsFor: WorkableEnablesWorkable[];
    WaitsFor(_context?: BaseDataContext): WorkableEnablesWorkable[] {
        if (this.__WaitsFor)
            return this.__WaitsFor;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._WaitsFor), (id) => context.get(id) as WorkableEnablesWorkable);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setWaitsFor(values: WorkableEnablesWorkable[]) {
         if (this.Context != null)
             throw Error;

        this.__WaitsFor = values;
     }
    get _WaitsFor(): Set<string> {
        if (!this._relationships.has("WaitsFor"))
            this._relationships.set("WaitsFor", new Set<string>());

        return this._relationships.get("WaitsFor");
    }
    set _WaitsFor(values: Set<string>) {
        this._relationships.set("WaitsFor", values);
    }

    // Relationship Triggers, returns Workable ServiceLevel[]
    private __Triggers: ServiceLevel[];
    Triggers(_context?: BaseDataContext): ServiceLevel[] {
        if (this.__Triggers)
            return this.__Triggers;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Triggers), (id) => context.get(id) as ServiceLevel);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setTriggers(values: ServiceLevel[]) {
         if (this.Context != null)
             throw Error;

        this.__Triggers = values;
     }
    get _Triggers(): Set<string> {
        if (!this._relationships.has("Triggers"))
            this._relationships.set("Triggers", new Set<string>());

        return this._relationships.get("Triggers");
    }
    set _Triggers(values: Set<string>) {
        this._relationships.set("Triggers", values);
    }

    // Relationship Enables, returns Workable WorkableEnablesWorkable[]
    private __Enables: WorkableEnablesWorkable[];
    Enables(_context?: BaseDataContext): WorkableEnablesWorkable[] {
        if (this.__Enables)
            return this.__Enables;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Enables), (id) => context.get(id) as WorkableEnablesWorkable);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setEnables(values: WorkableEnablesWorkable[]) {
         if (this.Context != null)
             throw Error;

        this.__Enables = values;
     }
    get _Enables(): Set<string> {
        if (!this._relationships.has("Enables"))
            this._relationships.set("Enables", new Set<string>());

        return this._relationships.get("Enables");
    }
    set _Enables(values: Set<string>) {
        this._relationships.set("Enables", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsTriggeredBy',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'Triggers',
            otherVertexType: Workable,
        },
        {
            propertyName: 'WaitsFor',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'Enables',
            otherVertexType: Workable,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Triggers',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'IsTriggeredBy',
            otherVertexType: Workable,
        },
        {
            propertyName: 'Enables',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'WaitsFor',
            otherVertexType: Workable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Workable {
        return ModelUtils.deserializeVertex<Workable>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Workable) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            WaitingForIds: model.WaitingForIds,
            OnBeforeCompleteEventActions: model.OnBeforeCompleteEventActions,
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Workable {
        let clone = new Workable();
        clone.data = _.cloneDeep(this.data);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export class WorkableEnablesWorkable extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "WorkableEnablesWorkable";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get Event(): string {
        return this.data.Event;
    }
    set Event(value: string) {
        this.data.Event = value;
    }

    // Relationships

    //   Out to Workable
    private __WaitsFor: Workable;

    WaitsFor(context?: BaseDataContext): Workable {
        if (this.__WaitsFor)
           return this.__WaitsFor;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._WaitsFor) as Workable;
    }
    setWaitsFor(value: Workable) {
        this.__WaitsFor = value;
    }
    get _WaitsFor(): string {
        return this.Out;
    }
    set _WaitsFor(value: string) {
        this.Out = value;
    }
    //   In to Workable
    private __Enables: Workable;

    Enables(context?: BaseDataContext): Workable {
        if (this.__Enables)
           return this.__Enables;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Enables) as Workable;
    }
    setEnables(value: Workable) {
        this.__Enables = value;
    }
    get _Enables(): string {
        return this.In;
    }
    set _Enables(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): WorkableEnablesWorkable {
       return ModelUtils.deserializeEdge<WorkableEnablesWorkable>(this, input, datacontext, super._deserialize);
    }


    clone(): WorkableEnablesWorkable {
        let clone = new WorkableEnablesWorkable();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class WorkflowConfiguredByWorkflowOptions extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "WorkflowConfiguredByWorkflowOptions";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Workflow
    private __Configures: Workflow;

    Configures(context?: BaseDataContext): Workflow {
        if (this.__Configures)
           return this.__Configures;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Configures) as Workflow;
    }
    setConfigures(value: Workflow) {
        this.__Configures = value;
    }
    get _Configures(): string {
        return this.Out;
    }
    set _Configures(value: string) {
        this.Out = value;
    }
    //   In to WorkflowOptions
    private __IsConfiguredBy: WorkflowOptions;

    IsConfiguredBy(context?: BaseDataContext): WorkflowOptions {
        if (this.__IsConfiguredBy)
           return this.__IsConfiguredBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsConfiguredBy) as WorkflowOptions;
    }
    setIsConfiguredBy(value: WorkflowOptions) {
        this.__IsConfiguredBy = value;
    }
    get _IsConfiguredBy(): string {
        return this.In;
    }
    set _IsConfiguredBy(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): WorkflowConfiguredByWorkflowOptions {
       return ModelUtils.deserializeEdge<WorkflowConfiguredByWorkflowOptions>(this, input, datacontext, super._deserialize);
    }


    clone(): WorkflowConfiguredByWorkflowOptions {
        let clone = new WorkflowConfiguredByWorkflowOptions();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class WorkflowIsSequencedByWorkflowSequence extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "WorkflowIsSequencedByWorkflowSequence";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Workflow
    private __Sequences: Workflow;

    Sequences(context?: BaseDataContext): Workflow {
        if (this.__Sequences)
           return this.__Sequences;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Sequences) as Workflow;
    }
    setSequences(value: Workflow) {
        this.__Sequences = value;
    }
    get _Sequences(): string {
        return this.Out;
    }
    set _Sequences(value: string) {
        this.Out = value;
    }
    //   In to WorkflowSequence
    private __IsSequencedBy: WorkflowSequence;

    IsSequencedBy(context?: BaseDataContext): WorkflowSequence {
        if (this.__IsSequencedBy)
           return this.__IsSequencedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsSequencedBy) as WorkflowSequence;
    }
    setIsSequencedBy(value: WorkflowSequence) {
        this.__IsSequencedBy = value;
    }
    get _IsSequencedBy(): string {
        return this.In;
    }
    set _IsSequencedBy(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): WorkflowIsSequencedByWorkflowSequence {
       return ModelUtils.deserializeEdge<WorkflowIsSequencedByWorkflowSequence>(this, input, datacontext, super._deserialize);
    }


    clone(): WorkflowIsSequencedByWorkflowSequence {
        let clone = new WorkflowIsSequencedByWorkflowSequence();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IWorkflowOptions {
    Id: string,
    AddType?: string,
    AddTransactionId?: string,
    AddAllOtherTransactionId?: string,
    ModifyTransactionId?: string,
    RemoveTransactionId?: string,
    ProductEligibility?: { [index: string]: ActionEligibilityStatus }

    Configures?: object[]

}

export class WorkflowOptions extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "WorkflowOptions";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof WorkflowOptions }[] = [

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
    get AddType(): string {
        return this.data.AddType;
    }
    set AddType(value: string) {
        this.data.AddType = value;
    }
    get AddTransactionId(): string {
        return this.data.AddTransactionId;
    }
    set AddTransactionId(value: string) {
        this.data.AddTransactionId = value;
    }
    get AddAllOtherTransactionId(): string {
        return this.data.AddAllOtherTransactionId;
    }
    set AddAllOtherTransactionId(value: string) {
        this.data.AddAllOtherTransactionId = value;
    }
    get ModifyTransactionId(): string {
        return this.data.ModifyTransactionId;
    }
    set ModifyTransactionId(value: string) {
        this.data.ModifyTransactionId = value;
    }
    get RemoveTransactionId(): string {
        return this.data.RemoveTransactionId;
    }
    set RemoveTransactionId(value: string) {
        this.data.RemoveTransactionId = value;
    }
    get ProductEligibility(): { [index: string]: ActionEligibilityStatus } {
        return this.data.ProductEligibility;
    }
    set ProductEligibility(value: { [index: string]: ActionEligibilityStatus }) {
        this.data.ProductEligibility = value;
    }

    // Relationships

    // Relationship Configures, returns Workflow WorkflowConfiguredByWorkflowOptions[]
    private __Configures: WorkflowConfiguredByWorkflowOptions[];
    Configures(_context?: BaseDataContext): WorkflowConfiguredByWorkflowOptions[] {
        if (this.__Configures)
            return this.__Configures;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Configures), (id) => context.get(id) as WorkflowConfiguredByWorkflowOptions);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setConfigures(values: WorkflowConfiguredByWorkflowOptions[]) {
         if (this.Context != null)
             throw Error;

        this.__Configures = values;
     }
    get _Configures(): Set<string> {
        if (!this._relationships.has("Configures"))
            this._relationships.set("Configures", new Set<string>());

        return this._relationships.get("Configures");
    }
    set _Configures(values: Set<string>) {
        this._relationships.set("Configures", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Configures',
            edgeType: WorkflowConfiguredByWorkflowOptions,
            otherVertexPropertyName: 'IsConfiguredBy',
            otherVertexType: Workflow,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): WorkflowOptions {
        return ModelUtils.deserializeVertex<WorkflowOptions>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: WorkflowOptions) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            AddType: model.AddType,
            AddTransactionId: model.AddTransactionId,
            AddAllOtherTransactionId: model.AddAllOtherTransactionId,
            ModifyTransactionId: model.ModifyTransactionId,
            RemoveTransactionId: model.RemoveTransactionId,
            ProductEligibility: model.ProductEligibility,
            Configures: ModelUtils.serializeShallowEdge(model.Configures(), 'Configures'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): WorkflowOptions {
        let clone = new WorkflowOptions();
        clone.data = _.cloneDeep(this.data);
        clone._Configures = _.cloneDeep(this._Configures);

        //clone.Context = this.Context;
        return clone;
    }
}

export class WorkflowRequiresPhase extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "WorkflowRequiresPhase";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Workflow
    private __IsRequiredFor: Workflow;

    IsRequiredFor(context?: BaseDataContext): Workflow {
        if (this.__IsRequiredFor)
           return this.__IsRequiredFor;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsRequiredFor) as Workflow;
    }
    setIsRequiredFor(value: Workflow) {
        this.__IsRequiredFor = value;
    }
    get _IsRequiredFor(): string {
        return this.Out;
    }
    set _IsRequiredFor(value: string) {
        this.Out = value;
    }
    //   In to Phase
    private __Requires: Phase;

    Requires(context?: BaseDataContext): Phase {
        if (this.__Requires)
           return this.__Requires;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Requires) as Phase;
    }
    setRequires(value: Phase) {
        this.__Requires = value;
    }
    get _Requires(): string {
        return this.In;
    }
    set _Requires(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): WorkflowRequiresPhase {
       return ModelUtils.deserializeEdge<WorkflowRequiresPhase>(this, input, datacontext, super._deserialize);
    }


    clone(): WorkflowRequiresPhase {
        let clone = new WorkflowRequiresPhase();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IWorkflowSequence {
    Sequence?: string[],
    Id: string

    Sequences?: object[]

}

export class WorkflowSequence extends VertexModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "WorkflowSequence";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof WorkflowSequence }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get Sequence(): string[] {
        return this.data.Sequence;
    }
    set Sequence(value: string[]) {
        this.data.Sequence = value;
    }
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    // Relationship Sequences, returns Workflow WorkflowIsSequencedByWorkflowSequence[]
    private __Sequences: WorkflowIsSequencedByWorkflowSequence[];
    Sequences(_context?: BaseDataContext): WorkflowIsSequencedByWorkflowSequence[] {
        if (this.__Sequences)
            return this.__Sequences;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Sequences), (id) => context.get(id) as WorkflowIsSequencedByWorkflowSequence);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setSequences(values: WorkflowIsSequencedByWorkflowSequence[]) {
         if (this.Context != null)
             throw Error;

        this.__Sequences = values;
     }
    get _Sequences(): Set<string> {
        if (!this._relationships.has("Sequences"))
            this._relationships.set("Sequences", new Set<string>());

        return this._relationships.get("Sequences");
    }
    set _Sequences(values: Set<string>) {
        this._relationships.set("Sequences", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Sequences',
            edgeType: WorkflowIsSequencedByWorkflowSequence,
            otherVertexPropertyName: 'IsSequencedBy',
            otherVertexType: Workflow,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): WorkflowSequence {
        return ModelUtils.deserializeVertex<WorkflowSequence>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: WorkflowSequence) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Sequence: model.Sequence,
            Id: model.Id,
            Sequences: ModelUtils.serializeShallowEdge(model.Sequences(), 'Sequences'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): WorkflowSequence {
        let clone = new WorkflowSequence();
        clone.data = _.cloneDeep(this.data);
        clone._Sequences = _.cloneDeep(this._Sequences);

        //clone.Context = this.Context;
        return clone;
    }
}

export class WorkflowSetContainsWorkflow extends EdgeModel {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "WorkflowSetContainsWorkflow";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to WorkflowSet
    private __IsContainedBy: WorkflowSet;

    IsContainedBy(context?: BaseDataContext): WorkflowSet {
        if (this.__IsContainedBy)
           return this.__IsContainedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsContainedBy) as WorkflowSet;
    }
    setIsContainedBy(value: WorkflowSet) {
        this.__IsContainedBy = value;
    }
    get _IsContainedBy(): string {
        return this.Out;
    }
    set _IsContainedBy(value: string) {
        this.Out = value;
    }
    //   In to Workflow
    private __Contains: Workflow;

    Contains(context?: BaseDataContext): Workflow {
        if (this.__Contains)
           return this.__Contains;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Contains) as Workflow;
    }
    setContains(value: Workflow) {
        this.__Contains = value;
    }
    get _Contains(): string {
        return this.In;
    }
    set _Contains(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): WorkflowSetContainsWorkflow {
       return ModelUtils.deserializeEdge<WorkflowSetContainsWorkflow>(this, input, datacontext, super._deserialize);
    }


    clone(): WorkflowSetContainsWorkflow {
        let clone = new WorkflowSetContainsWorkflow();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IAccountRole {
    Id: string,
    Initials: string,
    DisplayName: string,
    BadgePath?: string,
    TasksAssigned: number,
    readonly DateCreated?: Date,
    Description: string,
    UserType: string

    IsObligatedBy?: object[],
    InitialAssigneeFor?: object[],
    DeliveredBy?: object[]

}

export class AccountRole extends Assignable {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "AccountRole";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof AccountRole }[] = [

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
    get UserType(): string {
        return this.data.UserType;
    }
    set UserType(value: string) {
        this.data.UserType = value;
    }

    // Relationships

    // Relationship IsObligatedBy, returns Program ProgramObligatesAccountRole[]
    private __IsObligatedBy: ProgramObligatesAccountRole[];
    IsObligatedBy(_context?: BaseDataContext): ProgramObligatesAccountRole[] {
        if (this.__IsObligatedBy)
            return this.__IsObligatedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsObligatedBy), (id) => context.get(id) as ProgramObligatesAccountRole);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsObligatedBy(values: ProgramObligatesAccountRole[]) {
         if (this.Context != null)
             throw Error;

        this.__IsObligatedBy = values;
     }
    get _IsObligatedBy(): Set<string> {
        if (!this._relationships.has("IsObligatedBy"))
            this._relationships.set("IsObligatedBy", new Set<string>());

        return this._relationships.get("IsObligatedBy");
    }
    set _IsObligatedBy(values: Set<string>) {
        this._relationships.set("IsObligatedBy", values);
    }

    // Relationship DeliveredBy, returns TaskCorrespondence TaskCorrespondenceDeliversAccountRole[]
    private __DeliveredBy: TaskCorrespondenceDeliversAccountRole[];
    DeliveredBy(_context?: BaseDataContext): TaskCorrespondenceDeliversAccountRole[] {
        if (this.__DeliveredBy)
            return this.__DeliveredBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._DeliveredBy), (id) => context.get(id) as TaskCorrespondenceDeliversAccountRole);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setDeliveredBy(values: TaskCorrespondenceDeliversAccountRole[]) {
         if (this.Context != null)
             throw Error;

        this.__DeliveredBy = values;
     }
    get _DeliveredBy(): Set<string> {
        if (!this._relationships.has("DeliveredBy"))
            this._relationships.set("DeliveredBy", new Set<string>());

        return this._relationships.get("DeliveredBy");
    }
    set _DeliveredBy(values: Set<string>) {
        this._relationships.set("DeliveredBy", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsObligatedBy',
            edgeType: ProgramObligatesAccountRole,
            otherVertexPropertyName: 'Obligates',
            otherVertexType: Program,
        },
        {
            propertyName: 'InitialAssigneeFor',
            edgeType: TaskAssignedAssignable,
            otherVertexPropertyName: 'InitiallyAssignedTo',
            otherVertexType: Task,
        },
        {
            propertyName: 'DeliveredBy',
            edgeType: TaskCorrespondenceDeliversAccountRole,
            otherVertexPropertyName: 'DeliversAccount',
            otherVertexType: TaskCorrespondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): AccountRole {
        return ModelUtils.deserializeVertex<AccountRole>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: AccountRole) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            Initials: model.Initials,
            DisplayName: model.DisplayName,
            BadgePath: model.BadgePath,
            TasksAssigned: model.TasksAssigned,
            DateCreated: model.DateCreated,
            Description: model.Description,
            UserType: model.UserType,
            IsObligatedBy: ModelUtils.serializeShallowEdge(model.IsObligatedBy(), 'IsObligatedBy'),
            InitialAssigneeFor: ModelUtils.serializeShallowEdge(model.InitialAssigneeFor(), 'InitialAssigneeFor'),
            DeliveredBy: ModelUtils.serializeShallowEdge(model.DeliveredBy(), 'DeliveredBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): AccountRole {
        let clone = new AccountRole();
        clone.data = _.cloneDeep(this.data);
        clone._IsObligatedBy = _.cloneDeep(this._IsObligatedBy);
        clone._InitialAssigneeFor = _.cloneDeep(this._InitialAssigneeFor);
        clone._DeliveredBy = _.cloneDeep(this._DeliveredBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IApp {
    Id: string,
    DisplayName?: string,
    BadgePath?: string,
    LastLoginDate?: Date,
    readonly Active: boolean,
    readonly CreatedDate?: Date,
    Description?: string,
    AreaKey: string,
    readonly IsActive: boolean,
    readonly AuthProviderClientId?: string,
    readonly ApiManagementSubscriptionPrimaryKey?: string,
    readonly ApiManagementSubscriptionSecondaryKey?: string,

    IsRepresentedBy?: object[],
    FillsSecurityRole?: object[],
    WorksIn?: object[]

}

export class App extends SMIdentity {
    get Domain(): string {
        return "Configuration";
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
    get CreatedDate(): Date {
        return this.data.CreatedDate ? new Date(this.data.CreatedDate) : undefined;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get AreaKey(): string {
        return this.data.AreaKey;
    }
    set AreaKey(value: string) {
        this.data.AreaKey = value;
    }
    get IsActive(): boolean {
        return this.data.IsActive;
    }
    get AuthProviderClientId(): string {
        return this.data.AuthProviderClientId;
    }
    get ApiManagementSubscriptionPrimaryKey(): string {
        return this.data.ApiManagementSubscriptionPrimaryKey;
    }
    get ApiManagementSubscriptionSecondaryKey(): string {
        return this.data.ApiManagementSubscriptionSecondaryKey;
    }

    // Relationships

    // Relationship IsRepresentedBy, returns TenantUser AppRepresentedByTenantUser[]
    private __IsRepresentedBy: AppRepresentedByTenantUser[];
    IsRepresentedBy(_context?: BaseDataContext): AppRepresentedByTenantUser[] {
        if (this.__IsRepresentedBy)
            return this.__IsRepresentedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsRepresentedBy), (id) => context.get(id) as AppRepresentedByTenantUser);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsRepresentedBy(values: AppRepresentedByTenantUser[]) {
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


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsRepresentedBy',
            edgeType: AppRepresentedByTenantUser,
            otherVertexPropertyName: 'IsContactFor',
            otherVertexType: TenantUser,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'FillsSecurityRole',
            edgeType: SMIdentityFillsSecurityRole,
            otherVertexPropertyName: 'IsFilledBy',
            otherVertexType: SecurityRole,
        },
        {
            propertyName: 'WorksIn',
            edgeType: SMIdentityWorksInArea,
            otherVertexPropertyName: 'IsWorkedBy',
            otherVertexType: Area,
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
            BadgePath: model.BadgePath,
            LastLoginDate: model.LastLoginDate,
            Active: model.Active,
            CreatedDate: model.CreatedDate,
            Description: model.Description,
            AreaKey: model.AreaKey,
            IsActive: model.IsActive,
            AuthProviderClientId: model.AuthProviderClientId,
            ApiManagementSubscriptionPrimaryKey: model.ApiManagementSubscriptionPrimaryKey,
            ApiManagementSubscriptionSecondaryKey: model.ApiManagementSubscriptionSecondaryKey,
            IsRepresentedBy: ModelUtils.serializeShallowEdge(model.IsRepresentedBy(), 'IsRepresentedBy'),
            FillsSecurityRole: ModelUtils.serializeShallowEdge(model.FillsSecurityRole(), 'FillsSecurityRole'),
            WorksIn: ModelUtils.serializeShallowEdge(model.WorksIn(), 'WorksIn'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): App {
        let clone = new App();
        clone.data = _.cloneDeep(this.data);
        clone._IsRepresentedBy = _.cloneDeep(this._IsRepresentedBy);
        clone._FillsSecurityRole = _.cloneDeep(this._FillsSecurityRole);
        clone._WorksIn = _.cloneDeep(this._WorksIn);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IApplication {
    Sequence?: string[],
    Id: string,
    readonly LockedByChange?: string,
    Name: string,
    DisplayLabel?: string,
    Description: string,
    DataStoreId?: string,

    IsCollectedBy?: object[],
    IsTrackedFor?: object[],
    ContainsCondition?: object[],
    Collects?: object[],
    IsSequencedBy?: object[],
    Populates?: object[]

}

export class Application extends ProgramRevisioned {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Application";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Application }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get Sequence(): string[] {
        return this.data.Sequence;
    }
    set Sequence(value: string[]) {
        this.data.Sequence = value;
    }
    get Name(): string {
        return this.data.Name;
    }
    set Name(value: string) {
        this.data.Name = value;
    }
    get DisplayLabel(): string {
        return this.data.DisplayLabel;
    }
    set DisplayLabel(value: string) {
        this.data.DisplayLabel = value;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get DataStoreId(): string {
        return this.data.DataStoreId;
    }
    set DataStoreId(value: string) {
        this.data.DataStoreId = value;
    }

    // Relationships

    // Relationship IsCollectedBy, returns Program ProgramCollectsApplication[]
    private __IsCollectedBy: ProgramCollectsApplication[];
    IsCollectedBy(_context?: BaseDataContext): ProgramCollectsApplication[] {
        if (this.__IsCollectedBy)
            return this.__IsCollectedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsCollectedBy), (id) => context.get(id) as ProgramCollectsApplication);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsCollectedBy(values: ProgramCollectsApplication[]) {
         if (this.Context != null)
             throw Error;

        this.__IsCollectedBy = values;
     }
    get _IsCollectedBy(): Set<string> {
        if (!this._relationships.has("IsCollectedBy"))
            this._relationships.set("IsCollectedBy", new Set<string>());

        return this._relationships.get("IsCollectedBy");
    }
    set _IsCollectedBy(values: Set<string>) {
        this._relationships.set("IsCollectedBy", values);
    }

    // Relationship ContainsCondition, returns ElementCondition ApplicationContainsElementCondition[]
    private __ContainsCondition: ApplicationContainsElementCondition[];
    ContainsCondition(_context?: BaseDataContext): ApplicationContainsElementCondition[] {
        if (this.__ContainsCondition)
            return this.__ContainsCondition;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._ContainsCondition), (id) => context.get(id) as ApplicationContainsElementCondition);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setContainsCondition(values: ApplicationContainsElementCondition[]) {
         if (this.Context != null)
             throw Error;

        this.__ContainsCondition = values;
     }
    get _ContainsCondition(): Set<string> {
        if (!this._relationships.has("ContainsCondition"))
            this._relationships.set("ContainsCondition", new Set<string>());

        return this._relationships.get("ContainsCondition");
    }
    set _ContainsCondition(values: Set<string>) {
        this._relationships.set("ContainsCondition", values);
    }

    // Relationship Collects, returns Section ApplicationCollectsSection[]
    private __Collects: ApplicationCollectsSection[];
    Collects(_context?: BaseDataContext): ApplicationCollectsSection[] {
        if (this.__Collects)
            return this.__Collects;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Collects), (id) => context.get(id) as ApplicationCollectsSection);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setCollects(values: ApplicationCollectsSection[]) {
         if (this.Context != null)
             throw Error;

        this.__Collects = values;
     }
    get _Collects(): Set<string> {
        if (!this._relationships.has("Collects"))
            this._relationships.set("Collects", new Set<string>());

        return this._relationships.get("Collects");
    }
    set _Collects(values: Set<string>) {
        this._relationships.set("Collects", values);
    }

    // Relationship IsSequencedBy, returns ApplicationSequence ApplicationIsSequencedByApplicationSequence[]
    private __IsSequencedBy: ApplicationIsSequencedByApplicationSequence[];
    IsSequencedBy(_context?: BaseDataContext): ApplicationIsSequencedByApplicationSequence[] {
        if (this.__IsSequencedBy)
            return this.__IsSequencedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsSequencedBy), (id) => context.get(id) as ApplicationIsSequencedByApplicationSequence);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsSequencedBy(values: ApplicationIsSequencedByApplicationSequence[]) {
         if (this.Context != null)
             throw Error;

        this.__IsSequencedBy = values;
     }
    get _IsSequencedBy(): Set<string> {
        if (!this._relationships.has("IsSequencedBy"))
            this._relationships.set("IsSequencedBy", new Set<string>());

        return this._relationships.get("IsSequencedBy");
    }
    set _IsSequencedBy(values: Set<string>) {
        this._relationships.set("IsSequencedBy", values);
    }

    // Relationship Populates, returns DataStore ApplicationPopulatesDataStore[]
    private __Populates: ApplicationPopulatesDataStore[];
    Populates(_context?: BaseDataContext): ApplicationPopulatesDataStore[] {
        if (this.__Populates)
            return this.__Populates;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Populates), (id) => context.get(id) as ApplicationPopulatesDataStore);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setPopulates(values: ApplicationPopulatesDataStore[]) {
         if (this.Context != null)
             throw Error;

        this.__Populates = values;
     }
    get _Populates(): Set<string> {
        if (!this._relationships.has("Populates"))
            this._relationships.set("Populates", new Set<string>());

        return this._relationships.get("Populates");
    }
    set _Populates(values: Set<string>) {
        this._relationships.set("Populates", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsCollectedBy',
            edgeType: ProgramCollectsApplication,
            otherVertexPropertyName: 'Collects',
            otherVertexType: Program,
        },
        {
            propertyName: 'IsTrackedFor',
            edgeType: ProgramRevisionTracksProgramRevisioned,
            otherVertexPropertyName: 'Tracks',
            otherVertexType: ProgramRevision,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'ContainsCondition',
            edgeType: ApplicationContainsElementCondition,
            otherVertexPropertyName: 'IsContainedBy',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'Collects',
            edgeType: ApplicationCollectsSection,
            otherVertexPropertyName: 'IsCollectedBy',
            otherVertexType: Section,
        },
        {
            propertyName: 'IsSequencedBy',
            edgeType: ApplicationIsSequencedByApplicationSequence,
            otherVertexPropertyName: 'Sequences',
            otherVertexType: ApplicationSequence,
        },
        {
            propertyName: 'Populates',
            edgeType: ApplicationPopulatesDataStore,
            otherVertexPropertyName: 'IsPopulatedBy',
            otherVertexType: DataStore,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Application {
        return ModelUtils.deserializeVertex<Application>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Application) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Sequence: model.Sequence,
            Id: model.Id,
            LockedByChange: model.LockedByChange,
            Name: model.Name,
            DisplayLabel: model.DisplayLabel,
            Description: model.Description,
            DataStoreId: model.DataStoreId,
            IsCollectedBy: ModelUtils.serializeShallowEdge(model.IsCollectedBy(), 'IsCollectedBy'),
            IsTrackedFor: ModelUtils.serializeShallowEdge(model.IsTrackedFor(), 'IsTrackedFor'),
            ContainsCondition: ModelUtils.serializeShallowEdge(model.ContainsCondition(), 'ContainsCondition'),
            Collects: ModelUtils.serializeShallowEdge(model.Collects(), 'Collects'),
            IsSequencedBy: ModelUtils.serializeShallowEdge(model.IsSequencedBy(), 'IsSequencedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Application {
        let clone = new Application();
        clone.data = _.cloneDeep(this.data);
        clone._IsCollectedBy = _.cloneDeep(this._IsCollectedBy);
        clone._IsTrackedFor = _.cloneDeep(this._IsTrackedFor);
        clone._ContainsCondition = _.cloneDeep(this._ContainsCondition);
        clone._Collects = _.cloneDeep(this._Collects);
        clone._IsSequencedBy = _.cloneDeep(this._IsSequencedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IAssetGroup {
    Id: string,
    readonly LockedByChange?: string,
    Name: string,
    Description: string,
    readonly LastUpdatedBy?: string,

    IsTrackedFor?: object[],
    IsUtilizedBy?: object[],
    Contains?: object[]

}

export class AssetGroup extends ProgramRevisioned {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "AssetGroup";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof AssetGroup }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get Name(): string {
        return this.data.Name;
    }
    set Name(value: string) {
        this.data.Name = value;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get LastUpdatedBy(): string {
        return this.data.LastUpdatedBy;
    }

    // Relationships

    // Relationship IsUtilizedBy, returns Program ProgramUtilizesAssetGroup[]
    private __IsUtilizedBy: ProgramUtilizesAssetGroup[];
    IsUtilizedBy(_context?: BaseDataContext): ProgramUtilizesAssetGroup[] {
        if (this.__IsUtilizedBy)
            return this.__IsUtilizedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsUtilizedBy), (id) => context.get(id) as ProgramUtilizesAssetGroup);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsUtilizedBy(values: ProgramUtilizesAssetGroup[]) {
         if (this.Context != null)
             throw Error;

        this.__IsUtilizedBy = values;
     }
    get _IsUtilizedBy(): Set<string> {
        if (!this._relationships.has("IsUtilizedBy"))
            this._relationships.set("IsUtilizedBy", new Set<string>());

        return this._relationships.get("IsUtilizedBy");
    }
    set _IsUtilizedBy(values: Set<string>) {
        this._relationships.set("IsUtilizedBy", values);
    }

    // Relationship Contains, returns Asset AssetGroupContainsAsset[]
    private __Contains: AssetGroupContainsAsset[];
    Contains(_context?: BaseDataContext): AssetGroupContainsAsset[] {
        if (this.__Contains)
            return this.__Contains;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Contains), (id) => context.get(id) as AssetGroupContainsAsset);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setContains(values: AssetGroupContainsAsset[]) {
         if (this.Context != null)
             throw Error;

        this.__Contains = values;
     }
    get _Contains(): Set<string> {
        if (!this._relationships.has("Contains"))
            this._relationships.set("Contains", new Set<string>());

        return this._relationships.get("Contains");
    }
    set _Contains(values: Set<string>) {
        this._relationships.set("Contains", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsTrackedFor',
            edgeType: ProgramRevisionTracksProgramRevisioned,
            otherVertexPropertyName: 'Tracks',
            otherVertexType: ProgramRevision,
        },
        {
            propertyName: 'IsUtilizedBy',
            edgeType: ProgramUtilizesAssetGroup,
            otherVertexPropertyName: 'Utilizes',
            otherVertexType: Program,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Contains',
            edgeType: AssetGroupContainsAsset,
            otherVertexPropertyName: 'IsContainedBy',
            otherVertexType: Asset,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): AssetGroup {
        return ModelUtils.deserializeVertex<AssetGroup>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: AssetGroup) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            LockedByChange: model.LockedByChange,
            Name: model.Name,
            Description: model.Description,
            LastUpdatedBy: model.LastUpdatedBy,
            IsTrackedFor: ModelUtils.serializeShallowEdge(model.IsTrackedFor(), 'IsTrackedFor'),
            IsUtilizedBy: ModelUtils.serializeShallowEdge(model.IsUtilizedBy(), 'IsUtilizedBy'),
            Contains: ModelUtils.serializeShallowEdge(model.Contains(), 'Contains'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): AssetGroup {
        let clone = new AssetGroup();
        clone.data = _.cloneDeep(this.data);
        clone._IsTrackedFor = _.cloneDeep(this._IsTrackedFor);
        clone._IsUtilizedBy = _.cloneDeep(this._IsUtilizedBy);
        clone._Contains = _.cloneDeep(this._Contains);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IContact {
    Id: string,
    DisplayName?: string,
    BadgePath?: string,
    LastLoginDate?: Date,
    readonly Active: boolean,
    Honorific?: string,
    FirstName?: string,
    MiddleName?: string,
    LastName?: string,
    NameSuffix?: string,
    Email: string,
    Title?: string,
    Phone?: string,
    CreatedDate?: Date,
    ActiveSince?: Date,
    InvitedDate?: Date,
    CreatedBy?: string,

    FillsSecurityRole?: object[],
    WorksIn?: object[]

}

export class Contact extends SMIdentity {
    get Domain(): string {
        return "Configuration";
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
    get Honorific(): string {
        return this.data.Honorific;
    }
    set Honorific(value: string) {
        this.data.Honorific = value;
    }
    get FirstName(): string {
        return this.data.FirstName;
    }
    set FirstName(value: string) {
        this.data.FirstName = value;
    }
    get MiddleName(): string {
        return this.data.MiddleName;
    }
    set MiddleName(value: string) {
        this.data.MiddleName = value;
    }
    get LastName(): string {
        return this.data.LastName;
    }
    set LastName(value: string) {
        this.data.LastName = value;
    }
    get NameSuffix(): string {
        return this.data.NameSuffix;
    }
    set NameSuffix(value: string) {
        this.data.NameSuffix = value;
    }
    get Email(): string {
        return this.data.Email;
    }
    set Email(value: string) {
        this.data.Email = value;
    }
    get Title(): string {
        return this.data.Title;
    }
    set Title(value: string) {
        this.data.Title = value;
    }
    get Phone(): string {
        return this.data.Phone;
    }
    set Phone(value: string) {
        this.data.Phone = value;
    }
    get CreatedDate(): Date {
        return this.data.CreatedDate ? new Date(this.data.CreatedDate) : undefined;
    }
    set CreatedDate(value: Date) {
        this.data.CreatedDate = value;
    }
    get ActiveSince(): Date {
        return this.data.ActiveSince ? new Date(this.data.ActiveSince) : undefined;
    }
    set ActiveSince(value: Date) {
        this.data.ActiveSince = value;
    }
    get InvitedDate(): Date {
        return this.data.InvitedDate ? new Date(this.data.InvitedDate) : undefined;
    }
    set InvitedDate(value: Date) {
        this.data.InvitedDate = value;
    }
    get CreatedBy(): string {
        return this.data.CreatedBy;
    }
    set CreatedBy(value: string) {
        this.data.CreatedBy = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'FillsSecurityRole',
            edgeType: SMIdentityFillsSecurityRole,
            otherVertexPropertyName: 'IsFilledBy',
            otherVertexType: SecurityRole,
        },
        {
            propertyName: 'WorksIn',
            edgeType: SMIdentityWorksInArea,
            otherVertexPropertyName: 'IsWorkedBy',
            otherVertexType: Area,
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
            BadgePath: model.BadgePath,
            LastLoginDate: model.LastLoginDate,
            Active: model.Active,
            Honorific: model.Honorific,
            FirstName: model.FirstName,
            MiddleName: model.MiddleName,
            LastName: model.LastName,
            NameSuffix: model.NameSuffix,
            Email: model.Email,
            Title: model.Title,
            Phone: model.Phone,
            CreatedDate: model.CreatedDate,
            ActiveSince: model.ActiveSince,
            InvitedDate: model.InvitedDate,
            CreatedBy: model.CreatedBy,
            FillsSecurityRole: ModelUtils.serializeShallowEdge(model.FillsSecurityRole(), 'FillsSecurityRole'),
            WorksIn: ModelUtils.serializeShallowEdge(model.WorksIn(), 'WorksIn'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Contact {
        let clone = new Contact();
        clone.data = _.cloneDeep(this.data);
        clone._FillsSecurityRole = _.cloneDeep(this._FillsSecurityRole);
        clone._WorksIn = _.cloneDeep(this._WorksIn);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPanel {
    Sequence?: string[],
    Id: string,
    readonly LockedByChange?: string,
    Name?: string,
    Description?: string,
    Scopes?: string[],
    Enabled: boolean,

    IsDisplayedBy?: object[],
    IsTrackedFor?: object[],
    Uses?: object[]

}

export class DataPanel extends ProgramRevisioned {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataPanel";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof DataPanel }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get Sequence(): string[] {
        return this.data.Sequence;
    }
    set Sequence(value: string[]) {
        this.data.Sequence = value;
    }
    get Name(): string {
        return this.data.Name;
    }
    set Name(value: string) {
        this.data.Name = value;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get Scopes(): string[] {
        return this.data.Scopes;
    }
    set Scopes(value: string[]) {
        this.data.Scopes = value;
    }
    get Enabled(): boolean {
        return this.data.Enabled;
    }
    set Enabled(value: boolean) {
        this.data.Enabled = value;
    }

    // Relationships

    // Relationship IsDisplayedBy, returns Program ProgramDisplaysDataPanel[]
    private __IsDisplayedBy: ProgramDisplaysDataPanel[];
    IsDisplayedBy(_context?: BaseDataContext): ProgramDisplaysDataPanel[] {
        if (this.__IsDisplayedBy)
            return this.__IsDisplayedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsDisplayedBy), (id) => context.get(id) as ProgramDisplaysDataPanel);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsDisplayedBy(values: ProgramDisplaysDataPanel[]) {
         if (this.Context != null)
             throw Error;

        this.__IsDisplayedBy = values;
     }
    get _IsDisplayedBy(): Set<string> {
        if (!this._relationships.has("IsDisplayedBy"))
            this._relationships.set("IsDisplayedBy", new Set<string>());

        return this._relationships.get("IsDisplayedBy");
    }
    set _IsDisplayedBy(values: Set<string>) {
        this._relationships.set("IsDisplayedBy", values);
    }

    // Relationship Uses, returns Widget DataPanelUsesWidget[]
    private __Uses: DataPanelUsesWidget[];
    Uses(_context?: BaseDataContext): DataPanelUsesWidget[] {
        if (this.__Uses)
            return this.__Uses;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Uses), (id) => context.get(id) as DataPanelUsesWidget);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setUses(values: DataPanelUsesWidget[]) {
         if (this.Context != null)
             throw Error;

        this.__Uses = values;
     }
    get _Uses(): Set<string> {
        if (!this._relationships.has("Uses"))
            this._relationships.set("Uses", new Set<string>());

        return this._relationships.get("Uses");
    }
    set _Uses(values: Set<string>) {
        this._relationships.set("Uses", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsDisplayedBy',
            edgeType: ProgramDisplaysDataPanel,
            otherVertexPropertyName: 'Displays',
            otherVertexType: Program,
        },
        {
            propertyName: 'IsTrackedFor',
            edgeType: ProgramRevisionTracksProgramRevisioned,
            otherVertexPropertyName: 'Tracks',
            otherVertexType: ProgramRevision,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Uses',
            edgeType: DataPanelUsesWidget,
            otherVertexPropertyName: 'IsUsedBy',
            otherVertexType: Widget,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPanel {
        return ModelUtils.deserializeVertex<DataPanel>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPanel) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Sequence: model.Sequence,
            Id: model.Id,
            LockedByChange: model.LockedByChange,
            Name: model.Name,
            Description: model.Description,
            Scopes: model.Scopes,
            Enabled: model.Enabled,
            IsDisplayedBy: ModelUtils.serializeShallowEdge(model.IsDisplayedBy(), 'IsDisplayedBy'),
            IsTrackedFor: ModelUtils.serializeShallowEdge(model.IsTrackedFor(), 'IsTrackedFor'),
            Uses: ModelUtils.serializeShallowEdge(model.Uses(), 'Uses'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DataPanel {
        let clone = new DataPanel();
        clone.data = _.cloneDeep(this.data);
        clone._IsDisplayedBy = _.cloneDeep(this._IsDisplayedBy);
        clone._IsTrackedFor = _.cloneDeep(this._IsTrackedFor);
        clone._Uses = _.cloneDeep(this._Uses);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPoint {
    DataType: string,
    Id: string,
    Name: string,
    Description?: string,
    readonly Optional: boolean,
    Options?: string[],
    DefaultContent?: any,
    RegExPattern?: string,
    ValidationType: string,
    ValidationScript?: string,
    readonly IsPredefined: boolean,
    Tag?: string,
    IsCalculated: boolean,
    RateAffecting: boolean,
    IsRepeatableKey: boolean,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    PopulatedBy?: string[],
    ResetDataForNewEdition: boolean,
    ScriptFunction?: string,
    InputSources?: any[]

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    ParameterSubstitutedBy?: object[]

}

export class DataPoint extends Mappable {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataPoint";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof DataPoint }[] = [
            {className: 'DataPointDate', type: DataPointDate},
            {className: 'DataPointDecimal', type: DataPointDecimal},
            {className: 'DataPointEmail', type: DataPointEmail},
            {className: 'DataPointString', type: DataPointString},
            {className: 'DataPointInteger', type: DataPointInteger},
            {className: 'DataPointListOfStrings', type: DataPointListOfStrings},
            {className: 'DataPointMoney', type: DataPointMoney},
            {className: 'DataPointPhone', type: DataPointPhone},
            {className: 'DataPointTimestamp', type: DataPointTimestamp},
            {className: 'DataPointUrl', type: DataPointUrl},
            {className: 'DataPointYear', type: DataPointYear},
            {className: 'DataPointYesNo', type: DataPointYesNo},
            {className: 'DataPointZipcode', type: DataPointZipcode},

        ];
        return derivedTypes;
    }

    // Properties
    get Name(): string {
        return this.data.Name;
    }
    set Name(value: string) {
        this.data.Name = value;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get Optional(): boolean {
        return this.data.Optional;
    }
    get Options(): string[] {
        return this.data.Options;
    }
    set Options(value: string[]) {
        this.data.Options = value;
    }
    get DefaultContent(): any {
        return this.data.DefaultContent;
    }
    set DefaultContent(value: any) {
        this.data.DefaultContent = value;
    }
    get RegExPattern(): string {
        return this.data.RegExPattern;
    }
    set RegExPattern(value: string) {
        this.data.RegExPattern = value;
    }
    get ValidationType(): string {
        return this.data.ValidationType;
    }
    set ValidationType(value: string) {
        this.data.ValidationType = value;
    }
    get ValidationScript(): string {
        return this.data.ValidationScript;
    }
    set ValidationScript(value: string) {
        this.data.ValidationScript = value;
    }
    get IsPredefined(): boolean {
        return this.data.IsPredefined;
    }
    get Tag(): string {
        return this.data.Tag;
    }
    set Tag(value: string) {
        this.data.Tag = value;
    }
    get IsCalculated(): boolean {
        return this.data.IsCalculated;
    }
    set IsCalculated(value: boolean) {
        this.data.IsCalculated = value;
    }
    get RateAffecting(): boolean {
        return this.data.RateAffecting;
    }
    set RateAffecting(value: boolean) {
        this.data.RateAffecting = value;
    }
    get IsRepeatableKey(): boolean {
        return this.data.IsRepeatableKey;
    }
    set IsRepeatableKey(value: boolean) {
        this.data.IsRepeatableKey = value;
    }
    get ReferenceObject(): string {
        return this.data.ReferenceObject;
    }
    set ReferenceObject(value: string) {
        this.data.ReferenceObject = value;
    }
    get ReferenceProperty(): string {
        return this.data.ReferenceProperty;
    }
    set ReferenceProperty(value: string) {
        this.data.ReferenceProperty = value;
    }
    get PopulatedBy(): string[] {
        return this.data.PopulatedBy;
    }
    set PopulatedBy(value: string[]) {
        this.data.PopulatedBy = value;
    }
    get ResetDataForNewEdition(): boolean {
        return this.data.ResetDataForNewEdition;
    }
    set ResetDataForNewEdition(value: boolean) {
        this.data.ResetDataForNewEdition = value;
    }
    get ScriptFunction(): string {
        return this.data.ScriptFunction;
    }
    set ScriptFunction(value: string) {
        this.data.ScriptFunction = value;
    }
    get InputSources(): any[] {
        return this.data.InputSources;
    }
    set InputSources(value: any[]) {
        this.data.InputSources = value;
    }

    // Relationships

    // Relationship IsEvaluatedForCondition, returns ElementCondition ElementConditionEvaluatesDataPoint[]
    private __IsEvaluatedForCondition: ElementConditionEvaluatesDataPoint[];
    IsEvaluatedForCondition(_context?: BaseDataContext): ElementConditionEvaluatesDataPoint[] {
        if (this.__IsEvaluatedForCondition)
            return this.__IsEvaluatedForCondition;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsEvaluatedForCondition), (id) => context.get(id) as ElementConditionEvaluatesDataPoint);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsEvaluatedForCondition(values: ElementConditionEvaluatesDataPoint[]) {
         if (this.Context != null)
             throw Error;

        this.__IsEvaluatedForCondition = values;
     }
    get _IsEvaluatedForCondition(): Set<string> {
        if (!this._relationships.has("IsEvaluatedForCondition"))
            this._relationships.set("IsEvaluatedForCondition", new Set<string>());

        return this._relationships.get("IsEvaluatedForCondition");
    }
    set _IsEvaluatedForCondition(values: Set<string>) {
        this._relationships.set("IsEvaluatedForCondition", values);
    }

    // Relationship IsPopulatedBy, returns Field FieldPopulatesDataPoint[]
    private __IsPopulatedBy: FieldPopulatesDataPoint[];
    IsPopulatedBy(_context?: BaseDataContext): FieldPopulatesDataPoint[] {
        if (this.__IsPopulatedBy)
            return this.__IsPopulatedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsPopulatedBy), (id) => context.get(id) as FieldPopulatesDataPoint);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsPopulatedBy(values: FieldPopulatesDataPoint[]) {
         if (this.Context != null)
             throw Error;

        this.__IsPopulatedBy = values;
     }
    get _IsPopulatedBy(): Set<string> {
        if (!this._relationships.has("IsPopulatedBy"))
            this._relationships.set("IsPopulatedBy", new Set<string>());

        return this._relationships.get("IsPopulatedBy");
    }
    set _IsPopulatedBy(values: Set<string>) {
        this._relationships.set("IsPopulatedBy", values);
    }

    // Relationship IsContainedBy, returns DataGroup DataGroupContainsDataPoint[]
    private __IsContainedBy: DataGroupContainsDataPoint[];
    IsContainedBy(_context?: BaseDataContext): DataGroupContainsDataPoint[] {
        if (this.__IsContainedBy)
            return this.__IsContainedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsContainedBy), (id) => context.get(id) as DataGroupContainsDataPoint);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsContainedBy(values: DataGroupContainsDataPoint[]) {
         if (this.Context != null)
             throw Error;

        this.__IsContainedBy = values;
     }
    get _IsContainedBy(): Set<string> {
        if (!this._relationships.has("IsContainedBy"))
            this._relationships.set("IsContainedBy", new Set<string>());

        return this._relationships.get("IsContainedBy");
    }
    set _IsContainedBy(values: Set<string>) {
        this._relationships.set("IsContainedBy", values);
    }

    // Relationship ParameterSubstitutedBy, returns TaskCorrespondence TaskCorrespondenceParameterSubstitutesDataPoint[]
    private __ParameterSubstitutedBy: TaskCorrespondenceParameterSubstitutesDataPoint[];
    ParameterSubstitutedBy(_context?: BaseDataContext): TaskCorrespondenceParameterSubstitutesDataPoint[] {
        if (this.__ParameterSubstitutedBy)
            return this.__ParameterSubstitutedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._ParameterSubstitutedBy), (id) => context.get(id) as TaskCorrespondenceParameterSubstitutesDataPoint);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setParameterSubstitutedBy(values: TaskCorrespondenceParameterSubstitutesDataPoint[]) {
         if (this.Context != null)
             throw Error;

        this.__ParameterSubstitutedBy = values;
     }
    get _ParameterSubstitutedBy(): Set<string> {
        if (!this._relationships.has("ParameterSubstitutedBy"))
            this._relationships.set("ParameterSubstitutedBy", new Set<string>());

        return this._relationships.get("ParameterSubstitutedBy");
    }
    set _ParameterSubstitutedBy(values: Set<string>) {
        this._relationships.set("ParameterSubstitutedBy", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEvaluatedForCondition',
            edgeType: ElementConditionEvaluatesDataPoint,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsPopulatedBy',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'Populates',
            otherVertexType: Field,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: DataGroupContainsDataPoint,
            otherVertexPropertyName: 'Contains',
            otherVertexType: DataGroup,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: TaskCorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: TaskCorrespondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPoint {
        return ModelUtils.deserializeVertex<DataPoint>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPoint) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DataType: model.DataType,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            ValidationScript: model.ValidationScript,
            IsPredefined: model.IsPredefined,
            Tag: model.Tag,
            IsCalculated: model.IsCalculated,
            RateAffecting: model.RateAffecting,
            IsRepeatableKey: model.IsRepeatableKey,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            PopulatedBy: model.PopulatedBy,
            ResetDataForNewEdition: model.ResetDataForNewEdition,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DataPoint {
        let clone = new DataPoint();
        clone.data = _.cloneDeep(this.data);
        clone._IsEvaluatedForCondition = _.cloneDeep(this._IsEvaluatedForCondition);
        clone._IsPopulatedBy = _.cloneDeep(this._IsPopulatedBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataStore {
    Sequence?: string[],
    Id: string,
    readonly LockedByChange?: string,
    Name: string,
    Description?: string,
    readonly NoOfTimesUsed: number,
    Aliases?: string[],

    IsPopulatedBy?: object[],
    IsTrackedFor?: object[],
    IsStoredFor?: object[],
    Contains?: object[],
    IsSequencedBy?: object[]

}

export class DataStore extends ProgramRevisioned {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataStore";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof DataStore }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get Sequence(): string[] {
        return this.data.Sequence;
    }
    set Sequence(value: string[]) {
        this.data.Sequence = value;
    }
    get Name(): string {
        return this.data.Name;
    }
    set Name(value: string) {
        this.data.Name = value;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get NoOfTimesUsed(): number {
        return this.data.NoOfTimesUsed;
    }
    get Aliases(): string[] {
        return this.data.Aliases;
    }
    set Aliases(value: string[]) {
        this.data.Aliases = value;
    }

    // Relationships

    // Relationship IsPopulatedBy, returns Application ApplicationPopulatesDataStore[]
    private __IsPopulatedBy: ApplicationPopulatesDataStore[];
    IsPopulatedBy(_context?: BaseDataContext): ApplicationPopulatesDataStore[] {
        if (this.__IsPopulatedBy)
            return this.__IsPopulatedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsPopulatedBy), (id) => context.get(id) as ApplicationPopulatesDataStore);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsPopulatedBy(values: ApplicationPopulatesDataStore[]) {
         if (this.Context != null)
             throw Error;

        this.__IsPopulatedBy = values;
     }
    get _IsPopulatedBy(): Set<string> {
        if (!this._relationships.has("IsPopulatedBy"))
            this._relationships.set("IsPopulatedBy", new Set<string>());

        return this._relationships.get("IsPopulatedBy");
    }
    set _IsPopulatedBy(values: Set<string>) {
        this._relationships.set("IsPopulatedBy", values);
    }

    // Relationship IsStoredFor, returns Program ProgramStoresDataStore[]
    private __IsStoredFor: ProgramStoresDataStore[];
    IsStoredFor(_context?: BaseDataContext): ProgramStoresDataStore[] {
        if (this.__IsStoredFor)
            return this.__IsStoredFor;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsStoredFor), (id) => context.get(id) as ProgramStoresDataStore);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsStoredFor(values: ProgramStoresDataStore[]) {
         if (this.Context != null)
             throw Error;

        this.__IsStoredFor = values;
     }
    get _IsStoredFor(): Set<string> {
        if (!this._relationships.has("IsStoredFor"))
            this._relationships.set("IsStoredFor", new Set<string>());

        return this._relationships.get("IsStoredFor");
    }
    set _IsStoredFor(values: Set<string>) {
        this._relationships.set("IsStoredFor", values);
    }

    // Relationship Contains, returns DataGroup DataStoreContainsDataGroup[]
    private __Contains: DataStoreContainsDataGroup[];
    Contains(_context?: BaseDataContext): DataStoreContainsDataGroup[] {
        if (this.__Contains)
            return this.__Contains;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Contains), (id) => context.get(id) as DataStoreContainsDataGroup);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setContains(values: DataStoreContainsDataGroup[]) {
         if (this.Context != null)
             throw Error;

        this.__Contains = values;
     }
    get _Contains(): Set<string> {
        if (!this._relationships.has("Contains"))
            this._relationships.set("Contains", new Set<string>());

        return this._relationships.get("Contains");
    }
    set _Contains(values: Set<string>) {
        this._relationships.set("Contains", values);
    }

    // Relationship IsSequencedBy, returns DataStoreSequence DataStoreIsSequencedByDataStoreSequence[]
    private __IsSequencedBy: DataStoreIsSequencedByDataStoreSequence[];
    IsSequencedBy(_context?: BaseDataContext): DataStoreIsSequencedByDataStoreSequence[] {
        if (this.__IsSequencedBy)
            return this.__IsSequencedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsSequencedBy), (id) => context.get(id) as DataStoreIsSequencedByDataStoreSequence);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsSequencedBy(values: DataStoreIsSequencedByDataStoreSequence[]) {
         if (this.Context != null)
             throw Error;

        this.__IsSequencedBy = values;
     }
    get _IsSequencedBy(): Set<string> {
        if (!this._relationships.has("IsSequencedBy"))
            this._relationships.set("IsSequencedBy", new Set<string>());

        return this._relationships.get("IsSequencedBy");
    }
    set _IsSequencedBy(values: Set<string>) {
        this._relationships.set("IsSequencedBy", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsPopulatedBy',
            edgeType: ApplicationPopulatesDataStore,
            otherVertexPropertyName: 'Populates',
            otherVertexType: Application,
        },
        {
            propertyName: 'IsTrackedFor',
            edgeType: ProgramRevisionTracksProgramRevisioned,
            otherVertexPropertyName: 'Tracks',
            otherVertexType: ProgramRevision,
        },
        {
            propertyName: 'IsStoredFor',
            edgeType: ProgramStoresDataStore,
            otherVertexPropertyName: 'Stores',
            otherVertexType: Program,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Contains',
            edgeType: DataStoreContainsDataGroup,
            otherVertexPropertyName: 'IsContainedBy',
            otherVertexType: DataGroup,
        },
        {
            propertyName: 'IsSequencedBy',
            edgeType: DataStoreIsSequencedByDataStoreSequence,
            otherVertexPropertyName: 'Sequences',
            otherVertexType: DataStoreSequence,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataStore {
        return ModelUtils.deserializeVertex<DataStore>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataStore) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Sequence: model.Sequence,
            Id: model.Id,
            LockedByChange: model.LockedByChange,
            Name: model.Name,
            Description: model.Description,
            NoOfTimesUsed: model.NoOfTimesUsed,
            Aliases: model.Aliases,
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsTrackedFor: ModelUtils.serializeShallowEdge(model.IsTrackedFor(), 'IsTrackedFor'),
            IsStoredFor: ModelUtils.serializeShallowEdge(model.IsStoredFor(), 'IsStoredFor'),
            Contains: ModelUtils.serializeShallowEdge(model.Contains(), 'Contains'),
            IsSequencedBy: ModelUtils.serializeShallowEdge(model.IsSequencedBy(), 'IsSequencedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DataStore {
        let clone = new DataStore();
        clone.data = _.cloneDeep(this.data);
        clone._IsPopulatedBy = _.cloneDeep(this._IsPopulatedBy);
        clone._IsTrackedFor = _.cloneDeep(this._IsTrackedFor);
        clone._IsStoredFor = _.cloneDeep(this._IsStoredFor);
        clone._Contains = _.cloneDeep(this._Contains);
        clone._IsSequencedBy = _.cloneDeep(this._IsSequencedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export class DeclineReason extends CustomTableRow {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DeclineReason";
    }

    // Properties
    get Name(): string {
        return this.data.Name;
    }
    set Name(value: string) {
        this.data.Name = value;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }


    deserialize(input: Object, datacontext): DeclineReason {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: DeclineReason) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            CustomTableId: model.CustomTableId,
            IsSystem: model.IsSystem,
            Name: model.Name,
            Description: model.Description,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DeclineReason {
        let clone = new DeclineReason();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IField {
    Id: string,
    DisplayLabel?: string,
    ShowHelp: boolean,
    Help?: string,
    readonly ConditionMet: boolean,
    ExternalId?: string,
    EnableListView: boolean,
    DefaultConditionMet: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    Optional: boolean,
    Options?: any[],
    DefaultContent?: any,
    Access: string,
    PopulatedByDataPointId?: string,
    DisplayWidth?: string,
    RetainDataWhenHidden?: boolean,
    Prefix?: string,
    Suffix?: string,

    IsEnabledBy?: object[],
    IsDisplayedBy?: object[],
    Populates?: object[]

}

export class Field extends Element {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Field";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Field }[] = [
            {className: 'DateField', type: DateField},
            {className: 'DecimalField', type: DecimalField},
            {className: 'EmailField', type: EmailField},
            {className: 'StringField', type: StringField},
            {className: 'IntegerField', type: IntegerField},
            {className: 'ListOfStringsField', type: ListOfStringsField},
            {className: 'MoneyField', type: MoneyField},
            {className: 'PhoneField', type: PhoneField},
            {className: 'TimestampField', type: TimestampField},
            {className: 'UrlField', type: UrlField},
            {className: 'YearField', type: YearField},
            {className: 'YesNoField', type: YesNoField},
            {className: 'ZipcodeField', type: ZipcodeField},

        ];
        return derivedTypes;
    }

    // Properties
    get Optional(): boolean {
        return this.data.Optional;
    }
    set Optional(value: boolean) {
        this.data.Optional = value;
    }
    get Options(): any[] {
        return this.data.Options;
    }
    set Options(value: any[]) {
        this.data.Options = value;
    }
    get DefaultContent(): any {
        return this.data.DefaultContent;
    }
    set DefaultContent(value: any) {
        this.data.DefaultContent = value;
    }
    get Access(): string {
        return this.data.Access;
    }
    set Access(value: string) {
        this.data.Access = value;
    }
    get PopulatedByDataPointId(): string {
        return this.data.PopulatedByDataPointId;
    }
    set PopulatedByDataPointId(value: string) {
        this.data.PopulatedByDataPointId = value;
    }
    get DisplayWidth(): string {
        return this.data.DisplayWidth;
    }
    set DisplayWidth(value: string) {
        this.data.DisplayWidth = value;
    }
    get RetainDataWhenHidden(): boolean {
        return this.data.RetainDataWhenHidden;
    }
    set RetainDataWhenHidden(value: boolean) {
        this.data.RetainDataWhenHidden = value;
    }
    get Prefix(): string {
        return this.data.Prefix;
    }
    set Prefix(value: string) {
        this.data.Prefix = value;
    }
    get Suffix(): string {
        return this.data.Suffix;
    }
    set Suffix(value: string) {
        this.data.Suffix = value;
    }

    // Relationships

    // Relationship Populates, returns DataPoint FieldPopulatesDataPoint[]
    private __Populates: FieldPopulatesDataPoint[];
    Populates(_context?: BaseDataContext): FieldPopulatesDataPoint[] {
        if (this.__Populates)
            return this.__Populates;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Populates), (id) => context.get(id) as FieldPopulatesDataPoint);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setPopulates(values: FieldPopulatesDataPoint[]) {
         if (this.Context != null)
             throw Error;

        this.__Populates = values;
     }
    get _Populates(): Set<string> {
        if (!this._relationships.has("Populates"))
            this._relationships.set("Populates", new Set<string>());

        return this._relationships.get("Populates");
    }
    set _Populates(values: Set<string>) {
        this._relationships.set("Populates", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsDisplayedBy',
            edgeType: SectionDisplaysElement,
            otherVertexPropertyName: 'Displays',
            otherVertexType: Section,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Populates',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'IsPopulatedBy',
            otherVertexType: DataPoint,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Field {
        return ModelUtils.deserializeVertex<Field>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Field) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            EnableListView: model.EnableListView,
            DefaultConditionMet: model.DefaultConditionMet,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            PopulatedByDataPointId: model.PopulatedByDataPointId,
            DisplayWidth: model.DisplayWidth,
            RetainDataWhenHidden: model.RetainDataWhenHidden,
            Prefix: model.Prefix,
            Suffix: model.Suffix,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsDisplayedBy: ModelUtils.serializeShallowEdge(model.IsDisplayedBy(), 'IsDisplayedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Field {
        let clone = new Field();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsDisplayedBy = _.cloneDeep(this._IsDisplayedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IPhase {
    Sequence?: string[],
    Id: string,
    WaitingForIds?: string[],
    OnBeforeCompleteEventActions?: any[],
    Name: string,
    CompleteName: string,
    Description: string,
    readonly Protected: boolean,
    HoldAutoComplete: boolean,
    OnCompleteEventActions?: any[],

    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    IsRequiredFor?: object[],
    IsSequencedBy?: object[],
    Requires?: object[],
    Triggers?: object[],
    Enables?: object[]

}

export class Phase extends Workable {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Phase";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Phase }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get Sequence(): string[] {
        return this.data.Sequence;
    }
    set Sequence(value: string[]) {
        this.data.Sequence = value;
    }
    get Name(): string {
        return this.data.Name;
    }
    set Name(value: string) {
        this.data.Name = value;
    }
    get CompleteName(): string {
        return this.data.CompleteName;
    }
    set CompleteName(value: string) {
        this.data.CompleteName = value;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get Protected(): boolean {
        return this.data.Protected;
    }
    get HoldAutoComplete(): boolean {
        return this.data.HoldAutoComplete;
    }
    set HoldAutoComplete(value: boolean) {
        this.data.HoldAutoComplete = value;
    }
    get OnCompleteEventActions(): any[] {
        return this.data.OnCompleteEventActions;
    }
    set OnCompleteEventActions(value: any[]) {
        this.data.OnCompleteEventActions = value;
    }

    // Relationships

    // Relationship IsRequiredFor, returns Workflow WorkflowRequiresPhase[]
    private __IsRequiredFor: WorkflowRequiresPhase[];
    IsRequiredFor(_context?: BaseDataContext): WorkflowRequiresPhase[] {
        if (this.__IsRequiredFor)
            return this.__IsRequiredFor;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsRequiredFor), (id) => context.get(id) as WorkflowRequiresPhase);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsRequiredFor(values: WorkflowRequiresPhase[]) {
         if (this.Context != null)
             throw Error;

        this.__IsRequiredFor = values;
     }
    get _IsRequiredFor(): Set<string> {
        if (!this._relationships.has("IsRequiredFor"))
            this._relationships.set("IsRequiredFor", new Set<string>());

        return this._relationships.get("IsRequiredFor");
    }
    set _IsRequiredFor(values: Set<string>) {
        this._relationships.set("IsRequiredFor", values);
    }

    // Relationship IsSequencedBy, returns PhaseSequence PhaseIsSequencedByPhaseSequence[]
    private __IsSequencedBy: PhaseIsSequencedByPhaseSequence[];
    IsSequencedBy(_context?: BaseDataContext): PhaseIsSequencedByPhaseSequence[] {
        if (this.__IsSequencedBy)
            return this.__IsSequencedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsSequencedBy), (id) => context.get(id) as PhaseIsSequencedByPhaseSequence);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsSequencedBy(values: PhaseIsSequencedByPhaseSequence[]) {
         if (this.Context != null)
             throw Error;

        this.__IsSequencedBy = values;
     }
    get _IsSequencedBy(): Set<string> {
        if (!this._relationships.has("IsSequencedBy"))
            this._relationships.set("IsSequencedBy", new Set<string>());

        return this._relationships.get("IsSequencedBy");
    }
    set _IsSequencedBy(values: Set<string>) {
        this._relationships.set("IsSequencedBy", values);
    }

    // Relationship Requires, returns Task PhaseRequiresTask[]
    private __Requires: PhaseRequiresTask[];
    Requires(_context?: BaseDataContext): PhaseRequiresTask[] {
        if (this.__Requires)
            return this.__Requires;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Requires), (id) => context.get(id) as PhaseRequiresTask);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setRequires(values: PhaseRequiresTask[]) {
         if (this.Context != null)
             throw Error;

        this.__Requires = values;
     }
    get _Requires(): Set<string> {
        if (!this._relationships.has("Requires"))
            this._relationships.set("Requires", new Set<string>());

        return this._relationships.get("Requires");
    }
    set _Requires(values: Set<string>) {
        this._relationships.set("Requires", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsTriggeredBy',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'Triggers',
            otherVertexType: Workable,
        },
        {
            propertyName: 'WaitsFor',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'Enables',
            otherVertexType: Workable,
        },
        {
            propertyName: 'IsRequiredFor',
            edgeType: WorkflowRequiresPhase,
            otherVertexPropertyName: 'Requires',
            otherVertexType: Workflow,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsSequencedBy',
            edgeType: PhaseIsSequencedByPhaseSequence,
            otherVertexPropertyName: 'Sequences',
            otherVertexType: PhaseSequence,
        },
        {
            propertyName: 'Requires',
            edgeType: PhaseRequiresTask,
            otherVertexPropertyName: 'IsRequiredFor',
            otherVertexType: Task,
        },
        {
            propertyName: 'Triggers',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'IsTriggeredBy',
            otherVertexType: Workable,
        },
        {
            propertyName: 'Enables',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'WaitsFor',
            otherVertexType: Workable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Phase {
        return ModelUtils.deserializeVertex<Phase>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Phase) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Sequence: model.Sequence,
            Id: model.Id,
            WaitingForIds: model.WaitingForIds,
            OnBeforeCompleteEventActions: model.OnBeforeCompleteEventActions,
            Name: model.Name,
            CompleteName: model.CompleteName,
            Description: model.Description,
            Protected: model.Protected,
            HoldAutoComplete: model.HoldAutoComplete,
            OnCompleteEventActions: model.OnCompleteEventActions,
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
            IsSequencedBy: ModelUtils.serializeShallowEdge(model.IsSequencedBy(), 'IsSequencedBy'),
            Requires: ModelUtils.serializeShallowEdge(model.Requires(), 'Requires'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Phase {
        let clone = new Phase();
        clone.data = _.cloneDeep(this.data);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._IsRequiredFor = _.cloneDeep(this._IsRequiredFor);
        clone._IsSequencedBy = _.cloneDeep(this._IsSequencedBy);
        clone._Requires = _.cloneDeep(this._Requires);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IProgram {
    Id: string,
    readonly LockedByChange?: string,
    Name: string,
    Description?: string,
    Aliases?: string[],
    Disabled?: boolean,
    readonly LiveSince?: Date,
    readonly Discontinued?: Date,
    readonly Ended?: Date,
    readonly LastUpdated?: Date,
    readonly PoliciesIssued: number,
    readonly Status: string,
    readonly AllowAllDocumentCategories: boolean,
    readonly ImportStatus?: string,
    readonly TeamLastPublished?: Date,
    readonly TeamHasUnpublishedChanges: boolean,
    VersionSelection: string,
    DefaultFromAddress?: string,
    DefaultWorkflowId?: string,
    DefaultDelinquentWorkflowId?: string,
    ProductsOffered?: any[],
    AccountOwnerRoleId?: string,
    DataPanelAccountOrder?: string[],
    DataPanelWorkflowOrder?: string[],

    IsEditedBy?: object[],
    IsRevisedBy?: object[],
    IsPublishedBy?: object[],
    IsTrackedFor?: object[],
    IsOfferedBy?: object[],
    Allows?: object[],
    Collects?: object[],
    IsConfiguredBy?: object[],
    Defines?: object[],
    Displays?: object[],
    Employs?: object[],
    Evaluates?: object[],
    IsFormattedBy?: object[],
    Obligates?: object[],
    Offers?: object[],
    Stores?: object[],
    Uses?: object[],
    Utilizes?: object[]

}

export class Program extends ProgramRevisioned {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Program";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Program }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get Name(): string {
        return this.data.Name;
    }
    set Name(value: string) {
        this.data.Name = value;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get Aliases(): string[] {
        return this.data.Aliases;
    }
    set Aliases(value: string[]) {
        this.data.Aliases = value;
    }
    get Disabled(): boolean {
        return this.data.Disabled;
    }
    set Disabled(value: boolean) {
        this.data.Disabled = value;
    }
    get LiveSince(): Date {
        return this.data.LiveSince ? new Date(this.data.LiveSince) : undefined;
    }
    get Discontinued(): Date {
        return this.data.Discontinued ? new Date(this.data.Discontinued) : undefined;
    }
    get Ended(): Date {
        return this.data.Ended ? new Date(this.data.Ended) : undefined;
    }
    get LastUpdated(): Date {
        return this.data.LastUpdated ? new Date(this.data.LastUpdated) : undefined;
    }
    get PoliciesIssued(): number {
        return this.data.PoliciesIssued;
    }
    get Status(): string {
        return this.data.Status;
    }
    get AllowAllDocumentCategories(): boolean {
        return this.data.AllowAllDocumentCategories;
    }
    get ImportStatus(): string {
        return this.data.ImportStatus;
    }
    get TeamLastPublished(): Date {
        return this.data.TeamLastPublished ? new Date(this.data.TeamLastPublished) : undefined;
    }
    get TeamHasUnpublishedChanges(): boolean {
        return this.data.TeamHasUnpublishedChanges;
    }
    get VersionSelection(): string {
        return this.data.VersionSelection;
    }
    set VersionSelection(value: string) {
        this.data.VersionSelection = value;
    }
    get DefaultFromAddress(): string {
        return this.data.DefaultFromAddress;
    }
    set DefaultFromAddress(value: string) {
        this.data.DefaultFromAddress = value;
    }
    get DefaultWorkflowId(): string {
        return this.data.DefaultWorkflowId;
    }
    set DefaultWorkflowId(value: string) {
        this.data.DefaultWorkflowId = value;
    }
    get DefaultDelinquentWorkflowId(): string {
        return this.data.DefaultDelinquentWorkflowId;
    }
    set DefaultDelinquentWorkflowId(value: string) {
        this.data.DefaultDelinquentWorkflowId = value;
    }
    get ProductsOffered(): any[] {
        return this.data.ProductsOffered;
    }
    set ProductsOffered(value: any[]) {
        this.data.ProductsOffered = value;
    }
    get AccountOwnerRoleId(): string {
        return this.data.AccountOwnerRoleId;
    }
    set AccountOwnerRoleId(value: string) {
        this.data.AccountOwnerRoleId = value;
    }
    get DataPanelAccountOrder(): string[] {
        return this.data.DataPanelAccountOrder;
    }
    set DataPanelAccountOrder(value: string[]) {
        this.data.DataPanelAccountOrder = value;
    }
    get DataPanelWorkflowOrder(): string[] {
        return this.data.DataPanelWorkflowOrder;
    }
    set DataPanelWorkflowOrder(value: string[]) {
        this.data.DataPanelWorkflowOrder = value;
    }

    // Relationships

    // Relationship IsEditedBy, returns ProgramChange ProgramChangeEditsProgram[]
    private __IsEditedBy: ProgramChangeEditsProgram[];
    IsEditedBy(_context?: BaseDataContext): ProgramChangeEditsProgram[] {
        if (this.__IsEditedBy)
            return this.__IsEditedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsEditedBy), (id) => context.get(id) as ProgramChangeEditsProgram);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsEditedBy(values: ProgramChangeEditsProgram[]) {
         if (this.Context != null)
             throw Error;

        this.__IsEditedBy = values;
     }
    get _IsEditedBy(): Set<string> {
        if (!this._relationships.has("IsEditedBy"))
            this._relationships.set("IsEditedBy", new Set<string>());

        return this._relationships.get("IsEditedBy");
    }
    set _IsEditedBy(values: Set<string>) {
        this._relationships.set("IsEditedBy", values);
    }

    // Relationship IsRevisedBy, returns ProgramPatch ProgramPatchRevisesRevisioned[]
    private __IsRevisedBy: ProgramPatchRevisesRevisioned[];
    IsRevisedBy(_context?: BaseDataContext): ProgramPatchRevisesRevisioned[] {
        if (this.__IsRevisedBy)
            return this.__IsRevisedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsRevisedBy), (id) => context.get(id) as ProgramPatchRevisesRevisioned);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsRevisedBy(values: ProgramPatchRevisesRevisioned[]) {
         if (this.Context != null)
             throw Error;

        this.__IsRevisedBy = values;
     }
    get _IsRevisedBy(): Set<string> {
        if (!this._relationships.has("IsRevisedBy"))
            this._relationships.set("IsRevisedBy", new Set<string>());

        return this._relationships.get("IsRevisedBy");
    }
    set _IsRevisedBy(values: Set<string>) {
        this._relationships.set("IsRevisedBy", values);
    }

    // Relationship IsPublishedBy, returns ProgramRevision ProgramRevisionPublishesProgram[]
    private __IsPublishedBy: ProgramRevisionPublishesProgram[];
    IsPublishedBy(_context?: BaseDataContext): ProgramRevisionPublishesProgram[] {
        if (this.__IsPublishedBy)
            return this.__IsPublishedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsPublishedBy), (id) => context.get(id) as ProgramRevisionPublishesProgram);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsPublishedBy(values: ProgramRevisionPublishesProgram[]) {
         if (this.Context != null)
             throw Error;

        this.__IsPublishedBy = values;
     }
    get _IsPublishedBy(): Set<string> {
        if (!this._relationships.has("IsPublishedBy"))
            this._relationships.set("IsPublishedBy", new Set<string>());

        return this._relationships.get("IsPublishedBy");
    }
    set _IsPublishedBy(values: Set<string>) {
        this._relationships.set("IsPublishedBy", values);
    }

    // Relationship IsOfferedBy, returns Producer ProducerOffersProgram[]
    private __IsOfferedBy: ProducerOffersProgram[];
    IsOfferedBy(_context?: BaseDataContext): ProducerOffersProgram[] {
        if (this.__IsOfferedBy)
            return this.__IsOfferedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsOfferedBy), (id) => context.get(id) as ProducerOffersProgram);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsOfferedBy(values: ProducerOffersProgram[]) {
         if (this.Context != null)
             throw Error;

        this.__IsOfferedBy = values;
     }
    get _IsOfferedBy(): Set<string> {
        if (!this._relationships.has("IsOfferedBy"))
            this._relationships.set("IsOfferedBy", new Set<string>());

        return this._relationships.get("IsOfferedBy");
    }
    set _IsOfferedBy(values: Set<string>) {
        this._relationships.set("IsOfferedBy", values);
    }

    // Relationship Allows, returns DocumentCategory ProgramAllowsDocumentCategory[]
    private __Allows: ProgramAllowsDocumentCategory[];
    Allows(_context?: BaseDataContext): ProgramAllowsDocumentCategory[] {
        if (this.__Allows)
            return this.__Allows;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Allows), (id) => context.get(id) as ProgramAllowsDocumentCategory);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setAllows(values: ProgramAllowsDocumentCategory[]) {
         if (this.Context != null)
             throw Error;

        this.__Allows = values;
     }
    get _Allows(): Set<string> {
        if (!this._relationships.has("Allows"))
            this._relationships.set("Allows", new Set<string>());

        return this._relationships.get("Allows");
    }
    set _Allows(values: Set<string>) {
        this._relationships.set("Allows", values);
    }

    // Relationship Collects, returns Application ProgramCollectsApplication[]
    private __Collects: ProgramCollectsApplication[];
    Collects(_context?: BaseDataContext): ProgramCollectsApplication[] {
        if (this.__Collects)
            return this.__Collects;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Collects), (id) => context.get(id) as ProgramCollectsApplication);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setCollects(values: ProgramCollectsApplication[]) {
         if (this.Context != null)
             throw Error;

        this.__Collects = values;
     }
    get _Collects(): Set<string> {
        if (!this._relationships.has("Collects"))
            this._relationships.set("Collects", new Set<string>());

        return this._relationships.get("Collects");
    }
    set _Collects(values: Set<string>) {
        this._relationships.set("Collects", values);
    }

    // Relationship IsConfiguredBy, returns ProgramOptions ProgramConfiguredByProgramOptions[]
    private __IsConfiguredBy: ProgramConfiguredByProgramOptions[];
    IsConfiguredBy(_context?: BaseDataContext): ProgramConfiguredByProgramOptions[] {
        if (this.__IsConfiguredBy)
            return this.__IsConfiguredBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsConfiguredBy), (id) => context.get(id) as ProgramConfiguredByProgramOptions);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsConfiguredBy(values: ProgramConfiguredByProgramOptions[]) {
         if (this.Context != null)
             throw Error;

        this.__IsConfiguredBy = values;
     }
    get _IsConfiguredBy(): Set<string> {
        if (!this._relationships.has("IsConfiguredBy"))
            this._relationships.set("IsConfiguredBy", new Set<string>());

        return this._relationships.get("IsConfiguredBy");
    }
    set _IsConfiguredBy(values: Set<string>) {
        this._relationships.set("IsConfiguredBy", values);
    }

    // Relationship Defines, returns WorkflowSet ProgramDefinesWorkflowSet[]
    private __Defines: ProgramDefinesWorkflowSet[];
    Defines(_context?: BaseDataContext): ProgramDefinesWorkflowSet[] {
        if (this.__Defines)
            return this.__Defines;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Defines), (id) => context.get(id) as ProgramDefinesWorkflowSet);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setDefines(values: ProgramDefinesWorkflowSet[]) {
         if (this.Context != null)
             throw Error;

        this.__Defines = values;
     }
    get _Defines(): Set<string> {
        if (!this._relationships.has("Defines"))
            this._relationships.set("Defines", new Set<string>());

        return this._relationships.get("Defines");
    }
    set _Defines(values: Set<string>) {
        this._relationships.set("Defines", values);
    }

    // Relationship Displays, returns DataPanel ProgramDisplaysDataPanel[]
    private __Displays: ProgramDisplaysDataPanel[];
    Displays(_context?: BaseDataContext): ProgramDisplaysDataPanel[] {
        if (this.__Displays)
            return this.__Displays;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Displays), (id) => context.get(id) as ProgramDisplaysDataPanel);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setDisplays(values: ProgramDisplaysDataPanel[]) {
         if (this.Context != null)
             throw Error;

        this.__Displays = values;
     }
    get _Displays(): Set<string> {
        if (!this._relationships.has("Displays"))
            this._relationships.set("Displays", new Set<string>());

        return this._relationships.get("Displays");
    }
    set _Displays(values: Set<string>) {
        this._relationships.set("Displays", values);
    }

    // Relationship Employs, returns TenantUser ProgramEmploysTenantUser[]
    private __Employs: ProgramEmploysTenantUser[];
    Employs(_context?: BaseDataContext): ProgramEmploysTenantUser[] {
        if (this.__Employs)
            return this.__Employs;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Employs), (id) => context.get(id) as ProgramEmploysTenantUser);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setEmploys(values: ProgramEmploysTenantUser[]) {
         if (this.Context != null)
             throw Error;

        this.__Employs = values;
     }
    get _Employs(): Set<string> {
        if (!this._relationships.has("Employs"))
            this._relationships.set("Employs", new Set<string>());

        return this._relationships.get("Employs");
    }
    set _Employs(values: Set<string>) {
        this._relationships.set("Employs", values);
    }

    // Relationship Evaluates, returns RuleSet ProgramEvaluatesRuleSet[]
    private __Evaluates: ProgramEvaluatesRuleSet[];
    Evaluates(_context?: BaseDataContext): ProgramEvaluatesRuleSet[] {
        if (this.__Evaluates)
            return this.__Evaluates;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Evaluates), (id) => context.get(id) as ProgramEvaluatesRuleSet);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setEvaluates(values: ProgramEvaluatesRuleSet[]) {
         if (this.Context != null)
             throw Error;

        this.__Evaluates = values;
     }
    get _Evaluates(): Set<string> {
        if (!this._relationships.has("Evaluates"))
            this._relationships.set("Evaluates", new Set<string>());

        return this._relationships.get("Evaluates");
    }
    set _Evaluates(values: Set<string>) {
        this._relationships.set("Evaluates", values);
    }

    // Relationship IsFormattedBy, returns Region ProgramFormattedByRegion[]
    private __IsFormattedBy: ProgramFormattedByRegion[];
    IsFormattedBy(_context?: BaseDataContext): ProgramFormattedByRegion[] {
        if (this.__IsFormattedBy)
            return this.__IsFormattedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsFormattedBy), (id) => context.get(id) as ProgramFormattedByRegion);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsFormattedBy(values: ProgramFormattedByRegion[]) {
         if (this.Context != null)
             throw Error;

        this.__IsFormattedBy = values;
     }
    get _IsFormattedBy(): Set<string> {
        if (!this._relationships.has("IsFormattedBy"))
            this._relationships.set("IsFormattedBy", new Set<string>());

        return this._relationships.get("IsFormattedBy");
    }
    set _IsFormattedBy(values: Set<string>) {
        this._relationships.set("IsFormattedBy", values);
    }

    // Relationship Obligates, returns AccountRole ProgramObligatesAccountRole[]
    private __Obligates: ProgramObligatesAccountRole[];
    Obligates(_context?: BaseDataContext): ProgramObligatesAccountRole[] {
        if (this.__Obligates)
            return this.__Obligates;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Obligates), (id) => context.get(id) as ProgramObligatesAccountRole);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setObligates(values: ProgramObligatesAccountRole[]) {
         if (this.Context != null)
             throw Error;

        this.__Obligates = values;
     }
    get _Obligates(): Set<string> {
        if (!this._relationships.has("Obligates"))
            this._relationships.set("Obligates", new Set<string>());

        return this._relationships.get("Obligates");
    }
    set _Obligates(values: Set<string>) {
        this._relationships.set("Obligates", values);
    }

    // Relationship Offers, returns Product ProgramOffersProduct[]
    private __Offers: ProgramOffersProduct[];
    Offers(_context?: BaseDataContext): ProgramOffersProduct[] {
        if (this.__Offers)
            return this.__Offers;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Offers), (id) => context.get(id) as ProgramOffersProduct);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setOffers(values: ProgramOffersProduct[]) {
         if (this.Context != null)
             throw Error;

        this.__Offers = values;
     }
    get _Offers(): Set<string> {
        if (!this._relationships.has("Offers"))
            this._relationships.set("Offers", new Set<string>());

        return this._relationships.get("Offers");
    }
    set _Offers(values: Set<string>) {
        this._relationships.set("Offers", values);
    }

    // Relationship Stores, returns DataStore ProgramStoresDataStore[]
    private __Stores: ProgramStoresDataStore[];
    Stores(_context?: BaseDataContext): ProgramStoresDataStore[] {
        if (this.__Stores)
            return this.__Stores;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Stores), (id) => context.get(id) as ProgramStoresDataStore);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setStores(values: ProgramStoresDataStore[]) {
         if (this.Context != null)
             throw Error;

        this.__Stores = values;
     }
    get _Stores(): Set<string> {
        if (!this._relationships.has("Stores"))
            this._relationships.set("Stores", new Set<string>());

        return this._relationships.get("Stores");
    }
    set _Stores(values: Set<string>) {
        this._relationships.set("Stores", values);
    }

    // Relationship Uses, returns WorkGroup ProgramUsesWorkGroup[]
    private __Uses: ProgramUsesWorkGroup[];
    Uses(_context?: BaseDataContext): ProgramUsesWorkGroup[] {
        if (this.__Uses)
            return this.__Uses;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Uses), (id) => context.get(id) as ProgramUsesWorkGroup);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setUses(values: ProgramUsesWorkGroup[]) {
         if (this.Context != null)
             throw Error;

        this.__Uses = values;
     }
    get _Uses(): Set<string> {
        if (!this._relationships.has("Uses"))
            this._relationships.set("Uses", new Set<string>());

        return this._relationships.get("Uses");
    }
    set _Uses(values: Set<string>) {
        this._relationships.set("Uses", values);
    }

    // Relationship Utilizes, returns AssetGroup ProgramUtilizesAssetGroup[]
    private __Utilizes: ProgramUtilizesAssetGroup[];
    Utilizes(_context?: BaseDataContext): ProgramUtilizesAssetGroup[] {
        if (this.__Utilizes)
            return this.__Utilizes;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Utilizes), (id) => context.get(id) as ProgramUtilizesAssetGroup);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setUtilizes(values: ProgramUtilizesAssetGroup[]) {
         if (this.Context != null)
             throw Error;

        this.__Utilizes = values;
     }
    get _Utilizes(): Set<string> {
        if (!this._relationships.has("Utilizes"))
            this._relationships.set("Utilizes", new Set<string>());

        return this._relationships.get("Utilizes");
    }
    set _Utilizes(values: Set<string>) {
        this._relationships.set("Utilizes", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEditedBy',
            edgeType: ProgramChangeEditsProgram,
            otherVertexPropertyName: 'Edits',
            otherVertexType: ProgramChange,
        },
        {
            propertyName: 'IsRevisedBy',
            edgeType: ProgramPatchRevisesRevisioned,
            otherVertexPropertyName: 'Revises',
            otherVertexType: ProgramPatch,
        },
        {
            propertyName: 'IsPublishedBy',
            edgeType: ProgramRevisionPublishesProgram,
            otherVertexPropertyName: 'Publishes',
            otherVertexType: ProgramRevision,
        },
        {
            propertyName: 'IsTrackedFor',
            edgeType: ProgramRevisionTracksProgramRevisioned,
            otherVertexPropertyName: 'Tracks',
            otherVertexType: ProgramRevision,
        },
        {
            propertyName: 'IsOfferedBy',
            edgeType: ProducerOffersProgram,
            otherVertexPropertyName: 'Offers',
            otherVertexType: Producer,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Allows',
            edgeType: ProgramAllowsDocumentCategory,
            otherVertexPropertyName: 'IsAllowedBy',
            otherVertexType: DocumentCategory,
        },
        {
            propertyName: 'Collects',
            edgeType: ProgramCollectsApplication,
            otherVertexPropertyName: 'IsCollectedBy',
            otherVertexType: Application,
        },
        {
            propertyName: 'IsConfiguredBy',
            edgeType: ProgramConfiguredByProgramOptions,
            otherVertexPropertyName: 'Configures',
            otherVertexType: ProgramOptions,
        },
        {
            propertyName: 'Defines',
            edgeType: ProgramDefinesWorkflowSet,
            otherVertexPropertyName: 'IsDefinedFor',
            otherVertexType: WorkflowSet,
        },
        {
            propertyName: 'Displays',
            edgeType: ProgramDisplaysDataPanel,
            otherVertexPropertyName: 'IsDisplayedBy',
            otherVertexType: DataPanel,
        },
        {
            propertyName: 'Employs',
            edgeType: ProgramEmploysTenantUser,
            otherVertexPropertyName: 'IsEmployedBy',
            otherVertexType: TenantUser,
        },
        {
            propertyName: 'Evaluates',
            edgeType: ProgramEvaluatesRuleSet,
            otherVertexPropertyName: 'IsEvaluatedBy',
            otherVertexType: RuleSet,
        },
        {
            propertyName: 'IsFormattedBy',
            edgeType: ProgramFormattedByRegion,
            otherVertexPropertyName: 'Formats',
            otherVertexType: Region,
        },
        {
            propertyName: 'Obligates',
            edgeType: ProgramObligatesAccountRole,
            otherVertexPropertyName: 'IsObligatedBy',
            otherVertexType: AccountRole,
        },
        {
            propertyName: 'Offers',
            edgeType: ProgramOffersProduct,
            otherVertexPropertyName: 'IsOfferedBy',
            otherVertexType: Product,
        },
        {
            propertyName: 'Stores',
            edgeType: ProgramStoresDataStore,
            otherVertexPropertyName: 'IsStoredFor',
            otherVertexType: DataStore,
        },
        {
            propertyName: 'Uses',
            edgeType: ProgramUsesWorkGroup,
            otherVertexPropertyName: 'IsUsedBy',
            otherVertexType: WorkGroup,
        },
        {
            propertyName: 'Utilizes',
            edgeType: ProgramUtilizesAssetGroup,
            otherVertexPropertyName: 'IsUtilizedBy',
            otherVertexType: AssetGroup,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Program {
        return ModelUtils.deserializeVertex<Program>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Program) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            LockedByChange: model.LockedByChange,
            Name: model.Name,
            Description: model.Description,
            Aliases: model.Aliases,
            Disabled: model.Disabled,
            LiveSince: model.LiveSince,
            Discontinued: model.Discontinued,
            Ended: model.Ended,
            LastUpdated: model.LastUpdated,
            PoliciesIssued: model.PoliciesIssued,
            Status: model.Status,
            AllowAllDocumentCategories: model.AllowAllDocumentCategories,
            ImportStatus: model.ImportStatus,
            TeamLastPublished: model.TeamLastPublished,
            TeamHasUnpublishedChanges: model.TeamHasUnpublishedChanges,
            VersionSelection: model.VersionSelection,
            DefaultFromAddress: model.DefaultFromAddress,
            DefaultWorkflowId: model.DefaultWorkflowId,
            DefaultDelinquentWorkflowId: model.DefaultDelinquentWorkflowId,
            ProductsOffered: model.ProductsOffered,
            AccountOwnerRoleId: model.AccountOwnerRoleId,
            DataPanelAccountOrder: model.DataPanelAccountOrder,
            DataPanelWorkflowOrder: model.DataPanelWorkflowOrder,
            IsEditedBy: ModelUtils.serializeShallowEdge(model.IsEditedBy(), 'IsEditedBy'),
            IsRevisedBy: ModelUtils.serializeShallowEdge(model.IsRevisedBy(), 'IsRevisedBy'),
            IsPublishedBy: ModelUtils.serializeShallowEdge(model.IsPublishedBy(), 'IsPublishedBy'),
            IsTrackedFor: ModelUtils.serializeShallowEdge(model.IsTrackedFor(), 'IsTrackedFor'),
            IsOfferedBy: ModelUtils.serializeShallowEdge(model.IsOfferedBy(), 'IsOfferedBy'),
            Allows: ModelUtils.serializeShallowEdge(model.Allows(), 'Allows'),
            Collects: ModelUtils.serializeShallowEdge(model.Collects(), 'Collects'),
            IsConfiguredBy: ModelUtils.serializeShallowEdge(model.IsConfiguredBy(), 'IsConfiguredBy'),
            Defines: ModelUtils.serializeShallowEdge(model.Defines(), 'Defines'),
            Displays: ModelUtils.serializeShallowEdge(model.Displays(), 'Displays'),
            Employs: ModelUtils.serializeShallowEdge(model.Employs(), 'Employs'),
            Evaluates: ModelUtils.serializeShallowEdge(model.Evaluates(), 'Evaluates'),
            IsFormattedBy: ModelUtils.serializeShallowEdge(model.IsFormattedBy(), 'IsFormattedBy'),
            Obligates: ModelUtils.serializeShallowEdge(model.Obligates(), 'Obligates'),
            Offers: ModelUtils.serializeShallowEdge(model.Offers(), 'Offers'),
            Stores: ModelUtils.serializeShallowEdge(model.Stores(), 'Stores'),
            Uses: ModelUtils.serializeShallowEdge(model.Uses(), 'Uses'),
            Utilizes: ModelUtils.serializeShallowEdge(model.Utilizes(), 'Utilizes'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Program {
        let clone = new Program();
        clone.data = _.cloneDeep(this.data);
        clone._IsEditedBy = _.cloneDeep(this._IsEditedBy);
        clone._IsRevisedBy = _.cloneDeep(this._IsRevisedBy);
        clone._IsPublishedBy = _.cloneDeep(this._IsPublishedBy);
        clone._IsTrackedFor = _.cloneDeep(this._IsTrackedFor);
        clone._IsOfferedBy = _.cloneDeep(this._IsOfferedBy);
        clone._Allows = _.cloneDeep(this._Allows);
        clone._Collects = _.cloneDeep(this._Collects);
        clone._IsConfiguredBy = _.cloneDeep(this._IsConfiguredBy);
        clone._Defines = _.cloneDeep(this._Defines);
        clone._Displays = _.cloneDeep(this._Displays);
        clone._Employs = _.cloneDeep(this._Employs);
        clone._Evaluates = _.cloneDeep(this._Evaluates);
        clone._IsFormattedBy = _.cloneDeep(this._IsFormattedBy);
        clone._Obligates = _.cloneDeep(this._Obligates);
        clone._Offers = _.cloneDeep(this._Offers);
        clone._Stores = _.cloneDeep(this._Stores);
        clone._Uses = _.cloneDeep(this._Uses);
        clone._Utilizes = _.cloneDeep(this._Utilizes);

        //clone.Context = this.Context;
        return clone;
    }
}

export class ProgramImportValidationMessage extends ProgramValidationMessage {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramImportValidationMessage";
    }

    // Properties
    get ImportedEntityId(): string {
        return this.data.ImportedEntityId;
    }
    set ImportedEntityId(value: string) {
        this.data.ImportedEntityId = value;
    }
    get ImportedEntityType(): string {
        return this.data.ImportedEntityType;
    }
    set ImportedEntityType(value: string) {
        this.data.ImportedEntityType = value;
    }
    get ImportedEntities(): { [index: string]: string } {
        return this.data.ImportedEntities;
    }
    set ImportedEntities(value: { [index: string]: string }) {
        this.data.ImportedEntities = value;
    }


    deserialize(input: Object, datacontext): ProgramImportValidationMessage {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: ProgramImportValidationMessage) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            ImportedEntityId: model.ImportedEntityId,
            ImportedEntityType: model.ImportedEntityType,
            ImportedEntities: model.ImportedEntities,
            Id: model.Id,
            Code: model.Code,
            Level: model.Level,
            Message: model.Message,
            RevisionedId: model.RevisionedId,
            ChangeId: model.ChangeId,
            RevisionId: model.RevisionId,
            ComponentId: model.ComponentId,
            ComponentType: model.ComponentType,
            EntityId: model.EntityId,
            EntityType: model.EntityType,
            Entities: model.Entities,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): ProgramImportValidationMessage {
        let clone = new ProgramImportValidationMessage();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IProgramPatch {
    readonly DeploymentStatus?: string,
    UndeployedDate?: Date,
    UndeployedBy?: string,
    readonly DeletedDate?: Date,
    readonly PatchNo: number,
    Description?: string,
    readonly Status: string,
    readonly Author: string,
    readonly StartDate: Date,
    readonly ChangeId?: string,
    RootItemPatched: string,
    Id: string,

    DeployedTo?: object[],
    Revises?: object[]

}

export class ProgramPatch extends Deployable {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramPatch";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof ProgramPatch }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get DeletedDate(): Date {
        return this.data.DeletedDate ? new Date(this.data.DeletedDate) : undefined;
    }
    get PatchNo(): number {
        return this.data.PatchNo;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get Status(): string {
        return this.data.Status;
    }
    get Author(): string {
        return this.data.Author;
    }
    get StartDate(): Date {
        return this.data.StartDate ? new Date(this.data.StartDate) : undefined;
    }
    get ChangeId(): string {
        return this.data.ChangeId;
    }
    get RootItemPatched(): string {
        return this.data.RootItemPatched;
    }
    set RootItemPatched(value: string) {
        this.data.RootItemPatched = value;
    }

    // Relationships

    // Relationship Revises, returns Program ProgramPatchRevisesRevisioned[]
    private __Revises: ProgramPatchRevisesRevisioned[];
    Revises(_context?: BaseDataContext): ProgramPatchRevisesRevisioned[] {
        if (this.__Revises)
            return this.__Revises;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Revises), (id) => context.get(id) as ProgramPatchRevisesRevisioned);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setRevises(values: ProgramPatchRevisesRevisioned[]) {
         if (this.Context != null)
             throw Error;

        this.__Revises = values;
     }
    get _Revises(): Set<string> {
        if (!this._relationships.has("Revises"))
            this._relationships.set("Revises", new Set<string>());

        return this._relationships.get("Revises");
    }
    set _Revises(values: Set<string>) {
        this._relationships.set("Revises", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'DeployedTo',
            edgeType: AreaDeploysDeployable,
            otherVertexPropertyName: 'Deploys',
            otherVertexType: Area,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Revises',
            edgeType: ProgramPatchRevisesRevisioned,
            otherVertexPropertyName: 'IsRevisedBy',
            otherVertexType: Program,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): ProgramPatch {
        return ModelUtils.deserializeVertex<ProgramPatch>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: ProgramPatch) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DeploymentStatus: model.DeploymentStatus,
            UndeployedDate: model.UndeployedDate,
            UndeployedBy: model.UndeployedBy,
            DeletedDate: model.DeletedDate,
            PatchNo: model.PatchNo,
            Description: model.Description,
            Status: model.Status,
            Author: model.Author,
            StartDate: model.StartDate,
            ChangeId: model.ChangeId,
            RootItemPatched: model.RootItemPatched,
            Id: model.Id,
            DeployedTo: ModelUtils.serializeShallowEdge(model.DeployedTo(), 'DeployedTo'),
            Revises: ModelUtils.serializeShallowEdge(model.Revises(), 'Revises'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): ProgramPatch {
        let clone = new ProgramPatch();
        clone.data = _.cloneDeep(this.data);
        clone._DeployedTo = _.cloneDeep(this._DeployedTo);
        clone._Revises = _.cloneDeep(this._Revises);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IProgramRevision {
    readonly DeploymentStatus?: string,
    UndeployedDate?: Date,
    UndeployedBy?: string,
    readonly RevisionNo: number,
    readonly VersionNo: number,
    Summary: string,
    Description: string,
    readonly ChangeIds?: string[],
    readonly ComponentRevisionNos?: { [index: string]: number },
    readonly ComponentVersionNos?: { [index: string]: number },
    readonly ComponentLabels?: { [index: string]: string },
    readonly ComponentName?: { [index: string]: string },
    readonly ComponentChildToParent?: { [index: string]: string },
    readonly PatchIds?: string[],
    Id: string,
    StartDate: ContractDate,
    StopDate?: ContractDate,
    readonly DeploymentError?: any,

    UtilizesAppStructure?: object[],
    DeployedTo?: object[],
    Configures?: object[],
    Publishes?: object[],
    Tracks?: object[]

}

export class ProgramRevision extends Deployable {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ProgramRevision";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof ProgramRevision }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get RevisionNo(): number {
        return this.data.RevisionNo;
    }
    get VersionNo(): number {
        return this.data.VersionNo;
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
    get ChangeIds(): string[] {
        return this.data.ChangeIds;
    }
    get ComponentRevisionNos(): { [index: string]: number } {
        return this.data.ComponentRevisionNos;
    }
    get ComponentVersionNos(): { [index: string]: number } {
        return this.data.ComponentVersionNos;
    }
    get ComponentLabels(): { [index: string]: string } {
        return this.data.ComponentLabels;
    }
    get ComponentName(): { [index: string]: string } {
        return this.data.ComponentName;
    }
    get ComponentChildToParent(): { [index: string]: string } {
        return this.data.ComponentChildToParent;
    }
    get PatchIds(): string[] {
        return this.data.PatchIds;
    }
    get StartDate(): ContractDate {
        this.data.StartDate = ModelUtils.deserializeContractDate(this.data.StartDate);
        return this.data.StartDate;
    }
    set StartDate(value: ContractDate) {
        this.data.StartDate = value;
    }
    get StopDate(): ContractDate {
        this.data.StopDate = ModelUtils.deserializeContractDate(this.data.StopDate);
        return this.data.StopDate;
    }
    set StopDate(value: ContractDate) {
        this.data.StopDate = value;
    }
    get DeploymentError(): any {
        return this.data.DeploymentError;
    }

    // Relationships

    // Relationship UtilizesAppStructure, returns ApplicationStructure ApplicationStructureBelongsToProgramRevision[]
    private __UtilizesAppStructure: ApplicationStructureBelongsToProgramRevision[];
    UtilizesAppStructure(_context?: BaseDataContext): ApplicationStructureBelongsToProgramRevision[] {
        if (this.__UtilizesAppStructure)
            return this.__UtilizesAppStructure;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._UtilizesAppStructure), (id) => context.get(id) as ApplicationStructureBelongsToProgramRevision);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setUtilizesAppStructure(values: ApplicationStructureBelongsToProgramRevision[]) {
         if (this.Context != null)
             throw Error;

        this.__UtilizesAppStructure = values;
     }
    get _UtilizesAppStructure(): Set<string> {
        if (!this._relationships.has("UtilizesAppStructure"))
            this._relationships.set("UtilizesAppStructure", new Set<string>());

        return this._relationships.get("UtilizesAppStructure");
    }
    set _UtilizesAppStructure(values: Set<string>) {
        this._relationships.set("UtilizesAppStructure", values);
    }

    // Relationship Configures, returns Area ProgramRevisionConfiguresArea[]
    private __Configures: ProgramRevisionConfiguresArea[];
    Configures(_context?: BaseDataContext): ProgramRevisionConfiguresArea[] {
        if (this.__Configures)
            return this.__Configures;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Configures), (id) => context.get(id) as ProgramRevisionConfiguresArea);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setConfigures(values: ProgramRevisionConfiguresArea[]) {
         if (this.Context != null)
             throw Error;

        this.__Configures = values;
     }
    get _Configures(): Set<string> {
        if (!this._relationships.has("Configures"))
            this._relationships.set("Configures", new Set<string>());

        return this._relationships.get("Configures");
    }
    set _Configures(values: Set<string>) {
        this._relationships.set("Configures", values);
    }

    // Relationship Publishes, returns Program ProgramRevisionPublishesProgram[]
    private __Publishes: ProgramRevisionPublishesProgram[];
    Publishes(_context?: BaseDataContext): ProgramRevisionPublishesProgram[] {
        if (this.__Publishes)
            return this.__Publishes;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Publishes), (id) => context.get(id) as ProgramRevisionPublishesProgram);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setPublishes(values: ProgramRevisionPublishesProgram[]) {
         if (this.Context != null)
             throw Error;

        this.__Publishes = values;
     }
    get _Publishes(): Set<string> {
        if (!this._relationships.has("Publishes"))
            this._relationships.set("Publishes", new Set<string>());

        return this._relationships.get("Publishes");
    }
    set _Publishes(values: Set<string>) {
        this._relationships.set("Publishes", values);
    }

    // Relationship Tracks, returns ProgramRevisioned ProgramRevisionTracksProgramRevisioned[]
    private __Tracks: ProgramRevisionTracksProgramRevisioned[];
    Tracks(_context?: BaseDataContext): ProgramRevisionTracksProgramRevisioned[] {
        if (this.__Tracks)
            return this.__Tracks;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Tracks), (id) => context.get(id) as ProgramRevisionTracksProgramRevisioned);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setTracks(values: ProgramRevisionTracksProgramRevisioned[]) {
         if (this.Context != null)
             throw Error;

        this.__Tracks = values;
     }
    get _Tracks(): Set<string> {
        if (!this._relationships.has("Tracks"))
            this._relationships.set("Tracks", new Set<string>());

        return this._relationships.get("Tracks");
    }
    set _Tracks(values: Set<string>) {
        this._relationships.set("Tracks", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'UtilizesAppStructure',
            edgeType: ApplicationStructureBelongsToProgramRevision,
            otherVertexPropertyName: 'BelongsTo',
            otherVertexType: ApplicationStructure,
        },
        {
            propertyName: 'DeployedTo',
            edgeType: AreaDeploysDeployable,
            otherVertexPropertyName: 'Deploys',
            otherVertexType: Area,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Configures',
            edgeType: ProgramRevisionConfiguresArea,
            otherVertexPropertyName: 'IsConfiguredFor',
            otherVertexType: Area,
        },
        {
            propertyName: 'Publishes',
            edgeType: ProgramRevisionPublishesProgram,
            otherVertexPropertyName: 'IsPublishedBy',
            otherVertexType: Program,
        },
        {
            propertyName: 'Tracks',
            edgeType: ProgramRevisionTracksProgramRevisioned,
            otherVertexPropertyName: 'IsTrackedFor',
            otherVertexType: ProgramRevisioned,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): ProgramRevision {
        return ModelUtils.deserializeVertex<ProgramRevision>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: ProgramRevision) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DeploymentStatus: model.DeploymentStatus,
            UndeployedDate: model.UndeployedDate,
            UndeployedBy: model.UndeployedBy,
            RevisionNo: model.RevisionNo,
            VersionNo: model.VersionNo,
            Summary: model.Summary,
            Description: model.Description,
            ChangeIds: model.ChangeIds,
            ComponentRevisionNos: model.ComponentRevisionNos,
            ComponentVersionNos: model.ComponentVersionNos,
            ComponentLabels: model.ComponentLabels,
            ComponentName: model.ComponentName,
            ComponentChildToParent: model.ComponentChildToParent,
            PatchIds: model.PatchIds,
            Id: model.Id,
            StartDate: ModelUtils.serializeContractDate(model.data.StartDate),
            StopDate: ModelUtils.serializeContractDate(model.data.StopDate),
            DeploymentError: model.DeploymentError,
            UtilizesAppStructure: ModelUtils.serializeShallowEdge(model.UtilizesAppStructure(), 'UtilizesAppStructure'),
            DeployedTo: ModelUtils.serializeShallowEdge(model.DeployedTo(), 'DeployedTo'),
            Configures: ModelUtils.serializeShallowEdge(model.Configures(), 'Configures'),
            Publishes: ModelUtils.serializeShallowEdge(model.Publishes(), 'Publishes'),
            Tracks: ModelUtils.serializeShallowEdge(model.Tracks(), 'Tracks'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): ProgramRevision {
        let clone = new ProgramRevision();
        clone.data = _.cloneDeep(this.data);
        clone._UtilizesAppStructure = _.cloneDeep(this._UtilizesAppStructure);
        clone._DeployedTo = _.cloneDeep(this._DeployedTo);
        clone._Configures = _.cloneDeep(this._Configures);
        clone._Publishes = _.cloneDeep(this._Publishes);
        clone._Tracks = _.cloneDeep(this._Tracks);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IRule {
    Id: string,
    DataType: string,
    Name: string,
    Description: string,
    Enabled?: boolean,
    DecisionFunction?: string,
    DecisionMatrixJson?: string,
    InputSources?: any[]

    IsContainedBy?: object[]

}

export class Rule extends Mappable {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Rule";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Rule }[] = [
            {className: 'RuleDateTime', type: RuleDateTime},
            {className: 'RuleProductSelection', type: RuleProductSelection},
            {className: 'RuleRiskAssessment', type: RuleRiskAssessment},
            {className: 'RuleRoleAssignment', type: RuleRoleAssignment},
            {className: 'RuleTaskObligation', type: RuleTaskObligation},
            {className: 'RuleWorkflowSetStatus', type: RuleWorkflowSetStatus},

        ];
        return derivedTypes;
    }

    // Properties
    get Name(): string {
        return this.data.Name;
    }
    set Name(value: string) {
        this.data.Name = value;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get Enabled(): boolean {
        return this.data.Enabled;
    }
    set Enabled(value: boolean) {
        this.data.Enabled = value;
    }
    get DecisionFunction(): string {
        return this.data.DecisionFunction;
    }
    set DecisionFunction(value: string) {
        this.data.DecisionFunction = value;
    }
    get DecisionMatrixJson(): string {
        return this.data.DecisionMatrixJson;
    }
    set DecisionMatrixJson(value: string) {
        this.data.DecisionMatrixJson = value;
    }
    get InputSources(): any[] {
        return this.data.InputSources;
    }
    set InputSources(value: any[]) {
        this.data.InputSources = value;
    }

    // Relationships

    // Relationship IsContainedBy, returns RuleSet RuleSetContainsRule[]
    private __IsContainedBy: RuleSetContainsRule[];
    IsContainedBy(_context?: BaseDataContext): RuleSetContainsRule[] {
        if (this.__IsContainedBy)
            return this.__IsContainedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsContainedBy), (id) => context.get(id) as RuleSetContainsRule);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsContainedBy(values: RuleSetContainsRule[]) {
         if (this.Context != null)
             throw Error;

        this.__IsContainedBy = values;
     }
    get _IsContainedBy(): Set<string> {
        if (!this._relationships.has("IsContainedBy"))
            this._relationships.set("IsContainedBy", new Set<string>());

        return this._relationships.get("IsContainedBy");
    }
    set _IsContainedBy(values: Set<string>) {
        this._relationships.set("IsContainedBy", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsContainedBy',
            edgeType: RuleSetContainsRule,
            otherVertexPropertyName: 'Contains',
            otherVertexType: RuleSet,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Rule {
        return ModelUtils.deserializeVertex<Rule>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Rule) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            Enabled: model.Enabled,
            DecisionFunction: model.DecisionFunction,
            DecisionMatrixJson: model.DecisionMatrixJson,
            InputSources: model.InputSources,
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Rule {
        let clone = new Rule();
        clone.data = _.cloneDeep(this.data);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IRuleSet {
    Id: string,
    readonly LockedByChange?: string,
    Name: string,
    Description: string,

    IsEvaluatedBy?: object[],
    IsTrackedFor?: object[],
    Contains?: object[]

}

export class RuleSet extends ProgramRevisioned {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "RuleSet";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof RuleSet }[] = [
            {className: 'RuleSetAssignment', type: RuleSetAssignment},
            {className: 'RuleSetDateTime', type: RuleSetDateTime},
            {className: 'RuleSetProduct', type: RuleSetProduct},
            {className: 'RuleSetRequirement', type: RuleSetRequirement},
            {className: 'RuleSetRiskAssessment', type: RuleSetRiskAssessment},
            {className: 'RuleSetWorkflowSetStatus', type: RuleSetWorkflowSetStatus},

        ];
        return derivedTypes;
    }

    // Properties
    get Name(): string {
        return this.data.Name;
    }
    set Name(value: string) {
        this.data.Name = value;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }

    // Relationships

    // Relationship IsEvaluatedBy, returns Program ProgramEvaluatesRuleSet[]
    private __IsEvaluatedBy: ProgramEvaluatesRuleSet[];
    IsEvaluatedBy(_context?: BaseDataContext): ProgramEvaluatesRuleSet[] {
        if (this.__IsEvaluatedBy)
            return this.__IsEvaluatedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsEvaluatedBy), (id) => context.get(id) as ProgramEvaluatesRuleSet);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsEvaluatedBy(values: ProgramEvaluatesRuleSet[]) {
         if (this.Context != null)
             throw Error;

        this.__IsEvaluatedBy = values;
     }
    get _IsEvaluatedBy(): Set<string> {
        if (!this._relationships.has("IsEvaluatedBy"))
            this._relationships.set("IsEvaluatedBy", new Set<string>());

        return this._relationships.get("IsEvaluatedBy");
    }
    set _IsEvaluatedBy(values: Set<string>) {
        this._relationships.set("IsEvaluatedBy", values);
    }

    // Relationship Contains, returns Rule RuleSetContainsRule[]
    private __Contains: RuleSetContainsRule[];
    Contains(_context?: BaseDataContext): RuleSetContainsRule[] {
        if (this.__Contains)
            return this.__Contains;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Contains), (id) => context.get(id) as RuleSetContainsRule);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setContains(values: RuleSetContainsRule[]) {
         if (this.Context != null)
             throw Error;

        this.__Contains = values;
     }
    get _Contains(): Set<string> {
        if (!this._relationships.has("Contains"))
            this._relationships.set("Contains", new Set<string>());

        return this._relationships.get("Contains");
    }
    set _Contains(values: Set<string>) {
        this._relationships.set("Contains", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEvaluatedBy',
            edgeType: ProgramEvaluatesRuleSet,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: Program,
        },
        {
            propertyName: 'IsTrackedFor',
            edgeType: ProgramRevisionTracksProgramRevisioned,
            otherVertexPropertyName: 'Tracks',
            otherVertexType: ProgramRevision,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Contains',
            edgeType: RuleSetContainsRule,
            otherVertexPropertyName: 'IsContainedBy',
            otherVertexType: Rule,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): RuleSet {
        return ModelUtils.deserializeVertex<RuleSet>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: RuleSet) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            LockedByChange: model.LockedByChange,
            Name: model.Name,
            Description: model.Description,
            IsEvaluatedBy: ModelUtils.serializeShallowEdge(model.IsEvaluatedBy(), 'IsEvaluatedBy'),
            IsTrackedFor: ModelUtils.serializeShallowEdge(model.IsTrackedFor(), 'IsTrackedFor'),
            Contains: ModelUtils.serializeShallowEdge(model.Contains(), 'Contains'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): RuleSet {
        let clone = new RuleSet();
        clone.data = _.cloneDeep(this.data);
        clone._IsEvaluatedBy = _.cloneDeep(this._IsEvaluatedBy);
        clone._IsTrackedFor = _.cloneDeep(this._IsTrackedFor);
        clone._Contains = _.cloneDeep(this._Contains);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IScriptCondition {
    Id: string,
    Name?: string,
    Description?: string,
    DefaultConditionMet: boolean,
    ScriptFunction: string,

    IsContainedBy?: object[],
    Enables?: object[],
    Evaluates?: object[]

}

export class ScriptCondition extends ElementCondition {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ScriptCondition";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof ScriptCondition }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get ScriptFunction(): string {
        return this.data.ScriptFunction;
    }
    set ScriptFunction(value: string) {
        this.data.ScriptFunction = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsContainedBy',
            edgeType: ApplicationContainsElementCondition,
            otherVertexPropertyName: 'ContainsCondition',
            otherVertexType: Application,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Enables',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'IsEnabledBy',
            otherVertexType: Element,
        },
        {
            propertyName: 'Evaluates',
            edgeType: ElementConditionEvaluatesDataPoint,
            otherVertexPropertyName: 'IsEvaluatedForCondition',
            otherVertexType: DataPoint,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): ScriptCondition {
        return ModelUtils.deserializeVertex<ScriptCondition>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: ScriptCondition) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            DefaultConditionMet: model.DefaultConditionMet,
            ScriptFunction: model.ScriptFunction,
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
            Evaluates: ModelUtils.serializeShallowEdge(model.Evaluates(), 'Evaluates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): ScriptCondition {
        let clone = new ScriptCondition();
        clone.data = _.cloneDeep(this.data);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._Enables = _.cloneDeep(this._Enables);
        clone._Evaluates = _.cloneDeep(this._Evaluates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ISection {
    Sequence?: string[],
    Id: string,
    DisplayLabel?: string,
    ShowHelp: boolean,
    Help?: string,
    readonly ConditionMet: boolean,
    ExternalId?: string,
    EnableListView: boolean,
    DefaultConditionMet: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    Repeatable?: boolean,
    LayoutHint: string,
    DisplayProperties?: string[],
    MinSections?: number,
    MaxSections?: number,
    RepeatsWithDataGroupId?: string,
    Access: string,

    IsEnabledBy?: object[],
    IsCollectedBy?: object[],
    IsDisplayedBy?: object[],
    IsSequencedBy?: object[],
    Displays?: object[],
    RepeatsWith?: object[]

}

export class Section extends Element {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Section";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Section }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get Sequence(): string[] {
        return this.data.Sequence;
    }
    set Sequence(value: string[]) {
        this.data.Sequence = value;
    }
    get Repeatable(): boolean {
        return this.data.Repeatable;
    }
    set Repeatable(value: boolean) {
        this.data.Repeatable = value;
    }
    get LayoutHint(): string {
        return this.data.LayoutHint;
    }
    set LayoutHint(value: string) {
        this.data.LayoutHint = value;
    }
    get DisplayProperties(): string[] {
        return this.data.DisplayProperties;
    }
    set DisplayProperties(value: string[]) {
        this.data.DisplayProperties = value;
    }
    get MinSections(): number {
        return this.data.MinSections;
    }
    set MinSections(value: number) {
        this.data.MinSections = value;
    }
    get MaxSections(): number {
        return this.data.MaxSections;
    }
    set MaxSections(value: number) {
        this.data.MaxSections = value;
    }
    get RepeatsWithDataGroupId(): string {
        return this.data.RepeatsWithDataGroupId;
    }
    set RepeatsWithDataGroupId(value: string) {
        this.data.RepeatsWithDataGroupId = value;
    }
    get Access(): string {
        return this.data.Access;
    }
    set Access(value: string) {
        this.data.Access = value;
    }

    // Relationships

    // Relationship IsCollectedBy, returns Application ApplicationCollectsSection[]
    private __IsCollectedBy: ApplicationCollectsSection[];
    IsCollectedBy(_context?: BaseDataContext): ApplicationCollectsSection[] {
        if (this.__IsCollectedBy)
            return this.__IsCollectedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsCollectedBy), (id) => context.get(id) as ApplicationCollectsSection);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsCollectedBy(values: ApplicationCollectsSection[]) {
         if (this.Context != null)
             throw Error;

        this.__IsCollectedBy = values;
     }
    get _IsCollectedBy(): Set<string> {
        if (!this._relationships.has("IsCollectedBy"))
            this._relationships.set("IsCollectedBy", new Set<string>());

        return this._relationships.get("IsCollectedBy");
    }
    set _IsCollectedBy(values: Set<string>) {
        this._relationships.set("IsCollectedBy", values);
    }

    // Relationship IsSequencedBy, returns SectionSequence SectionIsSequencedBySectionSequence[]
    private __IsSequencedBy: SectionIsSequencedBySectionSequence[];
    IsSequencedBy(_context?: BaseDataContext): SectionIsSequencedBySectionSequence[] {
        if (this.__IsSequencedBy)
            return this.__IsSequencedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsSequencedBy), (id) => context.get(id) as SectionIsSequencedBySectionSequence);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsSequencedBy(values: SectionIsSequencedBySectionSequence[]) {
         if (this.Context != null)
             throw Error;

        this.__IsSequencedBy = values;
     }
    get _IsSequencedBy(): Set<string> {
        if (!this._relationships.has("IsSequencedBy"))
            this._relationships.set("IsSequencedBy", new Set<string>());

        return this._relationships.get("IsSequencedBy");
    }
    set _IsSequencedBy(values: Set<string>) {
        this._relationships.set("IsSequencedBy", values);
    }

    // Relationship Displays, returns Element SectionDisplaysElement[]
    private __Displays: SectionDisplaysElement[];
    Displays(_context?: BaseDataContext): SectionDisplaysElement[] {
        if (this.__Displays)
            return this.__Displays;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Displays), (id) => context.get(id) as SectionDisplaysElement);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setDisplays(values: SectionDisplaysElement[]) {
         if (this.Context != null)
             throw Error;

        this.__Displays = values;
     }
    get _Displays(): Set<string> {
        if (!this._relationships.has("Displays"))
            this._relationships.set("Displays", new Set<string>());

        return this._relationships.get("Displays");
    }
    set _Displays(values: Set<string>) {
        this._relationships.set("Displays", values);
    }

    // Relationship RepeatsWith, returns DataGroup SectionRepeatsWithDataGroup[]
    private __RepeatsWith: SectionRepeatsWithDataGroup[];
    RepeatsWith(_context?: BaseDataContext): SectionRepeatsWithDataGroup[] {
        if (this.__RepeatsWith)
            return this.__RepeatsWith;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._RepeatsWith), (id) => context.get(id) as SectionRepeatsWithDataGroup);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setRepeatsWith(values: SectionRepeatsWithDataGroup[]) {
         if (this.Context != null)
             throw Error;

        this.__RepeatsWith = values;
     }
    get _RepeatsWith(): Set<string> {
        if (!this._relationships.has("RepeatsWith"))
            this._relationships.set("RepeatsWith", new Set<string>());

        return this._relationships.get("RepeatsWith");
    }
    set _RepeatsWith(values: Set<string>) {
        this._relationships.set("RepeatsWith", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsCollectedBy',
            edgeType: ApplicationCollectsSection,
            otherVertexPropertyName: 'Collects',
            otherVertexType: Application,
        },
        {
            propertyName: 'IsDisplayedBy',
            edgeType: SectionDisplaysElement,
            otherVertexPropertyName: 'Displays',
            otherVertexType: Section,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsSequencedBy',
            edgeType: SectionIsSequencedBySectionSequence,
            otherVertexPropertyName: 'Sequences',
            otherVertexType: SectionSequence,
        },
        {
            propertyName: 'Displays',
            edgeType: SectionDisplaysElement,
            otherVertexPropertyName: 'IsDisplayedBy',
            otherVertexType: Element,
        },
        {
            propertyName: 'RepeatsWith',
            edgeType: SectionRepeatsWithDataGroup,
            otherVertexPropertyName: 'RepeatsToSection',
            otherVertexType: DataGroup,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Section {
        return ModelUtils.deserializeVertex<Section>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Section) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Sequence: model.Sequence,
            Id: model.Id,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            EnableListView: model.EnableListView,
            DefaultConditionMet: model.DefaultConditionMet,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            Repeatable: model.Repeatable,
            LayoutHint: model.LayoutHint,
            DisplayProperties: model.DisplayProperties,
            MinSections: model.MinSections,
            MaxSections: model.MaxSections,
            RepeatsWithDataGroupId: model.RepeatsWithDataGroupId,
            Access: model.Access,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsCollectedBy: ModelUtils.serializeShallowEdge(model.IsCollectedBy(), 'IsCollectedBy'),
            IsDisplayedBy: ModelUtils.serializeShallowEdge(model.IsDisplayedBy(), 'IsDisplayedBy'),
            IsSequencedBy: ModelUtils.serializeShallowEdge(model.IsSequencedBy(), 'IsSequencedBy'),
            Displays: ModelUtils.serializeShallowEdge(model.Displays(), 'Displays'),
            RepeatsWith: ModelUtils.serializeShallowEdge(model.RepeatsWith(), 'RepeatsWith'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Section {
        let clone = new Section();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsCollectedBy = _.cloneDeep(this._IsCollectedBy);
        clone._IsDisplayedBy = _.cloneDeep(this._IsDisplayedBy);
        clone._IsSequencedBy = _.cloneDeep(this._IsSequencedBy);
        clone._Displays = _.cloneDeep(this._Displays);
        clone._RepeatsWith = _.cloneDeep(this._RepeatsWith);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IStaticElement {
    Id: string,
    DisplayLabel?: string,
    ShowHelp: boolean,
    Help?: string,
    readonly ConditionMet: boolean,
    ExternalId?: string,
    EnableListView: boolean,
    DefaultConditionMet: boolean,
    ScriptFunction?: string,
    InputSources?: any[]

    IsEnabledBy?: object[],
    IsDisplayedBy?: object[]

}

export class StaticElement extends Element {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "StaticElement";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof StaticElement }[] = [
            {className: 'StaticText', type: StaticText},

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsDisplayedBy',
            edgeType: SectionDisplaysElement,
            otherVertexPropertyName: 'Displays',
            otherVertexType: Section,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): StaticElement {
        return ModelUtils.deserializeVertex<StaticElement>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: StaticElement) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            EnableListView: model.EnableListView,
            DefaultConditionMet: model.DefaultConditionMet,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsDisplayedBy: ModelUtils.serializeShallowEdge(model.IsDisplayedBy(), 'IsDisplayedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): StaticElement {
        let clone = new StaticElement();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsDisplayedBy = _.cloneDeep(this._IsDisplayedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITask {
    Id: string,
    WaitingForIds?: string[],
    OnBeforeCompleteEventActions?: any[],
    Name: string,
    Description: string,
    HowTo?: string,
    ObligationStatus: string,
    AutoComplete: boolean,
    AutoExecute: boolean,
    AutoDefer: boolean,
    DeferAmount?: number,
    DeferAmountUnits?: string,
    DeferBusinessHoursOnly?: boolean,
    DefaultAssignee?: string,
    Waivable: boolean,
    OnCompleteWorkflowSetStatus?: string,
    Webhooks?: string[],
    OnCompleteEventActions?: any[],
    OnUncompleteEventActions?: any[],
    SLATriggeredByWorkableIds?: string[],
    SLACorrelationKey?: string,

    GetsRequirementFrom?: object[],
    IsRequiredFor?: object[],
    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    InitiallyAssignedTo?: object[],
    Enables?: object[]

}

export class Task extends Workable {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Task";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Task }[] = [
            {className: 'TaskApplication', type: TaskApplication},
            {className: 'TaskApproval', type: TaskApproval},
            {className: 'TaskClearance', type: TaskClearance},
            {className: 'TaskCorrespondence', type: TaskCorrespondence},
            {className: 'TaskDocumentGeneration', type: TaskDocumentGeneration},
            {className: 'TaskFileRequirement', type: TaskFileRequirement},
            {className: 'TaskManual', type: TaskManual},
            {className: 'TaskPolicyDates', type: TaskPolicyDates},
            {className: 'TaskProducts', type: TaskProducts},
            {className: 'TaskRatingSystem', type: TaskRatingSystem},

        ];
        return derivedTypes;
    }

    // Properties
    get Name(): string {
        return this.data.Name;
    }
    set Name(value: string) {
        this.data.Name = value;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get HowTo(): string {
        return this.data.HowTo;
    }
    set HowTo(value: string) {
        this.data.HowTo = value;
    }
    get ObligationStatus(): string {
        return this.data.ObligationStatus;
    }
    set ObligationStatus(value: string) {
        this.data.ObligationStatus = value;
    }
    get AutoComplete(): boolean {
        return this.data.AutoComplete;
    }
    set AutoComplete(value: boolean) {
        this.data.AutoComplete = value;
    }
    get AutoExecute(): boolean {
        return this.data.AutoExecute;
    }
    set AutoExecute(value: boolean) {
        this.data.AutoExecute = value;
    }
    get AutoDefer(): boolean {
        return this.data.AutoDefer;
    }
    set AutoDefer(value: boolean) {
        this.data.AutoDefer = value;
    }
    get DeferAmount(): number {
        return this.data.DeferAmount;
    }
    set DeferAmount(value: number) {
        this.data.DeferAmount = value;
    }
    get DeferAmountUnits(): string {
        return this.data.DeferAmountUnits;
    }
    set DeferAmountUnits(value: string) {
        this.data.DeferAmountUnits = value;
    }
    get DeferBusinessHoursOnly(): boolean {
        return this.data.DeferBusinessHoursOnly;
    }
    set DeferBusinessHoursOnly(value: boolean) {
        this.data.DeferBusinessHoursOnly = value;
    }
    get DefaultAssignee(): string {
        return this.data.DefaultAssignee;
    }
    set DefaultAssignee(value: string) {
        this.data.DefaultAssignee = value;
    }
    get Waivable(): boolean {
        return this.data.Waivable;
    }
    set Waivable(value: boolean) {
        this.data.Waivable = value;
    }
    get OnCompleteWorkflowSetStatus(): string {
        return this.data.OnCompleteWorkflowSetStatus;
    }
    set OnCompleteWorkflowSetStatus(value: string) {
        this.data.OnCompleteWorkflowSetStatus = value;
    }
    get Webhooks(): string[] {
        return this.data.Webhooks;
    }
    set Webhooks(value: string[]) {
        this.data.Webhooks = value;
    }
    get OnCompleteEventActions(): any[] {
        return this.data.OnCompleteEventActions;
    }
    set OnCompleteEventActions(value: any[]) {
        this.data.OnCompleteEventActions = value;
    }
    get OnUncompleteEventActions(): any[] {
        return this.data.OnUncompleteEventActions;
    }
    set OnUncompleteEventActions(value: any[]) {
        this.data.OnUncompleteEventActions = value;
    }
    get SLATriggeredByWorkableIds(): string[] {
        return this.data.SLATriggeredByWorkableIds;
    }
    set SLATriggeredByWorkableIds(value: string[]) {
        this.data.SLATriggeredByWorkableIds = value;
    }
    get SLACorrelationKey(): string {
        return this.data.SLACorrelationKey;
    }
    set SLACorrelationKey(value: string) {
        this.data.SLACorrelationKey = value;
    }

    // Relationships

    // Relationship GetsRequirementFrom, returns RuleTaskObligation RuleTaskObligationSetsRequirementForTask[]
    private __GetsRequirementFrom: RuleTaskObligationSetsRequirementForTask[];
    GetsRequirementFrom(_context?: BaseDataContext): RuleTaskObligationSetsRequirementForTask[] {
        if (this.__GetsRequirementFrom)
            return this.__GetsRequirementFrom;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._GetsRequirementFrom), (id) => context.get(id) as RuleTaskObligationSetsRequirementForTask);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setGetsRequirementFrom(values: RuleTaskObligationSetsRequirementForTask[]) {
         if (this.Context != null)
             throw Error;

        this.__GetsRequirementFrom = values;
     }
    get _GetsRequirementFrom(): Set<string> {
        if (!this._relationships.has("GetsRequirementFrom"))
            this._relationships.set("GetsRequirementFrom", new Set<string>());

        return this._relationships.get("GetsRequirementFrom");
    }
    set _GetsRequirementFrom(values: Set<string>) {
        this._relationships.set("GetsRequirementFrom", values);
    }

    // Relationship IsRequiredFor, returns Phase PhaseRequiresTask[]
    private __IsRequiredFor: PhaseRequiresTask[];
    IsRequiredFor(_context?: BaseDataContext): PhaseRequiresTask[] {
        if (this.__IsRequiredFor)
            return this.__IsRequiredFor;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsRequiredFor), (id) => context.get(id) as PhaseRequiresTask);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsRequiredFor(values: PhaseRequiresTask[]) {
         if (this.Context != null)
             throw Error;

        this.__IsRequiredFor = values;
     }
    get _IsRequiredFor(): Set<string> {
        if (!this._relationships.has("IsRequiredFor"))
            this._relationships.set("IsRequiredFor", new Set<string>());

        return this._relationships.get("IsRequiredFor");
    }
    set _IsRequiredFor(values: Set<string>) {
        this._relationships.set("IsRequiredFor", values);
    }

    // Relationship InitiallyAssignedTo, returns Assignable TaskAssignedAssignable[]
    private __InitiallyAssignedTo: TaskAssignedAssignable[];
    InitiallyAssignedTo(_context?: BaseDataContext): TaskAssignedAssignable[] {
        if (this.__InitiallyAssignedTo)
            return this.__InitiallyAssignedTo;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._InitiallyAssignedTo), (id) => context.get(id) as TaskAssignedAssignable);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setInitiallyAssignedTo(values: TaskAssignedAssignable[]) {
         if (this.Context != null)
             throw Error;

        this.__InitiallyAssignedTo = values;
     }
    get _InitiallyAssignedTo(): Set<string> {
        if (!this._relationships.has("InitiallyAssignedTo"))
            this._relationships.set("InitiallyAssignedTo", new Set<string>());

        return this._relationships.get("InitiallyAssignedTo");
    }
    set _InitiallyAssignedTo(values: Set<string>) {
        this._relationships.set("InitiallyAssignedTo", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'GetsRequirementFrom',
            edgeType: RuleTaskObligationSetsRequirementForTask,
            otherVertexPropertyName: 'SetsRequirementFor',
            otherVertexType: RuleTaskObligation,
        },
        {
            propertyName: 'IsRequiredFor',
            edgeType: PhaseRequiresTask,
            otherVertexPropertyName: 'Requires',
            otherVertexType: Phase,
        },
        {
            propertyName: 'IsTriggeredBy',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'Triggers',
            otherVertexType: Workable,
        },
        {
            propertyName: 'WaitsFor',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'Enables',
            otherVertexType: Workable,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Triggers',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'IsTriggeredBy',
            otherVertexType: Workable,
        },
        {
            propertyName: 'InitiallyAssignedTo',
            edgeType: TaskAssignedAssignable,
            otherVertexPropertyName: 'InitialAssigneeFor',
            otherVertexType: Assignable,
        },
        {
            propertyName: 'Enables',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'WaitsFor',
            otherVertexType: Workable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Task {
        return ModelUtils.deserializeVertex<Task>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Task) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            WaitingForIds: model.WaitingForIds,
            OnBeforeCompleteEventActions: model.OnBeforeCompleteEventActions,
            Name: model.Name,
            Description: model.Description,
            HowTo: model.HowTo,
            ObligationStatus: model.ObligationStatus,
            AutoComplete: model.AutoComplete,
            AutoExecute: model.AutoExecute,
            AutoDefer: model.AutoDefer,
            DeferAmount: model.DeferAmount,
            DeferAmountUnits: model.DeferAmountUnits,
            DeferBusinessHoursOnly: model.DeferBusinessHoursOnly,
            DefaultAssignee: model.DefaultAssignee,
            Waivable: model.Waivable,
            OnCompleteWorkflowSetStatus: model.OnCompleteWorkflowSetStatus,
            Webhooks: model.Webhooks,
            OnCompleteEventActions: model.OnCompleteEventActions,
            OnUncompleteEventActions: model.OnUncompleteEventActions,
            SLATriggeredByWorkableIds: model.SLATriggeredByWorkableIds,
            SLACorrelationKey: model.SLACorrelationKey,
            GetsRequirementFrom: ModelUtils.serializeShallowEdge(model.GetsRequirementFrom(), 'GetsRequirementFrom'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            InitiallyAssignedTo: ModelUtils.serializeShallowEdge(model.InitiallyAssignedTo(), 'InitiallyAssignedTo'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Task {
        let clone = new Task();
        clone.data = _.cloneDeep(this.data);
        clone._GetsRequirementFrom = _.cloneDeep(this._GetsRequirementFrom);
        clone._IsRequiredFor = _.cloneDeep(this._IsRequiredFor);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._InitiallyAssignedTo = _.cloneDeep(this._InitiallyAssignedTo);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITenantUser {
    Id: string,
    DisplayName?: string,
    BadgePath?: string,
    LastLoginDate?: Date,
    readonly Active: boolean,
    Honorific?: string,
    FirstName?: string,
    MiddleName?: string,
    LastName?: string,
    NameSuffix?: string,
    Email: string,
    Title?: string,
    Phone?: string,
    CreatedDate?: Date,
    ActiveSince?: Date,
    InvitedDate?: Date,
    CreatedBy?: string,
    Initials: string,

    IsEmployedBy?: object[],
    DevelopsAs?: object[],
    IsContactFor?: object[],
    FillsSecurityRole?: object[],
    WorksIn?: object[],
    IsMemberOf?: object[]

}

export class TenantUser extends SMIdentity {
    get Domain(): string {
        return "Configuration";
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
    get Honorific(): string {
        return this.data.Honorific;
    }
    set Honorific(value: string) {
        this.data.Honorific = value;
    }
    get FirstName(): string {
        return this.data.FirstName;
    }
    set FirstName(value: string) {
        this.data.FirstName = value;
    }
    get MiddleName(): string {
        return this.data.MiddleName;
    }
    set MiddleName(value: string) {
        this.data.MiddleName = value;
    }
    get LastName(): string {
        return this.data.LastName;
    }
    set LastName(value: string) {
        this.data.LastName = value;
    }
    get NameSuffix(): string {
        return this.data.NameSuffix;
    }
    set NameSuffix(value: string) {
        this.data.NameSuffix = value;
    }
    get Email(): string {
        return this.data.Email;
    }
    set Email(value: string) {
        this.data.Email = value;
    }
    get Title(): string {
        return this.data.Title;
    }
    set Title(value: string) {
        this.data.Title = value;
    }
    get Phone(): string {
        return this.data.Phone;
    }
    set Phone(value: string) {
        this.data.Phone = value;
    }
    get CreatedDate(): Date {
        return this.data.CreatedDate ? new Date(this.data.CreatedDate) : undefined;
    }
    set CreatedDate(value: Date) {
        this.data.CreatedDate = value;
    }
    get ActiveSince(): Date {
        return this.data.ActiveSince ? new Date(this.data.ActiveSince) : undefined;
    }
    set ActiveSince(value: Date) {
        this.data.ActiveSince = value;
    }
    get InvitedDate(): Date {
        return this.data.InvitedDate ? new Date(this.data.InvitedDate) : undefined;
    }
    set InvitedDate(value: Date) {
        this.data.InvitedDate = value;
    }
    get CreatedBy(): string {
        return this.data.CreatedBy;
    }
    set CreatedBy(value: string) {
        this.data.CreatedBy = value;
    }
    get Initials(): string {
        return this.data.Initials;
    }
    set Initials(value: string) {
        this.data.Initials = value;
    }

    // Relationships

    // Relationship IsEmployedBy, returns Program ProgramEmploysTenantUser[]
    private __IsEmployedBy: ProgramEmploysTenantUser[];
    IsEmployedBy(_context?: BaseDataContext): ProgramEmploysTenantUser[] {
        if (this.__IsEmployedBy)
            return this.__IsEmployedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsEmployedBy), (id) => context.get(id) as ProgramEmploysTenantUser);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsEmployedBy(values: ProgramEmploysTenantUser[]) {
         if (this.Context != null)
             throw Error;

        this.__IsEmployedBy = values;
     }
    get _IsEmployedBy(): Set<string> {
        if (!this._relationships.has("IsEmployedBy"))
            this._relationships.set("IsEmployedBy", new Set<string>());

        return this._relationships.get("IsEmployedBy");
    }
    set _IsEmployedBy(values: Set<string>) {
        this._relationships.set("IsEmployedBy", values);
    }

    // Relationship DevelopsAs, returns Developer TenantUserDevelopsAsDeveloper[]
    private __DevelopsAs: TenantUserDevelopsAsDeveloper[];
    DevelopsAs(_context?: BaseDataContext): TenantUserDevelopsAsDeveloper[] {
        if (this.__DevelopsAs)
            return this.__DevelopsAs;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._DevelopsAs), (id) => context.get(id) as TenantUserDevelopsAsDeveloper);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setDevelopsAs(values: TenantUserDevelopsAsDeveloper[]) {
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

    // Relationship IsContactFor, returns App AppRepresentedByTenantUser[]
    private __IsContactFor: AppRepresentedByTenantUser[];
    IsContactFor(_context?: BaseDataContext): AppRepresentedByTenantUser[] {
        if (this.__IsContactFor)
            return this.__IsContactFor;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsContactFor), (id) => context.get(id) as AppRepresentedByTenantUser);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsContactFor(values: AppRepresentedByTenantUser[]) {
         if (this.Context != null)
             throw Error;

        this.__IsContactFor = values;
     }
    get _IsContactFor(): Set<string> {
        if (!this._relationships.has("IsContactFor"))
            this._relationships.set("IsContactFor", new Set<string>());

        return this._relationships.get("IsContactFor");
    }
    set _IsContactFor(values: Set<string>) {
        this._relationships.set("IsContactFor", values);
    }

    // Relationship IsMemberOf, returns WorkGroup TenantUserMemberOfWorkGroup[]
    private __IsMemberOf: TenantUserMemberOfWorkGroup[];
    IsMemberOf(_context?: BaseDataContext): TenantUserMemberOfWorkGroup[] {
        if (this.__IsMemberOf)
            return this.__IsMemberOf;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsMemberOf), (id) => context.get(id) as TenantUserMemberOfWorkGroup);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsMemberOf(values: TenantUserMemberOfWorkGroup[]) {
         if (this.Context != null)
             throw Error;

        this.__IsMemberOf = values;
     }
    get _IsMemberOf(): Set<string> {
        if (!this._relationships.has("IsMemberOf"))
            this._relationships.set("IsMemberOf", new Set<string>());

        return this._relationships.get("IsMemberOf");
    }
    set _IsMemberOf(values: Set<string>) {
        this._relationships.set("IsMemberOf", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEmployedBy',
            edgeType: ProgramEmploysTenantUser,
            otherVertexPropertyName: 'Employs',
            otherVertexType: Program,
        },
        {
            propertyName: 'DevelopsAs',
            edgeType: TenantUserDevelopsAsDeveloper,
            otherVertexPropertyName: 'IsPersonaOf',
            otherVertexType: Developer,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsContactFor',
            edgeType: AppRepresentedByTenantUser,
            otherVertexPropertyName: 'IsRepresentedBy',
            otherVertexType: App,
        },
        {
            propertyName: 'FillsSecurityRole',
            edgeType: SMIdentityFillsSecurityRole,
            otherVertexPropertyName: 'IsFilledBy',
            otherVertexType: SecurityRole,
        },
        {
            propertyName: 'WorksIn',
            edgeType: SMIdentityWorksInArea,
            otherVertexPropertyName: 'IsWorkedBy',
            otherVertexType: Area,
        },
        {
            propertyName: 'IsMemberOf',
            edgeType: TenantUserMemberOfWorkGroup,
            otherVertexPropertyName: 'HasMembers',
            otherVertexType: WorkGroup,
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
            BadgePath: model.BadgePath,
            LastLoginDate: model.LastLoginDate,
            Active: model.Active,
            Honorific: model.Honorific,
            FirstName: model.FirstName,
            MiddleName: model.MiddleName,
            LastName: model.LastName,
            NameSuffix: model.NameSuffix,
            Email: model.Email,
            Title: model.Title,
            Phone: model.Phone,
            CreatedDate: model.CreatedDate,
            ActiveSince: model.ActiveSince,
            InvitedDate: model.InvitedDate,
            CreatedBy: model.CreatedBy,
            Initials: model.Initials,
            IsEmployedBy: ModelUtils.serializeShallowEdge(model.IsEmployedBy(), 'IsEmployedBy'),
            DevelopsAs: ModelUtils.serializeShallowEdge(model.DevelopsAs(), 'DevelopsAs'),
            IsContactFor: ModelUtils.serializeShallowEdge(model.IsContactFor(), 'IsContactFor'),
            FillsSecurityRole: ModelUtils.serializeShallowEdge(model.FillsSecurityRole(), 'FillsSecurityRole'),
            WorksIn: ModelUtils.serializeShallowEdge(model.WorksIn(), 'WorksIn'),
            IsMemberOf: ModelUtils.serializeShallowEdge(model.IsMemberOf(), 'IsMemberOf'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TenantUser {
        let clone = new TenantUser();
        clone.data = _.cloneDeep(this.data);
        clone._IsEmployedBy = _.cloneDeep(this._IsEmployedBy);
        clone._DevelopsAs = _.cloneDeep(this._DevelopsAs);
        clone._IsContactFor = _.cloneDeep(this._IsContactFor);
        clone._FillsSecurityRole = _.cloneDeep(this._FillsSecurityRole);
        clone._WorksIn = _.cloneDeep(this._WorksIn);
        clone._IsMemberOf = _.cloneDeep(this._IsMemberOf);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IWorkflow {
    Sequence?: string[],
    Id: string,
    readonly LockedByChange?: string,
    Abbr: string,
    Name: string,
    Description: string,
    WorkflowType?: string,
    readonly CreatedDate: Date,
    readonly CreatedBy: string,
    CanStartStatus?: string[],
    OnStartWorkflowSetStatus?: string,
    OnStopWorkflowSetStatus?: string,
    OnStopWorkflow?: string,
    Transactional: boolean,
    CopyToNewWorkflowSet: boolean,
    PreventResumeWhenStopped?: boolean,
    OnStartEventActions?: any[],
    OnBeforeStopEventActions?: any[],
    OnStopEventActions?: any[],
    OnBeforeCompleteEventActions?: any[],
    OnCompleteEventActions?: any[],
    OnResumeEventActions?: any[],

    IsTrackedFor?: object[],
    IsRegulatedBy?: object[],
    IsContainedBy?: object[],
    IsConfiguredBy?: object[],
    IsSequencedBy?: object[],
    Requires?: object[]

}

export class Workflow extends ProgramRevisioned {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "Workflow";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Workflow }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get Sequence(): string[] {
        return this.data.Sequence;
    }
    set Sequence(value: string[]) {
        this.data.Sequence = value;
    }
    get Abbr(): string {
        return this.data.Abbr;
    }
    set Abbr(value: string) {
        this.data.Abbr = value;
    }
    get Name(): string {
        return this.data.Name;
    }
    set Name(value: string) {
        this.data.Name = value;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get WorkflowType(): string {
        return this.data.WorkflowType;
    }
    set WorkflowType(value: string) {
        this.data.WorkflowType = value;
    }
    get CreatedDate(): Date {
        return this.data.CreatedDate ? new Date(this.data.CreatedDate) : undefined;
    }
    get CreatedBy(): string {
        return this.data.CreatedBy;
    }
    get CanStartStatus(): string[] {
        return this.data.CanStartStatus;
    }
    set CanStartStatus(value: string[]) {
        this.data.CanStartStatus = value;
    }
    get OnStartWorkflowSetStatus(): string {
        return this.data.OnStartWorkflowSetStatus;
    }
    set OnStartWorkflowSetStatus(value: string) {
        this.data.OnStartWorkflowSetStatus = value;
    }
    get OnStopWorkflowSetStatus(): string {
        return this.data.OnStopWorkflowSetStatus;
    }
    set OnStopWorkflowSetStatus(value: string) {
        this.data.OnStopWorkflowSetStatus = value;
    }
    get OnStopWorkflow(): string {
        return this.data.OnStopWorkflow;
    }
    set OnStopWorkflow(value: string) {
        this.data.OnStopWorkflow = value;
    }
    get Transactional(): boolean {
        return this.data.Transactional;
    }
    set Transactional(value: boolean) {
        this.data.Transactional = value;
    }
    get CopyToNewWorkflowSet(): boolean {
        return this.data.CopyToNewWorkflowSet;
    }
    set CopyToNewWorkflowSet(value: boolean) {
        this.data.CopyToNewWorkflowSet = value;
    }
    get PreventResumeWhenStopped(): boolean {
        return this.data.PreventResumeWhenStopped;
    }
    set PreventResumeWhenStopped(value: boolean) {
        this.data.PreventResumeWhenStopped = value;
    }
    get OnStartEventActions(): any[] {
        return this.data.OnStartEventActions;
    }
    set OnStartEventActions(value: any[]) {
        this.data.OnStartEventActions = value;
    }
    get OnBeforeStopEventActions(): any[] {
        return this.data.OnBeforeStopEventActions;
    }
    set OnBeforeStopEventActions(value: any[]) {
        this.data.OnBeforeStopEventActions = value;
    }
    get OnStopEventActions(): any[] {
        return this.data.OnStopEventActions;
    }
    set OnStopEventActions(value: any[]) {
        this.data.OnStopEventActions = value;
    }
    get OnBeforeCompleteEventActions(): any[] {
        return this.data.OnBeforeCompleteEventActions;
    }
    set OnBeforeCompleteEventActions(value: any[]) {
        this.data.OnBeforeCompleteEventActions = value;
    }
    get OnCompleteEventActions(): any[] {
        return this.data.OnCompleteEventActions;
    }
    set OnCompleteEventActions(value: any[]) {
        this.data.OnCompleteEventActions = value;
    }
    get OnResumeEventActions(): any[] {
        return this.data.OnResumeEventActions;
    }
    set OnResumeEventActions(value: any[]) {
        this.data.OnResumeEventActions = value;
    }

    // Relationships

    // Relationship IsRegulatedBy, returns RuleSetRequirement RuleSetRequirementRegulatesWorkflow[]
    private __IsRegulatedBy: RuleSetRequirementRegulatesWorkflow[];
    IsRegulatedBy(_context?: BaseDataContext): RuleSetRequirementRegulatesWorkflow[] {
        if (this.__IsRegulatedBy)
            return this.__IsRegulatedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsRegulatedBy), (id) => context.get(id) as RuleSetRequirementRegulatesWorkflow);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsRegulatedBy(values: RuleSetRequirementRegulatesWorkflow[]) {
         if (this.Context != null)
             throw Error;

        this.__IsRegulatedBy = values;
     }
    get _IsRegulatedBy(): Set<string> {
        if (!this._relationships.has("IsRegulatedBy"))
            this._relationships.set("IsRegulatedBy", new Set<string>());

        return this._relationships.get("IsRegulatedBy");
    }
    set _IsRegulatedBy(values: Set<string>) {
        this._relationships.set("IsRegulatedBy", values);
    }

    // Relationship IsContainedBy, returns WorkflowSet WorkflowSetContainsWorkflow[]
    private __IsContainedBy: WorkflowSetContainsWorkflow[];
    IsContainedBy(_context?: BaseDataContext): WorkflowSetContainsWorkflow[] {
        if (this.__IsContainedBy)
            return this.__IsContainedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsContainedBy), (id) => context.get(id) as WorkflowSetContainsWorkflow);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsContainedBy(values: WorkflowSetContainsWorkflow[]) {
         if (this.Context != null)
             throw Error;

        this.__IsContainedBy = values;
     }
    get _IsContainedBy(): Set<string> {
        if (!this._relationships.has("IsContainedBy"))
            this._relationships.set("IsContainedBy", new Set<string>());

        return this._relationships.get("IsContainedBy");
    }
    set _IsContainedBy(values: Set<string>) {
        this._relationships.set("IsContainedBy", values);
    }

    // Relationship IsConfiguredBy, returns WorkflowOptions WorkflowConfiguredByWorkflowOptions[]
    private __IsConfiguredBy: WorkflowConfiguredByWorkflowOptions[];
    IsConfiguredBy(_context?: BaseDataContext): WorkflowConfiguredByWorkflowOptions[] {
        if (this.__IsConfiguredBy)
            return this.__IsConfiguredBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsConfiguredBy), (id) => context.get(id) as WorkflowConfiguredByWorkflowOptions);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsConfiguredBy(values: WorkflowConfiguredByWorkflowOptions[]) {
         if (this.Context != null)
             throw Error;

        this.__IsConfiguredBy = values;
     }
    get _IsConfiguredBy(): Set<string> {
        if (!this._relationships.has("IsConfiguredBy"))
            this._relationships.set("IsConfiguredBy", new Set<string>());

        return this._relationships.get("IsConfiguredBy");
    }
    set _IsConfiguredBy(values: Set<string>) {
        this._relationships.set("IsConfiguredBy", values);
    }

    // Relationship IsSequencedBy, returns WorkflowSequence WorkflowIsSequencedByWorkflowSequence[]
    private __IsSequencedBy: WorkflowIsSequencedByWorkflowSequence[];
    IsSequencedBy(_context?: BaseDataContext): WorkflowIsSequencedByWorkflowSequence[] {
        if (this.__IsSequencedBy)
            return this.__IsSequencedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsSequencedBy), (id) => context.get(id) as WorkflowIsSequencedByWorkflowSequence);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsSequencedBy(values: WorkflowIsSequencedByWorkflowSequence[]) {
         if (this.Context != null)
             throw Error;

        this.__IsSequencedBy = values;
     }
    get _IsSequencedBy(): Set<string> {
        if (!this._relationships.has("IsSequencedBy"))
            this._relationships.set("IsSequencedBy", new Set<string>());

        return this._relationships.get("IsSequencedBy");
    }
    set _IsSequencedBy(values: Set<string>) {
        this._relationships.set("IsSequencedBy", values);
    }

    // Relationship Requires, returns Phase WorkflowRequiresPhase[]
    private __Requires: WorkflowRequiresPhase[];
    Requires(_context?: BaseDataContext): WorkflowRequiresPhase[] {
        if (this.__Requires)
            return this.__Requires;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Requires), (id) => context.get(id) as WorkflowRequiresPhase);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setRequires(values: WorkflowRequiresPhase[]) {
         if (this.Context != null)
             throw Error;

        this.__Requires = values;
     }
    get _Requires(): Set<string> {
        if (!this._relationships.has("Requires"))
            this._relationships.set("Requires", new Set<string>());

        return this._relationships.get("Requires");
    }
    set _Requires(values: Set<string>) {
        this._relationships.set("Requires", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsTrackedFor',
            edgeType: ProgramRevisionTracksProgramRevisioned,
            otherVertexPropertyName: 'Tracks',
            otherVertexType: ProgramRevision,
        },
        {
            propertyName: 'IsRegulatedBy',
            edgeType: RuleSetRequirementRegulatesWorkflow,
            otherVertexPropertyName: 'Regulates',
            otherVertexType: RuleSetRequirement,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: WorkflowSetContainsWorkflow,
            otherVertexPropertyName: 'Contains',
            otherVertexType: WorkflowSet,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsConfiguredBy',
            edgeType: WorkflowConfiguredByWorkflowOptions,
            otherVertexPropertyName: 'Configures',
            otherVertexType: WorkflowOptions,
        },
        {
            propertyName: 'IsSequencedBy',
            edgeType: WorkflowIsSequencedByWorkflowSequence,
            otherVertexPropertyName: 'Sequences',
            otherVertexType: WorkflowSequence,
        },
        {
            propertyName: 'Requires',
            edgeType: WorkflowRequiresPhase,
            otherVertexPropertyName: 'IsRequiredFor',
            otherVertexType: Phase,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Workflow {
        return ModelUtils.deserializeVertex<Workflow>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Workflow) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Sequence: model.Sequence,
            Id: model.Id,
            LockedByChange: model.LockedByChange,
            Abbr: model.Abbr,
            Name: model.Name,
            Description: model.Description,
            WorkflowType: model.WorkflowType,
            CreatedDate: model.CreatedDate,
            CreatedBy: model.CreatedBy,
            CanStartStatus: model.CanStartStatus,
            OnStartWorkflowSetStatus: model.OnStartWorkflowSetStatus,
            OnStopWorkflowSetStatus: model.OnStopWorkflowSetStatus,
            OnStopWorkflow: model.OnStopWorkflow,
            Transactional: model.Transactional,
            CopyToNewWorkflowSet: model.CopyToNewWorkflowSet,
            PreventResumeWhenStopped: model.PreventResumeWhenStopped,
            OnStartEventActions: model.OnStartEventActions,
            OnBeforeStopEventActions: model.OnBeforeStopEventActions,
            OnStopEventActions: model.OnStopEventActions,
            OnBeforeCompleteEventActions: model.OnBeforeCompleteEventActions,
            OnCompleteEventActions: model.OnCompleteEventActions,
            OnResumeEventActions: model.OnResumeEventActions,
            IsTrackedFor: ModelUtils.serializeShallowEdge(model.IsTrackedFor(), 'IsTrackedFor'),
            IsRegulatedBy: ModelUtils.serializeShallowEdge(model.IsRegulatedBy(), 'IsRegulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsConfiguredBy: ModelUtils.serializeShallowEdge(model.IsConfiguredBy(), 'IsConfiguredBy'),
            IsSequencedBy: ModelUtils.serializeShallowEdge(model.IsSequencedBy(), 'IsSequencedBy'),
            Requires: ModelUtils.serializeShallowEdge(model.Requires(), 'Requires'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Workflow {
        let clone = new Workflow();
        clone.data = _.cloneDeep(this.data);
        clone._IsTrackedFor = _.cloneDeep(this._IsTrackedFor);
        clone._IsRegulatedBy = _.cloneDeep(this._IsRegulatedBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._IsConfiguredBy = _.cloneDeep(this._IsConfiguredBy);
        clone._IsSequencedBy = _.cloneDeep(this._IsSequencedBy);
        clone._Requires = _.cloneDeep(this._Requires);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IWorkflowSet {
    Id: string,
    readonly LockedByChange?: string,
    Name: string,
    Description: string,
    DataStoreDefinitionId: string,
    Transactional: boolean,
    AvailableStatuses: string[],
    DefaultTerm: string,
    RiskScoringEnabled: boolean,
    RiskScoringConfig?: any,

    IsDefinedFor?: object[],
    IsTrackedFor?: object[],
    IsCapturedBy?: object[],
    Contains?: object[]

}

export class WorkflowSet extends ProgramRevisioned {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "WorkflowSet";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof WorkflowSet }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get Name(): string {
        return this.data.Name;
    }
    set Name(value: string) {
        this.data.Name = value;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get DataStoreDefinitionId(): string {
        return this.data.DataStoreDefinitionId;
    }
    set DataStoreDefinitionId(value: string) {
        this.data.DataStoreDefinitionId = value;
    }
    get Transactional(): boolean {
        return this.data.Transactional;
    }
    set Transactional(value: boolean) {
        this.data.Transactional = value;
    }
    get AvailableStatuses(): string[] {
        return this.data.AvailableStatuses;
    }
    set AvailableStatuses(value: string[]) {
        this.data.AvailableStatuses = value;
    }
    get DefaultTerm(): string {
        return this.data.DefaultTerm;
    }
    set DefaultTerm(value: string) {
        this.data.DefaultTerm = value;
    }
    get RiskScoringEnabled(): boolean {
        return this.data.RiskScoringEnabled;
    }
    set RiskScoringEnabled(value: boolean) {
        this.data.RiskScoringEnabled = value;
    }
    get RiskScoringConfig(): any {
        return this.data.RiskScoringConfig;
    }
    set RiskScoringConfig(value: any) {
        this.data.RiskScoringConfig = value;
    }

    // Relationships

    // Relationship IsDefinedFor, returns Program ProgramDefinesWorkflowSet[]
    private __IsDefinedFor: ProgramDefinesWorkflowSet[];
    IsDefinedFor(_context?: BaseDataContext): ProgramDefinesWorkflowSet[] {
        if (this.__IsDefinedFor)
            return this.__IsDefinedFor;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsDefinedFor), (id) => context.get(id) as ProgramDefinesWorkflowSet);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsDefinedFor(values: ProgramDefinesWorkflowSet[]) {
         if (this.Context != null)
             throw Error;

        this.__IsDefinedFor = values;
     }
    get _IsDefinedFor(): Set<string> {
        if (!this._relationships.has("IsDefinedFor"))
            this._relationships.set("IsDefinedFor", new Set<string>());

        return this._relationships.get("IsDefinedFor");
    }
    set _IsDefinedFor(values: Set<string>) {
        this._relationships.set("IsDefinedFor", values);
    }

    // Relationship IsCapturedBy, returns RuleSetWorkflowSetStatus RuleSetWorkflowSetStatusCapturesWorkflowSet[]
    private __IsCapturedBy: RuleSetWorkflowSetStatusCapturesWorkflowSet[];
    IsCapturedBy(_context?: BaseDataContext): RuleSetWorkflowSetStatusCapturesWorkflowSet[] {
        if (this.__IsCapturedBy)
            return this.__IsCapturedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsCapturedBy), (id) => context.get(id) as RuleSetWorkflowSetStatusCapturesWorkflowSet);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsCapturedBy(values: RuleSetWorkflowSetStatusCapturesWorkflowSet[]) {
         if (this.Context != null)
             throw Error;

        this.__IsCapturedBy = values;
     }
    get _IsCapturedBy(): Set<string> {
        if (!this._relationships.has("IsCapturedBy"))
            this._relationships.set("IsCapturedBy", new Set<string>());

        return this._relationships.get("IsCapturedBy");
    }
    set _IsCapturedBy(values: Set<string>) {
        this._relationships.set("IsCapturedBy", values);
    }

    // Relationship Contains, returns Workflow WorkflowSetContainsWorkflow[]
    private __Contains: WorkflowSetContainsWorkflow[];
    Contains(_context?: BaseDataContext): WorkflowSetContainsWorkflow[] {
        if (this.__Contains)
            return this.__Contains;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Contains), (id) => context.get(id) as WorkflowSetContainsWorkflow);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setContains(values: WorkflowSetContainsWorkflow[]) {
         if (this.Context != null)
             throw Error;

        this.__Contains = values;
     }
    get _Contains(): Set<string> {
        if (!this._relationships.has("Contains"))
            this._relationships.set("Contains", new Set<string>());

        return this._relationships.get("Contains");
    }
    set _Contains(values: Set<string>) {
        this._relationships.set("Contains", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsDefinedFor',
            edgeType: ProgramDefinesWorkflowSet,
            otherVertexPropertyName: 'Defines',
            otherVertexType: Program,
        },
        {
            propertyName: 'IsTrackedFor',
            edgeType: ProgramRevisionTracksProgramRevisioned,
            otherVertexPropertyName: 'Tracks',
            otherVertexType: ProgramRevision,
        },
        {
            propertyName: 'IsCapturedBy',
            edgeType: RuleSetWorkflowSetStatusCapturesWorkflowSet,
            otherVertexPropertyName: 'Captures',
            otherVertexType: RuleSetWorkflowSetStatus,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Contains',
            edgeType: WorkflowSetContainsWorkflow,
            otherVertexPropertyName: 'IsContainedBy',
            otherVertexType: Workflow,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): WorkflowSet {
        return ModelUtils.deserializeVertex<WorkflowSet>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: WorkflowSet) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            LockedByChange: model.LockedByChange,
            Name: model.Name,
            Description: model.Description,
            DataStoreDefinitionId: model.DataStoreDefinitionId,
            Transactional: model.Transactional,
            AvailableStatuses: model.AvailableStatuses,
            DefaultTerm: model.DefaultTerm,
            RiskScoringEnabled: model.RiskScoringEnabled,
            RiskScoringConfig: model.RiskScoringConfig,
            IsDefinedFor: ModelUtils.serializeShallowEdge(model.IsDefinedFor(), 'IsDefinedFor'),
            IsTrackedFor: ModelUtils.serializeShallowEdge(model.IsTrackedFor(), 'IsTrackedFor'),
            IsCapturedBy: ModelUtils.serializeShallowEdge(model.IsCapturedBy(), 'IsCapturedBy'),
            Contains: ModelUtils.serializeShallowEdge(model.Contains(), 'Contains'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): WorkflowSet {
        let clone = new WorkflowSet();
        clone.data = _.cloneDeep(this.data);
        clone._IsDefinedFor = _.cloneDeep(this._IsDefinedFor);
        clone._IsTrackedFor = _.cloneDeep(this._IsTrackedFor);
        clone._IsCapturedBy = _.cloneDeep(this._IsCapturedBy);
        clone._Contains = _.cloneDeep(this._Contains);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IWorkGroup {
    Id: string,
    Initials: string,
    DisplayName: string,
    BadgePath?: string,
    TasksAssigned: number,
    readonly DateCreated?: Date,
    Description: string,
    ReservationTimeLimit?: number,
    Prioritization?: string

    IsUsedBy?: object[],
    InitialAssigneeFor?: object[],
    HasMembers?: object[]

}

export class WorkGroup extends Assignable {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "WorkGroup";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof WorkGroup }[] = [

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
    get ReservationTimeLimit(): number {
        return this.data.ReservationTimeLimit;
    }
    set ReservationTimeLimit(value: number) {
        this.data.ReservationTimeLimit = value;
    }
    get Prioritization(): string {
        return this.data.Prioritization;
    }
    set Prioritization(value: string) {
        this.data.Prioritization = value;
    }

    // Relationships

    // Relationship IsUsedBy, returns Program ProgramUsesWorkGroup[]
    private __IsUsedBy: ProgramUsesWorkGroup[];
    IsUsedBy(_context?: BaseDataContext): ProgramUsesWorkGroup[] {
        if (this.__IsUsedBy)
            return this.__IsUsedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsUsedBy), (id) => context.get(id) as ProgramUsesWorkGroup);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsUsedBy(values: ProgramUsesWorkGroup[]) {
         if (this.Context != null)
             throw Error;

        this.__IsUsedBy = values;
     }
    get _IsUsedBy(): Set<string> {
        if (!this._relationships.has("IsUsedBy"))
            this._relationships.set("IsUsedBy", new Set<string>());

        return this._relationships.get("IsUsedBy");
    }
    set _IsUsedBy(values: Set<string>) {
        this._relationships.set("IsUsedBy", values);
    }

    // Relationship HasMembers, returns TenantUser TenantUserMemberOfWorkGroup[]
    private __HasMembers: TenantUserMemberOfWorkGroup[];
    HasMembers(_context?: BaseDataContext): TenantUserMemberOfWorkGroup[] {
        if (this.__HasMembers)
            return this.__HasMembers;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._HasMembers), (id) => context.get(id) as TenantUserMemberOfWorkGroup);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setHasMembers(values: TenantUserMemberOfWorkGroup[]) {
         if (this.Context != null)
             throw Error;

        this.__HasMembers = values;
     }
    get _HasMembers(): Set<string> {
        if (!this._relationships.has("HasMembers"))
            this._relationships.set("HasMembers", new Set<string>());

        return this._relationships.get("HasMembers");
    }
    set _HasMembers(values: Set<string>) {
        this._relationships.set("HasMembers", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsUsedBy',
            edgeType: ProgramUsesWorkGroup,
            otherVertexPropertyName: 'Uses',
            otherVertexType: Program,
        },
        {
            propertyName: 'InitialAssigneeFor',
            edgeType: TaskAssignedAssignable,
            otherVertexPropertyName: 'InitiallyAssignedTo',
            otherVertexType: Task,
        },
        {
            propertyName: 'HasMembers',
            edgeType: TenantUserMemberOfWorkGroup,
            otherVertexPropertyName: 'IsMemberOf',
            otherVertexType: TenantUser,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): WorkGroup {
        return ModelUtils.deserializeVertex<WorkGroup>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: WorkGroup) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            Initials: model.Initials,
            DisplayName: model.DisplayName,
            BadgePath: model.BadgePath,
            TasksAssigned: model.TasksAssigned,
            DateCreated: model.DateCreated,
            Description: model.Description,
            ReservationTimeLimit: model.ReservationTimeLimit,
            Prioritization: model.Prioritization,
            IsUsedBy: ModelUtils.serializeShallowEdge(model.IsUsedBy(), 'IsUsedBy'),
            InitialAssigneeFor: ModelUtils.serializeShallowEdge(model.InitialAssigneeFor(), 'InitialAssigneeFor'),
            HasMembers: ModelUtils.serializeShallowEdge(model.HasMembers(), 'HasMembers'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): WorkGroup {
        let clone = new WorkGroup();
        clone.data = _.cloneDeep(this.data);
        clone._IsUsedBy = _.cloneDeep(this._IsUsedBy);
        clone._InitialAssigneeFor = _.cloneDeep(this._InitialAssigneeFor);
        clone._HasMembers = _.cloneDeep(this._HasMembers);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointDate {
    DataType: string,
    Id: string,
    Name: string,
    Description?: string,
    readonly Optional: boolean,
    Options?: string[],
    DefaultContent?: any,
    RegExPattern?: string,
    ValidationType: string,
    ValidationScript?: string,
    readonly IsPredefined: boolean,
    Tag?: string,
    IsCalculated: boolean,
    RateAffecting: boolean,
    IsRepeatableKey: boolean,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    PopulatedBy?: string[],
    ResetDataForNewEdition: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    MinDate?: ContractDate,
    MaxDate?: ContractDate

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    ParameterSubstitutedBy?: object[]

}

export class DataPointDate extends DataPoint {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataPointDate";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof DataPointDate }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get MinDate(): ContractDate {
        this.data.MinDate = ModelUtils.deserializeContractDate(this.data.MinDate);
        return this.data.MinDate;
    }
    set MinDate(value: ContractDate) {
        this.data.MinDate = value;
    }
    get MaxDate(): ContractDate {
        this.data.MaxDate = ModelUtils.deserializeContractDate(this.data.MaxDate);
        return this.data.MaxDate;
    }
    set MaxDate(value: ContractDate) {
        this.data.MaxDate = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEvaluatedForCondition',
            edgeType: ElementConditionEvaluatesDataPoint,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsPopulatedBy',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'Populates',
            otherVertexType: Field,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: DataGroupContainsDataPoint,
            otherVertexPropertyName: 'Contains',
            otherVertexType: DataGroup,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: TaskCorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: TaskCorrespondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointDate {
        return ModelUtils.deserializeVertex<DataPointDate>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointDate) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DataType: model.DataType,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            ValidationScript: model.ValidationScript,
            IsPredefined: model.IsPredefined,
            Tag: model.Tag,
            IsCalculated: model.IsCalculated,
            RateAffecting: model.RateAffecting,
            IsRepeatableKey: model.IsRepeatableKey,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            PopulatedBy: model.PopulatedBy,
            ResetDataForNewEdition: model.ResetDataForNewEdition,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            MinDate: ModelUtils.serializeContractDate(model.data.MinDate),
            MaxDate: ModelUtils.serializeContractDate(model.data.MaxDate),
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DataPointDate {
        let clone = new DataPointDate();
        clone.data = _.cloneDeep(this.data);
        clone._IsEvaluatedForCondition = _.cloneDeep(this._IsEvaluatedForCondition);
        clone._IsPopulatedBy = _.cloneDeep(this._IsPopulatedBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointDecimal {
    DataType: string,
    Id: string,
    Name: string,
    Description?: string,
    readonly Optional: boolean,
    Options?: string[],
    DefaultContent?: any,
    RegExPattern?: string,
    ValidationType: string,
    ValidationScript?: string,
    readonly IsPredefined: boolean,
    Tag?: string,
    IsCalculated: boolean,
    RateAffecting: boolean,
    IsRepeatableKey: boolean,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    PopulatedBy?: string[],
    ResetDataForNewEdition: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    MinValue?: number,
    MaxValue?: number,
    Places?: number

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    ParameterSubstitutedBy?: object[]

}

export class DataPointDecimal extends DataPoint {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataPointDecimal";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof DataPointDecimal }[] = [
            {className: 'DataPointMoney', type: DataPointMoney},

        ];
        return derivedTypes;
    }

    // Properties
    get MinValue(): number {
        return this.data.MinValue;
    }
    set MinValue(value: number) {
        this.data.MinValue = value;
    }
    get MaxValue(): number {
        return this.data.MaxValue;
    }
    set MaxValue(value: number) {
        this.data.MaxValue = value;
    }
    get Places(): number {
        return this.data.Places;
    }
    set Places(value: number) {
        this.data.Places = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEvaluatedForCondition',
            edgeType: ElementConditionEvaluatesDataPoint,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsPopulatedBy',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'Populates',
            otherVertexType: Field,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: DataGroupContainsDataPoint,
            otherVertexPropertyName: 'Contains',
            otherVertexType: DataGroup,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: TaskCorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: TaskCorrespondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointDecimal {
        return ModelUtils.deserializeVertex<DataPointDecimal>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointDecimal) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DataType: model.DataType,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            ValidationScript: model.ValidationScript,
            IsPredefined: model.IsPredefined,
            Tag: model.Tag,
            IsCalculated: model.IsCalculated,
            RateAffecting: model.RateAffecting,
            IsRepeatableKey: model.IsRepeatableKey,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            PopulatedBy: model.PopulatedBy,
            ResetDataForNewEdition: model.ResetDataForNewEdition,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            MinValue: model.MinValue,
            MaxValue: model.MaxValue,
            Places: model.Places,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DataPointDecimal {
        let clone = new DataPointDecimal();
        clone.data = _.cloneDeep(this.data);
        clone._IsEvaluatedForCondition = _.cloneDeep(this._IsEvaluatedForCondition);
        clone._IsPopulatedBy = _.cloneDeep(this._IsPopulatedBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointInteger {
    DataType: string,
    Id: string,
    Name: string,
    Description?: string,
    readonly Optional: boolean,
    Options?: string[],
    DefaultContent?: any,
    RegExPattern?: string,
    ValidationType: string,
    ValidationScript?: string,
    readonly IsPredefined: boolean,
    Tag?: string,
    IsCalculated: boolean,
    RateAffecting: boolean,
    IsRepeatableKey: boolean,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    PopulatedBy?: string[],
    ResetDataForNewEdition: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    MinValue?: number,
    MaxValue?: number,
    ValuesRequiringExplanation?: number[]

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    ParameterSubstitutedBy?: object[]

}

export class DataPointInteger extends DataPoint {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataPointInteger";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof DataPointInteger }[] = [
            {className: 'DataPointYear', type: DataPointYear},

        ];
        return derivedTypes;
    }

    // Properties
    get MinValue(): number {
        return this.data.MinValue;
    }
    set MinValue(value: number) {
        this.data.MinValue = value;
    }
    get MaxValue(): number {
        return this.data.MaxValue;
    }
    set MaxValue(value: number) {
        this.data.MaxValue = value;
    }
    get ValuesRequiringExplanation(): number[] {
        return this.data.ValuesRequiringExplanation;
    }
    set ValuesRequiringExplanation(value: number[]) {
        this.data.ValuesRequiringExplanation = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEvaluatedForCondition',
            edgeType: ElementConditionEvaluatesDataPoint,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsPopulatedBy',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'Populates',
            otherVertexType: Field,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: DataGroupContainsDataPoint,
            otherVertexPropertyName: 'Contains',
            otherVertexType: DataGroup,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: TaskCorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: TaskCorrespondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointInteger {
        return ModelUtils.deserializeVertex<DataPointInteger>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointInteger) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DataType: model.DataType,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            ValidationScript: model.ValidationScript,
            IsPredefined: model.IsPredefined,
            Tag: model.Tag,
            IsCalculated: model.IsCalculated,
            RateAffecting: model.RateAffecting,
            IsRepeatableKey: model.IsRepeatableKey,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            PopulatedBy: model.PopulatedBy,
            ResetDataForNewEdition: model.ResetDataForNewEdition,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            MinValue: model.MinValue,
            MaxValue: model.MaxValue,
            ValuesRequiringExplanation: model.ValuesRequiringExplanation,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DataPointInteger {
        let clone = new DataPointInteger();
        clone.data = _.cloneDeep(this.data);
        clone._IsEvaluatedForCondition = _.cloneDeep(this._IsEvaluatedForCondition);
        clone._IsPopulatedBy = _.cloneDeep(this._IsPopulatedBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointListOfStrings {
    DataType: string,
    Id: string,
    Name: string,
    Description?: string,
    readonly Optional: boolean,
    Options?: string[],
    DefaultContent?: any,
    RegExPattern?: string,
    ValidationType: string,
    ValidationScript?: string,
    readonly IsPredefined: boolean,
    Tag?: string,
    IsCalculated: boolean,
    RateAffecting: boolean,
    IsRepeatableKey: boolean,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    PopulatedBy?: string[],
    ResetDataForNewEdition: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    AllowSpaces?: boolean

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    ParameterSubstitutedBy?: object[]

}

export class DataPointListOfStrings extends DataPoint {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataPointListOfStrings";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof DataPointListOfStrings }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get AllowSpaces(): boolean {
        return this.data.AllowSpaces;
    }
    set AllowSpaces(value: boolean) {
        this.data.AllowSpaces = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEvaluatedForCondition',
            edgeType: ElementConditionEvaluatesDataPoint,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsPopulatedBy',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'Populates',
            otherVertexType: Field,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: DataGroupContainsDataPoint,
            otherVertexPropertyName: 'Contains',
            otherVertexType: DataGroup,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: TaskCorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: TaskCorrespondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointListOfStrings {
        return ModelUtils.deserializeVertex<DataPointListOfStrings>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointListOfStrings) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DataType: model.DataType,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            ValidationScript: model.ValidationScript,
            IsPredefined: model.IsPredefined,
            Tag: model.Tag,
            IsCalculated: model.IsCalculated,
            RateAffecting: model.RateAffecting,
            IsRepeatableKey: model.IsRepeatableKey,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            PopulatedBy: model.PopulatedBy,
            ResetDataForNewEdition: model.ResetDataForNewEdition,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            AllowSpaces: model.AllowSpaces,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DataPointListOfStrings {
        let clone = new DataPointListOfStrings();
        clone.data = _.cloneDeep(this.data);
        clone._IsEvaluatedForCondition = _.cloneDeep(this._IsEvaluatedForCondition);
        clone._IsPopulatedBy = _.cloneDeep(this._IsPopulatedBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointString {
    DataType: string,
    Id: string,
    Name: string,
    Description?: string,
    readonly Optional: boolean,
    Options?: string[],
    DefaultContent?: any,
    RegExPattern?: string,
    ValidationType: string,
    ValidationScript?: string,
    readonly IsPredefined: boolean,
    Tag?: string,
    IsCalculated: boolean,
    RateAffecting: boolean,
    IsRepeatableKey: boolean,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    PopulatedBy?: string[],
    ResetDataForNewEdition: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    MinLength?: number,
    MaxLength?: number,
    MultiLineEntry?: boolean

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    ParameterSubstitutedBy?: object[]

}

export class DataPointString extends DataPoint {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataPointString";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof DataPointString }[] = [
            {className: 'DataPointEmail', type: DataPointEmail},
            {className: 'DataPointPhone', type: DataPointPhone},
            {className: 'DataPointYesNo', type: DataPointYesNo},

        ];
        return derivedTypes;
    }

    // Properties
    get MinLength(): number {
        return this.data.MinLength;
    }
    set MinLength(value: number) {
        this.data.MinLength = value;
    }
    get MaxLength(): number {
        return this.data.MaxLength;
    }
    set MaxLength(value: number) {
        this.data.MaxLength = value;
    }
    get MultiLineEntry(): boolean {
        return this.data.MultiLineEntry;
    }
    set MultiLineEntry(value: boolean) {
        this.data.MultiLineEntry = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEvaluatedForCondition',
            edgeType: ElementConditionEvaluatesDataPoint,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsPopulatedBy',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'Populates',
            otherVertexType: Field,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: DataGroupContainsDataPoint,
            otherVertexPropertyName: 'Contains',
            otherVertexType: DataGroup,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: TaskCorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: TaskCorrespondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointString {
        return ModelUtils.deserializeVertex<DataPointString>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointString) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DataType: model.DataType,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            ValidationScript: model.ValidationScript,
            IsPredefined: model.IsPredefined,
            Tag: model.Tag,
            IsCalculated: model.IsCalculated,
            RateAffecting: model.RateAffecting,
            IsRepeatableKey: model.IsRepeatableKey,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            PopulatedBy: model.PopulatedBy,
            ResetDataForNewEdition: model.ResetDataForNewEdition,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            MinLength: model.MinLength,
            MaxLength: model.MaxLength,
            MultiLineEntry: model.MultiLineEntry,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DataPointString {
        let clone = new DataPointString();
        clone.data = _.cloneDeep(this.data);
        clone._IsEvaluatedForCondition = _.cloneDeep(this._IsEvaluatedForCondition);
        clone._IsPopulatedBy = _.cloneDeep(this._IsPopulatedBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointTimestamp {
    DataType: string,
    Id: string,
    Name: string,
    Description?: string,
    readonly Optional: boolean,
    Options?: string[],
    DefaultContent?: any,
    RegExPattern?: string,
    ValidationType: string,
    ValidationScript?: string,
    readonly IsPredefined: boolean,
    Tag?: string,
    IsCalculated: boolean,
    RateAffecting: boolean,
    IsRepeatableKey: boolean,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    PopulatedBy?: string[],
    ResetDataForNewEdition: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    MinDate?: Date,
    MaxDate?: Date

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    ParameterSubstitutedBy?: object[]

}

export class DataPointTimestamp extends DataPoint {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataPointTimestamp";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof DataPointTimestamp }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get MinDate(): Date {
        return this.data.MinDate ? new Date(this.data.MinDate) : undefined;
    }
    set MinDate(value: Date) {
        this.data.MinDate = value;
    }
    get MaxDate(): Date {
        return this.data.MaxDate ? new Date(this.data.MaxDate) : undefined;
    }
    set MaxDate(value: Date) {
        this.data.MaxDate = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEvaluatedForCondition',
            edgeType: ElementConditionEvaluatesDataPoint,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsPopulatedBy',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'Populates',
            otherVertexType: Field,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: DataGroupContainsDataPoint,
            otherVertexPropertyName: 'Contains',
            otherVertexType: DataGroup,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: TaskCorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: TaskCorrespondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointTimestamp {
        return ModelUtils.deserializeVertex<DataPointTimestamp>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointTimestamp) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DataType: model.DataType,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            ValidationScript: model.ValidationScript,
            IsPredefined: model.IsPredefined,
            Tag: model.Tag,
            IsCalculated: model.IsCalculated,
            RateAffecting: model.RateAffecting,
            IsRepeatableKey: model.IsRepeatableKey,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            PopulatedBy: model.PopulatedBy,
            ResetDataForNewEdition: model.ResetDataForNewEdition,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            MinDate: model.MinDate,
            MaxDate: model.MaxDate,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DataPointTimestamp {
        let clone = new DataPointTimestamp();
        clone.data = _.cloneDeep(this.data);
        clone._IsEvaluatedForCondition = _.cloneDeep(this._IsEvaluatedForCondition);
        clone._IsPopulatedBy = _.cloneDeep(this._IsPopulatedBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointUrl {
    DataType: string,
    Id: string,
    Name: string,
    Description?: string,
    readonly Optional: boolean,
    Options?: string[],
    DefaultContent?: any,
    RegExPattern?: string,
    ValidationType: string,
    ValidationScript?: string,
    readonly IsPredefined: boolean,
    Tag?: string,
    IsCalculated: boolean,
    RateAffecting: boolean,
    IsRepeatableKey: boolean,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    PopulatedBy?: string[],
    ResetDataForNewEdition: boolean,
    ScriptFunction?: string,
    InputSources?: any[]

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    ParameterSubstitutedBy?: object[]

}

export class DataPointUrl extends DataPoint {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataPointUrl";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof DataPointUrl }[] = [

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEvaluatedForCondition',
            edgeType: ElementConditionEvaluatesDataPoint,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsPopulatedBy',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'Populates',
            otherVertexType: Field,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: DataGroupContainsDataPoint,
            otherVertexPropertyName: 'Contains',
            otherVertexType: DataGroup,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: TaskCorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: TaskCorrespondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointUrl {
        return ModelUtils.deserializeVertex<DataPointUrl>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointUrl) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DataType: model.DataType,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            ValidationScript: model.ValidationScript,
            IsPredefined: model.IsPredefined,
            Tag: model.Tag,
            IsCalculated: model.IsCalculated,
            RateAffecting: model.RateAffecting,
            IsRepeatableKey: model.IsRepeatableKey,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            PopulatedBy: model.PopulatedBy,
            ResetDataForNewEdition: model.ResetDataForNewEdition,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DataPointUrl {
        let clone = new DataPointUrl();
        clone.data = _.cloneDeep(this.data);
        clone._IsEvaluatedForCondition = _.cloneDeep(this._IsEvaluatedForCondition);
        clone._IsPopulatedBy = _.cloneDeep(this._IsPopulatedBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointZipcode {
    DataType: string,
    Id: string,
    Name: string,
    Description?: string,
    readonly Optional: boolean,
    Options?: string[],
    DefaultContent?: any,
    RegExPattern?: string,
    ValidationType: string,
    ValidationScript?: string,
    readonly IsPredefined: boolean,
    Tag?: string,
    IsCalculated: boolean,
    RateAffecting: boolean,
    IsRepeatableKey: boolean,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    PopulatedBy?: string[],
    ResetDataForNewEdition: boolean,
    ScriptFunction?: string,
    InputSources?: any[]

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    ParameterSubstitutedBy?: object[]

}

export class DataPointZipcode extends DataPoint {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataPointZipcode";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof DataPointZipcode }[] = [

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEvaluatedForCondition',
            edgeType: ElementConditionEvaluatesDataPoint,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsPopulatedBy',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'Populates',
            otherVertexType: Field,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: DataGroupContainsDataPoint,
            otherVertexPropertyName: 'Contains',
            otherVertexType: DataGroup,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: TaskCorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: TaskCorrespondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointZipcode {
        return ModelUtils.deserializeVertex<DataPointZipcode>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointZipcode) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DataType: model.DataType,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            ValidationScript: model.ValidationScript,
            IsPredefined: model.IsPredefined,
            Tag: model.Tag,
            IsCalculated: model.IsCalculated,
            RateAffecting: model.RateAffecting,
            IsRepeatableKey: model.IsRepeatableKey,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            PopulatedBy: model.PopulatedBy,
            ResetDataForNewEdition: model.ResetDataForNewEdition,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DataPointZipcode {
        let clone = new DataPointZipcode();
        clone.data = _.cloneDeep(this.data);
        clone._IsEvaluatedForCondition = _.cloneDeep(this._IsEvaluatedForCondition);
        clone._IsPopulatedBy = _.cloneDeep(this._IsPopulatedBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDateField {
    Id: string,
    DisplayLabel?: string,
    ShowHelp: boolean,
    Help?: string,
    readonly ConditionMet: boolean,
    ExternalId?: string,
    EnableListView: boolean,
    DefaultConditionMet: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    Optional: boolean,
    Options?: any[],
    DefaultContent?: any,
    Access: string,
    PopulatedByDataPointId?: string,
    DisplayWidth?: string,
    RetainDataWhenHidden?: boolean,
    Prefix?: string,
    Suffix?: string,

    IsEnabledBy?: object[],
    IsDisplayedBy?: object[],
    Populates?: object[]

}

export class DateField extends Field {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DateField";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof DateField }[] = [

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsDisplayedBy',
            edgeType: SectionDisplaysElement,
            otherVertexPropertyName: 'Displays',
            otherVertexType: Section,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Populates',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'IsPopulatedBy',
            otherVertexType: DataPoint,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DateField {
        return ModelUtils.deserializeVertex<DateField>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DateField) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            EnableListView: model.EnableListView,
            DefaultConditionMet: model.DefaultConditionMet,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            PopulatedByDataPointId: model.PopulatedByDataPointId,
            DisplayWidth: model.DisplayWidth,
            RetainDataWhenHidden: model.RetainDataWhenHidden,
            Prefix: model.Prefix,
            Suffix: model.Suffix,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsDisplayedBy: ModelUtils.serializeShallowEdge(model.IsDisplayedBy(), 'IsDisplayedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DateField {
        let clone = new DateField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsDisplayedBy = _.cloneDeep(this._IsDisplayedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDecimalField {
    Id: string,
    DisplayLabel?: string,
    ShowHelp: boolean,
    Help?: string,
    readonly ConditionMet: boolean,
    ExternalId?: string,
    EnableListView: boolean,
    DefaultConditionMet: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    Optional: boolean,
    Options?: any[],
    DefaultContent?: any,
    Access: string,
    PopulatedByDataPointId?: string,
    DisplayWidth?: string,
    RetainDataWhenHidden?: boolean,
    Prefix?: string,
    Suffix?: string,
    DisplayAsPercentage?: boolean,
    DisplayNegativesInRed?: boolean,

    IsEnabledBy?: object[],
    IsDisplayedBy?: object[],
    Populates?: object[]

}

export class DecimalField extends Field {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DecimalField";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof DecimalField }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get DisplayAsPercentage(): boolean {
        return this.data.DisplayAsPercentage;
    }
    set DisplayAsPercentage(value: boolean) {
        this.data.DisplayAsPercentage = value;
    }
    get DisplayNegativesInRed(): boolean {
        return this.data.DisplayNegativesInRed;
    }
    set DisplayNegativesInRed(value: boolean) {
        this.data.DisplayNegativesInRed = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsDisplayedBy',
            edgeType: SectionDisplaysElement,
            otherVertexPropertyName: 'Displays',
            otherVertexType: Section,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Populates',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'IsPopulatedBy',
            otherVertexType: DataPoint,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DecimalField {
        return ModelUtils.deserializeVertex<DecimalField>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DecimalField) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            EnableListView: model.EnableListView,
            DefaultConditionMet: model.DefaultConditionMet,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            PopulatedByDataPointId: model.PopulatedByDataPointId,
            DisplayWidth: model.DisplayWidth,
            RetainDataWhenHidden: model.RetainDataWhenHidden,
            Prefix: model.Prefix,
            Suffix: model.Suffix,
            DisplayAsPercentage: model.DisplayAsPercentage,
            DisplayNegativesInRed: model.DisplayNegativesInRed,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsDisplayedBy: ModelUtils.serializeShallowEdge(model.IsDisplayedBy(), 'IsDisplayedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DecimalField {
        let clone = new DecimalField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsDisplayedBy = _.cloneDeep(this._IsDisplayedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDeveloper {
    Id: string,
    DisplayName?: string,
    BadgePath?: string,
    LastLoginDate?: Date,
    readonly Active: boolean,
    readonly CreatedDate?: Date,
    Description?: string,
    AreaKey: string,
    readonly IsActive: boolean,
    readonly AuthProviderClientId?: string,
    readonly ApiManagementSubscriptionPrimaryKey?: string,
    readonly ApiManagementSubscriptionSecondaryKey?: string,
    ContactIsSameAsDeveloper: boolean,

    IsRepresentedBy?: object[],
    FillsSecurityRole?: object[],
    WorksIn?: object[],
    IsPersonaOf?: object[]

}

export class Developer extends App {
    get Domain(): string {
        return "Configuration";
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
    get ContactIsSameAsDeveloper(): boolean {
        return this.data.ContactIsSameAsDeveloper;
    }
    set ContactIsSameAsDeveloper(value: boolean) {
        this.data.ContactIsSameAsDeveloper = value;
    }

    // Relationships

    // Relationship IsPersonaOf, returns TenantUser TenantUserDevelopsAsDeveloper[]
    private __IsPersonaOf: TenantUserDevelopsAsDeveloper[];
    IsPersonaOf(_context?: BaseDataContext): TenantUserDevelopsAsDeveloper[] {
        if (this.__IsPersonaOf)
            return this.__IsPersonaOf;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsPersonaOf), (id) => context.get(id) as TenantUserDevelopsAsDeveloper);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsPersonaOf(values: TenantUserDevelopsAsDeveloper[]) {
         if (this.Context != null)
             throw Error;

        this.__IsPersonaOf = values;
     }
    get _IsPersonaOf(): Set<string> {
        if (!this._relationships.has("IsPersonaOf"))
            this._relationships.set("IsPersonaOf", new Set<string>());

        return this._relationships.get("IsPersonaOf");
    }
    set _IsPersonaOf(values: Set<string>) {
        this._relationships.set("IsPersonaOf", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsRepresentedBy',
            edgeType: AppRepresentedByTenantUser,
            otherVertexPropertyName: 'IsContactFor',
            otherVertexType: TenantUser,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'FillsSecurityRole',
            edgeType: SMIdentityFillsSecurityRole,
            otherVertexPropertyName: 'IsFilledBy',
            otherVertexType: SecurityRole,
        },
        {
            propertyName: 'WorksIn',
            edgeType: SMIdentityWorksInArea,
            otherVertexPropertyName: 'IsWorkedBy',
            otherVertexType: Area,
        },
        {
            propertyName: 'IsPersonaOf',
            edgeType: TenantUserDevelopsAsDeveloper,
            otherVertexPropertyName: 'DevelopsAs',
            otherVertexType: TenantUser,
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
            BadgePath: model.BadgePath,
            LastLoginDate: model.LastLoginDate,
            Active: model.Active,
            CreatedDate: model.CreatedDate,
            Description: model.Description,
            AreaKey: model.AreaKey,
            IsActive: model.IsActive,
            AuthProviderClientId: model.AuthProviderClientId,
            ApiManagementSubscriptionPrimaryKey: model.ApiManagementSubscriptionPrimaryKey,
            ApiManagementSubscriptionSecondaryKey: model.ApiManagementSubscriptionSecondaryKey,
            ContactIsSameAsDeveloper: model.ContactIsSameAsDeveloper,
            IsRepresentedBy: ModelUtils.serializeShallowEdge(model.IsRepresentedBy(), 'IsRepresentedBy'),
            FillsSecurityRole: ModelUtils.serializeShallowEdge(model.FillsSecurityRole(), 'FillsSecurityRole'),
            WorksIn: ModelUtils.serializeShallowEdge(model.WorksIn(), 'WorksIn'),
            IsPersonaOf: ModelUtils.serializeShallowEdge(model.IsPersonaOf(), 'IsPersonaOf'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Developer {
        let clone = new Developer();
        clone.data = _.cloneDeep(this.data);
        clone._IsRepresentedBy = _.cloneDeep(this._IsRepresentedBy);
        clone._FillsSecurityRole = _.cloneDeep(this._FillsSecurityRole);
        clone._WorksIn = _.cloneDeep(this._WorksIn);
        clone._IsPersonaOf = _.cloneDeep(this._IsPersonaOf);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IIntegerField {
    Id: string,
    DisplayLabel?: string,
    ShowHelp: boolean,
    Help?: string,
    readonly ConditionMet: boolean,
    ExternalId?: string,
    EnableListView: boolean,
    DefaultConditionMet: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    Optional: boolean,
    Options?: any[],
    DefaultContent?: any,
    Access: string,
    PopulatedByDataPointId?: string,
    DisplayWidth?: string,
    RetainDataWhenHidden?: boolean,
    Prefix?: string,
    Suffix?: string,

    IsEnabledBy?: object[],
    IsDisplayedBy?: object[],
    Populates?: object[]

}

export class IntegerField extends Field {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "IntegerField";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof IntegerField }[] = [
            {className: 'YearField', type: YearField},

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsDisplayedBy',
            edgeType: SectionDisplaysElement,
            otherVertexPropertyName: 'Displays',
            otherVertexType: Section,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Populates',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'IsPopulatedBy',
            otherVertexType: DataPoint,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): IntegerField {
        return ModelUtils.deserializeVertex<IntegerField>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: IntegerField) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            EnableListView: model.EnableListView,
            DefaultConditionMet: model.DefaultConditionMet,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            PopulatedByDataPointId: model.PopulatedByDataPointId,
            DisplayWidth: model.DisplayWidth,
            RetainDataWhenHidden: model.RetainDataWhenHidden,
            Prefix: model.Prefix,
            Suffix: model.Suffix,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsDisplayedBy: ModelUtils.serializeShallowEdge(model.IsDisplayedBy(), 'IsDisplayedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): IntegerField {
        let clone = new IntegerField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsDisplayedBy = _.cloneDeep(this._IsDisplayedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IListOfStringsField {
    Id: string,
    DisplayLabel?: string,
    ShowHelp: boolean,
    Help?: string,
    readonly ConditionMet: boolean,
    ExternalId?: string,
    EnableListView: boolean,
    DefaultConditionMet: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    Optional: boolean,
    Options?: any[],
    DefaultContent?: any,
    Access: string,
    PopulatedByDataPointId?: string,
    DisplayWidth?: string,
    RetainDataWhenHidden?: boolean,
    Prefix?: string,
    Suffix?: string,

    IsEnabledBy?: object[],
    IsDisplayedBy?: object[],
    Populates?: object[]

}

export class ListOfStringsField extends Field {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ListOfStringsField";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof ListOfStringsField }[] = [

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsDisplayedBy',
            edgeType: SectionDisplaysElement,
            otherVertexPropertyName: 'Displays',
            otherVertexType: Section,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Populates',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'IsPopulatedBy',
            otherVertexType: DataPoint,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): ListOfStringsField {
        return ModelUtils.deserializeVertex<ListOfStringsField>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: ListOfStringsField) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            EnableListView: model.EnableListView,
            DefaultConditionMet: model.DefaultConditionMet,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            PopulatedByDataPointId: model.PopulatedByDataPointId,
            DisplayWidth: model.DisplayWidth,
            RetainDataWhenHidden: model.RetainDataWhenHidden,
            Prefix: model.Prefix,
            Suffix: model.Suffix,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsDisplayedBy: ModelUtils.serializeShallowEdge(model.IsDisplayedBy(), 'IsDisplayedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): ListOfStringsField {
        let clone = new ListOfStringsField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsDisplayedBy = _.cloneDeep(this._IsDisplayedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IMoneyField {
    Id: string,
    DisplayLabel?: string,
    ShowHelp: boolean,
    Help?: string,
    readonly ConditionMet: boolean,
    ExternalId?: string,
    EnableListView: boolean,
    DefaultConditionMet: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    Optional: boolean,
    Options?: any[],
    DefaultContent?: any,
    Access: string,
    PopulatedByDataPointId?: string,
    DisplayWidth?: string,
    RetainDataWhenHidden?: boolean,
    Prefix?: string,
    Suffix?: string,
    DisplayAsWholeNumber?: boolean,
    DisplayNegativesInRed?: boolean,

    IsEnabledBy?: object[],
    IsDisplayedBy?: object[],
    Populates?: object[]

}

export class MoneyField extends Field {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "MoneyField";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof MoneyField }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get DisplayAsWholeNumber(): boolean {
        return this.data.DisplayAsWholeNumber;
    }
    set DisplayAsWholeNumber(value: boolean) {
        this.data.DisplayAsWholeNumber = value;
    }
    get DisplayNegativesInRed(): boolean {
        return this.data.DisplayNegativesInRed;
    }
    set DisplayNegativesInRed(value: boolean) {
        this.data.DisplayNegativesInRed = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsDisplayedBy',
            edgeType: SectionDisplaysElement,
            otherVertexPropertyName: 'Displays',
            otherVertexType: Section,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Populates',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'IsPopulatedBy',
            otherVertexType: DataPoint,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): MoneyField {
        return ModelUtils.deserializeVertex<MoneyField>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: MoneyField) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            EnableListView: model.EnableListView,
            DefaultConditionMet: model.DefaultConditionMet,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            PopulatedByDataPointId: model.PopulatedByDataPointId,
            DisplayWidth: model.DisplayWidth,
            RetainDataWhenHidden: model.RetainDataWhenHidden,
            Prefix: model.Prefix,
            Suffix: model.Suffix,
            DisplayAsWholeNumber: model.DisplayAsWholeNumber,
            DisplayNegativesInRed: model.DisplayNegativesInRed,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsDisplayedBy: ModelUtils.serializeShallowEdge(model.IsDisplayedBy(), 'IsDisplayedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): MoneyField {
        let clone = new MoneyField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsDisplayedBy = _.cloneDeep(this._IsDisplayedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IRuleDateTime {
    Id: string,
    DataType: string,
    Name: string,
    Description: string,
    Enabled?: boolean,
    DecisionFunction?: string,
    DecisionMatrixJson?: string,
    InputSources?: any[],
    TaskIds?: string[],
    SetDateTo?: string

    IsContainedBy?: object[]

}

export class RuleDateTime extends Rule {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "RuleDateTime";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof RuleDateTime }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get TaskIds(): string[] {
        return this.data.TaskIds;
    }
    set TaskIds(value: string[]) {
        this.data.TaskIds = value;
    }
    get SetDateTo(): string {
        return this.data.SetDateTo;
    }
    set SetDateTo(value: string) {
        this.data.SetDateTo = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsContainedBy',
            edgeType: RuleSetContainsRule,
            otherVertexPropertyName: 'Contains',
            otherVertexType: RuleSet,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): RuleDateTime {
        return ModelUtils.deserializeVertex<RuleDateTime>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: RuleDateTime) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            Enabled: model.Enabled,
            DecisionFunction: model.DecisionFunction,
            DecisionMatrixJson: model.DecisionMatrixJson,
            InputSources: model.InputSources,
            TaskIds: model.TaskIds,
            SetDateTo: model.SetDateTo,
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): RuleDateTime {
        let clone = new RuleDateTime();
        clone.data = _.cloneDeep(this.data);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IRuleProductSelection {
    Id: string,
    DataType: string,
    Name: string,
    Description: string,
    Enabled?: boolean,
    DecisionFunction?: string,
    DecisionMatrixJson?: string,
    InputSources?: any[],
    ProductId: string

    IsContainedBy?: object[]

}

export class RuleProductSelection extends Rule {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "RuleProductSelection";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof RuleProductSelection }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get ProductId(): string {
        return this.data.ProductId;
    }
    set ProductId(value: string) {
        this.data.ProductId = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsContainedBy',
            edgeType: RuleSetContainsRule,
            otherVertexPropertyName: 'Contains',
            otherVertexType: RuleSet,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): RuleProductSelection {
        return ModelUtils.deserializeVertex<RuleProductSelection>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: RuleProductSelection) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            Enabled: model.Enabled,
            DecisionFunction: model.DecisionFunction,
            DecisionMatrixJson: model.DecisionMatrixJson,
            InputSources: model.InputSources,
            ProductId: model.ProductId,
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): RuleProductSelection {
        let clone = new RuleProductSelection();
        clone.data = _.cloneDeep(this.data);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IRuleRiskAssessment {
    Id: string,
    DataType: string,
    Name: string,
    Description: string,
    Enabled?: boolean,
    DecisionFunction?: string,
    DecisionMatrixJson?: string,
    InputSources?: any[]

    IsContainedBy?: object[]

}

export class RuleRiskAssessment extends Rule {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "RuleRiskAssessment";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof RuleRiskAssessment }[] = [

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsContainedBy',
            edgeType: RuleSetContainsRule,
            otherVertexPropertyName: 'Contains',
            otherVertexType: RuleSet,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): RuleRiskAssessment {
        return ModelUtils.deserializeVertex<RuleRiskAssessment>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: RuleRiskAssessment) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            Enabled: model.Enabled,
            DecisionFunction: model.DecisionFunction,
            DecisionMatrixJson: model.DecisionMatrixJson,
            InputSources: model.InputSources,
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): RuleRiskAssessment {
        let clone = new RuleRiskAssessment();
        clone.data = _.cloneDeep(this.data);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IRuleRoleAssignment {
    Id: string,
    DataType: string,
    Name: string,
    Description: string,
    Enabled?: boolean,
    DecisionFunction?: string,
    DecisionMatrixJson?: string,
    InputSources?: any[],
    AccountRoleDefinitionId: string

    IsContainedBy?: object[]

}

export class RuleRoleAssignment extends Rule {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "RuleRoleAssignment";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof RuleRoleAssignment }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get AccountRoleDefinitionId(): string {
        return this.data.AccountRoleDefinitionId;
    }
    set AccountRoleDefinitionId(value: string) {
        this.data.AccountRoleDefinitionId = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsContainedBy',
            edgeType: RuleSetContainsRule,
            otherVertexPropertyName: 'Contains',
            otherVertexType: RuleSet,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): RuleRoleAssignment {
        return ModelUtils.deserializeVertex<RuleRoleAssignment>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: RuleRoleAssignment) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            Enabled: model.Enabled,
            DecisionFunction: model.DecisionFunction,
            DecisionMatrixJson: model.DecisionMatrixJson,
            InputSources: model.InputSources,
            AccountRoleDefinitionId: model.AccountRoleDefinitionId,
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): RuleRoleAssignment {
        let clone = new RuleRoleAssignment();
        clone.data = _.cloneDeep(this.data);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IRuleSetAssignment {
    Id: string,
    readonly LockedByChange?: string,
    Name: string,
    Description: string,

    IsEvaluatedBy?: object[],
    IsTrackedFor?: object[],
    Contains?: object[]

}

export class RuleSetAssignment extends RuleSet {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "RuleSetAssignment";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof RuleSetAssignment }[] = [

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEvaluatedBy',
            edgeType: ProgramEvaluatesRuleSet,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: Program,
        },
        {
            propertyName: 'IsTrackedFor',
            edgeType: ProgramRevisionTracksProgramRevisioned,
            otherVertexPropertyName: 'Tracks',
            otherVertexType: ProgramRevision,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Contains',
            edgeType: RuleSetContainsRule,
            otherVertexPropertyName: 'IsContainedBy',
            otherVertexType: Rule,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): RuleSetAssignment {
        return ModelUtils.deserializeVertex<RuleSetAssignment>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: RuleSetAssignment) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            LockedByChange: model.LockedByChange,
            Name: model.Name,
            Description: model.Description,
            IsEvaluatedBy: ModelUtils.serializeShallowEdge(model.IsEvaluatedBy(), 'IsEvaluatedBy'),
            IsTrackedFor: ModelUtils.serializeShallowEdge(model.IsTrackedFor(), 'IsTrackedFor'),
            Contains: ModelUtils.serializeShallowEdge(model.Contains(), 'Contains'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): RuleSetAssignment {
        let clone = new RuleSetAssignment();
        clone.data = _.cloneDeep(this.data);
        clone._IsEvaluatedBy = _.cloneDeep(this._IsEvaluatedBy);
        clone._IsTrackedFor = _.cloneDeep(this._IsTrackedFor);
        clone._Contains = _.cloneDeep(this._Contains);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IRuleSetDateTime {
    Id: string,
    readonly LockedByChange?: string,
    Name: string,
    Description: string,
    WorkflowSetId: string,

    IsEvaluatedBy?: object[],
    IsTrackedFor?: object[],
    Contains?: object[]

}

export class RuleSetDateTime extends RuleSet {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "RuleSetDateTime";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof RuleSetDateTime }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get WorkflowSetId(): string {
        return this.data.WorkflowSetId;
    }
    set WorkflowSetId(value: string) {
        this.data.WorkflowSetId = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEvaluatedBy',
            edgeType: ProgramEvaluatesRuleSet,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: Program,
        },
        {
            propertyName: 'IsTrackedFor',
            edgeType: ProgramRevisionTracksProgramRevisioned,
            otherVertexPropertyName: 'Tracks',
            otherVertexType: ProgramRevision,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Contains',
            edgeType: RuleSetContainsRule,
            otherVertexPropertyName: 'IsContainedBy',
            otherVertexType: Rule,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): RuleSetDateTime {
        return ModelUtils.deserializeVertex<RuleSetDateTime>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: RuleSetDateTime) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            LockedByChange: model.LockedByChange,
            Name: model.Name,
            Description: model.Description,
            WorkflowSetId: model.WorkflowSetId,
            IsEvaluatedBy: ModelUtils.serializeShallowEdge(model.IsEvaluatedBy(), 'IsEvaluatedBy'),
            IsTrackedFor: ModelUtils.serializeShallowEdge(model.IsTrackedFor(), 'IsTrackedFor'),
            Contains: ModelUtils.serializeShallowEdge(model.Contains(), 'Contains'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): RuleSetDateTime {
        let clone = new RuleSetDateTime();
        clone.data = _.cloneDeep(this.data);
        clone._IsEvaluatedBy = _.cloneDeep(this._IsEvaluatedBy);
        clone._IsTrackedFor = _.cloneDeep(this._IsTrackedFor);
        clone._Contains = _.cloneDeep(this._Contains);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IRuleSetProduct {
    Id: string,
    readonly LockedByChange?: string,
    Name: string,
    Description: string,

    IsEvaluatedBy?: object[],
    IsTrackedFor?: object[],
    Contains?: object[]

}

export class RuleSetProduct extends RuleSet {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "RuleSetProduct";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof RuleSetProduct }[] = [

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEvaluatedBy',
            edgeType: ProgramEvaluatesRuleSet,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: Program,
        },
        {
            propertyName: 'IsTrackedFor',
            edgeType: ProgramRevisionTracksProgramRevisioned,
            otherVertexPropertyName: 'Tracks',
            otherVertexType: ProgramRevision,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Contains',
            edgeType: RuleSetContainsRule,
            otherVertexPropertyName: 'IsContainedBy',
            otherVertexType: Rule,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): RuleSetProduct {
        return ModelUtils.deserializeVertex<RuleSetProduct>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: RuleSetProduct) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            LockedByChange: model.LockedByChange,
            Name: model.Name,
            Description: model.Description,
            IsEvaluatedBy: ModelUtils.serializeShallowEdge(model.IsEvaluatedBy(), 'IsEvaluatedBy'),
            IsTrackedFor: ModelUtils.serializeShallowEdge(model.IsTrackedFor(), 'IsTrackedFor'),
            Contains: ModelUtils.serializeShallowEdge(model.Contains(), 'Contains'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): RuleSetProduct {
        let clone = new RuleSetProduct();
        clone.data = _.cloneDeep(this.data);
        clone._IsEvaluatedBy = _.cloneDeep(this._IsEvaluatedBy);
        clone._IsTrackedFor = _.cloneDeep(this._IsTrackedFor);
        clone._Contains = _.cloneDeep(this._Contains);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IRuleSetRequirement {
    Id: string,
    readonly LockedByChange?: string,
    Name: string,
    Description: string,
    WorkflowId?: string,

    IsEvaluatedBy?: object[],
    IsTrackedFor?: object[],
    Contains?: object[],
    Regulates?: object[]

}

export class RuleSetRequirement extends RuleSet {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "RuleSetRequirement";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof RuleSetRequirement }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get WorkflowId(): string {
        return this.data.WorkflowId;
    }
    set WorkflowId(value: string) {
        this.data.WorkflowId = value;
    }

    // Relationships

    // Relationship Regulates, returns Workflow RuleSetRequirementRegulatesWorkflow[]
    private __Regulates: RuleSetRequirementRegulatesWorkflow[];
    Regulates(_context?: BaseDataContext): RuleSetRequirementRegulatesWorkflow[] {
        if (this.__Regulates)
            return this.__Regulates;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Regulates), (id) => context.get(id) as RuleSetRequirementRegulatesWorkflow);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setRegulates(values: RuleSetRequirementRegulatesWorkflow[]) {
         if (this.Context != null)
             throw Error;

        this.__Regulates = values;
     }
    get _Regulates(): Set<string> {
        if (!this._relationships.has("Regulates"))
            this._relationships.set("Regulates", new Set<string>());

        return this._relationships.get("Regulates");
    }
    set _Regulates(values: Set<string>) {
        this._relationships.set("Regulates", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEvaluatedBy',
            edgeType: ProgramEvaluatesRuleSet,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: Program,
        },
        {
            propertyName: 'IsTrackedFor',
            edgeType: ProgramRevisionTracksProgramRevisioned,
            otherVertexPropertyName: 'Tracks',
            otherVertexType: ProgramRevision,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Contains',
            edgeType: RuleSetContainsRule,
            otherVertexPropertyName: 'IsContainedBy',
            otherVertexType: Rule,
        },
        {
            propertyName: 'Regulates',
            edgeType: RuleSetRequirementRegulatesWorkflow,
            otherVertexPropertyName: 'IsRegulatedBy',
            otherVertexType: Workflow,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): RuleSetRequirement {
        return ModelUtils.deserializeVertex<RuleSetRequirement>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: RuleSetRequirement) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            LockedByChange: model.LockedByChange,
            Name: model.Name,
            Description: model.Description,
            WorkflowId: model.WorkflowId,
            IsEvaluatedBy: ModelUtils.serializeShallowEdge(model.IsEvaluatedBy(), 'IsEvaluatedBy'),
            IsTrackedFor: ModelUtils.serializeShallowEdge(model.IsTrackedFor(), 'IsTrackedFor'),
            Contains: ModelUtils.serializeShallowEdge(model.Contains(), 'Contains'),
            Regulates: ModelUtils.serializeShallowEdge(model.Regulates(), 'Regulates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): RuleSetRequirement {
        let clone = new RuleSetRequirement();
        clone.data = _.cloneDeep(this.data);
        clone._IsEvaluatedBy = _.cloneDeep(this._IsEvaluatedBy);
        clone._IsTrackedFor = _.cloneDeep(this._IsTrackedFor);
        clone._Contains = _.cloneDeep(this._Contains);
        clone._Regulates = _.cloneDeep(this._Regulates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IRuleSetRiskAssessment {
    Id: string,
    readonly LockedByChange?: string,
    Name: string,
    Description: string,
    WorkflowSetId: string,
    RiskActions?: any[],

    IsEvaluatedBy?: object[],
    IsTrackedFor?: object[],
    Contains?: object[]

}

export class RuleSetRiskAssessment extends RuleSet {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "RuleSetRiskAssessment";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof RuleSetRiskAssessment }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get WorkflowSetId(): string {
        return this.data.WorkflowSetId;
    }
    set WorkflowSetId(value: string) {
        this.data.WorkflowSetId = value;
    }
    get RiskActions(): any[] {
        return this.data.RiskActions;
    }
    set RiskActions(value: any[]) {
        this.data.RiskActions = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEvaluatedBy',
            edgeType: ProgramEvaluatesRuleSet,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: Program,
        },
        {
            propertyName: 'IsTrackedFor',
            edgeType: ProgramRevisionTracksProgramRevisioned,
            otherVertexPropertyName: 'Tracks',
            otherVertexType: ProgramRevision,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Contains',
            edgeType: RuleSetContainsRule,
            otherVertexPropertyName: 'IsContainedBy',
            otherVertexType: Rule,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): RuleSetRiskAssessment {
        return ModelUtils.deserializeVertex<RuleSetRiskAssessment>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: RuleSetRiskAssessment) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            LockedByChange: model.LockedByChange,
            Name: model.Name,
            Description: model.Description,
            WorkflowSetId: model.WorkflowSetId,
            RiskActions: model.RiskActions,
            IsEvaluatedBy: ModelUtils.serializeShallowEdge(model.IsEvaluatedBy(), 'IsEvaluatedBy'),
            IsTrackedFor: ModelUtils.serializeShallowEdge(model.IsTrackedFor(), 'IsTrackedFor'),
            Contains: ModelUtils.serializeShallowEdge(model.Contains(), 'Contains'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): RuleSetRiskAssessment {
        let clone = new RuleSetRiskAssessment();
        clone.data = _.cloneDeep(this.data);
        clone._IsEvaluatedBy = _.cloneDeep(this._IsEvaluatedBy);
        clone._IsTrackedFor = _.cloneDeep(this._IsTrackedFor);
        clone._Contains = _.cloneDeep(this._Contains);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IRuleSetWorkflowSetStatus {
    Id: string,
    readonly LockedByChange?: string,
    Name: string,
    Description: string,
    WorkflowSetId?: string,

    IsEvaluatedBy?: object[],
    IsTrackedFor?: object[],
    Contains?: object[],
    Captures?: object[]

}

export class RuleSetWorkflowSetStatus extends RuleSet {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "RuleSetWorkflowSetStatus";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof RuleSetWorkflowSetStatus }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get WorkflowSetId(): string {
        return this.data.WorkflowSetId;
    }
    set WorkflowSetId(value: string) {
        this.data.WorkflowSetId = value;
    }

    // Relationships

    // Relationship Captures, returns WorkflowSet RuleSetWorkflowSetStatusCapturesWorkflowSet[]
    private __Captures: RuleSetWorkflowSetStatusCapturesWorkflowSet[];
    Captures(_context?: BaseDataContext): RuleSetWorkflowSetStatusCapturesWorkflowSet[] {
        if (this.__Captures)
            return this.__Captures;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Captures), (id) => context.get(id) as RuleSetWorkflowSetStatusCapturesWorkflowSet);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setCaptures(values: RuleSetWorkflowSetStatusCapturesWorkflowSet[]) {
         if (this.Context != null)
             throw Error;

        this.__Captures = values;
     }
    get _Captures(): Set<string> {
        if (!this._relationships.has("Captures"))
            this._relationships.set("Captures", new Set<string>());

        return this._relationships.get("Captures");
    }
    set _Captures(values: Set<string>) {
        this._relationships.set("Captures", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEvaluatedBy',
            edgeType: ProgramEvaluatesRuleSet,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: Program,
        },
        {
            propertyName: 'IsTrackedFor',
            edgeType: ProgramRevisionTracksProgramRevisioned,
            otherVertexPropertyName: 'Tracks',
            otherVertexType: ProgramRevision,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Contains',
            edgeType: RuleSetContainsRule,
            otherVertexPropertyName: 'IsContainedBy',
            otherVertexType: Rule,
        },
        {
            propertyName: 'Captures',
            edgeType: RuleSetWorkflowSetStatusCapturesWorkflowSet,
            otherVertexPropertyName: 'IsCapturedBy',
            otherVertexType: WorkflowSet,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): RuleSetWorkflowSetStatus {
        return ModelUtils.deserializeVertex<RuleSetWorkflowSetStatus>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: RuleSetWorkflowSetStatus) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            LockedByChange: model.LockedByChange,
            Name: model.Name,
            Description: model.Description,
            WorkflowSetId: model.WorkflowSetId,
            IsEvaluatedBy: ModelUtils.serializeShallowEdge(model.IsEvaluatedBy(), 'IsEvaluatedBy'),
            IsTrackedFor: ModelUtils.serializeShallowEdge(model.IsTrackedFor(), 'IsTrackedFor'),
            Contains: ModelUtils.serializeShallowEdge(model.Contains(), 'Contains'),
            Captures: ModelUtils.serializeShallowEdge(model.Captures(), 'Captures'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): RuleSetWorkflowSetStatus {
        let clone = new RuleSetWorkflowSetStatus();
        clone.data = _.cloneDeep(this.data);
        clone._IsEvaluatedBy = _.cloneDeep(this._IsEvaluatedBy);
        clone._IsTrackedFor = _.cloneDeep(this._IsTrackedFor);
        clone._Contains = _.cloneDeep(this._Contains);
        clone._Captures = _.cloneDeep(this._Captures);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IRuleTaskObligation {
    Id: string,
    DataType: string,
    Name: string,
    Description: string,
    Enabled?: boolean,
    DecisionFunction?: string,
    DecisionMatrixJson?: string,
    InputSources?: any[],
    TaskIds?: string[],

    IsContainedBy?: object[],
    SetsRequirementFor?: object[]

}

export class RuleTaskObligation extends Rule {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "RuleTaskObligation";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof RuleTaskObligation }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get TaskIds(): string[] {
        return this.data.TaskIds;
    }
    set TaskIds(value: string[]) {
        this.data.TaskIds = value;
    }

    // Relationships

    // Relationship SetsRequirementFor, returns Task RuleTaskObligationSetsRequirementForTask[]
    private __SetsRequirementFor: RuleTaskObligationSetsRequirementForTask[];
    SetsRequirementFor(_context?: BaseDataContext): RuleTaskObligationSetsRequirementForTask[] {
        if (this.__SetsRequirementFor)
            return this.__SetsRequirementFor;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._SetsRequirementFor), (id) => context.get(id) as RuleTaskObligationSetsRequirementForTask);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setSetsRequirementFor(values: RuleTaskObligationSetsRequirementForTask[]) {
         if (this.Context != null)
             throw Error;

        this.__SetsRequirementFor = values;
     }
    get _SetsRequirementFor(): Set<string> {
        if (!this._relationships.has("SetsRequirementFor"))
            this._relationships.set("SetsRequirementFor", new Set<string>());

        return this._relationships.get("SetsRequirementFor");
    }
    set _SetsRequirementFor(values: Set<string>) {
        this._relationships.set("SetsRequirementFor", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsContainedBy',
            edgeType: RuleSetContainsRule,
            otherVertexPropertyName: 'Contains',
            otherVertexType: RuleSet,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'SetsRequirementFor',
            edgeType: RuleTaskObligationSetsRequirementForTask,
            otherVertexPropertyName: 'GetsRequirementFrom',
            otherVertexType: Task,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): RuleTaskObligation {
        return ModelUtils.deserializeVertex<RuleTaskObligation>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: RuleTaskObligation) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            Enabled: model.Enabled,
            DecisionFunction: model.DecisionFunction,
            DecisionMatrixJson: model.DecisionMatrixJson,
            InputSources: model.InputSources,
            TaskIds: model.TaskIds,
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            SetsRequirementFor: ModelUtils.serializeShallowEdge(model.SetsRequirementFor(), 'SetsRequirementFor'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): RuleTaskObligation {
        let clone = new RuleTaskObligation();
        clone.data = _.cloneDeep(this.data);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._SetsRequirementFor = _.cloneDeep(this._SetsRequirementFor);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IRuleWorkflowSetStatus {
    Id: string,
    DataType: string,
    Name: string,
    Description: string,
    Enabled?: boolean,
    DecisionFunction?: string,
    DecisionMatrixJson?: string,
    InputSources?: any[],
    Otherwise?: string,
    DecisionConditionals: any[]

    IsContainedBy?: object[]

}

export class RuleWorkflowSetStatus extends Rule {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "RuleWorkflowSetStatus";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof RuleWorkflowSetStatus }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get Otherwise(): string {
        return this.data.Otherwise;
    }
    set Otherwise(value: string) {
        this.data.Otherwise = value;
    }
    get DecisionConditionals(): any[] {
        return this.data.DecisionConditionals;
    }
    set DecisionConditionals(value: any[]) {
        this.data.DecisionConditionals = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsContainedBy',
            edgeType: RuleSetContainsRule,
            otherVertexPropertyName: 'Contains',
            otherVertexType: RuleSet,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): RuleWorkflowSetStatus {
        return ModelUtils.deserializeVertex<RuleWorkflowSetStatus>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: RuleWorkflowSetStatus) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            Enabled: model.Enabled,
            DecisionFunction: model.DecisionFunction,
            DecisionMatrixJson: model.DecisionMatrixJson,
            InputSources: model.InputSources,
            Otherwise: model.Otherwise,
            DecisionConditionals: model.DecisionConditionals,
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): RuleWorkflowSetStatus {
        let clone = new RuleWorkflowSetStatus();
        clone.data = _.cloneDeep(this.data);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IStaticText {
    Id: string,
    DisplayLabel?: string,
    ShowHelp: boolean,
    Help?: string,
    readonly ConditionMet: boolean,
    ExternalId?: string,
    EnableListView: boolean,
    DefaultConditionMet: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    StaticTextStyle: string,
    Text?: string

    IsEnabledBy?: object[],
    IsDisplayedBy?: object[]

}

export class StaticText extends StaticElement {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "StaticText";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof StaticText }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get StaticTextStyle(): string {
        return this.data.StaticTextStyle;
    }
    set StaticTextStyle(value: string) {
        this.data.StaticTextStyle = value;
    }
    get Text(): string {
        return this.data.Text;
    }
    set Text(value: string) {
        this.data.Text = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsDisplayedBy',
            edgeType: SectionDisplaysElement,
            otherVertexPropertyName: 'Displays',
            otherVertexType: Section,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): StaticText {
        return ModelUtils.deserializeVertex<StaticText>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: StaticText) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            EnableListView: model.EnableListView,
            DefaultConditionMet: model.DefaultConditionMet,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            StaticTextStyle: model.StaticTextStyle,
            Text: model.Text,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsDisplayedBy: ModelUtils.serializeShallowEdge(model.IsDisplayedBy(), 'IsDisplayedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): StaticText {
        let clone = new StaticText();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsDisplayedBy = _.cloneDeep(this._IsDisplayedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IStringField {
    Id: string,
    DisplayLabel?: string,
    ShowHelp: boolean,
    Help?: string,
    readonly ConditionMet: boolean,
    ExternalId?: string,
    EnableListView: boolean,
    DefaultConditionMet: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    Optional: boolean,
    Options?: any[],
    DefaultContent?: any,
    Access: string,
    PopulatedByDataPointId?: string,
    DisplayWidth?: string,
    RetainDataWhenHidden?: boolean,
    Prefix?: string,
    Suffix?: string,

    IsEnabledBy?: object[],
    IsDisplayedBy?: object[],
    Populates?: object[]

}

export class StringField extends Field {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "StringField";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof StringField }[] = [
            {className: 'EmailField', type: EmailField},
            {className: 'PhoneField', type: PhoneField},
            {className: 'YesNoField', type: YesNoField},

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsDisplayedBy',
            edgeType: SectionDisplaysElement,
            otherVertexPropertyName: 'Displays',
            otherVertexType: Section,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Populates',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'IsPopulatedBy',
            otherVertexType: DataPoint,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): StringField {
        return ModelUtils.deserializeVertex<StringField>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: StringField) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            EnableListView: model.EnableListView,
            DefaultConditionMet: model.DefaultConditionMet,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            PopulatedByDataPointId: model.PopulatedByDataPointId,
            DisplayWidth: model.DisplayWidth,
            RetainDataWhenHidden: model.RetainDataWhenHidden,
            Prefix: model.Prefix,
            Suffix: model.Suffix,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsDisplayedBy: ModelUtils.serializeShallowEdge(model.IsDisplayedBy(), 'IsDisplayedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): StringField {
        let clone = new StringField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsDisplayedBy = _.cloneDeep(this._IsDisplayedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITaskApplication {
    Id: string,
    WaitingForIds?: string[],
    OnBeforeCompleteEventActions?: any[],
    Name: string,
    Description: string,
    HowTo?: string,
    ObligationStatus: string,
    AutoComplete: boolean,
    AutoExecute: boolean,
    AutoDefer: boolean,
    DeferAmount?: number,
    DeferAmountUnits?: string,
    DeferBusinessHoursOnly?: boolean,
    DefaultAssignee?: string,
    Waivable: boolean,
    OnCompleteWorkflowSetStatus?: string,
    Webhooks?: string[],
    OnCompleteEventActions?: any[],
    OnUncompleteEventActions?: any[],
    SLATriggeredByWorkableIds?: string[],
    SLACorrelationKey?: string,
    ApplicationDefinitionKey: string,

    GetsRequirementFrom?: object[],
    IsRequiredFor?: object[],
    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    InitiallyAssignedTo?: object[],
    Enables?: object[]

}

export class TaskApplication extends Task {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "TaskApplication";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof TaskApplication }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get ApplicationDefinitionKey(): string {
        return this.data.ApplicationDefinitionKey;
    }
    set ApplicationDefinitionKey(value: string) {
        this.data.ApplicationDefinitionKey = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'GetsRequirementFrom',
            edgeType: RuleTaskObligationSetsRequirementForTask,
            otherVertexPropertyName: 'SetsRequirementFor',
            otherVertexType: RuleTaskObligation,
        },
        {
            propertyName: 'IsRequiredFor',
            edgeType: PhaseRequiresTask,
            otherVertexPropertyName: 'Requires',
            otherVertexType: Phase,
        },
        {
            propertyName: 'IsTriggeredBy',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'Triggers',
            otherVertexType: Workable,
        },
        {
            propertyName: 'WaitsFor',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'Enables',
            otherVertexType: Workable,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Triggers',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'IsTriggeredBy',
            otherVertexType: Workable,
        },
        {
            propertyName: 'InitiallyAssignedTo',
            edgeType: TaskAssignedAssignable,
            otherVertexPropertyName: 'InitialAssigneeFor',
            otherVertexType: Assignable,
        },
        {
            propertyName: 'Enables',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'WaitsFor',
            otherVertexType: Workable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): TaskApplication {
        return ModelUtils.deserializeVertex<TaskApplication>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: TaskApplication) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            WaitingForIds: model.WaitingForIds,
            OnBeforeCompleteEventActions: model.OnBeforeCompleteEventActions,
            Name: model.Name,
            Description: model.Description,
            HowTo: model.HowTo,
            ObligationStatus: model.ObligationStatus,
            AutoComplete: model.AutoComplete,
            AutoExecute: model.AutoExecute,
            AutoDefer: model.AutoDefer,
            DeferAmount: model.DeferAmount,
            DeferAmountUnits: model.DeferAmountUnits,
            DeferBusinessHoursOnly: model.DeferBusinessHoursOnly,
            DefaultAssignee: model.DefaultAssignee,
            Waivable: model.Waivable,
            OnCompleteWorkflowSetStatus: model.OnCompleteWorkflowSetStatus,
            Webhooks: model.Webhooks,
            OnCompleteEventActions: model.OnCompleteEventActions,
            OnUncompleteEventActions: model.OnUncompleteEventActions,
            SLATriggeredByWorkableIds: model.SLATriggeredByWorkableIds,
            SLACorrelationKey: model.SLACorrelationKey,
            ApplicationDefinitionKey: model.ApplicationDefinitionKey,
            GetsRequirementFrom: ModelUtils.serializeShallowEdge(model.GetsRequirementFrom(), 'GetsRequirementFrom'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            InitiallyAssignedTo: ModelUtils.serializeShallowEdge(model.InitiallyAssignedTo(), 'InitiallyAssignedTo'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TaskApplication {
        let clone = new TaskApplication();
        clone.data = _.cloneDeep(this.data);
        clone._GetsRequirementFrom = _.cloneDeep(this._GetsRequirementFrom);
        clone._IsRequiredFor = _.cloneDeep(this._IsRequiredFor);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._InitiallyAssignedTo = _.cloneDeep(this._InitiallyAssignedTo);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITaskApproval {
    Id: string,
    WaitingForIds?: string[],
    OnBeforeCompleteEventActions?: any[],
    Name: string,
    Description: string,
    HowTo?: string,
    ObligationStatus: string,
    AutoComplete: boolean,
    AutoExecute: boolean,
    AutoDefer: boolean,
    DeferAmount?: number,
    DeferAmountUnits?: string,
    DeferBusinessHoursOnly?: boolean,
    DefaultAssignee?: string,
    Waivable: boolean,
    OnCompleteWorkflowSetStatus?: string,
    Webhooks?: string[],
    OnCompleteEventActions?: any[],
    OnUncompleteEventActions?: any[],
    SLATriggeredByWorkableIds?: string[],
    SLACorrelationKey?: string,
    AllowApproveWithConditions: boolean,

    GetsRequirementFrom?: object[],
    IsRequiredFor?: object[],
    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    InitiallyAssignedTo?: object[],
    Enables?: object[]

}

export class TaskApproval extends Task {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "TaskApproval";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof TaskApproval }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get AllowApproveWithConditions(): boolean {
        return this.data.AllowApproveWithConditions;
    }
    set AllowApproveWithConditions(value: boolean) {
        this.data.AllowApproveWithConditions = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'GetsRequirementFrom',
            edgeType: RuleTaskObligationSetsRequirementForTask,
            otherVertexPropertyName: 'SetsRequirementFor',
            otherVertexType: RuleTaskObligation,
        },
        {
            propertyName: 'IsRequiredFor',
            edgeType: PhaseRequiresTask,
            otherVertexPropertyName: 'Requires',
            otherVertexType: Phase,
        },
        {
            propertyName: 'IsTriggeredBy',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'Triggers',
            otherVertexType: Workable,
        },
        {
            propertyName: 'WaitsFor',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'Enables',
            otherVertexType: Workable,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Triggers',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'IsTriggeredBy',
            otherVertexType: Workable,
        },
        {
            propertyName: 'InitiallyAssignedTo',
            edgeType: TaskAssignedAssignable,
            otherVertexPropertyName: 'InitialAssigneeFor',
            otherVertexType: Assignable,
        },
        {
            propertyName: 'Enables',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'WaitsFor',
            otherVertexType: Workable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): TaskApproval {
        return ModelUtils.deserializeVertex<TaskApproval>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: TaskApproval) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            WaitingForIds: model.WaitingForIds,
            OnBeforeCompleteEventActions: model.OnBeforeCompleteEventActions,
            Name: model.Name,
            Description: model.Description,
            HowTo: model.HowTo,
            ObligationStatus: model.ObligationStatus,
            AutoComplete: model.AutoComplete,
            AutoExecute: model.AutoExecute,
            AutoDefer: model.AutoDefer,
            DeferAmount: model.DeferAmount,
            DeferAmountUnits: model.DeferAmountUnits,
            DeferBusinessHoursOnly: model.DeferBusinessHoursOnly,
            DefaultAssignee: model.DefaultAssignee,
            Waivable: model.Waivable,
            OnCompleteWorkflowSetStatus: model.OnCompleteWorkflowSetStatus,
            Webhooks: model.Webhooks,
            OnCompleteEventActions: model.OnCompleteEventActions,
            OnUncompleteEventActions: model.OnUncompleteEventActions,
            SLATriggeredByWorkableIds: model.SLATriggeredByWorkableIds,
            SLACorrelationKey: model.SLACorrelationKey,
            AllowApproveWithConditions: model.AllowApproveWithConditions,
            GetsRequirementFrom: ModelUtils.serializeShallowEdge(model.GetsRequirementFrom(), 'GetsRequirementFrom'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            InitiallyAssignedTo: ModelUtils.serializeShallowEdge(model.InitiallyAssignedTo(), 'InitiallyAssignedTo'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TaskApproval {
        let clone = new TaskApproval();
        clone.data = _.cloneDeep(this.data);
        clone._GetsRequirementFrom = _.cloneDeep(this._GetsRequirementFrom);
        clone._IsRequiredFor = _.cloneDeep(this._IsRequiredFor);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._InitiallyAssignedTo = _.cloneDeep(this._InitiallyAssignedTo);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITaskClearance {
    Id: string,
    WaitingForIds?: string[],
    OnBeforeCompleteEventActions?: any[],
    Name: string,
    Description: string,
    HowTo?: string,
    ObligationStatus: string,
    AutoComplete: boolean,
    AutoExecute: boolean,
    AutoDefer: boolean,
    DeferAmount?: number,
    DeferAmountUnits?: string,
    DeferBusinessHoursOnly?: boolean,
    DefaultAssignee?: string,
    Waivable: boolean,
    OnCompleteWorkflowSetStatus?: string,
    Webhooks?: string[],
    OnCompleteEventActions?: any[],
    OnUncompleteEventActions?: any[],
    SLATriggeredByWorkableIds?: string[],
    SLACorrelationKey?: string,
    InsuredTag: string,
    ProducerTag: string,
    AgentTag: string,
    AgentAccountRoleDefinitionId: string,

    GetsRequirementFrom?: object[],
    IsRequiredFor?: object[],
    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    InitiallyAssignedTo?: object[],
    Enables?: object[]

}

export class TaskClearance extends Task {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "TaskClearance";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof TaskClearance }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get InsuredTag(): string {
        return this.data.InsuredTag;
    }
    set InsuredTag(value: string) {
        this.data.InsuredTag = value;
    }
    get ProducerTag(): string {
        return this.data.ProducerTag;
    }
    set ProducerTag(value: string) {
        this.data.ProducerTag = value;
    }
    get AgentTag(): string {
        return this.data.AgentTag;
    }
    set AgentTag(value: string) {
        this.data.AgentTag = value;
    }
    get AgentAccountRoleDefinitionId(): string {
        return this.data.AgentAccountRoleDefinitionId;
    }
    set AgentAccountRoleDefinitionId(value: string) {
        this.data.AgentAccountRoleDefinitionId = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'GetsRequirementFrom',
            edgeType: RuleTaskObligationSetsRequirementForTask,
            otherVertexPropertyName: 'SetsRequirementFor',
            otherVertexType: RuleTaskObligation,
        },
        {
            propertyName: 'IsRequiredFor',
            edgeType: PhaseRequiresTask,
            otherVertexPropertyName: 'Requires',
            otherVertexType: Phase,
        },
        {
            propertyName: 'IsTriggeredBy',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'Triggers',
            otherVertexType: Workable,
        },
        {
            propertyName: 'WaitsFor',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'Enables',
            otherVertexType: Workable,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Triggers',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'IsTriggeredBy',
            otherVertexType: Workable,
        },
        {
            propertyName: 'InitiallyAssignedTo',
            edgeType: TaskAssignedAssignable,
            otherVertexPropertyName: 'InitialAssigneeFor',
            otherVertexType: Assignable,
        },
        {
            propertyName: 'Enables',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'WaitsFor',
            otherVertexType: Workable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): TaskClearance {
        return ModelUtils.deserializeVertex<TaskClearance>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: TaskClearance) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            WaitingForIds: model.WaitingForIds,
            OnBeforeCompleteEventActions: model.OnBeforeCompleteEventActions,
            Name: model.Name,
            Description: model.Description,
            HowTo: model.HowTo,
            ObligationStatus: model.ObligationStatus,
            AutoComplete: model.AutoComplete,
            AutoExecute: model.AutoExecute,
            AutoDefer: model.AutoDefer,
            DeferAmount: model.DeferAmount,
            DeferAmountUnits: model.DeferAmountUnits,
            DeferBusinessHoursOnly: model.DeferBusinessHoursOnly,
            DefaultAssignee: model.DefaultAssignee,
            Waivable: model.Waivable,
            OnCompleteWorkflowSetStatus: model.OnCompleteWorkflowSetStatus,
            Webhooks: model.Webhooks,
            OnCompleteEventActions: model.OnCompleteEventActions,
            OnUncompleteEventActions: model.OnUncompleteEventActions,
            SLATriggeredByWorkableIds: model.SLATriggeredByWorkableIds,
            SLACorrelationKey: model.SLACorrelationKey,
            InsuredTag: model.InsuredTag,
            ProducerTag: model.ProducerTag,
            AgentTag: model.AgentTag,
            AgentAccountRoleDefinitionId: model.AgentAccountRoleDefinitionId,
            GetsRequirementFrom: ModelUtils.serializeShallowEdge(model.GetsRequirementFrom(), 'GetsRequirementFrom'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            InitiallyAssignedTo: ModelUtils.serializeShallowEdge(model.InitiallyAssignedTo(), 'InitiallyAssignedTo'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TaskClearance {
        let clone = new TaskClearance();
        clone.data = _.cloneDeep(this.data);
        clone._GetsRequirementFrom = _.cloneDeep(this._GetsRequirementFrom);
        clone._IsRequiredFor = _.cloneDeep(this._IsRequiredFor);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._InitiallyAssignedTo = _.cloneDeep(this._InitiallyAssignedTo);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITaskCorrespondence {
    Id: string,
    WaitingForIds?: string[],
    OnBeforeCompleteEventActions?: any[],
    Name: string,
    Description: string,
    HowTo?: string,
    ObligationStatus: string,
    AutoComplete: boolean,
    AutoExecute: boolean,
    AutoDefer: boolean,
    DeferAmount?: number,
    DeferAmountUnits?: string,
    DeferBusinessHoursOnly?: boolean,
    DefaultAssignee?: string,
    Waivable: boolean,
    OnCompleteWorkflowSetStatus?: string,
    Webhooks?: string[],
    OnCompleteEventActions?: any[],
    OnUncompleteEventActions?: any[],
    SLATriggeredByWorkableIds?: string[],
    SLACorrelationKey?: string,
    AllowRecipientEditing: boolean,
    CorrespondenceType: string,
    Preferences?: string[],

    GetsRequirementFrom?: object[],
    IsRequiredFor?: object[],
    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    InitiallyAssignedTo?: object[],
    Attaches?: object[],
    DeliversAccount?: object[],
    DeliversEmail?: object[],
    MailTo?: object[],
    Messages?: object[],
    ParameterSubstitutes?: object[],
    Enables?: object[]

}

export class TaskCorrespondence extends Task {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "TaskCorrespondence";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof TaskCorrespondence }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get AllowRecipientEditing(): boolean {
        return this.data.AllowRecipientEditing;
    }
    set AllowRecipientEditing(value: boolean) {
        this.data.AllowRecipientEditing = value;
    }
    get CorrespondenceType(): string {
        return this.data.CorrespondenceType;
    }
    set CorrespondenceType(value: string) {
        this.data.CorrespondenceType = value;
    }
    get Preferences(): string[] {
        return this.data.Preferences;
    }
    set Preferences(value: string[]) {
        this.data.Preferences = value;
    }

    // Relationships

    // Relationship Attaches, returns DocumentCategory TaskCorrespondenceAttachesDocumentCategory[]
    private __Attaches: TaskCorrespondenceAttachesDocumentCategory[];
    Attaches(_context?: BaseDataContext): TaskCorrespondenceAttachesDocumentCategory[] {
        if (this.__Attaches)
            return this.__Attaches;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Attaches), (id) => context.get(id) as TaskCorrespondenceAttachesDocumentCategory);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setAttaches(values: TaskCorrespondenceAttachesDocumentCategory[]) {
         if (this.Context != null)
             throw Error;

        this.__Attaches = values;
     }
    get _Attaches(): Set<string> {
        if (!this._relationships.has("Attaches"))
            this._relationships.set("Attaches", new Set<string>());

        return this._relationships.get("Attaches");
    }
    set _Attaches(values: Set<string>) {
        this._relationships.set("Attaches", values);
    }

    // Relationship DeliversAccount, returns AccountRole TaskCorrespondenceDeliversAccountRole[]
    private __DeliversAccount: TaskCorrespondenceDeliversAccountRole[];
    DeliversAccount(_context?: BaseDataContext): TaskCorrespondenceDeliversAccountRole[] {
        if (this.__DeliversAccount)
            return this.__DeliversAccount;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._DeliversAccount), (id) => context.get(id) as TaskCorrespondenceDeliversAccountRole);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setDeliversAccount(values: TaskCorrespondenceDeliversAccountRole[]) {
         if (this.Context != null)
             throw Error;

        this.__DeliversAccount = values;
     }
    get _DeliversAccount(): Set<string> {
        if (!this._relationships.has("DeliversAccount"))
            this._relationships.set("DeliversAccount", new Set<string>());

        return this._relationships.get("DeliversAccount");
    }
    set _DeliversAccount(values: Set<string>) {
        this._relationships.set("DeliversAccount", values);
    }

    // Relationship DeliversEmail, returns DataPointEmail TaskCorrespondenceDeliversDataPointEmail[]
    private __DeliversEmail: TaskCorrespondenceDeliversDataPointEmail[];
    DeliversEmail(_context?: BaseDataContext): TaskCorrespondenceDeliversDataPointEmail[] {
        if (this.__DeliversEmail)
            return this.__DeliversEmail;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._DeliversEmail), (id) => context.get(id) as TaskCorrespondenceDeliversDataPointEmail);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setDeliversEmail(values: TaskCorrespondenceDeliversDataPointEmail[]) {
         if (this.Context != null)
             throw Error;

        this.__DeliversEmail = values;
     }
    get _DeliversEmail(): Set<string> {
        if (!this._relationships.has("DeliversEmail"))
            this._relationships.set("DeliversEmail", new Set<string>());

        return this._relationships.get("DeliversEmail");
    }
    set _DeliversEmail(values: Set<string>) {
        this._relationships.set("DeliversEmail", values);
    }

    // Relationship MailTo, returns DataGroup TaskCorrespondenceMailToDataGroup[]
    private __MailTo: TaskCorrespondenceMailToDataGroup[];
    MailTo(_context?: BaseDataContext): TaskCorrespondenceMailToDataGroup[] {
        if (this.__MailTo)
            return this.__MailTo;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._MailTo), (id) => context.get(id) as TaskCorrespondenceMailToDataGroup);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setMailTo(values: TaskCorrespondenceMailToDataGroup[]) {
         if (this.Context != null)
             throw Error;

        this.__MailTo = values;
     }
    get _MailTo(): Set<string> {
        if (!this._relationships.has("MailTo"))
            this._relationships.set("MailTo", new Set<string>());

        return this._relationships.get("MailTo");
    }
    set _MailTo(values: Set<string>) {
        this._relationships.set("MailTo", values);
    }

    // Relationship Messages, returns EmailTemplate TaskCorrespondenceMessagesEmailTemplate[]
    private __Messages: TaskCorrespondenceMessagesEmailTemplate[];
    Messages(_context?: BaseDataContext): TaskCorrespondenceMessagesEmailTemplate[] {
        if (this.__Messages)
            return this.__Messages;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Messages), (id) => context.get(id) as TaskCorrespondenceMessagesEmailTemplate);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setMessages(values: TaskCorrespondenceMessagesEmailTemplate[]) {
         if (this.Context != null)
             throw Error;

        this.__Messages = values;
     }
    get _Messages(): Set<string> {
        if (!this._relationships.has("Messages"))
            this._relationships.set("Messages", new Set<string>());

        return this._relationships.get("Messages");
    }
    set _Messages(values: Set<string>) {
        this._relationships.set("Messages", values);
    }

    // Relationship ParameterSubstitutes, returns DataPoint TaskCorrespondenceParameterSubstitutesDataPoint[]
    private __ParameterSubstitutes: TaskCorrespondenceParameterSubstitutesDataPoint[];
    ParameterSubstitutes(_context?: BaseDataContext): TaskCorrespondenceParameterSubstitutesDataPoint[] {
        if (this.__ParameterSubstitutes)
            return this.__ParameterSubstitutes;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._ParameterSubstitutes), (id) => context.get(id) as TaskCorrespondenceParameterSubstitutesDataPoint);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setParameterSubstitutes(values: TaskCorrespondenceParameterSubstitutesDataPoint[]) {
         if (this.Context != null)
             throw Error;

        this.__ParameterSubstitutes = values;
     }
    get _ParameterSubstitutes(): Set<string> {
        if (!this._relationships.has("ParameterSubstitutes"))
            this._relationships.set("ParameterSubstitutes", new Set<string>());

        return this._relationships.get("ParameterSubstitutes");
    }
    set _ParameterSubstitutes(values: Set<string>) {
        this._relationships.set("ParameterSubstitutes", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'GetsRequirementFrom',
            edgeType: RuleTaskObligationSetsRequirementForTask,
            otherVertexPropertyName: 'SetsRequirementFor',
            otherVertexType: RuleTaskObligation,
        },
        {
            propertyName: 'IsRequiredFor',
            edgeType: PhaseRequiresTask,
            otherVertexPropertyName: 'Requires',
            otherVertexType: Phase,
        },
        {
            propertyName: 'IsTriggeredBy',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'Triggers',
            otherVertexType: Workable,
        },
        {
            propertyName: 'WaitsFor',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'Enables',
            otherVertexType: Workable,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Triggers',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'IsTriggeredBy',
            otherVertexType: Workable,
        },
        {
            propertyName: 'InitiallyAssignedTo',
            edgeType: TaskAssignedAssignable,
            otherVertexPropertyName: 'InitialAssigneeFor',
            otherVertexType: Assignable,
        },
        {
            propertyName: 'Attaches',
            edgeType: TaskCorrespondenceAttachesDocumentCategory,
            otherVertexPropertyName: 'AttachedBy',
            otherVertexType: DocumentCategory,
        },
        {
            propertyName: 'DeliversAccount',
            edgeType: TaskCorrespondenceDeliversAccountRole,
            otherVertexPropertyName: 'DeliveredBy',
            otherVertexType: AccountRole,
        },
        {
            propertyName: 'DeliversEmail',
            edgeType: TaskCorrespondenceDeliversDataPointEmail,
            otherVertexPropertyName: 'DeliveredBy',
            otherVertexType: DataPointEmail,
        },
        {
            propertyName: 'MailTo',
            edgeType: TaskCorrespondenceMailToDataGroup,
            otherVertexPropertyName: 'MailBy',
            otherVertexType: DataGroup,
        },
        {
            propertyName: 'Messages',
            edgeType: TaskCorrespondenceMessagesEmailTemplate,
            otherVertexPropertyName: 'MessagedBy',
            otherVertexType: EmailTemplate,
        },
        {
            propertyName: 'ParameterSubstitutes',
            edgeType: TaskCorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutedBy',
            otherVertexType: DataPoint,
        },
        {
            propertyName: 'Enables',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'WaitsFor',
            otherVertexType: Workable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): TaskCorrespondence {
        return ModelUtils.deserializeVertex<TaskCorrespondence>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: TaskCorrespondence) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            WaitingForIds: model.WaitingForIds,
            OnBeforeCompleteEventActions: model.OnBeforeCompleteEventActions,
            Name: model.Name,
            Description: model.Description,
            HowTo: model.HowTo,
            ObligationStatus: model.ObligationStatus,
            AutoComplete: model.AutoComplete,
            AutoExecute: model.AutoExecute,
            AutoDefer: model.AutoDefer,
            DeferAmount: model.DeferAmount,
            DeferAmountUnits: model.DeferAmountUnits,
            DeferBusinessHoursOnly: model.DeferBusinessHoursOnly,
            DefaultAssignee: model.DefaultAssignee,
            Waivable: model.Waivable,
            OnCompleteWorkflowSetStatus: model.OnCompleteWorkflowSetStatus,
            Webhooks: model.Webhooks,
            OnCompleteEventActions: model.OnCompleteEventActions,
            OnUncompleteEventActions: model.OnUncompleteEventActions,
            SLATriggeredByWorkableIds: model.SLATriggeredByWorkableIds,
            SLACorrelationKey: model.SLACorrelationKey,
            AllowRecipientEditing: model.AllowRecipientEditing,
            CorrespondenceType: model.CorrespondenceType,
            Preferences: model.Preferences,
            GetsRequirementFrom: ModelUtils.serializeShallowEdge(model.GetsRequirementFrom(), 'GetsRequirementFrom'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            InitiallyAssignedTo: ModelUtils.serializeShallowEdge(model.InitiallyAssignedTo(), 'InitiallyAssignedTo'),
            Attaches: ModelUtils.serializeShallowEdge(model.Attaches(), 'Attaches'),
            DeliversAccount: ModelUtils.serializeShallowEdge(model.DeliversAccount(), 'DeliversAccount'),
            DeliversEmail: ModelUtils.serializeShallowEdge(model.DeliversEmail(), 'DeliversEmail'),
            MailTo: ModelUtils.serializeShallowEdge(model.MailTo(), 'MailTo'),
            Messages: ModelUtils.serializeShallowEdge(model.Messages(), 'Messages'),
            ParameterSubstitutes: ModelUtils.serializeShallowEdge(model.ParameterSubstitutes(), 'ParameterSubstitutes'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TaskCorrespondence {
        let clone = new TaskCorrespondence();
        clone.data = _.cloneDeep(this.data);
        clone._GetsRequirementFrom = _.cloneDeep(this._GetsRequirementFrom);
        clone._IsRequiredFor = _.cloneDeep(this._IsRequiredFor);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._InitiallyAssignedTo = _.cloneDeep(this._InitiallyAssignedTo);
        clone._Attaches = _.cloneDeep(this._Attaches);
        clone._DeliversAccount = _.cloneDeep(this._DeliversAccount);
        clone._DeliversEmail = _.cloneDeep(this._DeliversEmail);
        clone._MailTo = _.cloneDeep(this._MailTo);
        clone._Messages = _.cloneDeep(this._Messages);
        clone._ParameterSubstitutes = _.cloneDeep(this._ParameterSubstitutes);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITaskDocumentGeneration {
    Id: string,
    WaitingForIds?: string[],
    OnBeforeCompleteEventActions?: any[],
    Name: string,
    Description: string,
    HowTo?: string,
    ObligationStatus: string,
    AutoComplete: boolean,
    AutoExecute: boolean,
    AutoDefer: boolean,
    DeferAmount?: number,
    DeferAmountUnits?: string,
    DeferBusinessHoursOnly?: boolean,
    DefaultAssignee?: string,
    Waivable: boolean,
    OnCompleteWorkflowSetStatus?: string,
    Webhooks?: string[],
    OnCompleteEventActions?: any[],
    OnUncompleteEventActions?: any[],
    SLATriggeredByWorkableIds?: string[],
    SLACorrelationKey?: string,
    DocumentCategory?: string,
    ReplaceExisting: boolean,
    DefaultDocumentDescription?: string,
    Tags?: string[],

    GetsRequirementFrom?: object[],
    IsRequiredFor?: object[],
    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    InitiallyAssignedTo?: object[],
    Enables?: object[]

}

export class TaskDocumentGeneration extends Task {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "TaskDocumentGeneration";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof TaskDocumentGeneration }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get DocumentCategory(): string {
        return this.data.DocumentCategory;
    }
    set DocumentCategory(value: string) {
        this.data.DocumentCategory = value;
    }
    get ReplaceExisting(): boolean {
        return this.data.ReplaceExisting;
    }
    set ReplaceExisting(value: boolean) {
        this.data.ReplaceExisting = value;
    }
    get DefaultDocumentDescription(): string {
        return this.data.DefaultDocumentDescription;
    }
    set DefaultDocumentDescription(value: string) {
        this.data.DefaultDocumentDescription = value;
    }
    get Tags(): string[] {
        return this.data.Tags;
    }
    set Tags(value: string[]) {
        this.data.Tags = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'GetsRequirementFrom',
            edgeType: RuleTaskObligationSetsRequirementForTask,
            otherVertexPropertyName: 'SetsRequirementFor',
            otherVertexType: RuleTaskObligation,
        },
        {
            propertyName: 'IsRequiredFor',
            edgeType: PhaseRequiresTask,
            otherVertexPropertyName: 'Requires',
            otherVertexType: Phase,
        },
        {
            propertyName: 'IsTriggeredBy',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'Triggers',
            otherVertexType: Workable,
        },
        {
            propertyName: 'WaitsFor',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'Enables',
            otherVertexType: Workable,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Triggers',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'IsTriggeredBy',
            otherVertexType: Workable,
        },
        {
            propertyName: 'InitiallyAssignedTo',
            edgeType: TaskAssignedAssignable,
            otherVertexPropertyName: 'InitialAssigneeFor',
            otherVertexType: Assignable,
        },
        {
            propertyName: 'Enables',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'WaitsFor',
            otherVertexType: Workable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): TaskDocumentGeneration {
        return ModelUtils.deserializeVertex<TaskDocumentGeneration>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: TaskDocumentGeneration) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            WaitingForIds: model.WaitingForIds,
            OnBeforeCompleteEventActions: model.OnBeforeCompleteEventActions,
            Name: model.Name,
            Description: model.Description,
            HowTo: model.HowTo,
            ObligationStatus: model.ObligationStatus,
            AutoComplete: model.AutoComplete,
            AutoExecute: model.AutoExecute,
            AutoDefer: model.AutoDefer,
            DeferAmount: model.DeferAmount,
            DeferAmountUnits: model.DeferAmountUnits,
            DeferBusinessHoursOnly: model.DeferBusinessHoursOnly,
            DefaultAssignee: model.DefaultAssignee,
            Waivable: model.Waivable,
            OnCompleteWorkflowSetStatus: model.OnCompleteWorkflowSetStatus,
            Webhooks: model.Webhooks,
            OnCompleteEventActions: model.OnCompleteEventActions,
            OnUncompleteEventActions: model.OnUncompleteEventActions,
            SLATriggeredByWorkableIds: model.SLATriggeredByWorkableIds,
            SLACorrelationKey: model.SLACorrelationKey,
            DocumentCategory: model.DocumentCategory,
            ReplaceExisting: model.ReplaceExisting,
            DefaultDocumentDescription: model.DefaultDocumentDescription,
            Tags: model.Tags,
            GetsRequirementFrom: ModelUtils.serializeShallowEdge(model.GetsRequirementFrom(), 'GetsRequirementFrom'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            InitiallyAssignedTo: ModelUtils.serializeShallowEdge(model.InitiallyAssignedTo(), 'InitiallyAssignedTo'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TaskDocumentGeneration {
        let clone = new TaskDocumentGeneration();
        clone.data = _.cloneDeep(this.data);
        clone._GetsRequirementFrom = _.cloneDeep(this._GetsRequirementFrom);
        clone._IsRequiredFor = _.cloneDeep(this._IsRequiredFor);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._InitiallyAssignedTo = _.cloneDeep(this._InitiallyAssignedTo);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITaskFileRequirement {
    Id: string,
    WaitingForIds?: string[],
    OnBeforeCompleteEventActions?: any[],
    Name: string,
    Description: string,
    HowTo?: string,
    ObligationStatus: string,
    AutoComplete: boolean,
    AutoExecute: boolean,
    AutoDefer: boolean,
    DeferAmount?: number,
    DeferAmountUnits?: string,
    DeferBusinessHoursOnly?: boolean,
    DefaultAssignee?: string,
    Waivable: boolean,
    OnCompleteWorkflowSetStatus?: string,
    Webhooks?: string[],
    OnCompleteEventActions?: any[],
    OnUncompleteEventActions?: any[],
    SLATriggeredByWorkableIds?: string[],
    SLACorrelationKey?: string,
    RequiredCategoryId: string,
    AcceptPreExistingDocument: boolean,
    EnforceDocumentAge: boolean,
    DocumentAgeValue?: number,
    DocumentAgeUnit?: string,
    DefaultTags?: string[],
    ExtractData?: boolean,
    ClearOutDocumentsForCopyToQuote?: boolean,

    GetsRequirementFrom?: object[],
    IsRequiredFor?: object[],
    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    InitiallyAssignedTo?: object[],
    Enables?: object[]

}

export class TaskFileRequirement extends Task {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "TaskFileRequirement";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof TaskFileRequirement }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get RequiredCategoryId(): string {
        return this.data.RequiredCategoryId;
    }
    set RequiredCategoryId(value: string) {
        this.data.RequiredCategoryId = value;
    }
    get AcceptPreExistingDocument(): boolean {
        return this.data.AcceptPreExistingDocument;
    }
    set AcceptPreExistingDocument(value: boolean) {
        this.data.AcceptPreExistingDocument = value;
    }
    get EnforceDocumentAge(): boolean {
        return this.data.EnforceDocumentAge;
    }
    set EnforceDocumentAge(value: boolean) {
        this.data.EnforceDocumentAge = value;
    }
    get DocumentAgeValue(): number {
        return this.data.DocumentAgeValue;
    }
    set DocumentAgeValue(value: number) {
        this.data.DocumentAgeValue = value;
    }
    get DocumentAgeUnit(): string {
        return this.data.DocumentAgeUnit;
    }
    set DocumentAgeUnit(value: string) {
        this.data.DocumentAgeUnit = value;
    }
    get DefaultTags(): string[] {
        return this.data.DefaultTags;
    }
    set DefaultTags(value: string[]) {
        this.data.DefaultTags = value;
    }
    get ExtractData(): boolean {
        return this.data.ExtractData;
    }
    set ExtractData(value: boolean) {
        this.data.ExtractData = value;
    }
    get ClearOutDocumentsForCopyToQuote(): boolean {
        return this.data.ClearOutDocumentsForCopyToQuote;
    }
    set ClearOutDocumentsForCopyToQuote(value: boolean) {
        this.data.ClearOutDocumentsForCopyToQuote = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'GetsRequirementFrom',
            edgeType: RuleTaskObligationSetsRequirementForTask,
            otherVertexPropertyName: 'SetsRequirementFor',
            otherVertexType: RuleTaskObligation,
        },
        {
            propertyName: 'IsRequiredFor',
            edgeType: PhaseRequiresTask,
            otherVertexPropertyName: 'Requires',
            otherVertexType: Phase,
        },
        {
            propertyName: 'IsTriggeredBy',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'Triggers',
            otherVertexType: Workable,
        },
        {
            propertyName: 'WaitsFor',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'Enables',
            otherVertexType: Workable,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Triggers',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'IsTriggeredBy',
            otherVertexType: Workable,
        },
        {
            propertyName: 'InitiallyAssignedTo',
            edgeType: TaskAssignedAssignable,
            otherVertexPropertyName: 'InitialAssigneeFor',
            otherVertexType: Assignable,
        },
        {
            propertyName: 'Enables',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'WaitsFor',
            otherVertexType: Workable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): TaskFileRequirement {
        return ModelUtils.deserializeVertex<TaskFileRequirement>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: TaskFileRequirement) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            WaitingForIds: model.WaitingForIds,
            OnBeforeCompleteEventActions: model.OnBeforeCompleteEventActions,
            Name: model.Name,
            Description: model.Description,
            HowTo: model.HowTo,
            ObligationStatus: model.ObligationStatus,
            AutoComplete: model.AutoComplete,
            AutoExecute: model.AutoExecute,
            AutoDefer: model.AutoDefer,
            DeferAmount: model.DeferAmount,
            DeferAmountUnits: model.DeferAmountUnits,
            DeferBusinessHoursOnly: model.DeferBusinessHoursOnly,
            DefaultAssignee: model.DefaultAssignee,
            Waivable: model.Waivable,
            OnCompleteWorkflowSetStatus: model.OnCompleteWorkflowSetStatus,
            Webhooks: model.Webhooks,
            OnCompleteEventActions: model.OnCompleteEventActions,
            OnUncompleteEventActions: model.OnUncompleteEventActions,
            SLATriggeredByWorkableIds: model.SLATriggeredByWorkableIds,
            SLACorrelationKey: model.SLACorrelationKey,
            RequiredCategoryId: model.RequiredCategoryId,
            AcceptPreExistingDocument: model.AcceptPreExistingDocument,
            EnforceDocumentAge: model.EnforceDocumentAge,
            DocumentAgeValue: model.DocumentAgeValue,
            DocumentAgeUnit: model.DocumentAgeUnit,
            DefaultTags: model.DefaultTags,
            ExtractData: model.ExtractData,
            ClearOutDocumentsForCopyToQuote: model.ClearOutDocumentsForCopyToQuote,
            GetsRequirementFrom: ModelUtils.serializeShallowEdge(model.GetsRequirementFrom(), 'GetsRequirementFrom'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            InitiallyAssignedTo: ModelUtils.serializeShallowEdge(model.InitiallyAssignedTo(), 'InitiallyAssignedTo'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TaskFileRequirement {
        let clone = new TaskFileRequirement();
        clone.data = _.cloneDeep(this.data);
        clone._GetsRequirementFrom = _.cloneDeep(this._GetsRequirementFrom);
        clone._IsRequiredFor = _.cloneDeep(this._IsRequiredFor);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._InitiallyAssignedTo = _.cloneDeep(this._InitiallyAssignedTo);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITaskManual {
    Id: string,
    WaitingForIds?: string[],
    OnBeforeCompleteEventActions?: any[],
    Name: string,
    Description: string,
    HowTo?: string,
    ObligationStatus: string,
    AutoComplete: boolean,
    AutoExecute: boolean,
    AutoDefer: boolean,
    DeferAmount?: number,
    DeferAmountUnits?: string,
    DeferBusinessHoursOnly?: boolean,
    DefaultAssignee?: string,
    Waivable: boolean,
    OnCompleteWorkflowSetStatus?: string,
    Webhooks?: string[],
    OnCompleteEventActions?: any[],
    OnUncompleteEventActions?: any[],
    SLATriggeredByWorkableIds?: string[],
    SLACorrelationKey?: string,

    GetsRequirementFrom?: object[],
    IsRequiredFor?: object[],
    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    InitiallyAssignedTo?: object[],
    Enables?: object[]

}

export class TaskManual extends Task {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "TaskManual";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof TaskManual }[] = [

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'GetsRequirementFrom',
            edgeType: RuleTaskObligationSetsRequirementForTask,
            otherVertexPropertyName: 'SetsRequirementFor',
            otherVertexType: RuleTaskObligation,
        },
        {
            propertyName: 'IsRequiredFor',
            edgeType: PhaseRequiresTask,
            otherVertexPropertyName: 'Requires',
            otherVertexType: Phase,
        },
        {
            propertyName: 'IsTriggeredBy',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'Triggers',
            otherVertexType: Workable,
        },
        {
            propertyName: 'WaitsFor',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'Enables',
            otherVertexType: Workable,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Triggers',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'IsTriggeredBy',
            otherVertexType: Workable,
        },
        {
            propertyName: 'InitiallyAssignedTo',
            edgeType: TaskAssignedAssignable,
            otherVertexPropertyName: 'InitialAssigneeFor',
            otherVertexType: Assignable,
        },
        {
            propertyName: 'Enables',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'WaitsFor',
            otherVertexType: Workable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): TaskManual {
        return ModelUtils.deserializeVertex<TaskManual>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: TaskManual) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            WaitingForIds: model.WaitingForIds,
            OnBeforeCompleteEventActions: model.OnBeforeCompleteEventActions,
            Name: model.Name,
            Description: model.Description,
            HowTo: model.HowTo,
            ObligationStatus: model.ObligationStatus,
            AutoComplete: model.AutoComplete,
            AutoExecute: model.AutoExecute,
            AutoDefer: model.AutoDefer,
            DeferAmount: model.DeferAmount,
            DeferAmountUnits: model.DeferAmountUnits,
            DeferBusinessHoursOnly: model.DeferBusinessHoursOnly,
            DefaultAssignee: model.DefaultAssignee,
            Waivable: model.Waivable,
            OnCompleteWorkflowSetStatus: model.OnCompleteWorkflowSetStatus,
            Webhooks: model.Webhooks,
            OnCompleteEventActions: model.OnCompleteEventActions,
            OnUncompleteEventActions: model.OnUncompleteEventActions,
            SLATriggeredByWorkableIds: model.SLATriggeredByWorkableIds,
            SLACorrelationKey: model.SLACorrelationKey,
            GetsRequirementFrom: ModelUtils.serializeShallowEdge(model.GetsRequirementFrom(), 'GetsRequirementFrom'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            InitiallyAssignedTo: ModelUtils.serializeShallowEdge(model.InitiallyAssignedTo(), 'InitiallyAssignedTo'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TaskManual {
        let clone = new TaskManual();
        clone.data = _.cloneDeep(this.data);
        clone._GetsRequirementFrom = _.cloneDeep(this._GetsRequirementFrom);
        clone._IsRequiredFor = _.cloneDeep(this._IsRequiredFor);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._InitiallyAssignedTo = _.cloneDeep(this._InitiallyAssignedTo);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITaskPolicyDates {
    Id: string,
    WaitingForIds?: string[],
    OnBeforeCompleteEventActions?: any[],
    Name: string,
    Description: string,
    HowTo?: string,
    ObligationStatus: string,
    AutoComplete: boolean,
    AutoExecute: boolean,
    AutoDefer: boolean,
    DeferAmount?: number,
    DeferAmountUnits?: string,
    DeferBusinessHoursOnly?: boolean,
    DefaultAssignee?: string,
    Waivable: boolean,
    OnCompleteWorkflowSetStatus?: string,
    Webhooks?: string[],
    OnCompleteEventActions?: any[],
    OnUncompleteEventActions?: any[],
    SLATriggeredByWorkableIds?: string[],
    SLACorrelationKey?: string,
    AllowChangingEffectiveDates: boolean,
    AllowChangingExpirationDates: boolean,

    GetsRequirementFrom?: object[],
    IsRequiredFor?: object[],
    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    InitiallyAssignedTo?: object[],
    Enables?: object[]

}

export class TaskPolicyDates extends Task {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "TaskPolicyDates";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof TaskPolicyDates }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get AllowChangingEffectiveDates(): boolean {
        return this.data.AllowChangingEffectiveDates;
    }
    set AllowChangingEffectiveDates(value: boolean) {
        this.data.AllowChangingEffectiveDates = value;
    }
    get AllowChangingExpirationDates(): boolean {
        return this.data.AllowChangingExpirationDates;
    }
    set AllowChangingExpirationDates(value: boolean) {
        this.data.AllowChangingExpirationDates = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'GetsRequirementFrom',
            edgeType: RuleTaskObligationSetsRequirementForTask,
            otherVertexPropertyName: 'SetsRequirementFor',
            otherVertexType: RuleTaskObligation,
        },
        {
            propertyName: 'IsRequiredFor',
            edgeType: PhaseRequiresTask,
            otherVertexPropertyName: 'Requires',
            otherVertexType: Phase,
        },
        {
            propertyName: 'IsTriggeredBy',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'Triggers',
            otherVertexType: Workable,
        },
        {
            propertyName: 'WaitsFor',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'Enables',
            otherVertexType: Workable,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Triggers',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'IsTriggeredBy',
            otherVertexType: Workable,
        },
        {
            propertyName: 'InitiallyAssignedTo',
            edgeType: TaskAssignedAssignable,
            otherVertexPropertyName: 'InitialAssigneeFor',
            otherVertexType: Assignable,
        },
        {
            propertyName: 'Enables',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'WaitsFor',
            otherVertexType: Workable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): TaskPolicyDates {
        return ModelUtils.deserializeVertex<TaskPolicyDates>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: TaskPolicyDates) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            WaitingForIds: model.WaitingForIds,
            OnBeforeCompleteEventActions: model.OnBeforeCompleteEventActions,
            Name: model.Name,
            Description: model.Description,
            HowTo: model.HowTo,
            ObligationStatus: model.ObligationStatus,
            AutoComplete: model.AutoComplete,
            AutoExecute: model.AutoExecute,
            AutoDefer: model.AutoDefer,
            DeferAmount: model.DeferAmount,
            DeferAmountUnits: model.DeferAmountUnits,
            DeferBusinessHoursOnly: model.DeferBusinessHoursOnly,
            DefaultAssignee: model.DefaultAssignee,
            Waivable: model.Waivable,
            OnCompleteWorkflowSetStatus: model.OnCompleteWorkflowSetStatus,
            Webhooks: model.Webhooks,
            OnCompleteEventActions: model.OnCompleteEventActions,
            OnUncompleteEventActions: model.OnUncompleteEventActions,
            SLATriggeredByWorkableIds: model.SLATriggeredByWorkableIds,
            SLACorrelationKey: model.SLACorrelationKey,
            AllowChangingEffectiveDates: model.AllowChangingEffectiveDates,
            AllowChangingExpirationDates: model.AllowChangingExpirationDates,
            GetsRequirementFrom: ModelUtils.serializeShallowEdge(model.GetsRequirementFrom(), 'GetsRequirementFrom'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            InitiallyAssignedTo: ModelUtils.serializeShallowEdge(model.InitiallyAssignedTo(), 'InitiallyAssignedTo'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TaskPolicyDates {
        let clone = new TaskPolicyDates();
        clone.data = _.cloneDeep(this.data);
        clone._GetsRequirementFrom = _.cloneDeep(this._GetsRequirementFrom);
        clone._IsRequiredFor = _.cloneDeep(this._IsRequiredFor);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._InitiallyAssignedTo = _.cloneDeep(this._InitiallyAssignedTo);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITaskProducts {
    Id: string,
    WaitingForIds?: string[],
    OnBeforeCompleteEventActions?: any[],
    Name: string,
    Description: string,
    HowTo?: string,
    ObligationStatus: string,
    AutoComplete: boolean,
    AutoExecute: boolean,
    AutoDefer: boolean,
    DeferAmount?: number,
    DeferAmountUnits?: string,
    DeferBusinessHoursOnly?: boolean,
    DefaultAssignee?: string,
    Waivable: boolean,
    OnCompleteWorkflowSetStatus?: string,
    Webhooks?: string[],
    OnCompleteEventActions?: any[],
    OnUncompleteEventActions?: any[],
    SLATriggeredByWorkableIds?: string[],
    SLACorrelationKey?: string,
    AddType?: string,
    AddTransactionId?: string,
    AddAllOtherTransactionId?: string,
    ModifyTransactionId?: string,
    RemoveTransactionId?: string,
    ProductEligibility?: { [index: string]: ActionEligibilityStatus },

    GetsRequirementFrom?: object[],
    IsRequiredFor?: object[],
    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    InitiallyAssignedTo?: object[],
    Enables?: object[]

}

export class TaskProducts extends Task {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "TaskProducts";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof TaskProducts }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get AddType(): string {
        return this.data.AddType;
    }
    set AddType(value: string) {
        this.data.AddType = value;
    }
    get AddTransactionId(): string {
        return this.data.AddTransactionId;
    }
    set AddTransactionId(value: string) {
        this.data.AddTransactionId = value;
    }
    get AddAllOtherTransactionId(): string {
        return this.data.AddAllOtherTransactionId;
    }
    set AddAllOtherTransactionId(value: string) {
        this.data.AddAllOtherTransactionId = value;
    }
    get ModifyTransactionId(): string {
        return this.data.ModifyTransactionId;
    }
    set ModifyTransactionId(value: string) {
        this.data.ModifyTransactionId = value;
    }
    get RemoveTransactionId(): string {
        return this.data.RemoveTransactionId;
    }
    set RemoveTransactionId(value: string) {
        this.data.RemoveTransactionId = value;
    }
    get ProductEligibility(): { [index: string]: ActionEligibilityStatus } {
        return this.data.ProductEligibility;
    }
    set ProductEligibility(value: { [index: string]: ActionEligibilityStatus }) {
        this.data.ProductEligibility = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'GetsRequirementFrom',
            edgeType: RuleTaskObligationSetsRequirementForTask,
            otherVertexPropertyName: 'SetsRequirementFor',
            otherVertexType: RuleTaskObligation,
        },
        {
            propertyName: 'IsRequiredFor',
            edgeType: PhaseRequiresTask,
            otherVertexPropertyName: 'Requires',
            otherVertexType: Phase,
        },
        {
            propertyName: 'IsTriggeredBy',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'Triggers',
            otherVertexType: Workable,
        },
        {
            propertyName: 'WaitsFor',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'Enables',
            otherVertexType: Workable,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Triggers',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'IsTriggeredBy',
            otherVertexType: Workable,
        },
        {
            propertyName: 'InitiallyAssignedTo',
            edgeType: TaskAssignedAssignable,
            otherVertexPropertyName: 'InitialAssigneeFor',
            otherVertexType: Assignable,
        },
        {
            propertyName: 'Enables',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'WaitsFor',
            otherVertexType: Workable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): TaskProducts {
        return ModelUtils.deserializeVertex<TaskProducts>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: TaskProducts) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            WaitingForIds: model.WaitingForIds,
            OnBeforeCompleteEventActions: model.OnBeforeCompleteEventActions,
            Name: model.Name,
            Description: model.Description,
            HowTo: model.HowTo,
            ObligationStatus: model.ObligationStatus,
            AutoComplete: model.AutoComplete,
            AutoExecute: model.AutoExecute,
            AutoDefer: model.AutoDefer,
            DeferAmount: model.DeferAmount,
            DeferAmountUnits: model.DeferAmountUnits,
            DeferBusinessHoursOnly: model.DeferBusinessHoursOnly,
            DefaultAssignee: model.DefaultAssignee,
            Waivable: model.Waivable,
            OnCompleteWorkflowSetStatus: model.OnCompleteWorkflowSetStatus,
            Webhooks: model.Webhooks,
            OnCompleteEventActions: model.OnCompleteEventActions,
            OnUncompleteEventActions: model.OnUncompleteEventActions,
            SLATriggeredByWorkableIds: model.SLATriggeredByWorkableIds,
            SLACorrelationKey: model.SLACorrelationKey,
            AddType: model.AddType,
            AddTransactionId: model.AddTransactionId,
            AddAllOtherTransactionId: model.AddAllOtherTransactionId,
            ModifyTransactionId: model.ModifyTransactionId,
            RemoveTransactionId: model.RemoveTransactionId,
            ProductEligibility: model.ProductEligibility,
            GetsRequirementFrom: ModelUtils.serializeShallowEdge(model.GetsRequirementFrom(), 'GetsRequirementFrom'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            InitiallyAssignedTo: ModelUtils.serializeShallowEdge(model.InitiallyAssignedTo(), 'InitiallyAssignedTo'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TaskProducts {
        let clone = new TaskProducts();
        clone.data = _.cloneDeep(this.data);
        clone._GetsRequirementFrom = _.cloneDeep(this._GetsRequirementFrom);
        clone._IsRequiredFor = _.cloneDeep(this._IsRequiredFor);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._InitiallyAssignedTo = _.cloneDeep(this._InitiallyAssignedTo);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITaskRatingSystem {
    Id: string,
    WaitingForIds?: string[],
    OnBeforeCompleteEventActions?: any[],
    Name: string,
    Description: string,
    HowTo?: string,
    ObligationStatus: string,
    AutoComplete: boolean,
    AutoExecute: boolean,
    AutoDefer: boolean,
    DeferAmount?: number,
    DeferAmountUnits?: string,
    DeferBusinessHoursOnly?: boolean,
    DefaultAssignee?: string,
    Waivable: boolean,
    OnCompleteWorkflowSetStatus?: string,
    Webhooks?: string[],
    OnCompleteEventActions?: any[],
    OnUncompleteEventActions?: any[],
    SLATriggeredByWorkableIds?: string[],
    SLACorrelationKey?: string,
    RatingAction?: string,
    CommitOnSuccess?: boolean,
    GetPaymentPlans: boolean,
    GenerateWorksheets?: boolean,
    WorksheetsCategory?: string,
    WorksheetTags?: string[],
    ReturnPolicyFormsList?: boolean,
    GeneratePolicyForms?: boolean,
    PolicyFormsCategory?: string,
    PolicyFormsTags?: string[],
    FailIfNotRated?: boolean,
    SendAccountInfo?: boolean,
    PolicyRatedStatus?: string,
    Commit?: string,
    Worksheets?: string,
    PolicyForms?: string,

    GetsRequirementFrom?: object[],
    IsRequiredFor?: object[],
    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    InitiallyAssignedTo?: object[],
    Enables?: object[]

}

export class TaskRatingSystem extends Task {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "TaskRatingSystem";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof TaskRatingSystem }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get RatingAction(): string {
        return this.data.RatingAction;
    }
    set RatingAction(value: string) {
        this.data.RatingAction = value;
    }
    get CommitOnSuccess(): boolean {
        return this.data.CommitOnSuccess;
    }
    set CommitOnSuccess(value: boolean) {
        this.data.CommitOnSuccess = value;
    }
    get GetPaymentPlans(): boolean {
        return this.data.GetPaymentPlans;
    }
    set GetPaymentPlans(value: boolean) {
        this.data.GetPaymentPlans = value;
    }
    get GenerateWorksheets(): boolean {
        return this.data.GenerateWorksheets;
    }
    set GenerateWorksheets(value: boolean) {
        this.data.GenerateWorksheets = value;
    }
    get WorksheetsCategory(): string {
        return this.data.WorksheetsCategory;
    }
    set WorksheetsCategory(value: string) {
        this.data.WorksheetsCategory = value;
    }
    get WorksheetTags(): string[] {
        return this.data.WorksheetTags;
    }
    set WorksheetTags(value: string[]) {
        this.data.WorksheetTags = value;
    }
    get ReturnPolicyFormsList(): boolean {
        return this.data.ReturnPolicyFormsList;
    }
    set ReturnPolicyFormsList(value: boolean) {
        this.data.ReturnPolicyFormsList = value;
    }
    get GeneratePolicyForms(): boolean {
        return this.data.GeneratePolicyForms;
    }
    set GeneratePolicyForms(value: boolean) {
        this.data.GeneratePolicyForms = value;
    }
    get PolicyFormsCategory(): string {
        return this.data.PolicyFormsCategory;
    }
    set PolicyFormsCategory(value: string) {
        this.data.PolicyFormsCategory = value;
    }
    get PolicyFormsTags(): string[] {
        return this.data.PolicyFormsTags;
    }
    set PolicyFormsTags(value: string[]) {
        this.data.PolicyFormsTags = value;
    }
    get FailIfNotRated(): boolean {
        return this.data.FailIfNotRated;
    }
    set FailIfNotRated(value: boolean) {
        this.data.FailIfNotRated = value;
    }
    get SendAccountInfo(): boolean {
        return this.data.SendAccountInfo;
    }
    set SendAccountInfo(value: boolean) {
        this.data.SendAccountInfo = value;
    }
    get PolicyRatedStatus(): string {
        return this.data.PolicyRatedStatus;
    }
    set PolicyRatedStatus(value: string) {
        this.data.PolicyRatedStatus = value;
    }
    get Commit(): string {
        return this.data.Commit;
    }
    set Commit(value: string) {
        this.data.Commit = value;
    }
    get Worksheets(): string {
        return this.data.Worksheets;
    }
    set Worksheets(value: string) {
        this.data.Worksheets = value;
    }
    get PolicyForms(): string {
        return this.data.PolicyForms;
    }
    set PolicyForms(value: string) {
        this.data.PolicyForms = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'GetsRequirementFrom',
            edgeType: RuleTaskObligationSetsRequirementForTask,
            otherVertexPropertyName: 'SetsRequirementFor',
            otherVertexType: RuleTaskObligation,
        },
        {
            propertyName: 'IsRequiredFor',
            edgeType: PhaseRequiresTask,
            otherVertexPropertyName: 'Requires',
            otherVertexType: Phase,
        },
        {
            propertyName: 'IsTriggeredBy',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'Triggers',
            otherVertexType: Workable,
        },
        {
            propertyName: 'WaitsFor',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'Enables',
            otherVertexType: Workable,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Triggers',
            edgeType: ServiceLevel,
            otherVertexPropertyName: 'IsTriggeredBy',
            otherVertexType: Workable,
        },
        {
            propertyName: 'InitiallyAssignedTo',
            edgeType: TaskAssignedAssignable,
            otherVertexPropertyName: 'InitialAssigneeFor',
            otherVertexType: Assignable,
        },
        {
            propertyName: 'Enables',
            edgeType: WorkableEnablesWorkable,
            otherVertexPropertyName: 'WaitsFor',
            otherVertexType: Workable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): TaskRatingSystem {
        return ModelUtils.deserializeVertex<TaskRatingSystem>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: TaskRatingSystem) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            WaitingForIds: model.WaitingForIds,
            OnBeforeCompleteEventActions: model.OnBeforeCompleteEventActions,
            Name: model.Name,
            Description: model.Description,
            HowTo: model.HowTo,
            ObligationStatus: model.ObligationStatus,
            AutoComplete: model.AutoComplete,
            AutoExecute: model.AutoExecute,
            AutoDefer: model.AutoDefer,
            DeferAmount: model.DeferAmount,
            DeferAmountUnits: model.DeferAmountUnits,
            DeferBusinessHoursOnly: model.DeferBusinessHoursOnly,
            DefaultAssignee: model.DefaultAssignee,
            Waivable: model.Waivable,
            OnCompleteWorkflowSetStatus: model.OnCompleteWorkflowSetStatus,
            Webhooks: model.Webhooks,
            OnCompleteEventActions: model.OnCompleteEventActions,
            OnUncompleteEventActions: model.OnUncompleteEventActions,
            SLATriggeredByWorkableIds: model.SLATriggeredByWorkableIds,
            SLACorrelationKey: model.SLACorrelationKey,
            RatingAction: model.RatingAction,
            CommitOnSuccess: model.CommitOnSuccess,
            GetPaymentPlans: model.GetPaymentPlans,
            GenerateWorksheets: model.GenerateWorksheets,
            WorksheetsCategory: model.WorksheetsCategory,
            WorksheetTags: model.WorksheetTags,
            ReturnPolicyFormsList: model.ReturnPolicyFormsList,
            GeneratePolicyForms: model.GeneratePolicyForms,
            PolicyFormsCategory: model.PolicyFormsCategory,
            PolicyFormsTags: model.PolicyFormsTags,
            FailIfNotRated: model.FailIfNotRated,
            SendAccountInfo: model.SendAccountInfo,
            PolicyRatedStatus: model.PolicyRatedStatus,
            Commit: model.Commit,
            Worksheets: model.Worksheets,
            PolicyForms: model.PolicyForms,
            GetsRequirementFrom: ModelUtils.serializeShallowEdge(model.GetsRequirementFrom(), 'GetsRequirementFrom'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            InitiallyAssignedTo: ModelUtils.serializeShallowEdge(model.InitiallyAssignedTo(), 'InitiallyAssignedTo'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TaskRatingSystem {
        let clone = new TaskRatingSystem();
        clone.data = _.cloneDeep(this.data);
        clone._GetsRequirementFrom = _.cloneDeep(this._GetsRequirementFrom);
        clone._IsRequiredFor = _.cloneDeep(this._IsRequiredFor);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._InitiallyAssignedTo = _.cloneDeep(this._InitiallyAssignedTo);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITimestampField {
    Id: string,
    DisplayLabel?: string,
    ShowHelp: boolean,
    Help?: string,
    readonly ConditionMet: boolean,
    ExternalId?: string,
    EnableListView: boolean,
    DefaultConditionMet: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    Optional: boolean,
    Options?: any[],
    DefaultContent?: any,
    Access: string,
    PopulatedByDataPointId?: string,
    DisplayWidth?: string,
    RetainDataWhenHidden?: boolean,
    Prefix?: string,
    Suffix?: string,

    IsEnabledBy?: object[],
    IsDisplayedBy?: object[],
    Populates?: object[]

}

export class TimestampField extends Field {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "TimestampField";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof TimestampField }[] = [

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsDisplayedBy',
            edgeType: SectionDisplaysElement,
            otherVertexPropertyName: 'Displays',
            otherVertexType: Section,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Populates',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'IsPopulatedBy',
            otherVertexType: DataPoint,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): TimestampField {
        return ModelUtils.deserializeVertex<TimestampField>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: TimestampField) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            EnableListView: model.EnableListView,
            DefaultConditionMet: model.DefaultConditionMet,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            PopulatedByDataPointId: model.PopulatedByDataPointId,
            DisplayWidth: model.DisplayWidth,
            RetainDataWhenHidden: model.RetainDataWhenHidden,
            Prefix: model.Prefix,
            Suffix: model.Suffix,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsDisplayedBy: ModelUtils.serializeShallowEdge(model.IsDisplayedBy(), 'IsDisplayedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TimestampField {
        let clone = new TimestampField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsDisplayedBy = _.cloneDeep(this._IsDisplayedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IUrlField {
    Id: string,
    DisplayLabel?: string,
    ShowHelp: boolean,
    Help?: string,
    readonly ConditionMet: boolean,
    ExternalId?: string,
    EnableListView: boolean,
    DefaultConditionMet: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    Optional: boolean,
    Options?: any[],
    DefaultContent?: any,
    Access: string,
    PopulatedByDataPointId?: string,
    DisplayWidth?: string,
    RetainDataWhenHidden?: boolean,
    Prefix?: string,
    Suffix?: string,
    ShowUrlInViewOnly?: boolean,

    IsEnabledBy?: object[],
    IsDisplayedBy?: object[],
    Populates?: object[]

}

export class UrlField extends Field {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "UrlField";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof UrlField }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get ShowUrlInViewOnly(): boolean {
        return this.data.ShowUrlInViewOnly;
    }
    set ShowUrlInViewOnly(value: boolean) {
        this.data.ShowUrlInViewOnly = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsDisplayedBy',
            edgeType: SectionDisplaysElement,
            otherVertexPropertyName: 'Displays',
            otherVertexType: Section,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Populates',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'IsPopulatedBy',
            otherVertexType: DataPoint,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): UrlField {
        return ModelUtils.deserializeVertex<UrlField>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: UrlField) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            EnableListView: model.EnableListView,
            DefaultConditionMet: model.DefaultConditionMet,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            PopulatedByDataPointId: model.PopulatedByDataPointId,
            DisplayWidth: model.DisplayWidth,
            RetainDataWhenHidden: model.RetainDataWhenHidden,
            Prefix: model.Prefix,
            Suffix: model.Suffix,
            ShowUrlInViewOnly: model.ShowUrlInViewOnly,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsDisplayedBy: ModelUtils.serializeShallowEdge(model.IsDisplayedBy(), 'IsDisplayedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): UrlField {
        let clone = new UrlField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsDisplayedBy = _.cloneDeep(this._IsDisplayedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IZipcodeField {
    Id: string,
    DisplayLabel?: string,
    ShowHelp: boolean,
    Help?: string,
    readonly ConditionMet: boolean,
    ExternalId?: string,
    EnableListView: boolean,
    DefaultConditionMet: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    Optional: boolean,
    Options?: any[],
    DefaultContent?: any,
    Access: string,
    PopulatedByDataPointId?: string,
    DisplayWidth?: string,
    RetainDataWhenHidden?: boolean,
    Prefix?: string,
    Suffix?: string,

    IsEnabledBy?: object[],
    IsDisplayedBy?: object[],
    Populates?: object[]

}

export class ZipcodeField extends Field {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "ZipcodeField";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof ZipcodeField }[] = [

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsDisplayedBy',
            edgeType: SectionDisplaysElement,
            otherVertexPropertyName: 'Displays',
            otherVertexType: Section,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Populates',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'IsPopulatedBy',
            otherVertexType: DataPoint,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): ZipcodeField {
        return ModelUtils.deserializeVertex<ZipcodeField>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: ZipcodeField) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            EnableListView: model.EnableListView,
            DefaultConditionMet: model.DefaultConditionMet,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            PopulatedByDataPointId: model.PopulatedByDataPointId,
            DisplayWidth: model.DisplayWidth,
            RetainDataWhenHidden: model.RetainDataWhenHidden,
            Prefix: model.Prefix,
            Suffix: model.Suffix,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsDisplayedBy: ModelUtils.serializeShallowEdge(model.IsDisplayedBy(), 'IsDisplayedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): ZipcodeField {
        let clone = new ZipcodeField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsDisplayedBy = _.cloneDeep(this._IsDisplayedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointEmail {
    DataType: string,
    Id: string,
    Name: string,
    Description?: string,
    readonly Optional: boolean,
    Options?: string[],
    DefaultContent?: any,
    RegExPattern?: string,
    ValidationType: string,
    ValidationScript?: string,
    readonly IsPredefined: boolean,
    Tag?: string,
    IsCalculated: boolean,
    RateAffecting: boolean,
    IsRepeatableKey: boolean,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    PopulatedBy?: string[],
    ResetDataForNewEdition: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    MinLength?: number,
    MaxLength?: number,
    MultiLineEntry?: boolean

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    DeliveredBy?: object[],
    ParameterSubstitutedBy?: object[]

}

export class DataPointEmail extends DataPointString {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataPointEmail";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof DataPointEmail }[] = [

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships

    // Relationship DeliveredBy, returns TaskCorrespondence TaskCorrespondenceDeliversDataPointEmail[]
    private __DeliveredBy: TaskCorrespondenceDeliversDataPointEmail[];
    DeliveredBy(_context?: BaseDataContext): TaskCorrespondenceDeliversDataPointEmail[] {
        if (this.__DeliveredBy)
            return this.__DeliveredBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._DeliveredBy), (id) => context.get(id) as TaskCorrespondenceDeliversDataPointEmail);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setDeliveredBy(values: TaskCorrespondenceDeliversDataPointEmail[]) {
         if (this.Context != null)
             throw Error;

        this.__DeliveredBy = values;
     }
    get _DeliveredBy(): Set<string> {
        if (!this._relationships.has("DeliveredBy"))
            this._relationships.set("DeliveredBy", new Set<string>());

        return this._relationships.get("DeliveredBy");
    }
    set _DeliveredBy(values: Set<string>) {
        this._relationships.set("DeliveredBy", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEvaluatedForCondition',
            edgeType: ElementConditionEvaluatesDataPoint,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsPopulatedBy',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'Populates',
            otherVertexType: Field,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: DataGroupContainsDataPoint,
            otherVertexPropertyName: 'Contains',
            otherVertexType: DataGroup,
        },
        {
            propertyName: 'DeliveredBy',
            edgeType: TaskCorrespondenceDeliversDataPointEmail,
            otherVertexPropertyName: 'DeliversEmail',
            otherVertexType: TaskCorrespondence,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: TaskCorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: TaskCorrespondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointEmail {
        return ModelUtils.deserializeVertex<DataPointEmail>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointEmail) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DataType: model.DataType,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            ValidationScript: model.ValidationScript,
            IsPredefined: model.IsPredefined,
            Tag: model.Tag,
            IsCalculated: model.IsCalculated,
            RateAffecting: model.RateAffecting,
            IsRepeatableKey: model.IsRepeatableKey,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            PopulatedBy: model.PopulatedBy,
            ResetDataForNewEdition: model.ResetDataForNewEdition,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            MinLength: model.MinLength,
            MaxLength: model.MaxLength,
            MultiLineEntry: model.MultiLineEntry,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            DeliveredBy: ModelUtils.serializeShallowEdge(model.DeliveredBy(), 'DeliveredBy'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DataPointEmail {
        let clone = new DataPointEmail();
        clone.data = _.cloneDeep(this.data);
        clone._IsEvaluatedForCondition = _.cloneDeep(this._IsEvaluatedForCondition);
        clone._IsPopulatedBy = _.cloneDeep(this._IsPopulatedBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._DeliveredBy = _.cloneDeep(this._DeliveredBy);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointMoney {
    DataType: string,
    Id: string,
    Name: string,
    Description?: string,
    readonly Optional: boolean,
    Options?: string[],
    DefaultContent?: any,
    RegExPattern?: string,
    ValidationType: string,
    ValidationScript?: string,
    readonly IsPredefined: boolean,
    Tag?: string,
    IsCalculated: boolean,
    RateAffecting: boolean,
    IsRepeatableKey: boolean,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    PopulatedBy?: string[],
    ResetDataForNewEdition: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    MinValue?: number,
    MaxValue?: number,
    Places?: number

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    ParameterSubstitutedBy?: object[]

}

export class DataPointMoney extends DataPointDecimal {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataPointMoney";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof DataPointMoney }[] = [

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEvaluatedForCondition',
            edgeType: ElementConditionEvaluatesDataPoint,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsPopulatedBy',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'Populates',
            otherVertexType: Field,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: DataGroupContainsDataPoint,
            otherVertexPropertyName: 'Contains',
            otherVertexType: DataGroup,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: TaskCorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: TaskCorrespondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointMoney {
        return ModelUtils.deserializeVertex<DataPointMoney>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointMoney) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DataType: model.DataType,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            ValidationScript: model.ValidationScript,
            IsPredefined: model.IsPredefined,
            Tag: model.Tag,
            IsCalculated: model.IsCalculated,
            RateAffecting: model.RateAffecting,
            IsRepeatableKey: model.IsRepeatableKey,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            PopulatedBy: model.PopulatedBy,
            ResetDataForNewEdition: model.ResetDataForNewEdition,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            MinValue: model.MinValue,
            MaxValue: model.MaxValue,
            Places: model.Places,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DataPointMoney {
        let clone = new DataPointMoney();
        clone.data = _.cloneDeep(this.data);
        clone._IsEvaluatedForCondition = _.cloneDeep(this._IsEvaluatedForCondition);
        clone._IsPopulatedBy = _.cloneDeep(this._IsPopulatedBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointPhone {
    DataType: string,
    Id: string,
    Name: string,
    Description?: string,
    readonly Optional: boolean,
    Options?: string[],
    DefaultContent?: any,
    RegExPattern?: string,
    ValidationType: string,
    ValidationScript?: string,
    readonly IsPredefined: boolean,
    Tag?: string,
    IsCalculated: boolean,
    RateAffecting: boolean,
    IsRepeatableKey: boolean,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    PopulatedBy?: string[],
    ResetDataForNewEdition: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    MinLength?: number,
    MaxLength?: number,
    MultiLineEntry?: boolean

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    ParameterSubstitutedBy?: object[]

}

export class DataPointPhone extends DataPointString {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataPointPhone";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof DataPointPhone }[] = [

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEvaluatedForCondition',
            edgeType: ElementConditionEvaluatesDataPoint,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsPopulatedBy',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'Populates',
            otherVertexType: Field,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: DataGroupContainsDataPoint,
            otherVertexPropertyName: 'Contains',
            otherVertexType: DataGroup,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: TaskCorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: TaskCorrespondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointPhone {
        return ModelUtils.deserializeVertex<DataPointPhone>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointPhone) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DataType: model.DataType,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            ValidationScript: model.ValidationScript,
            IsPredefined: model.IsPredefined,
            Tag: model.Tag,
            IsCalculated: model.IsCalculated,
            RateAffecting: model.RateAffecting,
            IsRepeatableKey: model.IsRepeatableKey,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            PopulatedBy: model.PopulatedBy,
            ResetDataForNewEdition: model.ResetDataForNewEdition,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            MinLength: model.MinLength,
            MaxLength: model.MaxLength,
            MultiLineEntry: model.MultiLineEntry,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DataPointPhone {
        let clone = new DataPointPhone();
        clone.data = _.cloneDeep(this.data);
        clone._IsEvaluatedForCondition = _.cloneDeep(this._IsEvaluatedForCondition);
        clone._IsPopulatedBy = _.cloneDeep(this._IsPopulatedBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointYear {
    DataType: string,
    Id: string,
    Name: string,
    Description?: string,
    readonly Optional: boolean,
    Options?: string[],
    DefaultContent?: any,
    RegExPattern?: string,
    ValidationType: string,
    ValidationScript?: string,
    readonly IsPredefined: boolean,
    Tag?: string,
    IsCalculated: boolean,
    RateAffecting: boolean,
    IsRepeatableKey: boolean,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    PopulatedBy?: string[],
    ResetDataForNewEdition: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    MinValue?: number,
    MaxValue?: number,
    ValuesRequiringExplanation?: number[]

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    ParameterSubstitutedBy?: object[]

}

export class DataPointYear extends DataPointInteger {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataPointYear";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof DataPointYear }[] = [

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEvaluatedForCondition',
            edgeType: ElementConditionEvaluatesDataPoint,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsPopulatedBy',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'Populates',
            otherVertexType: Field,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: DataGroupContainsDataPoint,
            otherVertexPropertyName: 'Contains',
            otherVertexType: DataGroup,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: TaskCorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: TaskCorrespondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointYear {
        return ModelUtils.deserializeVertex<DataPointYear>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointYear) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DataType: model.DataType,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            ValidationScript: model.ValidationScript,
            IsPredefined: model.IsPredefined,
            Tag: model.Tag,
            IsCalculated: model.IsCalculated,
            RateAffecting: model.RateAffecting,
            IsRepeatableKey: model.IsRepeatableKey,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            PopulatedBy: model.PopulatedBy,
            ResetDataForNewEdition: model.ResetDataForNewEdition,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            MinValue: model.MinValue,
            MaxValue: model.MaxValue,
            ValuesRequiringExplanation: model.ValuesRequiringExplanation,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DataPointYear {
        let clone = new DataPointYear();
        clone.data = _.cloneDeep(this.data);
        clone._IsEvaluatedForCondition = _.cloneDeep(this._IsEvaluatedForCondition);
        clone._IsPopulatedBy = _.cloneDeep(this._IsPopulatedBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointYesNo {
    DataType: string,
    Id: string,
    Name: string,
    Description?: string,
    readonly Optional: boolean,
    Options?: string[],
    DefaultContent?: any,
    RegExPattern?: string,
    ValidationType: string,
    ValidationScript?: string,
    readonly IsPredefined: boolean,
    Tag?: string,
    IsCalculated: boolean,
    RateAffecting: boolean,
    IsRepeatableKey: boolean,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    PopulatedBy?: string[],
    ResetDataForNewEdition: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    MinLength?: number,
    MaxLength?: number,
    MultiLineEntry?: boolean

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    ParameterSubstitutedBy?: object[]

}

export class DataPointYesNo extends DataPointString {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "DataPointYesNo";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof DataPointYesNo }[] = [

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEvaluatedForCondition',
            edgeType: ElementConditionEvaluatesDataPoint,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsPopulatedBy',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'Populates',
            otherVertexType: Field,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: DataGroupContainsDataPoint,
            otherVertexPropertyName: 'Contains',
            otherVertexType: DataGroup,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: TaskCorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: TaskCorrespondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointYesNo {
        return ModelUtils.deserializeVertex<DataPointYesNo>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointYesNo) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DataType: model.DataType,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            ValidationScript: model.ValidationScript,
            IsPredefined: model.IsPredefined,
            Tag: model.Tag,
            IsCalculated: model.IsCalculated,
            RateAffecting: model.RateAffecting,
            IsRepeatableKey: model.IsRepeatableKey,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            PopulatedBy: model.PopulatedBy,
            ResetDataForNewEdition: model.ResetDataForNewEdition,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            MinLength: model.MinLength,
            MaxLength: model.MaxLength,
            MultiLineEntry: model.MultiLineEntry,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DataPointYesNo {
        let clone = new DataPointYesNo();
        clone.data = _.cloneDeep(this.data);
        clone._IsEvaluatedForCondition = _.cloneDeep(this._IsEvaluatedForCondition);
        clone._IsPopulatedBy = _.cloneDeep(this._IsPopulatedBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IEmailField {
    Id: string,
    DisplayLabel?: string,
    ShowHelp: boolean,
    Help?: string,
    readonly ConditionMet: boolean,
    ExternalId?: string,
    EnableListView: boolean,
    DefaultConditionMet: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    Optional: boolean,
    Options?: any[],
    DefaultContent?: any,
    Access: string,
    PopulatedByDataPointId?: string,
    DisplayWidth?: string,
    RetainDataWhenHidden?: boolean,
    Prefix?: string,
    Suffix?: string,

    IsEnabledBy?: object[],
    IsDisplayedBy?: object[],
    Populates?: object[]

}

export class EmailField extends StringField {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "EmailField";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof EmailField }[] = [

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsDisplayedBy',
            edgeType: SectionDisplaysElement,
            otherVertexPropertyName: 'Displays',
            otherVertexType: Section,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Populates',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'IsPopulatedBy',
            otherVertexType: DataPoint,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): EmailField {
        return ModelUtils.deserializeVertex<EmailField>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: EmailField) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            EnableListView: model.EnableListView,
            DefaultConditionMet: model.DefaultConditionMet,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            PopulatedByDataPointId: model.PopulatedByDataPointId,
            DisplayWidth: model.DisplayWidth,
            RetainDataWhenHidden: model.RetainDataWhenHidden,
            Prefix: model.Prefix,
            Suffix: model.Suffix,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsDisplayedBy: ModelUtils.serializeShallowEdge(model.IsDisplayedBy(), 'IsDisplayedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): EmailField {
        let clone = new EmailField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsDisplayedBy = _.cloneDeep(this._IsDisplayedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IPhoneField {
    Id: string,
    DisplayLabel?: string,
    ShowHelp: boolean,
    Help?: string,
    readonly ConditionMet: boolean,
    ExternalId?: string,
    EnableListView: boolean,
    DefaultConditionMet: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    Optional: boolean,
    Options?: any[],
    DefaultContent?: any,
    Access: string,
    PopulatedByDataPointId?: string,
    DisplayWidth?: string,
    RetainDataWhenHidden?: boolean,
    Prefix?: string,
    Suffix?: string,

    IsEnabledBy?: object[],
    IsDisplayedBy?: object[],
    Populates?: object[]

}

export class PhoneField extends StringField {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "PhoneField";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof PhoneField }[] = [

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsDisplayedBy',
            edgeType: SectionDisplaysElement,
            otherVertexPropertyName: 'Displays',
            otherVertexType: Section,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Populates',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'IsPopulatedBy',
            otherVertexType: DataPoint,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): PhoneField {
        return ModelUtils.deserializeVertex<PhoneField>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: PhoneField) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            EnableListView: model.EnableListView,
            DefaultConditionMet: model.DefaultConditionMet,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            PopulatedByDataPointId: model.PopulatedByDataPointId,
            DisplayWidth: model.DisplayWidth,
            RetainDataWhenHidden: model.RetainDataWhenHidden,
            Prefix: model.Prefix,
            Suffix: model.Suffix,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsDisplayedBy: ModelUtils.serializeShallowEdge(model.IsDisplayedBy(), 'IsDisplayedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): PhoneField {
        let clone = new PhoneField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsDisplayedBy = _.cloneDeep(this._IsDisplayedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IYearField {
    Id: string,
    DisplayLabel?: string,
    ShowHelp: boolean,
    Help?: string,
    readonly ConditionMet: boolean,
    ExternalId?: string,
    EnableListView: boolean,
    DefaultConditionMet: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    Optional: boolean,
    Options?: any[],
    DefaultContent?: any,
    Access: string,
    PopulatedByDataPointId?: string,
    DisplayWidth?: string,
    RetainDataWhenHidden?: boolean,
    Prefix?: string,
    Suffix?: string,

    IsEnabledBy?: object[],
    IsDisplayedBy?: object[],
    Populates?: object[]

}

export class YearField extends IntegerField {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "YearField";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof YearField }[] = [

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsDisplayedBy',
            edgeType: SectionDisplaysElement,
            otherVertexPropertyName: 'Displays',
            otherVertexType: Section,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Populates',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'IsPopulatedBy',
            otherVertexType: DataPoint,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): YearField {
        return ModelUtils.deserializeVertex<YearField>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: YearField) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            EnableListView: model.EnableListView,
            DefaultConditionMet: model.DefaultConditionMet,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            PopulatedByDataPointId: model.PopulatedByDataPointId,
            DisplayWidth: model.DisplayWidth,
            RetainDataWhenHidden: model.RetainDataWhenHidden,
            Prefix: model.Prefix,
            Suffix: model.Suffix,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsDisplayedBy: ModelUtils.serializeShallowEdge(model.IsDisplayedBy(), 'IsDisplayedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): YearField {
        let clone = new YearField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsDisplayedBy = _.cloneDeep(this._IsDisplayedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IYesNoField {
    Id: string,
    DisplayLabel?: string,
    ShowHelp: boolean,
    Help?: string,
    readonly ConditionMet: boolean,
    ExternalId?: string,
    EnableListView: boolean,
    DefaultConditionMet: boolean,
    ScriptFunction?: string,
    InputSources?: any[],
    Optional: boolean,
    Options?: any[],
    DefaultContent?: any,
    Access: string,
    PopulatedByDataPointId?: string,
    DisplayWidth?: string,
    RetainDataWhenHidden?: boolean,
    Prefix?: string,
    Suffix?: string,
    ButtonAlignment?: string,

    IsEnabledBy?: object[],
    IsDisplayedBy?: object[],
    Populates?: object[]

}

export class YesNoField extends StringField {
    get Domain(): string {
        return "Configuration";
    }
    get Type(): string {
        return "YesNoField";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof YesNoField }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get ButtonAlignment(): string {
        return this.data.ButtonAlignment;
    }
    set ButtonAlignment(value: string) {
        this.data.ButtonAlignment = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsDisplayedBy',
            edgeType: SectionDisplaysElement,
            otherVertexPropertyName: 'Displays',
            otherVertexType: Section,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Populates',
            edgeType: FieldPopulatesDataPoint,
            otherVertexPropertyName: 'IsPopulatedBy',
            otherVertexType: DataPoint,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): YesNoField {
        return ModelUtils.deserializeVertex<YesNoField>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: YesNoField) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            EnableListView: model.EnableListView,
            DefaultConditionMet: model.DefaultConditionMet,
            ScriptFunction: model.ScriptFunction,
            InputSources: model.InputSources,
            Optional: model.Optional,
            Options: model.Options,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            PopulatedByDataPointId: model.PopulatedByDataPointId,
            DisplayWidth: model.DisplayWidth,
            RetainDataWhenHidden: model.RetainDataWhenHidden,
            Prefix: model.Prefix,
            Suffix: model.Suffix,
            ButtonAlignment: model.ButtonAlignment,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsDisplayedBy: ModelUtils.serializeShallowEdge(model.IsDisplayedBy(), 'IsDisplayedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): YesNoField {
        let clone = new YesNoField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsDisplayedBy = _.cloneDeep(this._IsDisplayedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export var Types = {
    ApplicationContainsElementCondition,
    ElementCondition,
    ElementConditionEnablesElement,
    ElementConditionEvaluatesDataPoint,
    ScriptCondition,
    DateField,
    Field,
    Element,
    DecimalField,
    EmailField,
    StringField,
    IntegerField,
    ListOfStringsField,
    MoneyField,
    PhoneField,
    Section,
    SectionIsSequencedBySectionSequence,
    SectionSequence,
    StaticElement,
    StaticText,
    TimestampField,
    UrlField,
    YearField,
    YesNoField,
    ZipcodeField,
    Application,
    ProgramRevisioned,
    ApplicationCollectsSection,
    ApplicationIsSequencedByApplicationSequence,
    ApplicationPopulatesDataStore,
    ApplicationSequence,
    ApplicationStructure,
    ApplicationStructureBelongsToProgramRevision,
    FieldPopulatesDataPoint,
    SectionDisplaysElement,
    SectionRepeatsWithDataGroup,
    Asset,
    AssetGroup,
    AssetGroupContainsAsset,
    DataPanel,
    DataPanelUsesWidget,
    Widget,
    DataPoint,
    Mappable,
    DataPointDate,
    DataPointDecimal,
    DataPointEmail,
    DataPointString,
    DataPointInteger,
    DataPointListOfStrings,
    DataPointMoney,
    DataPointPhone,
    DataPointTimestamp,
    DataPointUrl,
    DataPointYear,
    DataPointYesNo,
    DataPointZipcode,
    DataGroup,
    DataGroupChildDataGroup,
    DataGroupContainsDataPoint,
    DataGroupIsSequencedByDataGroupSequence,
    DataGroupSequence,
    DataStore,
    DataStoreContainsDataGroup,
    DataStoreIsSequencedByDataStoreSequence,
    DataStoreSequence,
    Program,
    ProgramAllowsDocumentCategory,
    ProgramChange,
    ProgramChangeEditsProgram,
    ProgramChangeLog,
    ProgramCollectsApplication,
    ProgramConfiguredByProgramOptions,
    ProgramDefinesWorkflowSet,
    ProgramDisplaysDataPanel,
    ProgramEmploysTenantUser,
    ProgramEvaluatesRuleSet,
    ProgramFormattedByRegion,
    ProgramObligatesAccountRole,
    ProgramOffersProduct,
    ProgramOptions,
    ProgramPatch,
    Deployable,
    ProgramPatchLog,
    ProgramPatchRevisesRevisioned,
    ProgramRevision,
    ProgramRevisionConfiguresArea,
    ProgramRevisionPublishesProgram,
    ProgramRevisionTracksProgramRevisioned,
    ProgramStoresDataStore,
    ProgramUsesWorkGroup,
    ProgramUtilizesAssetGroup,
    Rule,
    RuleDateTime,
    RuleProductSelection,
    RuleRiskAssessment,
    RuleRoleAssignment,
    RuleSet,
    RuleSetAssignment,
    RuleSetContainsRule,
    RuleSetDateTime,
    RuleSetProduct,
    RuleSetRequirement,
    RuleSetRequirementRegulatesWorkflow,
    RuleSetRiskAssessment,
    RuleSetWorkflowSetStatus,
    RuleSetWorkflowSetStatusCapturesWorkflowSet,
    RuleTaskObligation,
    RuleTaskObligationSetsRequirementForTask,
    RuleWorkflowSetStatus,
    ProgramImportValidationMessage,
    ProgramValidationMessage,
    Phase,
    Workable,
    PhaseIsSequencedByPhaseSequence,
    PhaseRequiresTask,
    PhaseSequence,
    ServiceLevel,
    Task,
    TaskApplication,
    TaskApproval,
    TaskAssignedAssignable,
    TaskClearance,
    TaskCorrespondence,
    TaskCorrespondenceAttachesDocumentCategory,
    TaskCorrespondenceDeliversAccountRole,
    TaskCorrespondenceDeliversDataPointEmail,
    TaskCorrespondenceMailToDataGroup,
    TaskCorrespondenceMessagesEmailTemplate,
    TaskCorrespondenceParameterSubstitutesDataPoint,
    TaskDocumentGeneration,
    TaskFileRequirement,
    TaskManual,
    TaskPolicyDates,
    TaskProducts,
    TaskRatingSystem,
    WorkableEnablesWorkable,
    Workflow,
    WorkflowConfiguredByWorkflowOptions,
    WorkflowIsSequencedByWorkflowSequence,
    WorkflowOptions,
    WorkflowRequiresPhase,
    WorkflowSequence,
    WorkflowSet,
    WorkflowSetContainsWorkflow,
    AccountRole,
    Assignable,
    App,
    SMIdentity,
    AppRepresentedByTenantUser,
    Area,
    AreaDeploysDeployable,
    BusinessLocation,
    Company,
    CompanyWritesProduct,
    Contact,
    CustomTable,
    CustomTableRow,
    Dashboard,
    DeclineReason,
    Developer,
    DocumentCategory,
    EmailTemplate,
    Holiday,
    Notification,
    Prioritization,
    Producer,
    ProducerOffersProgram,
    Product,
    Region,
    SecurityRole,
    ServiceLevelAgreement,
    SMIdentityFillsSecurityRole,
    SMIdentityWorksInArea,
    TenantDeveloperOptions,
    TenantUser,
    TenantUserDevelopsAsDeveloper,
    TenantUserMemberOfWorkGroup,
    TransactionType,
    UserNotificationCenter,
    UserNotificationCenterIsAlertedByNotification,
    Webhook,
    WebhookActivity,
    WorkGroup,
    FeatureFacet,
}
