import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFormBoxComponent } from './company-form-box.component';

describe('CompanyFormBoxComponent', () => {
  let component: CompanyFormBoxComponent;
  let fixture: ComponentFixture<CompanyFormBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyFormBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFormBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
