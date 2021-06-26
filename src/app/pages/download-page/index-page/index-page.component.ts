import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  fileDownloadUrlKey: string;
  fileNormalInfo: FileNormalInfo;
  byteConvertInfo: FileSizeUnit;
  requirePassword: string;
  password: string;

  constructor(
    private ajax: AjaxService,
    private route: ActivatedRoute,
    public common: CommonService,
  ) { 
    this.fileDownloadUrlKey = this.route.snapshot.params.fileDownloadUrlKey;
    this.fileNormalInfo = this.route.snapshot.data.FileDownloadUrlOuterInfo;
    this.byteConvertInfo = this.common.byteConvert(this.fileNormalInfo.fileSize);
    this.password = '';
    this.requirePassword = this.route.snapshot.queryParams.requirePassword;
    console.log('this.requirePassword', this.requirePassword);
  }

  ngOnInit(): void {

  }

  downloadButtonClick(): void {
    if (this.fileNormalInfo.requirePassword !== true) {
      const myObservable = this.ajax.post(environment.api.download.downloadCheck, {
        fileDownloadUrlKey: this.fileDownloadUrlKey,
      });
      myObservable.subscribe(
        data => {
          location.href = 'http://localhost:47220/api/download/file/' + this.fileDownloadUrlKey;
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
    });
    myObservable.subscribe(
      data => {
        if (data.code !== 10001000) {
          this.common.getAlertComponent()?.setDefault().setMessage('암호가 일치하지 않습니다.').show();
          return;
        }

        this.password = '';
        location.href = 'http://localhost:47220/api/download/file/' + this.fileDownloadUrlKey;
        return;
      },
      error => {

      },
      () => {

      }
    );
    return;
  }
}
