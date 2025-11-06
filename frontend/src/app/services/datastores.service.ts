import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataStore, DataGroup, DataPoint, DataStoreStateService } from './datastore-state.service';
import { GitStateService } from './git-state.service';

@Injectable({
  providedIn: 'root'
})
export class DataStoresService {
  private http = inject(HttpClient);
  private stateService = inject(DataStoreStateService);
  private gitStateService = inject(GitStateService);
  private apiUrl = '/api';

  getAllDataStores(userId: string): Observable<DataStore[]> {
    this.stateService.setLoading(true);
    return this.http.get<DataStore[]>(`${this.apiUrl}/users/${userId}/datastores`).pipe(
      tap(dataStores => {
        this.stateService.setDataStores(dataStores);
        this.stateService.setLoading(false);
      })
    );
  }

  getDataStoreById(userId: string, id: string): Observable<DataStore> {
    return this.http.get<DataStore>(`${this.apiUrl}/users/${userId}/datastores/${id}`).pipe(
      tap(dataStore => {
        this.stateService.setSelectedDataStore(dataStore);
      })
    );
  }

  createDataStore(userId: string, dataStore: Partial<DataStore>): Observable<DataStore> {
    return this.http.post<DataStore>(`${this.apiUrl}/users/${userId}/datastores`, dataStore).pipe(
      tap(createdDataStore => {
        this.stateService.addDataStore(createdDataStore);
        this.gitStateService.refresh();
      })
    );
  }

  updateDataStore(userId: string, id: string, dataStore: DataStore): Observable<DataStore> {
    return this.http.put<DataStore>(`${this.apiUrl}/users/${userId}/datastores/${id}`, dataStore).pipe(
      tap(updatedDataStore => {
        this.stateService.updateDataStore(updatedDataStore);
        this.gitStateService.refresh();
      })
    );
  }

  deleteDataStore(userId: string, id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${userId}/datastores/${id}`).pipe(
      tap(() => {
        this.stateService.deleteDataStore(id);
        this.gitStateService.refresh();
      })
    );
  }

  addDataGroup(userId: string, dataStoreId: string, dataGroup: Partial<DataGroup>, parentGroupId?: string): Observable<DataGroup> {
    const params = parentGroupId ? { parentGroupId } : {};
    return this.http.post<DataGroup>(
      `${this.apiUrl}/users/${userId}/datastores/${dataStoreId}/datagroups`,
      dataGroup,
      { params }
    ).pipe(
      tap(() => this.gitStateService.refresh())
    );
  }

  addDataPoint(userId: string, dataStoreId: string, dataGroupId: string, dataPoint: Partial<DataPoint>): Observable<DataPoint> {
    return this.http.post<DataPoint>(
      `${this.apiUrl}/users/${userId}/datastores/${dataStoreId}/datagroups/${dataGroupId}/datapoints`,
      dataPoint
    ).pipe(
      tap(() => this.gitStateService.refresh())
    );
  }

  updateDataGroup(userId: string, dataStoreId: string, dataGroupId: string, dataGroup: DataGroup): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/users/${userId}/datastores/${dataStoreId}/datagroups/${dataGroupId}`,
      dataGroup
    ).pipe(
      tap(() => this.gitStateService.refresh())
    );
  }

  updateDataPoint(userId: string, dataStoreId: string, dataPointId: string, dataPoint: DataPoint): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/users/${userId}/datastores/${dataStoreId}/datapoints/${dataPointId}`,
      dataPoint
    ).pipe(
      tap(() => this.gitStateService.refresh())
    );
  }

  deleteDataGroup(userId: string, dataStoreId: string, dataGroupId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/users/${userId}/datastores/${dataStoreId}/datagroups/${dataGroupId}`
    ).pipe(
      tap(() => this.gitStateService.refresh())
    );
  }

  deleteDataPoint(userId: string, dataStoreId: string, dataPointId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/users/${userId}/datastores/${dataStoreId}/datapoints/${dataPointId}`
    ).pipe(
      tap(() => this.gitStateService.refresh())
    );
  }
}
