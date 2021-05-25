import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsTheadComponent } from './fms-thead.component';

describe('FmsTheadComponent', () => {
  let component: FmsTheadComponent;
  let fixture: ComponentFixture<FmsTheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmsTheadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsTheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
