import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsButtonComponent } from './fms-button.component';

describe('FmsButtonComponent', () => {
  let component: FmsButtonComponent;
  let fixture: ComponentFixture<FmsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmsButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
