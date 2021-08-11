import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsSwiperComponent } from './fms-swiper.component';

describe('FmsSwiperComponent', () => {
  let component: FmsSwiperComponent;
  let fixture: ComponentFixture<FmsSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmsSwiperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
