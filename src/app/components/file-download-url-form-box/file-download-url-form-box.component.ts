import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodeItem } from 'src/app/interfaces/code-item.interface';
import { ConditionInfo } from 'src/app/interfaces/condition-info.interface';
import { FileDownloadUrlAccessConditionInfo } from 'src/app/interfaces/file-download-url-access-condition-info.interface';
import { FileDownloadUrlInfo } from 'src/app/interfaces/file-download-url-info.interface';
import { FileOnlyVersionItem } from 'src/app/interfaces/file-only-version-item.interface';
import { SelectItem } from 'src/app/interfaces/select-item.interface';
import { UserItem } from 'src/app/interfaces/user-item.interface';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { FileDownloadUrlColumn } from 'src/app/types/file-download-url-column.type';
import { PopupMode } from 'src/app/types/popup-mode.type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-download-url-form-box',
  templateUrl: './file-download-url-form-box.component.html',
  styleUrls: ['./file-download-url-form-box.component.scss']
})
export class FileDownloadUrlFormBoxComponent implements OnInit {
  @Output() infoTaking = new EventEmitter();
  @Output() infoTaken = new EventEmitter();

  @Input() fileDownloadUrlKey!: string;
  @Input() popupMode: PopupMode;
  cleanFileDownloadUrlInfo!: FileDownloadUrlInfo;
  fileDownloadUrlInfo!: FileDownloadUrlInfo;
  fileDownloadUrlStatusSelectItems: SelectItem[] = [];

  conditionInfo: ConditionInfo[] = [];

  cleanConditionItems: FileDownloadUrlAccessConditionInfo[] = [];
  conditionItems: FileDownloadUrlAccessConditionInfo[] = [];

  isFileDownloadUrlInfoGetting = false;

  fileVersionList: FileOnlyVersionItem[] = [];
  fileVersionListSelectItems: SelectItem[] = [];

  conditionCodeList: CodeItem[] = [];
  conditionCodeListSelectItems: SelectItem[] = [];
  
  currentSelectedConditionInfo = {
    conditionType: 'FDUCT00000001',
  };
  currentConditionKeyInfo = {
    key: '',
  };
  currentConditionValueInfo = {
    value: '',
  };

