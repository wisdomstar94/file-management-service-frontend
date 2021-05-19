import { TestBed } from '@angular/core/testing';

import { UserMenuListResolver } from './user-menu-list.resolver';

describe('UserMenuListResolver', () => {
  let resolver: UserMenuListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserMenuListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
