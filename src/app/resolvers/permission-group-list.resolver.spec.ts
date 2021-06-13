import { TestBed } from '@angular/core/testing';

import { PermissionGroupListResolver } from './permission-group-list.resolver';

describe('PermissionGroupListResolver', () => {
  let resolver: PermissionGroupListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PermissionGroupListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
