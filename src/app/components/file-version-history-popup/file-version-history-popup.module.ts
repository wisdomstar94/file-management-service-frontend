import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileVersionHistoryPopupComponent } from './file-version-history-popup.component';
import { PopupBoxModule } from '../popup-box/popup-box.module';
import { FmsTableModule } from '../fms-table/fms-table.module';
import { FmsButtonModule } from '../fms-button/fms-button.module';



@NgModule({
  declarations: [
    FileVersionHistoryPopupComponent
  ],
  imports: [
    CommonModule,
    PopupBoxModule,
    FmsTableModule,
    FmsButtonModule,
  ],
  exports: [
    FileVersionHistoryPopupComponent,
  ],
})
export class FileVersionHistoryPopupModule { }
