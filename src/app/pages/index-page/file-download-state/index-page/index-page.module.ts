import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexPageRoutingModule } from './index-page-routing.module';
import { IndexPageComponent } from './index-page.component';
import { FormsModule } from '@angular/forms';
import { ArticleTitleModule } from 'src/app/components/article-title/article-title.module';
import { ArticleModule } from 'src/app/components/article/article.module';
import { FmsButtonModule } from 'src/app/components/fms-button/fms-button.module';
import { FmsTableModule } from 'src/app/components/fms-table/fms-table.module';
import { PageTitleBoxModule } from 'src/app/components/page-title-box/page-title-box.module';
import { PaginationBoxModule } from 'src/app/components/pagination-box/pagination-box.module';
import { SearchBoxModule } from 'src/app/components/search-box/search-box.module';
import { TableTopBoxModule } from 'src/app/components/table-top-box/table-top-box.module';
import { FileDownloadUrlLogPopupModule } from 'src/app/components/file-download-url-log-popup/file-download-url-log-popup.module';
import { FmsLinkModule } from 'src/app/components/fms-link/fms-link.module';


@NgModule({
  declarations: [
    IndexPageComponent
  ],
  imports: [
    CommonModule,
    IndexPageRoutingModule,
    FormsModule,
    PageTitleBoxModule,
    ArticleModule,
    ArticleTitleModule,
    SearchBoxModule,
    FmsButtonModule,
    TableTopBoxModule,
    FmsTableModule,
    PaginationBoxModule,
    FileDownloadUrlLogPopupModule,
    FmsLinkModule,
  ]
})
export class IndexPageModule { }
