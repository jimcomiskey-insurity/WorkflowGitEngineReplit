import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AssetService, Asset, ProgramAssets } from './asset.service';
import { UserService } from './user.service';
import { ProgramStateService } from './program-state.service';

describe('AssetService', () => {
  let service: AssetService;
  let httpMock: HttpTestingController;
  let userServiceMock: jest.Mocked<UserService>;
  let programStateServiceMock: jest.Mocked<ProgramStateService>;

  const mockUserId = 'testUser';
  const mockProgramId = 'default';
  const mockAsset: Asset = {
    id: 'asset-1',
    name: 'Test Asset',
    description: 'Test Description',
    tags: ['tag1', 'tag2'],
    fileName: 'test.txt',
    fileType: 'text/plain',
    fileSizeBytes: 1024,
    fileUploadedDate: '2024-01-01T00:00:00Z'
  };

  const mockProgramAssets: ProgramAssets = {
    assets: [mockAsset]
  };

  beforeEach(() => {
    userServiceMock = {
      getCurrentUser: jest.fn().mockReturnValue(mockUserId)
    } as any;

    programStateServiceMock = {
      getCurrentProgramId: jest.fn().mockReturnValue(mockProgramId)
    } as any;

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        AssetService,
        { provide: UserService, useValue: userServiceMock },
        { provide: ProgramStateService, useValue: programStateServiceMock }
      ]
    });

    service = TestBed.inject(AssetService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Service Creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('getAssets()', () => {
    it('should retrieve all assets for current user and program', (done) => {
      service.getAssets().subscribe({
        next: (assets) => {
          expect(assets).toEqual(mockProgramAssets);
          expect(assets.assets.length).toBe(1);
          expect(assets.assets[0].id).toBe('asset-1');
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/assets`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProgramAssets);
    });

    it('should include userId and programId from service dependencies', () => {
      service.getAssets().subscribe();

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/assets`);
      expect(userServiceMock.getCurrentUser).toHaveBeenCalled();
      expect(programStateServiceMock.getCurrentProgramId).toHaveBeenCalled();
      req.flush(mockProgramAssets);
    });

    it('should handle empty assets list', (done) => {
      const emptyAssets: ProgramAssets = { assets: [] };

      service.getAssets().subscribe({
        next: (assets) => {
          expect(assets.assets).toEqual([]);
          expect(assets.assets.length).toBe(0);
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/assets`);
      req.flush(emptyAssets);
    });
  });

  describe('getAsset()', () => {
    it('should retrieve a single asset by id', (done) => {
      const assetId = 'asset-1';

      service.getAsset(assetId).subscribe({
        next: (asset) => {
          expect(asset).toEqual(mockAsset);
          expect(asset.id).toBe(assetId);
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/assets/${assetId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockAsset);
    });

    it('should include assetId in URL path', () => {
      const assetId = 'asset-1';
      service.getAsset(assetId).subscribe();

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/assets/${assetId}`);
      expect(req.request.url).toContain(assetId);
      req.flush(mockAsset);
    });
  });

  describe('createAsset()', () => {
    it('should create a new asset', (done) => {
      const newAsset: Asset = {
        id: 'asset-2',
        name: 'New Asset',
        description: 'New Description',
        tags: []
      };

      service.createAsset(newAsset).subscribe({
        next: (asset) => {
          expect(asset).toEqual(newAsset);
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/assets`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newAsset);
      req.flush(newAsset);
    });

    it('should send asset data in request body', () => {
      service.createAsset(mockAsset).subscribe();

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/assets`);
      expect(req.request.body).toBe(mockAsset);
      req.flush(mockAsset);
    });
  });

  describe('updateAsset()', () => {
    it('should update an existing asset', (done) => {
      const assetId = 'asset-1';
      const updatedAsset: Asset = {
        ...mockAsset,
        description: 'Updated Description'
      };

      service.updateAsset(assetId, updatedAsset).subscribe({
        next: (asset) => {
          expect(asset).toEqual(updatedAsset);
          expect(asset.description).toBe('Updated Description');
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/assets/${assetId}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedAsset);
      req.flush(updatedAsset);
    });

    it('should include asset id in URL path', () => {
      const assetId = 'specific-id';
      service.updateAsset(assetId, mockAsset).subscribe();

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/assets/${assetId}`);
      expect(req.request.url).toContain(assetId);
      req.flush(mockAsset);
    });
  });

  describe('deleteAsset()', () => {
    it('should delete an asset by id', (done) => {
      const assetId = 'asset-1';

      service.deleteAsset(assetId).subscribe({
        next: () => {
          expect(true).toBe(true);
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/assets/${assetId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

    it('should include userId and programId in delete request', () => {
      const assetId = 'asset-1';
      service.deleteAsset(assetId).subscribe();

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/assets/${assetId}`);
      expect(userServiceMock.getCurrentUser).toHaveBeenCalled();
      expect(programStateServiceMock.getCurrentProgramId).toHaveBeenCalled();
      req.flush(null);
    });
  });

  describe('uploadFile()', () => {
    it('should upload a file for an asset', (done) => {
      const assetId = 'asset-1';
      const mockFile = new File(['content'], 'test.txt', { type: 'text/plain' });

      service.uploadFile(assetId, mockFile).subscribe({
        next: (asset) => {
          expect(asset).toEqual(mockAsset);
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/assets/${assetId}/file`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body instanceof FormData).toBe(true);
      req.flush(mockAsset);
    });
  });

  describe('downloadFile()', () => {
    it('should download a file as blob', (done) => {
      const assetId = 'asset-1';
      const mockBlob = new Blob(['test content'], { type: 'text/plain' });

      service.downloadFile(assetId).subscribe({
        next: (blob) => {
          expect(blob).toBeTruthy();
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/assets/${assetId}/file`);
      expect(req.request.method).toBe('GET');
      expect(req.request.responseType).toBe('blob');
      req.flush(mockBlob);
    });
  });

  describe('getFileContent()', () => {
    it('should retrieve file content as text', (done) => {
      const assetId = 'asset-1';
      const mockContent = { content: 'file content' };

      service.getFileContent(assetId).subscribe({
        next: (response) => {
          expect(response.content).toBe('file content');
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/assets/${assetId}/file/content`);
      expect(req.request.method).toBe('GET');
      req.flush(mockContent);
    });
  });

  describe('updateFileContent()', () => {
    it('should update file content', (done) => {
      const assetId = 'asset-1';
      const content = 'updated content';

      service.updateFileContent(assetId, content).subscribe({
        next: (asset) => {
          expect(asset).toEqual(mockAsset);
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/assets/${assetId}/file/content`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({ content });
      req.flush(mockAsset);
    });
  });

  describe('deleteFile()', () => {
    it('should delete an asset file', (done) => {
      const assetId = 'asset-1';

      service.deleteFile(assetId).subscribe({
        next: () => {
          expect(true).toBe(true);
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/assets/${assetId}/file`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('Error Handling', () => {
    it('should handle HTTP error on getAssets', (done) => {
      const errorMessage = 'Server error';

      service.getAssets().subscribe({
        next: () => done.fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Server Error');
          done();
        }
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/assets`);
      req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
    });

    it('should handle 404 error on getAsset', (done) => {
      const assetId = 'non-existent';

      service.getAsset(assetId).subscribe({
        next: () => done.fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(404);
          done();
        }
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/assets/${assetId}`);
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('Service Integration', () => {
    it('should call UserService.getCurrentUser and ProgramStateService.getCurrentProgramId for all API calls', () => {
      userServiceMock.getCurrentUser.mockClear();
      programStateServiceMock.getCurrentProgramId.mockClear();

      service.getAssets().subscribe();
      httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/assets`).flush(mockProgramAssets);
      expect(userServiceMock.getCurrentUser).toHaveBeenCalledTimes(1);
      expect(programStateServiceMock.getCurrentProgramId).toHaveBeenCalledTimes(1);

      service.getAsset('id').subscribe();
      httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/assets/id`).flush(mockAsset);
      expect(userServiceMock.getCurrentUser).toHaveBeenCalledTimes(2);
      expect(programStateServiceMock.getCurrentProgramId).toHaveBeenCalledTimes(2);

      service.createAsset(mockAsset).subscribe();
      httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/assets`).flush(mockAsset);
      expect(userServiceMock.getCurrentUser).toHaveBeenCalledTimes(3);
      expect(programStateServiceMock.getCurrentProgramId).toHaveBeenCalledTimes(3);

      service.updateAsset('id', mockAsset).subscribe();
      httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/assets/id`).flush(mockAsset);
      expect(userServiceMock.getCurrentUser).toHaveBeenCalledTimes(4);
      expect(programStateServiceMock.getCurrentProgramId).toHaveBeenCalledTimes(4);

      service.deleteAsset('id').subscribe();
      httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/assets/id`).flush(null);
      expect(userServiceMock.getCurrentUser).toHaveBeenCalledTimes(5);
      expect(programStateServiceMock.getCurrentProgramId).toHaveBeenCalledTimes(5);
    });
  });
});
