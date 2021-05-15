import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { ContentCenterModule } from '../content-center/content-center.module';



@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    ContentCenterModule,
  ],
  exports: [
    AlertComponent,
  ]
})
export class AlertModule { }
