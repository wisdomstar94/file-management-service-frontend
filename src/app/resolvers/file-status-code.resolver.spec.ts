import { TestBed } from '@angular/core/testing';

import { FileStatusCodeResolver } from './file-status-code.resolver';

describe('FileStatusCodeResolver', () => {
  let resolver: FileStatusCodeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FileStatusCodeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
