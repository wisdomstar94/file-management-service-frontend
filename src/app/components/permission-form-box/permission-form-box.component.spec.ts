import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionFormBoxComponent } from './permission-form-box.component';

describe('PermissionFormBoxComponent', () => {
  let component: PermissionFormBoxComponent;
  let fixture: ComponentFixture<PermissionFormBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionFormBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionFormBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
