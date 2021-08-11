import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FmsImageSlidePopupComponent } from './fms-image-slide-popup.component';
import { FmsSwiperModule } from '../fms-swiper/fms-swiper.module';



@NgModule({
  declarations: [
    FmsImageSlidePopupComponent
  ],
  imports: [
    CommonModule,
    FmsSwiperModule,
  ],
  exports: [
    FmsImageSlidePopupComponent
  ]
})
export class FmsImageSlidePopupModule { }
