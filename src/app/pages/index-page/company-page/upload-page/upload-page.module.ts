import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadPageRoutingModule } from './upload-page-routing.module';
import { UploadPageComponent } from './upload-page.component';
import { ArticleModule } from 'src/app/components/article/article.module';
import { ArticleTitleModule } from 'src/app/components/article-title/article-title.module';
import { PageTitleBoxModule } from 'src/app/components/page-title-box/page-title-box.module';
import { CompanyFormBoxModule } from 'src/app/components/company-form-box/company-form-box.module';
import { FmsButtonModule } from 'src/app/components/fms-button/fms-button.module';


@NgModule({
  declarations: [
    UploadPageComponent
  ],
  imports: [
    CommonModule,
    UploadPageRoutingModule,
    PageTitleBoxModule,
    ArticleModule,
    ArticleTitleModule,
    CompanyFormBoxModule,
    FmsButtonModule,
  ]
})
export class UploadPageModule { }
