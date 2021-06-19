import { TestBed } from '@angular/core/testing';

import { FileBasicInfoResolver } from './file-basic-info.resolver';

describe('FileBasicInfoResolver', () => {
  let resolver: FileBasicInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FileBasicInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
