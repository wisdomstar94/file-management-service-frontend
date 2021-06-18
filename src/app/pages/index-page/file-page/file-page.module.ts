import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilePageRoutingModule } from './file-page-routing.module';
import { FilePageComponent } from './file-page.component';


@NgModule({
  declarations: [
    FilePageComponent
  ],
  imports: [
    CommonModule,
    FilePageRoutingModule
  ]
})
export class FilePageModule { }
