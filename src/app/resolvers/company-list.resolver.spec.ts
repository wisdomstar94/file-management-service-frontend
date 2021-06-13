import { TestBed } from '@angular/core/testing';

import { CompanyListResolver } from './company-list.resolver';

describe('CompanyListResolver', () => {
  let resolver: CompanyListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CompanyListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
