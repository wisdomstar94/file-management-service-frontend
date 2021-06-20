import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileVersionDetailPopupComponent } from './file-version-detail-popup.component';
import { FmsRowModule } from '../fms-row/fms-row.module';
import { FmsButtonModule } from '../fms-button/fms-button.module';
import { ArticleTitleModule } from '../article-title/article-title.module';
import { FmsInfoModule } from '../fms-info/fms-info.module';
import { FileVersionFormBoxModule } from '../file-version-form-box/file-version-form-box.module';



@NgModule({
  declarations: [
    FileVersionDetailPopupComponent
  ],
  imports: [
    CommonModule,
    FmsButtonModule,
    FmsRowModule,
    ArticleTitleModule,
    FmsInfoModule,
    FileVersionFormBoxModule,
  ],
  exports: [
    FileVersionDetailPopupComponent
  ]
})
export class FileVersionDetailPopupModule { }
