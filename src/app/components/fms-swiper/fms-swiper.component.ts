import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SwiperSlideItem } from 'src/app/interfaces/swiper-slide-item.interface';
import { AutoplayOptions } from 'swiper/types';

import Swiper, { Navigation, Pagination } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
Swiper.use([Navigation, Pagination]);

@Component({
  selector: 'app-fms-swiper',
  templateUrl: './fms-swiper.component.html',
  styleUrls: ['./fms-swiper.component.scss']
})
export class FmsSwiperComponent implements OnInit {
  @ViewChild('swiper') swiper!: SwiperComponent;
  @Input() pagination: any = { el: '.swiper-pagination' };
  @Input() navigation: any = { prevEl: '.swiper-navigation-prev', nextEl: '.swiper-navigation-next' };

  @Input() slidesPerView: number;
  @Input() centeredSlides: boolean;
  @Input() autoplay: boolean | AutoplayOptions;
  @Input() index: number;

  @Input() slideList!: SwiperSlideItem[];

  exampleConfig = {
    slidesPerView: 0
  };

  aMaxHeight: number;

  constructor() {
    this.slidesPerView = 1;
    this.centeredSlides = true;
    this.autoplay = true;
    this.aMaxHeight = 500;
    this.index = 0;
    this.navigation = true;
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   const swiperRef = (this.swiper as any).swiperRef;
    //   console.log(swiperRef);
    //   console.log(swiperRef.autoplay.running);
    // }, 2000);
    this.onResize();
  }

  onResize(): void {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const maxHeight = windowHeight - 60;
    this.aMaxHeight = maxHeight;
  }

  togglePagination() {
    if (!this.pagination) {
      this.pagination = { type: "fraction" };
    } else {
      this.pagination = false;
    }
  }
}
