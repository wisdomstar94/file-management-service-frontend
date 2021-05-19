import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonNavComponent } from './common-nav.component';



@NgModule({
  declarations: [
    CommonNavComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonNavComponent
  ],
})
export class CommonNavModule { }
