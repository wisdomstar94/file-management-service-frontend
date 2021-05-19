import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexPageRoutingModule } from './index-page-routing.module';
import { IndexPageComponent } from './index-page.component';
import { CommonNavModule } from 'src/app/components/common-nav/common-nav.module';
import { CommonTopHeaderModule } from 'src/app/components/common-top-header/common-top-header.module';
import { CommonContentModule } from 'src/app/components/common-content/common-content.module';


@NgModule({
  declarations: [
    IndexPageComponent
  ],
  imports: [
    CommonModule,
    IndexPageRoutingModule,
    CommonNavModule,
    CommonTopHeaderModule,
    CommonContentModule,
  ]
})
export class IndexPageModule { }
