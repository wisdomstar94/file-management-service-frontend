import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoPageRoutingModule } from './info-page-routing.module';
import { InfoPageComponent } from './info-page.component';
import { ArticleModule } from 'src/app/components/article/article.module';
import { ArticleTitleModule } from 'src/app/components/article-title/article-title.module';
import { FmsButtonModule } from 'src/app/components/fms-button/fms-button.module';
import { FmsInfoModule } from 'src/app/components/fms-info/fms-info.module';
import { FmsRowModule } from 'src/app/components/fms-row/fms-row.module';
import { FormsModule } from '@angular/forms';
import { PageTitleBoxModule } from 'src/app/components/page-title-box/page-title-box.module';
import { UserFormBoxModule } from 'src/app/components/user-form-box/user-form-box.module';
import { FileBasicFormBoxModule } from 'src/app/components/file-basic-form-box/file-basic-form-box.module';
import { FileVersionBoardModule } from 'src/app/components/file-version-board/file-version-board.module';


@NgModule({
  declarations: [
    InfoPageComponent
  ],
  imports: [
    CommonModule,
    InfoPageRoutingModule,
    FormsModule,
    PageTitleBoxModule,
    ArticleModule,
    ArticleTitleModule,
    FmsInfoModule,
    FmsButtonModule,
    FileBasicFormBoxModule,
    FmsRowModule,
    FileVersionBoardModule,
  ]
})
export class InfoPageModule { }
