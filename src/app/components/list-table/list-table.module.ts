import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTableComponent } from './list-table.component';
import { SelectModule } from '../select/select.module';



@NgModule({
  declarations: [
    ListTableComponent
  ],
  imports: [
    CommonModule,
    SelectModule,
  ],
  exports: [
    ListTableComponent
  ]
})
export class ListTableModule { }
