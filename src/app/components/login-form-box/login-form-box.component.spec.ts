import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormBoxComponent } from './login-form-box.component';

describe('LoginFormBoxComponent', () => {
  let component: LoginFormBoxComponent;
  let fixture: ComponentFixture<LoginFormBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginFormBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
