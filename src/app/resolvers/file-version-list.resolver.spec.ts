import { TestBed } from '@angular/core/testing';

import { FileVersionListResolver } from './file-version-list.resolver';

describe('FileVersionListResolver', () => {
  let resolver: FileVersionListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FileVersionListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
