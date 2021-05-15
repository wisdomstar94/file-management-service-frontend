import { TestBed } from '@angular/core/testing';

import { JwtReverseCheckGuard } from './jwt-reverse-check.guard';

describe('JwtReverseCheckGuard', () => {
  let guard: JwtReverseCheckGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(JwtReverseCheckGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
