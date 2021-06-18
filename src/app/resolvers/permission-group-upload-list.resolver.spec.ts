import { TestBed } from '@angular/core/testing';

import { PermissionGroupUploadListResolver } from './permission-group-upload-list.resolver';

describe('PermissionGroupUploadListResolver', () => {
  let resolver: PermissionGroupUploadListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PermissionGroupUploadListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
