import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ImageItem } from 'src/app/interfaces/image-item.interface';
import { CommonService } from 'src/app/services/common.service';
import { SortType } from 'src/app/types/sort-type.type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fms-multiple-image',
  templateUrl: './fms-multiple-image.component.html',
  styleUrls: ['./fms-multiple-image.component.scss']
})
export class FmsMultipleImageComponent implements OnInit {
  environment = environment;

  @Output() onImageClick = new EventEmitter();

  @ViewChild('file') file!: ElementRef;

  cleanImageItems: ImageItem[] = [];
  @Input() imageItems: ImageItem[] = [];
  deletedImageItems: ImageItem[] = [];

  imageClickBlock: boolean;

  constructor(
    private common: CommonService,
  ) { 
    this.imageClickBlock = false;
  }

  ngOnInit(): void {
    this.cleanImageItems = { ...this.imageItems };
  }

  imgAddButtonClick(): void {
    this.file.nativeElement.click();
  }

  fileChanged(event: Event): void {
    const newImageItem: ImageItem = {
      imageKey: '',
      imageUrl: '',
      sortNo: 1,
    };

    newImageItem.file = (event.target as any).files[0] as File;
    this.imageItems.unshift(newImageItem);
    this.setPreviewImage(event, newImageItem);
  } 

  setPreviewImage(event: Event, newImageItem: ImageItem): void {
    // 이미지 파일인지 검사 (생략)

    // FileReader 인스턴스 생성
    const reader = new FileReader()
    // 이미지가 로드가 된 경우
    reader.onload = e => {
      newImageItem.imageUrl = e.target?.result!;
      this.refreshSortNo();
    };
    // reader가 이미지 읽도록 하기
    reader.readAsDataURL((event.target as any).files[0]);
    this.refreshSortNo();
  }

  sortClick(sortType: SortType, imageItem: ImageItem, event: MouseEvent): boolean {
    console.log('sortClick');
    this.imageClickBlock = true;
    switch (sortType) {
      case 'prev': this.sortPrev(imageItem); break;
      case 'next': this.sortNext(imageItem); break;
    }
    // event.preventDefault();
    return false;
  }

  getClickedImageItemIndex(imageItem: ImageItem): number {
    let clickedItemIndex = 0;
    let index = 0;
    for (const item of this.imageItems) {
      if (item === imageItem) {
        clickedItemIndex = index;
        break;
      }
      index++;
    }
    return clickedItemIndex;
  }

  sortPrev(imageItem: ImageItem): void {
    const clickedItemIndex = this.getClickedImageItemIndex(imageItem);
    if (clickedItemIndex === 0) {
      this.common.getAlertComponent()?.setDefault().setMessage('첫번째 이미지 입니다.').show();
      return;
    }

    const temp = this.imageItems[clickedItemIndex];
    this.imageItems[clickedItemIndex] = this.imageItems[clickedItemIndex - 1];
    this.imageItems[clickedItemIndex - 1] = temp;

    this.refreshSortNo();
  }

  sortNext(imageItem: ImageItem): void {
    const clickedItemIndex = this.getClickedImageItemIndex(imageItem);
    if (clickedItemIndex === (this.imageItems.length - 1)) {
      this.common.getAlertComponent()?.setDefault().setMessage('마지막 이미지 입니다.').show();
      return;
    }

    const temp = this.imageItems[clickedItemIndex];
    this.imageItems[clickedItemIndex] = this.imageItems[clickedItemIndex + 1];
    this.imageItems[clickedItemIndex + 1] = temp;

    this.refreshSortNo();
  }

  refreshSortNo(): void {
    let index = 0;
    for (const item of this.imageItems) {
      item.sortNo = index + 1;
      index++;
    }
  }

  getImageFiles(): ImageItem[] {
    this.refreshSortNo();

    return this.imageItems.concat(this.deletedImageItems).filter((x) => {
      if (x.isDeleted === true && x.imageKey === '') {
        return false;
      } else {
        return true;
      }
    });
  }

  getNewFiles(): File[] {
    return this.imageItems.filter((x) => {
      if (x.file instanceof File) {
        return true;
      }
      
      return false;
    }).map((x) => {
      return x.file as File;
    });
  }

  isChanged(): boolean { 
    if (this.cleanImageItems.length !== this.imageItems.length) {
      return true;
    }

    for (let i = 0; i < this.imageItems.length; i++) {
      if (this.imageItems[i].file !== this.cleanImageItems[i].file) {
        return true;
      }

      if (this.imageItems[i].imageKey !== this.cleanImageItems[i].imageKey) {
        return true;
      }

      if (this.imageItems[i].imageUrl !== this.cleanImageItems[i].imageUrl) {
        return true;
      }

      if (this.imageItems[i].isDeleted !== this.cleanImageItems[i].isDeleted) {
        return true;
      }

      if (this.imageItems[i].sortNo !== this.cleanImageItems[i].sortNo) {
        return true;
      }
    }

    return false;
  }

  imgDeleteButtonClick(imageItem: ImageItem): void {
    imageItem.isDeleted = true;
    const clickedImageItemIndex = this.getClickedImageItemIndex(imageItem);
    this.deletedImageItems.push(imageItem);
    this.imageItems.splice(clickedImageItemIndex, 1);
  }

  imageClick(event: MouseEvent, index: number): void {
    console.log('imageClick');

    if (this.imageClickBlock === true) {
      this.imageClickBlock = false;
      return;
    }

    this.onImageClick.emit({
      event,
      index
    });
  }
}
