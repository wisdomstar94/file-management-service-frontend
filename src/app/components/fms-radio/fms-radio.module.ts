import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FmsRadioComponent } from './fms-radio.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FmsRadioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    FmsRadioComponent
  ]
})
export class FmsRadioModule { }
