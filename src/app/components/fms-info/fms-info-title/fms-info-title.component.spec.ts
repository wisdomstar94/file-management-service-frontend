import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsInfoTitleComponent } from './fms-info-title.component';

describe('FmsInfoTitleComponent', () => {
  let component: FmsInfoTitleComponent;
  let fixture: ComponentFixture<FmsInfoTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmsInfoTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsInfoTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
