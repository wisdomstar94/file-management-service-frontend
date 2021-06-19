import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsRadioComponent } from './fms-radio.component';

describe('FmsRadioComponent', () => {
  let component: FmsRadioComponent;
  let fixture: ComponentFixture<FmsRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmsRadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
