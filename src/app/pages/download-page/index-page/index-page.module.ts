import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexPageRoutingModule } from './index-page-routing.module';
import { IndexPageComponent } from './index-page.component';
import { ContentCenterModule } from 'src/app/components/content-center/content-center.module';
import { FmsButtonModule } from 'src/app/components/fms-button/fms-button.module';
import { FmsInputModule } from 'src/app/components/fms-input/fms-input.module';
import { FileVersionHistoryPopupModule } from 'src/app/components/file-version-history-popup/file-version-history-popup.module';
import { ContentCenterTModule } from 'src/app/components/content-center-t/content-center-t.module';


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
    FileVersionHistoryPopupModule,
    ContentCenterTModule,
  ]
})
export class IndexPageModule { }
