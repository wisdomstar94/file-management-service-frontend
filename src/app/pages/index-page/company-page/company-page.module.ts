import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyPageRoutingModule } from './company-page-routing.module';
import { CompanyPageComponent } from './company-page.component';
import { ArticleModule } from 'src/app/components/article/article.module';
import { PageTitleBoxModule } from 'src/app/components/page-title-box/page-title-box.module';
import { ArticleTitleModule } from 'src/app/components/article-title/article-title.module';
import { SearchBoxModule } from 'src/app/components/search-box/search-box.module';


@NgModule({
  declarations: [
    CompanyPageComponent
  ],
  imports: [
    CommonModule,
    CompanyPageRoutingModule,
    PageTitleBoxModule,
    ArticleModule,
    ArticleTitleModule,
    SearchBoxModule,
  ]
})
export class CompanyPageModule { }
