import { SwiperSlideType } from "../types/swiper-slide-type.type";

export interface SwiperSlideItem {
  slideType: SwiperSlideType;

  // image 인경우
  imageSrc?: string;
  imageLink?: string;
}