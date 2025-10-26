import { ProgramContext } from './program-context';
import { DataGroup, DataPoint, DataStore, Phase, Task, TenantUser, WorkGroup } from '@Core/models/codegen/configuration.models';
import { Guid } from '@Core/models/guid';
import _ from 'lodash';


describe('Data Context', () => {
    describe('loadApiResponseModels', () => {     
       
        it('should back-fill opposite vertices with edge data', () => {

            var programContext: ProgramContext = new ProgramContext(Guid.newGuid().toString());

            // load phases first, then Tasks
            programContext.loadApiResponseModels(Phase, getPhasesWithNoEdges());
            // when Tasks are added to the context, the Phase on the edge should be updated so that it can see its edges to the Tasks.
            programContext.loadApiResponseModels(Task, getTasksWithShallowEdgesToPhases());

            verifyPhaseHasTaskEdgeCount(programContext, "Setup", 2);
            verifyTaskHasDeepEdgeToPhase(programContext, "Products", "Setup");
        });
        
        it('should add existing context edge data to deserialized vertices', () => {         
            
            var programContext: ProgramContext = new ProgramContext(Guid.newGuid().toString());

            // load tasks first, then Phases
            programContext.loadApiResponseModels(Task, getTasksWithShallowEdgesToPhases());
            // when Phase is added to the context, Tasks with edges to this Phase should have those edges added to this Phase.
            programContext.loadApiResponseModels(Phase, getPhasesWithNoEdges());

            verifyPhaseHasTaskEdgeCount(programContext, "Setup", 2);
            verifyTaskHasDeepEdgeToPhase(programContext, "Products", "Setup");

        });

        it ('should retain edges to vertices already loaded into context', () => {
            var programContext: ProgramContext = new ProgramContext(Guid.newGuid().toString());            
            // Given Tasks with Phase edges are already loaded into context
            programContext.loadApiResponseModels(Task, getTasksWithShallowEdgesToPhases());         
            
            // When Task without edge is loaded into context
            programContext.loadApiResponseModels(Task, getTasksWithNoEdges());

            // Then the context should still reflect that the Task has the edge.
            var tasks = programContext.getStore<Task>(new Task()).values.value;
            var taskProduct = tasks.find(p => p.Name == "Products");
            expect(taskProduct.Description).toBe("Received Task with no edges");
            expect(taskProduct.IsRequiredFor().length).toBe(1);            

        });

        it('should handle edges with the same vertex type on both sides', () => {
            var programContext: ProgramContext = new ProgramContext(Guid.newGuid().toString());            
            
            // Load in the Data Store
            programContext.loadApiResponseModels(DataStore, getDataStoreWithNoEdges());         
            
            // Load in DataGroups and edges.
            // One edges is a DataGroupChildDataGroup edge
            programContext.loadApiResponseModels(DataGroup, getDataGroupsWithEdges());
            
            // We should get data groups
            var dataGroups = programContext.getStore<DataGroup>(new DataGroup()).values.value;
            expect(dataGroups.length).toBe(2);  

            _.forEach(dataGroups, dg => {
                // There are two datagroups. One is a child and one is a parent. Both should have ONLY 1 edge. 
                expect(dg.ChildOf().length + dg.ParentOf().length).toBe(1);
            });
        });

        it('should handle removing edges when a vertex is removed (in vertex)', () => {

            var programContext: ProgramContext = new ProgramContext(Guid.newGuid().toString());

            programContext.loadApiResponseModels(WorkGroup, getWorkGroupWithUser());

            var workGroups = programContext.getStore<WorkGroup>(new WorkGroup()).values.value;

            expect(workGroups.length).toBe(1);
            var workGroup = workGroups[0];

            expect(workGroup.HasMembers().length).toBe(1);

            var edge = _.first(workGroup.HasMembers());
            var user = edge.HasMembers();
            expect(user).not.toBeNull();

            expect(user.IsMemberOf().length).toBe(1);

            programContext.remove(user);

            // The user no longer exists in the store
            var userInStore = programContext.get(user.DomainId);
            expect(userInStore).toBeFalsy();

            // The edge should have been removed from the store
            var edgeInStore = programContext.get(edge.DomainId);
            expect(edgeInStore).toBeFalsy();

            // The work group edges will have been updated
            var workGroupEdges = workGroup.HasMembers();
            expect(workGroupEdges.length).toBe(0);
        });

        it('should handle removing edges when a vertex is removed (out vertex)', () => {

            var programContext: ProgramContext = new ProgramContext(Guid.newGuid().toString());

            programContext.loadApiResponseModels(WorkGroup, getWorkGroupWithUser());

            var workGroups = programContext.getStore<WorkGroup>(new WorkGroup()).values.value;

            expect(workGroups.length).toBe(1);
            var workGroup = workGroups[0];

            expect(workGroup.HasMembers().length).toBe(1);

            var edge = _.first(workGroup.HasMembers());
            var user = edge.HasMembers();
            expect(user).not.toBeNull();

            expect(user.IsMemberOf().length).toBe(1);

            var edge = _.first(user.IsMemberOf());

            programContext.remove(workGroup);

            // The user no longer exists in the store
            var workGroupInStore = programContext.get(workGroup.DomainId);
            expect(workGroupInStore).toBeFalsy();

            // The edge should have been removed from the store
            var edgeInStore = programContext.get(edge.DomainId);
            expect(edgeInStore).toBeFalsy();

            // The user edges will have been updated
            var userEdges = user.IsMemberOf();
            expect(userEdges.length).toBe(0);
        });

        it('should handle removing last edge from vertex', () => {

            var programContext: ProgramContext = new ProgramContext(Guid.newGuid().toString());

            programContext.loadApiResponseModels(WorkGroup, getWorkGroupWithUser());

            var workGroups = programContext.getStore<WorkGroup>(new WorkGroup()).values.value;

            expect(workGroups.length).toBe(1);
            var workGroup = workGroups[0];

            expect(workGroup.HasMembers().length).toBe(1);

            programContext.loadApiResponseModels(WorkGroup, getWorkGroupWithoutUser());

            var newWorkGroups: WorkGroup[] = programContext.getStore<WorkGroup>(new WorkGroup()).values.value;

            expect(newWorkGroups.length).toBe(1);
            var newWorkGroup: WorkGroup = newWorkGroups[0];

            // edge should be removed.            
            expect(newWorkGroup.HasMembers().length).toBe(0);

            var tenantUsers: TenantUser[] = programContext.getStore<TenantUser>(new TenantUser()).values.value;

            expect(tenantUsers.length).toBe(1);
            var tenantUser: TenantUser = tenantUsers[0];
            // TenantUser's edge should be removed as well.
            expect(tenantUser.IsMemberOf().length).toBe(0);

            // this next section reinforces that the edges were completely cleared up.  

            // load the vertex again, this time with no edges.
            programContext.loadApiResponseModels(WorkGroup, getWorkGroupWithoutEdges());

            newWorkGroups = programContext.getStore<WorkGroup>(new WorkGroup()).values.value;

            expect(newWorkGroups.length).toBe(1);
            newWorkGroup = newWorkGroups[0];

            // edge should remain removed.            
            expect(newWorkGroup.HasMembers().length).toBe(0);
        });

        it('should handle loading a flat list of vertices and edges', () => {
            var programContext: ProgramContext = new ProgramContext(Guid.newGuid().toString());
            
            programContext.loadResponseModels(getFlatDataStore());
            
            // Ensure the models were loaded into context
            var dataStores = programContext.getStore<DataStore>(new DataStore()).values.value;
            expect(dataStores.length).toBe(1);

            var dataGroups = programContext.getStore<DataGroup>(new DataGroup()).values.value;
            expect(dataGroups.length).toBe(1);

            var dataPoints = programContext.getStore<DataPoint>(new DataPoint()).values.value;
            expect(dataPoints.length).toBe(1);

            _.forEach(dataStores, ds => {
                expect(ds.Contains().length).withContext("data store .Contains relationship").toBe(1);
            });

            _.forEach(dataGroups, dg => {
                expect(dg.Contains().length).withContext("data group .Contains relationship").toBe(1);
                expect(dg.IsContainedBy().length).withContext("data group .IsContainedBy relationship").toBe(1);
            });

            _.forEach(dataPoints, dp => {
                expect(dp.IsContainedBy().length).withContext("data point .IsContainedBy relationship").toBe(1);
            });
        });

        it('should handle loading a vertex with an in edge and the same edge separately (Edge first)', () => {
            var programContext: ProgramContext = new ProgramContext(Guid.newGuid().toString());
            
            // Here, we load a DataStore, a DataGroup with the IsContainedBy Edge, and a 
            // DataStoreContainsDataGroup edge (which matches the IsContainedBy edge above)
            // The Edge is deserialized first in this test
            var content = [];
            content.push(EdgeDeserializationHelper.getDataStoreContainsDataGroupEdge())
            content.push(EdgeDeserializationHelper.getDataStoreWithoutEdges());
            content.push(EdgeDeserializationHelper.getDataGroupWithIsContainedByEdge());
            programContext.loadResponseModels({ "Content": content });
            
            // Ensure the models were loaded into context
            var dataStores = programContext.getStore<DataStore>(new DataStore()).values.value;
            var dataGroups = programContext.getStore<DataGroup>(new DataGroup()).values.value;
            
            // The Contains edge was duplicated in the response, but only 1 should exist
            expect(dataStores.length).toBe(1);
            expect(_.first(dataStores).Contains().length).withContext("data store .Contains relationship").toBe(1);

            expect(dataGroups.length).toBe(1);
            expect(_.first(dataGroups).IsContainedBy().length).withContext("data group .IsContainedBy relationship").toBe(1);

        });

        it('should handle loading a vertex with an in edge and the same edge separately (Vertex first)', () => {
            var programContext: ProgramContext = new ProgramContext(Guid.newGuid().toString());
            
            // Here, we load a DataStore, a DataGroup with the IsContainedBy Edge, and a 
            // DataStoreContainsDataGroup edge (which matches the IsContainedBy edge above)
            // The Data Group is deserialized first in this test
            var content = [];
            content.push(EdgeDeserializationHelper.getDataStoreWithoutEdges());
            content.push(EdgeDeserializationHelper.getDataGroupWithIsContainedByEdge());
            content.push(EdgeDeserializationHelper.getDataStoreContainsDataGroupEdge())
            programContext.loadResponseModels({ "Content": content });
            
            // Ensure the models were loaded into context
            var dataStores = programContext.getStore<DataStore>(new DataStore()).values.value;
            var dataGroups = programContext.getStore<DataGroup>(new DataGroup()).values.value;
            
            // The Contains edge was duplicated in the response, but only 1 should exist
            expect(dataStores.length).toBe(1);
            expect(_.first(dataStores).Contains().length).withContext("data store .Contains relationship").toBe(1);

            expect(dataGroups.length).toBe(1);
            expect(_.first(dataGroups).IsContainedBy().length).withContext("data group .IsContainedBy relationship").toBe(1);

        });

        it('should handle loading a vertex with an out edge and the same edge separately (Edge first)', () => {
            var programContext: ProgramContext = new ProgramContext(Guid.newGuid().toString());
            
            // Here, we load a DataStore with the Contains edge, a DataGroup, and a 
            // DataStoreContainsDataGroup edge (which matches the Contains edge above)
            // The edge is deserialized first in this test
            var content = [];
            content.push(EdgeDeserializationHelper.getDataStoreContainsDataGroupEdge())
            content.push(EdgeDeserializationHelper.getDataStoreWithContainsEdge());
            content.push(EdgeDeserializationHelper.getDataGroupWithoutEdges());
            programContext.loadResponseModels({ Content: content });
            
           // Ensure the models were loaded into context
           var dataStores = programContext.getStore<DataStore>(new DataStore()).values.value;
           var dataGroups = programContext.getStore<DataGroup>(new DataGroup()).values.value;
           
           // The Contains edge was duplicated in the response, but only 1 should exist
           expect(dataStores.length).toBe(1);
           expect(_.first(dataStores).Contains().length).withContext("data store .Contains relationship").toBe(1);

           expect(dataGroups.length).toBe(1);
           expect(_.first(dataGroups).IsContainedBy().length).withContext("data group .IsContainedBy relationship").toBe(1);
        });

        it('should handle loading a vertex with an out edge and the same edge separately (Vertex first)', () => {
            var programContext: ProgramContext = new ProgramContext(Guid.newGuid().toString());
            
            // Here, we load a DataStore with the Contains edge, a DataGroup, and a 
            // DataStoreContainsDataGroup edge (which matches the Contains edge above)
            // The Data Store is deserialized first in this test
            var content = [];
            content.push(EdgeDeserializationHelper.getDataStoreWithContainsEdge());
            content.push(EdgeDeserializationHelper.getDataGroupWithoutEdges());
            content.push(EdgeDeserializationHelper.getDataStoreContainsDataGroupEdge())
            programContext.loadResponseModels({ Content: content });
            
           // Ensure the models were loaded into context
           var dataStores = programContext.getStore<DataStore>(new DataStore()).values.value;
           var dataGroups = programContext.getStore<DataGroup>(new DataGroup()).values.value;
           
           // The Contains edge was duplicated in the response, but only 1 should exist
           expect(dataStores.length).toBe(1);
           expect(_.first(dataStores).Contains().length).withContext("data store .Contains relationship").toBe(1);

           expect(dataGroups.length).toBe(1);
           expect(_.first(dataGroups).IsContainedBy().length).withContext("data group .IsContainedBy relationship").toBe(1);
        });
    });
});

