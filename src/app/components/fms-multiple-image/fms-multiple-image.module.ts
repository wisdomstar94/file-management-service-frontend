import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FmsMultipleImageComponent } from './fms-multiple-image.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FmsMultipleImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    FmsMultipleImageComponent
  ]
})
export class FmsMultipleImageModule { }
