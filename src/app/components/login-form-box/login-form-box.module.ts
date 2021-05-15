import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormBoxComponent } from './login-form-box.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginFormBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    LoginFormBoxComponent
  ],
})
export class LoginFormBoxModule { }
