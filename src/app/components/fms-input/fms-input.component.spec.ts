import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsInputComponent } from './fms-input.component';

describe('FmsInputComponent', () => {
  let component: FmsInputComponent;
  let fixture: ComponentFixture<FmsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmsInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
