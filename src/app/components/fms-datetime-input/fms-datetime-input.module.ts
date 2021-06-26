import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FmsDatetimeInputComponent } from './fms-datetime-input.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FmsDatetimeInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    FmsDatetimeInputComponent
  ]
})
export class FmsDatetimeInputModule { }
