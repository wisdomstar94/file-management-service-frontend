import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionGroupFormBoxComponent } from './permission-group-form-box.component';
import { FmsInfoModule } from '../fms-info/fms-info.module';
import { FmsInputModule } from '../fms-input/fms-input.module';
import { FmsSelectModule } from '../fms-select/fms-select.module';
import { FmsTextareaModule } from '../fms-textarea/fms-textarea.module';



@NgModule({
  declarations: [
    PermissionGroupFormBoxComponent
  ],
  imports: [
    CommonModule,
    FmsInfoModule,
    FmsInputModule,
    FmsSelectModule,
    FmsTextareaModule,
  ],
  exports: [
    PermissionGroupFormBoxComponent
  ]
})
export class PermissionGroupFormBoxModule { }
