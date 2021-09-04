import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorPageRoutingModule } from './error-page-routing.module';
import { ErrorPageComponent } from './error-page.component';
import { ContentCenterModule } from 'src/app/components/content-center/content-center.module';


@NgModule({
  declarations: [
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    ErrorPageRoutingModule,
    ContentCenterModule,
  ]
})
export class ErrorPageModule { }
