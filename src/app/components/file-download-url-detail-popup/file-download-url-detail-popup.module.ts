import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDownloadUrlDetailPopupComponent } from './file-download-url-detail-popup.component';
import { ArticleTitleModule } from '../article-title/article-title.module';
import { FmsButtonModule } from '../fms-button/fms-button.module';
import { FmsInfoModule } from '../fms-info/fms-info.module';
import { FmsRowModule } from '../fms-row/fms-row.module';
import { FileDownloadUrlFormBoxModule } from '../file-download-url-form-box/file-download-url-form-box.module';



@NgModule({
  declarations: [
    FileDownloadUrlDetailPopupComponent
  ],
  imports: [
    CommonModule,
    FmsButtonModule,
    FmsRowModule,
    ArticleTitleModule,
    FmsInfoModule,
    FileDownloadUrlFormBoxModule,
  ],
  exports: [
    FileDownloadUrlDetailPopupComponent
  ]
})
export class FileDownloadUrlDetailPopupModule { }
