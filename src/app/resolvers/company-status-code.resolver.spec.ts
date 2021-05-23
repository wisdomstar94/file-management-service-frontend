import { TestBed } from '@angular/core/testing';

import { CompanyStatusCodeResolver } from './company-status-code.resolver';

describe('CompanyStatusCodeResolver', () => {
  let resolver: CompanyStatusCodeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CompanyStatusCodeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
