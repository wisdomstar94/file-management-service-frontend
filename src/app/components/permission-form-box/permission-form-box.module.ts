import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionFormBoxComponent } from './permission-form-box.component';
import { FmsInfoModule } from '../fms-info/fms-info.module';
import { FmsInputModule } from '../fms-input/fms-input.module';
import { FmsSelectModule } from '../fms-select/fms-select.module';
import { FmsTextareaModule } from '../fms-textarea/fms-textarea.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PermissionFormBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FmsInfoModule,
    FmsInputModule,
    FmsSelectModule,
    FmsTextareaModule,
  ],
  exports: [
    PermissionFormBoxComponent
  ]
})
export class PermissionFormBoxModule { }
