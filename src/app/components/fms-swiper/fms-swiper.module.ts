import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FmsSwiperComponent } from './fms-swiper.component';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [
    FmsSwiperComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
  ],
  exports: [
    FmsSwiperComponent
  ]
})
export class FmsSwiperModule { }
