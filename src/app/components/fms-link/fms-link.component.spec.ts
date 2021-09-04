import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsLinkComponent } from './fms-link.component';

describe('FmsLinkComponent', () => {
  let component: FmsLinkComponent;
  let fixture: ComponentFixture<FmsLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmsLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
