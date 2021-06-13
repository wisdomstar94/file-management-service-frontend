import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormBoxComponent } from './user-form-box.component';

describe('UserFormBoxComponent', () => {
  let component: UserFormBoxComponent;
  let fixture: ComponentFixture<UserFormBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFormBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
