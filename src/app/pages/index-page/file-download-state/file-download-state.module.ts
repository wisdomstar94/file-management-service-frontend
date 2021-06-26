import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileDownloadStateRoutingModule } from './file-download-state-routing.module';
import { FileDownloadStateComponent } from './file-download-state.component';


@NgModule({
  declarations: [
    FileDownloadStateComponent
  ],
  imports: [
    CommonModule,
    FileDownloadStateRoutingModule
  ]
})
export class FileDownloadStateModule { }
