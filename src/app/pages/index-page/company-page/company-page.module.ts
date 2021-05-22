import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyPageRoutingModule } from './company-page-routing.module';
import { CompanyPageComponent } from './company-page.component';
import { ArticleModule } from 'src/app/components/article/article.module';
import { PageTitleBoxModule } from 'src/app/components/page-title-box/page-title-box.module';
import { ArticleTitleModule } from 'src/app/components/article-title/article-title.module';


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
  ]
})
export class CompanyPageModule { }
