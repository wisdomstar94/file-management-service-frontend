import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoPageRoutingModule } from './info-page-routing.module';
import { InfoPageComponent } from './info-page.component';
import { PageTitleBoxModule } from 'src/app/components/page-title-box/page-title-box.module';
import { ArticleModule } from 'src/app/components/article/article.module';
import { ArticleTitleModule } from 'src/app/components/article-title/article-title.module';
import { FmsInfoModule } from 'src/app/components/fms-info/fms-info.module';
import { FormsModule } from '@angular/forms';
import { FmsButtonModule } from 'src/app/components/fms-button/fms-button.module';
import { CompanyFormBoxModule } from 'src/app/components/company-form-box/company-form-box.module';
import { FmsRowModule } from 'src/app/components/fms-row/fms-row.module';


@NgModule({
  declarations: [
    InfoPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InfoPageRoutingModule,
    PageTitleBoxModule,
    ArticleModule,
    ArticleTitleModule,
    FmsInfoModule,
    FmsButtonModule,
    CompanyFormBoxModule,
    FmsRowModule,
  ],
})
export class InfoPageModule { }
