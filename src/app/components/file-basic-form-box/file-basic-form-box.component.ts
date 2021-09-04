import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeItem } from 'src/app/interfaces/code-item.interface';
import { FileBasicInfo } from 'src/app/interfaces/file-basic-info.interface';
import { ImageItem } from 'src/app/interfaces/image-item.interface';
import { RadioItem } from 'src/app/interfaces/radio-item.interface';
import { SelectItem } from 'src/app/interfaces/select-item.interface';
import { SwiperSlideItem } from 'src/app/interfaces/swiper-slide-item.interface';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { FileBasicColumn } from 'src/app/types/file-basic-column.type';
import { YN } from 'src/app/types/yn.type';
import { environment } from 'src/environments/environment';
import { FmsImageSlidePopupComponent } from '../fms-image-slide-popup/fms-image-slide-popup.component';
import { FmsMultipleImageComponent } from '../fms-multiple-image/fms-multiple-image.component';
import { FmsRadioComponent } from '../fms-radio/fms-radio.component';
import { FmsSingleImageComponent } from '../fms-single-image/fms-single-image.component';

@Component({
  selector: 'app-file-basic-form-box',
  templateUrl: './file-basic-form-box.component.html',
  styleUrls: ['./file-basic-form-box.component.scss']
})
export class FileBasicFormBoxComponent implements OnInit {
  @ViewChild('fmsImageSlidePopup') fmsImageSlidePopup!: FmsImageSlidePopupComponent;

  cleanFileBasicInfo!: FileBasicInfo;
  fileBasicInfo!: FileBasicInfo;
  
  fileStatusCodeList: CodeItem[] = [];
  fileStatusSelectItems: SelectItem[] = [];

  fileStoreVersionHistoryRadioItems: RadioItem[] = [
    {
      valueUniqueID: 'Y',
      value: 'Y',
      displayText: '파일 버전의 이력(버전 및 버전별 설명글)을 노출합니다.',
      checked: true,
    },
    {
      valueUniqueID: 'N',
      value: 'N',
      displayText: '파일 버전의 이력(버전 및 버전별 설명글)을 노출하지 않습니다.',
      checked: false,
    },
  ];
  fileStoreVersionHistoryCheckValud: YN = 'N';

  fileStoreDescriptionOpenRadioItems: RadioItem[] = [
    {
      valueUniqueID: 'Y',
      value: 'Y',
      displayText: '파일 설명글을 노출합니다.',
      checked: true,
    },
    {
      valueUniqueID: 'N',
      value: 'N',
      displayText: '파일 설명글을 노출하지 않습니다.',
      checked: false,
    },
  ];
  fileStoreDescriptionOpenCheckValud: YN = 'N';

  @ViewChild('fileStoreVersionHistoryRadio') fileStoreVersionHistoryRadio!: FmsRadioComponent;
  @ViewChild('fileStoreDescriptionOpenRadio') fileStoreDescriptionOpenRadio!: FmsRadioComponent;

  @ViewChild('fileRepresentImage') fileRepresentImage!: FmsSingleImageComponent;
  @ViewChild('fileScreenShotImage') fileScreenShotImage!: FmsMultipleImageComponent;
  fileScreenShotImageItems: ImageItem[] = [];

