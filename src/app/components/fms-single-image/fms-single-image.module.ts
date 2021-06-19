import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FmsSingleImageComponent } from './fms-single-image.component';
import { FormsModule } from '@angular/forms';
import { FmsButtonModule } from '../fms-button/fms-button.module';



@NgModule({
  declarations: [
    FmsSingleImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FmsButtonModule,
  ],
  exports: [
    FmsSingleImageComponent
  ]
})
export class FmsSingleImageModule { }
