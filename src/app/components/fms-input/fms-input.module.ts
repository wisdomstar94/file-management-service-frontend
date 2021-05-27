import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FmsInputComponent } from './fms-input.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FmsInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    FmsInputComponent
  ],
})
export class FmsInputModule { }
