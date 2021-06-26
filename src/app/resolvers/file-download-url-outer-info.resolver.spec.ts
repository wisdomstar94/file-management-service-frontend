import { TestBed } from '@angular/core/testing';

import { FileDownloadUrlOuterInfoResolver } from './file-download-url-outer-info.resolver';

describe('FileDownloadUrlOuterInfoResolver', () => {
  let resolver: FileDownloadUrlOuterInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FileDownloadUrlOuterInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
