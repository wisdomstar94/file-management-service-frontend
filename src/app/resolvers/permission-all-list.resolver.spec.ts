import { TestBed } from '@angular/core/testing';

import { PermissionAllListResolver } from './permission-all-list.resolver';

describe('PermissionAllListResolver', () => {
  let resolver: PermissionAllListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PermissionAllListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