function verifyPhaseHasTaskEdgeCount(programContext: ProgramContext, phaseName: string, taskCount: number) {
    var phases = programContext.getStore<Phase>(new Phase()).values.value;            
    expect(phases.length).toBe(1);
    var setupPhase = phases.find(p => p.Name == phaseName);
    expect(setupPhase.Requires().length).toBe(taskCount);
}

function verifyTaskHasDeepEdgeToPhase(programContext: ProgramContext, taskName: string, phaseName: string) {
    var tasks = programContext.getStore<Task>(new Task()).values.value;
    var taskProduct = tasks.find(p => p.Name == taskName);
    expect(taskProduct.IsRequiredFor().length).toBe(1);
    expect(taskProduct.IsRequiredFor()[0].IsRequiredFor().Name).toBe(phaseName);
}

//#region Model setup

function getPhasesWithNoEdges() {
    return {
        Content: [
            {
                "@Type": "Phase",
                Id: "078772a7-327a-4a10-9e1a-74c7be13e83b",
                PartitionKey: "ca329e4d-2823-4316-b1c3-48aa20549782",
                Change: "03ff3979-fd4f-4cfe-9035-b69388e87f6b",
                CompleteName: "Setup",
                Description: "Contains tasks that must be completed as part of the workflow setup.",
                Name: "Setup",
                HoldAutoComplete: false,
                "#Protected": false,
                "#Key": "f4725d65-86c2-4153-9a16-628255aa272b",
                ETag: "a400fb81-0000-0100-0000-6171c5a10000",
                "#OrderNum": 0,
                IsRequiredFor: [
                    {
                        "@Type": "WorkflowRequiresPhase",
                        inVLabel: "Phase",
                        outVLabel: "Workflow",
                        InIdPair: {
                            Id: "078772a7-327a-4a10-9e1a-74c7be13e83b",
                            PartitionKey: "ca329e4d-2823-4316-b1c3-48aa20549782"
                        },
                        OutIdPair: {
                            Id: "d167cefc-a6f4-450a-908e-9ebb3388cc8f",
                            PartitionKey: "ca329e4d-2823-4316-b1c3-48aa20549782"
                        },
                        PartitionKey: "ca329e4d-2823-4316-b1c3-48aa20549782",
                        InId: "078772a7-327a-4a10-9e1a-74c7be13e83b",
                        OutId: "d167cefc-a6f4-450a-908e-9ebb3388cc8f",
                        Change: "03ff3979-fd4f-4cfe-9035-b69388e87f6b",
                        "#Key": "87ae8a46-170e-4d39-ad93-ca3f46bd7d9b",
                        ETag: "a400fc81-0000-0100-0000-6171c5a10000",
                        "@RelationshipId": "82ccf782-cbb3-46a0-a547-7c3ba2996628",
                        "@Relationship": {
                            Id: "d167cefc-a6f4-450a-908e-9ebb3388cc8f",
                            "@Type": "Workflow"
                        }
                    }
                ]
            }
        ],
        RequestId: "0HMCKLA113NP2:0000000C",
        APIVersion: "Unknown",
        DatabaseVersion: 6
    };
}

