import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsThComponent } from './fms-th.component';

describe('FmsThComponent', () => {
  let component: FmsThComponent;
  let fixture: ComponentFixture<FmsThComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmsThComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsThComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
