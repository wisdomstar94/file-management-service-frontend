import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionGroupFormBoxComponent } from './permission-group-form-box.component';

describe('PermissionGroupFormBoxComponent', () => {
  let component: PermissionGroupFormBoxComponent;
  let fixture: ComponentFixture<PermissionGroupFormBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionGroupFormBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionGroupFormBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
