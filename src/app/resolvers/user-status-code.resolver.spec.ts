import { TestBed } from '@angular/core/testing';

import { UserStatusCodeResolver } from './user-status-code.resolver';

describe('UserStatusCodeResolver', () => {
  let resolver: UserStatusCodeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserStatusCodeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
