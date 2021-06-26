import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './search-box.component';
import { FormsModule } from '@angular/forms';
import { FmsSelectModule } from '../fms-select/fms-select.module';



@NgModule({
  declarations: [
    SearchBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FmsSelectModule,
  ],
  exports: [
    SearchBoxComponent
  ],
})
export class SearchBoxModule { }
