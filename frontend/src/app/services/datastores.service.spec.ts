import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { DataStoresService } from './datastores.service';
import { DataStoreStateService, DataStore, DataGroup, DataPoint } from './datastore-state.service';

describe('DataStoresService', () => {
  let service: DataStoresService;
  let httpMock: HttpTestingController;
  let stateService: DataStoreStateService;

  const mockDataStore: DataStore = {
    id: '1',
    name: 'Test Store',
    description: 'Test Description',
    noOfTimesUsed: 0,
    dataGroups: []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataStoresService,
        DataStoreStateService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(DataStoresService);
    httpMock = TestBed.inject(HttpTestingController);
    stateService = TestBed.inject(DataStoreStateService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllDataStores', () => {
    it('should fetch all datastores and update state', () => {
      const mockDataStores: DataStore[] = [mockDataStore];

      service.getAllDataStores('user1').subscribe(dataStores => {
        expect(dataStores).toEqual(mockDataStores);
        expect(stateService.getDataStores()).toEqual(mockDataStores);
      });

      const req = httpMock.expectOne('/api/users/user1/datastores');
      expect(req.request.method).toBe('GET');
      req.flush(mockDataStores);
    });

    it('should set loading state', () => {
      const mockDataStores: DataStore[] = [mockDataStore];
      let loadingStates: boolean[] = [];

      stateService.loading$.subscribe(loading => {
        loadingStates.push(loading);
      });

      service.getAllDataStores('user1').subscribe();

      const req = httpMock.expectOne('/api/users/user1/datastores');
      req.flush(mockDataStores);

      expect(loadingStates).toContain(true);
      expect(loadingStates).toContain(false);
    });
  });

  describe('getDataStoreById', () => {
    it('should fetch a single datastore by id', () => {
      service.getDataStoreById('user1', '1').subscribe(dataStore => {
        expect(dataStore).toEqual(mockDataStore);
        expect(stateService.getSelectedDataStore()).toEqual(mockDataStore);
      });

      const req = httpMock.expectOne('/api/users/user1/datastores/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockDataStore);
    });
  });

  describe('createDataStore', () => {
    it('should create a new datastore', () => {
      const newDataStore = {
        name: 'New Store',
        description: 'New Description'
      };

      service.createDataStore('user1', newDataStore).subscribe(dataStore => {
        expect(dataStore).toEqual(mockDataStore);
      });

      const req = httpMock.expectOne('/api/users/user1/datastores');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newDataStore);
      req.flush(mockDataStore);
    });

    it('should add created datastore to state', () => {
      const newDataStore = {
        name: 'New Store',
        description: 'New Description'
      };

      service.createDataStore('user1', newDataStore).subscribe();

      const req = httpMock.expectOne('/api/users/user1/datastores');
      req.flush(mockDataStore);

      const dataStores = stateService.getDataStores();
      expect(dataStores).toContain(mockDataStore);
    });
  });

  describe('updateDataStore', () => {
    it('should update an existing datastore', () => {
      service.updateDataStore('user1', '1', mockDataStore).subscribe(dataStore => {
        expect(dataStore).toEqual(mockDataStore);
      });

      const req = httpMock.expectOne('/api/users/user1/datastores/1');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockDataStore);
      req.flush(mockDataStore);
    });
  });

  describe('deleteDataStore', () => {
    it('should delete a datastore', () => {
      service.deleteDataStore('user1', '1').subscribe();

      const req = httpMock.expectOne('/api/users/user1/datastores/1');
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('addDataGroup', () => {
    it('should add a top-level data group', () => {
      const mockGroup: DataGroup = {
        id: 'group1',
        name: 'Test Group',
        description: 'Test',
        orderIndex: 0,
        dataPoints: [],
        childGroups: []
      };

      service.addDataGroup('user1', '1', mockGroup).subscribe(group => {
        expect(group).toEqual(mockGroup);
      });

      const req = httpMock.expectOne('/api/users/user1/datastores/1/datagroups');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockGroup);
      req.flush(mockGroup);
    });

    it('should add a nested data group with parentGroupId', () => {
      const mockGroup: DataGroup = {
        id: 'group2',
        name: 'Child Group',
        description: 'Test',
        orderIndex: 0,
        dataPoints: [],
        childGroups: []
      };

      service.addDataGroup('user1', '1', mockGroup, 'parent1').subscribe();

      const req = httpMock.expectOne('/api/users/user1/datastores/1/datagroups?parentGroupId=parent1');
      expect(req.request.method).toBe('POST');
      req.flush(mockGroup);
    });
  });

  describe('addDataPoint', () => {
    it('should add a data point to a group', () => {
      const mockPoint: DataPoint = {
        id: 'point1',
        name: 'Test Point',
        description: 'Test',
        dataType: 'String',
        orderIndex: 0,
        configuration: {
          mode: 'Basic',
          allowMultiLine: false
        }
      };

      service.addDataPoint('user1', '1', 'group1', mockPoint).subscribe(point => {
        expect(point).toEqual(mockPoint);
      });

      const req = httpMock.expectOne('/api/users/user1/datastores/1/datagroups/group1/datapoints');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockPoint);
      req.flush(mockPoint);
    });
  });

  describe('updateDataGroup', () => {
    it('should update a data group', () => {
      const mockGroup: DataGroup = {
        id: 'group1',
        name: 'Updated Group',
        description: 'Updated',
        orderIndex: 0,
        dataPoints: [],
        childGroups: []
      };

      service.updateDataGroup('user1', '1', 'group1', mockGroup).subscribe();

      const req = httpMock.expectOne('/api/users/user1/datastores/1/datagroups/group1');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockGroup);
      req.flush(null);
    });
  });

  describe('updateDataPoint', () => {
    it('should update a data point', () => {
      const mockPoint: DataPoint = {
        id: 'point1',
        name: 'Updated Point',
        description: 'Updated',
        dataType: 'Integer',
        orderIndex: 0,
        configuration: {
          mode: 'Advanced',
          allowMultiLine: false
        }
      };

      service.updateDataPoint('user1', '1', 'point1', mockPoint).subscribe();

      const req = httpMock.expectOne('/api/users/user1/datastores/1/datapoints/point1');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockPoint);
      req.flush(null);
    });
  });

  describe('deleteDataGroup', () => {
    it('should delete a data group', () => {
      service.deleteDataGroup('user1', '1', 'group1').subscribe();

      const req = httpMock.expectOne('/api/users/user1/datastores/1/datagroups/group1');
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('deleteDataPoint', () => {
    it('should delete a data point', () => {
      service.deleteDataPoint('user1', '1', 'point1').subscribe();

      const req = httpMock.expectOne('/api/users/user1/datastores/1/datapoints/point1');
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
