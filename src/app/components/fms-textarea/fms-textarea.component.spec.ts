import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsTextareaComponent } from './fms-textarea.component';

describe('FmsTextareaComponent', () => {
  let component: FmsTextareaComponent;
  let fixture: ComponentFixture<FmsTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmsTextareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
