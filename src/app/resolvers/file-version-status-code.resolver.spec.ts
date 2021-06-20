import { TestBed } from '@angular/core/testing';

import { FileVersionStatusCodeResolver } from './file-version-status-code.resolver';

describe('FileVersionStatusCodeResolver', () => {
  let resolver: FileVersionStatusCodeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FileVersionStatusCodeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
