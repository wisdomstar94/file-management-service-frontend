import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FileBasicFormBoxComponent } from 'src/app/components/file-basic-form-box/file-basic-form-box.component';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { changeDestination } from 'src/app/store/destination/destination.action';
import { setActiveMenuKey } from 'src/app/store/menu/menu.action';
import { YN } from 'src/app/types/yn.type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss']
})
export class UploadPageComponent implements OnInit {
  @ViewChild('fileBasicFormBox') fileBasicFormBox!: FileBasicFormBoxComponent;
  isUploadingFileBasic: boolean;

  constructor(
    private store: Store<{ destination: string[], activeMenuKey: string }>,
    private route: ActivatedRoute,
    private router: Router,
    private common: CommonService,
    private ajax: AjaxService,
    private http: HttpClient,
  ) { 
    this.isUploadingFileBasic = false;
  }

  ngOnInit(): void {

  }

  ngDoCheck(): void {
    const t = this;
    t.store.dispatch(changeDestination({ destination: ['홈', '파일관리', '파일 신규 등록'] }));
    t.store.dispatch(setActiveMenuKey({ menuKey: 'Ig1617524166484wTSHK' }));
  }

  goList(): void {
    this.router.navigate(['file']);
  }

  fileUploadButtonClick(): void {
    // const fileRepresentImage = this.fileBasicFormBox.fileRepresentImage.getFile();
    // console.log('fileRepresentImage', fileRepresentImage);

    if (this.isUploadingFileBasic) {
      this.common.getAlertComponent()?.setDefault().setMessage('등록 중입니다. 잠시만 기다려주세요.').show();
      return;
    }

    if (!this.fileBasicFormBox.infoValidationCheck()) {
      return;
    }

    // const data: ModifyFileBasicInfoData = {
    //   fileKey: this.fileBasicFormBox.fileBasicInfo.fileInfo.fileKey!,
    // };
    const formData = new FormData();
    formData.append('fileKey', this.fileBasicFormBox.fileBasicInfo.fileInfo.fileKey!);
    formData.append('fileLabelName', this.fileBasicFormBox.fileBasicInfo.fileInfo.fileLabelName!);
    formData.append('fileMemo', this.fileBasicFormBox.fileBasicInfo.fileInfo.fileMemo!);
    formData.append('fileDescription', this.fileBasicFormBox.fileBasicInfo.fileInfo.fileDescription!);
    formData.append('fileStoreVersionHistoryOpen', this.fileBasicFormBox.fileStoreVersionHistoryRadio.getValue() as YN);
    formData.append('fileStoreDescriptionOpen', this.fileBasicFormBox.fileStoreDescriptionOpenRadio.getValue() as YN);

    formData.append('fileRepresentImage', this.fileBasicFormBox.fileRepresentImage.getFile()!);
    if (this.fileBasicFormBox.fileRepresentImage.getFile() instanceof File) {
      formData.append('fileImageRepresentInfoJsonString', JSON.stringify([{
        infoType: 'new',
        fileImageKey: '',
        sortNo: 1,
      }]));
    } else {
      formData.append('isFileRepresentImageDelete', 'Y');
      formData.append('fileImageRepresentInfoJsonString', JSON.stringify([]));
    }

    const newImages = this.fileBasicFormBox.fileScreenShotImage.getNewFiles();
    for (const item of newImages) {
      formData.append('fileScreenShot', item);
    }
    formData.append('fileImageScreenShotInfoJsonString', JSON.stringify(this.fileBasicFormBox.fileScreenShotImage.getImageFiles().map((x) => {
      let infoType = 'new';
      const fileImageKey = x.imageKey;
      const sortNo = x.sortNo;
      if (fileImageKey.length === 20) {
        infoType = 'original';
      }
      if (x.isDeleted === true) {
        infoType = 'delete';
      }

      return {
        infoType: infoType,
        fileImageKey: fileImageKey,
        sortNo: sortNo,
      };
    })));
    
    formData.append('fileStatus', this.fileBasicFormBox.fileBasicInfo.fileInfo.FmsFileStatusCodes?.code!);
    
     
    console.log('formData', formData);
    

    // if (Object.keys(data).length === 1) {
    //   this.common.getAlertComponent()?.setDefault().setMessage('수정된 부분이 없습니다.').show();
    //   return;
    // }

    const options = {
      reportProgress: true,
      withCredentials: true,
    };

    const observable = this.ajax.post(environment.api.file.uploadFile, formData, options);
    const subscribe = observable.subscribe(
      data => {
        this.isUploadingFileBasic = false;
        console.log('response', data);
        if (data.result !== 'success') {
          this.common.alertMessage(data);
          return;
        }

        this.common.getAlertComponent()?.setDefault().setMessage('파일이 등록되었습니다.').show();
        this.router.navigate(['file/info/' + data.fileKey]);
        return;
      },
      error => {
        this.isUploadingFileBasic = false;
        this.common.alertMessage(error);
        return;
      },
    );
  }
}
