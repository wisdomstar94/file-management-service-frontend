import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadPageRoutingModule } from './upload-page-routing.module';
import { UploadPageComponent } from './upload-page.component';
import { ArticleModule } from 'src/app/components/article/article.module';
import { FmsButtonModule } from 'src/app/components/fms-button/fms-button.module';
import { FmsRowModule } from 'src/app/components/fms-row/fms-row.module';
import { PageTitleBoxModule } from 'src/app/components/page-title-box/page-title-box.module';
import { PermissionFormBoxModule } from 'src/app/components/permission-form-box/permission-form-box.module';
import { PermissionGroupFormBoxModule } from 'src/app/components/permission-group-form-box/permission-group-form-box.module';


@NgModule({
  declarations: [
    UploadPageComponent
  ],
  imports: [
    CommonModule,
    UploadPageRoutingModule,
    PageTitleBoxModule,
    ArticleModule,
    PermissionGroupFormBoxModule,
    FmsRowModule,
    FmsButtonModule,
    PermissionFormBoxModule,
  ]
})
export class UploadPageModule { }