function getTasksWithShallowEdgesToPhases() {
        return {
            Content: [
            {
                "@Type": "TaskProducts",
                Id: "d05d699a-128a-453f-aa3f-e8ce99168c95",
                PartitionKey: "ca329e4d-2823-4316-b1c3-48aa20549782",
                Change: "03ff3979-fd4f-4cfe-9035-b69388e87f6b",
                Description: "Select your products for your program",
                Name: "Products",
                ObligationStatus: "Required",
                AutoComplete: true,
                AutoDefer: false,
                AutoExecute: false,
                Waivable: false,
                "#Key": "76289c1b-beb4-42da-80c5-46d4b4f15b61",
                ETag: "a4000082-0000-0100-0000-6171c5a10000",
                "#OrderNum": 0,
                IsRequiredFor: [
                    {
                        "@Type": "PhaseRequiresTask",
                        inVLabel: "TaskProducts",
                        outVLabel: "Phase",
                        InIdPair: {
                            Id: "d05d699a-128a-453f-aa3f-e8ce99168c95",
                            PartitionKey: "ca329e4d-2823-4316-b1c3-48aa20549782"
                        },
                        OutIdPair: {
                            Id: "078772a7-327a-4a10-9e1a-74c7be13e83b",
                            PartitionKey: "ca329e4d-2823-4316-b1c3-48aa20549782"
                        },
                        PartitionKey: "ca329e4d-2823-4316-b1c3-48aa20549782",
                        InId: "d05d699a-128a-453f-aa3f-e8ce99168c95",
                        OutId: "078772a7-327a-4a10-9e1a-74c7be13e83b",
                        Change: "03ff3979-fd4f-4cfe-9035-b69388e87f6b",
                        "#Key": "de3d9d9f-13b4-4f69-bc99-e79c0505cec0",
                        ETag: "a4000182-0000-0100-0000-6171c5a10000",
                        "@RelationshipId": "b84319a0-003e-4b42-9eee-985c48a67e3e",
                        "@Relationship": {
                            Id: "078772a7-327a-4a10-9e1a-74c7be13e83b",
                            "@Type": "Phase"
                        }
                    }
                ]
            },               
            {
                "@Type": "TaskPolicyDates",
                Id: "b2e99c4a-5b20-4e44-bd62-583df41dea86",
                PartitionKey: "ca329e4d-2823-4316-b1c3-48aa20549782",
                Change: "03ff3979-fd4f-4cfe-9035-b69388e87f6b",
                Description: "Provide the Policy Dates for the Policy",
                Name: "Policy Dates",
                ObligationStatus: "Required",
                AllowChangingEffectiveDates: true,
                AllowChangingExpirationDates: true,
                AutoComplete: true,
                AutoDefer: false,
                AutoExecute: false,
                Waivable: false,
                "#Key": "1aa1baf9-2ca8-44b2-a772-face5f4966bb",
                ETag: "a4000782-0000-0100-0000-6171c5a20000",
                "#OrderNum": 1,
                IsRequiredFor: [
                    {
                        "@Type": "PhaseRequiresTask",
                        inVLabel: "TaskPolicyDates",
                        outVLabel: "Phase",
                        InIdPair: {
                            Id: "b2e99c4a-5b20-4e44-bd62-583df41dea86",
                            PartitionKey: "ca329e4d-2823-4316-b1c3-48aa20549782"
                        },
                        OutIdPair: {
                            Id: "078772a7-327a-4a10-9e1a-74c7be13e83b",
                            PartitionKey: "ca329e4d-2823-4316-b1c3-48aa20549782"
                        },
                        PartitionKey: "ca329e4d-2823-4316-b1c3-48aa20549782",
                        InId: "b2e99c4a-5b20-4e44-bd62-583df41dea86",
                        OutId: "078772a7-327a-4a10-9e1a-74c7be13e83b",
                        Change: "03ff3979-fd4f-4cfe-9035-b69388e87f6b",
                        "#Key": "ae164d49-abaa-40d2-a40f-99f09423ba3d",
                        ETag: "a4000882-0000-0100-0000-6171c5a20000",
                        "@RelationshipId": "3e887139-ac65-4223-a07e-7afbdadd9866",
                        "@Relationship": {
                            Id: "078772a7-327a-4a10-9e1a-74c7be13e83b",
                            "@Type": "Phase"
                        }
                    }
                ]
            }
        ],
        RequestId: "0HMCKLA113NP1:0000000F",
        APIVersion: "Unknown",
        DatabaseVersion: 6
    };
}

