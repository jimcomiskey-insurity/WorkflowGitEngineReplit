import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStoresService } from '../services/datastores.service';
import { DataStoreStateService, DataStore, DataGroup, DataPoint } from '../services/datastore-state.service';

interface TreeNode {
  id: string;
  name: string;
  type: 'group' | 'point';
  icon: string;
  data: DataGroup | DataPoint;
  parentId?: string;
  expanded: boolean;
  children: TreeNode[];
}

@Component({
  selector: 'app-datastore-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="editor-container">
      <div class="editor-header">
        <button class="back-btn" (click)="goBack()">← Back to Data Stores</button>
        <h1>{{ dataStore?.name || 'Loading...' }}</h1>
      </div>

      <div class="editor-content">
        <div class="tree-panel">
          <div class="tree-header">
            <input 
              type="text" 
              [(ngModel)]="filterText"
              (ngModelChange)="applyFilter()"
              placeholder="Filter By Name"
              class="filter-input"
            />
          </div>

          <div class="tree-content">
            <div *ngFor="let node of filteredTree" class="tree-node-wrapper">
              <div 
                class="tree-node" 
                [class.selected]="selectedNode?.id === node.id"
                [style.padding-left.px]="0"
                (click)="selectNode(node)">
                
                <span class="expand-icon" (click)="toggleExpand(node, $event)" *ngIf="node.type === 'group'">
                  {{ node.expanded ? '−' : '+' }}
                </span>
                <span class="expand-icon-placeholder" *ngIf="node.type === 'point'"></span>
                
                <span class="node-icon">{{ node.icon }}</span>
                <span class="node-name">{{ node.name }}</span>
                
                <button 
                  class="node-menu-btn" 
                  (click)="toggleMenu(node, $event)"
                  *ngIf="node.type === 'group'">
                  ⋯
                </button>
              </div>

              <div *ngIf="node.expanded && node.children.length > 0" class="tree-children">
                <ng-container *ngTemplateOutlet="treeNodeTemplate; context: { nodes: node.children, level: 1 }"></ng-container>
              </div>

              <div class="context-menu" *ngIf="showMenuForNode === node.id" (click)="$event.stopPropagation()">
                <div class="menu-item" (click)="addNestedGroup(node)">Add Nested DataGroup</div>
                <div class="menu-item" (click)="addDataPoint(node)">Add DataPoint</div>
              </div>
            </div>
          </div>

          <div class="tree-footer">
            <button class="add-group-btn" (click)="addTopLevelGroup()">+ Add Top-Level Data Group</button>
          </div>
        </div>

        <div class="detail-panel">
          <div *ngIf="!selectedNode" class="empty-state">
            Select a Data Point or Group from the list to edit
          </div>

          <div *ngIf="selectedNode && selectedNode.type === 'group'" class="detail-form">
            <div class="breadcrumb">
              Ancestry > {{ getBreadcrumb(selectedNode) }}
            </div>

            <div class="form-group">
              <label>Name</label>
              <input 
                type="text" 
                [(ngModel)]="editingGroup.name"
                (ngModelChange)="saveGroup()"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label>Description</label>
              <textarea 
                [(ngModel)]="editingGroup.description"
                (ngModelChange)="saveGroup()"
                class="form-textarea"
                rows="3"
              ></textarea>
            </div>

            <div class="form-group">
              <label>Tag</label>
              <input 
                type="text" 
                [(ngModel)]="editingGroup.tag"
                (ngModelChange)="saveGroup()"
                class="form-input"
              />
            </div>

            <button class="delete-btn" (click)="deleteGroup()">Delete Group</button>
          </div>

          <div *ngIf="selectedNode && selectedNode.type === 'point'" class="detail-form">
            <div class="breadcrumb">
              Ancestry > {{ getBreadcrumb(selectedNode) }}
            </div>

            <div class="form-group">
              <label>Name</label>
              <input 
                type="text" 
                [(ngModel)]="editingPoint.name"
                (ngModelChange)="savePoint()"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label>Description</label>
              <textarea 
                [(ngModel)]="editingPoint.description"
                (ngModelChange)="savePoint()"
                class="form-textarea"
                rows="3"
              ></textarea>
            </div>

            <div class="form-group">
              <label>Tag</label>
              <input 
                type="text" 
                [(ngModel)]="editingPoint.tag"
                (ngModelChange)="savePoint()"
                class="form-input"
              />
            </div>

            <div class="tabs">
              <button 
                class="tab" 
                [class.active]="activeTab === 'type'"
                (click)="activeTab = 'type'">
                <span class="type-icon">{{ getTypeIcon(editingPoint.dataType) }}</span>
                {{ editingPoint.dataType }}
              </button>
              <button 
                class="tab" 
                [class.active]="activeTab === 'dataflow'"
                (click)="activeTab = 'dataflow'">
                Data Flow
              </button>
            </div>

            <div *ngIf="activeTab === 'type'" class="tab-content">
              <div class="mode-selector">
                <label class="radio-option">
                  <input 
                    type="radio" 
                    [(ngModel)]="editingPoint.configuration.mode" 
                    value="Basic"
                    (ngModelChange)="savePoint()"
                  />
                  Basic
                </label>
                <label class="radio-option">
                  <input 
                    type="radio" 
                    [(ngModel)]="editingPoint.configuration.mode" 
                    value="List"
                    (ngModelChange)="savePoint()"
                  />
                  List
                </label>
                <label class="radio-option">
                  <input 
                    type="radio" 
                    [(ngModel)]="editingPoint.configuration.mode" 
                    value="Advanced"
                    (ngModelChange)="savePoint()"
                  />
                  Advanced
                </label>
              </div>

              <div class="form-group">
                <label>Default Value</label>
                <input 
                  type="text" 
                  [(ngModel)]="editingPoint.configuration.defaultValue"
                  (ngModelChange)="savePoint()"
                  class="form-input"
                />
              </div>

              <div class="form-group" *ngIf="editingPoint.dataType === 'String'">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    [(ngModel)]="editingPoint.configuration.allowMultiLine"
                    (ngModelChange)="savePoint()"
                  />
                  Allow multi-line entry
                </label>
              </div>

              <div class="form-group" *ngIf="editingPoint.dataType === 'String'">
                <label>Min Length</label>
                <input 
                  type="number" 
                  [(ngModel)]="editingPoint.configuration.minLength"
                  (ngModelChange)="savePoint()"
                  class="form-input"
                />
              </div>

              <div class="form-group" *ngIf="editingPoint.dataType === 'String'">
                <label>Max Length</label>
                <input 
                  type="number" 
                  [(ngModel)]="editingPoint.configuration.maxLength"
                  (ngModelChange)="savePoint()"
                  class="form-input"
                />
              </div>
            </div>

            <div *ngIf="activeTab === 'dataflow'" class="tab-content">
              <p class="placeholder-text">Data Flow configuration will be implemented here</p>
            </div>

            <button class="delete-btn" (click)="deletePoint()">Delete Data Point</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" *ngIf="showTypeSelector" (click)="showTypeSelector = false">
      <div class="modal-content type-selector" (click)="$event.stopPropagation()">
        <h2>Select Data Point Type</h2>
        <button class="close-btn" (click)="showTypeSelector = false">×</button>
        
        <div class="type-list">
          <div class="type-item" *ngFor="let type of dataPointTypes" (click)="selectDataPointType(type)">
            <span class="type-icon">{{ type.icon }}</span>
            <span class="type-name">{{ type.name }}</span>
          </div>
        </div>

        <button class="cancel-btn" (click)="showTypeSelector = false">Cancel</button>
      </div>
    </div>

    <ng-template #treeNodeTemplate let-nodes="nodes" let-level="level">
      <div *ngFor="let node of nodes" class="tree-node-wrapper">
        <div 
          class="tree-node" 
          [class.selected]="selectedNode?.id === node.id"
          [style.padding-left.px]="level * 20"
          (click)="selectNode(node)">
          
          <span class="expand-icon" (click)="toggleExpand(node, $event)" *ngIf="node.type === 'group'">
            {{ node.expanded ? '−' : '+' }}
          </span>
          <span class="expand-icon-placeholder" *ngIf="node.type === 'point'"></span>
          
          <span class="node-icon">{{ node.icon }}</span>
          <span class="node-name">{{ node.name }}</span>
          
          <button 
            class="node-menu-btn" 
            (click)="toggleMenu(node, $event)"
            *ngIf="node.type === 'group'">
            ⋯
          </button>
        </div>

        <div *ngIf="node.expanded && node.children.length > 0" class="tree-children">
          <ng-container *ngTemplateOutlet="treeNodeTemplate; context: { nodes: node.children, level: level + 1 }"></ng-container>
        </div>

        <div class="context-menu" *ngIf="showMenuForNode === node.id" (click)="$event.stopPropagation()">
          <div class="menu-item" (click)="addNestedGroup(node)">Add Nested DataGroup</div>
          <div class="menu-item" (click)="addDataPoint(node)">Add DataPoint</div>
        </div>
      </div>
    </ng-template>
  `,
  styleUrls: ['./datastore-editor.component.css']
})
export class DataStoreEditorComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dataStoresService = inject(DataStoresService);
  private stateService = inject(DataStoreStateService);

  dataStore: DataStore | null = null;
  tree: TreeNode[] = [];
  filteredTree: TreeNode[] = [];
  selectedNode: TreeNode | null = null;
  showMenuForNode: string | null = null;
  showTypeSelector = false;
  filterText = '';
  activeTab = 'type';
  
  editingGroup: Partial<DataGroup> = {};
  editingPoint: Partial<DataPoint> = {
    configuration: {
      mode: 'Basic',
      allowMultiLine: false
    }
  };

  pendingGroupParent: TreeNode | null = null;
  expandedNodeIds: Set<string> = new Set();

  currentUser = sessionStorage.getItem('currentUser') || 'userA';

  dataPointTypes = [
    { name: 'Date', icon: '📅', type: 'Date' },
    { name: 'Decimal', icon: '🔢', type: 'Decimal' },
    { name: 'E-mail', icon: '@', type: 'Email' },
    { name: 'Integer', icon: '🔢', type: 'Integer' },
    { name: 'List Of Strings', icon: '☰', type: 'ListOfStrings' },
    { name: 'Money', icon: '$', type: 'Money' },
    { name: 'Phone', icon: '📞', type: 'Phone' },
    { name: 'String', icon: '📝', type: 'String' },
    { name: 'Timestamp', icon: '🕐', type: 'Timestamp' },
    { name: 'Url', icon: '🔗', type: 'Url' },
    { name: 'Year', icon: '📆', type: 'Year' },
    { name: 'Yes-No', icon: 'y/n', type: 'YesNo' },
    { name: 'Zipcode', icon: '🏠', type: 'Zipcode' }
  ];

  ngOnInit(): void {
    const dataStoreId = this.route.snapshot.paramMap.get('id');
    if (dataStoreId) {
      this.loadDataStore(dataStoreId, true);
    }

    document.addEventListener('click', () => {
      this.showMenuForNode = null;
    });
  }

  loadDataStore(id: string, expandAll: boolean = false): void {
    this.dataStoresService.getDataStoreById(this.currentUser, id).subscribe(dataStore => {
      this.dataStore = dataStore;
      
      if (expandAll) {
        this.expandAllNodes(dataStore);
      }
      
      this.buildTree();
    });
  }

  expandAllNodes(dataStore: DataStore): void {
    const expandGroupRecursive = (group: DataGroup) => {
      this.expandedNodeIds.add(group.id);
      group.childGroups.forEach(child => expandGroupRecursive(child));
    };
    
    dataStore.dataGroups.forEach(group => expandGroupRecursive(group));
  }

  buildTree(): void {
    if (!this.dataStore) return;

    this.tree = this.dataStore.dataGroups.map(group => this.buildGroupNode(group));
    this.applyFilter();
  }

  buildGroupNode(group: DataGroup): TreeNode {
    const children: TreeNode[] = [
      ...group.dataPoints.map(point => this.buildPointNode(point, group.id)),
      ...group.childGroups.map(child => this.buildGroupNode(child))
    ];

    const wasExpanded = this.expandedNodeIds.has(group.id);

    return {
      id: group.id,
      name: group.name,
      type: 'group',
      icon: '📁',
      data: group,
      parentId: group.parentId,
      expanded: wasExpanded,
      children
    };
  }

  buildPointNode(point: DataPoint, parentId: string): TreeNode {
    return {
      id: point.id,
      name: point.name,
      type: 'point',
      icon: this.getTypeIcon(point.dataType),
      data: point,
      parentId,
      expanded: false,
      children: []
    };
  }

  getTypeIcon(dataType: string): string {
    const type = this.dataPointTypes.find(t => t.type === dataType);
    return type?.icon || '📝';
  }

  applyFilter(): void {
    if (!this.filterText.trim()) {
      this.filteredTree = this.tree;
    } else {
      const term = this.filterText.toLowerCase();
      this.filteredTree = this.filterTreeNodes(this.tree, term);
    }
  }

  filterTreeNodes(nodes: TreeNode[], term: string): TreeNode[] {
    return nodes.filter(node => {
      const matches = node.name.toLowerCase().includes(term);
      const hasMatchingChildren = node.children && this.filterTreeNodes(node.children, term).length > 0;
      return matches || hasMatchingChildren;
    }).map(node => ({
      ...node,
      children: this.filterTreeNodes(node.children, term)
    }));
  }

  selectNode(node: TreeNode): void {
    this.selectedNode = node;
    
    if (node.type === 'group') {
      this.editingGroup = { ...(node.data as DataGroup) };
      this.activeTab = 'type';
    } else {
      this.editingPoint = { ...(node.data as DataPoint) };
      if (!this.editingPoint.configuration) {
        this.editingPoint.configuration = {
          mode: 'Basic',
          allowMultiLine: false
        };
      }
      this.activeTab = 'type';
    }
  }

  toggleExpand(node: TreeNode, event: Event): void {
    event.stopPropagation();
    node.expanded = !node.expanded;
    
    if (node.expanded) {
      this.expandedNodeIds.add(node.id);
    } else {
      this.expandedNodeIds.delete(node.id);
    }
  }

  toggleMenu(node: TreeNode, event: Event): void {
    event.stopPropagation();
    this.showMenuForNode = this.showMenuForNode === node.id ? null : node.id;
  }

  addTopLevelGroup(): void {
    if (!this.dataStore) return;

    const newGroup: Partial<DataGroup> = {
      name: 'New Group',
      description: '',
      orderIndex: this.dataStore.dataGroups.length,
      dataPoints: [],
      childGroups: []
    };

    this.dataStoresService.addDataGroup(this.currentUser, this.dataStore.id, newGroup).subscribe(() => {
      this.loadDataStore(this.dataStore!.id);
    });
  }

  addNestedGroup(parentNode: TreeNode): void {
    if (!this.dataStore) return;
    this.showMenuForNode = null;

    this.expandedNodeIds.add(parentNode.id);

    const parentGroup = parentNode.data as DataGroup;
    const newGroup: Partial<DataGroup> = {
      name: 'New Nested Group',
      description: '',
      orderIndex: parentGroup.childGroups.length,
      dataPoints: [],
      childGroups: []
    };

    this.dataStoresService.addDataGroup(
      this.currentUser, 
      this.dataStore.id, 
      newGroup,
      parentGroup.id
    ).subscribe(() => {
      this.loadDataStore(this.dataStore!.id);
    });
  }

  addDataPoint(parentNode: TreeNode): void {
    this.showMenuForNode = null;
    this.expandedNodeIds.add(parentNode.id);
    this.pendingGroupParent = parentNode;
    this.showTypeSelector = true;
  }

  selectDataPointType(type: any): void {
    if (!this.dataStore || !this.pendingGroupParent) return;

    const parentGroup = this.pendingGroupParent.data as DataGroup;
    const newPoint: Partial<DataPoint> = {
      name: `New ${type.name}`,
      description: '',
      dataType: type.type,
      orderIndex: parentGroup.dataPoints.length,
      configuration: {
        mode: 'Basic',
        allowMultiLine: false
      }
    };

    this.dataStoresService.addDataPoint(
      this.currentUser,
      this.dataStore.id,
      parentGroup.id,
      newPoint
    ).subscribe(() => {
      this.loadDataStore(this.dataStore!.id);
      this.showTypeSelector = false;
      this.pendingGroupParent = null;
    });
  }

  saveGroup(): void {
    if (!this.dataStore || !this.selectedNode) return;

    this.dataStoresService.updateDataGroup(
      this.currentUser,
      this.dataStore.id,
      this.selectedNode.id,
      this.editingGroup as DataGroup
    ).subscribe(() => {
      this.loadDataStore(this.dataStore!.id);
    });
  }

  savePoint(): void {
    if (!this.dataStore || !this.selectedNode) return;

    this.dataStoresService.updateDataPoint(
      this.currentUser,
      this.dataStore.id,
      this.selectedNode.id,
      this.editingPoint as DataPoint
    ).subscribe(() => {
      this.loadDataStore(this.dataStore!.id);
    });
  }

  deleteGroup(): void {
    if (!this.dataStore || !this.selectedNode || !confirm('Delete this group and all its contents?')) {
      return;
    }

    this.dataStoresService.deleteDataGroup(
      this.currentUser,
      this.dataStore.id,
      this.selectedNode.id
    ).subscribe(() => {
      this.selectedNode = null;
      this.loadDataStore(this.dataStore!.id);
    });
  }

  deletePoint(): void {
    if (!this.dataStore || !this.selectedNode || !confirm('Delete this data point?')) {
      return;
    }

    this.dataStoresService.deleteDataPoint(
      this.currentUser,
      this.dataStore.id,
      this.selectedNode.id
    ).subscribe(() => {
      this.selectedNode = null;
      this.loadDataStore(this.dataStore!.id);
    });
  }

  getBreadcrumb(node: TreeNode): string {
    const parts: string[] = [node.name];
    let current = this.findParentNode(node.parentId);
    
    while (current) {
      parts.unshift(current.name);
      current = this.findParentNode(current.parentId);
    }
    
    return parts.join(' > ');
  }

  findParentNode(parentId?: string): TreeNode | null {
    if (!parentId) return null;
    
    const findInNodes = (nodes: TreeNode[]): TreeNode | null => {
      for (const node of nodes) {
        if (node.id === parentId) return node;
        const found = findInNodes(node.children);
        if (found) return found;
      }
      return null;
    };
    
    return findInNodes(this.tree);
  }

  goBack(): void {
    this.router.navigate(['/datastores']);
  }
}
