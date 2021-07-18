import { TestBed } from '@angular/core/testing';

import { SearchAreaShowFlagResolver } from './search-area-show-flag.resolver';

describe('SearchAreaShowFlagResolver', () => {
  let resolver: SearchAreaShowFlagResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SearchAreaShowFlagResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