function getTasksWithNoEdges() {
    return {
        Content: [
            {
                "@Type": "TaskProducts",
                Id: "d05d699a-128a-453f-aa3f-e8ce99168c95",
                PartitionKey: "ca329e4d-2823-4316-b1c3-48aa20549782",
                Change: "03ff3979-fd4f-4cfe-9035-b69388e87f6b",
                Description: "Received Task with no edges",
                Name: "Products",
                ObligationStatus: "Required",
                AutoComplete: true,
                AutoDefer: false,
                AutoExecute: false,
                Waivable: false,
                "#Key": "76289c1b-beb4-42da-80c5-46d4b4f15b61",
                ETag: "a4000082-0000-0100-0000-6171c5a10000",
                "#OrderNum": 0
            },               
            {
                "@Type": "TaskPolicyDates",
                Id: "b2e99c4a-5b20-4e44-bd62-583df41dea86",
                PartitionKey: "ca329e4d-2823-4316-b1c3-48aa20549782",
                Change: "03ff3979-fd4f-4cfe-9035-b69388e87f6b",
                Description: "Provide the Policy Dates for the Policy",
                Name: "Policy Dates",
                ObligationStatus: "Required",
                AllowChangingEffectiveDates: true,
                AllowChangingExpirationDates: true,
                AutoComplete: true,
                AutoDefer: false,
                AutoExecute: false,
                Waivable: false,
                "#Key": "1aa1baf9-2ca8-44b2-a772-face5f4966bb",
                ETag: "a4000782-0000-0100-0000-6171c5a20000",
                "#OrderNum": 1,                        
            }
        ],
        RequestId: "0HMCKLA113NP1:0000000F",
        APIVersion: "Unknown",
        DatabaseVersion: 6      
    };
}

