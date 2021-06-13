import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoPageRoutingModule } from './info-page-routing.module';
import { InfoPageComponent } from './info-page.component';
import { FormsModule } from '@angular/forms';
import { ArticleModule } from 'src/app/components/article/article.module';
import { ArticleTitleModule } from 'src/app/components/article-title/article-title.module';
import { FmsButtonModule } from 'src/app/components/fms-button/fms-button.module';
import { FmsInfoModule } from 'src/app/components/fms-info/fms-info.module';
import { PageTitleBoxModule } from 'src/app/components/page-title-box/page-title-box.module';
import { UserFormBoxModule } from 'src/app/components/user-form-box/user-form-box.module';


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
    UserFormBoxModule,
  ]
})
export class InfoPageModule { }
