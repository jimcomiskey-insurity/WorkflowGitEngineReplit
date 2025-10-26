import { ModelUtils } from '@Core/utils/model-utils';
import { ContractDate } from '@Core/utils/contract-date';
import { Account, PolicySet, Workflow, Program, SMIdentity } from '@Core/models/codegen/area.models';
import { UserContext } from '@Core/contexts/user-context';

describe('ModelUtils class', () => {
    describe('serializeContractDate()', () => {
        it('should a serialize a ContractDate to a POJO, adding 1 to the Month', () => {
            let model: any = {
                id: '123',
                cDate: ModelUtils.serializeContractDate(new ContractDate(2020, 0, 1))
            };
            let stringModel = '{"id":"123","cDate":{"Year":2020,"Month":1,"Day":1}}';
            expect(JSON.stringify(model)).toBe(stringModel);
        });
        it('should not modify a POJO', () => {
            let pojo = JSON.parse('{"Year": 2020, "Month": 1, "Day": 1}');
            let model: any = {
                id: '123',
                cDate: ModelUtils.serializeContractDate(pojo)
            };
            let stringModel = '{"id":"123","cDate":{"Year":2020,"Month":1,"Day":1}}';
            expect(JSON.stringify(model)).toBe(stringModel);
        });
        it('should not modify undefined', () => {
            let pojo = ModelUtils.serializeContractDate(undefined)
            expect(pojo).toBe(undefined);
        });
        it('should not modify null', () => {
            let pojo = ModelUtils.serializeContractDate(null)
            expect(pojo).toBe(null);
        });
    });

    describe('deserializeContractDate()', () => {
        it('should create a Contract date from a POJO, subtracting 1 from the Month', () => {
            let pojo = {"Year": 2020, "Month": 1, "Day": 1};
            let contractDate: ContractDate = ModelUtils.deserializeContractDate(pojo);
            expect(contractDate.Year).toBe(2020);
            expect(contractDate.Month).toBe(0);
            expect(contractDate.Day).toBe(1);
        });
        it('should create a Contract date from a string, subtracting 1 from the Month', () => {
            let dateString = '{"Year": 2020, "Month": 1, "Day": 1}';
            let contractDate: ContractDate = ModelUtils.deserializeContractDate(dateString);
            expect(contractDate.Year).toBe(2020);
            expect(contractDate.Month).toBe(0);
            expect(contractDate.Day).toBe(1);
        });
        it('should return null if the object lacks the required properties', () => {
            let dateString = '{"Year": 2020, "Day": 1}';
            let contractDate: ContractDate = ModelUtils.deserializeContractDate(dateString);
            expect(contractDate).toBeNull();

            let date = {Month: 1};
            contractDate = ModelUtils.deserializeContractDate(date);
            expect(contractDate).toBeNull();
        });
        it('should not modify a ContractDate', () => {
            let oldDate = new ContractDate(2020, 0, 1);
            let contractDate: ContractDate = ModelUtils.deserializeContractDate(oldDate);
            expect(contractDate).toBe(oldDate);
            expect(contractDate.Year).toBe(2020);
            expect(contractDate.Month).toBe(0);
            expect(contractDate.Day).toBe(1);
        });
        it('should not modify undefined', () => {
            let contractDate: ContractDate = ModelUtils.deserializeContractDate(undefined);
            expect(contractDate).toBe(undefined);
        });
        it('should not modify null', () => {
            let contractDate: ContractDate = ModelUtils.deserializeContractDate(null);
            expect(contractDate).toBe(null);
        });
    });
    
    describe('removePropertiesSetToUndefined()', () => {
        it('should only remove undefined properties', () => {
            let pojo = {"TestNull": null, "TestFull": 123, "TestUndefined": undefined};
            ModelUtils.removePropertiesSetToUndefined(pojo);
            Object.getOwnPropertyNames(pojo).forEach(m => {
                expect(pojo[m]).toBeDefined();
            });
            expect(pojo.TestNull).toBeNull();
            expect(pojo.TestFull).toBe(123);
        });
    });

    describe('deserialize()', () => {
        it('should handle edges', () => {
            // #region setup
            var accountWithDeepEdgeToWorkflowAndProgram = {
                "@Type": "Account",
                "Id": "b86f9f97-8e54-4d9f-b4f1-c3f4922eacc1",
                "PartitionKey": "Accounts-Domain",
                "Name": "TestAccount  w3Y5N",
                "Phone": "630-555-4444",
                "Address1": "123 Test Street",
                "City": "Naperville",
                "State": "IL",
                "Zip": "60563",
                "#ProducerId": "a8cc7638-0e2a-48d0-8015-1b817a32383b",
                "#IsCleared": false,
                "#Status": "Temp",
                "Code": "T00000120",
                "#CreatedDate": "2022-02-22T18:45:22.9870305Z",
                "ObjectVersionNumber": 0,
                "LastUpdatedTimeUTC": "2022-02-22T18:45:22.9968707Z",
                "ETag": "00000000-0000-0000-281c-594f5ffd01d8",
                "IsWrittenFor": [
                {
                    "@Type": "ProgramWritesAccount",
                    "inVLabel": "Account",
                    "outVLabel": "Program",
                    "PartitionKey": "Workflows-Domain",
                    "#EffectiveDate": {
                    "Year": 2022,
                    "Month": 2,
                    "Day": 23
                    },
                    "#TotalTasks": 0,
                    "#TotalWorkflows": 0,
                    "ObjectVersionNumber": 0,
                    "LastUpdatedTimeUTC": "2022-02-22T18:45:30.7420839Z",
                    "ETag": "00000000-0000-0000-281c-5dedd6ba01d8",
                    "@RelationshipId": "bd6d22df-99e0-4dff-9d7e-57353bbab658",
                    "@Relationship": {
                    "@Type": "Program",
                    "Id": "762705a7-151a-408d-a120-b91c7bf38531",
                    "PartitionKey": "Workflows-Domain",
                    "#Description": "Test Program",
                    "#Name": "TestProg",
                    "ETag": "00000000-0000-0000-0c99-bc12d2f301d8"
                    }
                }
                ],
                "Runs": [
                {
                    "@Type": "AccountRunsWorkflow",
                    "inVLabel": "Workflow",
                    "outVLabel": "Account",
                    "PartitionKey": "Accounts-Domain",
                    "ObjectVersionNumber": 0,
                    "LastUpdatedTimeUTC": "2022-02-22T18:45:30.9393517Z",
                    "ETag": "00000000-0000-0000-281c-5e109d2701d8",
                    "@RelationshipId": "bab6cb41-41b5-43f9-bf47-b3369944ba6f",
                    "@Relationship": {
                    "@Type": "Workflow",
                    "Id": "c363656c-dc76-4671-85d2-1c7c702ed584",
                    "PartitionKey": "e71c8a3c-ca8a-4d7f-acda-fc8381050f78",
                    "#Abbr": "NB",
                    "#CreatedFromId": "b6e06df5-4d13-472e-b197-05b6b15f75ea",
                    "#CreatedFromRevision": "79881121-7e4b-4663-9e6a-73fcc4ffef06",
                    "#Description": "New Business Transaction",
                    "#Name": "New Business",
                    "#ProgramId": "762705a7-151a-408d-a120-b91c7bf38531",
                    "#Starting": true,
                    "#WorkflowSetId": "e71c8a3c-ca8a-4d7f-acda-fc8381050f78",
                    "#CompletedTaskPercent": 20.0,
                    "#IsCopy": false,
                    "#ProvisionStatus": "Activated",
                    "#Status": "Running",
                    "#TotalTasks": 0,
                    "#Transactional": true,
                    "#ProvisionStatusChanged": "2022-02-22T18:45:54.2177909Z",
                    "#CreatedOn": "2022-02-22T18:13:40.3339477Z",
                    "ObjectVersionNumber": 21,
                    "LastUpdatedTimeUTC": "2022-02-22T18:45:54.217846Z",
                    "ETag": "00000000-0000-0000-281c-6bed2f9b01d8",
                    "#Edition": 0,
                    "#DataStoreId": "e75f4af7-7881-4188-b872-97d97988a1ec",
                    "#EffectiveDate": {
                        "Year": 2022,
                        "Month": 2,
                        "Day": 23
                    }
                    }
                },
                {
                    "@Type": "AccountRunsWorkflow",
                    "inVLabel": "Workflow",
                    "outVLabel": "Account",
                    "PartitionKey": "Accounts-Domain",
                    "ObjectVersionNumber": 0,
                    "LastUpdatedTimeUTC": "2022-02-22T22:17:11.733511Z",
                    "ETag": "00000000-0000-0000-2839-f054001a01d8",
                    "@RelationshipId": "a340c89a-156c-4b3a-9c3e-d84241b4c83f",
                    "@Relationship": {
                    "@Type": "Workflow",
                    "Id": "6981956d-d434-452c-922e-56164fbeb60e",
                    "PartitionKey": "aa7c1e00-14b9-4b1e-b9fd-290f2993e0e0",
                    "#Abbr": "NB",
                    "#CreatedFromId": "b6e06df5-4d13-472e-b197-05b6b15f75ea",
                    "#CreatedFromRevision": "79881121-7e4b-4663-9e6a-73fcc4ffef06",
                    "#Description": "New Business Transaction",
                    "#Name": "New Business",
                    "#ProgramId": "762705a7-151a-408d-a120-b91c7bf38531",
                    "#Starting": true,
                    "#WorkflowSetId": "aa7c1e00-14b9-4b1e-b9fd-290f2993e0e0",
                    "#CompletedTaskPercent": 20.0,
                    "#IsCopy": false,
                    "#ProvisionStatus": "Activated",
                    "#Status": "Running",
                    "#TotalTasks": 0,
                    "#Transactional": true,
                    "#ProvisionStatusChanged": "2022-02-22T22:17:34.6230994Z",
                    "#CreatedOn": "2022-02-22T18:18:14.7338962Z",
                    "ObjectVersionNumber": 21,
                    "LastUpdatedTimeUTC": "2022-02-22T22:17:34.6231544Z",
                    "ETag": "00000000-0000-0000-2839-fdf44bd801d8",
                    "#Edition": 0,
                    "#DataStoreId": "87c17182-0f51-4872-ab60-37d5804843db",
                    "#EffectiveDate": {
                        "Year": 2022,
                        "Month": 2,
                        "Day": 26
                    }
                    }
                }
                ]
            };

            var accountWithoutEdges = {
                "@Type": "Account",
                "Id": "b86f9f97-8e54-4d9f-b4f1-c3f4922eacc1",
                "PartitionKey": "Accounts-Domain",
                "Name": "TestAccount  w3Y5N",
                "Phone": "630-555-4444",
                "Address1": "123 Test Street",
                "City": "Naperville",
                "State": "IL",
                "Zip": "60563",
                "#ProducerId": "a8cc7638-0e2a-48d0-8015-1b817a32383b",
                "#IsCleared": false,
                "#Status": "Temp",
                "Code": "T00000120",
                "#CreatedDate": "2022-02-22T18:45:22.9870305Z",
                "ObjectVersionNumber": 0,
                "LastUpdatedTimeUTC": "2022-02-22T18:45:22.9968707Z",
                "ETag": "00000000-0000-0000-281c-594f5ffd01d8",
            };

            var policySetWithShallowEdgeToAccount = {
                "@Type": "PolicySet",
                "Id": "e2b34d13-9edb-477a-8958-907714653313",
                "PartitionKey": "b86f9f97-8e54-4d9f-b4f1-c3f4922eacc1",
                "EffectiveDate": {
                  "Year": 2022,
                  "Month": 2,
                  "Day": 23
                },
                "ExpirationDate": {
                  "Year": 2023,
                  "Month": 2,
                  "Day": 23
                },
                "#ProgramId": "762705a7-151a-408d-a120-b91c7bf38531",
                "DefaultTerm": "1y",
                "#ProducerId": "a8cc7638-0e2a-48d0-8015-1b817a32383b",
                "#WorkflowSetId": "e71c8a3c-ca8a-4d7f-acda-fc8381050f78",
                "#APICreated": false,
                "#PolicySetStackKey": "e2b34d13-9edb-477a-8958-907714653313",
                "ObjectVersionNumber": 0,
                "LastUpdatedTimeUTC": "2022-02-22T18:45:30.7978718Z",
                "ETag": "00000000-0000-0000-281c-5df59f8801d8",
                "IsWrittenBy": [
                  {
                    "@Type": "AccountWritesPolicySet",
                    "inVLabel": "PolicySet",
                    "outVLabel": "Account",
                    "PartitionKey": "Accounts-Domain",
                    "ObjectVersionNumber": 0,
                    "LastUpdatedTimeUTC": "2022-02-22T18:45:30.8205129Z",
                    "ETag": "00000000-0000-0000-281c-5df9e2eb01d8",
                    "@RelationshipId": "fda00971-69e3-45ca-89b1-44fb40ed7bd7",
                    "@Relationship": {
                      "Id": "b86f9f97-8e54-4d9f-b4f1-c3f4922eacc1",
                      "@Type": "Account"
                    }
                  }
                ]
            };

            var sameAccountWithDeepEdgesToWorkflowAndUser = {
                "@Type": "Account",
                "Id": "b86f9f97-8e54-4d9f-b4f1-c3f4922eacc1",
                "PartitionKey": "Accounts-Domain",
                "Name": "TestAccount  w3Y5N",
                "Phone": "630-555-4444",
                "Address1": "123 Test Street",
                "City": "Naperville",
                "State": "IL",
                "Zip": "60563",
                "#ProducerId": "a8cc7638-0e2a-48d0-8015-1b817a32383b",
                "#IsCleared": false,
                "#Status": "Temp",
                "Code": "T00000120",
                "#CreatedDate": "2022-02-22T18:45:22.9870305Z",
                "ObjectVersionNumber": 0,
                "LastUpdatedTimeUTC": "2022-02-22T18:45:22.9968707Z",
                "ETag": "00000000-0000-0000-281c-594f5ffd01d8",
                "IsWorkedBy": [
                    {
                    "@Type": "SMIdentityWorksAccount",
                    "inVLabel": "Account",
                    "outVLabel": "SMIdentity",
                    "PartitionKey": "Workflows-Domain",
                    "ObjectVersionNumber": 0,
                    "LastUpdatedTimeUTC": "2022-02-22T18:45:26.0262374Z",
                    "ETag": "00000000-0000-0000-281c-5b1ee95901d8",
                    "@RelationshipId": "7d3bbb7d-7f5b-47bc-97e3-4dee7f3647a5",
                    "@Relationship": {
                        "@Type": "SMIdentity",
                        "Id": "63d7e202-1795-47ce-ae31-6300ae5d7850",
                        "PartitionKey": "Workflows-Domain",
                        "#Active": true,
                        "#IdentityType": "TenantUser",
                        "#TasksAssigned": 0,
                        "ETag": "00000000-0000-0000-0c97-e080b4e101d8"
                    }
                    }
                ],
                "Runs": [
                    {
                    "@Type": "AccountRunsWorkflow",
                    "inVLabel": "Workflow",
                    "outVLabel": "Account",
                    "PartitionKey": "Accounts-Domain",
                    "ObjectVersionNumber": 0,
                    "LastUpdatedTimeUTC": "2022-02-22T18:45:30.9393517Z",
                    "ETag": "00000000-0000-0000-281c-5e109d2701d8",
                    "@RelationshipId": "bab6cb41-41b5-43f9-bf47-b3369944ba6f",
                    "@Relationship": {
                        "@Type": "Workflow",
                        "Id": "c363656c-dc76-4671-85d2-1c7c702ed584",
                        "PartitionKey": "e71c8a3c-ca8a-4d7f-acda-fc8381050f78",
                        "#Abbr": "NB",
                        "#CreatedFromId": "b6e06df5-4d13-472e-b197-05b6b15f75ea",
                        "#CreatedFromRevision": "79881121-7e4b-4663-9e6a-73fcc4ffef06",
                        "#Description": "New Business Transaction",
                        "#Name": "New Business",
                        "#ProgramId": "762705a7-151a-408d-a120-b91c7bf38531",
                        "#Starting": true,
                        "#WorkflowSetId": "e71c8a3c-ca8a-4d7f-acda-fc8381050f78",
                        "#CompletedTaskPercent": 20.0,
                        "#IsCopy": false,
                        "#ProvisionStatus": "Activated",
                        "#Status": "Running",
                        "#TotalTasks": 0,
                        "#Transactional": true,
                        "#ProvisionStatusChanged": "2022-02-22T18:45:54.2177909Z",
                        "#CreatedOn": "2022-02-22T18:13:40.3339477Z",
                        "ObjectVersionNumber": 21,
                        "LastUpdatedTimeUTC": "2022-02-22T18:45:54.217846Z",
                        "ETag": "00000000-0000-0000-281c-6bed2f9b01d8",
                        "#Edition": 0,
                        "#DataStoreId": "e75f4af7-7881-4188-b872-97d97988a1ec",
                        "#EffectiveDate": {
                        "Year": 2022,
                        "Month": 2,
                        "Day": 23
                        }
                    }
                    },
                    {
                    "@Type": "AccountRunsWorkflow",
                    "inVLabel": "Workflow",
                    "outVLabel": "Account",
                    "PartitionKey": "Accounts-Domain",
                    "ObjectVersionNumber": 0,
                    "LastUpdatedTimeUTC": "2022-02-22T22:17:11.733511Z",
                    "ETag": "00000000-0000-0000-2839-f054001a01d8",
                    "@RelationshipId": "a340c89a-156c-4b3a-9c3e-d84241b4c83f",
                    "@Relationship": {
                        "@Type": "Workflow",
                        "Id": "6981956d-d434-452c-922e-56164fbeb60e",
                        "PartitionKey": "aa7c1e00-14b9-4b1e-b9fd-290f2993e0e0",
                        "#Abbr": "NB",
                        "#CreatedFromId": "b6e06df5-4d13-472e-b197-05b6b15f75ea",
                        "#CreatedFromRevision": "79881121-7e4b-4663-9e6a-73fcc4ffef06",
                        "#Description": "New Business Transaction",
                        "#Name": "New Business",
                        "#ProgramId": "762705a7-151a-408d-a120-b91c7bf38531",
                        "#Starting": true,
                        "#WorkflowSetId": "aa7c1e00-14b9-4b1e-b9fd-290f2993e0e0",
                        "#CompletedTaskPercent": 20.0,
                        "#IsCopy": false,
                        "#ProvisionStatus": "Activated",
                        "#Status": "Running",
                        "#TotalTasks": 0,
                        "#Transactional": true,
                        "#ProvisionStatusChanged": "2022-02-22T22:17:34.6230994Z",
                        "#CreatedOn": "2022-02-22T18:18:14.7338962Z",
                        "ObjectVersionNumber": 21,
                        "LastUpdatedTimeUTC": "2022-02-22T22:17:34.6231544Z",
                        "ETag": "00000000-0000-0000-2839-fdf44bd801d8",
                        "#Edition": 0,
                        "#DataStoreId": "87c17182-0f51-4872-ab60-37d5804843db",
                        "#EffectiveDate": {
                        "Year": 2022,
                        "Month": 2,
                        "Day": 26
                        }
                    }
                    }
                ]
            };
            // #endregion setup

            var context = new UserContext();
            var accountId = ModelUtils.createDomainId(new Account(), accountWithoutEdges.Id);

            // Account deserialized with deep edges to 2 Workflows and a Program
            new Account().deserialize(accountWithDeepEdgeToWorkflowAndProgram, context);
            var account = context.get(accountId) as Account;
            expect(account.Runs().length).toBe(2);
            expect(account._Runs.size).toBe(2);
            expect(account.IsWrittenFor().length).toBe(1);
            expect(account._IsWrittenFor.size).toBe(1);
            expect(account.Writes().length).toBe(0);
            expect(account._Writes.size).toBe(0);
            expect(account.IsWorkedBy().length).toBe(0);
            expect(account._IsWorkedBy.size).toBe(0);

            // Account deserialized without edges (no change)
            new Account().deserialize(accountWithoutEdges, context);
            account = context.get(accountId) as Account;
            expect(account.Runs().length).toBe(2);
            expect(account._Runs.size).toBe(2);
            expect(account.IsWrittenFor().length).toBe(1);
            expect(account._IsWrittenFor.size).toBe(1);
            expect(account.Writes().length).toBe(0);
            expect(account._Writes.size).toBe(0);
            expect(account.IsWorkedBy().length).toBe(0);
            expect(account._IsWorkedBy.size).toBe(0);

            // Policy Set deserialized with shallow edge to the Account (the Account should get an edge to the Policy Set now)
            var policySet = new PolicySet().deserialize(policySetWithShallowEdgeToAccount, context);
            account = context.get(accountId) as Account;
            expect(account.Runs().length).toBe(2);
            expect(account._Runs.size).toBe(2);
            expect(account.IsWrittenFor().length).toBe(1);
            expect(account._IsWrittenFor.size).toBe(1);
            expect(account.Writes().length).toBe(1);
            expect(account._Writes.size).toBe(1);
            expect(account.IsWorkedBy().length).toBe(0);
            expect(account._IsWorkedBy.size).toBe(0);

            // Account deserialized with deep edges to 2 Workflows and a User (the Account should add edge for User)
            new Account().deserialize(sameAccountWithDeepEdgesToWorkflowAndUser, context);
            account = context.get(accountId) as Account;
            expect(account.Runs().length).toBe(2);
            expect(account._Runs.size).toBe(2);
            expect(account.IsWrittenFor().length).toBe(1);
            expect(account._IsWrittenFor.size).toBe(1);
            expect(account.Writes().length).toBe(1);
            expect(account._Writes.size).toBe(1);
            expect(account.IsWorkedBy().length).toBe(1);
            expect(account._IsWorkedBy.size).toBe(1);

            // Make sure the other vertices have their edges set
            expect(context.getStore<Account>(new Account()).values.value.length).toBe(1);

            var workflows = context.getStore<Workflow>(new Workflow()).values.value;
            expect(workflows.length).toBe(2);
            expect(workflows[0].IsRunningFor().length).toBe(1);
            expect(workflows[1].IsRunningFor().length).toBe(1);

            var programs = context.getStore<Program>(new Program()).values.value;
            expect(programs.length).toBe(1);
            expect(programs[0].Writes().length).toBe(1);

            var policySets = context.getStore<PolicySet>(new PolicySet()).values.value;
            expect(policySets.length).toBe(1);
            expect(policySets[0].IsWrittenBy().length).toBe(1);

            var smIdentities = context.getStore<SMIdentity>(new SMIdentity()).values.value;
            expect(smIdentities.length).toBe(1);
            expect(smIdentities[0].Works().length).toBe(1);
        });
    });
});