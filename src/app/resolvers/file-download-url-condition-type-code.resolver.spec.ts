import { TestBed } from '@angular/core/testing';

import { FileDownloadUrlConditionTypeCodeResolver } from './file-download-url-condition-type-code.resolver';

describe('FileDownloadUrlConditionTypeCodeResolver', () => {
  let resolver: FileDownloadUrlConditionTypeCodeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FileDownloadUrlConditionTypeCodeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