  fileRepresentImageSrc = environment.image.fileSingleDefaulImageSrc;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private common: CommonService,
    private ajax: AjaxService,
  ) { 
    const fileBasicInfo: FileBasicInfo = this.route.snapshot.data.FileBasicInfo;
    console.log('fileBasicInfo', fileBasicInfo);
    this.fileBasicInfo = fileBasicInfo;
    this.cleanFileBasicInfo = { ...fileBasicInfo };
    if (this.fileBasicInfo === undefined || this.fileBasicInfo === null) {
      this.fileBasicInfo = {
        fileInfo: {
          fileLabelName: '',
          fileMemo: '',
          fileDescription: '',
          fileStoreVersionHistoryOpen: 'N',
          fileStoreDescriptionOpen: 'N',
          fileStatus: 'FISTS00000001',
          FmsFileStatusCodes: {
            code: 'FISTS00000001',
            codeName: '',
          },
        },
        fileScreenShotImageInfo: [],
        fileRepresentImageInfo: [],
      };
    } else {
      this.fileStoreVersionHistoryCheckValud = this.fileBasicInfo.fileInfo.fileStoreVersionHistoryOpen!;
      this.fileStoreDescriptionOpenCheckValud = this.fileBasicInfo.fileInfo.fileStoreDescriptionOpen!;
      this.cleanFileBasicInfo.fileInfo = { ...fileBasicInfo?.fileInfo! };
      this.cleanFileBasicInfo.fileInfo.FmsFileStatusCodes = { ...fileBasicInfo?.fileInfo?.FmsFileStatusCodes! };
      this.cleanFileBasicInfo.fileScreenShotImageInfo = { ...fileBasicInfo?.fileScreenShotImageInfo! };
      this.cleanFileBasicInfo.fileRepresentImageInfo = { ...fileBasicInfo?.fileRepresentImageInfo! };

      // console.log('this.fileBasicInfo.fileRepresentImageInfo', this.fileBasicInfo.fileRepresentImageInfo);
      if (this.fileBasicInfo.fileRepresentImageInfo.length > 0) {
        this.fileRepresentImageSrc = this.fileBasicInfo.fileRepresentImageInfo[0].fileAccessUrl;
      }

      if (this.fileBasicInfo.fileScreenShotImageInfo.length > 0) {
        this.fileScreenShotImageItems = this.fileBasicInfo.fileScreenShotImageInfo.map((x) => {
          return {
            imageKey: x.fileImageKey,
            imageUrl: x.fileAccessUrl,
            sortNo: x.sortNo,
          };
        });
      }
    }
    

    this.fileStatusCodeList = this.route.snapshot.data.FileStatusCode;
    this.fileStatusSelectItems = this.fileStatusCodeList.map((x) => {
      return {
        optionUniqueID: x.code,
        optionValue: x.code,
        optionDisplayText: x.codeName,
        selected: false,
      };
    });
  }

  ngOnInit(): void {

  }

  infoValidationCheck(): boolean {
    this.common.getAlertComponent()?.setDefault();

    if (this.fileBasicInfo === undefined) {
      this.common.getAlertComponent()?.setMessage('파일 기본 정보가 없습니다.').show();
      return false;
    }

    if (this.fileBasicInfo.fileInfo === undefined) {
      this.common.getAlertComponent()?.setMessage('파일 기본 정보가 없습니다.').show();
      return false;
    }

    if (this.fileBasicInfo.fileRepresentImageInfo === undefined) {
      this.common.getAlertComponent()?.setMessage('파일 기본 정보가 없습니다.').show();
      return false;
    }

    if (this.fileBasicInfo.fileScreenShotImageInfo === undefined) {
      this.common.getAlertComponent()?.setMessage('파일 기본 정보가 없습니다.').show();
      return false;
    }

    // fileLabelName 체크
    if (typeof this.fileBasicInfo.fileInfo.fileLabelName !== 'string') {
      this.common.getAlertComponent()?.setMessage('파일 라벨명 정보가 없습니다.').show();
      return false;
    }

    if (this.fileBasicInfo.fileInfo.fileLabelName.trim() === '') {
      this.common.getAlertComponent()?.setMessage('파일 라벨명을 입력해주세요.').show();
      return false;
    }

    if (this.fileBasicInfo.fileInfo.fileLabelName.length > environment.stringLengthLimit.fileLabelNameMaxLength) {
      this.common.getAlertComponent()?.setMessage('파일 라벨명은 ' + environment.stringLengthLimit.fileLabelNameMaxLength + '자를 넘을 수 없습니다.').show();
      return false; 
    }

    // fileMemo 체크
    if (typeof this.fileBasicInfo.fileInfo.fileMemo !== 'string') {
      this.common.getAlertComponent()?.setMessage('파일 메모 정보가 없습니다.').show();
      return false;
    }

    // fileDescription 체크
    if (typeof this.fileBasicInfo.fileInfo.fileMemo !== 'string') {
      this.common.getAlertComponent()?.setMessage('파일 설명 정보가 없습니다.').show();
      return false;
    }

    // fileStoreVersionHistoryRadio 체크
    if (!['Y', 'N'].includes(this.fileStoreVersionHistoryRadio.getValue())) {
      this.common.getAlertComponent()?.setMessage('외부에 파일 버전의 변경 이력 노출 여부를 선택해주세요.').show();
      return false;
    }

    // fileStoreDescriptionOpenRadio 체크
    if (!['Y', 'N'].includes(this.fileStoreDescriptionOpenRadio.getValue())) {
      this.common.getAlertComponent()?.setMessage('외부에 파일 설명글 노출 여부').show();
      return false;
    }

    // fileRepresentImage 체크
    if (this.fileRepresentImage === undefined) {
      this.common.getAlertComponent()?.setMessage('파일 대표이미지 정보가 없습니다.').show();
      return false;
    }

    // fileScreenShotImage 체크
    if (this.fileScreenShotImage === undefined) {
      this.common.getAlertComponent()?.setMessage('파일 관련 스크린샷 정보가 없습니다.').show();
      return false;
    }

    // fileInfo.FmsFileStatusCodes?.code 체크
    if (typeof this.fileBasicInfo.fileInfo.FmsFileStatusCodes?.code !== 'string') {
      this.common.getAlertComponent()?.setMessage('파일 상태 정보가 없습니다.').show();
      return false;
    }

    if (this.fileBasicInfo.fileInfo.FmsFileStatusCodes?.code.trim() === '') {
      this.common.getAlertComponent()?.setMessage('파일 상태를 선택해주세요.').show();
      return false;
    }

    return true;
  }

  isChanged(fileBasicColumn: FileBasicColumn): boolean {
    let result = false;
    switch (fileBasicColumn) {
      case 'fileLabelName':
        if (this.cleanFileBasicInfo.fileInfo.fileLabelName !== this.fileBasicInfo.fileInfo.fileLabelName) {
          return true;
        }
        break;
      case 'fileMemo':
        if (this.cleanFileBasicInfo.fileInfo.fileMemo !== this.fileBasicInfo.fileInfo.fileMemo) {
          return true;
        }
        break;
      case 'fileDescription':
        if (this.cleanFileBasicInfo.fileInfo.fileDescription !== this.fileBasicInfo.fileInfo.fileDescription) {
          return true;
        }
        break;
      case 'fileStoreVersionHistory':
        if (this.fileBasicInfo.fileInfo.fileStoreVersionHistoryOpen !== this.fileStoreVersionHistoryRadio.getValue()) {
          return true;
        }
        break;
      case 'fileStoreDescriptionOpen':
        if (this.fileBasicInfo.fileInfo.fileStoreDescriptionOpen !== this.fileStoreDescriptionOpenRadio.getValue()) {
          return true;
        }
        break;
      case 'fileRepresentImage':
        if (this.fileRepresentImage.isChanged()) {
          return true;
        }
        break;
      case 'fileScreenShotImage':
        if (this.fileScreenShotImage.isChanged()) {
          return true;
        }
        break;
      case 'fileStatus':
        if (this.cleanFileBasicInfo.fileInfo.FmsFileStatusCodes?.code !== this.fileBasicInfo.fileInfo.FmsFileStatusCodes?.code) {
          return true;
        }
        break;
    }
    return result;
  }

  representImageClick(event: MouseEvent): void {
    if (this.fileRepresentImage.realFile === null && this.fileRepresentImage.imgSrc === environment.image.fileSingleDefaulImageSrc) {
      return;
    }

    const slideList: SwiperSlideItem[] = [
      {
        slideType: 'image',
        imageSrc: this.fileRepresentImageSrc,
      }
    ];
    this.fmsImageSlidePopup.setImageSrcList(slideList);
    this.fmsImageSlidePopup.show(0);
  }

  screenShotImageClick(event: any): void {
    // console.log('event', event);
    const index = event.index;
    // return;
    const slideList: SwiperSlideItem[] = this.fileScreenShotImageItems.map((x) => {
      return {
        slideType: 'image',
        imageSrc: x.imageUrl as string,
      };
    });
    this.fmsImageSlidePopup.setImageSrcList(slideList);
    this.fmsImageSlidePopup.show(index);
  }
}
