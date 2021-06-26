import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDownloadUrlFormBoxComponent } from './file-download-url-form-box.component';
import { FmsButtonModule } from '../fms-button/fms-button.module';
import { FmsInfoModule } from '../fms-info/fms-info.module';
import { FmsInputModule } from '../fms-input/fms-input.module';
import { FmsRowModule } from '../fms-row/fms-row.module';
import { FmsSelectModule } from '../fms-select/fms-select.module';
import { FmsTextareaModule } from '../fms-textarea/fms-textarea.module';
import { FormsModule } from '@angular/forms';
import { FmsDatetimeInputModule } from '../fms-datetime-input/fms-datetime-input.module';



@NgModule({
  declarations: [
    FileDownloadUrlFormBoxComponent
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
    FmsDatetimeInputModule,
  ],
  exports: [
    FileDownloadUrlFormBoxComponent
  ]
})
export class FileDownloadUrlFormBoxModule { }
