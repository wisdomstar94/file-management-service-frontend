import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexPageRoutingModule } from './index-page-routing.module';
import { IndexPageComponent } from './index-page.component';


@NgModule({
  declarations: [
    IndexPageComponent
  ],
  imports: [
    CommonModule,
    IndexPageRoutingModule
  ]
})
export class IndexPageModule { }
