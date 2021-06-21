import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodeItem } from 'src/app/interfaces/code-item.interface';
import { FileDownloadUrlInfo } from 'src/app/interfaces/file-download-url-info.interface';
import { FileOnlyVersionItem } from 'src/app/interfaces/file-only-version-item.interface';
import { SelectItem } from 'src/app/interfaces/select-item.interface';
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

  isFileDownloadUrlInfoGetting = false;

  fileVersionList: FileOnlyVersionItem[] = [];
  fileVersionListSelectItems: SelectItem[] = [];


  constructor(
    private route: ActivatedRoute,
    private ajax: AjaxService,
    private common: CommonService,
  ) { 
    this.fileVersionList = this.route.snapshot.data.FileVersionList;
    this.fileVersionListSelectItems = this.fileVersionList.map((x) => {
      return {
        optionUniqueID: x.fileVersionKey,
        optionValue: x.fileVersionKey,
        optionDisplayText: x.fileVersionName,
        selected: false,
      };
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
        fileVersionKey: '',
        fileKey: '',
        fileVersionName: '',
        fileVersionCode: '',
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
          fileVersionKey: '',
          fileKey: '',
          fileVersionName: '',
          fileVersionCode: '',
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

        const fileDownloadUrlInfo: FileDownloadUrlInfo = data.fileDownloadUrlInfo;
        this.setFileDownloadUrlInfo(data.fileDownloadUrlInfo);
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
      // ...
    }
    return result;
  }
}
