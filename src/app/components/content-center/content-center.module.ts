import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentCenterComponent } from './content-center.component';



@NgModule({
  declarations: [
    ContentCenterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContentCenterComponent
  ]
})
export class ContentCenterModule { }
