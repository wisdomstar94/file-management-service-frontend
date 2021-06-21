import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDonwloadUrlBoardComponent } from './file-donwload-url-board.component';
import { FormsModule } from '@angular/forms';
import { ArticleModule } from '../article/article.module';
import { ArticleTitleModule } from '../article-title/article-title.module';
import { FmsButtonModule } from '../fms-button/fms-button.module';
import { FmsTableModule } from '../fms-table/fms-table.module';
import { PaginationBoxModule } from '../pagination-box/pagination-box.module';
import { SearchBoxModule } from '../search-box/search-box.module';
import { TableTopBoxModule } from '../table-top-box/table-top-box.module';
import { FileDownloadUrlDetailPopupModule } from '../file-download-url-detail-popup/file-download-url-detail-popup.module';



@NgModule({
  declarations: [
    FileDonwloadUrlBoardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ArticleModule,
    ArticleTitleModule,
    SearchBoxModule,
    FmsButtonModule,
    TableTopBoxModule,
    PaginationBoxModule,
    FmsTableModule,
    FileDownloadUrlDetailPopupModule,
  ],
  exports: [
    FileDonwloadUrlBoardComponent
  ]
})
export class FileDonwloadUrlBoardModule { }
