import { TestBed } from '@angular/core/testing';

import { JwtCheckGuard } from './jwt-check.guard';

describe('JwtCheckGuard', () => {
  let guard: JwtCheckGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(JwtCheckGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
