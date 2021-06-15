import { TestBed } from '@angular/core/testing';

import { PermissionGroupStatusCodeResolver } from './permission-group-status-code.resolver';

describe('PermissionGroupStatusCodeResolver', () => {
  let resolver: PermissionGroupStatusCodeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PermissionGroupStatusCodeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
