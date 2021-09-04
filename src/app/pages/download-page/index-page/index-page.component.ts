import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileVersionHistoryPopupComponent } from 'src/app/components/file-version-history-popup/file-version-history-popup.component';
import { FileNormalInfo } from 'src/app/interfaces/file-normal-info.interface';
import { FileSizeUnit } from 'src/app/interfaces/file-size-unit.interface';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {
  @ViewChild('fileVersionHistoryPopup') fileVersionHistoryPopup!: FileVersionHistoryPopupComponent;

  fileDownloadUrlKey: string;
  fileNormalInfo: FileNormalInfo;
  byteConvertInfo: FileSizeUnit;
  requirePassword: string;
  password: string;

  constructor(
    private ajax: AjaxService,
    private route: ActivatedRoute,
    private router: Router,
    public common: CommonService,
  ) { 
    this.fileDownloadUrlKey = this.route.snapshot.params.fileDownloadUrlKey;
    this.fileNormalInfo = this.route.snapshot.data.FileDownloadUrlOuterInfo;
    if (this.fileNormalInfo === undefined || this.fileNormalInfo?.fileSize === undefined) {
      localStorage.setItem(environment.localStorageName.fileDownloadUrlErrorResult, JSON.stringify(this.route.snapshot.data.FileDownloadUrlOuterInfo));
      this.router.navigate(['file/download/error']);
    }


    this.byteConvertInfo = this.common.byteConvert(this.fileNormalInfo.fileSize);
    this.password = '';
    this.requirePassword = this.route.snapshot.queryParams.requirePassword;
    // console.log('this.requirePassword', this.requirePassword);
  }

  ngOnInit(): void {

  }

  downloadButtonClick(): void {
    const baseUrl = environment.baseUrl;

    if (this.fileNormalInfo.requirePassword !== true) {
      const myObservable = this.ajax.post(environment.api.download.downloadCheck, {
        fileDownloadUrlKey: this.fileDownloadUrlKey,
      });
      myObservable.subscribe(
        data => {
          const downloadjwt = data.downloadjwt;
          const locationHref = ''
            .concat(baseUrl)
            .concat('/api/download/file/')
            .concat(this.fileDownloadUrlKey)
            .concat('?', 'downloadjwt=', downloadjwt)
          ;
          location.href = locationHref;
          return;
        },
        error => {

        },
        () => {

        }
      );

      return;
    }

    const myObservable = this.ajax.post(environment.api.download.downloadPasswordCheck, {
      fileDownloadUrlKey: this.fileDownloadUrlKey,
      password: this.password,
    }, {
      withCredentials: true,
    });
    myObservable.subscribe(
      data => {
        if (data.code !== 10001000) {
          this.common.getAlertComponent()?.setDefault().setMessage('암호가 일치하지 않습니다.').show();
          return;
        }

        this.password = '';

        const downloadjwt = data.downloadjwt;
        const passwordjwt = data.passwordjwt;
        const locationHref = ''
          .concat(baseUrl)
          .concat('/api/download/file/')
          .concat(this.fileDownloadUrlKey)
          .concat('?', 'downloadjwt=', downloadjwt)
          .concat('&', 'passwordjwt=', passwordjwt)
        ;
        location.href = locationHref;
        return;
      },
      error => {

      },
      () => {

      }
    );
    return;
  }

  versionHistoryViewButtonClicked(event: MouseEvent): void {
    this.fileVersionHistoryPopup.show();
  }
}
