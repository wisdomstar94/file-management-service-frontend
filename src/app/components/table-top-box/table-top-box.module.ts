import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableTopBoxComponent } from './table-top-box.component';
import { SelectModule } from '../select/select.module';



@NgModule({
  declarations: [
    TableTopBoxComponent
  ],
  imports: [
    CommonModule,
    SelectModule,
  ],
  exports: [
    TableTopBoxComponent
  ],
})
export class TableTopBoxModule { }
