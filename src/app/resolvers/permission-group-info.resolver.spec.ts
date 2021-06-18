import { TestBed } from '@angular/core/testing';

import { PermissionGroupInfoResolver } from './permission-group-info.resolver';

describe('PermissionGroupInfoResolver', () => {
  let resolver: PermissionGroupInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PermissionGroupInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
