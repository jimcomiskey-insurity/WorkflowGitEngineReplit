import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStoresService } from '../services/datastores.service';
import { DataStoreStateService, DataStore } from '../services/datastore-state.service';

@Component({
  selector: 'app-datastores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="datastores-container">
      <div class="header">
        <h1>Data Stores</h1>
        <button class="create-btn" (click)="showCreateModal = true">+ Create Data Store</button>
      </div>

      <div class="search-box">
        <input 
          type="text" 
          [(ngModel)]="searchTerm" 
          placeholder="Filter Data Stores"
          class="search-input"
        />
      </div>

      <div class="count">{{ filteredDataStores.length }} Data Stores</div>

      <table class="datastores-table">
        <thead>
          <tr>
            <th class="sortable" (click)="sortBy('name')">
              Name
              <span class="sort-icon" *ngIf="sortColumn === 'name'">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th class="sortable" (click)="sortBy('description')">
              Description
              <span class="sort-icon" *ngIf="sortColumn === 'description'">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th class="sortable" (click)="sortBy('noOfTimesUsed')">
              Times Used
              <span class="sort-icon" *ngIf="sortColumn === 'noOfTimesUsed'">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let dataStore of filteredDataStores" 
              class="datastore-row" 
              (click)="openDataStore(dataStore)">
            <td class="name-cell">
              <span class="datastore-icon">📦</span>
              {{ dataStore.name }}
            </td>
            <td>{{ dataStore.description || '' }}</td>
            <td class="center">{{ dataStore.noOfTimesUsed }}</td>
          </tr>
        </tbody>
      </table>

      <div *ngIf="filteredDataStores.length === 0" class="empty-state">
        <p>No Data Stores found</p>
      </div>
    </div>

    <div class="modal" *ngIf="showCreateModal" (click)="closeModal($event)">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <h2>Add Data Store</h2>
        
        <div class="form-group">
          <label>Name</label>
          <input 
            type="text" 
            [(ngModel)]="newDataStore.name"
            class="form-input"
            placeholder="Enter name"
          />
        </div>

        <div class="form-group">
          <label>Description</label>
          <input 
            type="text" 
            [(ngModel)]="newDataStore.description"
            class="form-input"
            placeholder="Enter description"
          />
        </div>

        <div class="modal-actions">
          <button class="create-btn" (click)="createDataStore()">Create Data Store</button>
          <button class="cancel-btn" (click)="showCreateModal = false">Cancel</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .datastores-container {
      padding: 2rem;
      background: #1e1e1e;
      min-height: 100vh;
      color: #fff;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    h1 {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
    }

    .create-btn {
      background: #e91e63;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .create-btn:hover {
      background: #c2185b;
    }

    .search-box {
      margin-bottom: 1rem;
    }

    .search-input {
      width: 300px;
      padding: 0.5rem;
      background: #2d2d2d;
      border: 1px solid #444;
      border-radius: 4px;
      color: #fff;
      font-size: 0.9rem;
    }

    .count {
      margin-bottom: 0.5rem;
      color: #999;
      font-size: 0.9rem;
    }

    .datastores-table {
      width: 100%;
      border-collapse: collapse;
      background: #2d2d2d;
    }

    thead {
      background: #252525;
    }

    th {
      text-align: left;
      padding: 0.75rem;
      font-weight: 500;
      border-bottom: 1px solid #444;
      cursor: pointer;
    }

    th.sortable:hover {
      background: #2d2d2d;
    }

    .sort-icon {
      margin-left: 0.5rem;
      color: #e91e63;
    }

    td {
      padding: 0.75rem;
      border-bottom: 1px solid #444;
    }

    .datastore-row {
      cursor: pointer;
    }

    .datastore-row:hover {
      background: #333;
    }

    .name-cell {
      color: #4fc3f7;
      font-weight: 500;
    }

    .datastore-icon {
      margin-right: 0.5rem;
    }

    .center {
      text-align: center;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #999;
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: #2d2d2d;
      padding: 2rem;
      border-radius: 8px;
      width: 400px;
      max-width: 90%;
    }

    .modal-content h2 {
      margin-top: 0;
      font-size: 1.25rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .form-input {
      width: 100%;
      padding: 0.5rem;
      background: #1e1e1e;
      border: 1px solid #444;
      border-radius: 4px;
      color: #fff;
      font-size: 0.9rem;
    }

    .modal-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .cancel-btn {
      background: transparent;
      color: #fff;
      border: 1px solid #666;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .cancel-btn:hover {
      background: #333;
    }
  `]
})
export class DataStoresComponent implements OnInit {
  private dataStoresService = inject(DataStoresService);
  private stateService = inject(DataStoreStateService);
  private router = inject(Router);

  dataStores: DataStore[] = [];
  filteredDataStores: DataStore[] = [];
  searchTerm = '';
  sortColumn = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  showCreateModal = false;
  newDataStore = {
    name: '',
    description: ''
  };

  currentUser = 'user1';

  ngOnInit(): void {
    this.loadDataStores();
    
    this.stateService.dataStores$.subscribe(dataStores => {
      this.dataStores = dataStores;
      this.applyFilter();
    });
  }

  loadDataStores(): void {
    this.dataStoresService.getAllDataStores(this.currentUser).subscribe();
  }

  applyFilter(): void {
    let filtered = [...this.dataStores];
    
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(ds => 
        ds.name.toLowerCase().includes(term) ||
        ds.description?.toLowerCase().includes(term)
      );
    }

    filtered.sort((a, b) => {
      let aVal: any = a[this.sortColumn as keyof DataStore];
      let bVal: any = b[this.sortColumn as keyof DataStore];
      
      if (aVal === undefined) aVal = '';
      if (bVal === undefined) bVal = '';
      
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      
      if (this.sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    this.filteredDataStores = filtered;
  }

  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilter();
  }

  createDataStore(): void {
    if (!this.newDataStore.name.trim()) {
      return;
    }

    this.dataStoresService.createDataStore(this.currentUser, {
      ...this.newDataStore,
      noOfTimesUsed: 0,
      dataGroups: []
    }).subscribe(() => {
      this.showCreateModal = false;
      this.newDataStore = { name: '', description: '' };
      this.loadDataStores();
    });
  }

  openDataStore(dataStore: DataStore): void {
    this.router.navigate(['/datastores', dataStore.id]);
  }

  closeModal(event: MouseEvent): void {
    this.showCreateModal = false;
  }
}
