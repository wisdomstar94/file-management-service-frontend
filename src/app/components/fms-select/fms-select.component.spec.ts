import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsSelectComponent } from './fms-select.component';

describe('FmsSelectComponent', () => {
  let component: FmsSelectComponent;
  let fixture: ComponentFixture<FmsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmsSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
