import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { tap, shareReplay, switchMap, map, startWith } from 'rxjs/operators';
import { UserService } from './user.service';
import { GitEventService } from './git-event.service';
import { Asset } from './asset.service';

export interface ProgramAssets {
  assets: Asset[];
}

@Injectable({
  providedIn: 'root'
})
export class AssetStateService {
  private apiUrl = '/api/assets';

  private assetsSubject = new BehaviorSubject<Asset[]>([]);
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  public readonly assets$: Observable<Asset[]>;
  public readonly pendingChangesCount$: Observable<number>;

  constructor(
    private http: HttpClient,
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
      tap(userId => console.log('[AssetStateService] Fetching assets for user:', userId)),
      switchMap(userId => 
        this.http.get<ProgramAssets>(`${this.apiUrl}?userId=${userId}`)
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
    const userId = this.userService.getCurrentUser();
    return this.http.get<Asset>(`${this.apiUrl}/${id}?userId=${userId}`);
  }

  public createAsset(asset: Asset): Observable<Asset> {
    console.log('[AssetStateService] Creating asset:', asset.name);
    const userId = this.userService.getCurrentUser();
    return this.http.post<Asset>(`${this.apiUrl}?userId=${userId}`, asset).pipe(
      tap(() => {
        console.log('[AssetStateService] Asset created, triggering refresh');
        this.refresh();
      })
    );
  }

  public updateAsset(id: string, asset: Asset): Observable<Asset> {
    console.log('[AssetStateService] Updating asset:', id);
    const userId = this.userService.getCurrentUser();
    return this.http.put<Asset>(`${this.apiUrl}/${id}?userId=${userId}`, asset).pipe(
      tap(() => {
        console.log('[AssetStateService] Asset updated, triggering refresh');
        this.refresh();
      })
    );
  }

  public deleteAsset(id: string): Observable<void> {
    console.log('[AssetStateService] Deleting asset:', id);
    const userId = this.userService.getCurrentUser();
    return this.http.delete<void>(`${this.apiUrl}/${id}?userId=${userId}`).pipe(
      tap(() => {
        console.log('[AssetStateService] Asset deleted, triggering refresh');
        this.refresh();
      })
    );
  }

  public uploadFile(id: string, file: File): Observable<Asset> {
    console.log('[AssetStateService] Uploading file for asset:', id);
    const userId = this.userService.getCurrentUser();
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Asset>(`${this.apiUrl}/${id}/file?userId=${userId}`, formData).pipe(
      tap(() => {
        console.log('[AssetStateService] File uploaded, triggering refresh');
        this.refresh();
      })
    );
  }

  public getFileContent(id: string): Observable<{ content: string }> {
    const userId = this.userService.getCurrentUser();
    return this.http.get<{ content: string }>(`${this.apiUrl}/${id}/file/content?userId=${userId}`);
  }

  public getCommittedFileContent(id: string): Observable<{ content: string }> {
    const userId = this.userService.getCurrentUser();
    return this.http.get<{ content: string }>(`${this.apiUrl}/${id}/file/content/committed?userId=${userId}`);
  }

  public updateFileContent(id: string, content: string): Observable<Asset> {
    console.log('[AssetStateService] Updating file content for asset:', id);
    const userId = this.userService.getCurrentUser();
    return this.http.put<Asset>(`${this.apiUrl}/${id}/file/content?userId=${userId}`, { content }).pipe(
      tap(() => {
        console.log('[AssetStateService] File content updated, triggering refresh');
        this.refresh();
      })
    );
  }

  public deleteFile(id: string): Observable<void> {
    console.log('[AssetStateService] Deleting file for asset:', id);
    const userId = this.userService.getCurrentUser();
    return this.http.delete<void>(`${this.apiUrl}/${id}/file?userId=${userId}`).pipe(
      tap(() => {
        console.log('[AssetStateService] File deleted, triggering refresh');
        this.refresh();
      })
    );
  }
}