  userList: UserItem[] = [];
  userSelectItems: SelectItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private ajax: AjaxService,
    private common: CommonService,
  ) { 
    this.userList = this.route.snapshot.data.UserList;
    this.userSelectItems = this.userList.map((x) => {
      return {
        optionUniqueID: x.userKey as string,
        optionValue: x.userKey as string,
        optionDisplayText: x.userId as string,
        selected: false,
      };
    });

    this.conditionCodeList = this.route.snapshot.data.FileDownloadUrlConditionTypeCode;
    this.conditionCodeListSelectItems = this.conditionCodeList.map((x) => {
      return {
        optionUniqueID: x.code,
        optionValue: x.code,
        optionDisplayText: x.codeName,
        selected: false,
      };
    });

    this.fileVersionList = this.route.snapshot.data.FileVersionList;
    this.fileVersionListSelectItems = this.fileVersionList.map((x) => {
      return {
        optionUniqueID: x.fileVersionKey,
        optionValue: x.fileVersionKey,
        optionDisplayText: x.fileVersionName,
        selected: false,
      };
    });
    this.fileVersionListSelectItems.unshift({
      optionUniqueID: 'null',
      optionValue: 'null',
      optionDisplayText: '최신 버전',
      selected: false,
    });

    const statusCodeList: CodeItem[] = this.route.snapshot.data.FileDownloadUrlStatusCode;
    this.fileDownloadUrlStatusSelectItems = statusCodeList.map((x) => {
      return {
        optionUniqueID: x.code,
        optionValue: x.code,
        optionDisplayText: x.codeName,
        selected: false,
      };
    });
    this.popupMode = 'modify';

    this.fileDownloadUrlInfo = {
      FmsFileDownloadUrlTargetUsers: {
        userKey: '',
        userId: '',
        userName: '',
      },
      FmsTargetFiles: {
        fileKey: '',
        fileLabelName: '',
      },
      FmsTargetFileVersions: {
        fileVersionKey: 'null',
        fileKey: '',
        fileVersionName: '',
        fileVersionCode: '',
        fileDownloadName: '',
      },
      FmsCreaterUsers: {
        userKey: '',
        userId: '',
        userName: '',
      },
      FmsUpdaterUsers: {
        userKey: '',
        userId: '',
        userName: '',
      },
      FmsFileDownloadUrlStatusCodes: {
        code: 'FDUST00000001',
        codeName: '',
      },
    };
    this.setFileDownloadUrlInfo(this.fileDownloadUrlInfo);
  }

  ngOnInit(): void {
    // console.log('이 부분 호출 확인 abab', this.fileVersionKey);
    setTimeout(() => {
      this.getFileDownloadUrlInfo(this.fileDownloadUrlKey);
    });
  }

  setFileDownloadUrlInfo(v: FileDownloadUrlInfo): void {
    this.fileDownloadUrlInfo = v;
    this.cleanFileDownloadUrlInfo = { ...v };
    if (this.fileDownloadUrlInfo !== undefined) {
      this.cleanFileDownloadUrlInfo.FmsFileDownloadUrlTargetUsers = { ...this.fileDownloadUrlInfo.FmsFileDownloadUrlTargetUsers! };
      this.cleanFileDownloadUrlInfo.FmsTargetFiles = { ...this.fileDownloadUrlInfo.FmsTargetFiles! };
      this.cleanFileDownloadUrlInfo.FmsTargetFileVersions = { ...this.fileDownloadUrlInfo.FmsTargetFileVersions! };
      this.cleanFileDownloadUrlInfo.FmsCreaterUsers = { ...this.fileDownloadUrlInfo.FmsCreaterUsers! };
      this.cleanFileDownloadUrlInfo.FmsUpdaterUsers = { ...this.fileDownloadUrlInfo.FmsUpdaterUsers! };
      this.cleanFileDownloadUrlInfo.FmsFileDownloadUrlStatusCodes = { ...this.fileDownloadUrlInfo.FmsFileDownloadUrlStatusCodes! };
    } else {
      this.fileDownloadUrlInfo = {
        FmsFileDownloadUrlTargetUsers: {
          userKey: '',
          userId: '',
          userName: '',
        },
        FmsTargetFiles: {
          fileKey: '',
          fileLabelName: '',
        },
        FmsTargetFileVersions: {
          fileVersionKey: 'null',
          fileKey: '',
          fileVersionName: '',
          fileVersionCode: '',
          fileDownloadName: '',
        },
        FmsCreaterUsers: {
          userKey: '',
          userId: '',
          userName: '',
        },
        FmsUpdaterUsers: {
          userKey: '',
          userId: '',
          userName: '',
        },
        FmsFileDownloadUrlStatusCodes: {
          code: 'FDUST00000001',
          codeName: '',
        },
      };
    }
  }

  setConditionInfo(conditionInfo: ConditionInfo[]): void {
    this.conditionInfo = conditionInfo;
    this.conditionItems = this.conditionInfo.map((x) => {
      return {
        fileAccessConditionKey: x.fileAccessConditionKey,
        key: x.key,
        value: x.value,
        type: 'modify',
        conditionStatus: x.FmsFileDownloadAccessConditionStatusCodes.code,

        conditionTypeName: x.FmsFileDownloadAccessConditionTypeCodes.codeName,
        conditionType: x.conditionType,
      };
    });
    this.cleanConditionItems = { ...this.conditionItems };
  }

  getFileDownloadUrlInfo(fileDownloadUrlKey: string): void {
    if (this.isFileDownloadUrlInfoGetting === true) {
      return;
    }

    if (fileDownloadUrlKey === '') {
      return;
    }

    this.fileDownloadUrlKey = fileDownloadUrlKey;
    this.isFileDownloadUrlInfoGetting = true;
    this.infoTaking.emit();

    const data = {
      fileDownloadUrlKey: fileDownloadUrlKey,
    };

    const myObservable = this.ajax.post(environment.api.fileDownloadUrl.fileDownloadUrlInfo, data);
    myObservable.subscribe(
      data => {
        // console.log('getFileDownloadUrlInfo.data', data);

        this.isFileDownloadUrlInfoGetting = false;
        this.infoTaken.emit();

        if (data.fileDownloadUrlInfo === null) {
          return;
        }

        const fileDownloadUrlInfo: FileDownloadUrlInfo = data.fileDownloadUrlInfo;
        if (fileDownloadUrlInfo.FmsTargetFileVersions === null) {
          fileDownloadUrlInfo.FmsTargetFileVersions = {
            fileVersionKey: 'null',
            fileVersionName: '최신버전',
            fileVersionCode: '0',
            fileDownloadName: '',
            fileKey: '',
          };
        }
        const conditionInfo: ConditionInfo[] = data.conditionInfo;
        this.setFileDownloadUrlInfo(fileDownloadUrlInfo);
        this.setConditionInfo(conditionInfo);
      },
      error => {
        this.isFileDownloadUrlInfoGetting = false;
        this.infoTaken.emit();

      },
      () => {
        this.isFileDownloadUrlInfoGetting = false;
      }
    );
  }

  infoValidationCheck(): boolean {
    this.common.getAlertComponent()?.setDefault();

    if (this.fileDownloadUrlInfo === undefined) {
      this.common.getAlertComponent()?.setMessage('파일 다운로드 URL 정보가 없습니다.').show();
      return false;
    }

    // FmsTargetFileVersions?.fileVersionKey 체크
    if (typeof this.fileDownloadUrlInfo.FmsTargetFileVersions?.fileVersionKey !== 'string') {
      this.common.getAlertComponent()?.setMessage('파일 타겟 버전 정보가 없습니다.').show();
      return false;
    }

    if (this.fileDownloadUrlInfo.FmsTargetFileVersions?.fileVersionKey === '') {
      this.common.getAlertComponent()?.setMessage('파일 타겟 버전을 선택해주세요.').show();
      return false;
    }

    // ...

    return true;
  }

  isChanged(fileDownloadUrlColumn: FileDownloadUrlColumn): boolean {
    let result = false;
    switch (fileDownloadUrlColumn) {
      case 'fileDownloadUrlTargetVersion':
        if (this.fileDownloadUrlInfo.FmsTargetFileVersions?.fileVersionKey !== this.cleanFileDownloadUrlInfo.FmsTargetFileVersions?.fileVersionKey) {
          result = true;
        }
        break;  
      case 'fileDownloadPossibleDateTimeStart':
        if (this.fileDownloadUrlInfo.fileDownloadPossibleDateTimeStart !== this.cleanFileDownloadUrlInfo.fileDownloadPossibleDateTimeStart) {
          result = true;
        }
        break;
      case 'fileDownloadPossibleDateTimeEnd':
        if (this.fileDownloadUrlInfo.fileDownloadPossibleDateTimeEnd !== this.cleanFileDownloadUrlInfo.fileDownloadPossibleDateTimeEnd) {
          result = true;
        }
        break;
      case 'fileDownloadLimitMaxCount':
        if (this.fileDownloadUrlInfo.fileDownloadLimitMaxCount !== this.cleanFileDownloadUrlInfo.fileDownloadLimitMaxCount) {
          result = true;
        }
        break;
      case 'fileDownloadCount':
        if (this.fileDownloadUrlInfo.fileDownloadCount !== this.cleanFileDownloadUrlInfo.fileDownloadCount) {
          result = true;
        }
        break;
      case 'fileDownloadUrlAccessConditionInfo':
        if (this.cleanConditionItems.length !== this.conditionItems.length) {
          result = true;
        } 
        break;
      case 'fileDownloadUrlStatus':
        if (this.fileDownloadUrlInfo.FmsFileDownloadUrlStatusCodes?.code !== this.cleanFileDownloadUrlInfo.FmsFileDownloadUrlStatusCodes?.code) {
          result = true;
        }
        break;
      // ...
    }
    return result;
  }

  conditionUploadButtonClick(): void {
    const currentConditionType = this.currentSelectedConditionInfo.conditionType;

    // console.log('currentConditionType', currentConditionType);
    // console.log(this.conditionItems.map((x) => { return x.conditionType; }));

    if (['FDUCT00000003', 'FDUCT00000004'].includes(currentConditionType)) {
      if (this.conditionItems.map((x) => { return x.conditionType; }).includes(currentConditionType)) {
        this.common.getAlertComponent()?.setDefault().setMessage('해당 제한 종류는 1개만 등록 가능합니다.').show();
        return;
      }
    }

    if (typeof this.currentConditionValueInfo.value !== 'string') {
      this.common.getAlertComponent()?.setDefault().setMessage('값을 입력해주세요.').show();
      return;
    }

    if (this.currentConditionValueInfo.value.trim() === '') {
      this.common.getAlertComponent()?.setDefault().setMessage('값을 입력해주세요.').show();
      return;
    }

    const newConditionItem: FileDownloadUrlAccessConditionInfo = {
      fileAccessConditionKey: '',
      type: 'new',
      key: '',
      value: this.currentConditionValueInfo.value,
      conditionStatus: 'FDUCS00000001',

      conditionType: currentConditionType,
      conditionTypeName: this.conditionCodeList.filter((x) => {
        if (x.code === currentConditionType) {
          return true;
        }
        return false;
      })[0].codeName,
    };

    switch (currentConditionType) {
      case 'FDUCT00000001': // 특정 IP 제한
        
        break;
      case 'FDUCT00000002': // 특정 Header 값 제한
        if (typeof this.currentConditionKeyInfo.key !== 'string') {
          this.common.getAlertComponent()?.setDefault().setMessage('키를 입력해주세요.').show();
          return;
        }

        if (this.currentConditionKeyInfo.key.trim() === '') {
          this.common.getAlertComponent()?.setDefault().setMessage('키를 입력해주세요.').show();
          return;
        }

        newConditionItem.key = this.currentConditionKeyInfo.key;
        break;
      case 'FDUCT00000003': // 특정 암호 필요

        break;
      case 'FDUCT00000004': // 파일 정보 확인 후 다운로드 (URL 직접 다운로드 제한)

        break;
    }

    this.conditionItems.unshift(newConditionItem);
  }

  conditionDeleteButtonClick(item: FileDownloadUrlAccessConditionInfo): void {
    item.type = 'delete';
    if (item.fileAccessConditionKey === '') {
      this.conditionItems = this.conditionItems.filter((x) => {
        if (x !== item) {
          return true;
        } else {
          return false;
        }
      });
    }
  }

  fileDownloadCountInitButtonClick(): void {
    this.fileDownloadUrlInfo.fileDownloadCount = '0';
  }
}
