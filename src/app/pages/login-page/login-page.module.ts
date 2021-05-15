import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page.component';
import { LoginFormBoxModule } from 'src/app/components/login-form-box/login-form-box.module';
import { ContentCenterModule } from 'src/app/components/content-center/content-center.module';


@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    LoginFormBoxModule,
    ContentCenterModule,
  ]
})
export class LoginPageModule { }
