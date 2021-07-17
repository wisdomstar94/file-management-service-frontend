import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardPageRoutingModule } from './dashboard-page-routing.module';
import { DashboardPageComponent } from './dashboard-page.component';
import { PageTitleBoxModule } from 'src/app/components/page-title-box/page-title-box.module';
import { SearchBoxModule } from 'src/app/components/search-box/search-box.module';
import { FmsButtonModule } from 'src/app/components/fms-button/fms-button.module';


@NgModule({
  declarations: [
    DashboardPageComponent
  ],
  imports: [
    CommonModule,
    DashboardPageRoutingModule,
    PageTitleBoxModule,
    SearchBoxModule,
    FmsButtonModule,
  ]
})
export class DashboardPageModule { }
