import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodeItem } from 'src/app/interfaces/code-item.interface';
import { FileVersionInfo } from 'src/app/interfaces/file-version-info.interface';
import { SelectItem } from 'src/app/interfaces/select-item.interface';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { FileVersionColumn } from 'src/app/types/file-version-column.type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-version-form-box',
  templateUrl: './file-version-form-box.component.html',
  styleUrls: ['./file-version-form-box.component.scss']
})
export class FileVersionFormBoxComponent implements OnInit {
  @Output() infoTaking = new EventEmitter();
  @Output() infoTaken = new EventEmitter();

  @Input() fileVersionKey!: string;
  cleanFileVersionInfo!: FileVersionInfo;
  fileVersionInfo!: FileVersionInfo;
  fileVersionStatusSelectItems: SelectItem[] = [];

  isFileVersionInfoGetting = false;

  @ViewChild('versionFileElement') versionFileElement!: ElementRef;
  versionFile!: File;

  constructor(
    private route: ActivatedRoute,
    private ajax: AjaxService,
    private common: CommonService,
  ) { 
    const statusCodeList: CodeItem[] = this.route.snapshot.data.FileVersionStatusCode;
    this.fileVersionStatusSelectItems = statusCodeList.map((x) => {
      return {
        optionUniqueID: x.code,
        optionValue: x.code,
        optionDisplayText: x.codeName,
        selected: false,
      };
    });

    this.fileVersionInfo = {
      FmsFiles: {
        fileKey: '',
        fileLabelName: '',
      },
      FmsCreaterUsers: {
        userId: '',
        userKey: '',
      },
      FmsUpdaterUsers: {
        userId: '',
        userKey: '',
      },
      FmsFileVersionStatusCodes: {
        code: '',
        codeName: '',
      }
    };
  }

  ngOnInit(): void {
    // console.log('이 부분 호출 확인 abab', this.fileVersionKey);
    setTimeout(() => {
      this.getFileVersionInfo(this.fileVersionKey);
    });
  }

  setFileVersionInfo(v: FileVersionInfo): void {
    this.fileVersionInfo = v;
    this.cleanFileVersionInfo = { ...v };
    if (this.fileVersionInfo !== undefined) {
      this.cleanFileVersionInfo.FmsCreaterUsers = { ...this.fileVersionInfo.FmsCreaterUsers! };
      this.cleanFileVersionInfo.FmsUpdaterUsers = { ...this.fileVersionInfo.FmsUpdaterUsers! };
      this.cleanFileVersionInfo.FmsFiles = { ...this.fileVersionInfo.FmsFiles! };
      this.cleanFileVersionInfo.FmsFileVersionStatusCodes = { ...this.fileVersionInfo.FmsFileVersionStatusCodes! };
    } else {
      this.fileVersionInfo = {
        FmsFiles: {
          fileKey: '',
          fileLabelName: '',
        },
        FmsCreaterUsers: {
          userId: '',
          userKey: '',
        },
        FmsUpdaterUsers: {
          userId: '',
          userKey: '',
        },
        FmsFileVersionStatusCodes: {
          code: '',
          codeName: '',
        }
      }
    }
  }

  getFileVersionInfo(fileVersionKey: string): void {
    if (this.isFileVersionInfoGetting === true) {
      return;
    }

    this.fileVersionKey = fileVersionKey;
    this.isFileVersionInfoGetting = true;
    this.infoTaking.emit();

    const data = {
      fileVersionKey: fileVersionKey,
    };

    const myObservable = this.ajax.post(environment.api.fileVersion.versionInfo, data);
    myObservable.subscribe(
      data => {
        // console.log('getFileVersionInfo.data', data);

        this.isFileVersionInfoGetting = false;
        this.infoTaken.emit();

        const fileVersionInfo: FileVersionInfo = data.fileVersionInfo;
        if (fileVersionInfo.FmsUpdaterUsers === null) {
          fileVersionInfo.FmsUpdaterUsers = {
            userKey: '',
            userId: '',
          };
        }

        this.setFileVersionInfo(data.fileVersionInfo);
      },
      error => {
        this.isFileVersionInfoGetting = false;
        this.infoTaken.emit();

      },
      () => {
        this.isFileVersionInfoGetting = false;
      }
    );
  }

  versionFileUploadButtonClick(): void {
    this.versionFileElement.nativeElement.click();
  }

  fileChanged(event: Event): void {
    this.versionFile = (event.target as any).files[0] as File;
    // console.log('this.versionFile', this.versionFile);
    this.fileVersionInfo.fileDownloadName = this.versionFile.name;
  }

  infoValidationCheck(): boolean {
    this.common.getAlertComponent()?.setDefault();

    if (this.fileVersionInfo === undefined) {
      this.common.getAlertComponent()?.setMessage('파일 버전 정보가 없습니다.').show();
      return false;
    }

    return true;
  }

  isChanged(fileVersionColumn: FileVersionColumn): boolean {
    let result = false;
    switch (fileVersionColumn) {
      case 'fileDownloadName':
        if (this.fileVersionInfo.fileDownloadName !== this.cleanFileVersionInfo.fileDownloadName) {
          result = true;
        }
        break;  
      case 'fileVersionCode':
        // 작업중...
        break;  
      case 'fileDownloadName':

        break;  
      case 'fileVersionMemo':

        break;  
      case 'fileVersionDescription':

        break;  
      case 'fileVersionStatus':

        break;  
    }
    return result;
  }
}
