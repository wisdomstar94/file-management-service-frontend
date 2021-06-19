import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeItem } from 'src/app/interfaces/code-item.interface';
import { FileBasicInfo } from 'src/app/interfaces/file-basic-info.interface';
import { RadioItem } from 'src/app/interfaces/radio-item.interface';
import { SelectItem } from 'src/app/interfaces/select-item.interface';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { YN } from 'src/app/types/yn.type';
import { environment } from 'src/environments/environment';
import { FmsRadioComponent } from '../fms-radio/fms-radio.component';
import { FmsSingleImageComponent } from '../fms-single-image/fms-single-image.component';

@Component({
  selector: 'app-file-basic-form-box',
  templateUrl: './file-basic-form-box.component.html',
  styleUrls: ['./file-basic-form-box.component.scss']
})
export class FileBasicFormBoxComponent implements OnInit {
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

      if (this.cleanFileBasicInfo.fileRepresentImageInfo.length > 0) {
        this.fileRepresentImage.imgSrc = this.cleanFileBasicInfo.fileRepresentImageInfo[0].fileAccessUrl;
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

    // // 

    // // FmsUserStatusCodes.code 체크
    // if (typeof this.userInfo.FmsUserStatusCodes?.code !== 'string') {
    //   this.common.getAlertComponent()?.setMessage('상태 정보가 없습니다.').show();
    //   return false;
    // }

    // if (this.userInfo.FmsUserStatusCodes.code.trim() === '') {
    //   this.common.getAlertComponent()?.setMessage('상태를 선택해주세요.').show();
    //   return false;
    // }

    // // userMemo 체크
    // if (typeof this.userInfo.userMemo !== 'string') {
    //   this.common.getAlertComponent()?.setMessage('메모 정보가 없습니다.').show();
    //   return false;
    // }

    return true;
  }

  // isChanged(userColumn: UserColumn): boolean {
  //   let result = false;
  //   switch (userColumn) {
  //     case 'userId': 
  //       if (this.cleanUserInfo.userId !== this.userInfo.userId) {
  //         result = true;
  //       }
  //       break;
  //     case 'userPassword':
  //       if (typeof this.userInfo.userPassword === 'string') {
  //         if (this.userInfo.userPassword.trim() !== '') {
  //           return true;
  //         }
  //       }
  //       break;
  //     case 'companyKey': 
  //       if (this.cleanUserInfo.FmsCompany?.companyKey !== this.userInfo.FmsCompany?.companyKey) {
  //         result = true;
  //       }
  //       break;
  //     case 'userName': 
  //       if (this.cleanUserInfo.userName !== this.userInfo.userName) {
  //         result = true;
  //       }
  //       break;
  //     case 'userPhone': 
  //       if (this.cleanUserInfo.userPhone !== this.userInfo.userPhone) {
  //         result = true;
  //       }
  //       break;
  //     case 'permissionGroupKey': 
  //       if (this.cleanUserInfo.FmsPermissionGroup?.permissionGroupKey !== this.userInfo.FmsPermissionGroup?.permissionGroupKey) {
  //         result = true;
  //       }
  //       break;
  //     case 'userStatus': 
  //       if (this.cleanUserInfo.FmsUserStatusCodes?.code !== this.userInfo.FmsUserStatusCodes?.code) {
  //         result = true;
  //       }
  //       break;
  //     case 'userMemo': 
  //       if (this.cleanUserInfo.userMemo !== this.userInfo.userMemo) {
  //         result = true;
  //       }
  //       break;
  //   }
  //   return result;
  // }

}
