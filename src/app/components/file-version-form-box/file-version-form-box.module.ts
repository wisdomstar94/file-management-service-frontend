import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileVersionFormBoxComponent } from './file-version-form-box.component';
import { FormsModule } from '@angular/forms';
import { FmsInfoModule } from '../fms-info/fms-info.module';
import { FmsInputModule } from '../fms-input/fms-input.module';
import { FmsSelectModule } from '../fms-select/fms-select.module';
import { FmsTextareaModule } from '../fms-textarea/fms-textarea.module';
import { FmsRowModule } from '../fms-row/fms-row.module';
import { FmsButtonModule } from '../fms-button/fms-button.module';



@NgModule({
  declarations: [
    FileVersionFormBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FmsInfoModule,
    FmsInputModule,
    FmsSelectModule,
    FmsTextareaModule,
    FmsRowModule,
    FmsButtonModule,
  ],
  exports: [
    FileVersionFormBoxComponent
  ]
})
export class FileVersionFormBoxModule { }
