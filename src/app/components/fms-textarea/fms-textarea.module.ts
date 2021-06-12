import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FmsTextareaComponent } from './fms-textarea.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FmsTextareaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    FmsTextareaComponent
  ]
})
export class FmsTextareaModule { }