function getDataStoreWithNoEdges() {
    return {
        "Content": [
            {
              "@Type": "DataStore",
              "Id": "2e89d8aa-316e-468c-8df6-0fab7c217569",
              "PartitionKey": "76246609-bb1c-4297-8c95-f83bfb7bf52a",
              "Name": "Basic Data",
              "#NoOfTimesUsed": 0,
              "#LockedByChange": "868674df-fddc-4443-872f-e9d721b97ecc",
              "ETag": "5802fda3-0000-0100-0000-619d37cd0000",
              "Sequence": [
                "478af990-f21b-4473-9923-2364a52c481f"
              ]
            }
          ],
    };
}

function getDataGroupsWithEdges() {
    return {
        "Content": [
            {
              "@Type": "DataGroup",
              "Id": "478af990-f21b-4473-9923-2364a52c481f",
              "PartitionKey": "76246609-bb1c-4297-8c95-f83bfb7bf52a",
              "Name": "Top Group",
              "Description": "group",
              "PopulatedBy": [
                "Service",
                "Application",
                "Import/Copy"
              ],
              "#IsPredefined": true,
              "Repeatable": false,
              "ETag": "580200a4-0000-0100-0000-619d37d80000",
              "Sequence": [
                "a67bed67-76bc-48b7-ac07-3b4fb843241f"
              ],
              "IsContainedBy": [
                {
                  "@Type": "DataStoreContainsDataGroup",
                  "inVLabel": "DataGroup",
                  "outVLabel": "DataStore",
                  "InIdPair": {
                    "Id": "478af990-f21b-4473-9923-2364a52c481f",
                    "PartitionKey": "76246609-bb1c-4297-8c95-f83bfb7bf52a"
                  },
                  "OutIdPair": {
                    "Id": "2e89d8aa-316e-468c-8df6-0fab7c217569",
                    "PartitionKey": "76246609-bb1c-4297-8c95-f83bfb7bf52a"
                  },
                  "PartitionKey": "76246609-bb1c-4297-8c95-f83bfb7bf52a",
                  "InId": "478af990-f21b-4473-9923-2364a52c481f",
                  "OutId": "2e89d8aa-316e-468c-8df6-0fab7c217569",
                  "ETag": "5802fca3-0000-0100-0000-619d37cd0000",
                  "@RelationshipId": "ee94a43a-24f8-4afb-8aee-4426cbd3e164",
                  "@Relationship": {
                    "Id": "2e89d8aa-316e-468c-8df6-0fab7c217569",
                    "@Type": "DataStore"
                  }
                }
              ],
              "ParentOf": [
                {
                  "@Type": "DataGroupChildDataGroup",
                  "inVLabel": "DataGroup",
                  "outVLabel": "DataGroup",
                  "InIdPair": {
                    "Id": "a67bed67-76bc-48b7-ac07-3b4fb843241f",
                    "PartitionKey": "76246609-bb1c-4297-8c95-f83bfb7bf52a"
                  },
                  "OutIdPair": {
                    "Id": "478af990-f21b-4473-9923-2364a52c481f",
                    "PartitionKey": "76246609-bb1c-4297-8c95-f83bfb7bf52a"
                  },
                  "PartitionKey": "76246609-bb1c-4297-8c95-f83bfb7bf52a",
                  "InId": "a67bed67-76bc-48b7-ac07-3b4fb843241f",
                  "OutId": "478af990-f21b-4473-9923-2364a52c481f",
                  "ETag": "5802ffa3-0000-0100-0000-619d37d80000",
                  "@RelationshipId": "ecb8c7bc-6e47-4610-a66d-2b4d837c6def",
                  "@Relationship": {
                    "Id": "a67bed67-76bc-48b7-ac07-3b4fb843241f",
                    "@Type": "DataGroup"
                  }
                }
              ]
            },
            {
              "@Type": "DataGroup",
              "Id": "a67bed67-76bc-48b7-ac07-3b4fb843241f",
              "PartitionKey": "76246609-bb1c-4297-8c95-f83bfb7bf52a",
              "Name": "Nested Group",
              "Description": "nested",
              "PopulatedBy": [
                "Service",
                "Application",
                "Import/Copy"
              ],
              "#IsPredefined": true,
              "Repeatable": false,
              "ETag": "5802fea3-0000-0100-0000-619d37d80000"
            }
          ]
    };
}

