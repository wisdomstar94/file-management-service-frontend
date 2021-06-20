import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileBasicFormBoxComponent } from './file-basic-form-box.component';
import { FmsButtonModule } from '../fms-button/fms-button.module';
import { FmsInfoModule } from '../fms-info/fms-info.module';
import { FmsInputModule } from '../fms-input/fms-input.module';
import { FmsSelectModule } from '../fms-select/fms-select.module';
import { FmsTextareaModule } from '../fms-textarea/fms-textarea.module';
import { FormsModule } from '@angular/forms';
import { FmsRadioModule } from '../fms-radio/fms-radio.module';
import { FmsSingleImageModule } from '../fms-single-image/fms-single-image.module';
import { FmsMultipleImageModule } from '../fms-multiple-image/fms-multiple-image.module';



@NgModule({
  declarations: [
    FileBasicFormBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FmsInfoModule,
    FmsInputModule,
    FmsSelectModule,
    FmsTextareaModule,
    FmsButtonModule,
    FmsRadioModule,
    FmsSingleImageModule,
    FmsMultipleImageModule,
  ],
  exports: [
    FileBasicFormBoxComponent
  ]
})
export class FileBasicFormBoxModule { }
