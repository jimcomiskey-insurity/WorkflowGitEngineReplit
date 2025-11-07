import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { ProgramStateService } from './program-state.service';

export interface Asset {
  id: string;
  name: string;
  description: string;
  tags: string[];
  fileName?: string;
  fileType?: string;
  fileSizeBytes?: number;
  fileUploadedDate?: string;
  gitStatus?: string;
}

export interface ProgramAssets {
  assets: Asset[];
}

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private http = inject(HttpClient);
  private userService = inject(UserService);
  private programStateService = inject(ProgramStateService);

  getAssets(): Observable<ProgramAssets> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.get<ProgramAssets>(`/api/users/${userId}/programs/${programId}/assets`);
  }

  getAsset(id: string): Observable<Asset> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.get<Asset>(`/api/users/${userId}/programs/${programId}/assets/${id}`);
  }

  createAsset(asset: Asset): Observable<Asset> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.post<Asset>(`/api/users/${userId}/programs/${programId}/assets`, asset);
  }

  updateAsset(id: string, asset: Asset): Observable<Asset> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.put<Asset>(`/api/users/${userId}/programs/${programId}/assets/${id}`, asset);
  }

  deleteAsset(id: string): Observable<void> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.delete<void>(`/api/users/${userId}/programs/${programId}/assets/${id}`);
  }

  uploadFile(id: string, file: File): Observable<Asset> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Asset>(`/api/users/${userId}/programs/${programId}/assets/${id}/file`, formData);
  }

  downloadFile(id: string): Observable<Blob> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.get(`/api/users/${userId}/programs/${programId}/assets/${id}/file`, { 
      responseType: 'blob' 
    });
  }

  getFileContent(id: string): Observable<{ content: string }> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.get<{ content: string }>(`/api/users/${userId}/programs/${programId}/assets/${id}/file/content`);
  }

  updateFileContent(id: string, content: string): Observable<Asset> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.put<Asset>(`/api/users/${userId}/programs/${programId}/assets/${id}/file/content`, { content });
  }

  deleteFile(id: string): Observable<void> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.delete<void>(`/api/users/${userId}/programs/${programId}/assets/${id}/file`);
  }
}
