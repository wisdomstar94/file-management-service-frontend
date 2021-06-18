import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsRowComponent } from './fms-row.component';

describe('FmsRowComponent', () => {
  let component: FmsRowComponent;
  let fixture: ComponentFixture<FmsRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmsRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