function getFlatDataStore() {
    return {
        "Content": [
            {
                "@Type": "DataStore",
                "Id": "593f0bde-b8c6-414c-9112-7cc620f32525",
                "PartitionKey": "9ffe7f2e-eb62-4db4-af04-1a4d1ececdf8",
                "Name": "Basic Data",
                "#NoOfTimesUsed": 0,
                "ObjectVersionNumber": 1,
                "LastUpdatedTimeUTC": "2022-05-18T19:54:17.5644216Z",
                "ETag": "00000000-0000-0000-6af1-0ed1e07701d8",
                "Sequence": [
                    "e21b1606-4e1d-4ad3-9ad8-910823e88760"
                ]
            },
            {
                "@Type": "DataGroup",
                "Id": "e21b1606-4e1d-4ad3-9ad8-910823e88760",
                "PartitionKey": "9ffe7f2e-eb62-4db4-af04-1a4d1ececdf8",
                "Name": "Top",
                "Description": "top",
                "PopulatedBy": [
                    "Application",
                    "Import/Copy"
                ],
                "IsDesiredStateAllowed": false,
                "#IsPredefined": true,
                "Repeatable": false,
                "ObjectVersionNumber": 1,
                "LastUpdatedTimeUTC": "2022-05-18T19:54:29.1333336Z",
                "ETag": "00000000-0000-0000-6af1-15b6b76c01d8",
                "Sequence": [
                    "9ba62908-a80f-48c4-9c6f-a8612d780e71"
                ],
                "#OrderNum": 0,
            },
            {
                "@Type": "DataPointInteger",
                "Id": "9ba62908-a80f-48c4-9c6f-a8612d780e71",
                "PartitionKey": "9ffe7f2e-eb62-4db4-af04-1a4d1ececdf8",
                "Name": "Integer A",
                "Description": "sdf",
                "ValidationType": "Basic",
                "IsCalculated": false,
                "PopulatedBy": [
                    "Application",
                    "Import/Copy"
                ],
                "DataType": "integer",
                "#IsPredefined": false,
                "IsRepeatableKey": false,
                "#Optional": false,
                "RateAffecting": false,
                "ResetDataForNewEdition": false,
                "ObjectVersionNumber": 0,
                "LastUpdatedTimeUTC": "2022-05-18T19:54:28.9740166Z",
                "ETag": "00000000-0000-0000-6af1-159e7e6401d8",
                "#OrderNum": 0
            },
            {
                "@Type": "DataStoreContainsDataGroup",
                "Id": "ca094eeb-7e78-4778-a47c-cd5ab18b3544",
                "inVLabel": "DataGroup",
                "outVLabel": "DataStore",
                "InIdPair": {
                    "Id": "e21b1606-4e1d-4ad3-9ad8-910823e88760",
                    "PartitionKey": "9ffe7f2e-eb62-4db4-af04-1a4d1ececdf8"
                },
                "OutIdPair": {
                    "Id": "593f0bde-b8c6-414c-9112-7cc620f32525",
                    "PartitionKey": "9ffe7f2e-eb62-4db4-af04-1a4d1ececdf8"
                },
                "PartitionKey": "9ffe7f2e-eb62-4db4-af04-1a4d1ececdf8",
                "ObjectVersionNumber": 0,
                "LastUpdatedTimeUTC": "2022-05-18T19:54:17.4627978Z",
                "ETag": "00000000-0000-0000-6af1-0ec231c501d8",
                "@RelationshipId": "ca094eeb-7e78-4778-a47c-cd5ab18b3544"
            },
            {
                "@Type": "DataGroupContainsDataPoint",
                "Id": "ba88e2a1-5916-441d-9335-30ea248ce1ae",
                "inVLabel": "DataPointInteger",
                "outVLabel": "DataGroup",
                "InIdPair": {
                    "Id": "9ba62908-a80f-48c4-9c6f-a8612d780e71",
                    "PartitionKey": "9ffe7f2e-eb62-4db4-af04-1a4d1ececdf8"
                },
                "OutIdPair": {
                    "Id": "e21b1606-4e1d-4ad3-9ad8-910823e88760",
                    "PartitionKey": "9ffe7f2e-eb62-4db4-af04-1a4d1ececdf8"
                },
                "PartitionKey": "9ffe7f2e-eb62-4db4-af04-1a4d1ececdf8",
                "ObjectVersionNumber": 0,
                "LastUpdatedTimeUTC": "2022-05-18T19:54:29.0288525Z",
                "ETag": "00000000-0000-0000-6af1-15a7297e01d8",
                "@RelationshipId": "ba88e2a1-5916-441d-9335-30ea248ce1ae"
            }
        ]
    };
}

