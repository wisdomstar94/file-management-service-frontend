import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadPageRoutingModule } from './upload-page-routing.module';
import { UploadPageComponent } from './upload-page.component';
import { ArticleModule } from 'src/app/components/article/article.module';
import { ArticleTitleModule } from 'src/app/components/article-title/article-title.module';
import { FmsButtonModule } from 'src/app/components/fms-button/fms-button.module';
import { FmsInfoModule } from 'src/app/components/fms-info/fms-info.module';
import { FormsModule } from '@angular/forms';
import { PageTitleBoxModule } from 'src/app/components/page-title-box/page-title-box.module';
import { UserFormBoxModule } from 'src/app/components/user-form-box/user-form-box.module';


@NgModule({
  declarations: [
    UploadPageComponent
  ],
  imports: [
    CommonModule,
    UploadPageRoutingModule,
    FormsModule,
    PageTitleBoxModule,
    ArticleModule,
    ArticleTitleModule,
    FmsInfoModule,
    FmsButtonModule,
    UserFormBoxModule,
  ]
})
export class UploadPageModule { }
