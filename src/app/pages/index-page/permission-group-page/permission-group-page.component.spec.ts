import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionGroupPageComponent } from './permission-group-page.component';

describe('PermissionGroupPageComponent', () => {
  let component: PermissionGroupPageComponent;
  let fixture: ComponentFixture<PermissionGroupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionGroupPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionGroupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
