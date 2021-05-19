import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonContentComponent } from './common-content.component';



@NgModule({
  declarations: [
    CommonContentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonContentComponent
  ],
})
export class CommonContentModule { }
