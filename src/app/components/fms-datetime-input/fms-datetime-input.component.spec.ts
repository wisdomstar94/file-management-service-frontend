import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsDatetimeInputComponent } from './fms-datetime-input.component';

describe('FmsDatetimeInputComponent', () => {
  let component: FmsDatetimeInputComponent;
  let fixture: ComponentFixture<FmsDatetimeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmsDatetimeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsDatetimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
