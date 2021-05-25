import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsTbodyComponent } from './fms-tbody.component';

describe('FmsTbodyComponent', () => {
  let component: FmsTbodyComponent;
  let fixture: ComponentFixture<FmsTbodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmsTbodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsTbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
