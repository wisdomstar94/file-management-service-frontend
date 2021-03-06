import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodeItem } from 'src/app/interfaces/code-item.interface';
import { ConditionInfo } from 'src/app/interfaces/condition-info.interface';
import { FileDownloadUrlAccessConditionInfo } from 'src/app/interfaces/file-download-url-access-condition-info.interface';
import { FileDownloadUrlInfo } from 'src/app/interfaces/file-download-url-info.interface';
import { FileOnlyVersionItem } from 'src/app/interfaces/file-only-version-item.interface';
import { RadioItem } from 'src/app/interfaces/radio-item.interface';
import { SelectItem } from 'src/app/interfaces/select-item.interface';
import { UserItem } from 'src/app/interfaces/user-item.interface';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { MyDateService } from 'src/app/services/my-date.service';
import { FileDownloadUrlColumn } from 'src/app/types/file-download-url-column.type';
import { PopupMode } from 'src/app/types/popup-mode.type';
import { environment } from 'src/environments/environment';
import { FmsDatetimeInputComponent } from '../fms-datetime-input/fms-datetime-input.component';
import { FmsRadioComponent } from '../fms-radio/fms-radio.component';

@Component({
  selector: 'app-file-download-url-form-box',
  templateUrl: './file-download-url-form-box.component.html',
  styleUrls: ['./file-download-url-form-box.component.scss']
})
export class FileDownloadUrlFormBoxComponent implements OnInit {
  @ViewChild('fileDownloadPossibleDateTimeStartElement') fileDownloadPossibleDateTimeStartElement!: FmsDatetimeInputComponent;
  @ViewChild('fileDownloadPossibleDateTimeEndElement') fileDownloadPossibleDateTimeEndElement!: FmsDatetimeInputComponent;
  @ViewChild('fileDownloadPossibleDatetimeShowRadio') fileDownloadPossibleDatetimeShowRadio!: FmsRadioComponent;
  @ViewChild('fileDownloadCountInfoShowRadio') fileDownloadCountInfoShowRadio!: FmsRadioComponent;

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

  isFileVersionGetting = false;

  baseUrl = environment.baseUrl;

  fileDownloadPossibleDatetimeShowRadioItems: RadioItem[] = [
    {
      valueUniqueID: 'Y',
      value: 'Y',
      displayText: '?????? ???????????? ?????? ????????? ???????????????.',
      checked: false,
    },
    {
      valueUniqueID: 'N',
      value: 'N',
      displayText: '?????? ???????????? ?????? ????????? ???????????? ????????????.',
      checked: true,
    },
  ];

