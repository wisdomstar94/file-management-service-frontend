import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsMultipleImageComponent } from './fms-multiple-image.component';

describe('FmsMultipleImageComponent', () => {
  let component: FmsMultipleImageComponent;
  let fixture: ComponentFixture<FmsMultipleImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmsMultipleImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsMultipleImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
