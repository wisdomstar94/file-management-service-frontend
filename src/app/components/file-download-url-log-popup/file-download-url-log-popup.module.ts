import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDownloadUrlLogPopupComponent } from './file-download-url-log-popup.component';
import { PopupBoxModule } from '../popup-box/popup-box.module';
import { FmsRowModule } from '../fms-row/fms-row.module';
import { FmsButtonModule } from '../fms-button/fms-button.module';
import { FmsTableModule } from '../fms-table/fms-table.module';
import { TableTopBoxModule } from '../table-top-box/table-top-box.module';
import { PaginationBoxModule } from '../pagination-box/pagination-box.module';
import { FmsSelectModule } from '../fms-select/fms-select.module';
import { LoadingIconModule } from '../loading-icon/loading-icon.module';



@NgModule({
  declarations: [
    FileDownloadUrlLogPopupComponent
  ],
  imports: [
    CommonModule,
    PopupBoxModule,
    FmsRowModule,
    FmsButtonModule,
    FmsTableModule,
    TableTopBoxModule,
    PaginationBoxModule,
    FmsSelectModule,
    LoadingIconModule,
  ],
  exports: [
    FileDownloadUrlLogPopupComponent
  ]
})
export class FileDownloadUrlLogPopupModule { }
