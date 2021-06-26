import { TestBed } from '@angular/core/testing';

import { PermissionCheckGuard } from './permission-check.guard';

describe('PermissionCheckGuard', () => {
  let guard: PermissionCheckGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PermissionCheckGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