  fileDownloadCountInfoShowRadioItems: RadioItem[] = [
    {
      valueUniqueID: 'Y',
      value: 'Y',
      displayText: '?????? ???????????? ?????? ????????? ???????????????.',
      checked: false,
    },
    {
      valueUniqueID: 'N',
      value: 'N',
      displayText: '?????? ???????????? ?????? ????????? ???????????? ????????????.',
      checked: true,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private ajax: AjaxService,
    private common: CommonService,
    private myDate: MyDateService,
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
      optionDisplayText: '?????? ??????',
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

  dataInit(): void {
    this.getFileVersionList();

    this.fileDownloadUrlInfo = {
      fileDownloadPossibleDateTimeStart: ' ',
      fileDownloadPossibleDateTimeEnd: ' ',
      isPossibleDatetimeShow: 'N',
      isDownloadCountInfoShow: 'N',
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

    this.fileDownloadPossibleDateTimeStartElement.dataInit();
    this.fileDownloadPossibleDateTimeEndElement.dataInit();

    this.cleanConditionItems = [];
    this.conditionItems = [];
  }

  ngOnInit(): void {
    // console.log('??? ?????? ?????? ?????? abab', this.fileVersionKey);
    // this.getFileVersionList();
    // setTimeout(() => {
    //   this.getFileDownloadUrlInfo(this.fileDownloadUrlKey);
    // });
  }

  setFileDownloadUrlInfo(v: FileDownloadUrlInfo): void {
    this.fileDownloadUrlInfo = v;
    this.cleanFileDownloadUrlInfo = { ...v };
    if (this.fileDownloadUrlInfo !== undefined) {
      if (this.fileDownloadUrlInfo.fileVersionKey === null) {
        this.fileDownloadUrlInfo.FmsTargetFileVersions!.fileVersionKey = 'null';
      }

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

    this.getFileVersionList();

    const myObservable = this.ajax.post(environment.api.fileDownloadUrl.fileDownloadUrlInfo, data);
    myObservable.subscribe(
      data2 => {
        // console.log('getFileDownloadUrlInfo.data2', data2);

        this.isFileDownloadUrlInfoGetting = false;
        this.infoTaken.emit();

        if (data2.fileDownloadUrlInfo === null) {
          return;
        }

        const fileDownloadUrlInfo: FileDownloadUrlInfo = data2.fileDownloadUrlInfo;
        if (fileDownloadUrlInfo.FmsTargetFileVersions === null) {
          fileDownloadUrlInfo.FmsTargetFileVersions = {
            fileVersionKey: 'null',
            fileVersionName: '????????????',
            fileVersionCode: '0',
            fileDownloadName: '',
            fileKey: '',
          };
        }
        const conditionInfo: ConditionInfo[] = data2.conditionInfo;
        this.setFileDownloadUrlInfo(fileDownloadUrlInfo);
        this.setConditionInfo(conditionInfo);
      },
    );
  }

  infoValidationCheck(): boolean {
    this.common.getAlertComponent()?.setDefault();

    if (this.fileDownloadUrlInfo === undefined) {
      this.common.getAlertComponent()?.setMessage('?????? ???????????? URL ????????? ????????????.').show();
      return false;
    }

    // FmsTargetFileVersions?.fileVersionKey ??????
    if (typeof this.fileDownloadUrlInfo.FmsTargetFileVersions?.fileVersionKey !== 'string') {
      this.common.getAlertComponent()?.setMessage('?????? ?????? ?????? ????????? ????????????.').show();
      return false;
    }

    if (this.fileDownloadUrlInfo.FmsTargetFileVersions?.fileVersionKey === '') {
      this.common.getAlertComponent()?.setMessage('?????? ?????? ????????? ??????????????????.').show();
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
      case 'isPossibleDatetimeShow':
        if (this.fileDownloadPossibleDatetimeShowRadio.getValue() !== this.cleanFileDownloadUrlInfo.isPossibleDatetimeShow) {
          result = true;
        }
        break;
      case 'isDownloadCountInfoShow':
        if (this.fileDownloadCountInfoShowRadio.getValue() !== this.cleanFileDownloadUrlInfo.isDownloadCountInfoShow) {
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
        this.common.getAlertComponent()?.setDefault().setMessage('?????? ?????? ????????? 1?????? ?????? ???????????????.').show();
        return;
      }
    }

    if (currentConditionType !== 'FDUCT00000004') {
      if (typeof this.currentConditionValueInfo.value !== 'string') {
        this.common.getAlertComponent()?.setDefault().setMessage('?????? ??????????????????.').show();
        return;
      }

      if (this.currentConditionValueInfo.value.trim() === '') {
        this.common.getAlertComponent()?.setDefault().setMessage('?????? ??????????????????.').show();
        return;
      }
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
      case 'FDUCT00000001': // ?????? IP ??????

        break;
      case 'FDUCT00000002': // ?????? Header ??? ??????
        if (typeof this.currentConditionKeyInfo.key !== 'string') {
          this.common.getAlertComponent()?.setDefault().setMessage('?????? ??????????????????.').show();
          return;
        }

        if (this.currentConditionKeyInfo.key.trim() === '') {
          this.common.getAlertComponent()?.setDefault().setMessage('?????? ??????????????????.').show();
          return;
        }

        newConditionItem.key = this.currentConditionKeyInfo.key;
        break;
      case 'FDUCT00000003': // ?????? ?????? ??????

        break;
      case 'FDUCT00000004': // ?????? ?????? ?????? ??? ???????????? (URL ?????? ???????????? ??????)

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

  getFileVersionList(): void {
    if (this.isFileVersionGetting) {
      return;
    }

    const myObservable = this.ajax.post(environment.api.fileVersion.onlyFileVersionList, {
      fileKey: this.route.snapshot.params.fileKey,
    });

    this.isFileVersionGetting = true;

    myObservable.subscribe(
      data => {
        this.isFileVersionGetting = false;
        const result: FileOnlyVersionItem[] = data.list;

        this.fileVersionListSelectItems = result.map((x) => {
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
          optionDisplayText: '?????? ??????',
          selected: false,
        });
      },
    );
  }

  quickLimitDatetimeButtonClick(type: string | number) {
    const dateInfo = {
      startDateTime: '',
      endDateTime: '',
    };

    if (typeof type === 'string') {
      switch (type) {
        case 'today':
          dateInfo.startDateTime = this.myDate.myDate().format('YYYY-MM-DD 00:00:00');
          dateInfo.endDateTime = this.myDate.myDate().format('YYYY-MM-DD 23:59:59');
          break;
        case 'weekend':
          dateInfo.startDateTime = this.myDate.myDate().format('YYYY-MM-DD 00:00:00');
          dateInfo.endDateTime = this.myDate.myDate().getThisWeekLastDateObject().format('YYYY-MM-DD 23:59:59');
          break;
        case 'month':
          dateInfo.startDateTime = this.myDate.myDate().format('YYYY-MM-DD 00:00:00');
          dateInfo.endDateTime = this.myDate.myDate().format('YYYY-MM-${LD} 23:59:59');
          break;
        case 'semi-permanent':
          dateInfo.startDateTime = this.myDate.myDate().format('YYYY-MM-DD 00:00:00');
          dateInfo.endDateTime = this.myDate.myDate().format('2150-MM-DD 23:59:59');
          break;
      }

      this.fileDownloadUrlInfo.fileDownloadPossibleDateTimeStart = dateInfo.startDateTime;
      this.fileDownloadUrlInfo.fileDownloadPossibleDateTimeEnd = dateInfo.endDateTime;
      return;
    }

    if (typeof type === 'number') {
      dateInfo.startDateTime = this.myDate.myDate().format('YYYY-MM-DD HH:mm:ss');
      dateInfo.endDateTime = this.myDate.myDate().add(type, 'date').format('YYYY-MM-DD HH:mm:ss');

      this.fileDownloadUrlInfo.fileDownloadPossibleDateTimeStart = dateInfo.startDateTime;
      this.fileDownloadUrlInfo.fileDownloadPossibleDateTimeEnd = dateInfo.endDateTime;
    }
  }
}
