import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsInfoContentComponent } from './fms-info-content.component';

describe('FmsInfoContentComponent', () => {
  let component: FmsInfoContentComponent;
  let fixture: ComponentFixture<FmsInfoContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmsInfoContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsInfoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
