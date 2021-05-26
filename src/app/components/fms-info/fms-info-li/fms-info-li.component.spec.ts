import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsInfoLiComponent } from './fms-info-li.component';

describe('FmsInfoLiComponent', () => {
  let component: FmsInfoLiComponent;
  let fixture: ComponentFixture<FmsInfoLiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmsInfoLiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsInfoLiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
