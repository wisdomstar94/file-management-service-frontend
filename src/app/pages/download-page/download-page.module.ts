import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DownloadPageRoutingModule } from './download-page-routing.module';
import { DownloadPageComponent } from './download-page.component';


@NgModule({
  declarations: [
    DownloadPageComponent
  ],
  imports: [
    CommonModule,
    DownloadPageRoutingModule
  ]
})
export class DownloadPageModule { }
