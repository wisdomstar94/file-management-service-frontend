import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyPageRoutingModule } from './company-page-routing.module';
import { CompanyPageComponent } from './company-page.component';
import { ArticleModule } from 'src/app/components/article/article.module';
import { PageTitleBoxModule } from 'src/app/components/page-title-box/page-title-box.module';
import { ArticleTitleModule } from 'src/app/components/article-title/article-title.module';
import { SearchBoxModule } from 'src/app/components/search-box/search-box.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { TableTopBoxModule } from 'src/app/components/table-top-box/table-top-box.module';
import { FmsTableModule } from 'src/app/components/fms-table/fms-table.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CompanyPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CompanyPageRoutingModule,
    PageTitleBoxModule,
    ArticleModule,
    ArticleTitleModule,
    SearchBoxModule,
    ButtonModule,
    TableTopBoxModule,
    FmsTableModule,
  ]
})
export class CompanyPageModule { }
