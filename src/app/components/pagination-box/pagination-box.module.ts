import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationBoxComponent } from './pagination-box.component';



@NgModule({
  declarations: [
    PaginationBoxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationBoxComponent
  ],
})
export class PaginationBoxModule { }
