import { TestBed } from '@angular/core/testing';
import { DataStoreStateService, DataStore, DataGroup, DataPoint } from './datastore-state.service';

describe('DataStoreStateService', () => {
  let service: DataStoreStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataStoreStateService]
    });
    service = TestBed.inject(DataStoreStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty dataStores', (done) => {
    service.dataStores$.subscribe(dataStores => {
      expect(dataStores).toEqual([]);
      done();
    });
  });

  it('should set and get dataStores', () => {
    const testDataStores: DataStore[] = [
      {
        id: '1',
        name: 'Test Store 1',
        description: 'Description 1',
        noOfTimesUsed: 0,
        dataGroups: []
      },
      {
        id: '2',
        name: 'Test Store 2',
        description: 'Description 2',
        noOfTimesUsed: 5,
        dataGroups: []
      }
    ];

    service.setDataStores(testDataStores);
    const result = service.getDataStores();

    expect(result).toEqual(testDataStores);
    expect(result.length).toBe(2);
  });

  it('should emit dataStores changes', (done) => {
    const testDataStores: DataStore[] = [
      {
        id: '1',
        name: 'Test Store',
        description: 'Description',
        noOfTimesUsed: 0,
        dataGroups: []
      }
    ];

    service.dataStores$.subscribe(dataStores => {
      if (dataStores.length > 0) {
        expect(dataStores).toEqual(testDataStores);
        done();
      }
    });

    service.setDataStores(testDataStores);
  });

  it('should add a dataStore', () => {
    const newDataStore: DataStore = {
      id: '1',
      name: 'New Store',
      description: 'New Description',
      noOfTimesUsed: 0,
      dataGroups: []
    };

    service.addDataStore(newDataStore);
    const result = service.getDataStores();

    expect(result.length).toBe(1);
    expect(result[0]).toEqual(newDataStore);
  });

  it('should update a dataStore', () => {
    const initialDataStore: DataStore = {
      id: '1',
      name: 'Original Name',
      description: 'Original Description',
      noOfTimesUsed: 0,
      dataGroups: []
    };

    service.setDataStores([initialDataStore]);

    const updatedDataStore: DataStore = {
      id: '1',
      name: 'Updated Name',
      description: 'Updated Description',
      noOfTimesUsed: 10,
      dataGroups: []
    };

    service.updateDataStore(updatedDataStore);
    const result = service.getDataStores();

    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Updated Name');
    expect(result[0].description).toBe('Updated Description');
    expect(result[0].noOfTimesUsed).toBe(10);
  });

  it('should delete a dataStore', () => {
    const dataStore1: DataStore = {
      id: '1',
      name: 'Store 1',
      description: 'Description 1',
      noOfTimesUsed: 0,
      dataGroups: []
    };

    const dataStore2: DataStore = {
      id: '2',
      name: 'Store 2',
      description: 'Description 2',
      noOfTimesUsed: 0,
      dataGroups: []
    };

    service.setDataStores([dataStore1, dataStore2]);
    service.deleteDataStore('1');
    const result = service.getDataStores();

    expect(result.length).toBe(1);
    expect(result[0].id).toBe('2');
  });

  it('should set and get selected dataStore', () => {
    const dataStore: DataStore = {
      id: '1',
      name: 'Selected Store',
      description: 'Description',
      noOfTimesUsed: 0,
      dataGroups: []
    };

    service.setSelectedDataStore(dataStore);
    const result = service.getSelectedDataStore();

    expect(result).toEqual(dataStore);
  });

  it('should emit selected dataStore changes', (done) => {
    const dataStore: DataStore = {
      id: '1',
      name: 'Selected Store',
      description: 'Description',
      noOfTimesUsed: 0,
      dataGroups: []
    };

    service.selectedDataStore$.subscribe(selected => {
      if (selected) {
        expect(selected).toEqual(dataStore);
        done();
      }
    });

    service.setSelectedDataStore(dataStore);
  });

  it('should update selected dataStore when updateDataStore is called', () => {
    const initialDataStore: DataStore = {
      id: '1',
      name: 'Original Name',
      description: 'Original Description',
      noOfTimesUsed: 0,
      dataGroups: []
    };

    service.setDataStores([initialDataStore]);
    service.setSelectedDataStore(initialDataStore);

    const updatedDataStore: DataStore = {
      id: '1',
      name: 'Updated Name',
      description: 'Updated Description',
      noOfTimesUsed: 5,
      dataGroups: []
    };

    service.updateDataStore(updatedDataStore);
    const result = service.getSelectedDataStore();

    expect(result?.name).toBe('Updated Name');
    expect(result?.noOfTimesUsed).toBe(5);
  });

  it('should clear selected dataStore when it is deleted', () => {
    const dataStore: DataStore = {
      id: '1',
      name: 'To Delete',
      description: 'Description',
      noOfTimesUsed: 0,
      dataGroups: []
    };

    service.setDataStores([dataStore]);
    service.setSelectedDataStore(dataStore);
    service.deleteDataStore('1');

    const result = service.getSelectedDataStore();
    expect(result).toBeNull();
  });

  it('should set and get loading state', () => {
    service.setLoading(true);
    
    service.loading$.subscribe(loading => {
      expect(loading).toBe(true);
    });

    service.setLoading(false);
    
    service.loading$.subscribe(loading => {
      expect(loading).toBe(false);
    });
  });
});
