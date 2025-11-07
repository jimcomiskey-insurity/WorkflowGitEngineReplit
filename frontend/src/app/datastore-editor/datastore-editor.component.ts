import { Component, OnInit, OnDestroy, inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStoresService } from '../services/datastores.service';
import { DataStoreStateService, DataStore, DataGroup, DataPoint, ScriptInput } from '../services/datastore-state.service';
import { MonacoService } from '../services/monaco.service';
import { ScriptExecutionService, ScriptInputValue } from '../services/script-execution.service';

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

            <div class="form-group">
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  [(ngModel)]="editingGroup.isRepeatable"
                  (ngModelChange)="saveGroup()"
                />
                Make this data group repeatable
              </label>
            </div>

            <div class="form-group" *ngIf="editingGroup.isRepeatable">
              <label class="checkbox-label indent">
                <input 
                  type="checkbox" 
                  [(ngModel)]="editingGroup.allowDesiredState"
                  (ngModelChange)="saveGroup()"
                />
                Allow desired state
              </label>
            </div>

            <div class="form-group">
              <label class="section-label">
                Allow population by
                <span class="info-icon" title="Control how this data group can be populated">ⓘ</span>
              </label>
              
              <label class="checkbox-label indent">
                <input 
                  type="checkbox" 
                  [(ngModel)]="editingGroup.allowPopulationByApplication"
                  (ngModelChange)="saveGroup()"
                />
                Application
              </label>

              <label class="checkbox-label indent">
                <input 
                  type="checkbox" 
                  [(ngModel)]="editingGroup.allowPopulationByImportCopy"
                  (ngModelChange)="saveGroup()"
                />
                Import/Copy
              </label>

              <label class="checkbox-label indent">
                <input 
                  type="checkbox" 
                  [(ngModel)]="editingGroup.allowPopulationByObjectSync"
                  (ngModelChange)="saveGroup()"
                />
                Object Sync
              </label>

              <div *ngIf="editingGroup.allowPopulationByObjectSync" class="indent-field">
                <label>Reference Object</label>
                <input 
                  type="text" 
                  [(ngModel)]="editingGroup.referenceObject"
                  (ngModelChange)="saveGroup()"
                  class="form-input"
                  placeholder="Enter reference object"
                />
              </div>
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
              <div class="dataflow-subtabs">
                <button 
                  class="subtab" 
                  [class.active]="dataflowSubTab === 'population'"
                  (click)="dataflowSubTab = 'population'">
                  Population
                </button>
                <button 
                  class="subtab" 
                  [class.active]="dataflowSubTab === 'calculation'"
                  (click)="switchToCalculationTab()">
                  Calculation
                </button>
              </div>

              <div *ngIf="dataflowSubTab === 'population'" class="subtab-content">
                <div class="form-group">
                  <label class="checkbox-label">
                    <input type="checkbox" disabled />
                    Reset data for each new workflow
                    <span class="info-icon" title="Clear this data when a new workflow instance is created">ℹ</span>
                  </label>
                </div>

                <div class="form-group">
                  <label class="checkbox-label">
                    <input type="checkbox" disabled />
                    Lock on Partial Commit
                    <span class="info-icon" title="Prevent changes after partial commit">ℹ</span>
                  </label>
                </div>

                <div class="form-group">
                  <label>Allow population by <span class="info-icon" title="Configure how this data can be populated">ℹ</span></label>
                  <div class="checkbox-group">
                    <label class="checkbox-label">
                      <input type="checkbox" disabled checked />
                      Application
                    </label>
                    <label class="checkbox-label">
                      <input type="checkbox" disabled checked />
                      Import/Copy
                    </label>
                    <label class="checkbox-label">
                      <input type="checkbox" disabled />
                      Object Sync
                    </label>
                  </div>
                </div>
              </div>

              <div *ngIf="dataflowSubTab === 'calculation'" class="subtab-content">
                <div class="inputs-section">
                  <div class="section-header">
                    <label>Inputs <span class="required">*</span></label>
                    <button class="add-input-btn" (click)="showInputSelector = true">+ Select Inputs</button>
                  </div>

                  <div *ngIf="getScriptInputs().length === 0" class="empty-inputs">
                    No inputs selected. Click "+ Select Inputs" to add data points.
                  </div>

                  <table *ngIf="getScriptInputs().length > 0" class="inputs-table">
                    <thead>
                      <tr>
                        <th>Input</th>
                        <th>C# Data Type</th>
                        <th>Alias for Script</th>
                        <th>Test Value</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr *ngFor="let input of getScriptInputs(); let i = index">
                        <td>{{ input.dataPointName }}</td>
                        <td>{{ getCSharpType(input.dataType) }}</td>
                        <td>
                          <input 
                            type="text" 
                            [(ngModel)]="input.alias"
                            (ngModelChange)="savePoint()"
                            class="alias-input"
                            placeholder="variableName"
                          />
                        </td>
                        <td>
                          <input 
                            type="text" 
                            [value]="getTestValue(input.dataPointId)"
                            (input)="setTestValue(input.dataPointId, $event)"
                            class="test-value-input"
                            [placeholder]="getTestValuePlaceholder(input.dataType)"
                          />
                        </td>
                        <td>
                          <label class="checkbox-label small">
                            <input 
                              type="checkbox" 
                              [checked]="getTestWithNull(input.dataPointId)"
                              (change)="setTestWithNull(input.dataPointId, $event)"
                            />
                            Test with null
                          </label>
                        </td>
                        <td>
                          <button class="remove-input-btn" (click)="removeScriptInput(i)" title="Remove input">×</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="script-section">
                  <label>C# Script</label>
                  <div class="method-signature" *ngIf="getScriptInputs().length > 0">
                    {{ getMethodSignature() }}
                  </div>
                  <div #scriptEditorContainer class="script-editor-container"></div>
                </div>

                <div class="script-actions">
                  <button 
                    class="test-script-btn" 
                    (click)="testScript()"
                    [disabled]="executingScript || getScriptInputs().length === 0">
                    {{ executingScript ? 'Testing...' : 'Test Script' }}
                  </button>
                </div>

                <div *ngIf="scriptResult !== null" class="script-result success">
                  <strong>Result:</strong> {{ scriptResult }}
                </div>

                <div *ngIf="scriptError !== null" class="script-result error">
                  <strong>Error:</strong>
                  <pre>{{ scriptError }}</pre>
                </div>
              </div>
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

    <div class="modal" *ngIf="showInputSelector" (click)="showInputSelector = false">
      <div class="modal-content input-selector" (click)="$event.stopPropagation()">
        <h2>Select Input Data Points</h2>
        <button class="close-btn" (click)="showInputSelector = false">×</button>
        
        <div class="input-selector-content">
          <p class="help-text">Select data points from this data store to use as inputs for your calculation:</p>
          
          <div class="input-tree">
            <div *ngFor="let node of tree" class="input-tree-node-wrapper">
              <ng-container *ngTemplateOutlet="inputTreeNodeTemplate; context: { nodes: [node], level: 0 }"></ng-container>
            </div>
          </div>
        </div>

        <button class="cancel-btn" (click)="showInputSelector = false">Close</button>
      </div>
    </div>

    <ng-template #inputTreeNodeTemplate let-nodes="nodes" let-level="level">
      <div *ngFor="let node of nodes" class="input-tree-node-wrapper">
        <div 
          class="input-tree-node" 
          [style.padding-left.px]="level * 20">
          
          <span class="expand-icon" (click)="toggleExpand(node, $event)" *ngIf="node.type === 'group'">
            {{ node.expanded ? '−' : '+' }}
          </span>
          <span class="expand-icon-placeholder" *ngIf="node.type === 'point'"></span>
          
          <span class="node-icon">{{ node.icon }}</span>
          <span class="node-name">{{ node.name }}</span>
          
          <button 
            *ngIf="node.type === 'point' && node.id !== editingPoint.id"
            class="add-input-small-btn" 
            (click)="addScriptInput(node); $event.stopPropagation()"
            [disabled]="isInputAlreadyAdded(node.id)">
            {{ isInputAlreadyAdded(node.id) ? 'Added' : '+ Add' }}
          </button>
        </div>

        <div *ngIf="node.expanded && node.children.length > 0" class="input-tree-children">
          <ng-container *ngTemplateOutlet="inputTreeNodeTemplate; context: { nodes: node.children, level: level + 1 }"></ng-container>
        </div>
      </div>
    </ng-template>

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
export class DataStoreEditorComponent implements OnInit, OnDestroy, AfterViewInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dataStoresService = inject(DataStoresService);
  private stateService = inject(DataStoreStateService);
  private monacoService = inject(MonacoService);
  private scriptExecutionService = inject(ScriptExecutionService);

  @ViewChild('scriptEditorContainer') scriptEditorContainer?: ElementRef;

  dataStore: DataStore | null = null;
  tree: TreeNode[] = [];
  filteredTree: TreeNode[] = [];
  selectedNode: TreeNode | null = null;
  showMenuForNode: string | null = null;
  showTypeSelector = false;
  showInputSelector = false;
  filterText = '';
  activeTab = 'type';
  dataflowSubTab = 'population';
  
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

  scriptEditor: any = null;
  testValues: Map<string, { value: string, testWithNull: boolean }> = new Map();
  scriptResult: string | null = null;
  scriptError: string | null = null;
  executingScript = false;

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
      isRepeatable: false,
      allowDesiredState: false,
      allowPopulationByApplication: true,
      allowPopulationByImportCopy: true,
      allowPopulationByObjectSync: true,
      referenceObject: '',
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
      isRepeatable: false,
      allowDesiredState: false,
      allowPopulationByApplication: true,
      allowPopulationByImportCopy: true,
      allowPopulationByObjectSync: true,
      referenceObject: '',
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

  ngAfterViewInit(): void {
    // Monaco editor will be initialized when switching to calculation tab
  }

  ngOnDestroy(): void {
    if (this.scriptEditor) {
      this.scriptEditor.dispose();
      this.scriptEditor = null;
    }
  }

  switchToCalculationTab(): void {
    this.dataflowSubTab = 'calculation';
    
    if (!this.editingPoint.calculation) {
      this.editingPoint.calculation = {
        inputs: [],
        script: '  // Write your calculation logic here\n  // Example:\n  // return 0;'
      };
    }

    setTimeout(() => this.initializeMonacoEditor(), 100);
  }

  initializeMonacoEditor(): void {
    if (!this.scriptEditorContainer) {
      return;
    }

    this.monacoService.getMonaco().then(() => {
      if (!this.scriptEditorContainer) return;

      // Extract body from full method (for backward compatibility)
      const scriptBody = this.extractMethodBody(this.editingPoint.calculation?.script || '');
      
      // Build method signature with parameters for display
      const inputs = this.getScriptInputs();
      const params = inputs.map(input => {
        const csharpType = this.getCSharpType(input.dataType);
        return `${csharpType} ${input.alias}`;
      }).join(', ');
      const methodSignature = `public object Calculate(${params})\n{\n`;
      const methodEnd = '\n}';
      
      // Full code with signature (for Monaco to understand parameters)
      const fullCode = methodSignature + scriptBody + methodEnd;

      // If editor already exists, just update its value
      if (this.scriptEditor) {
        this.scriptEditor.setValue(fullCode);
        this.updateReadOnlyRanges();
        return;
      }

      // Create new editor
      this.scriptEditor = (window as any).monaco.editor.create(
        this.scriptEditorContainer.nativeElement,
        {
          value: fullCode,
          language: 'csharp',
          theme: 'vs-dark',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 13,
          lineNumbers: 'on',
          automaticLayout: true,
          // Enable IntelliSense suggestions
          suggestOnTriggerCharacters: true,
          quickSuggestions: {
            other: true,
            comments: false,
            strings: false
          },
          wordBasedSuggestions: 'off',
          acceptSuggestionOnEnter: 'on',
          tabCompletion: 'on',
          suggest: {
            showKeywords: true,
            showSnippets: true,
            showWords: false,
            filterGraceful: true,
            snippetsPreventQuickSuggestions: false,
            localityBonus: true
          }
        }
      );

      this.updateReadOnlyRanges();

      this.scriptEditor.onDidChangeModelContent(() => {
        if (this.editingPoint.calculation) {
          // Extract just the body (remove signature and closing brace)
          const fullText = this.scriptEditor.getValue();
          const lines = fullText.split('\n');
          
          // Remove first 2 lines (signature + opening brace) and last line (closing brace)
          const bodyLines = lines.slice(2, -1);
          this.editingPoint.calculation.script = bodyLines.join('\n');
          this.savePoint();
        }
      });

      // Register completion provider for C# IntelliSense
      this.registerCompletionProvider();
    });
  }

  private updateReadOnlyRanges(): void {
    if (!this.scriptEditor) return;
    
    const model = this.scriptEditor.getModel();
    if (!model) return;
    
    const totalLines = model.getLineCount();
    
    // Make first 2 lines (signature + opening brace) and last line (closing brace) read-only
    model.deltaDecorations([], [
      {
        range: new (window as any).monaco.Range(1, 1, 2, 1000),
        options: {
          isWholeLine: true,
          className: 'read-only-line',
          glyphMarginClassName: 'read-only-glyph',
          stickiness: 1
        }
      },
      {
        range: new (window as any).monaco.Range(totalLines, 1, totalLines, 1000),
        options: {
          isWholeLine: true,
          className: 'read-only-line',
          stickiness: 1
        }
      }
    ]);
  }

  private registerCompletionProvider(): void {
    const monaco = (window as any).monaco;
    const self = this;
    
    monaco.languages.registerCompletionItemProvider('csharp', {
      triggerCharacters: ['.', ' ', '(', ',', '<', '"', '\'', '/', '\\', '+', '-', '*', '='],
      provideCompletionItems: async (model: any, position: any) => {
        console.log('[COMPLETION] Provider called');
        
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        };
        
        const completionInputs = self.getScriptInputs().map(input => ({
          alias: input.alias,
          dataType: input.dataType
        }));
        
        console.log('[COMPLETION] Requesting completions...');
        
        try {
          const request = {
            script: model.getValue(),
            position: model.getOffsetAt(position),
            inputs: completionInputs
          };
          
          const response = await self.scriptExecutionService.getCompletions(self.currentUser, request).toPromise();
          
          console.log('[COMPLETION] Received', response?.items?.length, 'items from backend');
          
          const suggestions = response?.items.map((item, index) => {
            const isParameter = item.kind === 'Parameter' || item.kind === 'Variable';
            const sortText = isParameter ? `000${String(index).padStart(4, '0')}` : `999${String(index).padStart(4, '0')}`;
            
            return {
              label: item.label,
              kind: self.getMonacoCompletionKind(item.kind),
              insertText: item.insertText,
              detail: item.detail,
              documentation: item.documentation,
              sortText: sortText,
              filterText: item.label,
              range: range
            };
          }) || [];

          console.log('[COMPLETION] Returning', suggestions.length, 'suggestions');
          if (suggestions.length > 0) {
            console.log('[COMPLETION] First 3:', suggestions.slice(0, 3).map(s => s.label));
          }
          
          return { suggestions: suggestions };
        } catch (err) {
          console.error('[COMPLETION] Error:', err);
          return { suggestions: [] };
        }
      }
    });
  }

  private getMonacoCompletionKind(kind: string): any {
    const monaco = (window as any).monaco;
    const CompletionItemKind = monaco.languages.CompletionItemKind;
    
    switch (kind) {
      case 'Method': return CompletionItemKind.Method;
      case 'Property': return CompletionItemKind.Property;
      case 'Field': return CompletionItemKind.Field;
      case 'Class': return CompletionItemKind.Class;
      case 'Module': return CompletionItemKind.Module;
      case 'Keyword': return CompletionItemKind.Keyword;
      case 'Variable': return CompletionItemKind.Variable;
      default: return CompletionItemKind.Text;
    }
  }

  getScriptInputs(): ScriptInput[] {
    return this.editingPoint.calculation?.inputs || [];
  }

  getCSharpType(dataType: string): string {
    const typeMap: { [key: string]: string } = {
      'String': 'string',
      'Integer': 'int',
      'Decimal': 'decimal',
      'Money': 'decimal',
      'Date': 'DateTime',
      'Timestamp': 'DateTime',
      'Year': 'int',
      'YesNo': 'string',
      'Email': 'string',
      'Phone': 'string',
      'Url': 'string',
      'Zipcode': 'string',
      'ListOfStrings': 'List<string>'
    };
    return typeMap[dataType] || 'string';
  }

  getTestValue(dataPointId: string): string {
    return this.testValues.get(dataPointId)?.value || '';
  }

  setTestValue(dataPointId: string, event: any): void {
    const value = event.target.value;
    const existing = this.testValues.get(dataPointId) || { value: '', testWithNull: false };
    this.testValues.set(dataPointId, { ...existing, value });
  }

  getTestWithNull(dataPointId: string): boolean {
    return this.testValues.get(dataPointId)?.testWithNull || false;
  }

  setTestWithNull(dataPointId: string, event: any): void {
    const testWithNull = event.target.checked;
    const existing = this.testValues.get(dataPointId) || { value: '', testWithNull: false };
    this.testValues.set(dataPointId, { ...existing, testWithNull });
  }

  getTestValuePlaceholder(dataType: string): string {
    const placeholders: { [key: string]: string } = {
      'String': 'Enter text',
      'Integer': '123',
      'Decimal': '123.45',
      'Money': '100.00',
      'Date': '2025-01-01',
      'Timestamp': '2025-01-01T12:00:00',
      'Year': '2025',
      'YesNo': 'Yes',
      'Email': 'user@example.com',
      'Phone': '555-1234',
      'Url': 'https://example.com',
      'Zipcode': '12345'
    };
    return placeholders[dataType] || 'Enter value';
  }

  removeScriptInput(index: number): void {
    if (this.editingPoint.calculation) {
      this.editingPoint.calculation.inputs.splice(index, 1);
      this.savePoint();
    }
  }

  addScriptInput(node: TreeNode): void {
    if (!this.editingPoint.calculation) {
      this.editingPoint.calculation = { inputs: [], script: '' };
    }

    const point = node.data as DataPoint;
    const input: ScriptInput = {
      dataPointId: point.id,
      dataPointName: point.name,
      dataType: point.dataType,
      alias: this.generateAlias(point.name)
    };

    this.editingPoint.calculation.inputs.push(input);
    this.savePoint();
  }

  isInputAlreadyAdded(dataPointId: string): boolean {
    return this.getScriptInputs().some(input => input.dataPointId === dataPointId);
  }

  generateAlias(name: string): string {
    return name.replace(/[^a-zA-Z0-9]/g, '').replace(/^[0-9]/, '_');
  }

  getMethodSignature(): string {
    const inputs = this.getScriptInputs();
    if (inputs.length === 0) return 'int Calculate() {';

    const params = inputs.map(input => {
      const type = this.getCSharpType(input.dataType);
      const nullableSuffix = type !== 'string' && type !== 'List<string>' ? '?' : '';
      return `${type}${nullableSuffix} ${input.alias}`;
    }).join(', ');

    return `int Calculate(${params}) {`;
  }

  extractMethodBody(fullScript: string): string {
    // Check if script already contains method signature
    const methodSignaturePattern = /^\s*int\s+Calculate\s*\([^)]*\)\s*\{/;
    
    if (!methodSignaturePattern.test(fullScript)) {
      // Script is already just the body
      return fullScript;
    }

    // Extract body from full method
    // Find the first { and last }
    const firstBrace = fullScript.indexOf('{');
    const lastBrace = fullScript.lastIndexOf('}');
    
    if (firstBrace === -1 || lastBrace === -1 || firstBrace >= lastBrace) {
      return fullScript; // Return as-is if can't parse
    }

    // Extract content between braces
    return fullScript.substring(firstBrace + 1, lastBrace);
  }

  wrapMethodBody(body: string): string {
    const signature = this.getMethodSignature();
    return `${signature}\n${body}\n}`;
  }

  testScript(): void {
    if (!this.editingPoint.calculation || this.executingScript) {
      return;
    }

    this.executingScript = true;
    this.scriptResult = null;
    this.scriptError = null;

    const inputs: ScriptInputValue[] = this.getScriptInputs().map(input => ({
      alias: input.alias,
      dataType: input.dataType,
      testValue: this.getTestValue(input.dataPointId),
      testWithNull: this.getTestWithNull(input.dataPointId)
    }));

    // Wrap the method body with the full signature before execution
    const fullScript = this.wrapMethodBody(this.editingPoint.calculation.script);

    this.scriptExecutionService.executeScript(this.currentUser, {
      script: fullScript,
      inputs
    }).subscribe({
      next: (result) => {
        if (result.success) {
          this.scriptResult = `${result.result} (${result.resultType})`;
        } else {
          this.scriptError = result.error || 'Unknown error';
        }
        this.executingScript = false;
      },
      error: (err) => {
        this.scriptError = err.message || 'Failed to execute script';
        this.executingScript = false;
      }
    });
  }
}
