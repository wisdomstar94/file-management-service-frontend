import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsTdComponent } from './fms-td.component';

describe('FmsTdComponent', () => {
  let component: FmsTdComponent;
  let fixture: ComponentFixture<FmsTdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmsTdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
