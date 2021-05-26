import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoPageRoutingModule } from './info-page-routing.module';
import { InfoPageComponent } from './info-page.component';
import { PageTitleBoxModule } from 'src/app/components/page-title-box/page-title-box.module';
import { ArticleModule } from 'src/app/components/article/article.module';
import { ArticleTitleModule } from 'src/app/components/article-title/article-title.module';
import { FmsInfoModule } from 'src/app/components/fms-info/fms-info.module';


@NgModule({
  declarations: [
    InfoPageComponent
  ],
  imports: [
    CommonModule,
    InfoPageRoutingModule,
    PageTitleBoxModule,
    ArticleModule,
    ArticleTitleModule,
    FmsInfoModule,
  ]
})
export class InfoPageModule { }
