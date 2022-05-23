import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit, DoCheck {
  @ViewChild('fileBasicFormBox') fileBasicFormBox!: FileBasicFormBoxComponent;
  isModifyingFileBasic: boolean;

  constructor(
    private store: Store<{ destination: string[], activeMenuKey: string }>,
    private route: ActivatedRoute,
    private router: Router,
    private common: CommonService,
    private ajax: AjaxService,
    private http: HttpClient,
  ) {
    this.isModifyingFileBasic = false;
  }

  ngOnInit(): void {

  }

  ngDoCheck(): void {
    const t = this;
    t.store.dispatch(changeDestination({ destination: ['홈', '파일관리', '파일상세정보'] }));
    t.store.dispatch(setActiveMenuKey({ menuKey: 'Ig1617524166484wTSHK' }));
  }

  goList(): void {
    this.router.navigate(['file']);
  }

  fileBasicInfoEditButtonClick(): void {
    // const fileRepresentImage = this.fileBasicFormBox.fileRepresentImage.getFile();
    // console.log('fileRepresentImage', fileRepresentImage);

    if (this.isModifyingFileBasic) {
      this.common.getAlertComponent()?.setDefault().setMessage('수정 중입니다. 잠시만 기다려주세요.').show();
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

    if (this.fileBasicFormBox.isChanged('fileLabelName')) {
      // data.fileLabelName = this.fileBasicFormBox.fileBasicInfo.fileInfo.fileLabelName;
      formData.append('fileLabelName', this.fileBasicFormBox.fileBasicInfo.fileInfo.fileLabelName!);
    }

    if (this.fileBasicFormBox.isChanged('fileMemo')) {
      // data.fileMemo = this.fileBasicFormBox.fileBasicInfo.fileInfo.fileMemo;
      formData.append('fileMemo', this.fileBasicFormBox.fileBasicInfo.fileInfo.fileMemo!);
    }

    if (this.fileBasicFormBox.isChanged('fileDescription')) {
      // data.fileDescription = this.fileBasicFormBox.fileBasicInfo.fileInfo.fileDescription;
      formData.append('fileDescription', this.fileBasicFormBox.fileBasicInfo.fileInfo.fileDescription!);
    }

    if (this.fileBasicFormBox.isChanged('fileStoreVersionHistory')) {
      // data.fileStoreVersionHistoryOpen = this.fileBasicFormBox.fileStoreVersionHistoryRadio.getValue() as YN;
      formData.append('fileStoreVersionHistoryOpen', this.fileBasicFormBox.fileStoreVersionHistoryRadio.getValue() as YN);
    }

    if (this.fileBasicFormBox.isChanged('fileStoreDescriptionOpen')) {
      // data.fileStoreDescriptionOpen = this.fileBasicFormBox.fileStoreDescriptionOpenRadio.getValue() as YN;
      formData.append('fileStoreDescriptionOpen', this.fileBasicFormBox.fileStoreDescriptionOpenRadio.getValue() as YN);
    }

    if (this.fileBasicFormBox.isChanged('fileRepresentImage')) {
      // data.fileRepresentImage = [this.fileBasicFormBox.fileRepresentImage.getFile()];
      formData.append('fileRepresentImage', this.fileBasicFormBox.fileRepresentImage.getFile()!);
      if (this.fileBasicFormBox.fileRepresentImage.getFile() instanceof File) {
        formData.append('fileImageRepresentInfoJsonString', JSON.stringify([{
          infoType: 'new',
          fileImageKey: '',
          sortNo: 1,
        }]));
      } else {
        formData.append('isFileRepresentImageDelete', this.fileBasicFormBox.fileRepresentImage.getIsDeleted());
        formData.append('fileImageRepresentInfoJsonString', JSON.stringify([]));
      }
    } else {
      formData.append('fileImageRepresentInfoJsonString', JSON.stringify([]));
    }

    if (this.fileBasicFormBox.isChanged('fileScreenShotImage')) {
      // data.fileScreenShot = this.fileBasicFormBox.fileScreenShotImage.getNewFiles();
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
    }

    if (this.fileBasicFormBox.isChanged('fileStatus')) {
      // data.fileStatus = this.fileBasicFormBox.fileBasicInfo.fileInfo.FmsFileStatusCodes?.code;
      formData.append('fileStatus', this.fileBasicFormBox.fileBasicInfo.fileInfo.FmsFileStatusCodes?.code!);
    }

    console.log('formData', formData);


    // if (Object.keys(data).length === 1) {
    //   this.common.getAlertComponent()?.setDefault().setMessage('수정된 부분이 없습니다.').show();
    //   return;
    // }

    const options = {
      reportProgress: true,
      withCredentials: true,
    };

    const observable = this.ajax.post(environment.api.file.modifyFile, formData, options);
    observable.subscribe(
      data2 => {
        this.isModifyingFileBasic = false;
        console.log('response', data2);

        if (data2 instanceof HttpErrorResponse) {
          this.common.alertMessage(data2.error);
          return;
        } else if (data2.result !== 'success') {
          this.common.alertMessage(data2);
          return;
        }

        this.common.getAlertComponent()?.setDefault().setMessage('파일 기본 정보가 수정되었습니다.').show();
      },
    );
  }
}
