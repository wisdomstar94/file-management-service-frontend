import { TestBed } from '@angular/core/testing';

import { LogYyyymmListResolver } from './log-yyyymm-list.resolver';

describe('LogYyyymmListResolver', () => {
  let resolver: LogYyyymmListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LogYyyymmListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
