import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadPageRoutingModule } from './upload-page-routing.module';
import { UploadPageComponent } from './upload-page.component';
import { FormsModule } from '@angular/forms';
import { ArticleTitleModule } from 'src/app/components/article-title/article-title.module';
import { ArticleModule } from 'src/app/components/article/article.module';
import { FileBasicFormBoxModule } from 'src/app/components/file-basic-form-box/file-basic-form-box.module';
import { FmsButtonModule } from 'src/app/components/fms-button/fms-button.module';
import { FmsInfoModule } from 'src/app/components/fms-info/fms-info.module';
import { FmsRowModule } from 'src/app/components/fms-row/fms-row.module';
import { PageTitleBoxModule } from 'src/app/components/page-title-box/page-title-box.module';


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
    FileBasicFormBoxModule,
    FmsRowModule,
  ]
})
export class UploadPageModule { }
