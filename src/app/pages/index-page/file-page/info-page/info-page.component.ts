import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FileBasicFormBoxComponent } from 'src/app/components/file-basic-form-box/file-basic-form-box.component';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { changeDestination } from 'src/app/store/destination/destination.action';
import { setActiveMenuKey } from 'src/app/store/menu/menu.action';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit, DoCheck {
  @ViewChild('fileBasicFormBox') fileBasicFormBox!: FileBasicFormBoxComponent;

  constructor(
    private store: Store<{ destination: string[], activeMenuKey: string }>,
    private route: ActivatedRoute,
    private router: Router,
    private common: CommonService,
    private ajax: AjaxService,
  ) { 

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
    const fileRepresentImage = this.fileBasicFormBox.fileRepresentImage.getFile();
    console.log('fileRepresentImage', fileRepresentImage);

    // if (this.isModifyingUser) {
    //   this.common.getAlertComponent()?.setDefault().setMessage('수정 중입니다. 잠시만 기다려주세요.').show();
    //   return;
    // }
    // // console.log(this.companyInfo);
    // if (!this.userFormBox.infoValidationCheck()) {
    //   return;
    // }

    // const data: ModifyUserInfoData = {
    //   userKey: this.userFormBox.userInfo.userKey,
    // };

    // if (this.userFormBox.isChanged('companyKey')) {
    //   data.companyKey = this.userFormBox.userInfo.FmsCompany?.companyKey;
    // }
     
    // if (this.userFormBox.isChanged('userName')) {
    //   data.userName = this.userFormBox.userInfo.userName;
    // }
     
    // if (this.userFormBox.isChanged('userPhone')) {
    //   data.userPhone = this.userFormBox.userInfo.userPhone;
    // }

    // if (this.userFormBox.isChanged('permissionGroupKey')) {
    //   data.permissionGroupKey = this.userFormBox.userInfo.FmsPermissionGroup?.permissionGroupKey;
    // } 
     
    // if (this.userFormBox.isChanged('userStatus')) {
    //   data.userStatus = this.userFormBox.userInfo.FmsUserStatusCodes?.code;
    // } 
     
    // if (this.userFormBox.isChanged('userMemo')) {
    //   data.userMemo = this.userFormBox.userInfo.userMemo;
    // } 

    // if (this.userFormBox.isChanged('userPassword')) {
    //   data.userPassword = this.userFormBox.userInfo.userPassword;
    // }

    // console.log('data', data);

    // if (Object.keys(data).length === 1) {
    //   this.common.getAlertComponent()?.setDefault().setMessage('수정된 부분이 없습니다.').show();
    //   return;
    // }

    // const observable = this.ajax.post(environment.api.user.modifyUser, data);
    // const subscribe = observable.subscribe(
    //   data => {
    //     this.isModifyingUser = false;
    //     console.log('response', data);
    //     if (data.result !== 'success') {
    //       this.common.alertMessage(data);
    //       return;
    //     }

    //     this.common.getAlertComponent()?.setDefault().setMessage('회원 정보가 수정되었습니다.').show();
    //     return;
    //   },
    //   error => {
    //     this.isModifyingUser = false;
    //     this.common.alertMessage(error);
    //     return;
    //   },
    // );
  }
}
