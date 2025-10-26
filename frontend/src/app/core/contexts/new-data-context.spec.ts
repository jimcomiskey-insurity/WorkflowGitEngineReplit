import { Task, Workflow } from '@Core/models/codegen/configuration.models';
import { NewDataContext } from './new-data-context';
import { BaseModel } from '@Core/models/model';
import { DataContextCollection } from './data-context-collection';

describe('New Data Context', () => {
    describe('getEntity()', () => {
        it('the context will call the API when the entity hasnt been loaded', () => {
            var collection = new FakeNewDataContextCollection(FakeNewDataContext);
            var context = collection.get("revisionId");
            spyOn(context, 'fakeAPILoadSingleTask');

            context.getEntity(new Task(), "fakeDomainId", true);
            expect(context.fakeAPILoadSingleTask).toHaveBeenCalled()
        });    
        it('the context will NOT call the API if the entity has been loaded', () => {
            var collection = new FakeNewDataContextCollection(FakeNewDataContext);
            var context = collection.get("revisionId");
            // "Load" the Phase
            context.getEntity(new Task(), "fakeDomainId", true);

            // Now start spying and try to reload the Task
            spyOn(context, 'fakeAPILoadSingleTask');
            context.getEntity(new Task(), "fakeDomainId", true);
            expect(context.fakeAPILoadSingleTask).not.toHaveBeenCalled()
        }); 
        it('the context will correctly load the entity', () => {
            var collection = new FakeNewDataContextCollection(FakeNewDataContext);
            var context = collection.get("revisionId");

            context.getEntity(new Task(), "Configuration#bfe8466f-63a6-46a0-acf5-7efef3947621", true).subscribe(response => {
                expect(response as Task).not.toBe(null);
                expect((response as Task).Id).toBe("bfe8466f-63a6-46a0-acf5-7efef3947621");
            })
        });  
    });
    describe('getEntityList()', () => {
        it('the context will call the API when the entities havent been loaded', () => {
            var collection = new FakeNewDataContextCollection(FakeNewDataContext);
            var context = collection.get("revisionId");
            spyOn(context, 'fakeAPILoadWorkflows');

            context.getEntityList(new Workflow(), true);
            expect(context.fakeAPILoadWorkflows).toHaveBeenCalled()
        });
        it('the context will NOT call the API if the entities have been loaded', () => {
            var collection = new FakeNewDataContextCollection(FakeNewDataContext);
            var context = collection.get("revisionId");

            // "Load" the Workflows
            context.getEntityList(new Workflow(), true);

            // Now start spying and try to reload the Workflows
            spyOn(context, 'fakeAPILoadWorkflows');
            context.getEntityList(new Workflow(), true);

            // The API won't be called because the workflows have already been loaded
            expect(context.fakeAPILoadWorkflows).not.toHaveBeenCalled()
        });
        it('the context will call the API for a list of entities if only single entities (via getEntity()) have been loaded', () => {
            var collection = new FakeNewDataContextCollection(FakeNewDataContext);
            var context = collection.get("revisionId");
            spyOn(context, 'fakeAPILoadWorkflows');

            // Load a single Workflow
            context.getEntity(new Workflow(), "Configuration#451a5072-6b4d-44aa-9e90-dd03bf302276", true);

            // Now, try to load all Workflows. The API should still be called
            context.getEntityList(new Workflow(), true);
            expect(context.fakeAPILoadWorkflows).toHaveBeenCalled()
        });
        it('the context will correctly load the entities', () => {
            var collection = new FakeNewDataContextCollection(FakeNewDataContext);
            var context = collection.get("revisionId");

            context.getEntityList(new Workflow(), true).values.subscribe(response => {
                var workflows = response as Workflow[];
                expect(workflows.length).toBe(3);
                expect(workflows[0].DomainType).toBe((new Workflow()).DomainType);
            })
        });    
    });
    describe('get()', () => {
        it('get an entity that hasnt been loaded will return null', () => {
            var collection = new FakeNewDataContextCollection(FakeNewDataContext);
            var context = collection.get("revisionId")
            context.getEntity(new Task(), "Configuration#bfe8466f-63a6-46a0-acf5-7efef3947621");

            expect(context.get("domainId2")).toBe(null);
        });
        it('get an entity that has been loaded', () => {
            var collection = new FakeNewDataContextCollection(FakeNewDataContext);
            var context = collection.get("revisionId");
            context.getEntity(new Task(), "Configuration#bfe8466f-63a6-46a0-acf5-7efef3947621");

            var task = context.get("Configuration#bfe8466f-63a6-46a0-acf5-7efef3947621");
            expect(task.Id).not.toBe(null);
        });
    });
    
});


export class FakeNewDataContext extends NewDataContext {
    constructor(public revisionId: string) {
        super(revisionId);
    }

    protected loadDataItem<T extends BaseModel>(domainId: string, type: BaseModel, keepSubscriptionOpen: boolean = true) {
        if(type instanceof Task)
            this.fakeAPILoadSingleTask(this, domainId);
        if (type instanceof Workflow)
            this.fakeAPILoadSingleWorkflow(this, domainId);
    }

    protected loadData<T extends BaseModel>(type: BaseModel, keepSubscriptionOpen: boolean = true) {
        if (type instanceof Task)
            return;
        if (type instanceof Workflow)
            this.fakeAPILoadWorkflows(this);
    }    

