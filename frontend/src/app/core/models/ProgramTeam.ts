export class ProgramTeam {
    /** TenantUsers by Id */
    public users: Dictionary<User>;

    /** WorkGroups by Id */
    public workGroups: Dictionary<WorkGroup>;

    /** AccountRole definitions by Id */
    public accountRoles: Dictionary<AccountRole>;

    public accountOwnerRoleId: string;
}

export class User {
    public isManager: boolean;
}

export class WorkGroup {
    public authorityLevel: number;
}

export class AccountRole {
    public authorityLevel: number;
    public eligibleUserIds?: string[];
    public initiallyFilledBy?: string;
    public initials?: string;
    public displayName?: string;
}

export interface Dictionary<TValue> {
    [K: string]: TValue;
}
