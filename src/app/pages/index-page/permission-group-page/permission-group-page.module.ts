import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionGroupPageRoutingModule } from './permission-group-page-routing.module';
import { PermissionGroupPageComponent } from './permission-group-page.component';


@NgModule({
  declarations: [
    PermissionGroupPageComponent
  ],
  imports: [
    CommonModule,
    PermissionGroupPageRoutingModule
  ]
})
export class PermissionGroupPageModule { }
