import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsTrComponent } from './fms-tr.component';

describe('FmsTrComponent', () => {
  let component: FmsTrComponent;
  let fixture: ComponentFixture<FmsTrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmsTrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
