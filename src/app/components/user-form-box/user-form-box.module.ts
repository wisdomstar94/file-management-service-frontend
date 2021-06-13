import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormBoxComponent } from './user-form-box.component';
import { FmsButtonModule } from '../fms-button/fms-button.module';
import { FmsInfoModule } from '../fms-info/fms-info.module';
import { FmsInputModule } from '../fms-input/fms-input.module';
import { FmsSelectModule } from '../fms-select/fms-select.module';
import { FmsTextareaModule } from '../fms-textarea/fms-textarea.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserFormBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FmsInfoModule,
    FmsInputModule,
    FmsSelectModule,
    FmsTextareaModule,
    FmsButtonModule,
  ],
  exports: [
    UserFormBoxComponent
  ]
})
export class UserFormBoxModule { }
