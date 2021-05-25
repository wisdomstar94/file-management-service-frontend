import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTopBoxComponent } from './table-top-box.component';

describe('TableTopBoxComponent', () => {
  let component: TableTopBoxComponent;
  let fixture: ComponentFixture<TableTopBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableTopBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTopBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
