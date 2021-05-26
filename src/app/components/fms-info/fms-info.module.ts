import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FmsInfoUlComponent } from './fms-info-ul/fms-info-ul.component';
import { FmsInfoLiComponent } from './fms-info-li/fms-info-li.component';
import { FmsInfoTitleComponent } from './fms-info-title/fms-info-title.component';
import { FmsInfoContentComponent } from './fms-info-content/fms-info-content.component';



@NgModule({
  declarations: [
    FmsInfoUlComponent,
    FmsInfoLiComponent,
    FmsInfoTitleComponent,
    FmsInfoContentComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FmsInfoUlComponent,
    FmsInfoLiComponent,
    FmsInfoTitleComponent,
    FmsInfoContentComponent,
  ],
})
export class FmsInfoModule { }
