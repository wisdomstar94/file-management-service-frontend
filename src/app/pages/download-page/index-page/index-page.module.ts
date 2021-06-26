import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexPageRoutingModule } from './index-page-routing.module';
import { IndexPageComponent } from './index-page.component';
import { ContentCenterModule } from 'src/app/components/content-center/content-center.module';
import { FmsButtonModule } from 'src/app/components/fms-button/fms-button.module';
import { FmsInputModule } from 'src/app/components/fms-input/fms-input.module';


@NgModule({
  declarations: [
    IndexPageComponent
  ],
  imports: [
    CommonModule,
    IndexPageRoutingModule,
    ContentCenterModule,
    FmsButtonModule,
    FmsInputModule,
  ]
})
export class IndexPageModule { }
