import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleTitleComponent } from './article-title.component';



@NgModule({
  declarations: [
    ArticleTitleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ArticleTitleComponent
  ],
})
export class ArticleTitleModule { }
