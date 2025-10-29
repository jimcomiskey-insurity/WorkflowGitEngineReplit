import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

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
  private apiUrl = '/api/assets';

  constructor(private http: HttpClient, private userService: UserService) { }

  getAssets(): Observable<ProgramAssets> {
    const userId = this.userService.getCurrentUser();
    return this.http.get<ProgramAssets>(`${this.apiUrl}?userId=${userId}`);
  }

  getAsset(id: string): Observable<Asset> {
    const userId = this.userService.getCurrentUser();
    return this.http.get<Asset>(`${this.apiUrl}/${id}?userId=${userId}`);
  }

  createAsset(asset: Asset): Observable<Asset> {
    const userId = this.userService.getCurrentUser();
    return this.http.post<Asset>(`${this.apiUrl}?userId=${userId}`, asset);
  }

  updateAsset(id: string, asset: Asset): Observable<Asset> {
    const userId = this.userService.getCurrentUser();
    return this.http.put<Asset>(`${this.apiUrl}/${id}?userId=${userId}`, asset);
  }

  deleteAsset(id: string): Observable<void> {
    const userId = this.userService.getCurrentUser();
    return this.http.delete<void>(`${this.apiUrl}/${id}?userId=${userId}`);
  }

  uploadFile(id: string, file: File): Observable<Asset> {
    const userId = this.userService.getCurrentUser();
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Asset>(`${this.apiUrl}/${id}/file?userId=${userId}`, formData);
  }

  downloadFile(id: string): Observable<Blob> {
    const userId = this.userService.getCurrentUser();
    return this.http.get(`${this.apiUrl}/${id}/file?userId=${userId}`, { 
      responseType: 'blob' 
    });
  }

  getFileContent(id: string): Observable<{ content: string }> {
    const userId = this.userService.getCurrentUser();
    return this.http.get<{ content: string }>(`${this.apiUrl}/${id}/file/content?userId=${userId}`);
  }

  updateFileContent(id: string, content: string): Observable<Asset> {
    const userId = this.userService.getCurrentUser();
    return this.http.put<Asset>(`${this.apiUrl}/${id}/file/content?userId=${userId}`, { content });
  }

  deleteFile(id: string): Observable<void> {
    const userId = this.userService.getCurrentUser();
    return this.http.delete<void>(`${this.apiUrl}/${id}/file?userId=${userId}`);
  }
}