    public fakeAPILoadSingleTask(context: FakeNewDataContext, domainId: string) { 
        context.deserializeSingleObject(Task, {
            '@Type':'TaskApplication','Id':'bfe8466f-63a6-46a0-acf5-7efef3947621',
            'PartitionKey':'b48e8342-7719-4f27-8673-6a702a92330a',
            'ApplicationDefinitionKey':'26053c74-1f14-4238-bae3-521257a24556',
            'Name':'BasicCommitment','TaskType':'Application',
            'Description':'Workflow Commitment','ObligationStatus':'Required',
            'Change':'5e3724f0-c90c-407b-b7c5-7d7c79bcca97','DefaultAssignee':'78c70299-1566-4083-b00d-b01ff1b5ef28',
            'AutoComplete':true,'AutoDefer':false,'AutoExecute':false,'Waivable':false,
            '#Key':'f1354794-78ee-4665-a9f5-6ad22b21a3ff','ETag':'38008670-0000-0300-0000-5ea746b40000','#OrderNum':0 
        });
    }

    public fakeAPILoadSingleWorkflow(context: FakeNewDataContext, domainId: string) {
        context.loadModelsIntoContext(Workflow, {
            '@Type':'Workflow','Id':'451a5072-6b4d-44aa-9e90-dd03bf302276',
            'PartitionKey':'b48e8342-7719-4f27-8673-6a702a92330a',
            'CanStartStatus':[''],'AddedInChange':'5e3724f0-c90c-407b-b7c5-7d7c79bcca97',
            'Abbr':'SC','Name':'Simple Cancellation','Description':'Simple Cancellation Description',
            '#Deleted':false,'#CreatedDate':'2020-04-27T20:35:07.8833614Z',
            '#CreatedBy':'65b46f9b-7ea1-49e4-8df9-5dfc801c6e5b','OnStartWorkflowSetStatus':'',
            'OnStopWorkflowSetStatus':'','Transactional':true,'ETag':'38003c72-0000-0300-0000-5ea746b80000'
        });
    }

    public fakeAPILoadWorkflows(context: FakeNewDataContext) {
        context.loadModelsIntoContext(Workflow, this.getWorkflows());
    }

    getWorkflows() {
        return [
            {
                '@Type':'Workflow','Id':'451a5072-6b4d-44aa-9e90-dd03bf302276',
                'PartitionKey':'b48e8342-7719-4f27-8673-6a702a92330a',
                'CanStartStatus':[''],'AddedInChange':'5e3724f0-c90c-407b-b7c5-7d7c79bcca97',
                'Abbr':'SC','Name':'Simple Cancellation','Description':'Simple Cancellation Description',
                '#Deleted':false,'#CreatedDate':'2020-04-27T20:35:07.8833614Z',
                '#CreatedBy':'65b46f9b-7ea1-49e4-8df9-5dfc801c6e5b','OnStartWorkflowSetStatus':'',
                'OnStopWorkflowSetStatus':'','Transactional':true,'ETag':'38003c72-0000-0300-0000-5ea746b80000'
            }, 
            {
                '@Type':'Workflow','Id':'1252d1d6-1277-4f18-8c6e-ed6fc0509f81',
                'PartitionKey':'b48e8342-7719-4f27-8673-6a702a92330a','CanStartStatus':[''],
                'AddedInChange':'5e3724f0-c90c-407b-b7c5-7d7c79bcca97','Abbr':'TD','Name':'Test Dependencies',
                'Description':'Test Dependencies Transaction','#Deleted':false,
                '#CreatedDate':'2020-04-27T20:35:01.7455562Z',
                '#CreatedBy':'65b46f9b-7ea1-49e4-8df9-5dfc801c6e5b',
                'OnStartWorkflowSetStatus':'','OnStopWorkflowSetStatus':'',
                'Transactional':true,'ETag':'38003b72-0000-0300-0000-5ea746b80000'
            },
            {
                '@Type':'Workflow','Id':'1029c469-89dc-4f7c-829f-6c476ed00b64',
                'PartitionKey':'b48e8342-7719-4f27-8673-6a702a92330a','CanStartStatus':[''],
                'AddedInChange':'5e3724f0-c90c-407b-b7c5-7d7c79bcca97','Abbr':'TC','Name':'Test Commitment',
                'Description':'Test Commitment','#Deleted':false,
                '#CreatedDate':'2020-04-27T20:34:59.5796912Z',
                '#CreatedBy':'65b46f9b-7ea1-49e4-8df9-5dfc801c6e5b',
                'OnStartWorkflowSetStatus':'','OnStopWorkflowSetStatus':'',
                'Transactional':true,'ETag':'38003a72-0000-0300-0000-5ea746b80000'
            }];
    }
}

export class FakeNewDataContextCollection extends DataContextCollection<FakeNewDataContext> {
    //Overload to use the ProgramRevisionWorkflowService
    public get(id: string): FakeNewDataContext {
        let dataContext: FakeNewDataContext = this.dataContexts.get(id);
        if (!dataContext) {
            // If a data context doesn't already exist for this ID, just create a new one.
            dataContext = new this.typeCtor(id);
            dataContext.collection = this;
            this.dataContexts.set(id, dataContext);

            // Create the initial timer to clear the context after the timer ends
            this.timers[id] = setTimeout(() => { dataContext.clearAll()}, this.interval)
        }
        this.size;
        return dataContext;
    }
}
