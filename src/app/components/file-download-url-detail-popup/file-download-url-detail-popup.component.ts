import { animate, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ModifyFileDownloadUrlData } from 'src/app/interfaces/modify-file-download-url-data.interface';
import { UploadFileDownloadUrlData } from 'src/app/interfaces/upload-file-download-url-data.interface';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { DeviceMode } from 'src/app/types/device-mode.type';
import { PopupMode } from 'src/app/types/popup-mode.type';
import { YN } from 'src/app/types/yn.type';
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
  @Output() newFileDownloadUrlModifyed = new EventEmitter();

  @ViewChild('fileDownloadUrlFormBox') fileDownloadUrlFormBox!: FileDownloadUrlFormBoxComponent;

  deviceMode: DeviceMode;
  deviceMode$: Observable<DeviceMode>;

  closeButtonMarginRight = '0';

  constructor(
    private common: CommonService,
    private ajax: AjaxService,
    private route: ActivatedRoute,
    private store: Store<{ deviceMode: DeviceMode }>,
  ) {
    this.isShow = false;
    this.isLoading = false;
    this.fileDownloadUrlKey = '';
    this.isFileDownloadUrlModifying = false;
    this.isFileDownloadUrlUploading = false;
    this.popupMode = 'modify';

    this.deviceMode = 'pc';
    this.deviceMode$ = this.store.select('deviceMode');
    this.deviceMode$.subscribe(
      data => {
        this.deviceMode = data;
        if (this.deviceMode === 'pc') {
          this.closeButtonMarginRight = '10px';
        } else {
          this.closeButtonMarginRight = '0';
        }
      }
    );
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
      this.fileDownloadUrlFormBox.dataInit();
      this.fileDownloadUrlFormBox.getFileDownloadUrlInfo(fileDownloadUrlKey);
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

  fileDownloadUrlInfoEditButtonClick(): void {
    if (this.isFileDownloadUrlModifying === true) {
      this.common.getAlertComponent()?.setMessage('?????? ????????????. ????????? ??????????????????.').show();
      return;
    }

    if (!this.fileDownloadUrlFormBox.infoValidationCheck()) {
      return;
    }

    const data: ModifyFileDownloadUrlData = {
      fileDownloadUrlKey: this.fileDownloadUrlKey,
    };

    if (this.fileDownloadUrlFormBox.isChanged('fileDownloadUrlTargetVersion')) {
      data.fileVersionKey = this.fileDownloadUrlFormBox.fileDownloadUrlInfo.FmsTargetFileVersions?.fileVersionKey;
    }

    if (this.fileDownloadUrlFormBox.isChanged('fileDownloadPossibleDateTimeStart')) {
      data.fileDownloadPossibleDateTimeStart = this.fileDownloadUrlFormBox.fileDownloadUrlInfo.fileDownloadPossibleDateTimeStart;
    }

    if (this.fileDownloadUrlFormBox.isChanged('fileDownloadPossibleDateTimeEnd')) {
      data.fileDownloadPossibleDateTimeEnd = this.fileDownloadUrlFormBox.fileDownloadUrlInfo.fileDownloadPossibleDateTimeEnd;
    }

    if (this.fileDownloadUrlFormBox.isChanged('fileDownloadLimitMaxCount')) {
      data.fileDownloadLimitMaxCount = this.fileDownloadUrlFormBox.fileDownloadUrlInfo.fileDownloadLimitMaxCount;
    }

    if (this.fileDownloadUrlFormBox.isChanged('fileDownloadCount')) {
      data.fileDownloadCount = this.fileDownloadUrlFormBox.fileDownloadUrlInfo.fileDownloadCount;
    }

    if (this.fileDownloadUrlFormBox.isChanged('fileDownloadUrlStatus')) {
      data.fileDownloadUrlStatus = this.fileDownloadUrlFormBox.fileDownloadUrlInfo.FmsFileDownloadUrlStatusCodes?.code;
    }

    if (this.fileDownloadUrlFormBox.isChanged('fileDownloadUrlAccessConditionInfo')) {
      data.fileDownloadUrlAccessConditionInfo = this.fileDownloadUrlFormBox.conditionItems;
    }

    if (this.fileDownloadUrlFormBox.isChanged('isPossibleDatetimeShow')) {
      data.isPossibleDatetimeShow = this.fileDownloadUrlFormBox.fileDownloadPossibleDatetimeShowRadio.getValue() as YN;
    }

    if (this.fileDownloadUrlFormBox.isChanged('isDownloadCountInfoShow')) {
      data.isDownloadCountInfoShow = this.fileDownloadUrlFormBox.fileDownloadCountInfoShowRadio.getValue() as YN;
    }

    this.isFileDownloadUrlModifying = true;

    const options = {
      withCredentials: true,
    };

    const observable = this.ajax.post(environment.api.fileDownloadUrl.modifyFileDownloadUrl, data, options);
    observable.subscribe(
      data2 => {
        this.isFileDownloadUrlModifying = false;
        console.log('response', data2);

        if (data2 instanceof HttpErrorResponse) {
          this.common.alertMessage(data2.error);
          return;
        } else if (data2.result !== 'success') {
          this.common.alertMessage(data2);
          return;
        }

        this.common.getAlertComponent()?.setDefault().setMessage('?????? ???????????? URL ????????? ?????????????????????.').show();
        // this.isShow = false;
        this.hide();
        this.newFileDownloadUrlModifyed.emit(this);
      },
    );
  }

  fileDownloadUrlInfoUploadButtonClick(): void {
    if (this.isFileDownloadUrlUploading === true) {
      this.common.getAlertComponent()?.setMessage('?????? ????????????. ????????? ??????????????????.').show();
      return;
    }

    if (!this.fileDownloadUrlFormBox.infoValidationCheck()) {
      return;
    }

    const data: UploadFileDownloadUrlData = {
      downloadTargetUserKey: this.fileDownloadUrlFormBox.fileDownloadUrlInfo.downloadTargetUserKey as string,
      fileKey: this.route.snapshot.params.fileKey,
      fileVersionKey: this.fileDownloadUrlFormBox.fileDownloadUrlInfo.FmsTargetFileVersions?.fileVersionKey as string,
      fileDownloadPossibleDateTimeStart: this.fileDownloadUrlFormBox.fileDownloadUrlInfo.fileDownloadPossibleDateTimeStart as string,
      fileDownloadPossibleDateTimeEnd: this.fileDownloadUrlFormBox.fileDownloadUrlInfo.fileDownloadPossibleDateTimeEnd as string,
      fileDownloadLimitMaxCount: this.fileDownloadUrlFormBox.fileDownloadUrlInfo.fileDownloadLimitMaxCount as string,
      fileDownloadUrlAccessConditionInfo: this.fileDownloadUrlFormBox.conditionItems,
      fileDownloadUrlStatus: this.fileDownloadUrlFormBox.fileDownloadUrlInfo.FmsFileDownloadUrlStatusCodes?.code as string,
      isPossibleDatetimeShow: this.fileDownloadUrlFormBox.fileDownloadPossibleDatetimeShowRadio.getValue() as YN,
      isDownloadCountInfoShow: this.fileDownloadUrlFormBox.fileDownloadCountInfoShowRadio.getValue() as YN,
    };
    // ...

    this.isFileDownloadUrlUploading = true;

    const options = {
      reportProgress: true,
      withCredentials: true,
    };

    const observable = this.ajax.post(environment.api.fileDownloadUrl.createFileDownloadUrl, data, options);
    observable.subscribe(
      data2 => {
        this.isFileDownloadUrlUploading = false;
        console.log('response', data2);

        if (data2 instanceof HttpErrorResponse) {
          this.common.alertMessage(data2.error);
          return;
        } else if (data2.result !== 'success') {
          this.common.alertMessage(data2);
          return;
        }

        this.common.getAlertComponent()?.setDefault().setMessage('?????? ???????????? URL??? ?????????????????????.').show();
        // this.isShow = false;
        this.hide();
        this.newFileDownloadUrlUploaded.emit(this);
      },
    );
  }
}
