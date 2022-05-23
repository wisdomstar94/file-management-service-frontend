import { animate, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { DeviceMode } from 'src/app/types/device-mode.type';
import { PopupMode } from 'src/app/types/popup-mode.type';
import { environment } from 'src/environments/environment';
import { FileVersionFormBoxComponent } from '../file-version-form-box/file-version-form-box.component';

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
  selector: 'app-file-version-detail-popup',
  templateUrl: './file-version-detail-popup.component.html',
  styleUrls: ['./file-version-detail-popup.component.scss'],
  animations: [
    popupAnimation,
  ]
})
export class FileVersionDetailPopupComponent implements OnInit {
  isShow: boolean;
  isLoading: boolean;
  fileVersionKey: string;
  isFileVersionModifying: boolean;
  isFileVersionUploading: boolean;
  popupMode: PopupMode;

  @Input() fileKey!: string;
  @Output() newFileVersionUploaded = new EventEmitter();
  @Output() fileVersionModified = new EventEmitter();

  @ViewChild('fileVersionFormBox') fileVersionFormBox!: FileVersionFormBoxComponent;

  deviceMode: DeviceMode;
  deviceMode$: Observable<DeviceMode>;

  closeButtonMarginRight = '0';
  submitButtonMarginLeft = '0';
  buttonDisplay: string = 'inline-block';

  constructor(
    private common: CommonService,
    private ajax: AjaxService,
    private store: Store<{ deviceMode: DeviceMode }>,
  ) {
    this.isShow = false;
    this.isLoading = false;
    this.fileVersionKey = '';
    this.isFileVersionModifying = false;
    this.isFileVersionUploading = false;
    this.popupMode = 'modify';

    this.deviceMode = 'pc';
    this.deviceMode$ = this.store.select('deviceMode');
    this.deviceMode$.subscribe(
      data => {
        this.deviceMode = data;
        if (this.deviceMode === 'pc') {
          this.closeButtonMarginRight = '10px';
          this.submitButtonMarginLeft = '0';
          // this.buttonDisplay = 'inline-block';
        } else {
          this.closeButtonMarginRight = '0';
          this.submitButtonMarginLeft = '6px';
          // this.buttonDisplay = 'block';
        }
      }
    );
  }

  ngOnInit(): void {
    // console.log('this.common.getCommonNavComponent()', this.common.getCommonNavComponent());
  }

  setFileVersionKey(fileVersionKey: string): void {
    this.fileVersionKey = fileVersionKey;
  }

  setPopupMode(popupMode: PopupMode): void {
    this.popupMode = popupMode;
  }

  show(fileVersionKey: string, popupMode: PopupMode): void {
    if (this.isShow === true) {
      return;
    }

    this.setPopupMode(popupMode);
    this.setFileVersionKey(fileVersionKey);

    this.common.getCommonNavComponent()!.zIndex = 1;
    this.common.getCommonContentComponent()!.zIndex = 3;

    // this.fileVersionFormBox.getFileVersionInfo();

    setTimeout(() => {
      this.isShow = true;
      this.fileVersionFormBox.dataInit();
      this.fileVersionFormBox.getFileVersionInfo(fileVersionKey);
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
    if (this.isFileVersionModifying === true) {
      this.common.getAlertComponent()?.setMessage('수정 중입니다. 잠시만 기다려주세요.').show();
      return;
    }

    if (!this.fileVersionFormBox.infoValidationCheck()) {
      return;
    }

    const formData = new FormData();

    formData.append('fileVersionKey', this.fileVersionKey);

    if (this.fileVersionFormBox.isChanged('fileDownloadName')) {
      formData.append('fileDownloadName', this.fileVersionFormBox.fileVersionInfo.fileDownloadName!);
    }

    if (this.fileVersionFormBox.isChanged('versionFile')) {
      formData.append('versionFile', this.fileVersionFormBox.versionFile);
    }

    if (this.fileVersionFormBox.isChanged('fileVersionMemo')) {
      formData.append('fileVersionMemo', this.fileVersionFormBox.fileVersionInfo.fileVersionMemo!);
    }

    if (this.fileVersionFormBox.isChanged('fileVersionDescription')) {
      formData.append('fileVersionDescription', this.fileVersionFormBox.fileVersionInfo.fileVersionDescription!);
    }

    if (this.fileVersionFormBox.isChanged('fileVersionStatus')) {
      formData.append('fileVersionStatus', this.fileVersionFormBox.fileVersionInfo.FmsFileVersionStatusCodes?.code!);
    }

    this.isFileVersionModifying = true;

    const options = {
      reportProgress: true,
      withCredentials: true,
    };

    const observable = this.ajax.post(environment.api.fileVersion.modifyFileVersion, formData, options);
    observable.subscribe(
      data2 => {
        this.isFileVersionModifying = false;
        console.log('response', data2);

        if (data2 instanceof HttpErrorResponse) {
          this.common.alertMessage(data2.error);
          return;
        } else if (data2.result !== 'success') {
          this.common.alertMessage(data2);
          return;
        }

        this.common.getAlertComponent()?.setDefault().setMessage('파일 버전 정보가 수정되었습니다.').show();
        // this.isShow = false;
        this.hide();
        this.fileVersionModified.emit();
      },
    );
  }

  fileVersionInfoUploadButtonClick(): void {
    if (this.isFileVersionUploading === true) {
      this.common.getAlertComponent()?.setMessage('등록 중입니다. 잠시만 기다려주세요.').show();
      return;
    }

    if (!this.fileVersionFormBox.infoValidationCheck()) {
      return;
    }

    if (!(this.fileVersionFormBox.versionFile instanceof File)) {
      this.common.getAlertComponent()?.setMessage('파일을 등록해주세요.').show();
      return;
    }

    const formData = new FormData();

    formData.append('fileKey', this.fileKey);
    formData.append('fileVersionName', this.fileVersionFormBox.fileVersionInfo.fileVersionName!);
    formData.append('fileVersionCode', this.fileVersionFormBox.fileVersionInfo.fileVersionCode!);
    formData.append('fileDownloadName', this.fileVersionFormBox.fileVersionInfo.fileDownloadName!);
    formData.append('versionFile', this.fileVersionFormBox.versionFile);
    formData.append('fileVersionMemo', this.fileVersionFormBox.fileVersionInfo.fileVersionMemo!);
    formData.append('fileVersionDescription', this.fileVersionFormBox.fileVersionInfo.fileVersionDescription!);
    formData.append('fileVersionStatus', this.fileVersionFormBox.fileVersionInfo.FmsFileVersionStatusCodes?.code!);

    this.isFileVersionUploading = true;

    const options = {
      reportProgress: true,
      withCredentials: true,
    };

    const observable = this.ajax.post(environment.api.fileVersion.uploadFileVersion, formData, options);
    observable.subscribe(
      data => {
        this.isFileVersionUploading = false;
        console.log('response', data);

        if (data instanceof HttpErrorResponse) {
          this.common.alertMessage(data.error);
          return;
        } else if (data.result !== 'success') {
          this.common.alertMessage(data);
          return;
        }

        this.common.getAlertComponent()?.setDefault().setMessage('파일 버전 정보가 등록되었습니다.').show();
        // this.isShow = false;
        this.hide();
        this.newFileVersionUploaded.emit(this);
      },
    );
  }
}
