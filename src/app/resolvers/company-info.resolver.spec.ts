import { TestBed } from '@angular/core/testing';

import { CompanyInfoResolver } from './company-info.resolver';

describe('CompanyInfoResolver', () => {
  let resolver: CompanyInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CompanyInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
