import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { PopupMode } from 'src/app/types/popup-mode.type';
import { environment } from 'src/environments/environment';
import { FileDownloadUrlFormBoxComponent } from '../file-download-url-form-box/file-download-url-form-box.component';

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
  selector: 'app-file-download-url-detail-popup',
  templateUrl: './file-download-url-detail-popup.component.html',
  styleUrls: ['./file-download-url-detail-popup.component.scss'],
  animations: [
    popupAnimation
  ],
})
export class FileDownloadUrlDetailPopupComponent implements OnInit {
  isShow: boolean;
  isLoading: boolean;
  fileDownloadUrlKey: string;
  isFileDownloadUrlModifying: boolean;
  isFileDownloadUrlUploading: boolean;
  popupMode: PopupMode;

  @Input() fileKey!: string;
  @Output() newFileDownloadUrlUploaded = new EventEmitter();

  @ViewChild('fileDownloadUrlFormBox') fileDownloadUrlFormBox!: FileDownloadUrlFormBoxComponent;

  constructor(
    private common: CommonService,
    private ajax: AjaxService,
  ) { 
    this.isShow = false;
    this.isLoading = false;
    this.fileDownloadUrlKey = '';
    this.isFileDownloadUrlModifying = false;
    this.isFileDownloadUrlUploading = false;
    this.popupMode = 'modify';
  }

  ngOnInit(): void {
    // console.log('this.common.getCommonNavComponent()', this.common.getCommonNavComponent());
  }

  setFileDownloadUrlKey(fileDownloadUrlKey: string): void {
    this.fileDownloadUrlKey = fileDownloadUrlKey;
  }

  setPopupMode(popupMode: PopupMode): void {
    this.popupMode = popupMode;
  }

  show(fileDownloadUrlKey: string, popupMode: PopupMode): void {
    if (this.isShow === true) {
      return;
    }

    this.setPopupMode(popupMode);
    this.setFileDownloadUrlKey(fileDownloadUrlKey);

    this.common.getCommonNavComponent()!.zIndex = 1;
    this.common.getCommonContentComponent()!.zIndex = 3;

    // this.fileDownloadUrlFormBox.getFileVersionInfo();

    setTimeout(() => {
      this.isShow = true;
    }, 100);  
  }

  hide(): void {
    this.isShow = false;
    setTimeout(() => {
      console.log('??? / ???');
      this.common.getCommonNavComponent()!.zIndex = 3;
      this.common.getCommonContentComponent()!.zIndex = 1;
    }, 200);
  }

  closeButtonClick(): void {
    this.hide();
  }

  fileVersionInfoEditButtonClick(): void {
    if (this.isFileDownloadUrlModifying === true) {
      this.common.getAlertComponent()?.setMessage('수정 중입니다. 잠시만 기다려주세요.').show();
      return;
    }

    if (!this.fileDownloadUrlFormBox.infoValidationCheck()) {
      return;
    }

    const data: any = {};

    data.fileDownloadUrlKey = this.fileDownloadUrlKey;

    if (this.fileDownloadUrlFormBox.isChanged('fileDownloadUrlTargetVersion')) {
      data.fileVersionKey = this.fileDownloadUrlFormBox.fileDownloadUrlInfo.FmsTargetFileVersions?.fileVersionKey;
    }
    // ...

    this.isFileDownloadUrlModifying = true;

    const options = {
      withCredentials: true,
    };

    const observable = this.ajax.post(environment.api.fileDownloadUrl.modifyFileDownloadUrl, data, options);
    const subscribe = observable.subscribe(
      data => {
        this.isFileDownloadUrlModifying = false;
        console.log('response', data);
        if (data.result !== 'success') {
          this.common.alertMessage(data);
          return;
        }

        this.common.getAlertComponent()?.setDefault().setMessage('파일 다운로드 URL 정보가 수정되었습니다.').show();
        return;
      },
      error => {
        this.isFileDownloadUrlModifying = false;
        this.common.alertMessage(error);
        return;
      },
    );
  }

  fileVersionInfoUploadButtonClick(): void {
    if (this.isFileDownloadUrlUploading === true) {
      this.common.getAlertComponent()?.setMessage('등록 중입니다. 잠시만 기다려주세요.').show();
      return;
    }

    if (!this.fileDownloadUrlFormBox.infoValidationCheck()) {
      return;
    }

    const data: any = {};

    data.fileDownloadUrlKey = this.fileDownloadUrlKey;
    // ...
  
    this.isFileDownloadUrlUploading = true;

    const options = {
      reportProgress: true,
      withCredentials: true,
    };

    const observable = this.ajax.post(environment.api.fileVersion.uploadFileVersion, data, options);
    const subscribe = observable.subscribe(
      data => {
        this.isFileDownloadUrlUploading = false;
        console.log('response', data);
        if (data.result !== 'success') {
          this.common.alertMessage(data);
          return;
        }

        this.common.getAlertComponent()?.setDefault().setMessage('파일 버전 정보가 등록되었습니다.').show();
        this.newFileDownloadUrlUploaded.emit(this);
        return;
      },
      error => {
        this.isFileDownloadUrlUploading = false;
        this.common.alertMessage(error);
        return;
      },
    );
  }
}
