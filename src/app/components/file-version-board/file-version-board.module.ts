import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileVersionBoardComponent } from './file-version-board.component';
import { ArticleModule } from '../article/article.module';
import { ArticleTitleModule } from '../article-title/article-title.module';
import { SearchBoxModule } from '../search-box/search-box.module';
import { FmsButtonModule } from '../fms-button/fms-button.module';
import { TableTopBoxModule } from '../table-top-box/table-top-box.module';
import { PaginationBoxModule } from '../pagination-box/pagination-box.module';
import { FormsModule } from '@angular/forms';
import { FmsTableModule } from '../fms-table/fms-table.module';
import { FileVersionDetailPopupModule } from '../file-version-detail-popup/file-version-detail-popup.module';



@NgModule({
  declarations: [
    FileVersionBoardComponent
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
    FileVersionDetailPopupModule,
  ],
  exports: [
    FileVersionBoardComponent
  ]
})
export class FileVersionBoardModule { }
