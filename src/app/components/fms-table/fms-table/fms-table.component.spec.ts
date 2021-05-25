import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsTableComponent } from './fms-table.component';

describe('FmsTableComponent', () => {
  let component: FmsTableComponent;
  let fixture: ComponentFixture<FmsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
