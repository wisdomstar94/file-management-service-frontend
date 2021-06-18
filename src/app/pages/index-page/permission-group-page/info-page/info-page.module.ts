import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoPageRoutingModule } from './info-page-routing.module';
import { InfoPageComponent } from './info-page.component';
import { PageTitleBoxModule } from 'src/app/components/page-title-box/page-title-box.module';
import { ArticleModule } from 'src/app/components/article/article.module';
import { PermissionGroupFormBoxModule } from 'src/app/components/permission-group-form-box/permission-group-form-box.module';
import { FmsRowModule } from 'src/app/components/fms-row/fms-row.module';
import { FmsButtonModule } from 'src/app/components/fms-button/fms-button.module';
import { PermissionFormBoxModule } from 'src/app/components/permission-form-box/permission-form-box.module';


@NgModule({
  declarations: [
    InfoPageComponent
  ],
  imports: [
    CommonModule,
    InfoPageRoutingModule,
    PageTitleBoxModule,
    ArticleModule,
    PermissionGroupFormBoxModule,
    FmsRowModule,
    FmsButtonModule,
    PermissionFormBoxModule,
  ]
})
export class InfoPageModule { }
