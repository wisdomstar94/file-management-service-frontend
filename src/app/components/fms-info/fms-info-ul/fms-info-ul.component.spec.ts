import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsInfoUlComponent } from './fms-info-ul.component';

describe('FmsInfoUlComponent', () => {
  let component: FmsInfoUlComponent;
  let fixture: ComponentFixture<FmsInfoUlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmsInfoUlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsInfoUlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
