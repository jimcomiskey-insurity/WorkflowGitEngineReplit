import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { tap, switchMap, map, startWith } from 'rxjs/operators';
import { UserService } from './user.service';
import { GitEventService } from './git-event.service';
import { AssetService, Asset } from './asset.service';

@Injectable({
  providedIn: 'root'
})
export class AssetStateService {
  private assetsSubject = new BehaviorSubject<Asset[]>([]);
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  public readonly assets$: Observable<Asset[]>;
  public readonly pendingChangesCount$: Observable<number>;

  constructor(
    private assetService: AssetService,
    private userService: UserService,
    private gitEventService: GitEventService
  ) {
    const userWithRefresh$ = combineLatest([
      this.userService.currentUser$,
      this.refreshTrigger$,
      this.gitEventService.events$.pipe(startWith(null))
    ]).pipe(
      map(([user]) => user)
    );

    this.assets$ = userWithRefresh$.pipe(
      tap(() => console.log('[AssetStateService] Fetching assets')),
      switchMap(() => 
        this.assetService.getAssets()
      ),
      map(response => response.assets),
      tap(assets => {
        console.log('[AssetStateService] Received assets:', assets.length, 'assets');
        this.assetsSubject.next(assets);
      })
    );

    this.pendingChangesCount$ = this.assets$.pipe(
      map(assets => this.countPendingChanges(assets))
    );

    this.refresh();
  }

  private countPendingChanges(assets: Asset[]): number {
    return assets.filter(a => 
      a.gitStatus === 'added' || 
      a.gitStatus === 'modified' || 
      a.gitStatus === 'deleted'
    ).length;
  }

  public refresh(): void {
    console.log('[AssetStateService] Manual refresh triggered');
    this.refreshTrigger$.next();
  }

  public getCurrentAssets(): Asset[] {
    return this.assetsSubject.value;
  }

  public getAsset(id: string): Observable<Asset> {
    return this.assetService.getAsset(id);
  }

  public createAsset(asset: Asset): Observable<Asset> {
    console.log('[AssetStateService] Creating asset:', asset.name);
    return this.assetService.createAsset(asset).pipe(
      tap(() => {
        console.log('[AssetStateService] Asset created, triggering refresh');
        this.refresh();
      })
    );
  }

  public updateAsset(id: string, asset: Asset): Observable<Asset> {
    console.log('[AssetStateService] Updating asset:', id);
    return this.assetService.updateAsset(id, asset).pipe(
      tap(() => {
        console.log('[AssetStateService] Asset updated, triggering refresh');
        this.refresh();
      })
    );
  }

  public deleteAsset(id: string): Observable<void> {
    console.log('[AssetStateService] Deleting asset:', id);
    return this.assetService.deleteAsset(id).pipe(
      tap(() => {
        console.log('[AssetStateService] Asset deleted, triggering refresh');
        this.refresh();
      })
    );
  }

  public uploadFile(id: string, file: File): Observable<Asset> {
    console.log('[AssetStateService] Uploading file for asset:', id);
    return this.assetService.uploadFile(id, file).pipe(
      tap(() => {
        console.log('[AssetStateService] File uploaded, triggering refresh');
        this.refresh();
      })
    );
  }

  public getFileContent(id: string): Observable<{ content: string }> {
    return this.assetService.getFileContent(id);
  }

  public getCommittedFileContent(id: string): Observable<{ content: string }> {
    return this.assetService.getFileContent(id);
  }

  public updateFileContent(id: string, content: string): Observable<Asset> {
    console.log('[AssetStateService] Updating file content for asset:', id);
    return this.assetService.updateFileContent(id, content).pipe(
      tap(() => {
        console.log('[AssetStateService] File content updated, triggering refresh');
        this.refresh();
      })
    );
  }

  public deleteFile(id: string): Observable<void> {
    console.log('[AssetStateService] Deleting file for asset:', id);
    return this.assetService.deleteFile(id).pipe(
      tap(() => {
        console.log('[AssetStateService] File deleted, triggering refresh');
        this.refresh();
      })
    );
  }
}
