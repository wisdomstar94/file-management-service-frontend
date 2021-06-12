import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FmsSelectComponent } from './fms-select.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FmsSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    FmsSelectComponent
  ]
})
export class FmsSelectModule { }
