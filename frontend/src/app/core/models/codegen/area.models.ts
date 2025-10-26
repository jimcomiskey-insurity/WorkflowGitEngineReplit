import { ModelUtils, EdgeRelationship } from '@Core/utils/model-utils';
import { BaseDataContext } from '@Core/contexts/base-data-context';
import { BaseModel, EdgeModel, VertexModel, DocumentModel } from '@Core/models/model';
import { ContractDate } from '@Core/utils/contract-date';
import { ActionEligibilityStatus } from '@Core/enums/action-eligibility-status.enum';

import * as _ from 'lodash';

export interface IAccount {
    Id: string,
    Name: string,
    Dba?: string,
    Phone?: string,
    Fax?: string,
    Country?: string,
    Address1?: string,
    Address2?: string,
    Address3?: string,
    City?: string,
    State?: string,
    Zip?: string,
    County?: string,
    Website?: string,
    FEIN?: string,
    Tags?: string[],
    readonly Status: string,
    readonly ClearanceStatus?: string,
    readonly ProducerId?: string,
    Code?: string,
    readonly BilledBalance?: number,
    readonly PastDueBalance?: number,
    readonly PastDueInvoiceDueDate?: Date,
    readonly PastDuePolicyBalances?: { [index: string]: number },
    readonly CreatedDate?: Date,
    readonly PrimaryAccount?: string[],
    readonly AssociatedAccounts?: string[],
    readonly IsCleared: boolean,
    DescriptionOfOperations?: string,
    LegalEntity?: string,
    OtherLegalEntity?: string,
    AccountTaxLocation?: string,
    Unincorporated?: boolean,
    BillingContact?: string,
    BillingEmail?: string,
    BillingPhone?: string,
    BillingCell?: string,
    BillingFax?: string,
    BillingName?: string,
    BillingAddress1?: string,
    BillingAddress2?: string,
    BillingCity?: string,
    BillingState?: string,
    BillingZip?: string,

    IsBilledFor?: object[],
    Communicates?: object[],
    IsServicedBy?: object[],
    IsWrittenFor?: object[],
    IsReservedBy?: object[],
    IsWorkedBy?: object[],
    IsFavoriteOf?: object[],
    Performs?: object[],
    Runs?: object[],
    Writes?: object[]

}

export class Account extends VertexModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "Account";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Account }[] = [

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
    get Tags(): string[] {
        return this.data.Tags;
    }
    set Tags(value: string[]) {
        this.data.Tags = value;
    }
    get Status(): string {
        return this.data.Status;
    }
    get ClearanceStatus(): string {
        return this.data.ClearanceStatus;
    }
    get ProducerId(): string {
        return this.data.ProducerId;
    }
    get Code(): string {
        return this.data.Code;
    }
    set Code(value: string) {
        this.data.Code = value;
    }
    get BilledBalance(): number {
        return this.data.BilledBalance;
    }
    get PastDueBalance(): number {
        return this.data.PastDueBalance;
    }
    get PastDueInvoiceDueDate(): Date {
        return this.data.PastDueInvoiceDueDate ? new Date(this.data.PastDueInvoiceDueDate) : undefined;
    }
    get PastDuePolicyBalances(): { [index: string]: number } {
        return this.data.PastDuePolicyBalances;
    }
    get CreatedDate(): Date {
        return this.data.CreatedDate ? new Date(this.data.CreatedDate) : undefined;
    }
    get PrimaryAccount(): string[] {
        return this.data.PrimaryAccount;
    }
    get AssociatedAccounts(): string[] {
        return this.data.AssociatedAccounts;
    }
    get IsCleared(): boolean {
        return this.data.IsCleared;
    }
    get DescriptionOfOperations(): string {
        return this.data.DescriptionOfOperations;
    }
    set DescriptionOfOperations(value: string) {
        this.data.DescriptionOfOperations = value;
    }
    get LegalEntity(): string {
        return this.data.LegalEntity;
    }
    set LegalEntity(value: string) {
        this.data.LegalEntity = value;
    }
    get OtherLegalEntity(): string {
        return this.data.OtherLegalEntity;
    }
    set OtherLegalEntity(value: string) {
        this.data.OtherLegalEntity = value;
    }
    get AccountTaxLocation(): string {
        return this.data.AccountTaxLocation;
    }
    set AccountTaxLocation(value: string) {
        this.data.AccountTaxLocation = value;
    }
    get Unincorporated(): boolean {
        return this.data.Unincorporated;
    }
    set Unincorporated(value: boolean) {
        this.data.Unincorporated = value;
    }
    get BillingContact(): string {
        return this.data.BillingContact;
    }
    set BillingContact(value: string) {
        this.data.BillingContact = value;
    }
    get BillingEmail(): string {
        return this.data.BillingEmail;
    }
    set BillingEmail(value: string) {
        this.data.BillingEmail = value;
    }
    get BillingPhone(): string {
        return this.data.BillingPhone;
    }
    set BillingPhone(value: string) {
        this.data.BillingPhone = value;
    }
    get BillingCell(): string {
        return this.data.BillingCell;
    }
    set BillingCell(value: string) {
        this.data.BillingCell = value;
    }
    get BillingFax(): string {
        return this.data.BillingFax;
    }
    set BillingFax(value: string) {
        this.data.BillingFax = value;
    }
    get BillingName(): string {
        return this.data.BillingName;
    }
    set BillingName(value: string) {
        this.data.BillingName = value;
    }
    get BillingAddress1(): string {
        return this.data.BillingAddress1;
    }
    set BillingAddress1(value: string) {
        this.data.BillingAddress1 = value;
    }
    get BillingAddress2(): string {
        return this.data.BillingAddress2;
    }
    set BillingAddress2(value: string) {
        this.data.BillingAddress2 = value;
    }
    get BillingCity(): string {
        return this.data.BillingCity;
    }
    set BillingCity(value: string) {
        this.data.BillingCity = value;
    }
    get BillingState(): string {
        return this.data.BillingState;
    }
    set BillingState(value: string) {
        this.data.BillingState = value;
    }
    get BillingZip(): string {
        return this.data.BillingZip;
    }
    set BillingZip(value: string) {
        this.data.BillingZip = value;
    }

    // Relationships

    // Relationship IsBilledFor, returns Invoice InvoiceBillsAccount[]
    private __IsBilledFor: InvoiceBillsAccount[];
    IsBilledFor(_context?: BaseDataContext): InvoiceBillsAccount[] {
        if (this.__IsBilledFor)
            return this.__IsBilledFor;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsBilledFor), (id) => context.get(id) as InvoiceBillsAccount);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsBilledFor(values: InvoiceBillsAccount[]) {
         if (this.Context != null)
             throw Error;

        this.__IsBilledFor = values;
     }
    get _IsBilledFor(): Set<string> {
        if (!this._relationships.has("IsBilledFor"))
            this._relationships.set("IsBilledFor", new Set<string>());

        return this._relationships.get("IsBilledFor");
    }
    set _IsBilledFor(values: Set<string>) {
        this._relationships.set("IsBilledFor", values);
    }

    // Relationship Communicates, returns Correspondence CorrespondencePertainsToAccount[]
    private __Communicates: CorrespondencePertainsToAccount[];
    Communicates(_context?: BaseDataContext): CorrespondencePertainsToAccount[] {
        if (this.__Communicates)
            return this.__Communicates;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Communicates), (id) => context.get(id) as CorrespondencePertainsToAccount);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setCommunicates(values: CorrespondencePertainsToAccount[]) {
         if (this.Context != null)
             throw Error;

        this.__Communicates = values;
     }
    get _Communicates(): Set<string> {
        if (!this._relationships.has("Communicates"))
            this._relationships.set("Communicates", new Set<string>());

        return this._relationships.get("Communicates");
    }
    set _Communicates(values: Set<string>) {
        this._relationships.set("Communicates", values);
    }

    // Relationship IsServicedBy, returns AccountRole AccountRoleServicesAccount[]
    private __IsServicedBy: AccountRoleServicesAccount[];
    IsServicedBy(_context?: BaseDataContext): AccountRoleServicesAccount[] {
        if (this.__IsServicedBy)
            return this.__IsServicedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsServicedBy), (id) => context.get(id) as AccountRoleServicesAccount);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsServicedBy(values: AccountRoleServicesAccount[]) {
         if (this.Context != null)
             throw Error;

        this.__IsServicedBy = values;
     }
    get _IsServicedBy(): Set<string> {
        if (!this._relationships.has("IsServicedBy"))
            this._relationships.set("IsServicedBy", new Set<string>());

        return this._relationships.get("IsServicedBy");
    }
    set _IsServicedBy(values: Set<string>) {
        this._relationships.set("IsServicedBy", values);
    }

    // Relationship IsWrittenFor, returns Program ProgramWritesAccount[]
    private __IsWrittenFor: ProgramWritesAccount[];
    IsWrittenFor(_context?: BaseDataContext): ProgramWritesAccount[] {
        if (this.__IsWrittenFor)
            return this.__IsWrittenFor;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsWrittenFor), (id) => context.get(id) as ProgramWritesAccount);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsWrittenFor(values: ProgramWritesAccount[]) {
         if (this.Context != null)
             throw Error;

        this.__IsWrittenFor = values;
     }
    get _IsWrittenFor(): Set<string> {
        if (!this._relationships.has("IsWrittenFor"))
            this._relationships.set("IsWrittenFor", new Set<string>());

        return this._relationships.get("IsWrittenFor");
    }
    set _IsWrittenFor(values: Set<string>) {
        this._relationships.set("IsWrittenFor", values);
    }

    // Relationship IsReservedBy, returns ReservationSet ReservationSetReservesAccount[]
    private __IsReservedBy: ReservationSetReservesAccount[];
    IsReservedBy(_context?: BaseDataContext): ReservationSetReservesAccount[] {
        if (this.__IsReservedBy)
            return this.__IsReservedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsReservedBy), (id) => context.get(id) as ReservationSetReservesAccount);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsReservedBy(values: ReservationSetReservesAccount[]) {
         if (this.Context != null)
             throw Error;

        this.__IsReservedBy = values;
     }
    get _IsReservedBy(): Set<string> {
        if (!this._relationships.has("IsReservedBy"))
            this._relationships.set("IsReservedBy", new Set<string>());

        return this._relationships.get("IsReservedBy");
    }
    set _IsReservedBy(values: Set<string>) {
        this._relationships.set("IsReservedBy", values);
    }

    // Relationship IsWorkedBy, returns SMIdentity SMIdentityWorksAccount[]
    private __IsWorkedBy: SMIdentityWorksAccount[];
    IsWorkedBy(_context?: BaseDataContext): SMIdentityWorksAccount[] {
        if (this.__IsWorkedBy)
            return this.__IsWorkedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsWorkedBy), (id) => context.get(id) as SMIdentityWorksAccount);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsWorkedBy(values: SMIdentityWorksAccount[]) {
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

    // Relationship IsFavoriteOf, returns SMIdentity UserFavoritesAccount[]
    private __IsFavoriteOf: UserFavoritesAccount[];
    IsFavoriteOf(_context?: BaseDataContext): UserFavoritesAccount[] {
        if (this.__IsFavoriteOf)
            return this.__IsFavoriteOf;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsFavoriteOf), (id) => context.get(id) as UserFavoritesAccount);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsFavoriteOf(values: UserFavoritesAccount[]) {
         if (this.Context != null)
             throw Error;

        this.__IsFavoriteOf = values;
     }
    get _IsFavoriteOf(): Set<string> {
        if (!this._relationships.has("IsFavoriteOf"))
            this._relationships.set("IsFavoriteOf", new Set<string>());

        return this._relationships.get("IsFavoriteOf");
    }
    set _IsFavoriteOf(values: Set<string>) {
        this._relationships.set("IsFavoriteOf", values);
    }

    // Relationship Performs, returns WorkflowSet AccountPerformsWorkflowSet[]
    private __Performs: AccountPerformsWorkflowSet[];
    Performs(_context?: BaseDataContext): AccountPerformsWorkflowSet[] {
        if (this.__Performs)
            return this.__Performs;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Performs), (id) => context.get(id) as AccountPerformsWorkflowSet);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setPerforms(values: AccountPerformsWorkflowSet[]) {
         if (this.Context != null)
             throw Error;

        this.__Performs = values;
     }
    get _Performs(): Set<string> {
        if (!this._relationships.has("Performs"))
            this._relationships.set("Performs", new Set<string>());

        return this._relationships.get("Performs");
    }
    set _Performs(values: Set<string>) {
        this._relationships.set("Performs", values);
    }

    // Relationship Runs, returns Workflow AccountRunsWorkflow[]
    private __Runs: AccountRunsWorkflow[];
    Runs(_context?: BaseDataContext): AccountRunsWorkflow[] {
        if (this.__Runs)
            return this.__Runs;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Runs), (id) => context.get(id) as AccountRunsWorkflow);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setRuns(values: AccountRunsWorkflow[]) {
         if (this.Context != null)
             throw Error;

        this.__Runs = values;
     }
    get _Runs(): Set<string> {
        if (!this._relationships.has("Runs"))
            this._relationships.set("Runs", new Set<string>());

        return this._relationships.get("Runs");
    }
    set _Runs(values: Set<string>) {
        this._relationships.set("Runs", values);
    }

    // Relationship Writes, returns PolicySet AccountWritesPolicySet[]
    private __Writes: AccountWritesPolicySet[];
    Writes(_context?: BaseDataContext): AccountWritesPolicySet[] {
        if (this.__Writes)
            return this.__Writes;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Writes), (id) => context.get(id) as AccountWritesPolicySet);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setWrites(values: AccountWritesPolicySet[]) {
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
        {
            propertyName: 'IsBilledFor',
            edgeType: InvoiceBillsAccount,
            otherVertexPropertyName: 'Bills',
            otherVertexType: Invoice,
        },
        {
            propertyName: 'Communicates',
            edgeType: CorrespondencePertainsToAccount,
            otherVertexPropertyName: 'PertainsTo',
            otherVertexType: Correspondence,
        },
        {
            propertyName: 'IsServicedBy',
            edgeType: AccountRoleServicesAccount,
            otherVertexPropertyName: 'Services',
            otherVertexType: AccountRole,
        },
        {
            propertyName: 'IsWrittenFor',
            edgeType: ProgramWritesAccount,
            otherVertexPropertyName: 'Writes',
            otherVertexType: Program,
        },
        {
            propertyName: 'IsReservedBy',
            edgeType: ReservationSetReservesAccount,
            otherVertexPropertyName: 'Reserves',
            otherVertexType: ReservationSet,
        },
        {
            propertyName: 'IsWorkedBy',
            edgeType: SMIdentityWorksAccount,
            otherVertexPropertyName: 'Works',
            otherVertexType: SMIdentity,
        },
        {
            propertyName: 'IsFavoriteOf',
            edgeType: UserFavoritesAccount,
            otherVertexPropertyName: 'Favorites',
            otherVertexType: SMIdentity,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Performs',
            edgeType: AccountPerformsWorkflowSet,
            otherVertexPropertyName: 'IsPerformedFor',
            otherVertexType: WorkflowSet,
        },
        {
            propertyName: 'Runs',
            edgeType: AccountRunsWorkflow,
            otherVertexPropertyName: 'IsRunningFor',
            otherVertexType: Workflow,
        },
        {
            propertyName: 'Writes',
            edgeType: AccountWritesPolicySet,
            otherVertexPropertyName: 'IsWrittenBy',
            otherVertexType: PolicySet,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Account {
        return ModelUtils.deserializeVertex<Account>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Account) {
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
            Tags: model.Tags,
            Status: model.Status,
            ClearanceStatus: model.ClearanceStatus,
            ProducerId: model.ProducerId,
            Code: model.Code,
            BilledBalance: model.BilledBalance,
            PastDueBalance: model.PastDueBalance,
            PastDueInvoiceDueDate: model.PastDueInvoiceDueDate,
            PastDuePolicyBalances: model.PastDuePolicyBalances,
            CreatedDate: model.CreatedDate,
            PrimaryAccount: model.PrimaryAccount,
            AssociatedAccounts: model.AssociatedAccounts,
            IsCleared: model.IsCleared,
            DescriptionOfOperations: model.DescriptionOfOperations,
            LegalEntity: model.LegalEntity,
            OtherLegalEntity: model.OtherLegalEntity,
            AccountTaxLocation: model.AccountTaxLocation,
            Unincorporated: model.Unincorporated,
            BillingContact: model.BillingContact,
            BillingEmail: model.BillingEmail,
            BillingPhone: model.BillingPhone,
            BillingCell: model.BillingCell,
            BillingFax: model.BillingFax,
            BillingName: model.BillingName,
            BillingAddress1: model.BillingAddress1,
            BillingAddress2: model.BillingAddress2,
            BillingCity: model.BillingCity,
            BillingState: model.BillingState,
            BillingZip: model.BillingZip,
            IsBilledFor: ModelUtils.serializeShallowEdge(model.IsBilledFor(), 'IsBilledFor'),
            Communicates: ModelUtils.serializeShallowEdge(model.Communicates(), 'Communicates'),
            IsServicedBy: ModelUtils.serializeShallowEdge(model.IsServicedBy(), 'IsServicedBy'),
            IsWrittenFor: ModelUtils.serializeShallowEdge(model.IsWrittenFor(), 'IsWrittenFor'),
            IsReservedBy: ModelUtils.serializeShallowEdge(model.IsReservedBy(), 'IsReservedBy'),
            IsWorkedBy: ModelUtils.serializeShallowEdge(model.IsWorkedBy(), 'IsWorkedBy'),
            IsFavoriteOf: ModelUtils.serializeShallowEdge(model.IsFavoriteOf(), 'IsFavoriteOf'),
            Performs: ModelUtils.serializeShallowEdge(model.Performs(), 'Performs'),
            Runs: ModelUtils.serializeShallowEdge(model.Runs(), 'Runs'),
            Writes: ModelUtils.serializeShallowEdge(model.Writes(), 'Writes'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Account {
        let clone = new Account();
        clone.data = _.cloneDeep(this.data);
        clone._IsBilledFor = _.cloneDeep(this._IsBilledFor);
        clone._Communicates = _.cloneDeep(this._Communicates);
        clone._IsServicedBy = _.cloneDeep(this._IsServicedBy);
        clone._IsWrittenFor = _.cloneDeep(this._IsWrittenFor);
        clone._IsReservedBy = _.cloneDeep(this._IsReservedBy);
        clone._IsWorkedBy = _.cloneDeep(this._IsWorkedBy);
        clone._IsFavoriteOf = _.cloneDeep(this._IsFavoriteOf);
        clone._Performs = _.cloneDeep(this._Performs);
        clone._Runs = _.cloneDeep(this._Runs);
        clone._Writes = _.cloneDeep(this._Writes);

        //clone.Context = this.Context;
        return clone;
    }
}

export class AccountPerformsWorkflowSet extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "AccountPerformsWorkflowSet";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Account
    private __IsPerformedFor: Account;

    IsPerformedFor(context?: BaseDataContext): Account {
        if (this.__IsPerformedFor)
           return this.__IsPerformedFor;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsPerformedFor) as Account;
    }
    setIsPerformedFor(value: Account) {
        this.__IsPerformedFor = value;
    }
    get _IsPerformedFor(): string {
        return this.Out;
    }
    set _IsPerformedFor(value: string) {
        this.Out = value;
    }
    //   In to WorkflowSet
    private __Performs: WorkflowSet;

    Performs(context?: BaseDataContext): WorkflowSet {
        if (this.__Performs)
           return this.__Performs;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Performs) as WorkflowSet;
    }
    setPerforms(value: WorkflowSet) {
        this.__Performs = value;
    }
    get _Performs(): string {
        return this.In;
    }
    set _Performs(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): AccountPerformsWorkflowSet {
       return ModelUtils.deserializeEdge<AccountPerformsWorkflowSet>(this, input, datacontext, super._deserialize);
    }


    clone(): AccountPerformsWorkflowSet {
        let clone = new AccountPerformsWorkflowSet();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class AccountRoleServicesAccount extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "AccountRoleServicesAccount";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to AccountRole
    private __IsServicedBy: AccountRole;

    IsServicedBy(context?: BaseDataContext): AccountRole {
        if (this.__IsServicedBy)
           return this.__IsServicedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsServicedBy) as AccountRole;
    }
    setIsServicedBy(value: AccountRole) {
        this.__IsServicedBy = value;
    }
    get _IsServicedBy(): string {
        return this.Out;
    }
    set _IsServicedBy(value: string) {
        this.Out = value;
    }
    //   In to Account
    private __Services: Account;

    Services(context?: BaseDataContext): Account {
        if (this.__Services)
           return this.__Services;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Services) as Account;
    }
    setServices(value: Account) {
        this.__Services = value;
    }
    get _Services(): string {
        return this.In;
    }
    set _Services(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): AccountRoleServicesAccount {
       return ModelUtils.deserializeEdge<AccountRoleServicesAccount>(this, input, datacontext, super._deserialize);
    }


    clone(): AccountRoleServicesAccount {
        let clone = new AccountRoleServicesAccount();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class AccountRunsWorkflow extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "AccountRunsWorkflow";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Account
    private __IsRunningFor: Account;

    IsRunningFor(context?: BaseDataContext): Account {
        if (this.__IsRunningFor)
           return this.__IsRunningFor;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsRunningFor) as Account;
    }
    setIsRunningFor(value: Account) {
        this.__IsRunningFor = value;
    }
    get _IsRunningFor(): string {
        return this.Out;
    }
    set _IsRunningFor(value: string) {
        this.Out = value;
    }
    //   In to Workflow
    private __Runs: Workflow;

    Runs(context?: BaseDataContext): Workflow {
        if (this.__Runs)
           return this.__Runs;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Runs) as Workflow;
    }
    setRuns(value: Workflow) {
        this.__Runs = value;
    }
    get _Runs(): string {
        return this.In;
    }
    set _Runs(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): AccountRunsWorkflow {
       return ModelUtils.deserializeEdge<AccountRunsWorkflow>(this, input, datacontext, super._deserialize);
    }


    clone(): AccountRunsWorkflow {
        let clone = new AccountRunsWorkflow();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class AccountWritesPolicySet extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "AccountWritesPolicySet";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Account
    private __IsWrittenBy: Account;

    IsWrittenBy(context?: BaseDataContext): Account {
        if (this.__IsWrittenBy)
           return this.__IsWrittenBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsWrittenBy) as Account;
    }
    setIsWrittenBy(value: Account) {
        this.__IsWrittenBy = value;
    }
    get _IsWrittenBy(): string {
        return this.Out;
    }
    set _IsWrittenBy(value: string) {
        this.Out = value;
    }
    //   In to PolicySet
    private __Writes: PolicySet;

    Writes(context?: BaseDataContext): PolicySet {
        if (this.__Writes)
           return this.__Writes;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Writes) as PolicySet;
    }
    setWrites(value: PolicySet) {
        this.__Writes = value;
    }
    get _Writes(): string {
        return this.In;
    }
    set _Writes(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): AccountWritesPolicySet {
       return ModelUtils.deserializeEdge<AccountWritesPolicySet>(this, input, datacontext, super._deserialize);
    }


    clone(): AccountWritesPolicySet {
        let clone = new AccountWritesPolicySet();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class Activity extends DocumentModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "Activity";
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
    get Action(): string {
        return this.data.Action;
    }
    set Action(value: string) {
        this.data.Action = value;
    }
    get EntityType(): string {
        return this.data.EntityType;
    }
    set EntityType(value: string) {
        this.data.EntityType = value;
    }
    get EntityId(): string {
        return this.data.EntityId;
    }
    set EntityId(value: string) {
        this.data.EntityId = value;
    }
    get EntityCorrelationKey(): string {
        return this.data.EntityCorrelationKey;
    }
    set EntityCorrelationKey(value: string) {
        this.data.EntityCorrelationKey = value;
    }
    get IdentityKey(): string {
        return this.data.IdentityKey;
    }
    set IdentityKey(value: string) {
        this.data.IdentityKey = value;
    }
    get DeletedBy(): string {
        return this.data.DeletedBy;
    }
    set DeletedBy(value: string) {
        this.data.DeletedBy = value;
    }
    get ActivityTime(): Date {
        return this.data.ActivityTime ? new Date(this.data.ActivityTime) : undefined;
    }
    set ActivityTime(value: Date) {
        this.data.ActivityTime = value;
    }
    get Message(): string {
        return this.data.Message;
    }
    set Message(value: string) {
        this.data.Message = value;
    }
    get Tags(): string[] {
        return this.data.Tags;
    }
    set Tags(value: string[]) {
        this.data.Tags = value;
    }


    deserialize(input: Object, datacontext): Activity {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: Activity) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DeletedDate: model.DeletedDate,
            Id: model.Id,
            Action: model.Action,
            EntityType: model.EntityType,
            EntityId: model.EntityId,
            EntityCorrelationKey: model.EntityCorrelationKey,
            IdentityKey: model.IdentityKey,
            DeletedBy: model.DeletedBy,
            ActivityTime: model.ActivityTime,
            Message: model.Message,
            Tags: model.Tags,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Activity {
        let clone = new Activity();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IApplication {
    readonly CopiedFromId?: string,
    readonly ProvisionStatus: string,
    readonly ProvisionStatusChanged: Date,
    readonly ProvisionErrorReasons?: string[],
    readonly ProvisionWaitingReasons?: string[],
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly Name: string,
    readonly Description: string,
    readonly TaskId?: string,
    readonly RemainingRequiredFields?: string[],
    readonly TotalRequiredFields: number,
    readonly RemainingRequiredSections?: string[],
    readonly MoreThanAllowedSections?: string[],
    readonly RemainingInvalidFields?: string[],
    readonly Committed: boolean,
    readonly Complete: boolean,
    readonly DataChanged: boolean,

    IsCollectedFor?: object[],
    ContainsCondition?: object[],
    Collects?: object[],
    Populates?: object[]

}

export class Application extends VertexModel {
    get Domain(): string {
        return "Area";
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
    get CopiedFromId(): string {
        return this.data.CopiedFromId;
    }
    get ProvisionStatus(): string {
        return this.data.ProvisionStatus;
    }
    get ProvisionStatusChanged(): Date {
        return this.data.ProvisionStatusChanged ? new Date(this.data.ProvisionStatusChanged) : undefined;
    }
    get ProvisionErrorReasons(): string[] {
        return this.data.ProvisionErrorReasons;
    }
    get ProvisionWaitingReasons(): string[] {
        return this.data.ProvisionWaitingReasons;
    }
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
    get Name(): string {
        return this.data.Name;
    }
    get Description(): string {
        return this.data.Description;
    }
    get TaskId(): string {
        return this.data.TaskId;
    }
    get RemainingRequiredFields(): string[] {
        return this.data.RemainingRequiredFields;
    }
    get TotalRequiredFields(): number {
        return this.data.TotalRequiredFields;
    }
    get RemainingRequiredSections(): string[] {
        return this.data.RemainingRequiredSections;
    }
    get MoreThanAllowedSections(): string[] {
        return this.data.MoreThanAllowedSections;
    }
    get RemainingInvalidFields(): string[] {
        return this.data.RemainingInvalidFields;
    }
    get Committed(): boolean {
        return this.data.Committed;
    }
    get Complete(): boolean {
        return this.data.Complete;
    }
    get DataChanged(): boolean {
        return this.data.DataChanged;
    }

    // Relationships

    // Relationship IsCollectedFor, returns Workflow WorkflowCollectsApplication[]
    private __IsCollectedFor: WorkflowCollectsApplication[];
    IsCollectedFor(_context?: BaseDataContext): WorkflowCollectsApplication[] {
        if (this.__IsCollectedFor)
            return this.__IsCollectedFor;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsCollectedFor), (id) => context.get(id) as WorkflowCollectsApplication);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsCollectedFor(values: WorkflowCollectsApplication[]) {
         if (this.Context != null)
             throw Error;

        this.__IsCollectedFor = values;
     }
    get _IsCollectedFor(): Set<string> {
        if (!this._relationships.has("IsCollectedFor"))
            this._relationships.set("IsCollectedFor", new Set<string>());

        return this._relationships.get("IsCollectedFor");
    }
    set _IsCollectedFor(values: Set<string>) {
        this._relationships.set("IsCollectedFor", values);
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
            propertyName: 'IsCollectedFor',
            edgeType: WorkflowCollectsApplication,
            otherVertexPropertyName: 'Collects',
            otherVertexType: Workflow,
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
            CopiedFromId: model.CopiedFromId,
            ProvisionStatus: model.ProvisionStatus,
            ProvisionStatusChanged: model.ProvisionStatusChanged,
            ProvisionErrorReasons: model.ProvisionErrorReasons,
            ProvisionWaitingReasons: model.ProvisionWaitingReasons,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            TaskId: model.TaskId,
            RemainingRequiredFields: model.RemainingRequiredFields,
            TotalRequiredFields: model.TotalRequiredFields,
            RemainingRequiredSections: model.RemainingRequiredSections,
            MoreThanAllowedSections: model.MoreThanAllowedSections,
            RemainingInvalidFields: model.RemainingInvalidFields,
            Committed: model.Committed,
            Complete: model.Complete,
            DataChanged: model.DataChanged,
            IsCollectedFor: ModelUtils.serializeShallowEdge(model.IsCollectedFor(), 'IsCollectedFor'),
            ContainsCondition: ModelUtils.serializeShallowEdge(model.ContainsCondition(), 'ContainsCondition'),
            Collects: ModelUtils.serializeShallowEdge(model.Collects(), 'Collects'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Application {
        let clone = new Application();
        clone.data = _.cloneDeep(this.data);
        clone._IsCollectedFor = _.cloneDeep(this._IsCollectedFor);
        clone._ContainsCondition = _.cloneDeep(this._ContainsCondition);
        clone._Collects = _.cloneDeep(this._Collects);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export class ApplicationCollectsSection extends EdgeModel {
    get Domain(): string {
        return "Area";
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
        return "Area";
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

export class ApplicationDocument extends DocumentModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "ApplicationDocument";
    }

    // Properties
    get CopiedFromId(): string {
        return this.data.CopiedFromId;
    }
    get ProvisionStatus(): string {
        return this.data.ProvisionStatus;
    }
    get ProvisionStatusChanged(): Date {
        return this.data.ProvisionStatusChanged ? new Date(this.data.ProvisionStatusChanged) : undefined;
    }
    get ProvisionErrorReasons(): string[] {
        return this.data.ProvisionErrorReasons;
    }
    get ProvisionWaitingReasons(): string[] {
        return this.data.ProvisionWaitingReasons;
    }
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
    get Name(): string {
        return this.data.Name;
    }
    get Description(): string {
        return this.data.Description;
    }
    get WorkflowSetId(): string {
        return this.data.WorkflowSetId;
    }
    get WorkflowId(): string {
        return this.data.WorkflowId;
    }
    get Edition(): number {
        return this.data.Edition;
    }
    get RemainingRequiredFields(): string[] {
        return this.data.RemainingRequiredFields;
    }
    get TotalRequiredFields(): number {
        return this.data.TotalRequiredFields;
    }
    get RemainingRequiredSections(): string[] {
        return this.data.RemainingRequiredSections;
    }
    get MoreThanAllowedSections(): string[] {
        return this.data.MoreThanAllowedSections;
    }
    get RemainingInvalidFields(): string[] {
        return this.data.RemainingInvalidFields;
    }
    get Committed(): boolean {
        return this.data.Committed;
    }
    get Complete(): boolean {
        return this.data.Complete;
    }
    get DataChanged(): boolean {
        return this.data.DataChanged;
    }


    deserialize(input: Object, datacontext): ApplicationDocument {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: ApplicationDocument) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CopiedFromId: model.CopiedFromId,
            ProvisionStatus: model.ProvisionStatus,
            ProvisionStatusChanged: model.ProvisionStatusChanged,
            ProvisionErrorReasons: model.ProvisionErrorReasons,
            ProvisionWaitingReasons: model.ProvisionWaitingReasons,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            WorkflowSetId: model.WorkflowSetId,
            WorkflowId: model.WorkflowId,
            Edition: model.Edition,
            RemainingRequiredFields: model.RemainingRequiredFields,
            TotalRequiredFields: model.TotalRequiredFields,
            RemainingRequiredSections: model.RemainingRequiredSections,
            MoreThanAllowedSections: model.MoreThanAllowedSections,
            RemainingInvalidFields: model.RemainingInvalidFields,
            Committed: model.Committed,
            Complete: model.Complete,
            DataChanged: model.DataChanged,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): ApplicationDocument {
        let clone = new ApplicationDocument();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ApplicationPopulatesDataStore extends EdgeModel {
    get Domain(): string {
        return "Area";
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

export class ApplicationSubtree extends DocumentModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "ApplicationSubtree";
    }

    // Properties
    get CopiedFromId(): string {
        return this.data.CopiedFromId;
    }
    get OrderNum(): number {
        return this.data.OrderNum;
    }
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
    get ParentSubtreeId(): string {
        return this.data.ParentSubtreeId;
    }
    get WorkflowSetId(): string {
        return this.data.WorkflowSetId;
    }
    get ApplicationId(): string {
        return this.data.ApplicationId;
    }
    get Sections(): any[] {
        return this.data.Sections;
    }
    get StaticElements(): any[] {
        return this.data.StaticElements;
    }
    get RootSectionId(): string {
        return this.data.RootSectionId;
    }
    get Repeatable(): boolean {
        return this.data.Repeatable;
    }
    get RepeatsWithDataStoreSubtree(): any {
        return this.data.RepeatsWithDataStoreSubtree;
    }
    get Participation(): boolean {
        return this.data.Participation;
    }
    get ParticipationStatus(): string {
        return this.data.ParticipationStatus;
    }
    get Committed(): boolean {
        return this.data.Committed;
    }


    deserialize(input: Object, datacontext): ApplicationSubtree {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: ApplicationSubtree) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            ParentSubtreeId: model.ParentSubtreeId,
            WorkflowSetId: model.WorkflowSetId,
            ApplicationId: model.ApplicationId,
            Sections: model.Sections,
            StaticElements: model.StaticElements,
            RootSectionId: model.RootSectionId,
            Repeatable: model.Repeatable,
            RepeatsWithDataStoreSubtree: model.RepeatsWithDataStoreSubtree,
            Participation: model.Participation,
            ParticipationStatus: model.ParticipationStatus,
            Committed: model.Committed,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): ApplicationSubtree {
        let clone = new ApplicationSubtree();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IAssignable {
    Id: string,
    TasksAssigned: number,
    readonly DateCreated?: Date,

    Assignee?: object[]

}

export class Assignable extends VertexModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "Assignable";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Assignable }[] = [
            {className: 'AccountRole', type: AccountRole},
            {className: 'UserPool', type: UserPool},
            {className: 'SMIdentity', type: SMIdentity},
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

    // Relationship Assignee, returns Task AssignableAssignedTask[]
    private __Assignee: AssignableAssignedTask[];
    Assignee(_context?: BaseDataContext): AssignableAssignedTask[] {
        if (this.__Assignee)
            return this.__Assignee;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Assignee), (id) => context.get(id) as AssignableAssignedTask);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setAssignee(values: AssignableAssignedTask[]) {
         if (this.Context != null)
             throw Error;

        this.__Assignee = values;
     }
    get _Assignee(): Set<string> {
        if (!this._relationships.has("Assignee"))
            this._relationships.set("Assignee", new Set<string>());

        return this._relationships.get("Assignee");
    }
    set _Assignee(values: Set<string>) {
        this._relationships.set("Assignee", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Assignee',
            edgeType: AssignableAssignedTask,
            otherVertexPropertyName: 'AssignedTo',
            otherVertexType: Task,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Assignable {
        return ModelUtils.deserializeVertex<Assignable>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Assignable) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            TasksAssigned: model.TasksAssigned,
            DateCreated: model.DateCreated,
            Assignee: ModelUtils.serializeShallowEdge(model.Assignee(), 'Assignee'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Assignable {
        let clone = new Assignable();
        clone.data = _.cloneDeep(this.data);
        clone._Assignee = _.cloneDeep(this._Assignee);

        //clone.Context = this.Context;
        return clone;
    }
}

export class AssignableAssignedTask extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "AssignableAssignedTask";
    }

    // Properties
    get CopiedFromId(): string {
        return this.data.CopiedFromId;
    }
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get DateAssigned(): Date {
        return this.data.DateAssigned ? new Date(this.data.DateAssigned) : undefined;
    }
    set DateAssigned(value: Date) {
        this.data.DateAssigned = value;
    }

    // Relationships

    //   Out to Assignable
    private __AssignedTo: Assignable;

    AssignedTo(context?: BaseDataContext): Assignable {
        if (this.__AssignedTo)
           return this.__AssignedTo;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._AssignedTo) as Assignable;
    }
    setAssignedTo(value: Assignable) {
        this.__AssignedTo = value;
    }
    get _AssignedTo(): string {
        return this.Out;
    }
    set _AssignedTo(value: string) {
        this.Out = value;
    }
    //   In to Task
    private __Assignee: Task;

    Assignee(context?: BaseDataContext): Task {
        if (this.__Assignee)
           return this.__Assignee;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Assignee) as Task;
    }
    setAssignee(value: Task) {
        this.__Assignee = value;
    }
    get _Assignee(): string {
        return this.In;
    }
    set _Assignee(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): AssignableAssignedTask {
       return ModelUtils.deserializeEdge<AssignableAssignedTask>(this, input, datacontext, super._deserialize);
    }


    clone(): AssignableAssignedTask {
        let clone = new AssignableAssignedTask();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class BusinessLocation extends DocumentModel {
    get Domain(): string {
        return "Area";
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

export interface ICorrespondence {
    readonly ExecutionStatus: string,
    readonly ProvisionStatus: string,
    readonly ProvisionStatusChanged: Date,
    readonly ProvisionErrorReasons?: string[],
    readonly ProvisionWaitingReasons?: string[],
    Id: string,
    readonly DataStoreId?: string,
    readonly Locked: boolean,
    readonly Status: string,
    ToRecipients?: string,
    CcRecipients?: string,
    BccRecipients?: string,
    EmailSubjectTemplate: string,
    EmailSubject: string,
    EmailMessageTemplate: string,
    EmailMessage: string,
    SentMessage?: string,
    DocumentCategory?: { [index: string]: string },
    DocumentTags?: { [index: string]: string },
    CorrespondenceType: string,
    Preferences?: string[],
    AllowRecipientEditing: boolean,
    EmailThreadId?: string,
    AddressTo?: string,
    AddressLine1?: string,
    AddressLine2?: string,
    AddressLine3?: string,
    AddressCity?: string,
    AddressState?: string,
    AddressZip?: string,

    DeliveredFor?: object[],
    DeliversAccount?: object[],
    DeliversEmail?: object[],
    MailsTo?: object[],
    ParameterSubstitutes?: object[],
    PertainsTo?: object[],
    PullsFrom?: object[],
    Sends?: object[]

}

export class Correspondence extends VertexModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "Correspondence";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Correspondence }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get ExecutionStatus(): string {
        return this.data.ExecutionStatus;
    }
    get ProvisionStatus(): string {
        return this.data.ProvisionStatus;
    }
    get ProvisionStatusChanged(): Date {
        return this.data.ProvisionStatusChanged ? new Date(this.data.ProvisionStatusChanged) : undefined;
    }
    get ProvisionErrorReasons(): string[] {
        return this.data.ProvisionErrorReasons;
    }
    get ProvisionWaitingReasons(): string[] {
        return this.data.ProvisionWaitingReasons;
    }
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get DataStoreId(): string {
        return this.data.DataStoreId;
    }
    get Locked(): boolean {
        return this.data.Locked;
    }
    get Status(): string {
        return this.data.Status;
    }
    get ToRecipients(): string {
        return this.data.ToRecipients;
    }
    set ToRecipients(value: string) {
        this.data.ToRecipients = value;
    }
    get CcRecipients(): string {
        return this.data.CcRecipients;
    }
    set CcRecipients(value: string) {
        this.data.CcRecipients = value;
    }
    get BccRecipients(): string {
        return this.data.BccRecipients;
    }
    set BccRecipients(value: string) {
        this.data.BccRecipients = value;
    }
    get EmailSubjectTemplate(): string {
        return this.data.EmailSubjectTemplate;
    }
    set EmailSubjectTemplate(value: string) {
        this.data.EmailSubjectTemplate = value;
    }
    get EmailSubject(): string {
        return this.data.EmailSubject;
    }
    set EmailSubject(value: string) {
        this.data.EmailSubject = value;
    }
    get EmailMessageTemplate(): string {
        return this.data.EmailMessageTemplate;
    }
    set EmailMessageTemplate(value: string) {
        this.data.EmailMessageTemplate = value;
    }
    get EmailMessage(): string {
        return this.data.EmailMessage;
    }
    set EmailMessage(value: string) {
        this.data.EmailMessage = value;
    }
    get SentMessage(): string {
        return this.data.SentMessage;
    }
    set SentMessage(value: string) {
        this.data.SentMessage = value;
    }
    get DocumentCategory(): { [index: string]: string } {
        return this.data.DocumentCategory;
    }
    set DocumentCategory(value: { [index: string]: string }) {
        this.data.DocumentCategory = value;
    }
    get DocumentTags(): { [index: string]: string } {
        return this.data.DocumentTags;
    }
    set DocumentTags(value: { [index: string]: string }) {
        this.data.DocumentTags = value;
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
    get AllowRecipientEditing(): boolean {
        return this.data.AllowRecipientEditing;
    }
    set AllowRecipientEditing(value: boolean) {
        this.data.AllowRecipientEditing = value;
    }
    get EmailThreadId(): string {
        return this.data.EmailThreadId;
    }
    set EmailThreadId(value: string) {
        this.data.EmailThreadId = value;
    }
    get AddressTo(): string {
        return this.data.AddressTo;
    }
    set AddressTo(value: string) {
        this.data.AddressTo = value;
    }
    get AddressLine1(): string {
        return this.data.AddressLine1;
    }
    set AddressLine1(value: string) {
        this.data.AddressLine1 = value;
    }
    get AddressLine2(): string {
        return this.data.AddressLine2;
    }
    set AddressLine2(value: string) {
        this.data.AddressLine2 = value;
    }
    get AddressLine3(): string {
        return this.data.AddressLine3;
    }
    set AddressLine3(value: string) {
        this.data.AddressLine3 = value;
    }
    get AddressCity(): string {
        return this.data.AddressCity;
    }
    set AddressCity(value: string) {
        this.data.AddressCity = value;
    }
    get AddressState(): string {
        return this.data.AddressState;
    }
    set AddressState(value: string) {
        this.data.AddressState = value;
    }
    get AddressZip(): string {
        return this.data.AddressZip;
    }
    set AddressZip(value: string) {
        this.data.AddressZip = value;
    }

    // Relationships

    // Relationship DeliveredFor, returns TaskCorrespondence CorrespondenceDeliveredForCorrespondenceTask[]
    private __DeliveredFor: CorrespondenceDeliveredForCorrespondenceTask[];
    DeliveredFor(_context?: BaseDataContext): CorrespondenceDeliveredForCorrespondenceTask[] {
        if (this.__DeliveredFor)
            return this.__DeliveredFor;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._DeliveredFor), (id) => context.get(id) as CorrespondenceDeliveredForCorrespondenceTask);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setDeliveredFor(values: CorrespondenceDeliveredForCorrespondenceTask[]) {
         if (this.Context != null)
             throw Error;

        this.__DeliveredFor = values;
     }
    get _DeliveredFor(): Set<string> {
        if (!this._relationships.has("DeliveredFor"))
            this._relationships.set("DeliveredFor", new Set<string>());

        return this._relationships.get("DeliveredFor");
    }
    set _DeliveredFor(values: Set<string>) {
        this._relationships.set("DeliveredFor", values);
    }

    // Relationship DeliversAccount, returns AccountRole CorrespondenceDeliversAccountRole[]
    private __DeliversAccount: CorrespondenceDeliversAccountRole[];
    DeliversAccount(_context?: BaseDataContext): CorrespondenceDeliversAccountRole[] {
        if (this.__DeliversAccount)
            return this.__DeliversAccount;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._DeliversAccount), (id) => context.get(id) as CorrespondenceDeliversAccountRole);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setDeliversAccount(values: CorrespondenceDeliversAccountRole[]) {
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

    // Relationship DeliversEmail, returns DataPointEmail CorrespondenceDeliversEmail[]
    private __DeliversEmail: CorrespondenceDeliversEmail[];
    DeliversEmail(_context?: BaseDataContext): CorrespondenceDeliversEmail[] {
        if (this.__DeliversEmail)
            return this.__DeliversEmail;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._DeliversEmail), (id) => context.get(id) as CorrespondenceDeliversEmail);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setDeliversEmail(values: CorrespondenceDeliversEmail[]) {
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

    // Relationship MailsTo, returns DataGroup CorrespondenceMailsToDataGroup[]
    private __MailsTo: CorrespondenceMailsToDataGroup[];
    MailsTo(_context?: BaseDataContext): CorrespondenceMailsToDataGroup[] {
        if (this.__MailsTo)
            return this.__MailsTo;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._MailsTo), (id) => context.get(id) as CorrespondenceMailsToDataGroup);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setMailsTo(values: CorrespondenceMailsToDataGroup[]) {
         if (this.Context != null)
             throw Error;

        this.__MailsTo = values;
     }
    get _MailsTo(): Set<string> {
        if (!this._relationships.has("MailsTo"))
            this._relationships.set("MailsTo", new Set<string>());

        return this._relationships.get("MailsTo");
    }
    set _MailsTo(values: Set<string>) {
        this._relationships.set("MailsTo", values);
    }

    // Relationship ParameterSubstitutes, returns DataPoint CorrespondenceParameterSubstitutesDataPoint[]
    private __ParameterSubstitutes: CorrespondenceParameterSubstitutesDataPoint[];
    ParameterSubstitutes(_context?: BaseDataContext): CorrespondenceParameterSubstitutesDataPoint[] {
        if (this.__ParameterSubstitutes)
            return this.__ParameterSubstitutes;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._ParameterSubstitutes), (id) => context.get(id) as CorrespondenceParameterSubstitutesDataPoint);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setParameterSubstitutes(values: CorrespondenceParameterSubstitutesDataPoint[]) {
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

    // Relationship PertainsTo, returns Account CorrespondencePertainsToAccount[]
    private __PertainsTo: CorrespondencePertainsToAccount[];
    PertainsTo(_context?: BaseDataContext): CorrespondencePertainsToAccount[] {
        if (this.__PertainsTo)
            return this.__PertainsTo;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._PertainsTo), (id) => context.get(id) as CorrespondencePertainsToAccount);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setPertainsTo(values: CorrespondencePertainsToAccount[]) {
         if (this.Context != null)
             throw Error;

        this.__PertainsTo = values;
     }
    get _PertainsTo(): Set<string> {
        if (!this._relationships.has("PertainsTo"))
            this._relationships.set("PertainsTo", new Set<string>());

        return this._relationships.get("PertainsTo");
    }
    set _PertainsTo(values: Set<string>) {
        this._relationships.set("PertainsTo", values);
    }

    // Relationship PullsFrom, returns DataStore CorrespondencePullsFromDataStore[]
    private __PullsFrom: CorrespondencePullsFromDataStore[];
    PullsFrom(_context?: BaseDataContext): CorrespondencePullsFromDataStore[] {
        if (this.__PullsFrom)
            return this.__PullsFrom;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._PullsFrom), (id) => context.get(id) as CorrespondencePullsFromDataStore);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setPullsFrom(values: CorrespondencePullsFromDataStore[]) {
         if (this.Context != null)
             throw Error;

        this.__PullsFrom = values;
     }
    get _PullsFrom(): Set<string> {
        if (!this._relationships.has("PullsFrom"))
            this._relationships.set("PullsFrom", new Set<string>());

        return this._relationships.get("PullsFrom");
    }
    set _PullsFrom(values: Set<string>) {
        this._relationships.set("PullsFrom", values);
    }

    // Relationship Sends, returns Document CorrespondenceSendsDocument[]
    private __Sends: CorrespondenceSendsDocument[];
    Sends(_context?: BaseDataContext): CorrespondenceSendsDocument[] {
        if (this.__Sends)
            return this.__Sends;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Sends), (id) => context.get(id) as CorrespondenceSendsDocument);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setSends(values: CorrespondenceSendsDocument[]) {
         if (this.Context != null)
             throw Error;

        this.__Sends = values;
     }
    get _Sends(): Set<string> {
        if (!this._relationships.has("Sends"))
            this._relationships.set("Sends", new Set<string>());

        return this._relationships.get("Sends");
    }
    set _Sends(values: Set<string>) {
        this._relationships.set("Sends", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'DeliveredFor',
            edgeType: CorrespondenceDeliveredForCorrespondenceTask,
            otherVertexPropertyName: 'RequestsDeliveryBy',
            otherVertexType: TaskCorrespondence,
        },
        {
            propertyName: 'DeliversAccount',
            edgeType: CorrespondenceDeliversAccountRole,
            otherVertexPropertyName: 'DeliveredBy',
            otherVertexType: AccountRole,
        },
        {
            propertyName: 'DeliversEmail',
            edgeType: CorrespondenceDeliversEmail,
            otherVertexPropertyName: 'DeliveredBy',
            otherVertexType: DataPointEmail,
        },
        {
            propertyName: 'MailsTo',
            edgeType: CorrespondenceMailsToDataGroup,
            otherVertexPropertyName: 'MailedBy',
            otherVertexType: DataGroup,
        },
        {
            propertyName: 'ParameterSubstitutes',
            edgeType: CorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutedBy',
            otherVertexType: DataPoint,
        },
        {
            propertyName: 'PertainsTo',
            edgeType: CorrespondencePertainsToAccount,
            otherVertexPropertyName: 'Communicates',
            otherVertexType: Account,
        },
        {
            propertyName: 'PullsFrom',
            edgeType: CorrespondencePullsFromDataStore,
            otherVertexPropertyName: 'GivesTo',
            otherVertexType: DataStore,
        },
        {
            propertyName: 'Sends',
            edgeType: CorrespondenceSendsDocument,
            otherVertexPropertyName: 'SentBy',
            otherVertexType: Document,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Correspondence {
        return ModelUtils.deserializeVertex<Correspondence>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Correspondence) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            ExecutionStatus: model.ExecutionStatus,
            ProvisionStatus: model.ProvisionStatus,
            ProvisionStatusChanged: model.ProvisionStatusChanged,
            ProvisionErrorReasons: model.ProvisionErrorReasons,
            ProvisionWaitingReasons: model.ProvisionWaitingReasons,
            Id: model.Id,
            DataStoreId: model.DataStoreId,
            Locked: model.Locked,
            Status: model.Status,
            ToRecipients: model.ToRecipients,
            CcRecipients: model.CcRecipients,
            BccRecipients: model.BccRecipients,
            EmailSubjectTemplate: model.EmailSubjectTemplate,
            EmailSubject: model.EmailSubject,
            EmailMessageTemplate: model.EmailMessageTemplate,
            EmailMessage: model.EmailMessage,
            SentMessage: model.SentMessage,
            DocumentCategory: model.DocumentCategory,
            DocumentTags: model.DocumentTags,
            CorrespondenceType: model.CorrespondenceType,
            Preferences: model.Preferences,
            AllowRecipientEditing: model.AllowRecipientEditing,
            EmailThreadId: model.EmailThreadId,
            AddressTo: model.AddressTo,
            AddressLine1: model.AddressLine1,
            AddressLine2: model.AddressLine2,
            AddressLine3: model.AddressLine3,
            AddressCity: model.AddressCity,
            AddressState: model.AddressState,
            AddressZip: model.AddressZip,
            DeliveredFor: ModelUtils.serializeShallowEdge(model.DeliveredFor(), 'DeliveredFor'),
            DeliversAccount: ModelUtils.serializeShallowEdge(model.DeliversAccount(), 'DeliversAccount'),
            DeliversEmail: ModelUtils.serializeShallowEdge(model.DeliversEmail(), 'DeliversEmail'),
            MailsTo: ModelUtils.serializeShallowEdge(model.MailsTo(), 'MailsTo'),
            ParameterSubstitutes: ModelUtils.serializeShallowEdge(model.ParameterSubstitutes(), 'ParameterSubstitutes'),
            PertainsTo: ModelUtils.serializeShallowEdge(model.PertainsTo(), 'PertainsTo'),
            PullsFrom: ModelUtils.serializeShallowEdge(model.PullsFrom(), 'PullsFrom'),
            Sends: ModelUtils.serializeShallowEdge(model.Sends(), 'Sends'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Correspondence {
        let clone = new Correspondence();
        clone.data = _.cloneDeep(this.data);
        clone._DeliveredFor = _.cloneDeep(this._DeliveredFor);
        clone._DeliversAccount = _.cloneDeep(this._DeliversAccount);
        clone._DeliversEmail = _.cloneDeep(this._DeliversEmail);
        clone._MailsTo = _.cloneDeep(this._MailsTo);
        clone._ParameterSubstitutes = _.cloneDeep(this._ParameterSubstitutes);
        clone._PertainsTo = _.cloneDeep(this._PertainsTo);
        clone._PullsFrom = _.cloneDeep(this._PullsFrom);
        clone._Sends = _.cloneDeep(this._Sends);

        //clone.Context = this.Context;
        return clone;
    }
}

export class CorrespondenceDeliveredForCorrespondenceTask extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "CorrespondenceDeliveredForCorrespondenceTask";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Correspondence
    private __RequestsDeliveryBy: Correspondence;

    RequestsDeliveryBy(context?: BaseDataContext): Correspondence {
        if (this.__RequestsDeliveryBy)
           return this.__RequestsDeliveryBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._RequestsDeliveryBy) as Correspondence;
    }
    setRequestsDeliveryBy(value: Correspondence) {
        this.__RequestsDeliveryBy = value;
    }
    get _RequestsDeliveryBy(): string {
        return this.Out;
    }
    set _RequestsDeliveryBy(value: string) {
        this.Out = value;
    }
    //   In to TaskCorrespondence
    private __DeliveredFor: TaskCorrespondence;

    DeliveredFor(context?: BaseDataContext): TaskCorrespondence {
        if (this.__DeliveredFor)
           return this.__DeliveredFor;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._DeliveredFor) as TaskCorrespondence;
    }
    setDeliveredFor(value: TaskCorrespondence) {
        this.__DeliveredFor = value;
    }
    get _DeliveredFor(): string {
        return this.In;
    }
    set _DeliveredFor(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): CorrespondenceDeliveredForCorrespondenceTask {
       return ModelUtils.deserializeEdge<CorrespondenceDeliveredForCorrespondenceTask>(this, input, datacontext, super._deserialize);
    }


    clone(): CorrespondenceDeliveredForCorrespondenceTask {
        let clone = new CorrespondenceDeliveredForCorrespondenceTask();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class CorrespondenceDeliversAccountRole extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "CorrespondenceDeliversAccountRole";
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

    //   Out to Correspondence
    private __DeliveredBy: Correspondence;

    DeliveredBy(context?: BaseDataContext): Correspondence {
        if (this.__DeliveredBy)
           return this.__DeliveredBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._DeliveredBy) as Correspondence;
    }
    setDeliveredBy(value: Correspondence) {
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

    deserialize(input: Object, datacontext): CorrespondenceDeliversAccountRole {
       return ModelUtils.deserializeEdge<CorrespondenceDeliversAccountRole>(this, input, datacontext, super._deserialize);
    }


    clone(): CorrespondenceDeliversAccountRole {
        let clone = new CorrespondenceDeliversAccountRole();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class CorrespondenceDeliversEmail extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "CorrespondenceDeliversEmail";
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

    //   Out to Correspondence
    private __DeliveredBy: Correspondence;

    DeliveredBy(context?: BaseDataContext): Correspondence {
        if (this.__DeliveredBy)
           return this.__DeliveredBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._DeliveredBy) as Correspondence;
    }
    setDeliveredBy(value: Correspondence) {
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

    deserialize(input: Object, datacontext): CorrespondenceDeliversEmail {
       return ModelUtils.deserializeEdge<CorrespondenceDeliversEmail>(this, input, datacontext, super._deserialize);
    }


    clone(): CorrespondenceDeliversEmail {
        let clone = new CorrespondenceDeliversEmail();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class CorrespondenceMailsToDataGroup extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "CorrespondenceMailsToDataGroup";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Correspondence
    private __MailedBy: Correspondence;

    MailedBy(context?: BaseDataContext): Correspondence {
        if (this.__MailedBy)
           return this.__MailedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._MailedBy) as Correspondence;
    }
    setMailedBy(value: Correspondence) {
        this.__MailedBy = value;
    }
    get _MailedBy(): string {
        return this.Out;
    }
    set _MailedBy(value: string) {
        this.Out = value;
    }
    //   In to DataGroup
    private __MailsTo: DataGroup;

    MailsTo(context?: BaseDataContext): DataGroup {
        if (this.__MailsTo)
           return this.__MailsTo;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._MailsTo) as DataGroup;
    }
    setMailsTo(value: DataGroup) {
        this.__MailsTo = value;
    }
    get _MailsTo(): string {
        return this.In;
    }
    set _MailsTo(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): CorrespondenceMailsToDataGroup {
       return ModelUtils.deserializeEdge<CorrespondenceMailsToDataGroup>(this, input, datacontext, super._deserialize);
    }


    clone(): CorrespondenceMailsToDataGroup {
        let clone = new CorrespondenceMailsToDataGroup();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class CorrespondenceParameterSubstitutesDataPoint extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "CorrespondenceParameterSubstitutesDataPoint";
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

    // Relationships

    //   Out to Correspondence
    private __ParameterSubstitutedBy: Correspondence;

    ParameterSubstitutedBy(context?: BaseDataContext): Correspondence {
        if (this.__ParameterSubstitutedBy)
           return this.__ParameterSubstitutedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._ParameterSubstitutedBy) as Correspondence;
    }
    setParameterSubstitutedBy(value: Correspondence) {
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

    deserialize(input: Object, datacontext): CorrespondenceParameterSubstitutesDataPoint {
       return ModelUtils.deserializeEdge<CorrespondenceParameterSubstitutesDataPoint>(this, input, datacontext, super._deserialize);
    }


    clone(): CorrespondenceParameterSubstitutesDataPoint {
        let clone = new CorrespondenceParameterSubstitutesDataPoint();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class CorrespondencePertainsToAccount extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "CorrespondencePertainsToAccount";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Correspondence
    private __Communicates: Correspondence;

    Communicates(context?: BaseDataContext): Correspondence {
        if (this.__Communicates)
           return this.__Communicates;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Communicates) as Correspondence;
    }
    setCommunicates(value: Correspondence) {
        this.__Communicates = value;
    }
    get _Communicates(): string {
        return this.Out;
    }
    set _Communicates(value: string) {
        this.Out = value;
    }
    //   In to Account
    private __PertainsTo: Account;

    PertainsTo(context?: BaseDataContext): Account {
        if (this.__PertainsTo)
           return this.__PertainsTo;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._PertainsTo) as Account;
    }
    setPertainsTo(value: Account) {
        this.__PertainsTo = value;
    }
    get _PertainsTo(): string {
        return this.In;
    }
    set _PertainsTo(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): CorrespondencePertainsToAccount {
       return ModelUtils.deserializeEdge<CorrespondencePertainsToAccount>(this, input, datacontext, super._deserialize);
    }


    clone(): CorrespondencePertainsToAccount {
        let clone = new CorrespondencePertainsToAccount();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class CorrespondencePullsFromDataStore extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "CorrespondencePullsFromDataStore";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Correspondence
    private __GivesTo: Correspondence;

    GivesTo(context?: BaseDataContext): Correspondence {
        if (this.__GivesTo)
           return this.__GivesTo;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._GivesTo) as Correspondence;
    }
    setGivesTo(value: Correspondence) {
        this.__GivesTo = value;
    }
    get _GivesTo(): string {
        return this.Out;
    }
    set _GivesTo(value: string) {
        this.Out = value;
    }
    //   In to DataStore
    private __PullsFrom: DataStore;

    PullsFrom(context?: BaseDataContext): DataStore {
        if (this.__PullsFrom)
           return this.__PullsFrom;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._PullsFrom) as DataStore;
    }
    setPullsFrom(value: DataStore) {
        this.__PullsFrom = value;
    }
    get _PullsFrom(): string {
        return this.In;
    }
    set _PullsFrom(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): CorrespondencePullsFromDataStore {
       return ModelUtils.deserializeEdge<CorrespondencePullsFromDataStore>(this, input, datacontext, super._deserialize);
    }


    clone(): CorrespondencePullsFromDataStore {
        let clone = new CorrespondencePullsFromDataStore();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class CorrespondenceSendsDocument extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "CorrespondenceSendsDocument";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Correspondence
    private __SentBy: Correspondence;

    SentBy(context?: BaseDataContext): Correspondence {
        if (this.__SentBy)
           return this.__SentBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._SentBy) as Correspondence;
    }
    setSentBy(value: Correspondence) {
        this.__SentBy = value;
    }
    get _SentBy(): string {
        return this.Out;
    }
    set _SentBy(value: string) {
        this.Out = value;
    }
    //   In to Document
    private __Sends: Document;

    Sends(context?: BaseDataContext): Document {
        if (this.__Sends)
           return this.__Sends;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Sends) as Document;
    }
    setSends(value: Document) {
        this.__Sends = value;
    }
    get _Sends(): string {
        return this.In;
    }
    set _Sends(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): CorrespondenceSendsDocument {
       return ModelUtils.deserializeEdge<CorrespondenceSendsDocument>(this, input, datacontext, super._deserialize);
    }


    clone(): CorrespondenceSendsDocument {
        let clone = new CorrespondenceSendsDocument();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IDataGroup {
    readonly CommittedEditions?: number[],
    readonly EditionParticipation?: { [index: number]: boolean },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly Name: string,
    readonly Description?: string,
    readonly Repeatable: boolean,
    ReferenceId?: string,
    ReferenceObject?: string,
    ProductId?: string,
    Tag?: string,
    readonly DataGroupType?: string,
    TrackingKey?: string,
    readonly DataStoreId: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly RepeatableAncestors?: string[],
    readonly RepeatablePath?: any[],
    readonly RepeatablePathWasCalculated?: boolean,

    RepeatsWithSection?: object[],
    ChildOf?: object[],
    IsContainedBy?: object[],
    MailedBy?: object[],
    ParentOf?: object[],
    Contains?: object[]

}

export class DataGroup extends VertexModel {
    get Domain(): string {
        return "Area";
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
    get CommittedEditions(): number[] {
        return this.data.CommittedEditions;
    }
    get EditionParticipation(): { [index: number]: boolean } {
        return this.data.EditionParticipation;
    }
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
    get Name(): string {
        return this.data.Name;
    }
    get Description(): string {
        return this.data.Description;
    }
    get Repeatable(): boolean {
        return this.data.Repeatable;
    }
    get ReferenceId(): string {
        return this.data.ReferenceId;
    }
    set ReferenceId(value: string) {
        this.data.ReferenceId = value;
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
    get Tag(): string {
        return this.data.Tag;
    }
    set Tag(value: string) {
        this.data.Tag = value;
    }
    get DataGroupType(): string {
        return this.data.DataGroupType;
    }
    get TrackingKey(): string {
        return this.data.TrackingKey;
    }
    set TrackingKey(value: string) {
        this.data.TrackingKey = value;
    }
    get DataStoreId(): string {
        return this.data.DataStoreId;
    }
    get WorkflowSetId(): string {
        return this.data.WorkflowSetId;
    }
    get ParentId(): string {
        return this.data.ParentId;
    }
    get RepeatableAncestors(): string[] {
        return this.data.RepeatableAncestors;
    }
    get RepeatablePath(): any[] {
        return this.data.RepeatablePath;
    }
    get RepeatablePathWasCalculated(): boolean {
        return this.data.RepeatablePathWasCalculated;
    }

    // Relationships

    // Relationship RepeatsWithSection, returns Section SectionRepeatsWithDataGroup[]
    private __RepeatsWithSection: SectionRepeatsWithDataGroup[];
    RepeatsWithSection(_context?: BaseDataContext): SectionRepeatsWithDataGroup[] {
        if (this.__RepeatsWithSection)
            return this.__RepeatsWithSection;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._RepeatsWithSection), (id) => context.get(id) as SectionRepeatsWithDataGroup);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setRepeatsWithSection(values: SectionRepeatsWithDataGroup[]) {
         if (this.Context != null)
             throw Error;

        this.__RepeatsWithSection = values;
     }
    get _RepeatsWithSection(): Set<string> {
        if (!this._relationships.has("RepeatsWithSection"))
            this._relationships.set("RepeatsWithSection", new Set<string>());

        return this._relationships.get("RepeatsWithSection");
    }
    set _RepeatsWithSection(values: Set<string>) {
        this._relationships.set("RepeatsWithSection", values);
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

    // Relationship MailedBy, returns Correspondence CorrespondenceMailsToDataGroup[]
    private __MailedBy: CorrespondenceMailsToDataGroup[];
    MailedBy(_context?: BaseDataContext): CorrespondenceMailsToDataGroup[] {
        if (this.__MailedBy)
            return this.__MailedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._MailedBy), (id) => context.get(id) as CorrespondenceMailsToDataGroup);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setMailedBy(values: CorrespondenceMailsToDataGroup[]) {
         if (this.Context != null)
             throw Error;

        this.__MailedBy = values;
     }
    get _MailedBy(): Set<string> {
        if (!this._relationships.has("MailedBy"))
            this._relationships.set("MailedBy", new Set<string>());

        return this._relationships.get("MailedBy");
    }
    set _MailedBy(values: Set<string>) {
        this._relationships.set("MailedBy", values);
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


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'RepeatsWithSection',
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
            propertyName: 'MailedBy',
            edgeType: CorrespondenceMailsToDataGroup,
            otherVertexPropertyName: 'MailsTo',
            otherVertexType: Correspondence,
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

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataGroup {
        return ModelUtils.deserializeVertex<DataGroup>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataGroup) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            EditionParticipation: model.EditionParticipation,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            Repeatable: model.Repeatable,
            ReferenceId: model.ReferenceId,
            ReferenceObject: model.ReferenceObject,
            ProductId: model.ProductId,
            Tag: model.Tag,
            DataGroupType: model.DataGroupType,
            TrackingKey: model.TrackingKey,
            DataStoreId: model.DataStoreId,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            RepeatableAncestors: model.RepeatableAncestors,
            RepeatablePath: model.RepeatablePath,
            RepeatablePathWasCalculated: model.RepeatablePathWasCalculated,
            RepeatsWithSection: ModelUtils.serializeShallowEdge(model.RepeatsWithSection(), 'RepeatsWithSection'),
            ChildOf: ModelUtils.serializeShallowEdge(model.ChildOf(), 'ChildOf'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            MailedBy: ModelUtils.serializeShallowEdge(model.MailedBy(), 'MailedBy'),
            ParentOf: ModelUtils.serializeShallowEdge(model.ParentOf(), 'ParentOf'),
            Contains: ModelUtils.serializeShallowEdge(model.Contains(), 'Contains'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DataGroup {
        let clone = new DataGroup();
        clone.data = _.cloneDeep(this.data);
        clone._RepeatsWithSection = _.cloneDeep(this._RepeatsWithSection);
        clone._ChildOf = _.cloneDeep(this._ChildOf);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._MailedBy = _.cloneDeep(this._MailedBy);
        clone._ParentOf = _.cloneDeep(this._ParentOf);
        clone._Contains = _.cloneDeep(this._Contains);

        //clone.Context = this.Context;
        return clone;
    }
}

export class DataGroupChildDataGroup extends EdgeModel {
    get Domain(): string {
        return "Area";
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
        return "Area";
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

export interface IDataStore {
    readonly ProvisionStatus: string,
    readonly ProvisionStatusChanged: Date,
    readonly ProvisionErrorReasons?: string[],
    readonly ProvisionWaitingReasons?: string[],
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly Name: string,
    readonly Description?: string,
    readonly Aliases?: string[],
    readonly OwnerId: string,
    readonly Editions?: { [index: number]: string },
    readonly CommittedEditions?: number[],
    readonly PartiallyCommittedEditions?: number[],
    readonly RepeatableAncestorsWasCalculated?: boolean,
    readonly MigratedEditions?: { [index: number]: number },

    IsPopulatedBy?: object[],
    CalculatedBy?: object[],
    GivesTo?: object[],
    IsStoredFor?: object[],
    Contains?: object[]

}

export class DataStore extends VertexModel {
    get Domain(): string {
        return "Area";
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
    get ProvisionStatus(): string {
        return this.data.ProvisionStatus;
    }
    get ProvisionStatusChanged(): Date {
        return this.data.ProvisionStatusChanged ? new Date(this.data.ProvisionStatusChanged) : undefined;
    }
    get ProvisionErrorReasons(): string[] {
        return this.data.ProvisionErrorReasons;
    }
    get ProvisionWaitingReasons(): string[] {
        return this.data.ProvisionWaitingReasons;
    }
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
    get Name(): string {
        return this.data.Name;
    }
    get Description(): string {
        return this.data.Description;
    }
    get Aliases(): string[] {
        return this.data.Aliases;
    }
    get OwnerId(): string {
        return this.data.OwnerId;
    }
    get Editions(): { [index: number]: string } {
        return this.data.Editions;
    }
    get CommittedEditions(): number[] {
        return this.data.CommittedEditions;
    }
    get PartiallyCommittedEditions(): number[] {
        return this.data.PartiallyCommittedEditions;
    }
    get RepeatableAncestorsWasCalculated(): boolean {
        return this.data.RepeatableAncestorsWasCalculated;
    }
    get MigratedEditions(): { [index: number]: number } {
        return this.data.MigratedEditions;
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

    // Relationship CalculatedBy, returns Map MapCalculatesDataStore[]
    private __CalculatedBy: MapCalculatesDataStore[];
    CalculatedBy(_context?: BaseDataContext): MapCalculatesDataStore[] {
        if (this.__CalculatedBy)
            return this.__CalculatedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._CalculatedBy), (id) => context.get(id) as MapCalculatesDataStore);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setCalculatedBy(values: MapCalculatesDataStore[]) {
         if (this.Context != null)
             throw Error;

        this.__CalculatedBy = values;
     }
    get _CalculatedBy(): Set<string> {
        if (!this._relationships.has("CalculatedBy"))
            this._relationships.set("CalculatedBy", new Set<string>());

        return this._relationships.get("CalculatedBy");
    }
    set _CalculatedBy(values: Set<string>) {
        this._relationships.set("CalculatedBy", values);
    }

    // Relationship GivesTo, returns Correspondence CorrespondencePullsFromDataStore[]
    private __GivesTo: CorrespondencePullsFromDataStore[];
    GivesTo(_context?: BaseDataContext): CorrespondencePullsFromDataStore[] {
        if (this.__GivesTo)
            return this.__GivesTo;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._GivesTo), (id) => context.get(id) as CorrespondencePullsFromDataStore);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setGivesTo(values: CorrespondencePullsFromDataStore[]) {
         if (this.Context != null)
             throw Error;

        this.__GivesTo = values;
     }
    get _GivesTo(): Set<string> {
        if (!this._relationships.has("GivesTo"))
            this._relationships.set("GivesTo", new Set<string>());

        return this._relationships.get("GivesTo");
    }
    set _GivesTo(values: Set<string>) {
        this._relationships.set("GivesTo", values);
    }

    // Relationship IsStoredFor, returns Workflow WorkflowStoresDataStore[]
    private __IsStoredFor: WorkflowStoresDataStore[];
    IsStoredFor(_context?: BaseDataContext): WorkflowStoresDataStore[] {
        if (this.__IsStoredFor)
            return this.__IsStoredFor;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsStoredFor), (id) => context.get(id) as WorkflowStoresDataStore);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsStoredFor(values: WorkflowStoresDataStore[]) {
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


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsPopulatedBy',
            edgeType: ApplicationPopulatesDataStore,
            otherVertexPropertyName: 'Populates',
            otherVertexType: Application,
        },
        {
            propertyName: 'CalculatedBy',
            edgeType: MapCalculatesDataStore,
            otherVertexPropertyName: 'Calculates',
            otherVertexType: Map,
        },
        {
            propertyName: 'GivesTo',
            edgeType: CorrespondencePullsFromDataStore,
            otherVertexPropertyName: 'PullsFrom',
            otherVertexType: Correspondence,
        },
        {
            propertyName: 'IsStoredFor',
            edgeType: WorkflowStoresDataStore,
            otherVertexPropertyName: 'Stores',
            otherVertexType: Workflow,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Contains',
            edgeType: DataStoreContainsDataGroup,
            otherVertexPropertyName: 'IsContainedBy',
            otherVertexType: DataGroup,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataStore {
        return ModelUtils.deserializeVertex<DataStore>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataStore) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            ProvisionStatus: model.ProvisionStatus,
            ProvisionStatusChanged: model.ProvisionStatusChanged,
            ProvisionErrorReasons: model.ProvisionErrorReasons,
            ProvisionWaitingReasons: model.ProvisionWaitingReasons,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            Aliases: model.Aliases,
            OwnerId: model.OwnerId,
            Editions: model.Editions,
            CommittedEditions: model.CommittedEditions,
            PartiallyCommittedEditions: model.PartiallyCommittedEditions,
            RepeatableAncestorsWasCalculated: model.RepeatableAncestorsWasCalculated,
            MigratedEditions: model.MigratedEditions,
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            CalculatedBy: ModelUtils.serializeShallowEdge(model.CalculatedBy(), 'CalculatedBy'),
            GivesTo: ModelUtils.serializeShallowEdge(model.GivesTo(), 'GivesTo'),
            IsStoredFor: ModelUtils.serializeShallowEdge(model.IsStoredFor(), 'IsStoredFor'),
            Contains: ModelUtils.serializeShallowEdge(model.Contains(), 'Contains'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DataStore {
        let clone = new DataStore();
        clone.data = _.cloneDeep(this.data);
        clone._IsPopulatedBy = _.cloneDeep(this._IsPopulatedBy);
        clone._CalculatedBy = _.cloneDeep(this._CalculatedBy);
        clone._GivesTo = _.cloneDeep(this._GivesTo);
        clone._IsStoredFor = _.cloneDeep(this._IsStoredFor);
        clone._Contains = _.cloneDeep(this._Contains);

        //clone.Context = this.Context;
        return clone;
    }
}

export class DataStoreContainsDataGroup extends EdgeModel {
    get Domain(): string {
        return "Area";
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

export class DataStoreDocument extends DocumentModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "DataStoreDocument";
    }

    // Properties
    get ProvisionStatus(): string {
        return this.data.ProvisionStatus;
    }
    get ProvisionStatusChanged(): Date {
        return this.data.ProvisionStatusChanged ? new Date(this.data.ProvisionStatusChanged) : undefined;
    }
    get ProvisionErrorReasons(): string[] {
        return this.data.ProvisionErrorReasons;
    }
    get ProvisionWaitingReasons(): string[] {
        return this.data.ProvisionWaitingReasons;
    }
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
    get Name(): string {
        return this.data.Name;
    }
    get Description(): string {
        return this.data.Description;
    }
    get WorkflowSetId(): string {
        return this.data.WorkflowSetId;
    }
    get OwnerId(): string {
        return this.data.OwnerId;
    }
    get Editions(): { [index: number]: string } {
        return this.data.Editions;
    }
    get CommittedEditions(): number[] {
        return this.data.CommittedEditions;
    }
    get PartiallyCommittedEditions(): number[] {
        return this.data.PartiallyCommittedEditions;
    }
    get MigratedEditions(): { [index: number]: number } {
        return this.data.MigratedEditions;
    }


    deserialize(input: Object, datacontext): DataStoreDocument {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: DataStoreDocument) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            ProvisionStatus: model.ProvisionStatus,
            ProvisionStatusChanged: model.ProvisionStatusChanged,
            ProvisionErrorReasons: model.ProvisionErrorReasons,
            ProvisionWaitingReasons: model.ProvisionWaitingReasons,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            WorkflowSetId: model.WorkflowSetId,
            OwnerId: model.OwnerId,
            Editions: model.Editions,
            CommittedEditions: model.CommittedEditions,
            PartiallyCommittedEditions: model.PartiallyCommittedEditions,
            MigratedEditions: model.MigratedEditions,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DataStoreDocument {
        let clone = new DataStoreDocument();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class DataStoreSubtree extends DocumentModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "DataStoreSubtree";
    }

    // Properties
    get CommittedEditions(): number[] {
        return this.data.CommittedEditions;
    }
    get EditionParticipation(): { [index: number]: boolean } {
        return this.data.EditionParticipation;
    }
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
    get ParentSubtreeId(): string {
        return this.data.ParentSubtreeId;
    }
    get WorkflowSetId(): string {
        return this.data.WorkflowSetId;
    }
    get DataStoreId(): string {
        return this.data.DataStoreId;
    }
    get DataGroups(): any[] {
        return this.data.DataGroups;
    }
    get RootDataGroupId(): string {
        return this.data.RootDataGroupId;
    }
    get Repeatable(): boolean {
        return this.data.Repeatable;
    }
    get RepeatableApplicationSubtreeLinks(): any[] {
        return this.data.RepeatableApplicationSubtreeLinks;
    }
    get RepeatablePath(): any[] {
        return this.data.RepeatablePath;
    }


    deserialize(input: Object, datacontext): DataStoreSubtree {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: DataStoreSubtree) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            EditionParticipation: model.EditionParticipation,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            ParentSubtreeId: model.ParentSubtreeId,
            WorkflowSetId: model.WorkflowSetId,
            DataStoreId: model.DataStoreId,
            DataGroups: model.DataGroups,
            RootDataGroupId: model.RootDataGroupId,
            Repeatable: model.Repeatable,
            RepeatableApplicationSubtreeLinks: model.RepeatableApplicationSubtreeLinks,
            RepeatablePath: model.RepeatablePath,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DataStoreSubtree {
        let clone = new DataStoreSubtree();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IDocument {
    readonly DeletedDate?: Date,
    Id: string,
    Description: string,
    readonly Status: string,
    readonly ExtractionStatus?: string,
    DocumentDateLabel?: string,
    DocumentDate?: Date,
    readonly OriginDate?: Date,
    readonly UpdatedDate?: Date,
    readonly ExtractionRequestedAt?: Date,
    readonly ExtractionExternalTrackingId?: string,
    readonly Size?: number,
    AccountId?: string,
    DocumentCategoryId?: string,
    FileExtension?: string,
    Tags?: string[],
    PolicySets?: string[],
    EffectiveDate?: ContractDate,
    readonly UploadedBy?: string,
    readonly ExtractionFailureReason?: string,
    EmailMessageIdsForAttachment?: string[],

    SentBy?: object[],
    Informs?: object[],
    Invoices?: object[],
    Satisfies?: object[]

}

export class Document extends VertexModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "Document";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Document }[] = [

        ];
        return derivedTypes;
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
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get Status(): string {
        return this.data.Status;
    }
    get ExtractionStatus(): string {
        return this.data.ExtractionStatus;
    }
    get DocumentDateLabel(): string {
        return this.data.DocumentDateLabel;
    }
    set DocumentDateLabel(value: string) {
        this.data.DocumentDateLabel = value;
    }
    get DocumentDate(): Date {
        return this.data.DocumentDate ? new Date(this.data.DocumentDate) : undefined;
    }
    set DocumentDate(value: Date) {
        this.data.DocumentDate = value;
    }
    get OriginDate(): Date {
        return this.data.OriginDate ? new Date(this.data.OriginDate) : undefined;
    }
    get UpdatedDate(): Date {
        return this.data.UpdatedDate ? new Date(this.data.UpdatedDate) : undefined;
    }
    get ExtractionRequestedAt(): Date {
        return this.data.ExtractionRequestedAt ? new Date(this.data.ExtractionRequestedAt) : undefined;
    }
    get ExtractionExternalTrackingId(): string {
        return this.data.ExtractionExternalTrackingId;
    }
    get Size(): number {
        return this.data.Size;
    }
    get AccountId(): string {
        return this.data.AccountId;
    }
    set AccountId(value: string) {
        this.data.AccountId = value;
    }
    get DocumentCategoryId(): string {
        return this.data.DocumentCategoryId;
    }
    set DocumentCategoryId(value: string) {
        this.data.DocumentCategoryId = value;
    }
    get FileExtension(): string {
        return this.data.FileExtension;
    }
    set FileExtension(value: string) {
        this.data.FileExtension = value;
    }
    get Tags(): string[] {
        return this.data.Tags;
    }
    set Tags(value: string[]) {
        this.data.Tags = value;
    }
    get PolicySets(): string[] {
        return this.data.PolicySets;
    }
    set PolicySets(value: string[]) {
        this.data.PolicySets = value;
    }
    get EffectiveDate(): ContractDate {
        this.data.EffectiveDate = ModelUtils.deserializeContractDate(this.data.EffectiveDate);
        return this.data.EffectiveDate;
    }
    set EffectiveDate(value: ContractDate) {
        this.data.EffectiveDate = value;
    }
    get UploadedBy(): string {
        return this.data.UploadedBy;
    }
    get ExtractionFailureReason(): string {
        return this.data.ExtractionFailureReason;
    }
    get EmailMessageIdsForAttachment(): string[] {
        return this.data.EmailMessageIdsForAttachment;
    }
    set EmailMessageIdsForAttachment(value: string[]) {
        this.data.EmailMessageIdsForAttachment = value;
    }

    // Relationships

    // Relationship SentBy, returns Correspondence CorrespondenceSendsDocument[]
    private __SentBy: CorrespondenceSendsDocument[];
    SentBy(_context?: BaseDataContext): CorrespondenceSendsDocument[] {
        if (this.__SentBy)
            return this.__SentBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._SentBy), (id) => context.get(id) as CorrespondenceSendsDocument);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setSentBy(values: CorrespondenceSendsDocument[]) {
         if (this.Context != null)
             throw Error;

        this.__SentBy = values;
     }
    get _SentBy(): Set<string> {
        if (!this._relationships.has("SentBy"))
            this._relationships.set("SentBy", new Set<string>());

        return this._relationships.get("SentBy");
    }
    set _SentBy(values: Set<string>) {
        this._relationships.set("SentBy", values);
    }

    // Relationship Informs, returns Transaction DocumentInformsTransaction[]
    private __Informs: DocumentInformsTransaction[];
    Informs(_context?: BaseDataContext): DocumentInformsTransaction[] {
        if (this.__Informs)
            return this.__Informs;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Informs), (id) => context.get(id) as DocumentInformsTransaction);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setInforms(values: DocumentInformsTransaction[]) {
         if (this.Context != null)
             throw Error;

        this.__Informs = values;
     }
    get _Informs(): Set<string> {
        if (!this._relationships.has("Informs"))
            this._relationships.set("Informs", new Set<string>());

        return this._relationships.get("Informs");
    }
    set _Informs(values: Set<string>) {
        this._relationships.set("Informs", values);
    }

    // Relationship Invoices, returns Invoice DocumentInvoicesInvoice[]
    private __Invoices: DocumentInvoicesInvoice[];
    Invoices(_context?: BaseDataContext): DocumentInvoicesInvoice[] {
        if (this.__Invoices)
            return this.__Invoices;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Invoices), (id) => context.get(id) as DocumentInvoicesInvoice);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setInvoices(values: DocumentInvoicesInvoice[]) {
         if (this.Context != null)
             throw Error;

        this.__Invoices = values;
     }
    get _Invoices(): Set<string> {
        if (!this._relationships.has("Invoices"))
            this._relationships.set("Invoices", new Set<string>());

        return this._relationships.get("Invoices");
    }
    set _Invoices(values: Set<string>) {
        this._relationships.set("Invoices", values);
    }

    // Relationship Satisfies, returns Task DocumentSatisfiesTask[]
    private __Satisfies: DocumentSatisfiesTask[];
    Satisfies(_context?: BaseDataContext): DocumentSatisfiesTask[] {
        if (this.__Satisfies)
            return this.__Satisfies;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Satisfies), (id) => context.get(id) as DocumentSatisfiesTask);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setSatisfies(values: DocumentSatisfiesTask[]) {
         if (this.Context != null)
             throw Error;

        this.__Satisfies = values;
     }
    get _Satisfies(): Set<string> {
        if (!this._relationships.has("Satisfies"))
            this._relationships.set("Satisfies", new Set<string>());

        return this._relationships.get("Satisfies");
    }
    set _Satisfies(values: Set<string>) {
        this._relationships.set("Satisfies", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'SentBy',
            edgeType: CorrespondenceSendsDocument,
            otherVertexPropertyName: 'Sends',
            otherVertexType: Correspondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Informs',
            edgeType: DocumentInformsTransaction,
            otherVertexPropertyName: 'IsInformedBy',
            otherVertexType: Transaction,
        },
        {
            propertyName: 'Invoices',
            edgeType: DocumentInvoicesInvoice,
            otherVertexPropertyName: 'IsInvoicedBy',
            otherVertexType: Invoice,
        },
        {
            propertyName: 'Satisfies',
            edgeType: DocumentSatisfiesTask,
            otherVertexPropertyName: 'IsSatisfiedBy',
            otherVertexType: Task,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Document {
        return ModelUtils.deserializeVertex<Document>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Document) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DeletedDate: model.DeletedDate,
            Id: model.Id,
            Description: model.Description,
            Status: model.Status,
            ExtractionStatus: model.ExtractionStatus,
            DocumentDateLabel: model.DocumentDateLabel,
            DocumentDate: model.DocumentDate,
            OriginDate: model.OriginDate,
            UpdatedDate: model.UpdatedDate,
            ExtractionRequestedAt: model.ExtractionRequestedAt,
            ExtractionExternalTrackingId: model.ExtractionExternalTrackingId,
            Size: model.Size,
            AccountId: model.AccountId,
            DocumentCategoryId: model.DocumentCategoryId,
            FileExtension: model.FileExtension,
            Tags: model.Tags,
            PolicySets: model.PolicySets,
            EffectiveDate: ModelUtils.serializeContractDate(model.data.EffectiveDate),
            UploadedBy: model.UploadedBy,
            ExtractionFailureReason: model.ExtractionFailureReason,
            EmailMessageIdsForAttachment: model.EmailMessageIdsForAttachment,
            SentBy: ModelUtils.serializeShallowEdge(model.SentBy(), 'SentBy'),
            Informs: ModelUtils.serializeShallowEdge(model.Informs(), 'Informs'),
            Invoices: ModelUtils.serializeShallowEdge(model.Invoices(), 'Invoices'),
            Satisfies: ModelUtils.serializeShallowEdge(model.Satisfies(), 'Satisfies'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Document {
        let clone = new Document();
        clone.data = _.cloneDeep(this.data);
        clone._SentBy = _.cloneDeep(this._SentBy);
        clone._Informs = _.cloneDeep(this._Informs);
        clone._Invoices = _.cloneDeep(this._Invoices);
        clone._Satisfies = _.cloneDeep(this._Satisfies);

        //clone.Context = this.Context;
        return clone;
    }
}

export class DocumentAudit extends DocumentModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "DocumentAudit";
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
    get Description(): string {
        return this.data.Description;
    }
    get Status(): string {
        return this.data.Status;
    }
    get DocumentDateLabel(): string {
        return this.data.DocumentDateLabel;
    }
    get DocumentDate(): Date {
        return this.data.DocumentDate ? new Date(this.data.DocumentDate) : undefined;
    }
    get OriginDate(): Date {
        return this.data.OriginDate ? new Date(this.data.OriginDate) : undefined;
    }
    get Size(): number {
        return this.data.Size;
    }
    get AccountId(): string {
        return this.data.AccountId;
    }
    set AccountId(value: string) {
        this.data.AccountId = value;
    }
    get DocumentCategoryId(): string {
        return this.data.DocumentCategoryId;
    }
    get FileExtension(): string {
        return this.data.FileExtension;
    }
    set FileExtension(value: string) {
        this.data.FileExtension = value;
    }
    get Tags(): string[] {
        return this.data.Tags;
    }
    get PolicyTerms(): string[] {
        return this.data.PolicyTerms;
    }


    deserialize(input: Object, datacontext): DocumentAudit {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: DocumentAudit) {
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
            Description: model.Description,
            Status: model.Status,
            DocumentDateLabel: model.DocumentDateLabel,
            DocumentDate: model.DocumentDate,
            OriginDate: model.OriginDate,
            Size: model.Size,
            AccountId: model.AccountId,
            DocumentCategoryId: model.DocumentCategoryId,
            FileExtension: model.FileExtension,
            Tags: model.Tags,
            PolicyTerms: model.PolicyTerms,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DocumentAudit {
        let clone = new DocumentAudit();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class DocumentInformsTransaction extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "DocumentInformsTransaction";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Document
    private __IsInformedBy: Document;

    IsInformedBy(context?: BaseDataContext): Document {
        if (this.__IsInformedBy)
           return this.__IsInformedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsInformedBy) as Document;
    }
    setIsInformedBy(value: Document) {
        this.__IsInformedBy = value;
    }
    get _IsInformedBy(): string {
        return this.Out;
    }
    set _IsInformedBy(value: string) {
        this.Out = value;
    }
    //   In to Transaction
    private __Informs: Transaction;

    Informs(context?: BaseDataContext): Transaction {
        if (this.__Informs)
           return this.__Informs;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Informs) as Transaction;
    }
    setInforms(value: Transaction) {
        this.__Informs = value;
    }
    get _Informs(): string {
        return this.In;
    }
    set _Informs(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): DocumentInformsTransaction {
       return ModelUtils.deserializeEdge<DocumentInformsTransaction>(this, input, datacontext, super._deserialize);
    }


    clone(): DocumentInformsTransaction {
        let clone = new DocumentInformsTransaction();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class DocumentInvoicesInvoice extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "DocumentInvoicesInvoice";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Document
    private __IsInvoicedBy: Document;

    IsInvoicedBy(context?: BaseDataContext): Document {
        if (this.__IsInvoicedBy)
           return this.__IsInvoicedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsInvoicedBy) as Document;
    }
    setIsInvoicedBy(value: Document) {
        this.__IsInvoicedBy = value;
    }
    get _IsInvoicedBy(): string {
        return this.Out;
    }
    set _IsInvoicedBy(value: string) {
        this.Out = value;
    }
    //   In to Invoice
    private __Invoices: Invoice;

    Invoices(context?: BaseDataContext): Invoice {
        if (this.__Invoices)
           return this.__Invoices;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Invoices) as Invoice;
    }
    setInvoices(value: Invoice) {
        this.__Invoices = value;
    }
    get _Invoices(): string {
        return this.In;
    }
    set _Invoices(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): DocumentInvoicesInvoice {
       return ModelUtils.deserializeEdge<DocumentInvoicesInvoice>(this, input, datacontext, super._deserialize);
    }


    clone(): DocumentInvoicesInvoice {
        let clone = new DocumentInvoicesInvoice();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class DocumentSatisfiesTask extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "DocumentSatisfiesTask";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Document
    private __IsSatisfiedBy: Document;

    IsSatisfiedBy(context?: BaseDataContext): Document {
        if (this.__IsSatisfiedBy)
           return this.__IsSatisfiedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsSatisfiedBy) as Document;
    }
    setIsSatisfiedBy(value: Document) {
        this.__IsSatisfiedBy = value;
    }
    get _IsSatisfiedBy(): string {
        return this.Out;
    }
    set _IsSatisfiedBy(value: string) {
        this.Out = value;
    }
    //   In to Task
    private __Satisfies: Task;

    Satisfies(context?: BaseDataContext): Task {
        if (this.__Satisfies)
           return this.__Satisfies;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Satisfies) as Task;
    }
    setSatisfies(value: Task) {
        this.__Satisfies = value;
    }
    get _Satisfies(): string {
        return this.In;
    }
    set _Satisfies(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): DocumentSatisfiesTask {
       return ModelUtils.deserializeEdge<DocumentSatisfiesTask>(this, input, datacontext, super._deserialize);
    }


    clone(): DocumentSatisfiesTask {
        let clone = new DocumentSatisfiesTask();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IElement {
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly DisplayLabel?: string,
    readonly ShowHelp: boolean,
    readonly Help?: string,
    readonly ConditionMet: boolean,
    readonly ExternalId?: string,
    readonly ApplicationId: string

    IsEnabledBy?: object[],
    IsContainedBy?: object[]

}

export class Element extends VertexModel {
    get Domain(): string {
        return "Area";
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
    get CopiedFromId(): string {
        return this.data.CopiedFromId;
    }
    get OrderNum(): number {
        return this.data.OrderNum;
    }
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
    get WorkflowSetId(): string {
        return this.data.WorkflowSetId;
    }
    get ParentId(): string {
        return this.data.ParentId;
    }
    get DisplayLabel(): string {
        return this.data.DisplayLabel;
    }
    get ShowHelp(): boolean {
        return this.data.ShowHelp;
    }
    get Help(): string {
        return this.data.Help;
    }
    get ConditionMet(): boolean {
        return this.data.ConditionMet;
    }
    get ExternalId(): string {
        return this.data.ExternalId;
    }
    get ApplicationId(): string {
        return this.data.ApplicationId;
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

    // Relationship IsContainedBy, returns Section SectionContainsElement[]
    private __IsContainedBy: SectionContainsElement[];
    IsContainedBy(_context?: BaseDataContext): SectionContainsElement[] {
        if (this.__IsContainedBy)
            return this.__IsContainedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsContainedBy), (id) => context.get(id) as SectionContainsElement);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsContainedBy(values: SectionContainsElement[]) {
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
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: SectionContainsElement,
            otherVertexPropertyName: 'Contains',
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
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            ApplicationId: model.ApplicationId,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Element {
        let clone = new Element();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IElementCondition {
    readonly CopiedFromId?: string,
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly Name?: string,
    readonly Description?: string,
    readonly ConditionMet: boolean,

    IsContainedBy?: object[],
    Enables?: object[],
    Evaluates?: object[]

}

export class ElementCondition extends VertexModel {
    get Domain(): string {
        return "Area";
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
    get CopiedFromId(): string {
        return this.data.CopiedFromId;
    }
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
    get Name(): string {
        return this.data.Name;
    }
    get Description(): string {
        return this.data.Description;
    }
    get ConditionMet(): boolean {
        return this.data.ConditionMet;
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
            CopiedFromId: model.CopiedFromId,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            ConditionMet: model.ConditionMet,
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
        return "Area";
    }
    get Type(): string {
        return "ElementConditionEnablesElement";
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
        return "Area";
    }
    get Type(): string {
        return "ElementConditionEvaluatesDataPoint";
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
    get Edition(): number {
        return this.data.Edition;
    }
    get InputLabel(): string {
        return this.data.InputLabel;
    }
    get FromRepeatable(): boolean {
        return this.data.FromRepeatable;
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

export class FieldPopulatesDataPoint extends EdgeModel {
    get Domain(): string {
        return "Area";
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
    get Edition(): number {
        return this.data.Edition;
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
        return "Area";
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

export interface IInvoice {
    Id: string,
    InvoiceNumber: string,
    ProducerId: string,
    Status: string,
    GenerationDate: Date,
    PaymentGenerationDate?: Date,
    DueDate: Date,
    InitialBalanceDue: number,
    IsPaperless: boolean,

    IsInvoicedBy?: object[],
    Bills?: object[]

}

export class Invoice extends VertexModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "Invoice";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Invoice }[] = [

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
    get InvoiceNumber(): string {
        return this.data.InvoiceNumber;
    }
    set InvoiceNumber(value: string) {
        this.data.InvoiceNumber = value;
    }
    get ProducerId(): string {
        return this.data.ProducerId;
    }
    set ProducerId(value: string) {
        this.data.ProducerId = value;
    }
    get Status(): string {
        return this.data.Status;
    }
    set Status(value: string) {
        this.data.Status = value;
    }
    get GenerationDate(): Date {
        return this.data.GenerationDate ? new Date(this.data.GenerationDate) : undefined;
    }
    set GenerationDate(value: Date) {
        this.data.GenerationDate = value;
    }
    get PaymentGenerationDate(): Date {
        return this.data.PaymentGenerationDate ? new Date(this.data.PaymentGenerationDate) : undefined;
    }
    set PaymentGenerationDate(value: Date) {
        this.data.PaymentGenerationDate = value;
    }
    get DueDate(): Date {
        return this.data.DueDate ? new Date(this.data.DueDate) : undefined;
    }
    set DueDate(value: Date) {
        this.data.DueDate = value;
    }
    get InitialBalanceDue(): number {
        return this.data.InitialBalanceDue;
    }
    set InitialBalanceDue(value: number) {
        this.data.InitialBalanceDue = value;
    }
    get IsPaperless(): boolean {
        return this.data.IsPaperless;
    }
    set IsPaperless(value: boolean) {
        this.data.IsPaperless = value;
    }

    // Relationships

    // Relationship IsInvoicedBy, returns Document DocumentInvoicesInvoice[]
    private __IsInvoicedBy: DocumentInvoicesInvoice[];
    IsInvoicedBy(_context?: BaseDataContext): DocumentInvoicesInvoice[] {
        if (this.__IsInvoicedBy)
            return this.__IsInvoicedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsInvoicedBy), (id) => context.get(id) as DocumentInvoicesInvoice);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsInvoicedBy(values: DocumentInvoicesInvoice[]) {
         if (this.Context != null)
             throw Error;

        this.__IsInvoicedBy = values;
     }
    get _IsInvoicedBy(): Set<string> {
        if (!this._relationships.has("IsInvoicedBy"))
            this._relationships.set("IsInvoicedBy", new Set<string>());

        return this._relationships.get("IsInvoicedBy");
    }
    set _IsInvoicedBy(values: Set<string>) {
        this._relationships.set("IsInvoicedBy", values);
    }

    // Relationship Bills, returns Account InvoiceBillsAccount[]
    private __Bills: InvoiceBillsAccount[];
    Bills(_context?: BaseDataContext): InvoiceBillsAccount[] {
        if (this.__Bills)
            return this.__Bills;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Bills), (id) => context.get(id) as InvoiceBillsAccount);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setBills(values: InvoiceBillsAccount[]) {
         if (this.Context != null)
             throw Error;

        this.__Bills = values;
     }
    get _Bills(): Set<string> {
        if (!this._relationships.has("Bills"))
            this._relationships.set("Bills", new Set<string>());

        return this._relationships.get("Bills");
    }
    set _Bills(values: Set<string>) {
        this._relationships.set("Bills", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsInvoicedBy',
            edgeType: DocumentInvoicesInvoice,
            otherVertexPropertyName: 'Invoices',
            otherVertexType: Document,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Bills',
            edgeType: InvoiceBillsAccount,
            otherVertexPropertyName: 'IsBilledFor',
            otherVertexType: Account,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Invoice {
        return ModelUtils.deserializeVertex<Invoice>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Invoice) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            InvoiceNumber: model.InvoiceNumber,
            ProducerId: model.ProducerId,
            Status: model.Status,
            GenerationDate: model.GenerationDate,
            PaymentGenerationDate: model.PaymentGenerationDate,
            DueDate: model.DueDate,
            InitialBalanceDue: model.InitialBalanceDue,
            IsPaperless: model.IsPaperless,
            IsInvoicedBy: ModelUtils.serializeShallowEdge(model.IsInvoicedBy(), 'IsInvoicedBy'),
            Bills: ModelUtils.serializeShallowEdge(model.Bills(), 'Bills'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Invoice {
        let clone = new Invoice();
        clone.data = _.cloneDeep(this.data);
        clone._IsInvoicedBy = _.cloneDeep(this._IsInvoicedBy);
        clone._Bills = _.cloneDeep(this._Bills);

        //clone.Context = this.Context;
        return clone;
    }
}

export class InvoiceBillsAccount extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "InvoiceBillsAccount";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Invoice
    private __IsBilledFor: Invoice;

    IsBilledFor(context?: BaseDataContext): Invoice {
        if (this.__IsBilledFor)
           return this.__IsBilledFor;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsBilledFor) as Invoice;
    }
    setIsBilledFor(value: Invoice) {
        this.__IsBilledFor = value;
    }
    get _IsBilledFor(): string {
        return this.Out;
    }
    set _IsBilledFor(value: string) {
        this.Out = value;
    }
    //   In to Account
    private __Bills: Account;

    Bills(context?: BaseDataContext): Account {
        if (this.__Bills)
           return this.__Bills;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Bills) as Account;
    }
    setBills(value: Account) {
        this.__Bills = value;
    }
    get _Bills(): string {
        return this.In;
    }
    set _Bills(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): InvoiceBillsAccount {
       return ModelUtils.deserializeEdge<InvoiceBillsAccount>(this, input, datacontext, super._deserialize);
    }


    clone(): InvoiceBillsAccount {
        let clone = new InvoiceBillsAccount();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IMap {
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly Name: string,

    Calculates?: object[],
    Contains?: object[]

}

export class Map extends VertexModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "Map";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Map }[] = [

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
    get Name(): string {
        return this.data.Name;
    }

    // Relationships

    // Relationship Calculates, returns DataStore MapCalculatesDataStore[]
    private __Calculates: MapCalculatesDataStore[];
    Calculates(_context?: BaseDataContext): MapCalculatesDataStore[] {
        if (this.__Calculates)
            return this.__Calculates;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Calculates), (id) => context.get(id) as MapCalculatesDataStore);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setCalculates(values: MapCalculatesDataStore[]) {
         if (this.Context != null)
             throw Error;

        this.__Calculates = values;
     }
    get _Calculates(): Set<string> {
        if (!this._relationships.has("Calculates"))
            this._relationships.set("Calculates", new Set<string>());

        return this._relationships.get("Calculates");
    }
    set _Calculates(values: Set<string>) {
        this._relationships.set("Calculates", values);
    }

    // Relationship Contains, returns Transform MapContainsTransform[]
    private __Contains: MapContainsTransform[];
    Contains(_context?: BaseDataContext): MapContainsTransform[] {
        if (this.__Contains)
            return this.__Contains;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Contains), (id) => context.get(id) as MapContainsTransform);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setContains(values: MapContainsTransform[]) {
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

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Calculates',
            edgeType: MapCalculatesDataStore,
            otherVertexPropertyName: 'CalculatedBy',
            otherVertexType: DataStore,
        },
        {
            propertyName: 'Contains',
            edgeType: MapContainsTransform,
            otherVertexPropertyName: 'IsContainedBy',
            otherVertexType: Transform,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Map {
        return ModelUtils.deserializeVertex<Map>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Map) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            Name: model.Name,
            Calculates: ModelUtils.serializeShallowEdge(model.Calculates(), 'Calculates'),
            Contains: ModelUtils.serializeShallowEdge(model.Contains(), 'Contains'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Map {
        let clone = new Map();
        clone.data = _.cloneDeep(this.data);
        clone._Calculates = _.cloneDeep(this._Calculates);
        clone._Contains = _.cloneDeep(this._Contains);

        //clone.Context = this.Context;
        return clone;
    }
}

export class MapCalculatesDataStore extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "MapCalculatesDataStore";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Map
    private __CalculatedBy: Map;

    CalculatedBy(context?: BaseDataContext): Map {
        if (this.__CalculatedBy)
           return this.__CalculatedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._CalculatedBy) as Map;
    }
    setCalculatedBy(value: Map) {
        this.__CalculatedBy = value;
    }
    get _CalculatedBy(): string {
        return this.Out;
    }
    set _CalculatedBy(value: string) {
        this.Out = value;
    }
    //   In to DataStore
    private __Calculates: DataStore;

    Calculates(context?: BaseDataContext): DataStore {
        if (this.__Calculates)
           return this.__Calculates;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Calculates) as DataStore;
    }
    setCalculates(value: DataStore) {
        this.__Calculates = value;
    }
    get _Calculates(): string {
        return this.In;
    }
    set _Calculates(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): MapCalculatesDataStore {
       return ModelUtils.deserializeEdge<MapCalculatesDataStore>(this, input, datacontext, super._deserialize);
    }


    clone(): MapCalculatesDataStore {
        let clone = new MapCalculatesDataStore();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class MapContainsTransform extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "MapContainsTransform";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Map
    private __IsContainedBy: Map;

    IsContainedBy(context?: BaseDataContext): Map {
        if (this.__IsContainedBy)
           return this.__IsContainedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsContainedBy) as Map;
    }
    setIsContainedBy(value: Map) {
        this.__IsContainedBy = value;
    }
    get _IsContainedBy(): string {
        return this.Out;
    }
    set _IsContainedBy(value: string) {
        this.Out = value;
    }
    //   In to Transform
    private __Contains: Transform;

    Contains(context?: BaseDataContext): Transform {
        if (this.__Contains)
           return this.__Contains;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Contains) as Transform;
    }
    setContains(value: Transform) {
        this.__Contains = value;
    }
    get _Contains(): string {
        return this.In;
    }
    set _Contains(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): MapContainsTransform {
       return ModelUtils.deserializeEdge<MapContainsTransform>(this, input, datacontext, super._deserialize);
    }


    clone(): MapContainsTransform {
        let clone = new MapContainsTransform();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IMappable {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly DataType: string,

    IsMappingFor?: object[],
    MapsTo?: object[]

}

export class Mappable extends VertexModel {
    get Domain(): string {
        return "Area";
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
            {className: 'ScriptTransform', type: ScriptTransform},
            {className: 'Transform', type: Transform},
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
    get CommittedEditions(): number[] {
        return this.data.CommittedEditions;
    }
    get Content(): { [index: number]: { [index: string]: any } } {
        return this.data.Content;
    }
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
    get DataType(): string {
        return this.data.DataType;
    }

    // Relationships

    // Relationship IsMappingFor, returns Mappable SimpleMapping[]
    private __IsMappingFor: SimpleMapping[];
    IsMappingFor(_context?: BaseDataContext): SimpleMapping[] {
        if (this.__IsMappingFor)
            return this.__IsMappingFor;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsMappingFor), (id) => context.get(id) as SimpleMapping);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsMappingFor(values: SimpleMapping[]) {
         if (this.Context != null)
             throw Error;

        this.__IsMappingFor = values;
     }
    get _IsMappingFor(): Set<string> {
        if (!this._relationships.has("IsMappingFor"))
            this._relationships.set("IsMappingFor", new Set<string>());

        return this._relationships.get("IsMappingFor");
    }
    set _IsMappingFor(values: Set<string>) {
        this._relationships.set("IsMappingFor", values);
    }

    // Relationship MapsTo, returns Mappable SimpleMapping[]
    private __MapsTo: SimpleMapping[];
    MapsTo(_context?: BaseDataContext): SimpleMapping[] {
        if (this.__MapsTo)
            return this.__MapsTo;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._MapsTo), (id) => context.get(id) as SimpleMapping);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setMapsTo(values: SimpleMapping[]) {
         if (this.Context != null)
             throw Error;

        this.__MapsTo = values;
     }
    get _MapsTo(): Set<string> {
        if (!this._relationships.has("MapsTo"))
            this._relationships.set("MapsTo", new Set<string>());

        return this._relationships.get("MapsTo");
    }
    set _MapsTo(values: Set<string>) {
        this._relationships.set("MapsTo", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Mappable {
        return ModelUtils.deserializeVertex<Mappable>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Mappable) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DataType: model.DataType,
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Mappable {
        let clone = new Mappable();
        clone.data = _.cloneDeep(this.data);
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

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
        return "Area";
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

export class PhaseRequiresTask extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "PhaseRequiresTask";
    }

    // Properties
    get CopiedFromId(): string {
        return this.data.CopiedFromId;
    }
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
    get DateStarted(): Date {
        return this.data.DateStarted ? new Date(this.data.DateStarted) : undefined;
    }
    set DateStarted(value: Date) {
        this.data.DateStarted = value;
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

export interface IPolicy {
    Id: string,
    readonly CopiedToPolicyIds?: string[],
    readonly RenewedToPolicyIds?: string[],
    readonly CopiedFromPolicyId?: string,
    readonly RenewedFromPolicyId?: string,
    readonly Status: string,
    Description?: string,
    EffectiveDate: ContractDate,
    ExpirationDate: ContractDate,
    CancellationDate?: ContractDate,
    readonly LastUpdated: Date,
    readonly Editions?: number[],
    ProductId: string,
    ProgramId: string,
    readonly DefaultCommission?: number,
    Commission?: number,
    readonly APICreated: boolean,
    readonly CopiedReason?: string,
    readonly QuoteNumber?: string,
    readonly PolicyNumber?: string,
    StateOfDomicile?: string,
    WrittenPremium?: number,
    WrittenTaxes?: number,
    WrittenFees?: number,
    WrittenTotal?: number,

    IsWrittenBy?: object[],
    Executes?: object[]

}

export class Policy extends VertexModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "Policy";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Policy }[] = [

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
    get CopiedToPolicyIds(): string[] {
        return this.data.CopiedToPolicyIds;
    }
    get RenewedToPolicyIds(): string[] {
        return this.data.RenewedToPolicyIds;
    }
    get CopiedFromPolicyId(): string {
        return this.data.CopiedFromPolicyId;
    }
    get RenewedFromPolicyId(): string {
        return this.data.RenewedFromPolicyId;
    }
    get Status(): string {
        return this.data.Status;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get EffectiveDate(): ContractDate {
        this.data.EffectiveDate = ModelUtils.deserializeContractDate(this.data.EffectiveDate);
        return this.data.EffectiveDate;
    }
    set EffectiveDate(value: ContractDate) {
        this.data.EffectiveDate = value;
    }
    get ExpirationDate(): ContractDate {
        this.data.ExpirationDate = ModelUtils.deserializeContractDate(this.data.ExpirationDate);
        return this.data.ExpirationDate;
    }
    set ExpirationDate(value: ContractDate) {
        this.data.ExpirationDate = value;
    }
    get CancellationDate(): ContractDate {
        this.data.CancellationDate = ModelUtils.deserializeContractDate(this.data.CancellationDate);
        return this.data.CancellationDate;
    }
    set CancellationDate(value: ContractDate) {
        this.data.CancellationDate = value;
    }
    get LastUpdated(): Date {
        return this.data.LastUpdated ? new Date(this.data.LastUpdated) : undefined;
    }
    get Editions(): number[] {
        return this.data.Editions;
    }
    get ProductId(): string {
        return this.data.ProductId;
    }
    set ProductId(value: string) {
        this.data.ProductId = value;
    }
    get ProgramId(): string {
        return this.data.ProgramId;
    }
    set ProgramId(value: string) {
        this.data.ProgramId = value;
    }
    get DefaultCommission(): number {
        return this.data.DefaultCommission;
    }
    get Commission(): number {
        return this.data.Commission;
    }
    set Commission(value: number) {
        this.data.Commission = value;
    }
    get APICreated(): boolean {
        return this.data.APICreated;
    }
    get CopiedReason(): string {
        return this.data.CopiedReason;
    }
    get QuoteNumber(): string {
        return this.data.QuoteNumber;
    }
    get PolicyNumber(): string {
        return this.data.PolicyNumber;
    }
    get StateOfDomicile(): string {
        return this.data.StateOfDomicile;
    }
    set StateOfDomicile(value: string) {
        this.data.StateOfDomicile = value;
    }
    get WrittenPremium(): number {
        return this.data.WrittenPremium;
    }
    set WrittenPremium(value: number) {
        this.data.WrittenPremium = value;
    }
    get WrittenTaxes(): number {
        return this.data.WrittenTaxes;
    }
    set WrittenTaxes(value: number) {
        this.data.WrittenTaxes = value;
    }
    get WrittenFees(): number {
        return this.data.WrittenFees;
    }
    set WrittenFees(value: number) {
        this.data.WrittenFees = value;
    }
    get WrittenTotal(): number {
        return this.data.WrittenTotal;
    }
    set WrittenTotal(value: number) {
        this.data.WrittenTotal = value;
    }

    // Relationships

    // Relationship IsWrittenBy, returns PolicySet PolicySetWritesPolicy[]
    private __IsWrittenBy: PolicySetWritesPolicy[];
    IsWrittenBy(_context?: BaseDataContext): PolicySetWritesPolicy[] {
        if (this.__IsWrittenBy)
            return this.__IsWrittenBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsWrittenBy), (id) => context.get(id) as PolicySetWritesPolicy);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsWrittenBy(values: PolicySetWritesPolicy[]) {
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

    // Relationship Executes, returns Transaction PolicyExecutesTransaction[]
    private __Executes: PolicyExecutesTransaction[];
    Executes(_context?: BaseDataContext): PolicyExecutesTransaction[] {
        if (this.__Executes)
            return this.__Executes;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Executes), (id) => context.get(id) as PolicyExecutesTransaction);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setExecutes(values: PolicyExecutesTransaction[]) {
         if (this.Context != null)
             throw Error;

        this.__Executes = values;
     }
    get _Executes(): Set<string> {
        if (!this._relationships.has("Executes"))
            this._relationships.set("Executes", new Set<string>());

        return this._relationships.get("Executes");
    }
    set _Executes(values: Set<string>) {
        this._relationships.set("Executes", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsWrittenBy',
            edgeType: PolicySetWritesPolicy,
            otherVertexPropertyName: 'Writes',
            otherVertexType: PolicySet,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Executes',
            edgeType: PolicyExecutesTransaction,
            otherVertexPropertyName: 'IsExecutedBy',
            otherVertexType: Transaction,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Policy {
        return ModelUtils.deserializeVertex<Policy>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Policy) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            CopiedToPolicyIds: model.CopiedToPolicyIds,
            RenewedToPolicyIds: model.RenewedToPolicyIds,
            CopiedFromPolicyId: model.CopiedFromPolicyId,
            RenewedFromPolicyId: model.RenewedFromPolicyId,
            Status: model.Status,
            Description: model.Description,
            EffectiveDate: ModelUtils.serializeContractDate(model.data.EffectiveDate),
            ExpirationDate: ModelUtils.serializeContractDate(model.data.ExpirationDate),
            CancellationDate: ModelUtils.serializeContractDate(model.data.CancellationDate),
            LastUpdated: model.LastUpdated,
            Editions: model.Editions,
            ProductId: model.ProductId,
            ProgramId: model.ProgramId,
            DefaultCommission: model.DefaultCommission,
            Commission: model.Commission,
            APICreated: model.APICreated,
            CopiedReason: model.CopiedReason,
            QuoteNumber: model.QuoteNumber,
            PolicyNumber: model.PolicyNumber,
            StateOfDomicile: model.StateOfDomicile,
            WrittenPremium: model.WrittenPremium,
            WrittenTaxes: model.WrittenTaxes,
            WrittenFees: model.WrittenFees,
            WrittenTotal: model.WrittenTotal,
            IsWrittenBy: ModelUtils.serializeShallowEdge(model.IsWrittenBy(), 'IsWrittenBy'),
            Executes: ModelUtils.serializeShallowEdge(model.Executes(), 'Executes'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Policy {
        let clone = new Policy();
        clone.data = _.cloneDeep(this.data);
        clone._IsWrittenBy = _.cloneDeep(this._IsWrittenBy);
        clone._Executes = _.cloneDeep(this._Executes);

        //clone.Context = this.Context;
        return clone;
    }
}

export class PolicyExecutesTransaction extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "PolicyExecutesTransaction";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to Policy
    private __IsExecutedBy: Policy;

    IsExecutedBy(context?: BaseDataContext): Policy {
        if (this.__IsExecutedBy)
           return this.__IsExecutedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsExecutedBy) as Policy;
    }
    setIsExecutedBy(value: Policy) {
        this.__IsExecutedBy = value;
    }
    get _IsExecutedBy(): string {
        return this.Out;
    }
    set _IsExecutedBy(value: string) {
        this.Out = value;
    }
    //   In to Transaction
    private __Executes: Transaction;

    Executes(context?: BaseDataContext): Transaction {
        if (this.__Executes)
           return this.__Executes;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Executes) as Transaction;
    }
    setExecutes(value: Transaction) {
        this.__Executes = value;
    }
    get _Executes(): string {
        return this.In;
    }
    set _Executes(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): PolicyExecutesTransaction {
       return ModelUtils.deserializeEdge<PolicyExecutesTransaction>(this, input, datacontext, super._deserialize);
    }


    clone(): PolicyExecutesTransaction {
        let clone = new PolicyExecutesTransaction();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IPolicySet {
    readonly DeletedDate?: Date,
    Id: string,
    readonly PolicySetStackKey: string,
    readonly CopiedFromPolicySetId?: string,
    readonly RenewedFromPolicySetId?: string,
    Description?: string,
    EffectiveDate: ContractDate,
    ExpirationDate: ContractDate,
    DefaultTerm: string,
    readonly ProducerId?: string,
    readonly ProgramId: string,
    readonly WorkflowSetId?: string,
    readonly APICreated: boolean,
    readonly CopiedReason?: string,
    readonly InitialWorkflowId?: string,
    readonly Status?: string,

    IsWrittenBy?: object[],
    Writes?: object[]

}

export class PolicySet extends VertexModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "PolicySet";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof PolicySet }[] = [

        ];
        return derivedTypes;
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
    get PolicySetStackKey(): string {
        return this.data.PolicySetStackKey;
    }
    get CopiedFromPolicySetId(): string {
        return this.data.CopiedFromPolicySetId;
    }
    get RenewedFromPolicySetId(): string {
        return this.data.RenewedFromPolicySetId;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get EffectiveDate(): ContractDate {
        this.data.EffectiveDate = ModelUtils.deserializeContractDate(this.data.EffectiveDate);
        return this.data.EffectiveDate;
    }
    set EffectiveDate(value: ContractDate) {
        this.data.EffectiveDate = value;
    }
    get ExpirationDate(): ContractDate {
        this.data.ExpirationDate = ModelUtils.deserializeContractDate(this.data.ExpirationDate);
        return this.data.ExpirationDate;
    }
    set ExpirationDate(value: ContractDate) {
        this.data.ExpirationDate = value;
    }
    get DefaultTerm(): string {
        return this.data.DefaultTerm;
    }
    set DefaultTerm(value: string) {
        this.data.DefaultTerm = value;
    }
    get ProducerId(): string {
        return this.data.ProducerId;
    }
    get ProgramId(): string {
        return this.data.ProgramId;
    }
    get WorkflowSetId(): string {
        return this.data.WorkflowSetId;
    }
    get APICreated(): boolean {
        return this.data.APICreated;
    }
    get CopiedReason(): string {
        return this.data.CopiedReason;
    }
    get InitialWorkflowId(): string {
        return this.data.InitialWorkflowId;
    }
    get Status(): string {
        return this.data.Status;
    }

    // Relationships

    // Relationship IsWrittenBy, returns Account AccountWritesPolicySet[]
    private __IsWrittenBy: AccountWritesPolicySet[];
    IsWrittenBy(_context?: BaseDataContext): AccountWritesPolicySet[] {
        if (this.__IsWrittenBy)
            return this.__IsWrittenBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsWrittenBy), (id) => context.get(id) as AccountWritesPolicySet);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsWrittenBy(values: AccountWritesPolicySet[]) {
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

    // Relationship Writes, returns Policy PolicySetWritesPolicy[]
    private __Writes: PolicySetWritesPolicy[];
    Writes(_context?: BaseDataContext): PolicySetWritesPolicy[] {
        if (this.__Writes)
            return this.__Writes;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Writes), (id) => context.get(id) as PolicySetWritesPolicy);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setWrites(values: PolicySetWritesPolicy[]) {
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
        {
            propertyName: 'IsWrittenBy',
            edgeType: AccountWritesPolicySet,
            otherVertexPropertyName: 'Writes',
            otherVertexType: Account,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Writes',
            edgeType: PolicySetWritesPolicy,
            otherVertexPropertyName: 'IsWrittenBy',
            otherVertexType: Policy,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): PolicySet {
        return ModelUtils.deserializeVertex<PolicySet>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: PolicySet) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DeletedDate: model.DeletedDate,
            Id: model.Id,
            PolicySetStackKey: model.PolicySetStackKey,
            CopiedFromPolicySetId: model.CopiedFromPolicySetId,
            RenewedFromPolicySetId: model.RenewedFromPolicySetId,
            Description: model.Description,
            EffectiveDate: ModelUtils.serializeContractDate(model.data.EffectiveDate),
            ExpirationDate: ModelUtils.serializeContractDate(model.data.ExpirationDate),
            DefaultTerm: model.DefaultTerm,
            ProducerId: model.ProducerId,
            ProgramId: model.ProgramId,
            WorkflowSetId: model.WorkflowSetId,
            APICreated: model.APICreated,
            CopiedReason: model.CopiedReason,
            InitialWorkflowId: model.InitialWorkflowId,
            Status: model.Status,
            IsWrittenBy: ModelUtils.serializeShallowEdge(model.IsWrittenBy(), 'IsWrittenBy'),
            Writes: ModelUtils.serializeShallowEdge(model.Writes(), 'Writes'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): PolicySet {
        let clone = new PolicySet();
        clone.data = _.cloneDeep(this.data);
        clone._IsWrittenBy = _.cloneDeep(this._IsWrittenBy);
        clone._Writes = _.cloneDeep(this._Writes);

        //clone.Context = this.Context;
        return clone;
    }
}

export class PolicySetWritesPolicy extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "PolicySetWritesPolicy";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to PolicySet
    private __IsWrittenBy: PolicySet;

    IsWrittenBy(context?: BaseDataContext): PolicySet {
        if (this.__IsWrittenBy)
           return this.__IsWrittenBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsWrittenBy) as PolicySet;
    }
    setIsWrittenBy(value: PolicySet) {
        this.__IsWrittenBy = value;
    }
    get _IsWrittenBy(): string {
        return this.Out;
    }
    set _IsWrittenBy(value: string) {
        this.Out = value;
    }
    //   In to Policy
    private __Writes: Policy;

    Writes(context?: BaseDataContext): Policy {
        if (this.__Writes)
           return this.__Writes;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Writes) as Policy;
    }
    setWrites(value: Policy) {
        this.__Writes = value;
    }
    get _Writes(): string {
        return this.In;
    }
    set _Writes(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): PolicySetWritesPolicy {
       return ModelUtils.deserializeEdge<PolicySetWritesPolicy>(this, input, datacontext, super._deserialize);
    }


    clone(): PolicySetWritesPolicy {
        let clone = new PolicySetWritesPolicy();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class Prioritization extends DocumentModel {
    get Domain(): string {
        return "Area";
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

export interface IProgram {
    Id: string,
    readonly Name: string,
    readonly Description: string,
    Aliases?: string[],
    readonly Disabled?: boolean,

    IsPublishedBy?: object[],
    IsConfiguredBy?: object[],
    IsFormattedBy?: object[],
    Writes?: object[]

}

export class Program extends VertexModel {
    get Domain(): string {
        return "Area";
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
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get Name(): string {
        return this.data.Name;
    }
    get Description(): string {
        return this.data.Description;
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

    // Relationships

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

    // Relationship Writes, returns Account ProgramWritesAccount[]
    private __Writes: ProgramWritesAccount[];
    Writes(_context?: BaseDataContext): ProgramWritesAccount[] {
        if (this.__Writes)
            return this.__Writes;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Writes), (id) => context.get(id) as ProgramWritesAccount);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setWrites(values: ProgramWritesAccount[]) {
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
        {
            propertyName: 'IsPublishedBy',
            edgeType: ProgramRevisionPublishesProgram,
            otherVertexPropertyName: 'Publishes',
            otherVertexType: ProgramRevision,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsConfiguredBy',
            edgeType: ProgramConfiguredByProgramOptions,
            otherVertexPropertyName: 'Configures',
            otherVertexType: ProgramOptions,
        },
        {
            propertyName: 'IsFormattedBy',
            edgeType: ProgramFormattedByRegion,
            otherVertexPropertyName: 'Formats',
            otherVertexType: Region,
        },
        {
            propertyName: 'Writes',
            edgeType: ProgramWritesAccount,
            otherVertexPropertyName: 'IsWrittenFor',
            otherVertexType: Account,
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
            Name: model.Name,
            Description: model.Description,
            Aliases: model.Aliases,
            Disabled: model.Disabled,
            IsPublishedBy: ModelUtils.serializeShallowEdge(model.IsPublishedBy(), 'IsPublishedBy'),
            IsConfiguredBy: ModelUtils.serializeShallowEdge(model.IsConfiguredBy(), 'IsConfiguredBy'),
            IsFormattedBy: ModelUtils.serializeShallowEdge(model.IsFormattedBy(), 'IsFormattedBy'),
            Writes: ModelUtils.serializeShallowEdge(model.Writes(), 'Writes'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Program {
        let clone = new Program();
        clone.data = _.cloneDeep(this.data);
        clone._IsPublishedBy = _.cloneDeep(this._IsPublishedBy);
        clone._IsConfiguredBy = _.cloneDeep(this._IsConfiguredBy);
        clone._IsFormattedBy = _.cloneDeep(this._IsFormattedBy);
        clone._Writes = _.cloneDeep(this._Writes);

        //clone.Context = this.Context;
        return clone;
    }
}

export class ProgramConfiguredByProgramOptions extends EdgeModel {
    get Domain(): string {
        return "Area";
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

export class ProgramFormattedByRegion extends EdgeModel {
    get Domain(): string {
        return "Area";
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

export interface IProgramOptions {
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    RevisionSelection: string,
    DefaultFromAddress?: string,
    readonly BasePoints: number,
    readonly ThresholdLow: number,
    readonly ThresholdMedium: number,
    readonly ThresholdHigh: number,
    readonly ThresholdVeryHigh: number,
    readonly DefaultWorkflowId?: string,
    readonly DefaultDelinquentWorkflowId?: string

    Configures?: object[]

}

export class ProgramOptions extends VertexModel {
    get Domain(): string {
        return "Area";
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
    get RevisionSelection(): string {
        return this.data.RevisionSelection;
    }
    set RevisionSelection(value: string) {
        this.data.RevisionSelection = value;
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
    get DefaultDelinquentWorkflowId(): string {
        return this.data.DefaultDelinquentWorkflowId;
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
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            RevisionSelection: model.RevisionSelection,
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

export interface IProgramRevision {
    Id: string,
    ProgramId: string,
    readonly RevisionNo: number,
    StartDate: ContractDate,
    StopDate?: ContractDate,
    readonly ComponentRevisionNos?: { [index: string]: number },
    readonly ComponentVersionNos?: { [index: string]: number },
    readonly ComponentLabels?: { [index: string]: string },
    readonly Undeployed: boolean,
    readonly DeployedOn?: Date,
    Description?: string,
    readonly SupersededDate?: ContractDate,
    StandbyWorkflowCountByDef?: { [index: string]: number },
    readonly PatchNumbers?: number[],

    Publishes?: object[],
    HasStandby?: object[]

}

export class ProgramRevision extends VertexModel {
    get Domain(): string {
        return "Area";
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
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get ProgramId(): string {
        return this.data.ProgramId;
    }
    set ProgramId(value: string) {
        this.data.ProgramId = value;
    }
    get RevisionNo(): number {
        return this.data.RevisionNo;
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
    get ComponentRevisionNos(): { [index: string]: number } {
        return this.data.ComponentRevisionNos;
    }
    get ComponentVersionNos(): { [index: string]: number } {
        return this.data.ComponentVersionNos;
    }
    get ComponentLabels(): { [index: string]: string } {
        return this.data.ComponentLabels;
    }
    get Undeployed(): boolean {
        return this.data.Undeployed;
    }
    get DeployedOn(): Date {
        return this.data.DeployedOn ? new Date(this.data.DeployedOn) : undefined;
    }
    get Description(): string {
        return this.data.Description;
    }
    set Description(value: string) {
        this.data.Description = value;
    }
    get SupersededDate(): ContractDate {
        this.data.SupersededDate = ModelUtils.deserializeContractDate(this.data.SupersededDate);
        return this.data.SupersededDate;
    }
    get StandbyWorkflowCountByDef(): { [index: string]: number } {
        return this.data.StandbyWorkflowCountByDef;
    }
    set StandbyWorkflowCountByDef(value: { [index: string]: number }) {
        this.data.StandbyWorkflowCountByDef = value;
    }
    get PatchNumbers(): number[] {
        return this.data.PatchNumbers;
    }

    // Relationships

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

    // Relationship HasStandby, returns Workflow ProgramRevisionStandbyWorkflow[]
    private __HasStandby: ProgramRevisionStandbyWorkflow[];
    HasStandby(_context?: BaseDataContext): ProgramRevisionStandbyWorkflow[] {
        if (this.__HasStandby)
            return this.__HasStandby;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._HasStandby), (id) => context.get(id) as ProgramRevisionStandbyWorkflow);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setHasStandby(values: ProgramRevisionStandbyWorkflow[]) {
         if (this.Context != null)
             throw Error;

        this.__HasStandby = values;
     }
    get _HasStandby(): Set<string> {
        if (!this._relationships.has("HasStandby"))
            this._relationships.set("HasStandby", new Set<string>());

        return this._relationships.get("HasStandby");
    }
    set _HasStandby(values: Set<string>) {
        this._relationships.set("HasStandby", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Publishes',
            edgeType: ProgramRevisionPublishesProgram,
            otherVertexPropertyName: 'IsPublishedBy',
            otherVertexType: Program,
        },
        {
            propertyName: 'HasStandby',
            edgeType: ProgramRevisionStandbyWorkflow,
            otherVertexPropertyName: 'IsStandbyFor',
            otherVertexType: Workflow,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): ProgramRevision {
        return ModelUtils.deserializeVertex<ProgramRevision>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: ProgramRevision) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            ProgramId: model.ProgramId,
            RevisionNo: model.RevisionNo,
            StartDate: ModelUtils.serializeContractDate(model.data.StartDate),
            StopDate: ModelUtils.serializeContractDate(model.data.StopDate),
            ComponentRevisionNos: model.ComponentRevisionNos,
            ComponentVersionNos: model.ComponentVersionNos,
            ComponentLabels: model.ComponentLabels,
            Undeployed: model.Undeployed,
            DeployedOn: model.DeployedOn,
            Description: model.Description,
            SupersededDate: ModelUtils.serializeContractDate(model.data.SupersededDate),
            StandbyWorkflowCountByDef: model.StandbyWorkflowCountByDef,
            PatchNumbers: model.PatchNumbers,
            Publishes: ModelUtils.serializeShallowEdge(model.Publishes(), 'Publishes'),
            HasStandby: ModelUtils.serializeShallowEdge(model.HasStandby(), 'HasStandby'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): ProgramRevision {
        let clone = new ProgramRevision();
        clone.data = _.cloneDeep(this.data);
        clone._Publishes = _.cloneDeep(this._Publishes);
        clone._HasStandby = _.cloneDeep(this._HasStandby);

        //clone.Context = this.Context;
        return clone;
    }
}

export class ProgramRevisionPublishesProgram extends EdgeModel {
    get Domain(): string {
        return "Area";
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

export class ProgramRevisionStandbyWorkflow extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "ProgramRevisionStandbyWorkflow";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get StandbyDate(): Date {
        return this.data.StandbyDate ? new Date(this.data.StandbyDate) : undefined;
    }
    set StandbyDate(value: Date) {
        this.data.StandbyDate = value;
    }

    // Relationships

    //   Out to ProgramRevision
    private __IsStandbyFor: ProgramRevision;

    IsStandbyFor(context?: BaseDataContext): ProgramRevision {
        if (this.__IsStandbyFor)
           return this.__IsStandbyFor;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsStandbyFor) as ProgramRevision;
    }
    setIsStandbyFor(value: ProgramRevision) {
        this.__IsStandbyFor = value;
    }
    get _IsStandbyFor(): string {
        return this.Out;
    }
    set _IsStandbyFor(value: string) {
        this.Out = value;
    }
    //   In to Workflow
    private __HasStandby: Workflow;

    HasStandby(context?: BaseDataContext): Workflow {
        if (this.__HasStandby)
           return this.__HasStandby;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._HasStandby) as Workflow;
    }
    setHasStandby(value: Workflow) {
        this.__HasStandby = value;
    }
    get _HasStandby(): string {
        return this.In;
    }
    set _HasStandby(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ProgramRevisionStandbyWorkflow {
       return ModelUtils.deserializeEdge<ProgramRevisionStandbyWorkflow>(this, input, datacontext, super._deserialize);
    }


    clone(): ProgramRevisionStandbyWorkflow {
        let clone = new ProgramRevisionStandbyWorkflow();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class ProgramWritesAccount extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "ProgramWritesAccount";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get EffectiveDate(): ContractDate {
        this.data.EffectiveDate = ModelUtils.deserializeContractDate(this.data.EffectiveDate);
        return this.data.EffectiveDate;
    }
    set EffectiveDate(value: ContractDate) {
        this.data.EffectiveDate = value;
    }
    get ExpirationDate(): ContractDate {
        this.data.ExpirationDate = ModelUtils.deserializeContractDate(this.data.ExpirationDate);
        return this.data.ExpirationDate;
    }
    set ExpirationDate(value: ContractDate) {
        this.data.ExpirationDate = value;
    }
    get ReferralLevel(): number {
        return this.data.ReferralLevel;
    }
    get TotalTasks(): number {
        return this.data.TotalTasks;
    }
    set TotalTasks(value: number) {
        this.data.TotalTasks = value;
    }
    get TotalWorkflows(): number {
        return this.data.TotalWorkflows;
    }
    set TotalWorkflows(value: number) {
        this.data.TotalWorkflows = value;
    }
    get DeclineReason(): string {
        return this.data.DeclineReason;
    }
    set DeclineReason(value: string) {
        this.data.DeclineReason = value;
    }

    // Relationships

    //   Out to Program
    private __IsWrittenFor: Program;

    IsWrittenFor(context?: BaseDataContext): Program {
        if (this.__IsWrittenFor)
           return this.__IsWrittenFor;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsWrittenFor) as Program;
    }
    setIsWrittenFor(value: Program) {
        this.__IsWrittenFor = value;
    }
    get _IsWrittenFor(): string {
        return this.Out;
    }
    set _IsWrittenFor(value: string) {
        this.Out = value;
    }
    //   In to Account
    private __Writes: Account;

    Writes(context?: BaseDataContext): Account {
        if (this.__Writes)
           return this.__Writes;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Writes) as Account;
    }
    setWrites(value: Account) {
        this.__Writes = value;
    }
    get _Writes(): string {
        return this.In;
    }
    set _Writes(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ProgramWritesAccount {
       return ModelUtils.deserializeEdge<ProgramWritesAccount>(this, input, datacontext, super._deserialize);
    }


    clone(): ProgramWritesAccount {
        let clone = new ProgramWritesAccount();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IRegion {
    Id: string,
    Name: string,
    Currency: string,
    Country: string,
    IsDefault: boolean,
    Aliases?: { [index: string]: string }

    Formats?: object[]

}

export class Region extends VertexModel {
    get Domain(): string {
        return "Area";
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
    get Country(): string {
        return this.data.Country;
    }
    set Country(value: string) {
        this.data.Country = value;
    }
    get IsDefault(): boolean {
        return this.data.IsDefault;
    }
    set IsDefault(value: boolean) {
        this.data.IsDefault = value;
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
            Country: model.Country,
            IsDefault: model.IsDefault,
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

export interface IReservationSet {
    Id: string,
    readonly CreatedAt: Date,
    readonly LastActivity: Date,

    IsStartedBy?: object[],
    IsQueuedBy?: object[],
    Reserves?: object[]

}

export class ReservationSet extends VertexModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "ReservationSet";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof ReservationSet }[] = [

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
    get CreatedAt(): Date {
        return this.data.CreatedAt ? new Date(this.data.CreatedAt) : undefined;
    }
    get LastActivity(): Date {
        return this.data.LastActivity ? new Date(this.data.LastActivity) : undefined;
    }

    // Relationships

    // Relationship IsStartedBy, returns SMIdentity SMIdentityStartsReservationSet[]
    private __IsStartedBy: SMIdentityStartsReservationSet[];
    IsStartedBy(_context?: BaseDataContext): SMIdentityStartsReservationSet[] {
        if (this.__IsStartedBy)
            return this.__IsStartedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsStartedBy), (id) => context.get(id) as SMIdentityStartsReservationSet);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsStartedBy(values: SMIdentityStartsReservationSet[]) {
         if (this.Context != null)
             throw Error;

        this.__IsStartedBy = values;
     }
    get _IsStartedBy(): Set<string> {
        if (!this._relationships.has("IsStartedBy"))
            this._relationships.set("IsStartedBy", new Set<string>());

        return this._relationships.get("IsStartedBy");
    }
    set _IsStartedBy(values: Set<string>) {
        this._relationships.set("IsStartedBy", values);
    }

    // Relationship IsQueuedBy, returns WorkGroup WorkGroupQueuesReservationSet[]
    private __IsQueuedBy: WorkGroupQueuesReservationSet[];
    IsQueuedBy(_context?: BaseDataContext): WorkGroupQueuesReservationSet[] {
        if (this.__IsQueuedBy)
            return this.__IsQueuedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsQueuedBy), (id) => context.get(id) as WorkGroupQueuesReservationSet);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsQueuedBy(values: WorkGroupQueuesReservationSet[]) {
         if (this.Context != null)
             throw Error;

        this.__IsQueuedBy = values;
     }
    get _IsQueuedBy(): Set<string> {
        if (!this._relationships.has("IsQueuedBy"))
            this._relationships.set("IsQueuedBy", new Set<string>());

        return this._relationships.get("IsQueuedBy");
    }
    set _IsQueuedBy(values: Set<string>) {
        this._relationships.set("IsQueuedBy", values);
    }

    // Relationship Reserves, returns Account ReservationSetReservesAccount[]
    private __Reserves: ReservationSetReservesAccount[];
    Reserves(_context?: BaseDataContext): ReservationSetReservesAccount[] {
        if (this.__Reserves)
            return this.__Reserves;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Reserves), (id) => context.get(id) as ReservationSetReservesAccount);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setReserves(values: ReservationSetReservesAccount[]) {
         if (this.Context != null)
             throw Error;

        this.__Reserves = values;
     }
    get _Reserves(): Set<string> {
        if (!this._relationships.has("Reserves"))
            this._relationships.set("Reserves", new Set<string>());

        return this._relationships.get("Reserves");
    }
    set _Reserves(values: Set<string>) {
        this._relationships.set("Reserves", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsStartedBy',
            edgeType: SMIdentityStartsReservationSet,
            otherVertexPropertyName: 'Starts',
            otherVertexType: SMIdentity,
        },
        {
            propertyName: 'IsQueuedBy',
            edgeType: WorkGroupQueuesReservationSet,
            otherVertexPropertyName: 'Queues',
            otherVertexType: WorkGroup,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Reserves',
            edgeType: ReservationSetReservesAccount,
            otherVertexPropertyName: 'IsReservedBy',
            otherVertexType: Account,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): ReservationSet {
        return ModelUtils.deserializeVertex<ReservationSet>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: ReservationSet) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            CreatedAt: model.CreatedAt,
            LastActivity: model.LastActivity,
            IsStartedBy: ModelUtils.serializeShallowEdge(model.IsStartedBy(), 'IsStartedBy'),
            IsQueuedBy: ModelUtils.serializeShallowEdge(model.IsQueuedBy(), 'IsQueuedBy'),
            Reserves: ModelUtils.serializeShallowEdge(model.Reserves(), 'Reserves'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): ReservationSet {
        let clone = new ReservationSet();
        clone.data = _.cloneDeep(this.data);
        clone._IsStartedBy = _.cloneDeep(this._IsStartedBy);
        clone._IsQueuedBy = _.cloneDeep(this._IsQueuedBy);
        clone._Reserves = _.cloneDeep(this._Reserves);

        //clone.Context = this.Context;
        return clone;
    }
}

export class ReservationSetReservesAccount extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "ReservationSetReservesAccount";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get ReservedAt(): Date {
        return this.data.ReservedAt ? new Date(this.data.ReservedAt) : undefined;
    }

    // Relationships

    //   Out to ReservationSet
    private __IsReservedBy: ReservationSet;

    IsReservedBy(context?: BaseDataContext): ReservationSet {
        if (this.__IsReservedBy)
           return this.__IsReservedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsReservedBy) as ReservationSet;
    }
    setIsReservedBy(value: ReservationSet) {
        this.__IsReservedBy = value;
    }
    get _IsReservedBy(): string {
        return this.Out;
    }
    set _IsReservedBy(value: string) {
        this.Out = value;
    }
    //   In to Account
    private __Reserves: Account;

    Reserves(context?: BaseDataContext): Account {
        if (this.__Reserves)
           return this.__Reserves;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Reserves) as Account;
    }
    setReserves(value: Account) {
        this.__Reserves = value;
    }
    get _Reserves(): string {
        return this.In;
    }
    set _Reserves(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): ReservationSetReservesAccount {
       return ModelUtils.deserializeEdge<ReservationSetReservesAccount>(this, input, datacontext, super._deserialize);
    }


    clone(): ReservationSetReservesAccount {
        let clone = new ReservationSetReservesAccount();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IRuleSet {
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly Name?: string,
    readonly Description?: string,

    Contains?: object[]

}

export class RuleSet extends VertexModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "RuleSet";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof RuleSet }[] = [
            {className: 'RuleSetRiskAssessment', type: RuleSetRiskAssessment},

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
    get Name(): string {
        return this.data.Name;
    }
    get Description(): string {
        return this.data.Description;
    }

    // Relationships

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
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            Contains: ModelUtils.serializeShallowEdge(model.Contains(), 'Contains'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): RuleSet {
        let clone = new RuleSet();
        clone.data = _.cloneDeep(this.data);
        clone._Contains = _.cloneDeep(this._Contains);

        //clone.Context = this.Context;
        return clone;
    }
}

export class RuleSetContainsRule extends EdgeModel {
    get Domain(): string {
        return "Area";
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

export class SCPArea extends DocumentModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "SCPArea";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get PolicyAPI_URI(): string {
        return this.data.PolicyAPI_URI;
    }
    set PolicyAPI_URI(value: string) {
        this.data.PolicyAPI_URI = value;
    }
    get ProducerAPI_URI(): string {
        return this.data.ProducerAPI_URI;
    }
    set ProducerAPI_URI(value: string) {
        this.data.ProducerAPI_URI = value;
    }
    get PolicyUI_URI(): string {
        return this.data.PolicyUI_URI;
    }
    set PolicyUI_URI(value: string) {
        this.data.PolicyUI_URI = value;
    }
    get PolicyResults_URI(): string {
        return this.data.PolicyResults_URI;
    }
    set PolicyResults_URI(value: string) {
        this.data.PolicyResults_URI = value;
    }
    get DomainAuthorities(): { [index: string]: string } {
        return this.data.DomainAuthorities;
    }
    set DomainAuthorities(value: { [index: string]: string }) {
        this.data.DomainAuthorities = value;
    }
    get OAuthScopes(): string {
        return this.data.OAuthScopes;
    }
    set OAuthScopes(value: string) {
        this.data.OAuthScopes = value;
    }
    get ClickOnce_URI(): string {
        return this.data.ClickOnce_URI;
    }
    set ClickOnce_URI(value: string) {
        this.data.ClickOnce_URI = value;
    }
    get ClientID(): string {
        return this.data.ClientID;
    }
    get Documents_URI(): string {
        return this.data.Documents_URI;
    }
    set Documents_URI(value: string) {
        this.data.Documents_URI = value;
    }


    deserialize(input: Object, datacontext): SCPArea {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: SCPArea) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            PolicyAPI_URI: model.PolicyAPI_URI,
            ProducerAPI_URI: model.ProducerAPI_URI,
            PolicyUI_URI: model.PolicyUI_URI,
            PolicyResults_URI: model.PolicyResults_URI,
            DomainAuthorities: model.DomainAuthorities,
            OAuthScopes: model.OAuthScopes,
            ClickOnce_URI: model.ClickOnce_URI,
            ClientID: model.ClientID,
            Documents_URI: model.Documents_URI,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): SCPArea {
        let clone = new SCPArea();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class SectionContainsElement extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "SectionContainsElement";
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
    private __IsContainedBy: Section;

    IsContainedBy(context?: BaseDataContext): Section {
        if (this.__IsContainedBy)
           return this.__IsContainedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsContainedBy) as Section;
    }
    setIsContainedBy(value: Section) {
        this.__IsContainedBy = value;
    }
    get _IsContainedBy(): string {
        return this.Out;
    }
    set _IsContainedBy(value: string) {
        this.Out = value;
    }
    //   In to Element
    private __Contains: Element;

    Contains(context?: BaseDataContext): Element {
        if (this.__Contains)
           return this.__Contains;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Contains) as Element;
    }
    setContains(value: Element) {
        this.__Contains = value;
    }
    get _Contains(): string {
        return this.In;
    }
    set _Contains(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): SectionContainsElement {
       return ModelUtils.deserializeEdge<SectionContainsElement>(this, input, datacontext, super._deserialize);
    }


    clone(): SectionContainsElement {
        let clone = new SectionContainsElement();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class SectionRepeatsWithDataGroup extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "SectionRepeatsWithDataGroup";
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
    get Edition(): number {
        return this.data.Edition;
    }

    // Relationships

    //   Out to Section
    private __RepeatsWithSection: Section;

    RepeatsWithSection(context?: BaseDataContext): Section {
        if (this.__RepeatsWithSection)
           return this.__RepeatsWithSection;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._RepeatsWithSection) as Section;
    }
    setRepeatsWithSection(value: Section) {
        this.__RepeatsWithSection = value;
    }
    get _RepeatsWithSection(): string {
        return this.Out;
    }
    set _RepeatsWithSection(value: string) {
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

export class ServiceLevel extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "ServiceLevel";
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
    get ServiceLevelAgreementId(): string {
        return this.data.ServiceLevelAgreementId;
    }
    set ServiceLevelAgreementId(value: string) {
        this.data.ServiceLevelAgreementId = value;
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
        return "Area";
    }
    get Type(): string {
        return "ServiceLevelAgreement";
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
    get TimeToCompleteValue(): number {
        return this.data.TimeToCompleteValue;
    }
    get TimeToCompleteUnits(): string {
        return this.data.TimeToCompleteUnits;
    }
    get ExcludeWeekends(): boolean {
        return this.data.ExcludeWeekends;
    }
    get ExcludeHolidays(): boolean {
        return this.data.ExcludeHolidays;
    }
    get Enabled(): boolean {
        return this.data.Enabled;
    }
    get Version(): number {
        return this.data.Version;
    }
    get VersionId(): string {
        return this.data.VersionId;
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
            Id: model.Id,
            Name: model.Name,
            TimeToCompleteValue: model.TimeToCompleteValue,
            TimeToCompleteUnits: model.TimeToCompleteUnits,
            ExcludeWeekends: model.ExcludeWeekends,
            ExcludeHolidays: model.ExcludeHolidays,
            Enabled: model.Enabled,
            Version: model.Version,
            VersionId: model.VersionId,
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

export class SimpleMapping extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "SimpleMapping";
    }

    // Properties
    get CreatedFromId(): string {
        return this.data.CreatedFromId;
    }
    get CreatedFromRevision(): string {
        return this.data.CreatedFromRevision;
    }
    get CommittedEditions(): number[] {
        return this.data.CommittedEditions;
    }
    get Content(): { [index: number]: { [index: string]: any } } {
        return this.data.Content;
    }
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get MapId(): string {
        return this.data.MapId;
    }
    set MapId(value: string) {
        this.data.MapId = value;
    }
    get InputLabel(): string {
        return this.data.InputLabel;
    }
    get OutputLabel(): string {
        return this.data.OutputLabel;
    }
    get InputOrder(): number {
        return this.data.InputOrder;
    }
    get OutputOrder(): number {
        return this.data.OutputOrder;
    }
    get InputType(): string {
        return this.data.InputType;
    }
    get FromRepeatable(): boolean {
        return this.data.FromRepeatable;
    }

    // Relationships

    //   Out to Mappable
    private __IsMappingFor: Mappable;

    IsMappingFor(context?: BaseDataContext): Mappable {
        if (this.__IsMappingFor)
           return this.__IsMappingFor;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsMappingFor) as Mappable;
    }
    setIsMappingFor(value: Mappable) {
        this.__IsMappingFor = value;
    }
    get _IsMappingFor(): string {
        return this.Out;
    }
    set _IsMappingFor(value: string) {
        this.Out = value;
    }
    //   In to Mappable
    private __MapsTo: Mappable;

    MapsTo(context?: BaseDataContext): Mappable {
        if (this.__MapsTo)
           return this.__MapsTo;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._MapsTo) as Mappable;
    }
    setMapsTo(value: Mappable) {
        this.__MapsTo = value;
    }
    get _MapsTo(): string {
        return this.In;
    }
    set _MapsTo(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): SimpleMapping {
       return ModelUtils.deserializeEdge<SimpleMapping>(this, input, datacontext, super._deserialize);
    }


    clone(): SimpleMapping {
        let clone = new SimpleMapping();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class SMIdentityMemberOfUserPool extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "SMIdentityMemberOfUserPool";
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
    private __HasMembers: SMIdentity;

    HasMembers(context?: BaseDataContext): SMIdentity {
        if (this.__HasMembers)
           return this.__HasMembers;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._HasMembers) as SMIdentity;
    }
    setHasMembers(value: SMIdentity) {
        this.__HasMembers = value;
    }
    get _HasMembers(): string {
        return this.Out;
    }
    set _HasMembers(value: string) {
        this.Out = value;
    }
    //   In to UserPool
    private __IsMemberOf: UserPool;

    IsMemberOf(context?: BaseDataContext): UserPool {
        if (this.__IsMemberOf)
           return this.__IsMemberOf;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsMemberOf) as UserPool;
    }
    setIsMemberOf(value: UserPool) {
        this.__IsMemberOf = value;
    }
    get _IsMemberOf(): string {
        return this.In;
    }
    set _IsMemberOf(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): SMIdentityMemberOfUserPool {
       return ModelUtils.deserializeEdge<SMIdentityMemberOfUserPool>(this, input, datacontext, super._deserialize);
    }


    clone(): SMIdentityMemberOfUserPool {
        let clone = new SMIdentityMemberOfUserPool();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class SMIdentityStartsReservationSet extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "SMIdentityStartsReservationSet";
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
    private __IsStartedBy: SMIdentity;

    IsStartedBy(context?: BaseDataContext): SMIdentity {
        if (this.__IsStartedBy)
           return this.__IsStartedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsStartedBy) as SMIdentity;
    }
    setIsStartedBy(value: SMIdentity) {
        this.__IsStartedBy = value;
    }
    get _IsStartedBy(): string {
        return this.Out;
    }
    set _IsStartedBy(value: string) {
        this.Out = value;
    }
    //   In to ReservationSet
    private __Starts: ReservationSet;

    Starts(context?: BaseDataContext): ReservationSet {
        if (this.__Starts)
           return this.__Starts;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Starts) as ReservationSet;
    }
    setStarts(value: ReservationSet) {
        this.__Starts = value;
    }
    get _Starts(): string {
        return this.In;
    }
    set _Starts(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): SMIdentityStartsReservationSet {
       return ModelUtils.deserializeEdge<SMIdentityStartsReservationSet>(this, input, datacontext, super._deserialize);
    }


    clone(): SMIdentityStartsReservationSet {
        let clone = new SMIdentityStartsReservationSet();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class SMIdentityWorksAccount extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "SMIdentityWorksAccount";
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
    //   In to Account
    private __Works: Account;

    Works(context?: BaseDataContext): Account {
        if (this.__Works)
           return this.__Works;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Works) as Account;
    }
    setWorks(value: Account) {
        this.__Works = value;
    }
    get _Works(): string {
        return this.In;
    }
    set _Works(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): SMIdentityWorksAccount {
       return ModelUtils.deserializeEdge<SMIdentityWorksAccount>(this, input, datacontext, super._deserialize);
    }


    clone(): SMIdentityWorksAccount {
        let clone = new SMIdentityWorksAccount();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface ITransaction {
    readonly CopiedFromId?: string,
    Id: string,
    readonly TransactionNumber: number,
    TransactionEffectiveDate: ContractDate,
    readonly CopiedFromPolicyNumber?: string,
    readonly PolicyId: string,
    readonly Committed: boolean,
    readonly Edition: number,
    readonly RatingStatus: string,
    readonly PolicyRatedStatus?: string,
    readonly LastAttemptedPolicyRatedStatus?: string,
    readonly SuccessfulPolicyRatedStatuses?: string[],
    readonly LastUpdated: Date,
    readonly Name?: string,
    readonly TransactionTypeId?: string,
    readonly APICreated: boolean,
    readonly TransactionStarted: boolean,
    AllowEditingImported: boolean,
    readonly UseQuoteVersion?: boolean,
    readonly QuoteNumber?: string,
    readonly PolicyNumber?: string,
    StateOfDomicile?: string,
    WrittenPremium?: number,
    WrittenTaxes?: number,
    WrittenFees?: number,
    WrittenTotal?: number,
    ChangeInPremium?: number,
    ChangeInTaxes?: number,
    ChangeInFees?: number,
    ChangeInTotal?: number,

    IsExecutedBy?: object[],
    IsInformedBy?: object[],
    IsManagedBy?: object[]

}

export class Transaction extends VertexModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "Transaction";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Transaction }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get CopiedFromId(): string {
        return this.data.CopiedFromId;
    }
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get TransactionNumber(): number {
        return this.data.TransactionNumber;
    }
    get TransactionEffectiveDate(): ContractDate {
        this.data.TransactionEffectiveDate = ModelUtils.deserializeContractDate(this.data.TransactionEffectiveDate);
        return this.data.TransactionEffectiveDate;
    }
    set TransactionEffectiveDate(value: ContractDate) {
        this.data.TransactionEffectiveDate = value;
    }
    get CopiedFromPolicyNumber(): string {
        return this.data.CopiedFromPolicyNumber;
    }
    get PolicyId(): string {
        return this.data.PolicyId;
    }
    get Committed(): boolean {
        return this.data.Committed;
    }
    get Edition(): number {
        return this.data.Edition;
    }
    get RatingStatus(): string {
        return this.data.RatingStatus;
    }
    get PolicyRatedStatus(): string {
        return this.data.PolicyRatedStatus;
    }
    get LastAttemptedPolicyRatedStatus(): string {
        return this.data.LastAttemptedPolicyRatedStatus;
    }
    get SuccessfulPolicyRatedStatuses(): string[] {
        return this.data.SuccessfulPolicyRatedStatuses;
    }
    get LastUpdated(): Date {
        return this.data.LastUpdated ? new Date(this.data.LastUpdated) : undefined;
    }
    get Name(): string {
        return this.data.Name;
    }
    get TransactionTypeId(): string {
        return this.data.TransactionTypeId;
    }
    get APICreated(): boolean {
        return this.data.APICreated;
    }
    get TransactionStarted(): boolean {
        return this.data.TransactionStarted;
    }
    get AllowEditingImported(): boolean {
        return this.data.AllowEditingImported;
    }
    set AllowEditingImported(value: boolean) {
        this.data.AllowEditingImported = value;
    }
    get UseQuoteVersion(): boolean {
        return this.data.UseQuoteVersion;
    }
    get QuoteNumber(): string {
        return this.data.QuoteNumber;
    }
    get PolicyNumber(): string {
        return this.data.PolicyNumber;
    }
    get StateOfDomicile(): string {
        return this.data.StateOfDomicile;
    }
    set StateOfDomicile(value: string) {
        this.data.StateOfDomicile = value;
    }
    get WrittenPremium(): number {
        return this.data.WrittenPremium;
    }
    set WrittenPremium(value: number) {
        this.data.WrittenPremium = value;
    }
    get WrittenTaxes(): number {
        return this.data.WrittenTaxes;
    }
    set WrittenTaxes(value: number) {
        this.data.WrittenTaxes = value;
    }
    get WrittenFees(): number {
        return this.data.WrittenFees;
    }
    set WrittenFees(value: number) {
        this.data.WrittenFees = value;
    }
    get WrittenTotal(): number {
        return this.data.WrittenTotal;
    }
    set WrittenTotal(value: number) {
        this.data.WrittenTotal = value;
    }
    get ChangeInPremium(): number {
        return this.data.ChangeInPremium;
    }
    set ChangeInPremium(value: number) {
        this.data.ChangeInPremium = value;
    }
    get ChangeInTaxes(): number {
        return this.data.ChangeInTaxes;
    }
    set ChangeInTaxes(value: number) {
        this.data.ChangeInTaxes = value;
    }
    get ChangeInFees(): number {
        return this.data.ChangeInFees;
    }
    set ChangeInFees(value: number) {
        this.data.ChangeInFees = value;
    }
    get ChangeInTotal(): number {
        return this.data.ChangeInTotal;
    }
    set ChangeInTotal(value: number) {
        this.data.ChangeInTotal = value;
    }

    // Relationships

    // Relationship IsExecutedBy, returns Policy PolicyExecutesTransaction[]
    private __IsExecutedBy: PolicyExecutesTransaction[];
    IsExecutedBy(_context?: BaseDataContext): PolicyExecutesTransaction[] {
        if (this.__IsExecutedBy)
            return this.__IsExecutedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsExecutedBy), (id) => context.get(id) as PolicyExecutesTransaction);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsExecutedBy(values: PolicyExecutesTransaction[]) {
         if (this.Context != null)
             throw Error;

        this.__IsExecutedBy = values;
     }
    get _IsExecutedBy(): Set<string> {
        if (!this._relationships.has("IsExecutedBy"))
            this._relationships.set("IsExecutedBy", new Set<string>());

        return this._relationships.get("IsExecutedBy");
    }
    set _IsExecutedBy(values: Set<string>) {
        this._relationships.set("IsExecutedBy", values);
    }

    // Relationship IsInformedBy, returns Document DocumentInformsTransaction[]
    private __IsInformedBy: DocumentInformsTransaction[];
    IsInformedBy(_context?: BaseDataContext): DocumentInformsTransaction[] {
        if (this.__IsInformedBy)
            return this.__IsInformedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsInformedBy), (id) => context.get(id) as DocumentInformsTransaction);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsInformedBy(values: DocumentInformsTransaction[]) {
         if (this.Context != null)
             throw Error;

        this.__IsInformedBy = values;
     }
    get _IsInformedBy(): Set<string> {
        if (!this._relationships.has("IsInformedBy"))
            this._relationships.set("IsInformedBy", new Set<string>());

        return this._relationships.get("IsInformedBy");
    }
    set _IsInformedBy(values: Set<string>) {
        this._relationships.set("IsInformedBy", values);
    }

    // Relationship IsManagedBy, returns Workflow TransactionIsManagedByWorkflow[]
    private __IsManagedBy: TransactionIsManagedByWorkflow[];
    IsManagedBy(_context?: BaseDataContext): TransactionIsManagedByWorkflow[] {
        if (this.__IsManagedBy)
            return this.__IsManagedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsManagedBy), (id) => context.get(id) as TransactionIsManagedByWorkflow);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsManagedBy(values: TransactionIsManagedByWorkflow[]) {
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
            propertyName: 'IsExecutedBy',
            edgeType: PolicyExecutesTransaction,
            otherVertexPropertyName: 'Executes',
            otherVertexType: Policy,
        },
        {
            propertyName: 'IsInformedBy',
            edgeType: DocumentInformsTransaction,
            otherVertexPropertyName: 'Informs',
            otherVertexType: Document,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsManagedBy',
            edgeType: TransactionIsManagedByWorkflow,
            otherVertexPropertyName: 'Manages',
            otherVertexType: Workflow,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Transaction {
        return ModelUtils.deserializeVertex<Transaction>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Transaction) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CopiedFromId: model.CopiedFromId,
            Id: model.Id,
            TransactionNumber: model.TransactionNumber,
            TransactionEffectiveDate: ModelUtils.serializeContractDate(model.data.TransactionEffectiveDate),
            CopiedFromPolicyNumber: model.CopiedFromPolicyNumber,
            PolicyId: model.PolicyId,
            Committed: model.Committed,
            Edition: model.Edition,
            RatingStatus: model.RatingStatus,
            PolicyRatedStatus: model.PolicyRatedStatus,
            LastAttemptedPolicyRatedStatus: model.LastAttemptedPolicyRatedStatus,
            SuccessfulPolicyRatedStatuses: model.SuccessfulPolicyRatedStatuses,
            LastUpdated: model.LastUpdated,
            Name: model.Name,
            TransactionTypeId: model.TransactionTypeId,
            APICreated: model.APICreated,
            TransactionStarted: model.TransactionStarted,
            AllowEditingImported: model.AllowEditingImported,
            UseQuoteVersion: model.UseQuoteVersion,
            QuoteNumber: model.QuoteNumber,
            PolicyNumber: model.PolicyNumber,
            StateOfDomicile: model.StateOfDomicile,
            WrittenPremium: model.WrittenPremium,
            WrittenTaxes: model.WrittenTaxes,
            WrittenFees: model.WrittenFees,
            WrittenTotal: model.WrittenTotal,
            ChangeInPremium: model.ChangeInPremium,
            ChangeInTaxes: model.ChangeInTaxes,
            ChangeInFees: model.ChangeInFees,
            ChangeInTotal: model.ChangeInTotal,
            IsExecutedBy: ModelUtils.serializeShallowEdge(model.IsExecutedBy(), 'IsExecutedBy'),
            IsInformedBy: ModelUtils.serializeShallowEdge(model.IsInformedBy(), 'IsInformedBy'),
            IsManagedBy: ModelUtils.serializeShallowEdge(model.IsManagedBy(), 'IsManagedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Transaction {
        let clone = new Transaction();
        clone.data = _.cloneDeep(this.data);
        clone._IsExecutedBy = _.cloneDeep(this._IsExecutedBy);
        clone._IsInformedBy = _.cloneDeep(this._IsInformedBy);
        clone._IsManagedBy = _.cloneDeep(this._IsManagedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export class TransactionDetails extends DocumentModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "TransactionDetails";
    }

    // Properties
    get CopiedFromId(): string {
        return this.data.CopiedFromId;
    }
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get TransactionId(): string {
        return this.data.TransactionId;
    }
    set TransactionId(value: string) {
        this.data.TransactionId = value;
    }
    get StateOfDomicile(): string {
        return this.data.StateOfDomicile;
    }
    set StateOfDomicile(value: string) {
        this.data.StateOfDomicile = value;
    }
    get WrittenPremium(): number {
        return this.data.WrittenPremium;
    }
    set WrittenPremium(value: number) {
        this.data.WrittenPremium = value;
    }
    get WrittenFees(): number {
        return this.data.WrittenFees;
    }
    set WrittenFees(value: number) {
        this.data.WrittenFees = value;
    }
    get WrittenTaxes(): number {
        return this.data.WrittenTaxes;
    }
    set WrittenTaxes(value: number) {
        this.data.WrittenTaxes = value;
    }
    get WrittenTotal(): number {
        return this.data.WrittenTotal;
    }
    set WrittenTotal(value: number) {
        this.data.WrittenTotal = value;
    }
    get ChangeInPremium(): number {
        return this.data.ChangeInPremium;
    }
    set ChangeInPremium(value: number) {
        this.data.ChangeInPremium = value;
    }
    get ChangeInFees(): number {
        return this.data.ChangeInFees;
    }
    set ChangeInFees(value: number) {
        this.data.ChangeInFees = value;
    }
    get ChangeInTaxes(): number {
        return this.data.ChangeInTaxes;
    }
    set ChangeInTaxes(value: number) {
        this.data.ChangeInTaxes = value;
    }
    get ChangeInTotal(): number {
        return this.data.ChangeInTotal;
    }
    set ChangeInTotal(value: number) {
        this.data.ChangeInTotal = value;
    }
    get PolicyNumber(): string {
        return this.data.PolicyNumber;
    }
    set PolicyNumber(value: string) {
        this.data.PolicyNumber = value;
    }
    get QuoteNumber(): string {
        return this.data.QuoteNumber;
    }
    set QuoteNumber(value: string) {
        this.data.QuoteNumber = value;
    }
    get ViewUrl(): string {
        return this.data.ViewUrl;
    }
    set ViewUrl(value: string) {
        this.data.ViewUrl = value;
    }
    get EditUrl(): string {
        return this.data.EditUrl;
    }
    set EditUrl(value: string) {
        this.data.EditUrl = value;
    }
    get RatingMessages(): any[] {
        return this.data.RatingMessages;
    }
    set RatingMessages(value: any[]) {
        this.data.RatingMessages = value;
    }


    deserialize(input: Object, datacontext): TransactionDetails {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: TransactionDetails) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CopiedFromId: model.CopiedFromId,
            Id: model.Id,
            TransactionId: model.TransactionId,
            StateOfDomicile: model.StateOfDomicile,
            WrittenPremium: model.WrittenPremium,
            WrittenFees: model.WrittenFees,
            WrittenTaxes: model.WrittenTaxes,
            WrittenTotal: model.WrittenTotal,
            ChangeInPremium: model.ChangeInPremium,
            ChangeInFees: model.ChangeInFees,
            ChangeInTaxes: model.ChangeInTaxes,
            ChangeInTotal: model.ChangeInTotal,
            PolicyNumber: model.PolicyNumber,
            QuoteNumber: model.QuoteNumber,
            ViewUrl: model.ViewUrl,
            EditUrl: model.EditUrl,
            RatingMessages: model.RatingMessages,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TransactionDetails {
        let clone = new TransactionDetails();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class TransactionIsManagedByWorkflow extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "TransactionIsManagedByWorkflow";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }
    get EligibilityStatus(): string {
        return this.data.EligibilityStatus;
    }
    get SelectionStatus(): string {
        return this.data.SelectionStatus;
    }
    set SelectionStatus(value: string) {
        this.data.SelectionStatus = value;
    }

    // Relationships

    //   Out to Transaction
    private __Manages: Transaction;

    Manages(context?: BaseDataContext): Transaction {
        if (this.__Manages)
           return this.__Manages;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Manages) as Transaction;
    }
    setManages(value: Transaction) {
        this.__Manages = value;
    }
    get _Manages(): string {
        return this.Out;
    }
    set _Manages(value: string) {
        this.Out = value;
    }
    //   In to Workflow
    private __IsManagedBy: Workflow;

    IsManagedBy(context?: BaseDataContext): Workflow {
        if (this.__IsManagedBy)
           return this.__IsManagedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsManagedBy) as Workflow;
    }
    setIsManagedBy(value: Workflow) {
        this.__IsManagedBy = value;
    }
    get _IsManagedBy(): string {
        return this.In;
    }
    set _IsManagedBy(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): TransactionIsManagedByWorkflow {
       return ModelUtils.deserializeEdge<TransactionIsManagedByWorkflow>(this, input, datacontext, super._deserialize);
    }


    clone(): TransactionIsManagedByWorkflow {
        let clone = new TransactionIsManagedByWorkflow();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class UserFavoritesAccount extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "UserFavoritesAccount";
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
    private __IsFavoriteOf: SMIdentity;

    IsFavoriteOf(context?: BaseDataContext): SMIdentity {
        if (this.__IsFavoriteOf)
           return this.__IsFavoriteOf;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsFavoriteOf) as SMIdentity;
    }
    setIsFavoriteOf(value: SMIdentity) {
        this.__IsFavoriteOf = value;
    }
    get _IsFavoriteOf(): string {
        return this.Out;
    }
    set _IsFavoriteOf(value: string) {
        this.Out = value;
    }
    //   In to Account
    private __Favorites: Account;

    Favorites(context?: BaseDataContext): Account {
        if (this.__Favorites)
           return this.__Favorites;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Favorites) as Account;
    }
    setFavorites(value: Account) {
        this.__Favorites = value;
    }
    get _Favorites(): string {
        return this.In;
    }
    set _Favorites(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): UserFavoritesAccount {
       return ModelUtils.deserializeEdge<UserFavoritesAccount>(this, input, datacontext, super._deserialize);
    }


    clone(): UserFavoritesAccount {
        let clone = new UserFavoritesAccount();
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
        return "Area";
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
        return "Area";
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

export class UserRecentAccounts extends DocumentModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "UserRecentAccounts";
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
    get Recents(): string[] {
        return this.data.Recents;
    }
    set Recents(value: string[]) {
        this.data.Recents = value;
    }


    deserialize(input: Object, datacontext): UserRecentAccounts {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: UserRecentAccounts) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            IdentityKey: model.IdentityKey,
            Recents: model.Recents,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): UserRecentAccounts {
        let clone = new UserRecentAccounts();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IWorkable {
    Id: string,
    DueDate?: Date,
    readonly CompletionStatus: string,
    readonly AvailabilityStatus: string,
    readonly ObligationStatus: string,
    readonly DateStatusChanged: Date,
    readonly StatusChangedById?: string,
    readonly WaiveJournalEntryKey?: string,
    CompletingDependencies?: string[],
    CompletedDependencies?: string[],

    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    Enables?: object[]

}

export class Workable extends VertexModel {
    get Domain(): string {
        return "Area";
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
    get DueDate(): Date {
        return this.data.DueDate ? new Date(this.data.DueDate) : undefined;
    }
    set DueDate(value: Date) {
        this.data.DueDate = value;
    }
    get CompletionStatus(): string {
        return this.data.CompletionStatus;
    }
    get AvailabilityStatus(): string {
        return this.data.AvailabilityStatus;
    }
    get ObligationStatus(): string {
        return this.data.ObligationStatus;
    }
    get DateStatusChanged(): Date {
        return this.data.DateStatusChanged ? new Date(this.data.DateStatusChanged) : undefined;
    }
    get StatusChangedById(): string {
        return this.data.StatusChangedById;
    }
    get WaiveJournalEntryKey(): string {
        return this.data.WaiveJournalEntryKey;
    }
    get CompletingDependencies(): string[] {
        return this.data.CompletingDependencies;
    }
    set CompletingDependencies(value: string[]) {
        this.data.CompletingDependencies = value;
    }
    get CompletedDependencies(): string[] {
        return this.data.CompletedDependencies;
    }
    set CompletedDependencies(value: string[]) {
        this.data.CompletedDependencies = value;
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
            DueDate: model.DueDate,
            CompletionStatus: model.CompletionStatus,
            AvailabilityStatus: model.AvailabilityStatus,
            ObligationStatus: model.ObligationStatus,
            DateStatusChanged: model.DateStatusChanged,
            StatusChangedById: model.StatusChangedById,
            WaiveJournalEntryKey: model.WaiveJournalEntryKey,
            CompletingDependencies: model.CompletingDependencies,
            CompletedDependencies: model.CompletedDependencies,
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
        return "Area";
    }
    get Type(): string {
        return "WorkableEnablesWorkable";
    }

    // Properties
    get CopiedFromId(): string {
        return this.data.CopiedFromId;
    }
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

export interface IWorkflow {
    readonly ProvisionStatus: string,
    readonly ProvisionStatusChanged: Date,
    readonly ProvisionErrorReasons?: string[],
    readonly ProvisionWaitingReasons?: string[],
    readonly CopiedFromId?: string,
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly WorkflowSetId: string,
    readonly Abbr: string,
    readonly Name: string,
    readonly Description: string,
    readonly Transactional: boolean,
    readonly Starting: boolean,
    readonly EffectiveDate?: ContractDate,
    readonly Status: string,
    readonly WorkflowType?: string,
    Notes?: string,
    readonly CompletedTaskPercent: number,
    readonly DataStoreId?: string,
    readonly ProgramId: string,
    readonly Premium?: string,
    readonly Edition?: number,
    readonly TotalTasks: number,
    readonly ActiveTasks?: number,
    readonly CompletedTasks?: number,
    readonly DateNextDue?: Date,
    readonly CompletedOrStoppedOn?: Date,
    readonly CompletedOrStoppedBy?: string,
    readonly IsCopy: boolean,
    readonly CreatedOn?: Date,
    readonly CreatedAsStandby?: boolean,
    readonly StoppingDependencies?: string[],
    readonly StoppedDependencies?: string[],
    readonly CompletingDependencies?: string[],
    readonly CompletedDependencies?: string[],
    readonly LastCompletedTask?: string,
    VersionName?: string,
    readonly WorkflowVersionKey?: string,
    readonly StopReason?: string,
    readonly OriginalEdition?: number,
    readonly UseQuoteVersion?: boolean,

    IsRunningFor?: object[],
    Manages?: object[],
    IsStandbyFor?: object[],
    IsContainedBy?: object[],
    Collects?: object[],
    Evaluates?: object[],
    Requires?: object[],
    Stores?: object[]

}

export class Workflow extends VertexModel {
    get Domain(): string {
        return "Area";
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
    get ProvisionStatus(): string {
        return this.data.ProvisionStatus;
    }
    get ProvisionStatusChanged(): Date {
        return this.data.ProvisionStatusChanged ? new Date(this.data.ProvisionStatusChanged) : undefined;
    }
    get ProvisionErrorReasons(): string[] {
        return this.data.ProvisionErrorReasons;
    }
    get ProvisionWaitingReasons(): string[] {
        return this.data.ProvisionWaitingReasons;
    }
    get CopiedFromId(): string {
        return this.data.CopiedFromId;
    }
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
    get WorkflowSetId(): string {
        return this.data.WorkflowSetId;
    }
    get Abbr(): string {
        return this.data.Abbr;
    }
    get Name(): string {
        return this.data.Name;
    }
    get Description(): string {
        return this.data.Description;
    }
    get Transactional(): boolean {
        return this.data.Transactional;
    }
    get Starting(): boolean {
        return this.data.Starting;
    }
    get EffectiveDate(): ContractDate {
        this.data.EffectiveDate = ModelUtils.deserializeContractDate(this.data.EffectiveDate);
        return this.data.EffectiveDate;
    }
    get Status(): string {
        return this.data.Status;
    }
    get WorkflowType(): string {
        return this.data.WorkflowType;
    }
    get Notes(): string {
        return this.data.Notes;
    }
    set Notes(value: string) {
        this.data.Notes = value;
    }
    get CompletedTaskPercent(): number {
        return this.data.CompletedTaskPercent;
    }
    get DataStoreId(): string {
        return this.data.DataStoreId;
    }
    get ProgramId(): string {
        return this.data.ProgramId;
    }
    get Premium(): string {
        return this.data.Premium;
    }
    get Edition(): number {
        return this.data.Edition;
    }
    get TotalTasks(): number {
        return this.data.TotalTasks;
    }
    get ActiveTasks(): number {
        return this.data.ActiveTasks;
    }
    get CompletedTasks(): number {
        return this.data.CompletedTasks;
    }
    get DateNextDue(): Date {
        return this.data.DateNextDue ? new Date(this.data.DateNextDue) : undefined;
    }
    get CompletedOrStoppedOn(): Date {
        return this.data.CompletedOrStoppedOn ? new Date(this.data.CompletedOrStoppedOn) : undefined;
    }
    get CompletedOrStoppedBy(): string {
        return this.data.CompletedOrStoppedBy;
    }
    get IsCopy(): boolean {
        return this.data.IsCopy;
    }
    get CreatedOn(): Date {
        return this.data.CreatedOn ? new Date(this.data.CreatedOn) : undefined;
    }
    get CreatedAsStandby(): boolean {
        return this.data.CreatedAsStandby;
    }
    get StoppingDependencies(): string[] {
        return this.data.StoppingDependencies;
    }
    get StoppedDependencies(): string[] {
        return this.data.StoppedDependencies;
    }
    get CompletingDependencies(): string[] {
        return this.data.CompletingDependencies;
    }
    get CompletedDependencies(): string[] {
        return this.data.CompletedDependencies;
    }
    get LastCompletedTask(): string {
        return this.data.LastCompletedTask;
    }
    get VersionName(): string {
        return this.data.VersionName;
    }
    set VersionName(value: string) {
        this.data.VersionName = value;
    }
    get WorkflowVersionKey(): string {
        return this.data.WorkflowVersionKey;
    }
    get StopReason(): string {
        return this.data.StopReason;
    }
    get OriginalEdition(): number {
        return this.data.OriginalEdition;
    }
    get UseQuoteVersion(): boolean {
        return this.data.UseQuoteVersion;
    }

    // Relationships

    // Relationship IsRunningFor, returns Account AccountRunsWorkflow[]
    private __IsRunningFor: AccountRunsWorkflow[];
    IsRunningFor(_context?: BaseDataContext): AccountRunsWorkflow[] {
        if (this.__IsRunningFor)
            return this.__IsRunningFor;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsRunningFor), (id) => context.get(id) as AccountRunsWorkflow);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsRunningFor(values: AccountRunsWorkflow[]) {
         if (this.Context != null)
             throw Error;

        this.__IsRunningFor = values;
     }
    get _IsRunningFor(): Set<string> {
        if (!this._relationships.has("IsRunningFor"))
            this._relationships.set("IsRunningFor", new Set<string>());

        return this._relationships.get("IsRunningFor");
    }
    set _IsRunningFor(values: Set<string>) {
        this._relationships.set("IsRunningFor", values);
    }

    // Relationship Manages, returns Transaction TransactionIsManagedByWorkflow[]
    private __Manages: TransactionIsManagedByWorkflow[];
    Manages(_context?: BaseDataContext): TransactionIsManagedByWorkflow[] {
        if (this.__Manages)
            return this.__Manages;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Manages), (id) => context.get(id) as TransactionIsManagedByWorkflow);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setManages(values: TransactionIsManagedByWorkflow[]) {
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

    // Relationship IsStandbyFor, returns ProgramRevision ProgramRevisionStandbyWorkflow[]
    private __IsStandbyFor: ProgramRevisionStandbyWorkflow[];
    IsStandbyFor(_context?: BaseDataContext): ProgramRevisionStandbyWorkflow[] {
        if (this.__IsStandbyFor)
            return this.__IsStandbyFor;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsStandbyFor), (id) => context.get(id) as ProgramRevisionStandbyWorkflow);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsStandbyFor(values: ProgramRevisionStandbyWorkflow[]) {
         if (this.Context != null)
             throw Error;

        this.__IsStandbyFor = values;
     }
    get _IsStandbyFor(): Set<string> {
        if (!this._relationships.has("IsStandbyFor"))
            this._relationships.set("IsStandbyFor", new Set<string>());

        return this._relationships.get("IsStandbyFor");
    }
    set _IsStandbyFor(values: Set<string>) {
        this._relationships.set("IsStandbyFor", values);
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

    // Relationship Collects, returns Application WorkflowCollectsApplication[]
    private __Collects: WorkflowCollectsApplication[];
    Collects(_context?: BaseDataContext): WorkflowCollectsApplication[] {
        if (this.__Collects)
            return this.__Collects;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Collects), (id) => context.get(id) as WorkflowCollectsApplication);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setCollects(values: WorkflowCollectsApplication[]) {
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

    // Relationship Evaluates, returns Rule WorkflowEvaluatesRule[]
    private __Evaluates: WorkflowEvaluatesRule[];
    Evaluates(_context?: BaseDataContext): WorkflowEvaluatesRule[] {
        if (this.__Evaluates)
            return this.__Evaluates;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Evaluates), (id) => context.get(id) as WorkflowEvaluatesRule);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setEvaluates(values: WorkflowEvaluatesRule[]) {
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

    // Relationship Stores, returns DataStore WorkflowStoresDataStore[]
    private __Stores: WorkflowStoresDataStore[];
    Stores(_context?: BaseDataContext): WorkflowStoresDataStore[] {
        if (this.__Stores)
            return this.__Stores;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Stores), (id) => context.get(id) as WorkflowStoresDataStore);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setStores(values: WorkflowStoresDataStore[]) {
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


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsRunningFor',
            edgeType: AccountRunsWorkflow,
            otherVertexPropertyName: 'Runs',
            otherVertexType: Account,
        },
        {
            propertyName: 'Manages',
            edgeType: TransactionIsManagedByWorkflow,
            otherVertexPropertyName: 'IsManagedBy',
            otherVertexType: Transaction,
        },
        {
            propertyName: 'IsStandbyFor',
            edgeType: ProgramRevisionStandbyWorkflow,
            otherVertexPropertyName: 'HasStandby',
            otherVertexType: ProgramRevision,
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
            propertyName: 'Collects',
            edgeType: WorkflowCollectsApplication,
            otherVertexPropertyName: 'IsCollectedFor',
            otherVertexType: Application,
        },
        {
            propertyName: 'Evaluates',
            edgeType: WorkflowEvaluatesRule,
            otherVertexPropertyName: 'IsEvaluatedFor',
            otherVertexType: Rule,
        },
        {
            propertyName: 'Requires',
            edgeType: WorkflowRequiresPhase,
            otherVertexPropertyName: 'IsRequiredFor',
            otherVertexType: Phase,
        },
        {
            propertyName: 'Stores',
            edgeType: WorkflowStoresDataStore,
            otherVertexPropertyName: 'IsStoredFor',
            otherVertexType: DataStore,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Workflow {
        return ModelUtils.deserializeVertex<Workflow>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Workflow) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            ProvisionStatus: model.ProvisionStatus,
            ProvisionStatusChanged: model.ProvisionStatusChanged,
            ProvisionErrorReasons: model.ProvisionErrorReasons,
            ProvisionWaitingReasons: model.ProvisionWaitingReasons,
            CopiedFromId: model.CopiedFromId,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            WorkflowSetId: model.WorkflowSetId,
            Abbr: model.Abbr,
            Name: model.Name,
            Description: model.Description,
            Transactional: model.Transactional,
            Starting: model.Starting,
            EffectiveDate: ModelUtils.serializeContractDate(model.data.EffectiveDate),
            Status: model.Status,
            WorkflowType: model.WorkflowType,
            Notes: model.Notes,
            CompletedTaskPercent: model.CompletedTaskPercent,
            DataStoreId: model.DataStoreId,
            ProgramId: model.ProgramId,
            Premium: model.Premium,
            Edition: model.Edition,
            TotalTasks: model.TotalTasks,
            ActiveTasks: model.ActiveTasks,
            CompletedTasks: model.CompletedTasks,
            DateNextDue: model.DateNextDue,
            CompletedOrStoppedOn: model.CompletedOrStoppedOn,
            CompletedOrStoppedBy: model.CompletedOrStoppedBy,
            IsCopy: model.IsCopy,
            CreatedOn: model.CreatedOn,
            CreatedAsStandby: model.CreatedAsStandby,
            StoppingDependencies: model.StoppingDependencies,
            StoppedDependencies: model.StoppedDependencies,
            CompletingDependencies: model.CompletingDependencies,
            CompletedDependencies: model.CompletedDependencies,
            LastCompletedTask: model.LastCompletedTask,
            VersionName: model.VersionName,
            WorkflowVersionKey: model.WorkflowVersionKey,
            StopReason: model.StopReason,
            OriginalEdition: model.OriginalEdition,
            UseQuoteVersion: model.UseQuoteVersion,
            IsRunningFor: ModelUtils.serializeShallowEdge(model.IsRunningFor(), 'IsRunningFor'),
            Manages: ModelUtils.serializeShallowEdge(model.Manages(), 'Manages'),
            IsStandbyFor: ModelUtils.serializeShallowEdge(model.IsStandbyFor(), 'IsStandbyFor'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            Collects: ModelUtils.serializeShallowEdge(model.Collects(), 'Collects'),
            Evaluates: ModelUtils.serializeShallowEdge(model.Evaluates(), 'Evaluates'),
            Requires: ModelUtils.serializeShallowEdge(model.Requires(), 'Requires'),
            Stores: ModelUtils.serializeShallowEdge(model.Stores(), 'Stores'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Workflow {
        let clone = new Workflow();
        clone.data = _.cloneDeep(this.data);
        clone._IsRunningFor = _.cloneDeep(this._IsRunningFor);
        clone._Manages = _.cloneDeep(this._Manages);
        clone._IsStandbyFor = _.cloneDeep(this._IsStandbyFor);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._Collects = _.cloneDeep(this._Collects);
        clone._Evaluates = _.cloneDeep(this._Evaluates);
        clone._Requires = _.cloneDeep(this._Requires);
        clone._Stores = _.cloneDeep(this._Stores);

        //clone.Context = this.Context;
        return clone;
    }
}

export class WorkflowCollectsApplication extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "WorkflowCollectsApplication";
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
    private __IsCollectedFor: Workflow;

    IsCollectedFor(context?: BaseDataContext): Workflow {
        if (this.__IsCollectedFor)
           return this.__IsCollectedFor;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsCollectedFor) as Workflow;
    }
    setIsCollectedFor(value: Workflow) {
        this.__IsCollectedFor = value;
    }
    get _IsCollectedFor(): string {
        return this.Out;
    }
    set _IsCollectedFor(value: string) {
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

    deserialize(input: Object, datacontext): WorkflowCollectsApplication {
       return ModelUtils.deserializeEdge<WorkflowCollectsApplication>(this, input, datacontext, super._deserialize);
    }


    clone(): WorkflowCollectsApplication {
        let clone = new WorkflowCollectsApplication();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class WorkflowEvaluatesRule extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "WorkflowEvaluatesRule";
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
    private __IsEvaluatedFor: Workflow;

    IsEvaluatedFor(context?: BaseDataContext): Workflow {
        if (this.__IsEvaluatedFor)
           return this.__IsEvaluatedFor;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsEvaluatedFor) as Workflow;
    }
    setIsEvaluatedFor(value: Workflow) {
        this.__IsEvaluatedFor = value;
    }
    get _IsEvaluatedFor(): string {
        return this.Out;
    }
    set _IsEvaluatedFor(value: string) {
        this.Out = value;
    }
    //   In to Rule
    private __Evaluates: Rule;

    Evaluates(context?: BaseDataContext): Rule {
        if (this.__Evaluates)
           return this.__Evaluates;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Evaluates) as Rule;
    }
    setEvaluates(value: Rule) {
        this.__Evaluates = value;
    }
    get _Evaluates(): string {
        return this.In;
    }
    set _Evaluates(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): WorkflowEvaluatesRule {
       return ModelUtils.deserializeEdge<WorkflowEvaluatesRule>(this, input, datacontext, super._deserialize);
    }


    clone(): WorkflowEvaluatesRule {
        let clone = new WorkflowEvaluatesRule();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class WorkflowRequiresPhase extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "WorkflowRequiresPhase";
    }

    // Properties
    get CopiedFromId(): string {
        return this.data.CopiedFromId;
    }
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
    get Sequence(): number {
        return this.data.Sequence;
    }
    set Sequence(value: number) {
        this.data.Sequence = value;
    }
    get TotalTasks(): number {
        return this.data.TotalTasks;
    }
    set TotalTasks(value: number) {
        this.data.TotalTasks = value;
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

export interface IWorkflowSet {
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    Name: string,
    readonly DataStoreId?: string,
    readonly ProgramId: string,
    readonly Status: string,
    readonly RiskScore?: number,
    readonly CurrentRiskThreshold?: any,
    readonly SelectingWorkflowVersion?: string,
    readonly PreparingWorkflowForCopy?: string,

    IsPerformedFor?: object[],
    Contains?: object[]

}

export class WorkflowSet extends VertexModel {
    get Domain(): string {
        return "Area";
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
    get Name(): string {
        return this.data.Name;
    }
    set Name(value: string) {
        this.data.Name = value;
    }
    get DataStoreId(): string {
        return this.data.DataStoreId;
    }
    get ProgramId(): string {
        return this.data.ProgramId;
    }
    get Status(): string {
        return this.data.Status;
    }
    get RiskScore(): number {
        return this.data.RiskScore;
    }
    get CurrentRiskThreshold(): any {
        return this.data.CurrentRiskThreshold;
    }
    get SelectingWorkflowVersion(): string {
        return this.data.SelectingWorkflowVersion;
    }
    get PreparingWorkflowForCopy(): string {
        return this.data.PreparingWorkflowForCopy;
    }

    // Relationships

    // Relationship IsPerformedFor, returns Account AccountPerformsWorkflowSet[]
    private __IsPerformedFor: AccountPerformsWorkflowSet[];
    IsPerformedFor(_context?: BaseDataContext): AccountPerformsWorkflowSet[] {
        if (this.__IsPerformedFor)
            return this.__IsPerformedFor;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsPerformedFor), (id) => context.get(id) as AccountPerformsWorkflowSet);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsPerformedFor(values: AccountPerformsWorkflowSet[]) {
         if (this.Context != null)
             throw Error;

        this.__IsPerformedFor = values;
     }
    get _IsPerformedFor(): Set<string> {
        if (!this._relationships.has("IsPerformedFor"))
            this._relationships.set("IsPerformedFor", new Set<string>());

        return this._relationships.get("IsPerformedFor");
    }
    set _IsPerformedFor(values: Set<string>) {
        this._relationships.set("IsPerformedFor", values);
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
            propertyName: 'IsPerformedFor',
            edgeType: AccountPerformsWorkflowSet,
            otherVertexPropertyName: 'Performs',
            otherVertexType: Account,
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
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            Name: model.Name,
            DataStoreId: model.DataStoreId,
            ProgramId: model.ProgramId,
            Status: model.Status,
            RiskScore: model.RiskScore,
            CurrentRiskThreshold: model.CurrentRiskThreshold,
            SelectingWorkflowVersion: model.SelectingWorkflowVersion,
            PreparingWorkflowForCopy: model.PreparingWorkflowForCopy,
            IsPerformedFor: ModelUtils.serializeShallowEdge(model.IsPerformedFor(), 'IsPerformedFor'),
            Contains: ModelUtils.serializeShallowEdge(model.Contains(), 'Contains'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): WorkflowSet {
        let clone = new WorkflowSet();
        clone.data = _.cloneDeep(this.data);
        clone._IsPerformedFor = _.cloneDeep(this._IsPerformedFor);
        clone._Contains = _.cloneDeep(this._Contains);

        //clone.Context = this.Context;
        return clone;
    }
}

export class WorkflowSetContainsWorkflow extends EdgeModel {
    get Domain(): string {
        return "Area";
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

export class WorkflowStoresDataStore extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "WorkflowStoresDataStore";
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
    private __IsStoredFor: Workflow;

    IsStoredFor(context?: BaseDataContext): Workflow {
        if (this.__IsStoredFor)
           return this.__IsStoredFor;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsStoredFor) as Workflow;
    }
    setIsStoredFor(value: Workflow) {
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

    deserialize(input: Object, datacontext): WorkflowStoresDataStore {
       return ModelUtils.deserializeEdge<WorkflowStoresDataStore>(this, input, datacontext, super._deserialize);
    }


    clone(): WorkflowStoresDataStore {
        let clone = new WorkflowStoresDataStore();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class WorkGroupQueuesReservationSet extends EdgeModel {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "WorkGroupQueuesReservationSet";
    }

    // Properties
    get Id(): string {
        return this.data.Id;
    }
    set Id(value: string) {
        this.data.Id = value;
    }

    // Relationships

    //   Out to WorkGroup
    private __IsQueuedBy: WorkGroup;

    IsQueuedBy(context?: BaseDataContext): WorkGroup {
        if (this.__IsQueuedBy)
           return this.__IsQueuedBy;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._IsQueuedBy) as WorkGroup;
    }
    setIsQueuedBy(value: WorkGroup) {
        this.__IsQueuedBy = value;
    }
    get _IsQueuedBy(): string {
        return this.Out;
    }
    set _IsQueuedBy(value: string) {
        this.Out = value;
    }
    //   In to ReservationSet
    private __Queues: ReservationSet;

    Queues(context?: BaseDataContext): ReservationSet {
        if (this.__Queues)
           return this.__Queues;

        const _context = context || this.Context;
        if(!_context) return null;
        return _context.get(this._Queues) as ReservationSet;
    }
    setQueues(value: ReservationSet) {
        this.__Queues = value;
    }
    get _Queues(): string {
        return this.In;
    }
    set _Queues(value: string) {
        this.In = value;
    }

    deserialize(input: Object, datacontext): WorkGroupQueuesReservationSet {
       return ModelUtils.deserializeEdge<WorkGroupQueuesReservationSet>(this, input, datacontext, super._deserialize);
    }


    clone(): WorkGroupQueuesReservationSet {
        let clone = new WorkGroupQueuesReservationSet();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class AccountActivity extends Activity {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "AccountActivity";
    }

    // Properties
    get AccountId(): string {
        return this.data.AccountId;
    }
    set AccountId(value: string) {
        this.data.AccountId = value;
    }
    get AffectedUsers(): string[] {
        return this.data.AffectedUsers;
    }
    set AffectedUsers(value: string[]) {
        this.data.AffectedUsers = value;
    }
    get AlsoAppliesToIds(): string[] {
        return this.data.AlsoAppliesToIds;
    }


    deserialize(input: Object, datacontext): AccountActivity {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: AccountActivity) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DeletedDate: model.DeletedDate,
            Id: model.Id,
            Action: model.Action,
            EntityType: model.EntityType,
            EntityId: model.EntityId,
            EntityCorrelationKey: model.EntityCorrelationKey,
            IdentityKey: model.IdentityKey,
            DeletedBy: model.DeletedBy,
            ActivityTime: model.ActivityTime,
            Message: model.Message,
            Tags: model.Tags,
            AccountId: model.AccountId,
            AffectedUsers: model.AffectedUsers,
            AlsoAppliesToIds: model.AlsoAppliesToIds,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): AccountActivity {
        let clone = new AccountActivity();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IDataPoint {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly DataType: string,
    readonly Name: string,
    readonly Description?: string,
    readonly Optional: boolean,
    readonly RegExPattern?: string,
    ValidationType: string,
    Options?: string[],
    ValidationScript?: string,
    Tag?: string,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    readonly DataStoreId: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly RepeatableAncestors?: string[],
    readonly RepeatablePath?: any[],
    readonly RepeatablePathWasCalculated?: boolean,

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    IsMappingFor?: object[],
    ParameterSubstitutedBy?: object[],
    MapsTo?: object[]

}

export class DataPoint extends Mappable {
    get Domain(): string {
        return "Area";
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
    get Description(): string {
        return this.data.Description;
    }
    get Optional(): boolean {
        return this.data.Optional;
    }
    get RegExPattern(): string {
        return this.data.RegExPattern;
    }
    get ValidationType(): string {
        return this.data.ValidationType;
    }
    set ValidationType(value: string) {
        this.data.ValidationType = value;
    }
    get Options(): string[] {
        return this.data.Options;
    }
    set Options(value: string[]) {
        this.data.Options = value;
    }
    get ValidationScript(): string {
        return this.data.ValidationScript;
    }
    set ValidationScript(value: string) {
        this.data.ValidationScript = value;
    }
    get Tag(): string {
        return this.data.Tag;
    }
    set Tag(value: string) {
        this.data.Tag = value;
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
    get DataStoreId(): string {
        return this.data.DataStoreId;
    }
    get WorkflowSetId(): string {
        return this.data.WorkflowSetId;
    }
    get ParentId(): string {
        return this.data.ParentId;
    }
    get RepeatableAncestors(): string[] {
        return this.data.RepeatableAncestors;
    }
    get RepeatablePath(): any[] {
        return this.data.RepeatablePath;
    }
    get RepeatablePathWasCalculated(): boolean {
        return this.data.RepeatablePathWasCalculated;
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

    // Relationship ParameterSubstitutedBy, returns Correspondence CorrespondenceParameterSubstitutesDataPoint[]
    private __ParameterSubstitutedBy: CorrespondenceParameterSubstitutesDataPoint[];
    ParameterSubstitutedBy(_context?: BaseDataContext): CorrespondenceParameterSubstitutesDataPoint[] {
        if (this.__ParameterSubstitutedBy)
            return this.__ParameterSubstitutedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._ParameterSubstitutedBy), (id) => context.get(id) as CorrespondenceParameterSubstitutesDataPoint);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setParameterSubstitutedBy(values: CorrespondenceParameterSubstitutesDataPoint[]) {
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
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: CorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: Correspondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPoint {
        return ModelUtils.deserializeVertex<DataPoint>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPoint) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            Options: model.Options,
            ValidationScript: model.ValidationScript,
            Tag: model.Tag,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            DataStoreId: model.DataStoreId,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            RepeatableAncestors: model.RepeatableAncestors,
            RepeatablePath: model.RepeatablePath,
            RepeatablePathWasCalculated: model.RepeatablePathWasCalculated,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
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
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IField {
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly DisplayLabel?: string,
    readonly ShowHelp: boolean,
    readonly Help?: string,
    readonly ConditionMet: boolean,
    readonly ExternalId?: string,
    readonly ApplicationId: string,
    Content?: any,
    readonly Committed: boolean,
    readonly ContentType: string,
    readonly Optional: boolean,
    readonly DefaultContent?: any,
    readonly Access: string,
    readonly ValidationErrors?: string[],
    readonly DataChanged: boolean,
    readonly PreviousContent?: any,

    IsEnabledBy?: object[],
    IsContainedBy?: object[],
    Populates?: object[]

}

export class Field extends Element {
    get Domain(): string {
        return "Area";
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
    get Content(): any {
        return this.data.Content;
    }
    set Content(value: any) {
        this.data.Content = value;
    }
    get Committed(): boolean {
        return this.data.Committed;
    }
    get ContentType(): string {
        return this.data.ContentType;
    }
    get Optional(): boolean {
        return this.data.Optional;
    }
    get DefaultContent(): any {
        return this.data.DefaultContent;
    }
    get Access(): string {
        return this.data.Access;
    }
    get ValidationErrors(): string[] {
        return this.data.ValidationErrors;
    }
    get DataChanged(): boolean {
        return this.data.DataChanged;
    }
    get PreviousContent(): any {
        return this.data.PreviousContent;
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
            propertyName: 'IsContainedBy',
            edgeType: SectionContainsElement,
            otherVertexPropertyName: 'Contains',
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
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            ApplicationId: model.ApplicationId,
            Content: model.Content,
            Committed: model.Committed,
            ContentType: model.ContentType,
            Optional: model.Optional,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            ValidationErrors: model.ValidationErrors,
            DataChanged: model.DataChanged,
            PreviousContent: model.PreviousContent,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Field {
        let clone = new Field();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IPhase {
    readonly OrderNum: number,
    readonly CopiedFromId?: string,
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    DueDate?: Date,
    readonly CompletionStatus: string,
    readonly AvailabilityStatus: string,
    readonly ObligationStatus: string,
    readonly DateStatusChanged: Date,
    readonly StatusChangedById?: string,
    readonly WaiveJournalEntryKey?: string,
    CompletingDependencies?: string[],
    CompletedDependencies?: string[],
    readonly Name: string,
    readonly CompleteName: string,
    readonly Description: string,
    AutoComplete: boolean,

    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    IsRequiredFor?: object[],
    Requires?: object[],
    Triggers?: object[],
    Enables?: object[]

}

export class Phase extends Workable {
    get Domain(): string {
        return "Area";
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
    get OrderNum(): number {
        return this.data.OrderNum;
    }
    get CopiedFromId(): string {
        return this.data.CopiedFromId;
    }
    get CreatedFromId(): string {
        return this.data.CreatedFromId;
    }
    get CreatedFromRevision(): string {
        return this.data.CreatedFromRevision;
    }
    get Name(): string {
        return this.data.Name;
    }
    get CompleteName(): string {
        return this.data.CompleteName;
    }
    get Description(): string {
        return this.data.Description;
    }
    get AutoComplete(): boolean {
        return this.data.AutoComplete;
    }
    set AutoComplete(value: boolean) {
        this.data.AutoComplete = value;
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
            OrderNum: model.OrderNum,
            CopiedFromId: model.CopiedFromId,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DueDate: model.DueDate,
            CompletionStatus: model.CompletionStatus,
            AvailabilityStatus: model.AvailabilityStatus,
            ObligationStatus: model.ObligationStatus,
            DateStatusChanged: model.DateStatusChanged,
            StatusChangedById: model.StatusChangedById,
            WaiveJournalEntryKey: model.WaiveJournalEntryKey,
            CompletingDependencies: model.CompletingDependencies,
            CompletedDependencies: model.CompletedDependencies,
            Name: model.Name,
            CompleteName: model.CompleteName,
            Description: model.Description,
            AutoComplete: model.AutoComplete,
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
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
        clone._Requires = _.cloneDeep(this._Requires);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IRule {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly DataType: string,
    readonly Name?: string,
    readonly Description?: string,
    readonly DecisionFunction?: string,
    readonly DecisionMatrixJson?: string,
    readonly Decision?: string,

    IsMappingFor?: object[],
    IsContainedBy?: object[],
    IsEvaluatedFor?: object[],
    MapsTo?: object[]

}

export class Rule extends Mappable {
    get Domain(): string {
        return "Area";
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
    get Description(): string {
        return this.data.Description;
    }
    get DecisionFunction(): string {
        return this.data.DecisionFunction;
    }
    get DecisionMatrixJson(): string {
        return this.data.DecisionMatrixJson;
    }
    get Decision(): string {
        return this.data.Decision;
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

    // Relationship IsEvaluatedFor, returns Workflow WorkflowEvaluatesRule[]
    private __IsEvaluatedFor: WorkflowEvaluatesRule[];
    IsEvaluatedFor(_context?: BaseDataContext): WorkflowEvaluatesRule[] {
        if (this.__IsEvaluatedFor)
            return this.__IsEvaluatedFor;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsEvaluatedFor), (id) => context.get(id) as WorkflowEvaluatesRule);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsEvaluatedFor(values: WorkflowEvaluatesRule[]) {
         if (this.Context != null)
             throw Error;

        this.__IsEvaluatedFor = values;
     }
    get _IsEvaluatedFor(): Set<string> {
        if (!this._relationships.has("IsEvaluatedFor"))
            this._relationships.set("IsEvaluatedFor", new Set<string>());

        return this._relationships.get("IsEvaluatedFor");
    }
    set _IsEvaluatedFor(values: Set<string>) {
        this._relationships.set("IsEvaluatedFor", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: RuleSetContainsRule,
            otherVertexPropertyName: 'Contains',
            otherVertexType: RuleSet,
        },
        {
            propertyName: 'IsEvaluatedFor',
            edgeType: WorkflowEvaluatesRule,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: Workflow,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Rule {
        return ModelUtils.deserializeVertex<Rule>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Rule) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            DecisionFunction: model.DecisionFunction,
            DecisionMatrixJson: model.DecisionMatrixJson,
            Decision: model.Decision,
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsEvaluatedFor: ModelUtils.serializeShallowEdge(model.IsEvaluatedFor(), 'IsEvaluatedFor'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Rule {
        let clone = new Rule();
        clone.data = _.cloneDeep(this.data);
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._IsEvaluatedFor = _.cloneDeep(this._IsEvaluatedFor);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IRuleSetRiskAssessment {
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly Name?: string,
    readonly Description?: string,
    WorkflowSetId: string,
    readonly RiskScore?: number,

    Contains?: object[]

}

export class RuleSetRiskAssessment extends RuleSet {
    get Domain(): string {
        return "Area";
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
    get RiskScore(): number {
        return this.data.RiskScore;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [

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
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            WorkflowSetId: model.WorkflowSetId,
            RiskScore: model.RiskScore,
            Contains: ModelUtils.serializeShallowEdge(model.Contains(), 'Contains'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): RuleSetRiskAssessment {
        let clone = new RuleSetRiskAssessment();
        clone.data = _.cloneDeep(this.data);
        clone._Contains = _.cloneDeep(this._Contains);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IScriptCondition {
    readonly CopiedFromId?: string,
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly Name?: string,
    readonly Description?: string,
    readonly ConditionMet: boolean,
    readonly ScriptFunction: string,

    IsContainedBy?: object[],
    Enables?: object[],
    Evaluates?: object[]

}

export class ScriptCondition extends ElementCondition {
    get Domain(): string {
        return "Area";
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
            CopiedFromId: model.CopiedFromId,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            Name: model.Name,
            Description: model.Description,
            ConditionMet: model.ConditionMet,
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
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly DisplayLabel?: string,
    readonly ShowHelp: boolean,
    readonly Help?: string,
    readonly ConditionMet: boolean,
    readonly ExternalId?: string,
    readonly ApplicationId: string,
    Participation: boolean,
    readonly ParticipationStatus?: string,
    readonly Committed: boolean,
    readonly Repeatable: boolean,
    readonly LayoutHint: string,
    readonly DisplayProperties?: string[],
    MinSections?: number,
    MaxSections?: number,

    IsEnabledBy?: object[],
    IsCollectedBy?: object[],
    IsContainedBy?: object[],
    Contains?: object[],
    RepeatsWith?: object[]

}

export class Section extends Element {
    get Domain(): string {
        return "Area";
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
    get Participation(): boolean {
        return this.data.Participation;
    }
    set Participation(value: boolean) {
        this.data.Participation = value;
    }
    get ParticipationStatus(): string {
        return this.data.ParticipationStatus;
    }
    get Committed(): boolean {
        return this.data.Committed;
    }
    get Repeatable(): boolean {
        return this.data.Repeatable;
    }
    get LayoutHint(): string {
        return this.data.LayoutHint;
    }
    get DisplayProperties(): string[] {
        return this.data.DisplayProperties;
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

    // Relationship Contains, returns Element SectionContainsElement[]
    private __Contains: SectionContainsElement[];
    Contains(_context?: BaseDataContext): SectionContainsElement[] {
        if (this.__Contains)
            return this.__Contains;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Contains), (id) => context.get(id) as SectionContainsElement);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setContains(values: SectionContainsElement[]) {
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
            propertyName: 'IsContainedBy',
            edgeType: SectionContainsElement,
            otherVertexPropertyName: 'Contains',
            otherVertexType: Section,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Contains',
            edgeType: SectionContainsElement,
            otherVertexPropertyName: 'IsContainedBy',
            otherVertexType: Element,
        },
        {
            propertyName: 'RepeatsWith',
            edgeType: SectionRepeatsWithDataGroup,
            otherVertexPropertyName: 'RepeatsWithSection',
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
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            ApplicationId: model.ApplicationId,
            Participation: model.Participation,
            ParticipationStatus: model.ParticipationStatus,
            Committed: model.Committed,
            Repeatable: model.Repeatable,
            LayoutHint: model.LayoutHint,
            DisplayProperties: model.DisplayProperties,
            MinSections: model.MinSections,
            MaxSections: model.MaxSections,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsCollectedBy: ModelUtils.serializeShallowEdge(model.IsCollectedBy(), 'IsCollectedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            Contains: ModelUtils.serializeShallowEdge(model.Contains(), 'Contains'),
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
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._Contains = _.cloneDeep(this._Contains);
        clone._RepeatsWith = _.cloneDeep(this._RepeatsWith);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ISMIdentity {
    Id: string,
    TasksAssigned: number,
    readonly DateCreated?: Date,
    readonly IdentityType: string,
    readonly Active: boolean,

    Assignee?: object[],
    IsMemberOf?: object[],
    Starts?: object[],
    Works?: object[],
    Favorites?: object[]

}

export class SMIdentity extends Assignable {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "SMIdentity";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof SMIdentity }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get IdentityType(): string {
        return this.data.IdentityType;
    }
    get Active(): boolean {
        return this.data.Active;
    }

    // Relationships

    // Relationship IsMemberOf, returns UserPool SMIdentityMemberOfUserPool[]
    private __IsMemberOf: SMIdentityMemberOfUserPool[];
    IsMemberOf(_context?: BaseDataContext): SMIdentityMemberOfUserPool[] {
        if (this.__IsMemberOf)
            return this.__IsMemberOf;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsMemberOf), (id) => context.get(id) as SMIdentityMemberOfUserPool);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsMemberOf(values: SMIdentityMemberOfUserPool[]) {
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

    // Relationship Starts, returns ReservationSet SMIdentityStartsReservationSet[]
    private __Starts: SMIdentityStartsReservationSet[];
    Starts(_context?: BaseDataContext): SMIdentityStartsReservationSet[] {
        if (this.__Starts)
            return this.__Starts;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Starts), (id) => context.get(id) as SMIdentityStartsReservationSet);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setStarts(values: SMIdentityStartsReservationSet[]) {
         if (this.Context != null)
             throw Error;

        this.__Starts = values;
     }
    get _Starts(): Set<string> {
        if (!this._relationships.has("Starts"))
            this._relationships.set("Starts", new Set<string>());

        return this._relationships.get("Starts");
    }
    set _Starts(values: Set<string>) {
        this._relationships.set("Starts", values);
    }

    // Relationship Works, returns Account SMIdentityWorksAccount[]
    private __Works: SMIdentityWorksAccount[];
    Works(_context?: BaseDataContext): SMIdentityWorksAccount[] {
        if (this.__Works)
            return this.__Works;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Works), (id) => context.get(id) as SMIdentityWorksAccount);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setWorks(values: SMIdentityWorksAccount[]) {
         if (this.Context != null)
             throw Error;

        this.__Works = values;
     }
    get _Works(): Set<string> {
        if (!this._relationships.has("Works"))
            this._relationships.set("Works", new Set<string>());

        return this._relationships.get("Works");
    }
    set _Works(values: Set<string>) {
        this._relationships.set("Works", values);
    }

    // Relationship Favorites, returns Account UserFavoritesAccount[]
    private __Favorites: UserFavoritesAccount[];
    Favorites(_context?: BaseDataContext): UserFavoritesAccount[] {
        if (this.__Favorites)
            return this.__Favorites;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Favorites), (id) => context.get(id) as UserFavoritesAccount);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setFavorites(values: UserFavoritesAccount[]) {
         if (this.Context != null)
             throw Error;

        this.__Favorites = values;
     }
    get _Favorites(): Set<string> {
        if (!this._relationships.has("Favorites"))
            this._relationships.set("Favorites", new Set<string>());

        return this._relationships.get("Favorites");
    }
    set _Favorites(values: Set<string>) {
        this._relationships.set("Favorites", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Assignee',
            edgeType: AssignableAssignedTask,
            otherVertexPropertyName: 'AssignedTo',
            otherVertexType: Task,
        },
        {
            propertyName: 'IsMemberOf',
            edgeType: SMIdentityMemberOfUserPool,
            otherVertexPropertyName: 'HasMembers',
            otherVertexType: UserPool,
        },
        {
            propertyName: 'Starts',
            edgeType: SMIdentityStartsReservationSet,
            otherVertexPropertyName: 'IsStartedBy',
            otherVertexType: ReservationSet,
        },
        {
            propertyName: 'Works',
            edgeType: SMIdentityWorksAccount,
            otherVertexPropertyName: 'IsWorkedBy',
            otherVertexType: Account,
        },
        {
            propertyName: 'Favorites',
            edgeType: UserFavoritesAccount,
            otherVertexPropertyName: 'IsFavoriteOf',
            otherVertexType: Account,
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
            TasksAssigned: model.TasksAssigned,
            DateCreated: model.DateCreated,
            IdentityType: model.IdentityType,
            Active: model.Active,
            Assignee: ModelUtils.serializeShallowEdge(model.Assignee(), 'Assignee'),
            IsMemberOf: ModelUtils.serializeShallowEdge(model.IsMemberOf(), 'IsMemberOf'),
            Starts: ModelUtils.serializeShallowEdge(model.Starts(), 'Starts'),
            Works: ModelUtils.serializeShallowEdge(model.Works(), 'Works'),
            Favorites: ModelUtils.serializeShallowEdge(model.Favorites(), 'Favorites'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): SMIdentity {
        let clone = new SMIdentity();
        clone.data = _.cloneDeep(this.data);
        clone._Assignee = _.cloneDeep(this._Assignee);
        clone._IsMemberOf = _.cloneDeep(this._IsMemberOf);
        clone._Starts = _.cloneDeep(this._Starts);
        clone._Works = _.cloneDeep(this._Works);
        clone._Favorites = _.cloneDeep(this._Favorites);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IStaticElement {
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly DisplayLabel?: string,
    readonly ShowHelp: boolean,
    readonly Help?: string,
    readonly ConditionMet: boolean,
    readonly ExternalId?: string,
    readonly ApplicationId: string

    IsEnabledBy?: object[],
    IsContainedBy?: object[]

}

export class StaticElement extends Element {
    get Domain(): string {
        return "Area";
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
            propertyName: 'IsContainedBy',
            edgeType: SectionContainsElement,
            otherVertexPropertyName: 'Contains',
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
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            ApplicationId: model.ApplicationId,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): StaticElement {
        let clone = new StaticElement();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITask {
    readonly ProvisionStatus: string,
    readonly ProvisionStatusChanged: Date,
    readonly ProvisionErrorReasons?: string[],
    readonly ProvisionWaitingReasons?: string[],
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId?: string,
    readonly CreatedFromRevision?: string,
    Id: string,
    DueDate?: Date,
    readonly CompletionStatus: string,
    readonly AvailabilityStatus: string,
    readonly ObligationStatus: string,
    readonly DateStatusChanged: Date,
    readonly StatusChangedById?: string,
    readonly WaiveJournalEntryKey?: string,
    CompletingDependencies?: string[],
    CompletedDependencies?: string[],
    Name: string,
    Description: string,
    HowTo?: string,
    readonly DateLockedOrCompleted?: Date,
    readonly LockedOrCompletedByName?: string,
    readonly LockedOrCompletedById?: string,
    readonly RuleId?: string,
    readonly RuleDescription?: string,
    readonly InitiallyAssignedTo?: string,
    StartDate?: Date,
    readonly CreatedDate: Date,
    readonly ExecutionStatus: string,
    readonly ExecutionErrorReason?: string,
    readonly LastExecutedDate?: Date,
    readonly LastAvailableDate?: Date,
    readonly WorkflowId: string,
    readonly CreatedBy?: string,
    readonly DeadlineTriggerDefinitionId?: string,
    readonly Deadline?: Date,
    DeadlineImminentDate?: Date,
    readonly DeadlineTriggeredOn?: Date,
    SLATriggeredOn?: Date,
    SLATriggeredByWorkableId?: string,
    SLADueOn?: Date,
    SLAImminentDate?: Date,
    SLAVersionId?: string,
    SLAId?: string,
    readonly ManualDueDate?: Date,
    ManualDueDateImminentUnitOfTime?: string,
    ManualDueDateImminentValue?: number,
    ManualDueDateImminentDate?: Date,

    IsSatisfiedBy?: object[],
    AssignedTo?: object[],
    IsRequiredFor?: object[],
    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    Enables?: object[]

}

export class Task extends Workable {
    get Domain(): string {
        return "Area";
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
    get ProvisionStatus(): string {
        return this.data.ProvisionStatus;
    }
    get ProvisionStatusChanged(): Date {
        return this.data.ProvisionStatusChanged ? new Date(this.data.ProvisionStatusChanged) : undefined;
    }
    get ProvisionErrorReasons(): string[] {
        return this.data.ProvisionErrorReasons;
    }
    get ProvisionWaitingReasons(): string[] {
        return this.data.ProvisionWaitingReasons;
    }
    get CopiedFromId(): string {
        return this.data.CopiedFromId;
    }
    get OrderNum(): number {
        return this.data.OrderNum;
    }
    get CreatedFromId(): string {
        return this.data.CreatedFromId;
    }
    get CreatedFromRevision(): string {
        return this.data.CreatedFromRevision;
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
    get HowTo(): string {
        return this.data.HowTo;
    }
    set HowTo(value: string) {
        this.data.HowTo = value;
    }
    get DateLockedOrCompleted(): Date {
        return this.data.DateLockedOrCompleted ? new Date(this.data.DateLockedOrCompleted) : undefined;
    }
    get LockedOrCompletedByName(): string {
        return this.data.LockedOrCompletedByName;
    }
    get LockedOrCompletedById(): string {
        return this.data.LockedOrCompletedById;
    }
    get RuleId(): string {
        return this.data.RuleId;
    }
    get RuleDescription(): string {
        return this.data.RuleDescription;
    }
    get InitiallyAssignedTo(): string {
        return this.data.InitiallyAssignedTo;
    }
    get StartDate(): Date {
        return this.data.StartDate ? new Date(this.data.StartDate) : undefined;
    }
    set StartDate(value: Date) {
        this.data.StartDate = value;
    }
    get CreatedDate(): Date {
        return this.data.CreatedDate ? new Date(this.data.CreatedDate) : undefined;
    }
    get ExecutionStatus(): string {
        return this.data.ExecutionStatus;
    }
    get ExecutionErrorReason(): string {
        return this.data.ExecutionErrorReason;
    }
    get LastExecutedDate(): Date {
        return this.data.LastExecutedDate ? new Date(this.data.LastExecutedDate) : undefined;
    }
    get LastAvailableDate(): Date {
        return this.data.LastAvailableDate ? new Date(this.data.LastAvailableDate) : undefined;
    }
    get WorkflowId(): string {
        return this.data.WorkflowId;
    }
    get CreatedBy(): string {
        return this.data.CreatedBy;
    }
    get DeadlineTriggerDefinitionId(): string {
        return this.data.DeadlineTriggerDefinitionId;
    }
    get Deadline(): Date {
        return this.data.Deadline ? new Date(this.data.Deadline) : undefined;
    }
    get DeadlineImminentDate(): Date {
        return this.data.DeadlineImminentDate ? new Date(this.data.DeadlineImminentDate) : undefined;
    }
    set DeadlineImminentDate(value: Date) {
        this.data.DeadlineImminentDate = value;
    }
    get DeadlineTriggeredOn(): Date {
        return this.data.DeadlineTriggeredOn ? new Date(this.data.DeadlineTriggeredOn) : undefined;
    }
    get SLATriggeredOn(): Date {
        return this.data.SLATriggeredOn ? new Date(this.data.SLATriggeredOn) : undefined;
    }
    set SLATriggeredOn(value: Date) {
        this.data.SLATriggeredOn = value;
    }
    get SLATriggeredByWorkableId(): string {
        return this.data.SLATriggeredByWorkableId;
    }
    set SLATriggeredByWorkableId(value: string) {
        this.data.SLATriggeredByWorkableId = value;
    }
    get SLADueOn(): Date {
        return this.data.SLADueOn ? new Date(this.data.SLADueOn) : undefined;
    }
    set SLADueOn(value: Date) {
        this.data.SLADueOn = value;
    }
    get SLAImminentDate(): Date {
        return this.data.SLAImminentDate ? new Date(this.data.SLAImminentDate) : undefined;
    }
    set SLAImminentDate(value: Date) {
        this.data.SLAImminentDate = value;
    }
    get SLAVersionId(): string {
        return this.data.SLAVersionId;
    }
    set SLAVersionId(value: string) {
        this.data.SLAVersionId = value;
    }
    get SLAId(): string {
        return this.data.SLAId;
    }
    set SLAId(value: string) {
        this.data.SLAId = value;
    }
    get ManualDueDate(): Date {
        return this.data.ManualDueDate ? new Date(this.data.ManualDueDate) : undefined;
    }
    get ManualDueDateImminentUnitOfTime(): string {
        return this.data.ManualDueDateImminentUnitOfTime;
    }
    set ManualDueDateImminentUnitOfTime(value: string) {
        this.data.ManualDueDateImminentUnitOfTime = value;
    }
    get ManualDueDateImminentValue(): number {
        return this.data.ManualDueDateImminentValue;
    }
    set ManualDueDateImminentValue(value: number) {
        this.data.ManualDueDateImminentValue = value;
    }
    get ManualDueDateImminentDate(): Date {
        return this.data.ManualDueDateImminentDate ? new Date(this.data.ManualDueDateImminentDate) : undefined;
    }
    set ManualDueDateImminentDate(value: Date) {
        this.data.ManualDueDateImminentDate = value;
    }

    // Relationships

    // Relationship IsSatisfiedBy, returns Document DocumentSatisfiesTask[]
    private __IsSatisfiedBy: DocumentSatisfiesTask[];
    IsSatisfiedBy(_context?: BaseDataContext): DocumentSatisfiesTask[] {
        if (this.__IsSatisfiedBy)
            return this.__IsSatisfiedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsSatisfiedBy), (id) => context.get(id) as DocumentSatisfiesTask);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsSatisfiedBy(values: DocumentSatisfiesTask[]) {
         if (this.Context != null)
             throw Error;

        this.__IsSatisfiedBy = values;
     }
    get _IsSatisfiedBy(): Set<string> {
        if (!this._relationships.has("IsSatisfiedBy"))
            this._relationships.set("IsSatisfiedBy", new Set<string>());

        return this._relationships.get("IsSatisfiedBy");
    }
    set _IsSatisfiedBy(values: Set<string>) {
        this._relationships.set("IsSatisfiedBy", values);
    }

    // Relationship AssignedTo, returns Assignable AssignableAssignedTask[]
    private __AssignedTo: AssignableAssignedTask[];
    AssignedTo(_context?: BaseDataContext): AssignableAssignedTask[] {
        if (this.__AssignedTo)
            return this.__AssignedTo;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._AssignedTo), (id) => context.get(id) as AssignableAssignedTask);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setAssignedTo(values: AssignableAssignedTask[]) {
         if (this.Context != null)
             throw Error;

        this.__AssignedTo = values;
     }
    get _AssignedTo(): Set<string> {
        if (!this._relationships.has("AssignedTo"))
            this._relationships.set("AssignedTo", new Set<string>());

        return this._relationships.get("AssignedTo");
    }
    set _AssignedTo(values: Set<string>) {
        this._relationships.set("AssignedTo", values);
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


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsSatisfiedBy',
            edgeType: DocumentSatisfiesTask,
            otherVertexPropertyName: 'Satisfies',
            otherVertexType: Document,
        },
        {
            propertyName: 'AssignedTo',
            edgeType: AssignableAssignedTask,
            otherVertexPropertyName: 'Assignee',
            otherVertexType: Assignable,
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
            ProvisionStatus: model.ProvisionStatus,
            ProvisionStatusChanged: model.ProvisionStatusChanged,
            ProvisionErrorReasons: model.ProvisionErrorReasons,
            ProvisionWaitingReasons: model.ProvisionWaitingReasons,
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DueDate: model.DueDate,
            CompletionStatus: model.CompletionStatus,
            AvailabilityStatus: model.AvailabilityStatus,
            ObligationStatus: model.ObligationStatus,
            DateStatusChanged: model.DateStatusChanged,
            StatusChangedById: model.StatusChangedById,
            WaiveJournalEntryKey: model.WaiveJournalEntryKey,
            CompletingDependencies: model.CompletingDependencies,
            CompletedDependencies: model.CompletedDependencies,
            Name: model.Name,
            Description: model.Description,
            HowTo: model.HowTo,
            DateLockedOrCompleted: model.DateLockedOrCompleted,
            LockedOrCompletedByName: model.LockedOrCompletedByName,
            LockedOrCompletedById: model.LockedOrCompletedById,
            RuleId: model.RuleId,
            RuleDescription: model.RuleDescription,
            InitiallyAssignedTo: model.InitiallyAssignedTo,
            StartDate: model.StartDate,
            CreatedDate: model.CreatedDate,
            ExecutionStatus: model.ExecutionStatus,
            ExecutionErrorReason: model.ExecutionErrorReason,
            LastExecutedDate: model.LastExecutedDate,
            LastAvailableDate: model.LastAvailableDate,
            WorkflowId: model.WorkflowId,
            CreatedBy: model.CreatedBy,
            DeadlineTriggerDefinitionId: model.DeadlineTriggerDefinitionId,
            Deadline: model.Deadline,
            DeadlineImminentDate: model.DeadlineImminentDate,
            DeadlineTriggeredOn: model.DeadlineTriggeredOn,
            SLATriggeredOn: model.SLATriggeredOn,
            SLATriggeredByWorkableId: model.SLATriggeredByWorkableId,
            SLADueOn: model.SLADueOn,
            SLAImminentDate: model.SLAImminentDate,
            SLAVersionId: model.SLAVersionId,
            SLAId: model.SLAId,
            ManualDueDate: model.ManualDueDate,
            ManualDueDateImminentUnitOfTime: model.ManualDueDateImminentUnitOfTime,
            ManualDueDateImminentValue: model.ManualDueDateImminentValue,
            ManualDueDateImminentDate: model.ManualDueDateImminentDate,
            IsSatisfiedBy: ModelUtils.serializeShallowEdge(model.IsSatisfiedBy(), 'IsSatisfiedBy'),
            AssignedTo: ModelUtils.serializeShallowEdge(model.AssignedTo(), 'AssignedTo'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Task {
        let clone = new Task();
        clone.data = _.cloneDeep(this.data);
        clone._IsSatisfiedBy = _.cloneDeep(this._IsSatisfiedBy);
        clone._AssignedTo = _.cloneDeep(this._AssignedTo);
        clone._IsRequiredFor = _.cloneDeep(this._IsRequiredFor);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITransform {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    readonly DataType: string,
    Id: string,

    IsContainedBy?: object[],
    IsMappingFor?: object[],
    MapsTo?: object[]

}

export class Transform extends Mappable {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "Transform";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof Transform }[] = [
            {className: 'ScriptTransform', type: ScriptTransform},

        ];
        return derivedTypes;
    }

    // Properties

    // Relationships

    // Relationship IsContainedBy, returns Map MapContainsTransform[]
    private __IsContainedBy: MapContainsTransform[];
    IsContainedBy(_context?: BaseDataContext): MapContainsTransform[] {
        if (this.__IsContainedBy)
            return this.__IsContainedBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._IsContainedBy), (id) => context.get(id) as MapContainsTransform);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setIsContainedBy(values: MapContainsTransform[]) {
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
            edgeType: MapContainsTransform,
            otherVertexPropertyName: 'Contains',
            otherVertexType: Map,
        },
        {
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): Transform {
        return ModelUtils.deserializeVertex<Transform>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: Transform) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            DataType: model.DataType,
            Id: model.Id,
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): Transform {
        let clone = new Transform();
        clone.data = _.cloneDeep(this.data);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export class UserActivity extends Activity {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "UserActivity";
    }

    // Properties


    deserialize(input: Object, datacontext): UserActivity {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: UserActivity) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            DeletedDate: model.DeletedDate,
            Id: model.Id,
            Action: model.Action,
            EntityType: model.EntityType,
            EntityId: model.EntityId,
            EntityCorrelationKey: model.EntityCorrelationKey,
            IdentityKey: model.IdentityKey,
            DeletedBy: model.DeletedBy,
            ActivityTime: model.ActivityTime,
            Message: model.Message,
            Tags: model.Tags,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): UserActivity {
        let clone = new UserActivity();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IUserPool {
    Id: string,
    TasksAssigned: number,
    readonly DateCreated?: Date,
    DisplayName: string,
    Initials: string,
    NoOfUsers: number,
    NoOfActiveUsers: number,

    HasMembers?: object[],
    Assignee?: object[]

}

export class UserPool extends Assignable {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "UserPool";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof UserPool }[] = [
            {className: 'AccountRole', type: AccountRole},
            {className: 'WorkGroup', type: WorkGroup},

        ];
        return derivedTypes;
    }

    // Properties
    get DisplayName(): string {
        return this.data.DisplayName;
    }
    set DisplayName(value: string) {
        this.data.DisplayName = value;
    }
    get Initials(): string {
        return this.data.Initials;
    }
    set Initials(value: string) {
        this.data.Initials = value;
    }
    get NoOfUsers(): number {
        return this.data.NoOfUsers;
    }
    set NoOfUsers(value: number) {
        this.data.NoOfUsers = value;
    }
    get NoOfActiveUsers(): number {
        return this.data.NoOfActiveUsers;
    }
    set NoOfActiveUsers(value: number) {
        this.data.NoOfActiveUsers = value;
    }

    // Relationships

    // Relationship HasMembers, returns SMIdentity SMIdentityMemberOfUserPool[]
    private __HasMembers: SMIdentityMemberOfUserPool[];
    HasMembers(_context?: BaseDataContext): SMIdentityMemberOfUserPool[] {
        if (this.__HasMembers)
            return this.__HasMembers;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._HasMembers), (id) => context.get(id) as SMIdentityMemberOfUserPool);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setHasMembers(values: SMIdentityMemberOfUserPool[]) {
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
            propertyName: 'HasMembers',
            edgeType: SMIdentityMemberOfUserPool,
            otherVertexPropertyName: 'IsMemberOf',
            otherVertexType: SMIdentity,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Assignee',
            edgeType: AssignableAssignedTask,
            otherVertexPropertyName: 'AssignedTo',
            otherVertexType: Task,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): UserPool {
        return ModelUtils.deserializeVertex<UserPool>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: UserPool) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            TasksAssigned: model.TasksAssigned,
            DateCreated: model.DateCreated,
            DisplayName: model.DisplayName,
            Initials: model.Initials,
            NoOfUsers: model.NoOfUsers,
            NoOfActiveUsers: model.NoOfActiveUsers,
            HasMembers: ModelUtils.serializeShallowEdge(model.HasMembers(), 'HasMembers'),
            Assignee: ModelUtils.serializeShallowEdge(model.Assignee(), 'Assignee'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): UserPool {
        let clone = new UserPool();
        clone.data = _.cloneDeep(this.data);
        clone._HasMembers = _.cloneDeep(this._HasMembers);
        clone._Assignee = _.cloneDeep(this._Assignee);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IAccountRole {
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    TasksAssigned: number,
    readonly DateCreated?: Date,
    DisplayName: string,
    Initials: string,
    NoOfUsers: number,
    NoOfActiveUsers: number,

    DeliveredBy?: object[],
    HasMembers?: object[],
    Services?: object[],
    Assignee?: object[]

}

export class AccountRole extends UserPool {
    get Domain(): string {
        return "Area";
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
    get CreatedFromId(): string {
        return this.data.CreatedFromId;
    }
    get CreatedFromRevision(): string {
        return this.data.CreatedFromRevision;
    }

    // Relationships

    // Relationship DeliveredBy, returns Correspondence CorrespondenceDeliversAccountRole[]
    private __DeliveredBy: CorrespondenceDeliversAccountRole[];
    DeliveredBy(_context?: BaseDataContext): CorrespondenceDeliversAccountRole[] {
        if (this.__DeliveredBy)
            return this.__DeliveredBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._DeliveredBy), (id) => context.get(id) as CorrespondenceDeliversAccountRole);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setDeliveredBy(values: CorrespondenceDeliversAccountRole[]) {
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

    // Relationship Services, returns Account AccountRoleServicesAccount[]
    private __Services: AccountRoleServicesAccount[];
    Services(_context?: BaseDataContext): AccountRoleServicesAccount[] {
        if (this.__Services)
            return this.__Services;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Services), (id) => context.get(id) as AccountRoleServicesAccount);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setServices(values: AccountRoleServicesAccount[]) {
         if (this.Context != null)
             throw Error;

        this.__Services = values;
     }
    get _Services(): Set<string> {
        if (!this._relationships.has("Services"))
            this._relationships.set("Services", new Set<string>());

        return this._relationships.get("Services");
    }
    set _Services(values: Set<string>) {
        this._relationships.set("Services", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'DeliveredBy',
            edgeType: CorrespondenceDeliversAccountRole,
            otherVertexPropertyName: 'DeliversAccount',
            otherVertexType: Correspondence,
        },
        {
            propertyName: 'HasMembers',
            edgeType: SMIdentityMemberOfUserPool,
            otherVertexPropertyName: 'IsMemberOf',
            otherVertexType: SMIdentity,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Services',
            edgeType: AccountRoleServicesAccount,
            otherVertexPropertyName: 'IsServicedBy',
            otherVertexType: Account,
        },
        {
            propertyName: 'Assignee',
            edgeType: AssignableAssignedTask,
            otherVertexPropertyName: 'AssignedTo',
            otherVertexType: Task,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): AccountRole {
        return ModelUtils.deserializeVertex<AccountRole>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: AccountRole) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            TasksAssigned: model.TasksAssigned,
            DateCreated: model.DateCreated,
            DisplayName: model.DisplayName,
            Initials: model.Initials,
            NoOfUsers: model.NoOfUsers,
            NoOfActiveUsers: model.NoOfActiveUsers,
            DeliveredBy: ModelUtils.serializeShallowEdge(model.DeliveredBy(), 'DeliveredBy'),
            HasMembers: ModelUtils.serializeShallowEdge(model.HasMembers(), 'HasMembers'),
            Services: ModelUtils.serializeShallowEdge(model.Services(), 'Services'),
            Assignee: ModelUtils.serializeShallowEdge(model.Assignee(), 'Assignee'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): AccountRole {
        let clone = new AccountRole();
        clone.data = _.cloneDeep(this.data);
        clone._DeliveredBy = _.cloneDeep(this._DeliveredBy);
        clone._HasMembers = _.cloneDeep(this._HasMembers);
        clone._Services = _.cloneDeep(this._Services);
        clone._Assignee = _.cloneDeep(this._Assignee);

        //clone.Context = this.Context;
        return clone;
    }
}

export class AuditableAccountActivity extends AccountActivity {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "AuditableAccountActivity";
    }

    // Properties
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


    deserialize(input: Object, datacontext): AuditableAccountActivity {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: AuditableAccountActivity) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CorrelationKey: model.CorrelationKey,
            Version: model.Version,
            ReplacedByVersion: model.ReplacedByVersion,
            UpdatedTime: model.UpdatedTime,
            UpdatedByIdentity: model.UpdatedByIdentity,
            DeletedByIdentity: model.DeletedByIdentity,
            DeletedDate: model.DeletedDate,
            Id: model.Id,
            Action: model.Action,
            EntityType: model.EntityType,
            EntityId: model.EntityId,
            EntityCorrelationKey: model.EntityCorrelationKey,
            IdentityKey: model.IdentityKey,
            DeletedBy: model.DeletedBy,
            ActivityTime: model.ActivityTime,
            Message: model.Message,
            Tags: model.Tags,
            AccountId: model.AccountId,
            AffectedUsers: model.AffectedUsers,
            AlsoAppliesToIds: model.AlsoAppliesToIds,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): AuditableAccountActivity {
        let clone = new AuditableAccountActivity();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IDataPointDate {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly DataType: string,
    readonly Name: string,
    readonly Description?: string,
    readonly Optional: boolean,
    readonly RegExPattern?: string,
    ValidationType: string,
    Options?: string[],
    ValidationScript?: string,
    Tag?: string,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    readonly DataStoreId: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly RepeatableAncestors?: string[],
    readonly RepeatablePath?: any[],
    readonly RepeatablePathWasCalculated?: boolean,
    MinDate?: ContractDate,
    MaxDate?: ContractDate,

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    IsMappingFor?: object[],
    ParameterSubstitutedBy?: object[],
    MapsTo?: object[]

}

export class DataPointDate extends DataPoint {
    get Domain(): string {
        return "Area";
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
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: CorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: Correspondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointDate {
        return ModelUtils.deserializeVertex<DataPointDate>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointDate) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            Options: model.Options,
            ValidationScript: model.ValidationScript,
            Tag: model.Tag,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            DataStoreId: model.DataStoreId,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            RepeatableAncestors: model.RepeatableAncestors,
            RepeatablePath: model.RepeatablePath,
            RepeatablePathWasCalculated: model.RepeatablePathWasCalculated,
            MinDate: ModelUtils.serializeContractDate(model.data.MinDate),
            MaxDate: ModelUtils.serializeContractDate(model.data.MaxDate),
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
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
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointDecimal {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly DataType: string,
    readonly Name: string,
    readonly Description?: string,
    readonly Optional: boolean,
    readonly RegExPattern?: string,
    ValidationType: string,
    Options?: string[],
    ValidationScript?: string,
    Tag?: string,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    readonly DataStoreId: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly RepeatableAncestors?: string[],
    readonly RepeatablePath?: any[],
    readonly RepeatablePathWasCalculated?: boolean,
    MinValue?: number,
    MaxValue?: number,
    Places?: number,

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    IsMappingFor?: object[],
    ParameterSubstitutedBy?: object[],
    MapsTo?: object[]

}

export class DataPointDecimal extends DataPoint {
    get Domain(): string {
        return "Area";
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
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: CorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: Correspondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointDecimal {
        return ModelUtils.deserializeVertex<DataPointDecimal>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointDecimal) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            Options: model.Options,
            ValidationScript: model.ValidationScript,
            Tag: model.Tag,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            DataStoreId: model.DataStoreId,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            RepeatableAncestors: model.RepeatableAncestors,
            RepeatablePath: model.RepeatablePath,
            RepeatablePathWasCalculated: model.RepeatablePathWasCalculated,
            MinValue: model.MinValue,
            MaxValue: model.MaxValue,
            Places: model.Places,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
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
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointInteger {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly DataType: string,
    readonly Name: string,
    readonly Description?: string,
    readonly Optional: boolean,
    readonly RegExPattern?: string,
    ValidationType: string,
    Options?: string[],
    ValidationScript?: string,
    Tag?: string,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    readonly DataStoreId: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly RepeatableAncestors?: string[],
    readonly RepeatablePath?: any[],
    readonly RepeatablePathWasCalculated?: boolean,
    MinValue?: number,
    MaxValue?: number,

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    IsMappingFor?: object[],
    ParameterSubstitutedBy?: object[],
    MapsTo?: object[]

}

export class DataPointInteger extends DataPoint {
    get Domain(): string {
        return "Area";
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
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: CorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: Correspondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointInteger {
        return ModelUtils.deserializeVertex<DataPointInteger>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointInteger) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            Options: model.Options,
            ValidationScript: model.ValidationScript,
            Tag: model.Tag,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            DataStoreId: model.DataStoreId,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            RepeatableAncestors: model.RepeatableAncestors,
            RepeatablePath: model.RepeatablePath,
            RepeatablePathWasCalculated: model.RepeatablePathWasCalculated,
            MinValue: model.MinValue,
            MaxValue: model.MaxValue,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
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
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointListOfStrings {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly DataType: string,
    readonly Name: string,
    readonly Description?: string,
    readonly Optional: boolean,
    readonly RegExPattern?: string,
    ValidationType: string,
    Options?: string[],
    ValidationScript?: string,
    Tag?: string,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    readonly DataStoreId: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly RepeatableAncestors?: string[],
    readonly RepeatablePath?: any[],
    readonly RepeatablePathWasCalculated?: boolean,
    AllowSpaces?: boolean,

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    IsMappingFor?: object[],
    ParameterSubstitutedBy?: object[],
    MapsTo?: object[]

}

export class DataPointListOfStrings extends DataPoint {
    get Domain(): string {
        return "Area";
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
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: CorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: Correspondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointListOfStrings {
        return ModelUtils.deserializeVertex<DataPointListOfStrings>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointListOfStrings) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            Options: model.Options,
            ValidationScript: model.ValidationScript,
            Tag: model.Tag,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            DataStoreId: model.DataStoreId,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            RepeatableAncestors: model.RepeatableAncestors,
            RepeatablePath: model.RepeatablePath,
            RepeatablePathWasCalculated: model.RepeatablePathWasCalculated,
            AllowSpaces: model.AllowSpaces,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
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
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointString {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly DataType: string,
    readonly Name: string,
    readonly Description?: string,
    readonly Optional: boolean,
    readonly RegExPattern?: string,
    ValidationType: string,
    Options?: string[],
    ValidationScript?: string,
    Tag?: string,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    readonly DataStoreId: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly RepeatableAncestors?: string[],
    readonly RepeatablePath?: any[],
    readonly RepeatablePathWasCalculated?: boolean,
    MinLength?: number,
    MaxLength?: number,
    MultiLineEntry?: boolean,

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    IsMappingFor?: object[],
    ParameterSubstitutedBy?: object[],
    MapsTo?: object[]

}

export class DataPointString extends DataPoint {
    get Domain(): string {
        return "Area";
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
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: CorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: Correspondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointString {
        return ModelUtils.deserializeVertex<DataPointString>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointString) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            Options: model.Options,
            ValidationScript: model.ValidationScript,
            Tag: model.Tag,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            DataStoreId: model.DataStoreId,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            RepeatableAncestors: model.RepeatableAncestors,
            RepeatablePath: model.RepeatablePath,
            RepeatablePathWasCalculated: model.RepeatablePathWasCalculated,
            MinLength: model.MinLength,
            MaxLength: model.MaxLength,
            MultiLineEntry: model.MultiLineEntry,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
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
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointTimestamp {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly DataType: string,
    readonly Name: string,
    readonly Description?: string,
    readonly Optional: boolean,
    readonly RegExPattern?: string,
    ValidationType: string,
    Options?: string[],
    ValidationScript?: string,
    Tag?: string,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    readonly DataStoreId: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly RepeatableAncestors?: string[],
    readonly RepeatablePath?: any[],
    readonly RepeatablePathWasCalculated?: boolean,
    MinDate?: Date,
    MaxDate?: Date,

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    IsMappingFor?: object[],
    ParameterSubstitutedBy?: object[],
    MapsTo?: object[]

}

export class DataPointTimestamp extends DataPoint {
    get Domain(): string {
        return "Area";
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
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: CorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: Correspondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointTimestamp {
        return ModelUtils.deserializeVertex<DataPointTimestamp>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointTimestamp) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            Options: model.Options,
            ValidationScript: model.ValidationScript,
            Tag: model.Tag,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            DataStoreId: model.DataStoreId,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            RepeatableAncestors: model.RepeatableAncestors,
            RepeatablePath: model.RepeatablePath,
            RepeatablePathWasCalculated: model.RepeatablePathWasCalculated,
            MinDate: model.MinDate,
            MaxDate: model.MaxDate,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
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
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointUrl {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly DataType: string,
    readonly Name: string,
    readonly Description?: string,
    readonly Optional: boolean,
    readonly RegExPattern?: string,
    ValidationType: string,
    Options?: string[],
    ValidationScript?: string,
    Tag?: string,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    readonly DataStoreId: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly RepeatableAncestors?: string[],
    readonly RepeatablePath?: any[],
    readonly RepeatablePathWasCalculated?: boolean,

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    IsMappingFor?: object[],
    ParameterSubstitutedBy?: object[],
    MapsTo?: object[]

}

export class DataPointUrl extends DataPoint {
    get Domain(): string {
        return "Area";
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
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: CorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: Correspondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointUrl {
        return ModelUtils.deserializeVertex<DataPointUrl>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointUrl) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            Options: model.Options,
            ValidationScript: model.ValidationScript,
            Tag: model.Tag,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            DataStoreId: model.DataStoreId,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            RepeatableAncestors: model.RepeatableAncestors,
            RepeatablePath: model.RepeatablePath,
            RepeatablePathWasCalculated: model.RepeatablePathWasCalculated,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
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
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointZipcode {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly DataType: string,
    readonly Name: string,
    readonly Description?: string,
    readonly Optional: boolean,
    readonly RegExPattern?: string,
    ValidationType: string,
    Options?: string[],
    ValidationScript?: string,
    Tag?: string,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    readonly DataStoreId: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly RepeatableAncestors?: string[],
    readonly RepeatablePath?: any[],
    readonly RepeatablePathWasCalculated?: boolean,

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    IsMappingFor?: object[],
    ParameterSubstitutedBy?: object[],
    MapsTo?: object[]

}

export class DataPointZipcode extends DataPoint {
    get Domain(): string {
        return "Area";
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
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: CorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: Correspondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointZipcode {
        return ModelUtils.deserializeVertex<DataPointZipcode>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointZipcode) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            Options: model.Options,
            ValidationScript: model.ValidationScript,
            Tag: model.Tag,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            DataStoreId: model.DataStoreId,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            RepeatableAncestors: model.RepeatableAncestors,
            RepeatablePath: model.RepeatablePath,
            RepeatablePathWasCalculated: model.RepeatablePathWasCalculated,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
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
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDateField {
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly DisplayLabel?: string,
    readonly ShowHelp: boolean,
    readonly Help?: string,
    readonly ConditionMet: boolean,
    readonly ExternalId?: string,
    readonly ApplicationId: string,
    Content?: any,
    readonly Committed: boolean,
    readonly ContentType: string,
    readonly Optional: boolean,
    readonly DefaultContent?: any,
    readonly Access: string,
    readonly ValidationErrors?: string[],
    readonly DataChanged: boolean,
    readonly PreviousContent?: any,

    IsEnabledBy?: object[],
    IsContainedBy?: object[],
    Populates?: object[]

}

export class DateField extends Field {
    get Domain(): string {
        return "Area";
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
            propertyName: 'IsContainedBy',
            edgeType: SectionContainsElement,
            otherVertexPropertyName: 'Contains',
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
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            ApplicationId: model.ApplicationId,
            Content: model.Content,
            Committed: model.Committed,
            ContentType: model.ContentType,
            Optional: model.Optional,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            ValidationErrors: model.ValidationErrors,
            DataChanged: model.DataChanged,
            PreviousContent: model.PreviousContent,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DateField {
        let clone = new DateField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDecimalField {
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly DisplayLabel?: string,
    readonly ShowHelp: boolean,
    readonly Help?: string,
    readonly ConditionMet: boolean,
    readonly ExternalId?: string,
    readonly ApplicationId: string,
    Content?: any,
    readonly Committed: boolean,
    readonly ContentType: string,
    readonly Optional: boolean,
    readonly DefaultContent?: any,
    readonly Access: string,
    readonly ValidationErrors?: string[],
    readonly DataChanged: boolean,
    readonly PreviousContent?: any,

    IsEnabledBy?: object[],
    IsContainedBy?: object[],
    Populates?: object[]

}

export class DecimalField extends Field {
    get Domain(): string {
        return "Area";
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

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: SectionContainsElement,
            otherVertexPropertyName: 'Contains',
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
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            ApplicationId: model.ApplicationId,
            Content: model.Content,
            Committed: model.Committed,
            ContentType: model.ContentType,
            Optional: model.Optional,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            ValidationErrors: model.ValidationErrors,
            DataChanged: model.DataChanged,
            PreviousContent: model.PreviousContent,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): DecimalField {
        let clone = new DecimalField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IIntegerField {
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly DisplayLabel?: string,
    readonly ShowHelp: boolean,
    readonly Help?: string,
    readonly ConditionMet: boolean,
    readonly ExternalId?: string,
    readonly ApplicationId: string,
    Content?: any,
    readonly Committed: boolean,
    readonly ContentType: string,
    readonly Optional: boolean,
    readonly DefaultContent?: any,
    readonly Access: string,
    readonly ValidationErrors?: string[],
    readonly DataChanged: boolean,
    readonly PreviousContent?: any,

    IsEnabledBy?: object[],
    IsContainedBy?: object[],
    Populates?: object[]

}

export class IntegerField extends Field {
    get Domain(): string {
        return "Area";
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
            propertyName: 'IsContainedBy',
            edgeType: SectionContainsElement,
            otherVertexPropertyName: 'Contains',
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
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            ApplicationId: model.ApplicationId,
            Content: model.Content,
            Committed: model.Committed,
            ContentType: model.ContentType,
            Optional: model.Optional,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            ValidationErrors: model.ValidationErrors,
            DataChanged: model.DataChanged,
            PreviousContent: model.PreviousContent,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): IntegerField {
        let clone = new IntegerField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IListOfStringsField {
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly DisplayLabel?: string,
    readonly ShowHelp: boolean,
    readonly Help?: string,
    readonly ConditionMet: boolean,
    readonly ExternalId?: string,
    readonly ApplicationId: string,
    Content?: any,
    readonly Committed: boolean,
    readonly ContentType: string,
    readonly Optional: boolean,
    readonly DefaultContent?: any,
    readonly Access: string,
    readonly ValidationErrors?: string[],
    readonly DataChanged: boolean,
    readonly PreviousContent?: any,

    IsEnabledBy?: object[],
    IsContainedBy?: object[],
    Populates?: object[]

}

export class ListOfStringsField extends Field {
    get Domain(): string {
        return "Area";
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
            propertyName: 'IsContainedBy',
            edgeType: SectionContainsElement,
            otherVertexPropertyName: 'Contains',
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
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            ApplicationId: model.ApplicationId,
            Content: model.Content,
            Committed: model.Committed,
            ContentType: model.ContentType,
            Optional: model.Optional,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            ValidationErrors: model.ValidationErrors,
            DataChanged: model.DataChanged,
            PreviousContent: model.PreviousContent,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): ListOfStringsField {
        let clone = new ListOfStringsField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IMoneyField {
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly DisplayLabel?: string,
    readonly ShowHelp: boolean,
    readonly Help?: string,
    readonly ConditionMet: boolean,
    readonly ExternalId?: string,
    readonly ApplicationId: string,
    Content?: any,
    readonly Committed: boolean,
    readonly ContentType: string,
    readonly Optional: boolean,
    readonly DefaultContent?: any,
    readonly Access: string,
    readonly ValidationErrors?: string[],
    readonly DataChanged: boolean,
    readonly PreviousContent?: any,

    IsEnabledBy?: object[],
    IsContainedBy?: object[],
    Populates?: object[]

}

export class MoneyField extends Field {
    get Domain(): string {
        return "Area";
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

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: SectionContainsElement,
            otherVertexPropertyName: 'Contains',
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
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            ApplicationId: model.ApplicationId,
            Content: model.Content,
            Committed: model.Committed,
            ContentType: model.ContentType,
            Optional: model.Optional,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            ValidationErrors: model.ValidationErrors,
            DataChanged: model.DataChanged,
            PreviousContent: model.PreviousContent,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): MoneyField {
        let clone = new MoneyField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IRuleDateTime {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly DataType: string,
    readonly Name?: string,
    readonly Description?: string,
    readonly DecisionFunction?: string,
    readonly DecisionMatrixJson?: string,
    readonly Decision?: string,
    readonly TaskDefinitionKeys?: string[],
    readonly DateTime?: Date,
    readonly WorkflowSetId: string,

    IsMappingFor?: object[],
    IsContainedBy?: object[],
    IsEvaluatedFor?: object[],
    MapsTo?: object[]

}

export class RuleDateTime extends Rule {
    get Domain(): string {
        return "Area";
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
    get TaskDefinitionKeys(): string[] {
        return this.data.TaskDefinitionKeys;
    }
    get DateTime(): Date {
        return this.data.DateTime ? new Date(this.data.DateTime) : undefined;
    }
    get WorkflowSetId(): string {
        return this.data.WorkflowSetId;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: RuleSetContainsRule,
            otherVertexPropertyName: 'Contains',
            otherVertexType: RuleSet,
        },
        {
            propertyName: 'IsEvaluatedFor',
            edgeType: WorkflowEvaluatesRule,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: Workflow,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): RuleDateTime {
        return ModelUtils.deserializeVertex<RuleDateTime>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: RuleDateTime) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            DecisionFunction: model.DecisionFunction,
            DecisionMatrixJson: model.DecisionMatrixJson,
            Decision: model.Decision,
            TaskDefinitionKeys: model.TaskDefinitionKeys,
            DateTime: model.DateTime,
            WorkflowSetId: model.WorkflowSetId,
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsEvaluatedFor: ModelUtils.serializeShallowEdge(model.IsEvaluatedFor(), 'IsEvaluatedFor'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): RuleDateTime {
        let clone = new RuleDateTime();
        clone.data = _.cloneDeep(this.data);
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._IsEvaluatedFor = _.cloneDeep(this._IsEvaluatedFor);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IRuleProductSelection {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly DataType: string,
    readonly Name?: string,
    readonly Description?: string,
    readonly DecisionFunction?: string,
    readonly DecisionMatrixJson?: string,
    readonly Decision?: string,
    readonly ProductId: string,
    readonly Eligibility?: string,

    IsMappingFor?: object[],
    IsContainedBy?: object[],
    IsEvaluatedFor?: object[],
    MapsTo?: object[]

}

export class RuleProductSelection extends Rule {
    get Domain(): string {
        return "Area";
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
    get Eligibility(): string {
        return this.data.Eligibility;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: RuleSetContainsRule,
            otherVertexPropertyName: 'Contains',
            otherVertexType: RuleSet,
        },
        {
            propertyName: 'IsEvaluatedFor',
            edgeType: WorkflowEvaluatesRule,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: Workflow,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): RuleProductSelection {
        return ModelUtils.deserializeVertex<RuleProductSelection>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: RuleProductSelection) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            DecisionFunction: model.DecisionFunction,
            DecisionMatrixJson: model.DecisionMatrixJson,
            Decision: model.Decision,
            ProductId: model.ProductId,
            Eligibility: model.Eligibility,
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsEvaluatedFor: ModelUtils.serializeShallowEdge(model.IsEvaluatedFor(), 'IsEvaluatedFor'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): RuleProductSelection {
        let clone = new RuleProductSelection();
        clone.data = _.cloneDeep(this.data);
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._IsEvaluatedFor = _.cloneDeep(this._IsEvaluatedFor);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IRuleRiskAssessment {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly DataType: string,
    readonly Name?: string,
    readonly Description?: string,
    readonly DecisionFunction?: string,
    readonly DecisionMatrixJson?: string,
    readonly Decision?: string,
    readonly RiskScore?: number,

    IsMappingFor?: object[],
    IsContainedBy?: object[],
    IsEvaluatedFor?: object[],
    MapsTo?: object[]

}

export class RuleRiskAssessment extends Rule {
    get Domain(): string {
        return "Area";
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
    get RiskScore(): number {
        return this.data.RiskScore;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: RuleSetContainsRule,
            otherVertexPropertyName: 'Contains',
            otherVertexType: RuleSet,
        },
        {
            propertyName: 'IsEvaluatedFor',
            edgeType: WorkflowEvaluatesRule,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: Workflow,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): RuleRiskAssessment {
        return ModelUtils.deserializeVertex<RuleRiskAssessment>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: RuleRiskAssessment) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            DecisionFunction: model.DecisionFunction,
            DecisionMatrixJson: model.DecisionMatrixJson,
            Decision: model.Decision,
            RiskScore: model.RiskScore,
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsEvaluatedFor: ModelUtils.serializeShallowEdge(model.IsEvaluatedFor(), 'IsEvaluatedFor'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): RuleRiskAssessment {
        let clone = new RuleRiskAssessment();
        clone.data = _.cloneDeep(this.data);
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._IsEvaluatedFor = _.cloneDeep(this._IsEvaluatedFor);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IRuleRoleAssignment {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly DataType: string,
    readonly Name?: string,
    readonly Description?: string,
    readonly DecisionFunction?: string,
    readonly DecisionMatrixJson?: string,
    readonly Decision?: string,
    readonly AccountRoleDefinitionKey?: string,
    readonly Assignee?: string,

    IsMappingFor?: object[],
    IsContainedBy?: object[],
    IsEvaluatedFor?: object[],
    MapsTo?: object[]

}

export class RuleRoleAssignment extends Rule {
    get Domain(): string {
        return "Area";
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
    get AccountRoleDefinitionKey(): string {
        return this.data.AccountRoleDefinitionKey;
    }
    get Assignee(): string {
        return this.data.Assignee;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: RuleSetContainsRule,
            otherVertexPropertyName: 'Contains',
            otherVertexType: RuleSet,
        },
        {
            propertyName: 'IsEvaluatedFor',
            edgeType: WorkflowEvaluatesRule,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: Workflow,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): RuleRoleAssignment {
        return ModelUtils.deserializeVertex<RuleRoleAssignment>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: RuleRoleAssignment) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            DecisionFunction: model.DecisionFunction,
            DecisionMatrixJson: model.DecisionMatrixJson,
            Decision: model.Decision,
            AccountRoleDefinitionKey: model.AccountRoleDefinitionKey,
            Assignee: model.Assignee,
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsEvaluatedFor: ModelUtils.serializeShallowEdge(model.IsEvaluatedFor(), 'IsEvaluatedFor'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): RuleRoleAssignment {
        let clone = new RuleRoleAssignment();
        clone.data = _.cloneDeep(this.data);
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._IsEvaluatedFor = _.cloneDeep(this._IsEvaluatedFor);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IRuleTaskObligation {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly DataType: string,
    readonly Name?: string,
    readonly Description?: string,
    readonly DecisionFunction?: string,
    readonly DecisionMatrixJson?: string,
    readonly Decision?: string,
    readonly TaskDefinitionKeys?: string[],
    readonly Required?: boolean,

    IsMappingFor?: object[],
    IsContainedBy?: object[],
    IsEvaluatedFor?: object[],
    MapsTo?: object[]

}

export class RuleTaskObligation extends Rule {
    get Domain(): string {
        return "Area";
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
    get TaskDefinitionKeys(): string[] {
        return this.data.TaskDefinitionKeys;
    }
    get Required(): boolean {
        return this.data.Required;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: RuleSetContainsRule,
            otherVertexPropertyName: 'Contains',
            otherVertexType: RuleSet,
        },
        {
            propertyName: 'IsEvaluatedFor',
            edgeType: WorkflowEvaluatesRule,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: Workflow,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): RuleTaskObligation {
        return ModelUtils.deserializeVertex<RuleTaskObligation>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: RuleTaskObligation) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            DecisionFunction: model.DecisionFunction,
            DecisionMatrixJson: model.DecisionMatrixJson,
            Decision: model.Decision,
            TaskDefinitionKeys: model.TaskDefinitionKeys,
            Required: model.Required,
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsEvaluatedFor: ModelUtils.serializeShallowEdge(model.IsEvaluatedFor(), 'IsEvaluatedFor'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): RuleTaskObligation {
        let clone = new RuleTaskObligation();
        clone.data = _.cloneDeep(this.data);
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._IsEvaluatedFor = _.cloneDeep(this._IsEvaluatedFor);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IRuleWorkflowSetStatus {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly DataType: string,
    readonly Name?: string,
    readonly Description?: string,
    readonly DecisionFunction?: string,
    readonly DecisionMatrixJson?: string,
    readonly Decision?: string,

    IsMappingFor?: object[],
    IsContainedBy?: object[],
    IsEvaluatedFor?: object[],
    MapsTo?: object[]

}

export class RuleWorkflowSetStatus extends Rule {
    get Domain(): string {
        return "Area";
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

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: RuleSetContainsRule,
            otherVertexPropertyName: 'Contains',
            otherVertexType: RuleSet,
        },
        {
            propertyName: 'IsEvaluatedFor',
            edgeType: WorkflowEvaluatesRule,
            otherVertexPropertyName: 'Evaluates',
            otherVertexType: Workflow,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): RuleWorkflowSetStatus {
        return ModelUtils.deserializeVertex<RuleWorkflowSetStatus>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: RuleWorkflowSetStatus) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            DecisionFunction: model.DecisionFunction,
            DecisionMatrixJson: model.DecisionMatrixJson,
            Decision: model.Decision,
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsEvaluatedFor: ModelUtils.serializeShallowEdge(model.IsEvaluatedFor(), 'IsEvaluatedFor'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): RuleWorkflowSetStatus {
        let clone = new RuleWorkflowSetStatus();
        clone.data = _.cloneDeep(this.data);
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._IsEvaluatedFor = _.cloneDeep(this._IsEvaluatedFor);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IScriptTransform {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    readonly DataType: string,
    Id: string,
    readonly ScriptFunction?: string,

    IsContainedBy?: object[],
    IsMappingFor?: object[],
    MapsTo?: object[]

}

export class ScriptTransform extends Transform {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "ScriptTransform";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof ScriptTransform }[] = [

        ];
        return derivedTypes;
    }

    // Properties
    get ScriptFunction(): string {
        return this.data.ScriptFunction;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsContainedBy',
            edgeType: MapContainsTransform,
            otherVertexPropertyName: 'Contains',
            otherVertexType: Map,
        },
        {
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): ScriptTransform {
        return ModelUtils.deserializeVertex<ScriptTransform>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: ScriptTransform) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            DataType: model.DataType,
            Id: model.Id,
            ScriptFunction: model.ScriptFunction,
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): ScriptTransform {
        let clone = new ScriptTransform();
        clone.data = _.cloneDeep(this.data);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IStaticText {
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly DisplayLabel?: string,
    readonly ShowHelp: boolean,
    readonly Help?: string,
    readonly ConditionMet: boolean,
    readonly ExternalId?: string,
    readonly ApplicationId: string,
    StaticTextStyle: string

    IsEnabledBy?: object[],
    IsContainedBy?: object[]

}

export class StaticText extends StaticElement {
    get Domain(): string {
        return "Area";
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

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: SectionContainsElement,
            otherVertexPropertyName: 'Contains',
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
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            ApplicationId: model.ApplicationId,
            StaticTextStyle: model.StaticTextStyle,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): StaticText {
        let clone = new StaticText();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IStringField {
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly DisplayLabel?: string,
    readonly ShowHelp: boolean,
    readonly Help?: string,
    readonly ConditionMet: boolean,
    readonly ExternalId?: string,
    readonly ApplicationId: string,
    Content?: any,
    readonly Committed: boolean,
    readonly ContentType: string,
    readonly Optional: boolean,
    readonly DefaultContent?: any,
    readonly Access: string,
    readonly ValidationErrors?: string[],
    readonly DataChanged: boolean,
    readonly PreviousContent?: any,

    IsEnabledBy?: object[],
    IsContainedBy?: object[],
    Populates?: object[]

}

export class StringField extends Field {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "StringField";
    }
    static get DerivedTypes() {
        const derivedTypes: { className: string, type: typeof StringField }[] = [
            {className: 'EmailField', type: EmailField},
            {className: 'PhoneField', type: PhoneField},

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
            propertyName: 'IsContainedBy',
            edgeType: SectionContainsElement,
            otherVertexPropertyName: 'Contains',
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
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            ApplicationId: model.ApplicationId,
            Content: model.Content,
            Committed: model.Committed,
            ContentType: model.ContentType,
            Optional: model.Optional,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            ValidationErrors: model.ValidationErrors,
            DataChanged: model.DataChanged,
            PreviousContent: model.PreviousContent,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): StringField {
        let clone = new StringField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITaskApplication {
    readonly ProvisionStatus: string,
    readonly ProvisionStatusChanged: Date,
    readonly ProvisionErrorReasons?: string[],
    readonly ProvisionWaitingReasons?: string[],
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId?: string,
    readonly CreatedFromRevision?: string,
    Id: string,
    DueDate?: Date,
    readonly CompletionStatus: string,
    readonly AvailabilityStatus: string,
    readonly ObligationStatus: string,
    readonly DateStatusChanged: Date,
    readonly StatusChangedById?: string,
    readonly WaiveJournalEntryKey?: string,
    CompletingDependencies?: string[],
    CompletedDependencies?: string[],
    Name: string,
    Description: string,
    HowTo?: string,
    readonly DateLockedOrCompleted?: Date,
    readonly LockedOrCompletedByName?: string,
    readonly LockedOrCompletedById?: string,
    readonly RuleId?: string,
    readonly RuleDescription?: string,
    readonly InitiallyAssignedTo?: string,
    StartDate?: Date,
    readonly CreatedDate: Date,
    readonly ExecutionStatus: string,
    readonly ExecutionErrorReason?: string,
    readonly LastExecutedDate?: Date,
    readonly LastAvailableDate?: Date,
    readonly WorkflowId: string,
    readonly CreatedBy?: string,
    readonly DeadlineTriggerDefinitionId?: string,
    readonly Deadline?: Date,
    DeadlineImminentDate?: Date,
    readonly DeadlineTriggeredOn?: Date,
    SLATriggeredOn?: Date,
    SLATriggeredByWorkableId?: string,
    SLADueOn?: Date,
    SLAImminentDate?: Date,
    SLAVersionId?: string,
    SLAId?: string,
    readonly ManualDueDate?: Date,
    ManualDueDateImminentUnitOfTime?: string,
    ManualDueDateImminentValue?: number,
    ManualDueDateImminentDate?: Date,
    readonly ApplicationId?: string,
    readonly ApplicationDefinitionId: string,
    readonly ApplicationComplete: boolean,
    readonly DataChanged: boolean,

    IsSatisfiedBy?: object[],
    AssignedTo?: object[],
    IsRequiredFor?: object[],
    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    Enables?: object[]

}

export class TaskApplication extends Task {
    get Domain(): string {
        return "Area";
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
    get ApplicationId(): string {
        return this.data.ApplicationId;
    }
    get ApplicationDefinitionId(): string {
        return this.data.ApplicationDefinitionId;
    }
    get ApplicationComplete(): boolean {
        return this.data.ApplicationComplete;
    }
    get DataChanged(): boolean {
        return this.data.DataChanged;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsSatisfiedBy',
            edgeType: DocumentSatisfiesTask,
            otherVertexPropertyName: 'Satisfies',
            otherVertexType: Document,
        },
        {
            propertyName: 'AssignedTo',
            edgeType: AssignableAssignedTask,
            otherVertexPropertyName: 'Assignee',
            otherVertexType: Assignable,
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
            ProvisionStatus: model.ProvisionStatus,
            ProvisionStatusChanged: model.ProvisionStatusChanged,
            ProvisionErrorReasons: model.ProvisionErrorReasons,
            ProvisionWaitingReasons: model.ProvisionWaitingReasons,
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DueDate: model.DueDate,
            CompletionStatus: model.CompletionStatus,
            AvailabilityStatus: model.AvailabilityStatus,
            ObligationStatus: model.ObligationStatus,
            DateStatusChanged: model.DateStatusChanged,
            StatusChangedById: model.StatusChangedById,
            WaiveJournalEntryKey: model.WaiveJournalEntryKey,
            CompletingDependencies: model.CompletingDependencies,
            CompletedDependencies: model.CompletedDependencies,
            Name: model.Name,
            Description: model.Description,
            HowTo: model.HowTo,
            DateLockedOrCompleted: model.DateLockedOrCompleted,
            LockedOrCompletedByName: model.LockedOrCompletedByName,
            LockedOrCompletedById: model.LockedOrCompletedById,
            RuleId: model.RuleId,
            RuleDescription: model.RuleDescription,
            InitiallyAssignedTo: model.InitiallyAssignedTo,
            StartDate: model.StartDate,
            CreatedDate: model.CreatedDate,
            ExecutionStatus: model.ExecutionStatus,
            ExecutionErrorReason: model.ExecutionErrorReason,
            LastExecutedDate: model.LastExecutedDate,
            LastAvailableDate: model.LastAvailableDate,
            WorkflowId: model.WorkflowId,
            CreatedBy: model.CreatedBy,
            DeadlineTriggerDefinitionId: model.DeadlineTriggerDefinitionId,
            Deadline: model.Deadline,
            DeadlineImminentDate: model.DeadlineImminentDate,
            DeadlineTriggeredOn: model.DeadlineTriggeredOn,
            SLATriggeredOn: model.SLATriggeredOn,
            SLATriggeredByWorkableId: model.SLATriggeredByWorkableId,
            SLADueOn: model.SLADueOn,
            SLAImminentDate: model.SLAImminentDate,
            SLAVersionId: model.SLAVersionId,
            SLAId: model.SLAId,
            ManualDueDate: model.ManualDueDate,
            ManualDueDateImminentUnitOfTime: model.ManualDueDateImminentUnitOfTime,
            ManualDueDateImminentValue: model.ManualDueDateImminentValue,
            ManualDueDateImminentDate: model.ManualDueDateImminentDate,
            ApplicationId: model.ApplicationId,
            ApplicationDefinitionId: model.ApplicationDefinitionId,
            ApplicationComplete: model.ApplicationComplete,
            DataChanged: model.DataChanged,
            IsSatisfiedBy: ModelUtils.serializeShallowEdge(model.IsSatisfiedBy(), 'IsSatisfiedBy'),
            AssignedTo: ModelUtils.serializeShallowEdge(model.AssignedTo(), 'AssignedTo'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TaskApplication {
        let clone = new TaskApplication();
        clone.data = _.cloneDeep(this.data);
        clone._IsSatisfiedBy = _.cloneDeep(this._IsSatisfiedBy);
        clone._AssignedTo = _.cloneDeep(this._AssignedTo);
        clone._IsRequiredFor = _.cloneDeep(this._IsRequiredFor);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITaskApproval {
    readonly ProvisionStatus: string,
    readonly ProvisionStatusChanged: Date,
    readonly ProvisionErrorReasons?: string[],
    readonly ProvisionWaitingReasons?: string[],
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId?: string,
    readonly CreatedFromRevision?: string,
    Id: string,
    DueDate?: Date,
    readonly CompletionStatus: string,
    readonly AvailabilityStatus: string,
    readonly ObligationStatus: string,
    readonly DateStatusChanged: Date,
    readonly StatusChangedById?: string,
    readonly WaiveJournalEntryKey?: string,
    CompletingDependencies?: string[],
    CompletedDependencies?: string[],
    Name: string,
    Description: string,
    HowTo?: string,
    readonly DateLockedOrCompleted?: Date,
    readonly LockedOrCompletedByName?: string,
    readonly LockedOrCompletedById?: string,
    readonly RuleId?: string,
    readonly RuleDescription?: string,
    readonly InitiallyAssignedTo?: string,
    StartDate?: Date,
    readonly CreatedDate: Date,
    readonly ExecutionStatus: string,
    readonly ExecutionErrorReason?: string,
    readonly LastExecutedDate?: Date,
    readonly LastAvailableDate?: Date,
    readonly WorkflowId: string,
    readonly CreatedBy?: string,
    readonly DeadlineTriggerDefinitionId?: string,
    readonly Deadline?: Date,
    DeadlineImminentDate?: Date,
    readonly DeadlineTriggeredOn?: Date,
    SLATriggeredOn?: Date,
    SLATriggeredByWorkableId?: string,
    SLADueOn?: Date,
    SLAImminentDate?: Date,
    SLAVersionId?: string,
    SLAId?: string,
    readonly ManualDueDate?: Date,
    ManualDueDateImminentUnitOfTime?: string,
    ManualDueDateImminentValue?: number,
    ManualDueDateImminentDate?: Date,
    IsApproved?: boolean,
    RejectionType?: string,

    IsSatisfiedBy?: object[],
    AssignedTo?: object[],
    IsRequiredFor?: object[],
    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    Enables?: object[]

}

export class TaskApproval extends Task {
    get Domain(): string {
        return "Area";
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
    get IsApproved(): boolean {
        return this.data.IsApproved;
    }
    set IsApproved(value: boolean) {
        this.data.IsApproved = value;
    }
    get RejectionType(): string {
        return this.data.RejectionType;
    }
    set RejectionType(value: string) {
        this.data.RejectionType = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsSatisfiedBy',
            edgeType: DocumentSatisfiesTask,
            otherVertexPropertyName: 'Satisfies',
            otherVertexType: Document,
        },
        {
            propertyName: 'AssignedTo',
            edgeType: AssignableAssignedTask,
            otherVertexPropertyName: 'Assignee',
            otherVertexType: Assignable,
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
            ProvisionStatus: model.ProvisionStatus,
            ProvisionStatusChanged: model.ProvisionStatusChanged,
            ProvisionErrorReasons: model.ProvisionErrorReasons,
            ProvisionWaitingReasons: model.ProvisionWaitingReasons,
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DueDate: model.DueDate,
            CompletionStatus: model.CompletionStatus,
            AvailabilityStatus: model.AvailabilityStatus,
            ObligationStatus: model.ObligationStatus,
            DateStatusChanged: model.DateStatusChanged,
            StatusChangedById: model.StatusChangedById,
            WaiveJournalEntryKey: model.WaiveJournalEntryKey,
            CompletingDependencies: model.CompletingDependencies,
            CompletedDependencies: model.CompletedDependencies,
            Name: model.Name,
            Description: model.Description,
            HowTo: model.HowTo,
            DateLockedOrCompleted: model.DateLockedOrCompleted,
            LockedOrCompletedByName: model.LockedOrCompletedByName,
            LockedOrCompletedById: model.LockedOrCompletedById,
            RuleId: model.RuleId,
            RuleDescription: model.RuleDescription,
            InitiallyAssignedTo: model.InitiallyAssignedTo,
            StartDate: model.StartDate,
            CreatedDate: model.CreatedDate,
            ExecutionStatus: model.ExecutionStatus,
            ExecutionErrorReason: model.ExecutionErrorReason,
            LastExecutedDate: model.LastExecutedDate,
            LastAvailableDate: model.LastAvailableDate,
            WorkflowId: model.WorkflowId,
            CreatedBy: model.CreatedBy,
            DeadlineTriggerDefinitionId: model.DeadlineTriggerDefinitionId,
            Deadline: model.Deadline,
            DeadlineImminentDate: model.DeadlineImminentDate,
            DeadlineTriggeredOn: model.DeadlineTriggeredOn,
            SLATriggeredOn: model.SLATriggeredOn,
            SLATriggeredByWorkableId: model.SLATriggeredByWorkableId,
            SLADueOn: model.SLADueOn,
            SLAImminentDate: model.SLAImminentDate,
            SLAVersionId: model.SLAVersionId,
            SLAId: model.SLAId,
            ManualDueDate: model.ManualDueDate,
            ManualDueDateImminentUnitOfTime: model.ManualDueDateImminentUnitOfTime,
            ManualDueDateImminentValue: model.ManualDueDateImminentValue,
            ManualDueDateImminentDate: model.ManualDueDateImminentDate,
            IsApproved: model.IsApproved,
            RejectionType: model.RejectionType,
            IsSatisfiedBy: ModelUtils.serializeShallowEdge(model.IsSatisfiedBy(), 'IsSatisfiedBy'),
            AssignedTo: ModelUtils.serializeShallowEdge(model.AssignedTo(), 'AssignedTo'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TaskApproval {
        let clone = new TaskApproval();
        clone.data = _.cloneDeep(this.data);
        clone._IsSatisfiedBy = _.cloneDeep(this._IsSatisfiedBy);
        clone._AssignedTo = _.cloneDeep(this._AssignedTo);
        clone._IsRequiredFor = _.cloneDeep(this._IsRequiredFor);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITaskClearance {
    readonly ProvisionStatus: string,
    readonly ProvisionStatusChanged: Date,
    readonly ProvisionErrorReasons?: string[],
    readonly ProvisionWaitingReasons?: string[],
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId?: string,
    readonly CreatedFromRevision?: string,
    Id: string,
    DueDate?: Date,
    readonly CompletionStatus: string,
    readonly AvailabilityStatus: string,
    readonly ObligationStatus: string,
    readonly DateStatusChanged: Date,
    readonly StatusChangedById?: string,
    readonly WaiveJournalEntryKey?: string,
    CompletingDependencies?: string[],
    CompletedDependencies?: string[],
    Name: string,
    Description: string,
    HowTo?: string,
    readonly DateLockedOrCompleted?: Date,
    readonly LockedOrCompletedByName?: string,
    readonly LockedOrCompletedById?: string,
    readonly RuleId?: string,
    readonly RuleDescription?: string,
    readonly InitiallyAssignedTo?: string,
    StartDate?: Date,
    readonly CreatedDate: Date,
    readonly ExecutionStatus: string,
    readonly ExecutionErrorReason?: string,
    readonly LastExecutedDate?: Date,
    readonly LastAvailableDate?: Date,
    readonly WorkflowId: string,
    readonly CreatedBy?: string,
    readonly DeadlineTriggerDefinitionId?: string,
    readonly Deadline?: Date,
    DeadlineImminentDate?: Date,
    readonly DeadlineTriggeredOn?: Date,
    SLATriggeredOn?: Date,
    SLATriggeredByWorkableId?: string,
    SLADueOn?: Date,
    SLAImminentDate?: Date,
    SLAVersionId?: string,
    SLAId?: string,
    readonly ManualDueDate?: Date,
    ManualDueDateImminentUnitOfTime?: string,
    ManualDueDateImminentValue?: number,
    ManualDueDateImminentDate?: Date,
    readonly InsuredTag?: string,
    readonly ProducerTag?: string,
    readonly AgentTag?: string,
    readonly AgentAccountRoleDefinitionKey: string,
    readonly AgentAccountRoleId?: string,
    ClearanceResult?: string,
    AccountMatches?: string[],

    IsSatisfiedBy?: object[],
    AssignedTo?: object[],
    IsRequiredFor?: object[],
    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    Enables?: object[]

}

export class TaskClearance extends Task {
    get Domain(): string {
        return "Area";
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
    get ProducerTag(): string {
        return this.data.ProducerTag;
    }
    get AgentTag(): string {
        return this.data.AgentTag;
    }
    get AgentAccountRoleDefinitionKey(): string {
        return this.data.AgentAccountRoleDefinitionKey;
    }
    get AgentAccountRoleId(): string {
        return this.data.AgentAccountRoleId;
    }
    get ClearanceResult(): string {
        return this.data.ClearanceResult;
    }
    set ClearanceResult(value: string) {
        this.data.ClearanceResult = value;
    }
    get AccountMatches(): string[] {
        return this.data.AccountMatches;
    }
    set AccountMatches(value: string[]) {
        this.data.AccountMatches = value;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsSatisfiedBy',
            edgeType: DocumentSatisfiesTask,
            otherVertexPropertyName: 'Satisfies',
            otherVertexType: Document,
        },
        {
            propertyName: 'AssignedTo',
            edgeType: AssignableAssignedTask,
            otherVertexPropertyName: 'Assignee',
            otherVertexType: Assignable,
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
            ProvisionStatus: model.ProvisionStatus,
            ProvisionStatusChanged: model.ProvisionStatusChanged,
            ProvisionErrorReasons: model.ProvisionErrorReasons,
            ProvisionWaitingReasons: model.ProvisionWaitingReasons,
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DueDate: model.DueDate,
            CompletionStatus: model.CompletionStatus,
            AvailabilityStatus: model.AvailabilityStatus,
            ObligationStatus: model.ObligationStatus,
            DateStatusChanged: model.DateStatusChanged,
            StatusChangedById: model.StatusChangedById,
            WaiveJournalEntryKey: model.WaiveJournalEntryKey,
            CompletingDependencies: model.CompletingDependencies,
            CompletedDependencies: model.CompletedDependencies,
            Name: model.Name,
            Description: model.Description,
            HowTo: model.HowTo,
            DateLockedOrCompleted: model.DateLockedOrCompleted,
            LockedOrCompletedByName: model.LockedOrCompletedByName,
            LockedOrCompletedById: model.LockedOrCompletedById,
            RuleId: model.RuleId,
            RuleDescription: model.RuleDescription,
            InitiallyAssignedTo: model.InitiallyAssignedTo,
            StartDate: model.StartDate,
            CreatedDate: model.CreatedDate,
            ExecutionStatus: model.ExecutionStatus,
            ExecutionErrorReason: model.ExecutionErrorReason,
            LastExecutedDate: model.LastExecutedDate,
            LastAvailableDate: model.LastAvailableDate,
            WorkflowId: model.WorkflowId,
            CreatedBy: model.CreatedBy,
            DeadlineTriggerDefinitionId: model.DeadlineTriggerDefinitionId,
            Deadline: model.Deadline,
            DeadlineImminentDate: model.DeadlineImminentDate,
            DeadlineTriggeredOn: model.DeadlineTriggeredOn,
            SLATriggeredOn: model.SLATriggeredOn,
            SLATriggeredByWorkableId: model.SLATriggeredByWorkableId,
            SLADueOn: model.SLADueOn,
            SLAImminentDate: model.SLAImminentDate,
            SLAVersionId: model.SLAVersionId,
            SLAId: model.SLAId,
            ManualDueDate: model.ManualDueDate,
            ManualDueDateImminentUnitOfTime: model.ManualDueDateImminentUnitOfTime,
            ManualDueDateImminentValue: model.ManualDueDateImminentValue,
            ManualDueDateImminentDate: model.ManualDueDateImminentDate,
            InsuredTag: model.InsuredTag,
            ProducerTag: model.ProducerTag,
            AgentTag: model.AgentTag,
            AgentAccountRoleDefinitionKey: model.AgentAccountRoleDefinitionKey,
            AgentAccountRoleId: model.AgentAccountRoleId,
            ClearanceResult: model.ClearanceResult,
            AccountMatches: model.AccountMatches,
            IsSatisfiedBy: ModelUtils.serializeShallowEdge(model.IsSatisfiedBy(), 'IsSatisfiedBy'),
            AssignedTo: ModelUtils.serializeShallowEdge(model.AssignedTo(), 'AssignedTo'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TaskClearance {
        let clone = new TaskClearance();
        clone.data = _.cloneDeep(this.data);
        clone._IsSatisfiedBy = _.cloneDeep(this._IsSatisfiedBy);
        clone._AssignedTo = _.cloneDeep(this._AssignedTo);
        clone._IsRequiredFor = _.cloneDeep(this._IsRequiredFor);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITaskCorrespondence {
    readonly ProvisionStatus: string,
    readonly ProvisionStatusChanged: Date,
    readonly ProvisionErrorReasons?: string[],
    readonly ProvisionWaitingReasons?: string[],
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId?: string,
    readonly CreatedFromRevision?: string,
    Id: string,
    DueDate?: Date,
    readonly CompletionStatus: string,
    readonly AvailabilityStatus: string,
    readonly ObligationStatus: string,
    readonly DateStatusChanged: Date,
    readonly StatusChangedById?: string,
    readonly WaiveJournalEntryKey?: string,
    CompletingDependencies?: string[],
    CompletedDependencies?: string[],
    Name: string,
    Description: string,
    HowTo?: string,
    readonly DateLockedOrCompleted?: Date,
    readonly LockedOrCompletedByName?: string,
    readonly LockedOrCompletedById?: string,
    readonly RuleId?: string,
    readonly RuleDescription?: string,
    readonly InitiallyAssignedTo?: string,
    StartDate?: Date,
    readonly CreatedDate: Date,
    readonly ExecutionStatus: string,
    readonly ExecutionErrorReason?: string,
    readonly LastExecutedDate?: Date,
    readonly LastAvailableDate?: Date,
    readonly WorkflowId: string,
    readonly CreatedBy?: string,
    readonly DeadlineTriggerDefinitionId?: string,
    readonly Deadline?: Date,
    DeadlineImminentDate?: Date,
    readonly DeadlineTriggeredOn?: Date,
    SLATriggeredOn?: Date,
    SLATriggeredByWorkableId?: string,
    SLADueOn?: Date,
    SLAImminentDate?: Date,
    SLAVersionId?: string,
    SLAId?: string,
    readonly ManualDueDate?: Date,
    ManualDueDateImminentUnitOfTime?: string,
    ManualDueDateImminentValue?: number,
    ManualDueDateImminentDate?: Date,
    DefaultFrom?: string,
    CorrespondenceId?: string,

    RequestsDeliveryBy?: object[],
    IsSatisfiedBy?: object[],
    AssignedTo?: object[],
    IsRequiredFor?: object[],
    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    Enables?: object[]

}

export class TaskCorrespondence extends Task {
    get Domain(): string {
        return "Area";
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
    get DefaultFrom(): string {
        return this.data.DefaultFrom;
    }
    set DefaultFrom(value: string) {
        this.data.DefaultFrom = value;
    }
    get CorrespondenceId(): string {
        return this.data.CorrespondenceId;
    }
    set CorrespondenceId(value: string) {
        this.data.CorrespondenceId = value;
    }

    // Relationships

    // Relationship RequestsDeliveryBy, returns Correspondence CorrespondenceDeliveredForCorrespondenceTask[]
    private __RequestsDeliveryBy: CorrespondenceDeliveredForCorrespondenceTask[];
    RequestsDeliveryBy(_context?: BaseDataContext): CorrespondenceDeliveredForCorrespondenceTask[] {
        if (this.__RequestsDeliveryBy)
            return this.__RequestsDeliveryBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._RequestsDeliveryBy), (id) => context.get(id) as CorrespondenceDeliveredForCorrespondenceTask);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setRequestsDeliveryBy(values: CorrespondenceDeliveredForCorrespondenceTask[]) {
         if (this.Context != null)
             throw Error;

        this.__RequestsDeliveryBy = values;
     }
    get _RequestsDeliveryBy(): Set<string> {
        if (!this._relationships.has("RequestsDeliveryBy"))
            this._relationships.set("RequestsDeliveryBy", new Set<string>());

        return this._relationships.get("RequestsDeliveryBy");
    }
    set _RequestsDeliveryBy(values: Set<string>) {
        this._relationships.set("RequestsDeliveryBy", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'RequestsDeliveryBy',
            edgeType: CorrespondenceDeliveredForCorrespondenceTask,
            otherVertexPropertyName: 'DeliveredFor',
            otherVertexType: Correspondence,
        },
        {
            propertyName: 'IsSatisfiedBy',
            edgeType: DocumentSatisfiesTask,
            otherVertexPropertyName: 'Satisfies',
            otherVertexType: Document,
        },
        {
            propertyName: 'AssignedTo',
            edgeType: AssignableAssignedTask,
            otherVertexPropertyName: 'Assignee',
            otherVertexType: Assignable,
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
            ProvisionStatus: model.ProvisionStatus,
            ProvisionStatusChanged: model.ProvisionStatusChanged,
            ProvisionErrorReasons: model.ProvisionErrorReasons,
            ProvisionWaitingReasons: model.ProvisionWaitingReasons,
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DueDate: model.DueDate,
            CompletionStatus: model.CompletionStatus,
            AvailabilityStatus: model.AvailabilityStatus,
            ObligationStatus: model.ObligationStatus,
            DateStatusChanged: model.DateStatusChanged,
            StatusChangedById: model.StatusChangedById,
            WaiveJournalEntryKey: model.WaiveJournalEntryKey,
            CompletingDependencies: model.CompletingDependencies,
            CompletedDependencies: model.CompletedDependencies,
            Name: model.Name,
            Description: model.Description,
            HowTo: model.HowTo,
            DateLockedOrCompleted: model.DateLockedOrCompleted,
            LockedOrCompletedByName: model.LockedOrCompletedByName,
            LockedOrCompletedById: model.LockedOrCompletedById,
            RuleId: model.RuleId,
            RuleDescription: model.RuleDescription,
            InitiallyAssignedTo: model.InitiallyAssignedTo,
            StartDate: model.StartDate,
            CreatedDate: model.CreatedDate,
            ExecutionStatus: model.ExecutionStatus,
            ExecutionErrorReason: model.ExecutionErrorReason,
            LastExecutedDate: model.LastExecutedDate,
            LastAvailableDate: model.LastAvailableDate,
            WorkflowId: model.WorkflowId,
            CreatedBy: model.CreatedBy,
            DeadlineTriggerDefinitionId: model.DeadlineTriggerDefinitionId,
            Deadline: model.Deadline,
            DeadlineImminentDate: model.DeadlineImminentDate,
            DeadlineTriggeredOn: model.DeadlineTriggeredOn,
            SLATriggeredOn: model.SLATriggeredOn,
            SLATriggeredByWorkableId: model.SLATriggeredByWorkableId,
            SLADueOn: model.SLADueOn,
            SLAImminentDate: model.SLAImminentDate,
            SLAVersionId: model.SLAVersionId,
            SLAId: model.SLAId,
            ManualDueDate: model.ManualDueDate,
            ManualDueDateImminentUnitOfTime: model.ManualDueDateImminentUnitOfTime,
            ManualDueDateImminentValue: model.ManualDueDateImminentValue,
            ManualDueDateImminentDate: model.ManualDueDateImminentDate,
            DefaultFrom: model.DefaultFrom,
            CorrespondenceId: model.CorrespondenceId,
            RequestsDeliveryBy: ModelUtils.serializeShallowEdge(model.RequestsDeliveryBy(), 'RequestsDeliveryBy'),
            IsSatisfiedBy: ModelUtils.serializeShallowEdge(model.IsSatisfiedBy(), 'IsSatisfiedBy'),
            AssignedTo: ModelUtils.serializeShallowEdge(model.AssignedTo(), 'AssignedTo'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TaskCorrespondence {
        let clone = new TaskCorrespondence();
        clone.data = _.cloneDeep(this.data);
        clone._RequestsDeliveryBy = _.cloneDeep(this._RequestsDeliveryBy);
        clone._IsSatisfiedBy = _.cloneDeep(this._IsSatisfiedBy);
        clone._AssignedTo = _.cloneDeep(this._AssignedTo);
        clone._IsRequiredFor = _.cloneDeep(this._IsRequiredFor);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITaskDocumentGeneration {
    readonly ProvisionStatus: string,
    readonly ProvisionStatusChanged: Date,
    readonly ProvisionErrorReasons?: string[],
    readonly ProvisionWaitingReasons?: string[],
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId?: string,
    readonly CreatedFromRevision?: string,
    Id: string,
    DueDate?: Date,
    readonly CompletionStatus: string,
    readonly AvailabilityStatus: string,
    readonly ObligationStatus: string,
    readonly DateStatusChanged: Date,
    readonly StatusChangedById?: string,
    readonly WaiveJournalEntryKey?: string,
    CompletingDependencies?: string[],
    CompletedDependencies?: string[],
    Name: string,
    Description: string,
    HowTo?: string,
    readonly DateLockedOrCompleted?: Date,
    readonly LockedOrCompletedByName?: string,
    readonly LockedOrCompletedById?: string,
    readonly RuleId?: string,
    readonly RuleDescription?: string,
    readonly InitiallyAssignedTo?: string,
    StartDate?: Date,
    readonly CreatedDate: Date,
    readonly ExecutionStatus: string,
    readonly ExecutionErrorReason?: string,
    readonly LastExecutedDate?: Date,
    readonly LastAvailableDate?: Date,
    readonly WorkflowId: string,
    readonly CreatedBy?: string,
    readonly DeadlineTriggerDefinitionId?: string,
    readonly Deadline?: Date,
    DeadlineImminentDate?: Date,
    readonly DeadlineTriggeredOn?: Date,
    SLATriggeredOn?: Date,
    SLATriggeredByWorkableId?: string,
    SLADueOn?: Date,
    SLAImminentDate?: Date,
    SLAVersionId?: string,
    SLAId?: string,
    readonly ManualDueDate?: Date,
    ManualDueDateImminentUnitOfTime?: string,
    ManualDueDateImminentValue?: number,
    ManualDueDateImminentDate?: Date,
    readonly DocumentId?: string,
    readonly StorageId?: string,
    DocumentCategory?: string,
    readonly ReplaceExisting: boolean,
    readonly DefaultDocumentDescription?: string,
    Tags?: string[],

    IsSatisfiedBy?: object[],
    AssignedTo?: object[],
    IsRequiredFor?: object[],
    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    Enables?: object[]

}

export class TaskDocumentGeneration extends Task {
    get Domain(): string {
        return "Area";
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
    get DocumentId(): string {
        return this.data.DocumentId;
    }
    get StorageId(): string {
        return this.data.StorageId;
    }
    get DocumentCategory(): string {
        return this.data.DocumentCategory;
    }
    set DocumentCategory(value: string) {
        this.data.DocumentCategory = value;
    }
    get ReplaceExisting(): boolean {
        return this.data.ReplaceExisting;
    }
    get DefaultDocumentDescription(): string {
        return this.data.DefaultDocumentDescription;
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
            propertyName: 'IsSatisfiedBy',
            edgeType: DocumentSatisfiesTask,
            otherVertexPropertyName: 'Satisfies',
            otherVertexType: Document,
        },
        {
            propertyName: 'AssignedTo',
            edgeType: AssignableAssignedTask,
            otherVertexPropertyName: 'Assignee',
            otherVertexType: Assignable,
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
            ProvisionStatus: model.ProvisionStatus,
            ProvisionStatusChanged: model.ProvisionStatusChanged,
            ProvisionErrorReasons: model.ProvisionErrorReasons,
            ProvisionWaitingReasons: model.ProvisionWaitingReasons,
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DueDate: model.DueDate,
            CompletionStatus: model.CompletionStatus,
            AvailabilityStatus: model.AvailabilityStatus,
            ObligationStatus: model.ObligationStatus,
            DateStatusChanged: model.DateStatusChanged,
            StatusChangedById: model.StatusChangedById,
            WaiveJournalEntryKey: model.WaiveJournalEntryKey,
            CompletingDependencies: model.CompletingDependencies,
            CompletedDependencies: model.CompletedDependencies,
            Name: model.Name,
            Description: model.Description,
            HowTo: model.HowTo,
            DateLockedOrCompleted: model.DateLockedOrCompleted,
            LockedOrCompletedByName: model.LockedOrCompletedByName,
            LockedOrCompletedById: model.LockedOrCompletedById,
            RuleId: model.RuleId,
            RuleDescription: model.RuleDescription,
            InitiallyAssignedTo: model.InitiallyAssignedTo,
            StartDate: model.StartDate,
            CreatedDate: model.CreatedDate,
            ExecutionStatus: model.ExecutionStatus,
            ExecutionErrorReason: model.ExecutionErrorReason,
            LastExecutedDate: model.LastExecutedDate,
            LastAvailableDate: model.LastAvailableDate,
            WorkflowId: model.WorkflowId,
            CreatedBy: model.CreatedBy,
            DeadlineTriggerDefinitionId: model.DeadlineTriggerDefinitionId,
            Deadline: model.Deadline,
            DeadlineImminentDate: model.DeadlineImminentDate,
            DeadlineTriggeredOn: model.DeadlineTriggeredOn,
            SLATriggeredOn: model.SLATriggeredOn,
            SLATriggeredByWorkableId: model.SLATriggeredByWorkableId,
            SLADueOn: model.SLADueOn,
            SLAImminentDate: model.SLAImminentDate,
            SLAVersionId: model.SLAVersionId,
            SLAId: model.SLAId,
            ManualDueDate: model.ManualDueDate,
            ManualDueDateImminentUnitOfTime: model.ManualDueDateImminentUnitOfTime,
            ManualDueDateImminentValue: model.ManualDueDateImminentValue,
            ManualDueDateImminentDate: model.ManualDueDateImminentDate,
            DocumentId: model.DocumentId,
            StorageId: model.StorageId,
            DocumentCategory: model.DocumentCategory,
            ReplaceExisting: model.ReplaceExisting,
            DefaultDocumentDescription: model.DefaultDocumentDescription,
            Tags: model.Tags,
            IsSatisfiedBy: ModelUtils.serializeShallowEdge(model.IsSatisfiedBy(), 'IsSatisfiedBy'),
            AssignedTo: ModelUtils.serializeShallowEdge(model.AssignedTo(), 'AssignedTo'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TaskDocumentGeneration {
        let clone = new TaskDocumentGeneration();
        clone.data = _.cloneDeep(this.data);
        clone._IsSatisfiedBy = _.cloneDeep(this._IsSatisfiedBy);
        clone._AssignedTo = _.cloneDeep(this._AssignedTo);
        clone._IsRequiredFor = _.cloneDeep(this._IsRequiredFor);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITaskFileRequirement {
    readonly ProvisionStatus: string,
    readonly ProvisionStatusChanged: Date,
    readonly ProvisionErrorReasons?: string[],
    readonly ProvisionWaitingReasons?: string[],
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId?: string,
    readonly CreatedFromRevision?: string,
    Id: string,
    DueDate?: Date,
    readonly CompletionStatus: string,
    readonly AvailabilityStatus: string,
    readonly ObligationStatus: string,
    readonly DateStatusChanged: Date,
    readonly StatusChangedById?: string,
    readonly WaiveJournalEntryKey?: string,
    CompletingDependencies?: string[],
    CompletedDependencies?: string[],
    Name: string,
    Description: string,
    HowTo?: string,
    readonly DateLockedOrCompleted?: Date,
    readonly LockedOrCompletedByName?: string,
    readonly LockedOrCompletedById?: string,
    readonly RuleId?: string,
    readonly RuleDescription?: string,
    readonly InitiallyAssignedTo?: string,
    StartDate?: Date,
    readonly CreatedDate: Date,
    readonly ExecutionStatus: string,
    readonly ExecutionErrorReason?: string,
    readonly LastExecutedDate?: Date,
    readonly LastAvailableDate?: Date,
    readonly WorkflowId: string,
    readonly CreatedBy?: string,
    readonly DeadlineTriggerDefinitionId?: string,
    readonly Deadline?: Date,
    DeadlineImminentDate?: Date,
    readonly DeadlineTriggeredOn?: Date,
    SLATriggeredOn?: Date,
    SLATriggeredByWorkableId?: string,
    SLADueOn?: Date,
    SLAImminentDate?: Date,
    SLAVersionId?: string,
    SLAId?: string,
    readonly ManualDueDate?: Date,
    ManualDueDateImminentUnitOfTime?: string,
    ManualDueDateImminentValue?: number,
    ManualDueDateImminentDate?: Date,
    readonly RequiredCategoryId: string,
    readonly AcceptPreExistingDocument: boolean,
    readonly EnforceDocumentAge: boolean,
    readonly DocumentAgeValue?: number,
    readonly DocumentAgeUnit?: string,
    readonly DefaultTags?: string[],

    IsSatisfiedBy?: object[],
    AssignedTo?: object[],
    IsRequiredFor?: object[],
    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    Enables?: object[]

}

export class TaskFileRequirement extends Task {
    get Domain(): string {
        return "Area";
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
    get AcceptPreExistingDocument(): boolean {
        return this.data.AcceptPreExistingDocument;
    }
    get EnforceDocumentAge(): boolean {
        return this.data.EnforceDocumentAge;
    }
    get DocumentAgeValue(): number {
        return this.data.DocumentAgeValue;
    }
    get DocumentAgeUnit(): string {
        return this.data.DocumentAgeUnit;
    }
    get DefaultTags(): string[] {
        return this.data.DefaultTags;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsSatisfiedBy',
            edgeType: DocumentSatisfiesTask,
            otherVertexPropertyName: 'Satisfies',
            otherVertexType: Document,
        },
        {
            propertyName: 'AssignedTo',
            edgeType: AssignableAssignedTask,
            otherVertexPropertyName: 'Assignee',
            otherVertexType: Assignable,
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
            ProvisionStatus: model.ProvisionStatus,
            ProvisionStatusChanged: model.ProvisionStatusChanged,
            ProvisionErrorReasons: model.ProvisionErrorReasons,
            ProvisionWaitingReasons: model.ProvisionWaitingReasons,
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DueDate: model.DueDate,
            CompletionStatus: model.CompletionStatus,
            AvailabilityStatus: model.AvailabilityStatus,
            ObligationStatus: model.ObligationStatus,
            DateStatusChanged: model.DateStatusChanged,
            StatusChangedById: model.StatusChangedById,
            WaiveJournalEntryKey: model.WaiveJournalEntryKey,
            CompletingDependencies: model.CompletingDependencies,
            CompletedDependencies: model.CompletedDependencies,
            Name: model.Name,
            Description: model.Description,
            HowTo: model.HowTo,
            DateLockedOrCompleted: model.DateLockedOrCompleted,
            LockedOrCompletedByName: model.LockedOrCompletedByName,
            LockedOrCompletedById: model.LockedOrCompletedById,
            RuleId: model.RuleId,
            RuleDescription: model.RuleDescription,
            InitiallyAssignedTo: model.InitiallyAssignedTo,
            StartDate: model.StartDate,
            CreatedDate: model.CreatedDate,
            ExecutionStatus: model.ExecutionStatus,
            ExecutionErrorReason: model.ExecutionErrorReason,
            LastExecutedDate: model.LastExecutedDate,
            LastAvailableDate: model.LastAvailableDate,
            WorkflowId: model.WorkflowId,
            CreatedBy: model.CreatedBy,
            DeadlineTriggerDefinitionId: model.DeadlineTriggerDefinitionId,
            Deadline: model.Deadline,
            DeadlineImminentDate: model.DeadlineImminentDate,
            DeadlineTriggeredOn: model.DeadlineTriggeredOn,
            SLATriggeredOn: model.SLATriggeredOn,
            SLATriggeredByWorkableId: model.SLATriggeredByWorkableId,
            SLADueOn: model.SLADueOn,
            SLAImminentDate: model.SLAImminentDate,
            SLAVersionId: model.SLAVersionId,
            SLAId: model.SLAId,
            ManualDueDate: model.ManualDueDate,
            ManualDueDateImminentUnitOfTime: model.ManualDueDateImminentUnitOfTime,
            ManualDueDateImminentValue: model.ManualDueDateImminentValue,
            ManualDueDateImminentDate: model.ManualDueDateImminentDate,
            RequiredCategoryId: model.RequiredCategoryId,
            AcceptPreExistingDocument: model.AcceptPreExistingDocument,
            EnforceDocumentAge: model.EnforceDocumentAge,
            DocumentAgeValue: model.DocumentAgeValue,
            DocumentAgeUnit: model.DocumentAgeUnit,
            DefaultTags: model.DefaultTags,
            IsSatisfiedBy: ModelUtils.serializeShallowEdge(model.IsSatisfiedBy(), 'IsSatisfiedBy'),
            AssignedTo: ModelUtils.serializeShallowEdge(model.AssignedTo(), 'AssignedTo'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TaskFileRequirement {
        let clone = new TaskFileRequirement();
        clone.data = _.cloneDeep(this.data);
        clone._IsSatisfiedBy = _.cloneDeep(this._IsSatisfiedBy);
        clone._AssignedTo = _.cloneDeep(this._AssignedTo);
        clone._IsRequiredFor = _.cloneDeep(this._IsRequiredFor);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITaskManual {
    readonly ProvisionStatus: string,
    readonly ProvisionStatusChanged: Date,
    readonly ProvisionErrorReasons?: string[],
    readonly ProvisionWaitingReasons?: string[],
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId?: string,
    readonly CreatedFromRevision?: string,
    Id: string,
    DueDate?: Date,
    readonly CompletionStatus: string,
    readonly AvailabilityStatus: string,
    readonly ObligationStatus: string,
    readonly DateStatusChanged: Date,
    readonly StatusChangedById?: string,
    readonly WaiveJournalEntryKey?: string,
    CompletingDependencies?: string[],
    CompletedDependencies?: string[],
    Name: string,
    Description: string,
    HowTo?: string,
    readonly DateLockedOrCompleted?: Date,
    readonly LockedOrCompletedByName?: string,
    readonly LockedOrCompletedById?: string,
    readonly RuleId?: string,
    readonly RuleDescription?: string,
    readonly InitiallyAssignedTo?: string,
    StartDate?: Date,
    readonly CreatedDate: Date,
    readonly ExecutionStatus: string,
    readonly ExecutionErrorReason?: string,
    readonly LastExecutedDate?: Date,
    readonly LastAvailableDate?: Date,
    readonly WorkflowId: string,
    readonly CreatedBy?: string,
    readonly DeadlineTriggerDefinitionId?: string,
    readonly Deadline?: Date,
    DeadlineImminentDate?: Date,
    readonly DeadlineTriggeredOn?: Date,
    SLATriggeredOn?: Date,
    SLATriggeredByWorkableId?: string,
    SLADueOn?: Date,
    SLAImminentDate?: Date,
    SLAVersionId?: string,
    SLAId?: string,
    readonly ManualDueDate?: Date,
    ManualDueDateImminentUnitOfTime?: string,
    ManualDueDateImminentValue?: number,
    ManualDueDateImminentDate?: Date,

    IsSatisfiedBy?: object[],
    AssignedTo?: object[],
    IsRequiredFor?: object[],
    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    Enables?: object[]

}

export class TaskManual extends Task {
    get Domain(): string {
        return "Area";
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
            propertyName: 'IsSatisfiedBy',
            edgeType: DocumentSatisfiesTask,
            otherVertexPropertyName: 'Satisfies',
            otherVertexType: Document,
        },
        {
            propertyName: 'AssignedTo',
            edgeType: AssignableAssignedTask,
            otherVertexPropertyName: 'Assignee',
            otherVertexType: Assignable,
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
            ProvisionStatus: model.ProvisionStatus,
            ProvisionStatusChanged: model.ProvisionStatusChanged,
            ProvisionErrorReasons: model.ProvisionErrorReasons,
            ProvisionWaitingReasons: model.ProvisionWaitingReasons,
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DueDate: model.DueDate,
            CompletionStatus: model.CompletionStatus,
            AvailabilityStatus: model.AvailabilityStatus,
            ObligationStatus: model.ObligationStatus,
            DateStatusChanged: model.DateStatusChanged,
            StatusChangedById: model.StatusChangedById,
            WaiveJournalEntryKey: model.WaiveJournalEntryKey,
            CompletingDependencies: model.CompletingDependencies,
            CompletedDependencies: model.CompletedDependencies,
            Name: model.Name,
            Description: model.Description,
            HowTo: model.HowTo,
            DateLockedOrCompleted: model.DateLockedOrCompleted,
            LockedOrCompletedByName: model.LockedOrCompletedByName,
            LockedOrCompletedById: model.LockedOrCompletedById,
            RuleId: model.RuleId,
            RuleDescription: model.RuleDescription,
            InitiallyAssignedTo: model.InitiallyAssignedTo,
            StartDate: model.StartDate,
            CreatedDate: model.CreatedDate,
            ExecutionStatus: model.ExecutionStatus,
            ExecutionErrorReason: model.ExecutionErrorReason,
            LastExecutedDate: model.LastExecutedDate,
            LastAvailableDate: model.LastAvailableDate,
            WorkflowId: model.WorkflowId,
            CreatedBy: model.CreatedBy,
            DeadlineTriggerDefinitionId: model.DeadlineTriggerDefinitionId,
            Deadline: model.Deadline,
            DeadlineImminentDate: model.DeadlineImminentDate,
            DeadlineTriggeredOn: model.DeadlineTriggeredOn,
            SLATriggeredOn: model.SLATriggeredOn,
            SLATriggeredByWorkableId: model.SLATriggeredByWorkableId,
            SLADueOn: model.SLADueOn,
            SLAImminentDate: model.SLAImminentDate,
            SLAVersionId: model.SLAVersionId,
            SLAId: model.SLAId,
            ManualDueDate: model.ManualDueDate,
            ManualDueDateImminentUnitOfTime: model.ManualDueDateImminentUnitOfTime,
            ManualDueDateImminentValue: model.ManualDueDateImminentValue,
            ManualDueDateImminentDate: model.ManualDueDateImminentDate,
            IsSatisfiedBy: ModelUtils.serializeShallowEdge(model.IsSatisfiedBy(), 'IsSatisfiedBy'),
            AssignedTo: ModelUtils.serializeShallowEdge(model.AssignedTo(), 'AssignedTo'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TaskManual {
        let clone = new TaskManual();
        clone.data = _.cloneDeep(this.data);
        clone._IsSatisfiedBy = _.cloneDeep(this._IsSatisfiedBy);
        clone._AssignedTo = _.cloneDeep(this._AssignedTo);
        clone._IsRequiredFor = _.cloneDeep(this._IsRequiredFor);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITaskPolicyDates {
    readonly ProvisionStatus: string,
    readonly ProvisionStatusChanged: Date,
    readonly ProvisionErrorReasons?: string[],
    readonly ProvisionWaitingReasons?: string[],
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId?: string,
    readonly CreatedFromRevision?: string,
    Id: string,
    DueDate?: Date,
    readonly CompletionStatus: string,
    readonly AvailabilityStatus: string,
    readonly ObligationStatus: string,
    readonly DateStatusChanged: Date,
    readonly StatusChangedById?: string,
    readonly WaiveJournalEntryKey?: string,
    CompletingDependencies?: string[],
    CompletedDependencies?: string[],
    Name: string,
    Description: string,
    HowTo?: string,
    readonly DateLockedOrCompleted?: Date,
    readonly LockedOrCompletedByName?: string,
    readonly LockedOrCompletedById?: string,
    readonly RuleId?: string,
    readonly RuleDescription?: string,
    readonly InitiallyAssignedTo?: string,
    StartDate?: Date,
    readonly CreatedDate: Date,
    readonly ExecutionStatus: string,
    readonly ExecutionErrorReason?: string,
    readonly LastExecutedDate?: Date,
    readonly LastAvailableDate?: Date,
    readonly WorkflowId: string,
    readonly CreatedBy?: string,
    readonly DeadlineTriggerDefinitionId?: string,
    readonly Deadline?: Date,
    DeadlineImminentDate?: Date,
    readonly DeadlineTriggeredOn?: Date,
    SLATriggeredOn?: Date,
    SLATriggeredByWorkableId?: string,
    SLADueOn?: Date,
    SLAImminentDate?: Date,
    SLAVersionId?: string,
    SLAId?: string,
    readonly ManualDueDate?: Date,
    ManualDueDateImminentUnitOfTime?: string,
    ManualDueDateImminentValue?: number,
    ManualDueDateImminentDate?: Date,
    readonly AllowChangingEffectiveDates: boolean,
    readonly AllowChangingExpirationDates: boolean,

    IsSatisfiedBy?: object[],
    AssignedTo?: object[],
    IsRequiredFor?: object[],
    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    Enables?: object[]

}

export class TaskPolicyDates extends Task {
    get Domain(): string {
        return "Area";
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
    get AllowChangingExpirationDates(): boolean {
        return this.data.AllowChangingExpirationDates;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsSatisfiedBy',
            edgeType: DocumentSatisfiesTask,
            otherVertexPropertyName: 'Satisfies',
            otherVertexType: Document,
        },
        {
            propertyName: 'AssignedTo',
            edgeType: AssignableAssignedTask,
            otherVertexPropertyName: 'Assignee',
            otherVertexType: Assignable,
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
            ProvisionStatus: model.ProvisionStatus,
            ProvisionStatusChanged: model.ProvisionStatusChanged,
            ProvisionErrorReasons: model.ProvisionErrorReasons,
            ProvisionWaitingReasons: model.ProvisionWaitingReasons,
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DueDate: model.DueDate,
            CompletionStatus: model.CompletionStatus,
            AvailabilityStatus: model.AvailabilityStatus,
            ObligationStatus: model.ObligationStatus,
            DateStatusChanged: model.DateStatusChanged,
            StatusChangedById: model.StatusChangedById,
            WaiveJournalEntryKey: model.WaiveJournalEntryKey,
            CompletingDependencies: model.CompletingDependencies,
            CompletedDependencies: model.CompletedDependencies,
            Name: model.Name,
            Description: model.Description,
            HowTo: model.HowTo,
            DateLockedOrCompleted: model.DateLockedOrCompleted,
            LockedOrCompletedByName: model.LockedOrCompletedByName,
            LockedOrCompletedById: model.LockedOrCompletedById,
            RuleId: model.RuleId,
            RuleDescription: model.RuleDescription,
            InitiallyAssignedTo: model.InitiallyAssignedTo,
            StartDate: model.StartDate,
            CreatedDate: model.CreatedDate,
            ExecutionStatus: model.ExecutionStatus,
            ExecutionErrorReason: model.ExecutionErrorReason,
            LastExecutedDate: model.LastExecutedDate,
            LastAvailableDate: model.LastAvailableDate,
            WorkflowId: model.WorkflowId,
            CreatedBy: model.CreatedBy,
            DeadlineTriggerDefinitionId: model.DeadlineTriggerDefinitionId,
            Deadline: model.Deadline,
            DeadlineImminentDate: model.DeadlineImminentDate,
            DeadlineTriggeredOn: model.DeadlineTriggeredOn,
            SLATriggeredOn: model.SLATriggeredOn,
            SLATriggeredByWorkableId: model.SLATriggeredByWorkableId,
            SLADueOn: model.SLADueOn,
            SLAImminentDate: model.SLAImminentDate,
            SLAVersionId: model.SLAVersionId,
            SLAId: model.SLAId,
            ManualDueDate: model.ManualDueDate,
            ManualDueDateImminentUnitOfTime: model.ManualDueDateImminentUnitOfTime,
            ManualDueDateImminentValue: model.ManualDueDateImminentValue,
            ManualDueDateImminentDate: model.ManualDueDateImminentDate,
            AllowChangingEffectiveDates: model.AllowChangingEffectiveDates,
            AllowChangingExpirationDates: model.AllowChangingExpirationDates,
            IsSatisfiedBy: ModelUtils.serializeShallowEdge(model.IsSatisfiedBy(), 'IsSatisfiedBy'),
            AssignedTo: ModelUtils.serializeShallowEdge(model.AssignedTo(), 'AssignedTo'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TaskPolicyDates {
        let clone = new TaskPolicyDates();
        clone.data = _.cloneDeep(this.data);
        clone._IsSatisfiedBy = _.cloneDeep(this._IsSatisfiedBy);
        clone._AssignedTo = _.cloneDeep(this._AssignedTo);
        clone._IsRequiredFor = _.cloneDeep(this._IsRequiredFor);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITaskProducts {
    readonly ProvisionStatus: string,
    readonly ProvisionStatusChanged: Date,
    readonly ProvisionErrorReasons?: string[],
    readonly ProvisionWaitingReasons?: string[],
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId?: string,
    readonly CreatedFromRevision?: string,
    Id: string,
    DueDate?: Date,
    readonly CompletionStatus: string,
    readonly AvailabilityStatus: string,
    readonly ObligationStatus: string,
    readonly DateStatusChanged: Date,
    readonly StatusChangedById?: string,
    readonly WaiveJournalEntryKey?: string,
    CompletingDependencies?: string[],
    CompletedDependencies?: string[],
    Name: string,
    Description: string,
    HowTo?: string,
    readonly DateLockedOrCompleted?: Date,
    readonly LockedOrCompletedByName?: string,
    readonly LockedOrCompletedById?: string,
    readonly RuleId?: string,
    readonly RuleDescription?: string,
    readonly InitiallyAssignedTo?: string,
    StartDate?: Date,
    readonly CreatedDate: Date,
    readonly ExecutionStatus: string,
    readonly ExecutionErrorReason?: string,
    readonly LastExecutedDate?: Date,
    readonly LastAvailableDate?: Date,
    readonly WorkflowId: string,
    readonly CreatedBy?: string,
    readonly DeadlineTriggerDefinitionId?: string,
    readonly Deadline?: Date,
    DeadlineImminentDate?: Date,
    readonly DeadlineTriggeredOn?: Date,
    SLATriggeredOn?: Date,
    SLATriggeredByWorkableId?: string,
    SLADueOn?: Date,
    SLAImminentDate?: Date,
    SLAVersionId?: string,
    SLAId?: string,
    readonly ManualDueDate?: Date,
    ManualDueDateImminentUnitOfTime?: string,
    ManualDueDateImminentValue?: number,
    ManualDueDateImminentDate?: Date,
    readonly AddType?: string,
    readonly AddTransactionId?: string,
    readonly AddAllOtherTransactionId?: string,
    readonly ModifyTransactionId?: string,
    readonly RemoveTransactionId?: string,
    readonly ProductEligibility?: { [index: string]: ActionEligibilityStatus },

    IsSatisfiedBy?: object[],
    AssignedTo?: object[],
    IsRequiredFor?: object[],
    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    Enables?: object[]

}

export class TaskProducts extends Task {
    get Domain(): string {
        return "Area";
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
    get AddTransactionId(): string {
        return this.data.AddTransactionId;
    }
    get AddAllOtherTransactionId(): string {
        return this.data.AddAllOtherTransactionId;
    }
    get ModifyTransactionId(): string {
        return this.data.ModifyTransactionId;
    }
    get RemoveTransactionId(): string {
        return this.data.RemoveTransactionId;
    }
    get ProductEligibility(): { [index: string]: ActionEligibilityStatus } {
        return this.data.ProductEligibility;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsSatisfiedBy',
            edgeType: DocumentSatisfiesTask,
            otherVertexPropertyName: 'Satisfies',
            otherVertexType: Document,
        },
        {
            propertyName: 'AssignedTo',
            edgeType: AssignableAssignedTask,
            otherVertexPropertyName: 'Assignee',
            otherVertexType: Assignable,
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
            ProvisionStatus: model.ProvisionStatus,
            ProvisionStatusChanged: model.ProvisionStatusChanged,
            ProvisionErrorReasons: model.ProvisionErrorReasons,
            ProvisionWaitingReasons: model.ProvisionWaitingReasons,
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DueDate: model.DueDate,
            CompletionStatus: model.CompletionStatus,
            AvailabilityStatus: model.AvailabilityStatus,
            ObligationStatus: model.ObligationStatus,
            DateStatusChanged: model.DateStatusChanged,
            StatusChangedById: model.StatusChangedById,
            WaiveJournalEntryKey: model.WaiveJournalEntryKey,
            CompletingDependencies: model.CompletingDependencies,
            CompletedDependencies: model.CompletedDependencies,
            Name: model.Name,
            Description: model.Description,
            HowTo: model.HowTo,
            DateLockedOrCompleted: model.DateLockedOrCompleted,
            LockedOrCompletedByName: model.LockedOrCompletedByName,
            LockedOrCompletedById: model.LockedOrCompletedById,
            RuleId: model.RuleId,
            RuleDescription: model.RuleDescription,
            InitiallyAssignedTo: model.InitiallyAssignedTo,
            StartDate: model.StartDate,
            CreatedDate: model.CreatedDate,
            ExecutionStatus: model.ExecutionStatus,
            ExecutionErrorReason: model.ExecutionErrorReason,
            LastExecutedDate: model.LastExecutedDate,
            LastAvailableDate: model.LastAvailableDate,
            WorkflowId: model.WorkflowId,
            CreatedBy: model.CreatedBy,
            DeadlineTriggerDefinitionId: model.DeadlineTriggerDefinitionId,
            Deadline: model.Deadline,
            DeadlineImminentDate: model.DeadlineImminentDate,
            DeadlineTriggeredOn: model.DeadlineTriggeredOn,
            SLATriggeredOn: model.SLATriggeredOn,
            SLATriggeredByWorkableId: model.SLATriggeredByWorkableId,
            SLADueOn: model.SLADueOn,
            SLAImminentDate: model.SLAImminentDate,
            SLAVersionId: model.SLAVersionId,
            SLAId: model.SLAId,
            ManualDueDate: model.ManualDueDate,
            ManualDueDateImminentUnitOfTime: model.ManualDueDateImminentUnitOfTime,
            ManualDueDateImminentValue: model.ManualDueDateImminentValue,
            ManualDueDateImminentDate: model.ManualDueDateImminentDate,
            AddType: model.AddType,
            AddTransactionId: model.AddTransactionId,
            AddAllOtherTransactionId: model.AddAllOtherTransactionId,
            ModifyTransactionId: model.ModifyTransactionId,
            RemoveTransactionId: model.RemoveTransactionId,
            ProductEligibility: model.ProductEligibility,
            IsSatisfiedBy: ModelUtils.serializeShallowEdge(model.IsSatisfiedBy(), 'IsSatisfiedBy'),
            AssignedTo: ModelUtils.serializeShallowEdge(model.AssignedTo(), 'AssignedTo'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TaskProducts {
        let clone = new TaskProducts();
        clone.data = _.cloneDeep(this.data);
        clone._IsSatisfiedBy = _.cloneDeep(this._IsSatisfiedBy);
        clone._AssignedTo = _.cloneDeep(this._AssignedTo);
        clone._IsRequiredFor = _.cloneDeep(this._IsRequiredFor);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITaskRatingSystem {
    readonly ProvisionStatus: string,
    readonly ProvisionStatusChanged: Date,
    readonly ProvisionErrorReasons?: string[],
    readonly ProvisionWaitingReasons?: string[],
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId?: string,
    readonly CreatedFromRevision?: string,
    Id: string,
    DueDate?: Date,
    readonly CompletionStatus: string,
    readonly AvailabilityStatus: string,
    readonly ObligationStatus: string,
    readonly DateStatusChanged: Date,
    readonly StatusChangedById?: string,
    readonly WaiveJournalEntryKey?: string,
    CompletingDependencies?: string[],
    CompletedDependencies?: string[],
    Name: string,
    Description: string,
    HowTo?: string,
    readonly DateLockedOrCompleted?: Date,
    readonly LockedOrCompletedByName?: string,
    readonly LockedOrCompletedById?: string,
    readonly RuleId?: string,
    readonly RuleDescription?: string,
    readonly InitiallyAssignedTo?: string,
    StartDate?: Date,
    readonly CreatedDate: Date,
    readonly ExecutionStatus: string,
    readonly ExecutionErrorReason?: string,
    readonly LastExecutedDate?: Date,
    readonly LastAvailableDate?: Date,
    readonly WorkflowId: string,
    readonly CreatedBy?: string,
    readonly DeadlineTriggerDefinitionId?: string,
    readonly Deadline?: Date,
    DeadlineImminentDate?: Date,
    readonly DeadlineTriggeredOn?: Date,
    SLATriggeredOn?: Date,
    SLATriggeredByWorkableId?: string,
    SLADueOn?: Date,
    SLAImminentDate?: Date,
    SLAVersionId?: string,
    SLAId?: string,
    readonly ManualDueDate?: Date,
    ManualDueDateImminentUnitOfTime?: string,
    ManualDueDateImminentValue?: number,
    ManualDueDateImminentDate?: Date,
    readonly Premium?: string,
    readonly Committed: boolean,
    readonly CommitOnSuccess?: boolean,
    readonly GetPaymentPlans: boolean,
    readonly GenerateWorksheets?: boolean,
    readonly WorksheetsCategory?: string,
    readonly WorksheetTags?: string[],
    readonly ReturnPolicyFormsList?: boolean,
    readonly GeneratePolicyForms?: boolean,
    readonly PolicyFormsCategory?: string,
    readonly PolicyFormsTags?: string[],
    readonly RatingResults: string,
    readonly PolicyRatedStatus?: string,
    readonly Commit?: string,
    readonly Worksheets?: string,
    readonly PolicyForms?: string,

    IsSatisfiedBy?: object[],
    AssignedTo?: object[],
    IsRequiredFor?: object[],
    IsTriggeredBy?: object[],
    WaitsFor?: object[],
    Triggers?: object[],
    Enables?: object[]

}

export class TaskRatingSystem extends Task {
    get Domain(): string {
        return "Area";
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
    get Premium(): string {
        return this.data.Premium;
    }
    get Committed(): boolean {
        return this.data.Committed;
    }
    get CommitOnSuccess(): boolean {
        return this.data.CommitOnSuccess;
    }
    get GetPaymentPlans(): boolean {
        return this.data.GetPaymentPlans;
    }
    get GenerateWorksheets(): boolean {
        return this.data.GenerateWorksheets;
    }
    get WorksheetsCategory(): string {
        return this.data.WorksheetsCategory;
    }
    get WorksheetTags(): string[] {
        return this.data.WorksheetTags;
    }
    get ReturnPolicyFormsList(): boolean {
        return this.data.ReturnPolicyFormsList;
    }
    get GeneratePolicyForms(): boolean {
        return this.data.GeneratePolicyForms;
    }
    get PolicyFormsCategory(): string {
        return this.data.PolicyFormsCategory;
    }
    get PolicyFormsTags(): string[] {
        return this.data.PolicyFormsTags;
    }
    get RatingResults(): string {
        return this.data.RatingResults;
    }
    get PolicyRatedStatus(): string {
        return this.data.PolicyRatedStatus;
    }
    get Commit(): string {
        return this.data.Commit;
    }
    get Worksheets(): string {
        return this.data.Worksheets;
    }
    get PolicyForms(): string {
        return this.data.PolicyForms;
    }

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsSatisfiedBy',
            edgeType: DocumentSatisfiesTask,
            otherVertexPropertyName: 'Satisfies',
            otherVertexType: Document,
        },
        {
            propertyName: 'AssignedTo',
            edgeType: AssignableAssignedTask,
            otherVertexPropertyName: 'Assignee',
            otherVertexType: Assignable,
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
            ProvisionStatus: model.ProvisionStatus,
            ProvisionStatusChanged: model.ProvisionStatusChanged,
            ProvisionErrorReasons: model.ProvisionErrorReasons,
            ProvisionWaitingReasons: model.ProvisionWaitingReasons,
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DueDate: model.DueDate,
            CompletionStatus: model.CompletionStatus,
            AvailabilityStatus: model.AvailabilityStatus,
            ObligationStatus: model.ObligationStatus,
            DateStatusChanged: model.DateStatusChanged,
            StatusChangedById: model.StatusChangedById,
            WaiveJournalEntryKey: model.WaiveJournalEntryKey,
            CompletingDependencies: model.CompletingDependencies,
            CompletedDependencies: model.CompletedDependencies,
            Name: model.Name,
            Description: model.Description,
            HowTo: model.HowTo,
            DateLockedOrCompleted: model.DateLockedOrCompleted,
            LockedOrCompletedByName: model.LockedOrCompletedByName,
            LockedOrCompletedById: model.LockedOrCompletedById,
            RuleId: model.RuleId,
            RuleDescription: model.RuleDescription,
            InitiallyAssignedTo: model.InitiallyAssignedTo,
            StartDate: model.StartDate,
            CreatedDate: model.CreatedDate,
            ExecutionStatus: model.ExecutionStatus,
            ExecutionErrorReason: model.ExecutionErrorReason,
            LastExecutedDate: model.LastExecutedDate,
            LastAvailableDate: model.LastAvailableDate,
            WorkflowId: model.WorkflowId,
            CreatedBy: model.CreatedBy,
            DeadlineTriggerDefinitionId: model.DeadlineTriggerDefinitionId,
            Deadline: model.Deadline,
            DeadlineImminentDate: model.DeadlineImminentDate,
            DeadlineTriggeredOn: model.DeadlineTriggeredOn,
            SLATriggeredOn: model.SLATriggeredOn,
            SLATriggeredByWorkableId: model.SLATriggeredByWorkableId,
            SLADueOn: model.SLADueOn,
            SLAImminentDate: model.SLAImminentDate,
            SLAVersionId: model.SLAVersionId,
            SLAId: model.SLAId,
            ManualDueDate: model.ManualDueDate,
            ManualDueDateImminentUnitOfTime: model.ManualDueDateImminentUnitOfTime,
            ManualDueDateImminentValue: model.ManualDueDateImminentValue,
            ManualDueDateImminentDate: model.ManualDueDateImminentDate,
            Premium: model.Premium,
            Committed: model.Committed,
            CommitOnSuccess: model.CommitOnSuccess,
            GetPaymentPlans: model.GetPaymentPlans,
            GenerateWorksheets: model.GenerateWorksheets,
            WorksheetsCategory: model.WorksheetsCategory,
            WorksheetTags: model.WorksheetTags,
            ReturnPolicyFormsList: model.ReturnPolicyFormsList,
            GeneratePolicyForms: model.GeneratePolicyForms,
            PolicyFormsCategory: model.PolicyFormsCategory,
            PolicyFormsTags: model.PolicyFormsTags,
            RatingResults: model.RatingResults,
            PolicyRatedStatus: model.PolicyRatedStatus,
            Commit: model.Commit,
            Worksheets: model.Worksheets,
            PolicyForms: model.PolicyForms,
            IsSatisfiedBy: ModelUtils.serializeShallowEdge(model.IsSatisfiedBy(), 'IsSatisfiedBy'),
            AssignedTo: ModelUtils.serializeShallowEdge(model.AssignedTo(), 'AssignedTo'),
            IsRequiredFor: ModelUtils.serializeShallowEdge(model.IsRequiredFor(), 'IsRequiredFor'),
            IsTriggeredBy: ModelUtils.serializeShallowEdge(model.IsTriggeredBy(), 'IsTriggeredBy'),
            WaitsFor: ModelUtils.serializeShallowEdge(model.WaitsFor(), 'WaitsFor'),
            Triggers: ModelUtils.serializeShallowEdge(model.Triggers(), 'Triggers'),
            Enables: ModelUtils.serializeShallowEdge(model.Enables(), 'Enables'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TaskRatingSystem {
        let clone = new TaskRatingSystem();
        clone.data = _.cloneDeep(this.data);
        clone._IsSatisfiedBy = _.cloneDeep(this._IsSatisfiedBy);
        clone._AssignedTo = _.cloneDeep(this._AssignedTo);
        clone._IsRequiredFor = _.cloneDeep(this._IsRequiredFor);
        clone._IsTriggeredBy = _.cloneDeep(this._IsTriggeredBy);
        clone._WaitsFor = _.cloneDeep(this._WaitsFor);
        clone._Triggers = _.cloneDeep(this._Triggers);
        clone._Enables = _.cloneDeep(this._Enables);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface ITimestampField {
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly DisplayLabel?: string,
    readonly ShowHelp: boolean,
    readonly Help?: string,
    readonly ConditionMet: boolean,
    readonly ExternalId?: string,
    readonly ApplicationId: string,
    Content?: any,
    readonly Committed: boolean,
    readonly ContentType: string,
    readonly Optional: boolean,
    readonly DefaultContent?: any,
    readonly Access: string,
    readonly ValidationErrors?: string[],
    readonly DataChanged: boolean,
    readonly PreviousContent?: any,

    IsEnabledBy?: object[],
    IsContainedBy?: object[],
    Populates?: object[]

}

export class TimestampField extends Field {
    get Domain(): string {
        return "Area";
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
            propertyName: 'IsContainedBy',
            edgeType: SectionContainsElement,
            otherVertexPropertyName: 'Contains',
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
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            ApplicationId: model.ApplicationId,
            Content: model.Content,
            Committed: model.Committed,
            ContentType: model.ContentType,
            Optional: model.Optional,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            ValidationErrors: model.ValidationErrors,
            DataChanged: model.DataChanged,
            PreviousContent: model.PreviousContent,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): TimestampField {
        let clone = new TimestampField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IUrlField {
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly DisplayLabel?: string,
    readonly ShowHelp: boolean,
    readonly Help?: string,
    readonly ConditionMet: boolean,
    readonly ExternalId?: string,
    readonly ApplicationId: string,
    Content?: any,
    readonly Committed: boolean,
    readonly ContentType: string,
    readonly Optional: boolean,
    readonly DefaultContent?: any,
    readonly Access: string,
    readonly ValidationErrors?: string[],
    readonly DataChanged: boolean,
    readonly PreviousContent?: any,

    IsEnabledBy?: object[],
    IsContainedBy?: object[],
    Populates?: object[]

}

export class UrlField extends Field {
    get Domain(): string {
        return "Area";
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

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: SectionContainsElement,
            otherVertexPropertyName: 'Contains',
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
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            ApplicationId: model.ApplicationId,
            Content: model.Content,
            Committed: model.Committed,
            ContentType: model.ContentType,
            Optional: model.Optional,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            ValidationErrors: model.ValidationErrors,
            DataChanged: model.DataChanged,
            PreviousContent: model.PreviousContent,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): UrlField {
        let clone = new UrlField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IWorkGroup {
    Id: string,
    TasksAssigned: number,
    readonly DateCreated?: Date,
    DisplayName: string,
    Initials: string,
    NoOfUsers: number,
    NoOfActiveUsers: number,
    ReservationTimeLimit?: number,
    Prioritization?: string,
    readonly NumUnreservedAccounts: number,
    readonly NumActiveWorkers: number,

    HasMembers?: object[],
    Assignee?: object[],
    Queues?: object[]

}

export class WorkGroup extends UserPool {
    get Domain(): string {
        return "Area";
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
    get NumUnreservedAccounts(): number {
        return this.data.NumUnreservedAccounts;
    }
    get NumActiveWorkers(): number {
        return this.data.NumActiveWorkers;
    }

    // Relationships

    // Relationship Queues, returns ReservationSet WorkGroupQueuesReservationSet[]
    private __Queues: WorkGroupQueuesReservationSet[];
    Queues(_context?: BaseDataContext): WorkGroupQueuesReservationSet[] {
        if (this.__Queues)
            return this.__Queues;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._Queues), (id) => context.get(id) as WorkGroupQueuesReservationSet);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setQueues(values: WorkGroupQueuesReservationSet[]) {
         if (this.Context != null)
             throw Error;

        this.__Queues = values;
     }
    get _Queues(): Set<string> {
        if (!this._relationships.has("Queues"))
            this._relationships.set("Queues", new Set<string>());

        return this._relationships.get("Queues");
    }
    set _Queues(values: Set<string>) {
        this._relationships.set("Queues", values);
    }


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'HasMembers',
            edgeType: SMIdentityMemberOfUserPool,
            otherVertexPropertyName: 'IsMemberOf',
            otherVertexType: SMIdentity,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'Assignee',
            edgeType: AssignableAssignedTask,
            otherVertexPropertyName: 'AssignedTo',
            otherVertexType: Task,
        },
        {
            propertyName: 'Queues',
            edgeType: WorkGroupQueuesReservationSet,
            otherVertexPropertyName: 'IsQueuedBy',
            otherVertexType: ReservationSet,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): WorkGroup {
        return ModelUtils.deserializeVertex<WorkGroup>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: WorkGroup) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            Id: model.Id,
            TasksAssigned: model.TasksAssigned,
            DateCreated: model.DateCreated,
            DisplayName: model.DisplayName,
            Initials: model.Initials,
            NoOfUsers: model.NoOfUsers,
            NoOfActiveUsers: model.NoOfActiveUsers,
            ReservationTimeLimit: model.ReservationTimeLimit,
            Prioritization: model.Prioritization,
            NumUnreservedAccounts: model.NumUnreservedAccounts,
            NumActiveWorkers: model.NumActiveWorkers,
            HasMembers: ModelUtils.serializeShallowEdge(model.HasMembers(), 'HasMembers'),
            Assignee: ModelUtils.serializeShallowEdge(model.Assignee(), 'Assignee'),
            Queues: ModelUtils.serializeShallowEdge(model.Queues(), 'Queues'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): WorkGroup {
        let clone = new WorkGroup();
        clone.data = _.cloneDeep(this.data);
        clone._HasMembers = _.cloneDeep(this._HasMembers);
        clone._Assignee = _.cloneDeep(this._Assignee);
        clone._Queues = _.cloneDeep(this._Queues);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IYesNoField {
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly DisplayLabel?: string,
    readonly ShowHelp: boolean,
    readonly Help?: string,
    readonly ConditionMet: boolean,
    readonly ExternalId?: string,
    readonly ApplicationId: string,
    Content?: any,
    readonly Committed: boolean,
    readonly ContentType: string,
    readonly Optional: boolean,
    readonly DefaultContent?: any,
    readonly Access: string,
    readonly ValidationErrors?: string[],
    readonly DataChanged: boolean,
    readonly PreviousContent?: any,

    IsEnabledBy?: object[],
    IsContainedBy?: object[],
    Populates?: object[]

}

export class YesNoField extends Field {
    get Domain(): string {
        return "Area";
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

    // Relationships


    public readonly inRelationships: EdgeRelationship[] = [
        {
            propertyName: 'IsEnabledBy',
            edgeType: ElementConditionEnablesElement,
            otherVertexPropertyName: 'Enables',
            otherVertexType: ElementCondition,
        },
        {
            propertyName: 'IsContainedBy',
            edgeType: SectionContainsElement,
            otherVertexPropertyName: 'Contains',
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
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            ApplicationId: model.ApplicationId,
            Content: model.Content,
            Committed: model.Committed,
            ContentType: model.ContentType,
            Optional: model.Optional,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            ValidationErrors: model.ValidationErrors,
            DataChanged: model.DataChanged,
            PreviousContent: model.PreviousContent,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): YesNoField {
        let clone = new YesNoField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IZipcodeField {
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly DisplayLabel?: string,
    readonly ShowHelp: boolean,
    readonly Help?: string,
    readonly ConditionMet: boolean,
    readonly ExternalId?: string,
    readonly ApplicationId: string,
    Content?: any,
    readonly Committed: boolean,
    readonly ContentType: string,
    readonly Optional: boolean,
    readonly DefaultContent?: any,
    readonly Access: string,
    readonly ValidationErrors?: string[],
    readonly DataChanged: boolean,
    readonly PreviousContent?: any,

    IsEnabledBy?: object[],
    IsContainedBy?: object[],
    Populates?: object[]

}

export class ZipcodeField extends Field {
    get Domain(): string {
        return "Area";
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
            propertyName: 'IsContainedBy',
            edgeType: SectionContainsElement,
            otherVertexPropertyName: 'Contains',
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
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            ApplicationId: model.ApplicationId,
            Content: model.Content,
            Committed: model.Committed,
            ContentType: model.ContentType,
            Optional: model.Optional,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            ValidationErrors: model.ValidationErrors,
            DataChanged: model.DataChanged,
            PreviousContent: model.PreviousContent,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): ZipcodeField {
        let clone = new ZipcodeField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export class AccountComment extends AuditableAccountActivity {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "AccountComment";
    }

    // Properties
    get TaskId(): string {
        return this.data.TaskId;
    }
    set TaskId(value: string) {
        this.data.TaskId = value;
    }
    get ActivityType(): string {
        return this.data.ActivityType;
    }
    set ActivityType(value: string) {
        this.data.ActivityType = value;
    }
    get WorkflowSetId(): string {
        return this.data.WorkflowSetId;
    }
    set WorkflowSetId(value: string) {
        this.data.WorkflowSetId = value;
    }


    deserialize(input: Object, datacontext): AccountComment {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: AccountComment) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CorrelationKey: model.CorrelationKey,
            Version: model.Version,
            ReplacedByVersion: model.ReplacedByVersion,
            UpdatedTime: model.UpdatedTime,
            UpdatedByIdentity: model.UpdatedByIdentity,
            DeletedByIdentity: model.DeletedByIdentity,
            DeletedDate: model.DeletedDate,
            Id: model.Id,
            Action: model.Action,
            EntityType: model.EntityType,
            EntityId: model.EntityId,
            EntityCorrelationKey: model.EntityCorrelationKey,
            IdentityKey: model.IdentityKey,
            DeletedBy: model.DeletedBy,
            ActivityTime: model.ActivityTime,
            Message: model.Message,
            Tags: model.Tags,
            AccountId: model.AccountId,
            AffectedUsers: model.AffectedUsers,
            AlsoAppliesToIds: model.AlsoAppliesToIds,
            TaskId: model.TaskId,
            ActivityType: model.ActivityType,
            WorkflowSetId: model.WorkflowSetId,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): AccountComment {
        let clone = new AccountComment();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export class AccountJournalEntry extends AuditableAccountActivity {
    get Domain(): string {
        return "Area";
    }
    get Type(): string {
        return "AccountJournalEntry";
    }

    // Properties
    get Subject(): string {
        return this.data.Subject;
    }
    set Subject(value: string) {
        this.data.Subject = value;
    }
    get ExternalCommunication(): boolean {
        return this.data.ExternalCommunication;
    }
    set ExternalCommunication(value: boolean) {
        this.data.ExternalCommunication = value;
    }


    deserialize(input: Object, datacontext): AccountJournalEntry {
        if (!input)
            return this;

        super._deserialize(input, datacontext);

        return this;
    }

    serialize(_model?: AccountJournalEntry) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CorrelationKey: model.CorrelationKey,
            Version: model.Version,
            ReplacedByVersion: model.ReplacedByVersion,
            UpdatedTime: model.UpdatedTime,
            UpdatedByIdentity: model.UpdatedByIdentity,
            DeletedByIdentity: model.DeletedByIdentity,
            DeletedDate: model.DeletedDate,
            Id: model.Id,
            Action: model.Action,
            EntityType: model.EntityType,
            EntityId: model.EntityId,
            EntityCorrelationKey: model.EntityCorrelationKey,
            IdentityKey: model.IdentityKey,
            DeletedBy: model.DeletedBy,
            ActivityTime: model.ActivityTime,
            Message: model.Message,
            Tags: model.Tags,
            AccountId: model.AccountId,
            AffectedUsers: model.AffectedUsers,
            AlsoAppliesToIds: model.AlsoAppliesToIds,
            Subject: model.Subject,
            ExternalCommunication: model.ExternalCommunication,
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): AccountJournalEntry {
        let clone = new AccountJournalEntry();
        clone.data = _.cloneDeep(this.data);

        //clone.Context = this.Context;
        return clone;
    }

}

export interface IDataPointEmail {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly DataType: string,
    readonly Name: string,
    readonly Description?: string,
    readonly Optional: boolean,
    readonly RegExPattern?: string,
    ValidationType: string,
    Options?: string[],
    ValidationScript?: string,
    Tag?: string,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    readonly DataStoreId: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly RepeatableAncestors?: string[],
    readonly RepeatablePath?: any[],
    readonly RepeatablePathWasCalculated?: boolean,
    MinLength?: number,
    MaxLength?: number,
    MultiLineEntry?: boolean,

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    IsMappingFor?: object[],
    DeliveredBy?: object[],
    ParameterSubstitutedBy?: object[],
    MapsTo?: object[]

}

export class DataPointEmail extends DataPointString {
    get Domain(): string {
        return "Area";
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

    // Relationship DeliveredBy, returns Correspondence CorrespondenceDeliversEmail[]
    private __DeliveredBy: CorrespondenceDeliversEmail[];
    DeliveredBy(_context?: BaseDataContext): CorrespondenceDeliversEmail[] {
        if (this.__DeliveredBy)
            return this.__DeliveredBy;
         else {
            const context = _context || this.Context;
            if(!context) return null;
            // convert set to array of edges
            var edges = _.map(Array.from(this._DeliveredBy), (id) => context.get(id) as CorrespondenceDeliversEmail);
            return _.filter(edges, e => { return !_.isNil(e); });
         }
     }
    setDeliveredBy(values: CorrespondenceDeliversEmail[]) {
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
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },
        {
            propertyName: 'DeliveredBy',
            edgeType: CorrespondenceDeliversEmail,
            otherVertexPropertyName: 'DeliversEmail',
            otherVertexType: Correspondence,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: CorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: Correspondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointEmail {
        return ModelUtils.deserializeVertex<DataPointEmail>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointEmail) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            Options: model.Options,
            ValidationScript: model.ValidationScript,
            Tag: model.Tag,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            DataStoreId: model.DataStoreId,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            RepeatableAncestors: model.RepeatableAncestors,
            RepeatablePath: model.RepeatablePath,
            RepeatablePathWasCalculated: model.RepeatablePathWasCalculated,
            MinLength: model.MinLength,
            MaxLength: model.MaxLength,
            MultiLineEntry: model.MultiLineEntry,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            DeliveredBy: ModelUtils.serializeShallowEdge(model.DeliveredBy(), 'DeliveredBy'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
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
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._DeliveredBy = _.cloneDeep(this._DeliveredBy);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointMoney {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly DataType: string,
    readonly Name: string,
    readonly Description?: string,
    readonly Optional: boolean,
    readonly RegExPattern?: string,
    ValidationType: string,
    Options?: string[],
    ValidationScript?: string,
    Tag?: string,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    readonly DataStoreId: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly RepeatableAncestors?: string[],
    readonly RepeatablePath?: any[],
    readonly RepeatablePathWasCalculated?: boolean,
    MinValue?: number,
    MaxValue?: number,
    Places?: number,

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    IsMappingFor?: object[],
    ParameterSubstitutedBy?: object[],
    MapsTo?: object[]

}

export class DataPointMoney extends DataPointDecimal {
    get Domain(): string {
        return "Area";
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
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: CorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: Correspondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointMoney {
        return ModelUtils.deserializeVertex<DataPointMoney>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointMoney) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            Options: model.Options,
            ValidationScript: model.ValidationScript,
            Tag: model.Tag,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            DataStoreId: model.DataStoreId,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            RepeatableAncestors: model.RepeatableAncestors,
            RepeatablePath: model.RepeatablePath,
            RepeatablePathWasCalculated: model.RepeatablePathWasCalculated,
            MinValue: model.MinValue,
            MaxValue: model.MaxValue,
            Places: model.Places,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
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
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointPhone {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly DataType: string,
    readonly Name: string,
    readonly Description?: string,
    readonly Optional: boolean,
    readonly RegExPattern?: string,
    ValidationType: string,
    Options?: string[],
    ValidationScript?: string,
    Tag?: string,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    readonly DataStoreId: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly RepeatableAncestors?: string[],
    readonly RepeatablePath?: any[],
    readonly RepeatablePathWasCalculated?: boolean,
    MinLength?: number,
    MaxLength?: number,
    MultiLineEntry?: boolean,

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    IsMappingFor?: object[],
    ParameterSubstitutedBy?: object[],
    MapsTo?: object[]

}

export class DataPointPhone extends DataPointString {
    get Domain(): string {
        return "Area";
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
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: CorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: Correspondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointPhone {
        return ModelUtils.deserializeVertex<DataPointPhone>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointPhone) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            Options: model.Options,
            ValidationScript: model.ValidationScript,
            Tag: model.Tag,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            DataStoreId: model.DataStoreId,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            RepeatableAncestors: model.RepeatableAncestors,
            RepeatablePath: model.RepeatablePath,
            RepeatablePathWasCalculated: model.RepeatablePathWasCalculated,
            MinLength: model.MinLength,
            MaxLength: model.MaxLength,
            MultiLineEntry: model.MultiLineEntry,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
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
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointYear {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly DataType: string,
    readonly Name: string,
    readonly Description?: string,
    readonly Optional: boolean,
    readonly RegExPattern?: string,
    ValidationType: string,
    Options?: string[],
    ValidationScript?: string,
    Tag?: string,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    readonly DataStoreId: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly RepeatableAncestors?: string[],
    readonly RepeatablePath?: any[],
    readonly RepeatablePathWasCalculated?: boolean,
    MinValue?: number,
    MaxValue?: number,

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    IsMappingFor?: object[],
    ParameterSubstitutedBy?: object[],
    MapsTo?: object[]

}

export class DataPointYear extends DataPointInteger {
    get Domain(): string {
        return "Area";
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
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: CorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: Correspondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointYear {
        return ModelUtils.deserializeVertex<DataPointYear>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointYear) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            Options: model.Options,
            ValidationScript: model.ValidationScript,
            Tag: model.Tag,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            DataStoreId: model.DataStoreId,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            RepeatableAncestors: model.RepeatableAncestors,
            RepeatablePath: model.RepeatablePath,
            RepeatablePathWasCalculated: model.RepeatablePathWasCalculated,
            MinValue: model.MinValue,
            MaxValue: model.MaxValue,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
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
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IDataPointYesNo {
    readonly CommittedEditions?: number[],
    readonly Content?: { [index: number]: { [index: string]: any } },
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly DataType: string,
    readonly Name: string,
    readonly Description?: string,
    readonly Optional: boolean,
    readonly RegExPattern?: string,
    ValidationType: string,
    Options?: string[],
    ValidationScript?: string,
    Tag?: string,
    ReferenceObject?: string,
    ReferenceProperty?: string,
    readonly DataStoreId: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly RepeatableAncestors?: string[],
    readonly RepeatablePath?: any[],
    readonly RepeatablePathWasCalculated?: boolean,
    MinLength?: number,
    MaxLength?: number,
    MultiLineEntry?: boolean,

    IsEvaluatedForCondition?: object[],
    IsPopulatedBy?: object[],
    IsContainedBy?: object[],
    IsMappingFor?: object[],
    ParameterSubstitutedBy?: object[],
    MapsTo?: object[]

}

export class DataPointYesNo extends DataPointString {
    get Domain(): string {
        return "Area";
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
            propertyName: 'IsMappingFor',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'MapsTo',
            otherVertexType: Mappable,
        },
        {
            propertyName: 'ParameterSubstitutedBy',
            edgeType: CorrespondenceParameterSubstitutesDataPoint,
            otherVertexPropertyName: 'ParameterSubstitutes',
            otherVertexType: Correspondence,
        },

    ];
    public readonly outRelationships: EdgeRelationship[] = [
        {
            propertyName: 'MapsTo',
            edgeType: SimpleMapping,
            otherVertexPropertyName: 'IsMappingFor',
            otherVertexType: Mappable,
        },

    ];

    deserialize(input: Object, datacontext: BaseDataContext): DataPointYesNo {
        return ModelUtils.deserializeVertex<DataPointYesNo>(this, input, datacontext, this.inRelationships, this.outRelationships, super._deserialize);
    }
    serialize(_model?: DataPointYesNo) {
        const model = _model || this;
        const ret = {
            ['@Type']: model.Type,
            CommittedEditions: model.CommittedEditions,
            Content: model.Content,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            DataType: model.DataType,
            Name: model.Name,
            Description: model.Description,
            Optional: model.Optional,
            RegExPattern: model.RegExPattern,
            ValidationType: model.ValidationType,
            Options: model.Options,
            ValidationScript: model.ValidationScript,
            Tag: model.Tag,
            ReferenceObject: model.ReferenceObject,
            ReferenceProperty: model.ReferenceProperty,
            DataStoreId: model.DataStoreId,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            RepeatableAncestors: model.RepeatableAncestors,
            RepeatablePath: model.RepeatablePath,
            RepeatablePathWasCalculated: model.RepeatablePathWasCalculated,
            MinLength: model.MinLength,
            MaxLength: model.MaxLength,
            MultiLineEntry: model.MultiLineEntry,
            IsEvaluatedForCondition: ModelUtils.serializeShallowEdge(model.IsEvaluatedForCondition(), 'IsEvaluatedForCondition'),
            IsPopulatedBy: ModelUtils.serializeShallowEdge(model.IsPopulatedBy(), 'IsPopulatedBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            IsMappingFor: ModelUtils.serializeShallowEdge(model.IsMappingFor(), 'IsMappingFor'),
            ParameterSubstitutedBy: ModelUtils.serializeShallowEdge(model.ParameterSubstitutedBy(), 'ParameterSubstitutedBy'),
            MapsTo: ModelUtils.serializeShallowEdge(model.MapsTo(), 'MapsTo'),
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
        clone._IsMappingFor = _.cloneDeep(this._IsMappingFor);
        clone._ParameterSubstitutedBy = _.cloneDeep(this._ParameterSubstitutedBy);
        clone._MapsTo = _.cloneDeep(this._MapsTo);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IEmailField {
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly DisplayLabel?: string,
    readonly ShowHelp: boolean,
    readonly Help?: string,
    readonly ConditionMet: boolean,
    readonly ExternalId?: string,
    readonly ApplicationId: string,
    Content?: any,
    readonly Committed: boolean,
    readonly ContentType: string,
    readonly Optional: boolean,
    readonly DefaultContent?: any,
    readonly Access: string,
    readonly ValidationErrors?: string[],
    readonly DataChanged: boolean,
    readonly PreviousContent?: any,

    IsEnabledBy?: object[],
    IsContainedBy?: object[],
    Populates?: object[]

}

export class EmailField extends StringField {
    get Domain(): string {
        return "Area";
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
            propertyName: 'IsContainedBy',
            edgeType: SectionContainsElement,
            otherVertexPropertyName: 'Contains',
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
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            ApplicationId: model.ApplicationId,
            Content: model.Content,
            Committed: model.Committed,
            ContentType: model.ContentType,
            Optional: model.Optional,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            ValidationErrors: model.ValidationErrors,
            DataChanged: model.DataChanged,
            PreviousContent: model.PreviousContent,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): EmailField {
        let clone = new EmailField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IPhoneField {
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly DisplayLabel?: string,
    readonly ShowHelp: boolean,
    readonly Help?: string,
    readonly ConditionMet: boolean,
    readonly ExternalId?: string,
    readonly ApplicationId: string,
    Content?: any,
    readonly Committed: boolean,
    readonly ContentType: string,
    readonly Optional: boolean,
    readonly DefaultContent?: any,
    readonly Access: string,
    readonly ValidationErrors?: string[],
    readonly DataChanged: boolean,
    readonly PreviousContent?: any,

    IsEnabledBy?: object[],
    IsContainedBy?: object[],
    Populates?: object[]

}

export class PhoneField extends StringField {
    get Domain(): string {
        return "Area";
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
            propertyName: 'IsContainedBy',
            edgeType: SectionContainsElement,
            otherVertexPropertyName: 'Contains',
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
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            ApplicationId: model.ApplicationId,
            Content: model.Content,
            Committed: model.Committed,
            ContentType: model.ContentType,
            Optional: model.Optional,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            ValidationErrors: model.ValidationErrors,
            DataChanged: model.DataChanged,
            PreviousContent: model.PreviousContent,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): PhoneField {
        let clone = new PhoneField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export interface IYearField {
    readonly CopiedFromId?: string,
    readonly OrderNum: number,
    readonly CreatedFromId: string,
    readonly CreatedFromRevision: string,
    Id: string,
    readonly WorkflowSetId: string,
    readonly ParentId: string,
    readonly DisplayLabel?: string,
    readonly ShowHelp: boolean,
    readonly Help?: string,
    readonly ConditionMet: boolean,
    readonly ExternalId?: string,
    readonly ApplicationId: string,
    Content?: any,
    readonly Committed: boolean,
    readonly ContentType: string,
    readonly Optional: boolean,
    readonly DefaultContent?: any,
    readonly Access: string,
    readonly ValidationErrors?: string[],
    readonly DataChanged: boolean,
    readonly PreviousContent?: any,

    IsEnabledBy?: object[],
    IsContainedBy?: object[],
    Populates?: object[]

}

export class YearField extends IntegerField {
    get Domain(): string {
        return "Area";
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
            propertyName: 'IsContainedBy',
            edgeType: SectionContainsElement,
            otherVertexPropertyName: 'Contains',
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
            CopiedFromId: model.CopiedFromId,
            OrderNum: model.OrderNum,
            CreatedFromId: model.CreatedFromId,
            CreatedFromRevision: model.CreatedFromRevision,
            Id: model.Id,
            WorkflowSetId: model.WorkflowSetId,
            ParentId: model.ParentId,
            DisplayLabel: model.DisplayLabel,
            ShowHelp: model.ShowHelp,
            Help: model.Help,
            ConditionMet: model.ConditionMet,
            ExternalId: model.ExternalId,
            ApplicationId: model.ApplicationId,
            Content: model.Content,
            Committed: model.Committed,
            ContentType: model.ContentType,
            Optional: model.Optional,
            DefaultContent: model.DefaultContent,
            Access: model.Access,
            ValidationErrors: model.ValidationErrors,
            DataChanged: model.DataChanged,
            PreviousContent: model.PreviousContent,
            IsEnabledBy: ModelUtils.serializeShallowEdge(model.IsEnabledBy(), 'IsEnabledBy'),
            IsContainedBy: ModelUtils.serializeShallowEdge(model.IsContainedBy(), 'IsContainedBy'),
            Populates: ModelUtils.serializeShallowEdge(model.Populates(), 'Populates'),
        };
        ModelUtils.removePropertiesSetToUndefined(ret);
        return ret;
    }

    clone(): YearField {
        let clone = new YearField();
        clone.data = _.cloneDeep(this.data);
        clone._IsEnabledBy = _.cloneDeep(this._IsEnabledBy);
        clone._IsContainedBy = _.cloneDeep(this._IsContainedBy);
        clone._Populates = _.cloneDeep(this._Populates);

        //clone.Context = this.Context;
        return clone;
    }
}

export var Types = {
    Account,
    AccountActivity,
    Activity,
    AccountComment,
    AuditableAccountActivity,
    AccountJournalEntry,
    AccountPerformsWorkflowSet,
    AccountRunsWorkflow,
    AccountWritesPolicySet,
    Invoice,
    InvoiceBillsAccount,
    Notification,
    Policy,
    PolicyExecutesTransaction,
    PolicySet,
    PolicySetWritesPolicy,
    Transaction,
    TransactionIsManagedByWorkflow,
    UserNotificationCenter,
    UserNotificationCenterIsAlertedByNotification,
    UserRecentAccounts,
    ApplicationDocument,
    ApplicationSubtree,
    ApplicationContainsElementCondition,
    ElementCondition,
    ElementConditionEnablesElement,
    ElementConditionEvaluatesDataPoint,
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
    StaticElement,
    StaticText,
    TimestampField,
    UrlField,
    YearField,
    YesNoField,
    ZipcodeField,
    Application,
    ApplicationCollectsSection,
    ApplicationPopulatesDataStore,
    FieldPopulatesDataPoint,
    ScriptCondition,
    SectionContainsElement,
    SectionRepeatsWithDataGroup,
    DataStoreDocument,
    DataStoreSubtree,
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
    DataStore,
    DataStoreContainsDataGroup,
    Map,
    MapCalculatesDataStore,
    MapContainsTransform,
    SimpleMapping,
    ScriptTransform,
    Transform,
    Rule,
    RuleDateTime,
    RuleProductSelection,
    RuleRiskAssessment,
    RuleRoleAssignment,
    RuleSet,
    RuleSetContainsRule,
    RuleSetRiskAssessment,
    RuleTaskObligation,
    RuleWorkflowSetStatus,
    Correspondence,
    CorrespondenceDeliveredForCorrespondenceTask,
    CorrespondenceDeliversAccountRole,
    CorrespondenceDeliversEmail,
    CorrespondenceMailsToDataGroup,
    CorrespondenceParameterSubstitutesDataPoint,
    CorrespondencePertainsToAccount,
    CorrespondencePullsFromDataStore,
    CorrespondenceSendsDocument,
    Document,
    DocumentAudit,
    DocumentInformsTransaction,
    DocumentInvoicesInvoice,
    DocumentSatisfiesTask,
    SCPArea,
    AccountRole,
    UserPool,
    Assignable,
    AccountRoleServicesAccount,
    AssignableAssignedTask,
    BusinessLocation,
    Holiday,
    Phase,
    Workable,
    PhaseRequiresTask,
    Prioritization,
    Program,
    ProgramConfiguredByProgramOptions,
    ProgramFormattedByRegion,
    ProgramOptions,
    ProgramRevision,
    ProgramRevisionPublishesProgram,
    ProgramRevisionStandbyWorkflow,
    ProgramWritesAccount,
    Region,
    ReservationSet,
    ReservationSetReservesAccount,
    ServiceLevel,
    ServiceLevelAgreement,
    SMIdentity,
    SMIdentityMemberOfUserPool,
    SMIdentityStartsReservationSet,
    SMIdentityWorksAccount,
    Task,
    TaskApplication,
    TaskApproval,
    TaskClearance,
    TaskCorrespondence,
    TaskDocumentGeneration,
    TaskFileRequirement,
    TaskManual,
    TaskPolicyDates,
    TaskProducts,
    TaskRatingSystem,
    UserActivity,
    WorkableEnablesWorkable,
    Workflow,
    WorkflowCollectsApplication,
    WorkflowEvaluatesRule,
    WorkflowRequiresPhase,
    WorkflowSet,
    WorkflowSetContainsWorkflow,
    WorkflowStoresDataStore,
    WorkGroup,
    WorkGroupQueuesReservationSet,
    TransactionDetails,
    UserFavoritesAccount,
}
