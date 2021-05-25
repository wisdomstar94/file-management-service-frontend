import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FmsTableComponent } from './fms-table/fms-table.component';
import { FmsTheadComponent } from './fms-thead/fms-thead.component';
import { FmsTbodyComponent } from './fms-tbody/fms-tbody.component';
import { FmsTrComponent } from './fms-tr/fms-tr.component';
import { FmsTdComponent } from './fms-td/fms-td.component';
import { FmsThComponent } from './fms-th/fms-th.component';



@NgModule({
  declarations: [
    FmsTableComponent,
    FmsTheadComponent,
    FmsTbodyComponent,
    FmsTrComponent,
    FmsThComponent,
    FmsTdComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FmsTableComponent,
    FmsTheadComponent,
    FmsTbodyComponent,
    FmsTrComponent,
    FmsThComponent,
    FmsTdComponent,
  ],
})
export class FmsTableModule { }
