import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { SwiperSlideItem } from 'src/app/interfaces/swiper-slide-item.interface';
import { CommonService } from 'src/app/services/common.service';

const popupAnimation = trigger('popupAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('200ms ease-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('200ms ease-out', style({ opacity: 0 })),
  ]),
]);

@Component({
  selector: 'app-fms-image-slide-popup',
  templateUrl: './fms-image-slide-popup.component.html',
  styleUrls: ['./fms-image-slide-popup.component.scss'],
  animations: [
    popupAnimation,
  ]
})
export class FmsImageSlidePopupComponent implements OnInit {
  @Input() isShow: boolean;
  @Input() imageSrcList: SwiperSlideItem[];
  @Input() index: number;

  constructor(
    private common: CommonService,
  ) { 
    this.isShow = false;
    this.imageSrcList = [];
    this.index = 0;
  }

  ngOnInit(): void {

  }

  setImageSrcList(v: SwiperSlideItem[]) {
    this.imageSrcList = v;
  }

  show(index: number): void {
    this.common.getCommonNavComponent()!.zIndex = 1;
    this.index = index;
    // console.log('this.index', this.index);
    setTimeout(() => {
      this.isShow = true;
    }, 200);
  }

  hide(): void {
    this.isShow = false;
    setTimeout(() => {
      this.common.getCommonNavComponent()!.zIndex = 3;
    }, 200);
  }

  outerAreaClick(): void {
    // this.hide();
  }

  closeButtonClick(): void {
    this.hide();
  }
}
