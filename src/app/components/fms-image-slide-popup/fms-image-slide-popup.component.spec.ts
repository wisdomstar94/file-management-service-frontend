import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsImageSlidePopupComponent } from './fms-image-slide-popup.component';

describe('FmsImageSlidePopupComponent', () => {
  let component: FmsImageSlidePopupComponent;
  let fixture: ComponentFixture<FmsImageSlidePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmsImageSlidePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsImageSlidePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
