import { TestBed } from '@angular/core/testing';

import { FileDownloadUrlStatusCodeResolver } from './file-download-url-status-code.resolver';

describe('FileDownloadUrlStatusCodeResolver', () => {
  let resolver: FileDownloadUrlStatusCodeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FileDownloadUrlStatusCodeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