class EdgeDeserializationHelper {
    static getDataStoreWithoutEdges() {
        return  {
            "@Type": "DataStore",
            "Id": "593f0bde-b8c6-414c-9112-7cc620f32525",
            "PartitionKey": "9ffe7f2e-eb62-4db4-af04-1a4d1ececdf8",
            "Name": "Basic Data",
            "#NoOfTimesUsed": 0,
            "ObjectVersionNumber": 1,
            "LastUpdatedTimeUTC": "2022-05-18T19:54:17.5644216Z",
            "ETag": "00000000-0000-0000-6af1-0ed1e07701d8",
            "Sequence": [
                "e21b1606-4e1d-4ad3-9ad8-910823e88760"
            ]
        };
    }

    static getDataStoreWithContainsEdge() {
        return {
            "@Type": "DataStore",
            "Id": "593f0bde-b8c6-414c-9112-7cc620f32525",
            "PartitionKey": "9ffe7f2e-eb62-4db4-af04-1a4d1ececdf8",
            "Name": "Basic Data",
            "#NoOfTimesUsed": 0,
            "ObjectVersionNumber": 1,
            "LastUpdatedTimeUTC": "2022-05-18T19:54:17.5644216Z",
            "ETag": "00000000-0000-0000-6af1-0ed1e07701d8",
            "Sequence": [
                "e21b1606-4e1d-4ad3-9ad8-910823e88760"
            ],
            "Contains": [
                {
                  "@Type": "DataStoreContainsDataGroup",
                  "inVLabel": "DataStoreDataGroup",
                  "outVLabel": "DataGroup",
                  "OutIdPair": {
                    "Id": "e21b1606-4e1d-4ad3-9ad8-910823e88760",
                    "PartitionKey": "9ffe7f2e-eb62-4db4-af04-1a4d1ececdf8"
                  },
                  "InIdPair": {
                    "Id": "593f0bde-b8c6-414c-9112-7cc620f32525",
                    "PartitionKey": "9ffe7f2e-eb62-4db4-af04-1a4d1ececdf8"
                  },
                  "PartitionKey": "9ffe7f2e-eb62-4db4-af04-1a4d1ececdf8",
                  "OutId": "e21b1606-4e1d-4ad3-9ad8-910823e88760",
                  "InId": "593f0bde-b8c6-414c-9112-7cc620f32525",
                  "ETag": "5802fca3-0000-0100-0000-619d37cd0000",
                  "@RelationshipId": "ca094eeb-7e78-4778-a47c-cd5ab18b3544",
                  "@Relationship": {
                    "Id": "e21b1606-4e1d-4ad3-9ad8-910823e88760",
                    "@Type": "DataGroup"
                  }
                }
            ],
        };
    }

    static getDataGroupWithoutEdges() {
        return {
            "@Type": "DataGroup",
            "Id": "e21b1606-4e1d-4ad3-9ad8-910823e88760",
            "PartitionKey": "9ffe7f2e-eb62-4db4-af04-1a4d1ececdf8",
            "Name": "Top",
            "Description": "top",
            "PopulatedBy": [
                "Application",
                "Import/Copy"
            ],
            "IsDesiredStateAllowed": false,
            "#IsPredefined": true,
            "Repeatable": false,
            "ObjectVersionNumber": 1,
            "LastUpdatedTimeUTC": "2022-05-18T19:54:29.1333336Z",
            "ETag": "00000000-0000-0000-6af1-15b6b76c01d8",
            "Sequence": [
                "9ba62908-a80f-48c4-9c6f-a8612d780e71"
            ],
            "#OrderNum": 0,
            
        };
    }


    static getDataGroupWithIsContainedByEdge() {
        return {
            "@Type": "DataGroup",
            "Id": "e21b1606-4e1d-4ad3-9ad8-910823e88760",
            "PartitionKey": "9ffe7f2e-eb62-4db4-af04-1a4d1ececdf8",
            "Name": "Top",
            "Description": "top",
            "PopulatedBy": [
                "Application",
                "Import/Copy"
            ],
            "IsDesiredStateAllowed": false,
            "#IsPredefined": true,
            "Repeatable": false,
            "ObjectVersionNumber": 1,
            "LastUpdatedTimeUTC": "2022-05-18T19:54:29.1333336Z",
            "ETag": "00000000-0000-0000-6af1-15b6b76c01d8",
            "Sequence": [
                "9ba62908-a80f-48c4-9c6f-a8612d780e71"
            ],
            "#OrderNum": 0,
            "IsContainedBy": [
                {
                  "@Type": "DataStoreContainsDataGroup",
                  "inVLabel": "DataGroup",
                  "outVLabel": "DataStore",
                  "InIdPair": {
                    "Id": "e21b1606-4e1d-4ad3-9ad8-910823e88760",
                    "PartitionKey": "9ffe7f2e-eb62-4db4-af04-1a4d1ececdf8"
                  },
                  "OutIdPair": {
                    "Id": "593f0bde-b8c6-414c-9112-7cc620f32525",
                    "PartitionKey": "9ffe7f2e-eb62-4db4-af04-1a4d1ececdf8"
                  },
                  "PartitionKey": "9ffe7f2e-eb62-4db4-af04-1a4d1ececdf8",
                  "InId": "e21b1606-4e1d-4ad3-9ad8-910823e88760",
                  "OutId": "593f0bde-b8c6-414c-9112-7cc620f32525",
                  "ETag": "5802fca3-0000-0100-0000-619d37cd0000",
                  "@RelationshipId": "ca094eeb-7e78-4778-a47c-cd5ab18b3544",
                  "@Relationship": {
                    "Id": "593f0bde-b8c6-414c-9112-7cc620f32525",
                    "@Type": "DataStore"
                  }
                }
            ],
        };
    }

