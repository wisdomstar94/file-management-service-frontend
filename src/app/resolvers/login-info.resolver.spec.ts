import { TestBed } from '@angular/core/testing';

import { LoginInfoResolver } from './login-info.resolver';

describe('LoginInfoResolver', () => {
  let resolver: LoginInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LoginInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
