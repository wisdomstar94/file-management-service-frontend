import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexPageRoutingModule } from './index-page-routing.module';
import { IndexPageComponent } from './index-page.component';
import { FormsModule } from '@angular/forms';
import { PageTitleBoxModule } from 'src/app/components/page-title-box/page-title-box.module';
import { ArticleModule } from 'src/app/components/article/article.module';
import { ArticleTitleModule } from 'src/app/components/article-title/article-title.module';
import { SearchBoxModule } from 'src/app/components/search-box/search-box.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { TableTopBoxModule } from 'src/app/components/table-top-box/table-top-box.module';
import { FmsTableModule } from 'src/app/components/fms-table/fms-table.module';
import { PaginationBoxModule } from 'src/app/components/pagination-box/pagination-box.module';


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
    ButtonModule,
    TableTopBoxModule,
    FmsTableModule,
    PaginationBoxModule,
  ]
})
export class IndexPageModule { }