    static getDataStoreContainsDataGroupEdge() {
        return {
            "@Type": "DataStoreContainsDataGroup",
            "Id": "ca094eeb-7e78-4778-a47c-cd5ab18b3544",
            "inVLabel": "DataGroup",
            "outVLabel": "DataStore",
            "InIdPair": {
                "Id": "e21b1606-4e1d-4ad3-9ad8-910823e88760",
                "PartitionKey": "9ffe7f2e-eb62-4db4-af04-1a4d1ececdf8"
            },
            "OutIdPair": {
                "Id": "593f0bde-b8c6-414c-9112-7cc620f32525",
                "PartitionKey": "9ffe7f2e-eb62-4db4-af04-1a4d1ececdf8"
            },
            "PartitionKey": "9ffe7f2e-eb62-4db4-af04-1a4d1ececdf8",
            "ObjectVersionNumber": 0,
            "LastUpdatedTimeUTC": "2022-05-18T19:54:17.4627978Z",
            "ETag": "00000000-0000-0000-6af1-0ec231c501d8",
            "@RelationshipId": "ca094eeb-7e78-4778-a47c-cd5ab18b3544"
        };
    }
}

function getWorkGroupWithUser() {
    return {
        Content: {
            "@Type": "WorkGroup",
            Id:"da4b3ef1-20ae-48db-8386-b8d27ff533f4",
            "PartitionKey":"Tenant-Identities",
            "Initials":"TW",
            "DisplayName":"Test Workgroup",
            "Description":"Test Description",
            "Prioritization":"Due Date",
            "TasksAssigned":0,
            "ETag":"00000000-0000-0000-dd78-ce22fbe701d7",
            "ReservationTimeLimit":2,
            "HasMembers":[{
                "@Type":"TenantUserMemberOfWorkGroup",
                "inVLabel":"WorkGroup",
                "outVLabel":"TenantUser","InIdPair":{
                    "Id":"da4b3ef1-20ae-48db-8386-b8d27ff533f4",
                    "PartitionKey":"Tenant-Identities"},
                "OutIdPair":{
                    "Id":"8e78e3fd-b152-45c2-a089-134b4f5f10c1",
                    "PartitionKey":"Tenant-Identities"},
                "PartitionKey":"Tenant-Identities",
                "InId":"da4b3ef1-20ae-48db-8386-b8d27ff533f4",
                "OutId":"8e78e3fd-b152-45c2-a089-134b4f5f10c1",
                "DateOfMembership":"2021-11-19T19:08:14.277Z",
                "ETag":"00000000-0000-0000-dd78-ce2b362901d7",
                "@RelationshipId":"af93d466-6884-421d-af27-ba260f9fb034",
                "@Relationship":{
                    "@Type":"TenantUser","Id":"8e78e3fd-b152-45c2-a089-134b4f5f10c1",
                    "PartitionKey":"Tenant-Identities",
                    "DisplayName":"jim.comiskey97@gmail.com",
                    "Email":"jim.comiskey97@gmail.com",
                    "InvitedDate":"2021-11-17T15:16:52.8962776Z",
                    "CreatedDate":"2021-11-17T15:16:52.8962776Z",
                    "#Active":true,
                    "Initials":"J","ETag":"00000000-0000-0000-dbc6-2e54810201d7","ActiveSince":"2021-11-17T15:17:05.7933384Z"
                }
            }]
        },
        "RequestId":"0HMDBHV7VOIK8:00000009",
        "APIVersion":"Unknown",
        "DatabaseVersion":7
    };
}

function getWorkGroupWithoutUser() {
    return {
        Content: {
            "@Type": "WorkGroup",
            Id:"da4b3ef1-20ae-48db-8386-b8d27ff533f4",
            "PartitionKey":"Tenant-Identities",
            "Initials":"TW",
            "DisplayName":"Test Workgroup",
            "Description":"Test Description",
            "Prioritization":"Due Date",
            "TasksAssigned":0,
            "ETag":"00000000-0000-0000-dd78-ce22fbe701d7",
            "ReservationTimeLimit":2,
            "HasMembers":[]
        },
        "RequestId":"0HMDBHV7VOIK8:00000009",
        "APIVersion":"Unknown",
        "DatabaseVersion":7
    };
}

function getWorkGroupWithoutEdges() {
    return {
        Content: {
            "@Type": "WorkGroup",
            Id:"da4b3ef1-20ae-48db-8386-b8d27ff533f4",
            "PartitionKey":"Tenant-Identities",
            "Initials":"TW",
            "DisplayName":"Test Workgroup",
            "Description":"Test Description",
            "Prioritization":"Due Date",
            "TasksAssigned":0,
            "ETag":"00000000-0000-0000-dd78-ce22fbe701d7",
            "ReservationTimeLimit":2,                    
        },
        "RequestId":"0HMDBHV7VOIK8:00000009",
        "APIVersion":"Unknown",
        "DatabaseVersion":7
    };
}

//#endregion Model setup