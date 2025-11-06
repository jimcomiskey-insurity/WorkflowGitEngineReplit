import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface DataStore {
  id: string;
  name: string;
  description?: string;
  noOfTimesUsed: number;
  aliases?: string[];
  dataGroups: DataGroup[];
}

export interface DataGroup {
  id: string;
  name: string;
  description?: string;
  tag?: string;
  parentId?: string;
  orderIndex: number;
  dataPoints: DataPoint[];
  childGroups: DataGroup[];
}

export interface DataPoint {
  id: string;
  name: string;
  description?: string;
  tag?: string;
  dataType: string;
  orderIndex: number;
  configuration: DataPointConfiguration;
}

export interface DataPointConfiguration {
  mode: string;
  defaultValue?: string;
  allowMultiLine: boolean;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  decimalPlaces?: number;
  format?: string;
  allowedValues?: string[];
  additionalProperties?: { [key: string]: any };
}

@Injectable({
  providedIn: 'root'
})
export class DataStoreStateService {
  private dataStoresSubject = new BehaviorSubject<DataStore[]>([]);
  public dataStores$ = this.dataStoresSubject.asObservable();

  private selectedDataStoreSubject = new BehaviorSubject<DataStore | null>(null);
  public selectedDataStore$ = this.selectedDataStoreSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  setDataStores(dataStores: DataStore[]): void {
    this.dataStoresSubject.next(dataStores);
  }

  getDataStores(): DataStore[] {
    return this.dataStoresSubject.getValue();
  }

  setSelectedDataStore(dataStore: DataStore | null): void {
    this.selectedDataStoreSubject.next(dataStore);
  }

  getSelectedDataStore(): DataStore | null {
    return this.selectedDataStoreSubject.getValue();
  }

  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  addDataStore(dataStore: DataStore): void {
    const current = this.dataStoresSubject.getValue();
    this.dataStoresSubject.next([...current, dataStore]);
  }

  updateDataStore(dataStore: DataStore): void {
    const current = this.dataStoresSubject.getValue();
    const index = current.findIndex(ds => ds.id === dataStore.id);
    if (index !== -1) {
      current[index] = dataStore;
      this.dataStoresSubject.next([...current]);
      
      if (this.selectedDataStoreSubject.getValue()?.id === dataStore.id) {
        this.selectedDataStoreSubject.next(dataStore);
      }
    }
  }

  deleteDataStore(id: string): void {
    const current = this.dataStoresSubject.getValue();
    this.dataStoresSubject.next(current.filter(ds => ds.id !== id));
    
    if (this.selectedDataStoreSubject.getValue()?.id === id) {
      this.selectedDataStoreSubject.next(null);
    }
  }
}
