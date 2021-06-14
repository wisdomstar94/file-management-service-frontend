import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserFormBoxComponent } from 'src/app/components/user-form-box/user-form-box.component';
import { ModifyUserInfoData } from 'src/app/interfaces/modify-user-info-data.interface';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {
  userInfo!: UserInfo;
  isModifyingUser: boolean;
  @ViewChild('userFormBox') userFormBox!: UserFormBoxComponent;

  constructor(
    private store: Store<{ destination: string[], activeMenuKey: string }>,
    private route: ActivatedRoute,
    private router: Router,
    private common: CommonService,
    private ajax: AjaxService,
  ) { 
    this.userInfo = this.route.snapshot.data.userInfo;
    this.isModifyingUser = false;
  }

  ngOnInit(): void {

  }

  goList(): void {
    this.router.navigate(['user']);
  }

  userInfoEditButtonClick(): void {
    if (this.isModifyingUser) {
      this.common.getAlertComponent()?.setDefault().setMessage('수정 중입니다. 잠시만 기다려주세요.').show();
      return;
    }
    // console.log(this.companyInfo);
    if (!this.userFormBox.infoValidationCheck()) {
      return;
    }

    const data: ModifyUserInfoData = {
      userKey: this.userFormBox.userInfo.userKey,
    };

    if (this.userFormBox.isChanged('companyKey')) {
      data.companyKey = this.userFormBox.userInfo.FmsCompany?.companyKey;
    }
     
    if (this.userFormBox.isChanged('userName')) {
      data.userName = this.userFormBox.userInfo.userName;
    }
     
    if (this.userFormBox.isChanged('userPhone')) {
      data.userPhone = this.userFormBox.userInfo.userPhone;
    }

    if (this.userFormBox.isChanged('permissionGroupKey')) {
      data.permissionGroupKey = this.userFormBox.userInfo.FmsPermissionGroup?.permissionGroupKey;
    } 
     
    if (this.userFormBox.isChanged('userStatus')) {
      data.userStatus = this.userFormBox.userInfo.FmsUserStatusCodes?.code;
    } 
     
    if (this.userFormBox.isChanged('userMemo')) {
      data.userMemo = this.userFormBox.userInfo.userMemo;
    } 

    console.log('data', data);

    if (Object.keys(data).length === 1) {
      this.common.getAlertComponent()?.setDefault().setMessage('수정된 부분이 없습니다.').show();
      return;
    }

    const observable = this.ajax.post(environment.api.user.modifyUser, data);
    const subscribe = observable.subscribe(
      data => {
        this.isModifyingUser = false;
        console.log('response', data);
        if (data.result !== 'success') {
          this.common.alertMessage(data);
          return;
        }

        this.common.getAlertComponent()?.setDefault().setMessage('회원 정보가 수정되었습니다.').show();
        return;
      },
      error => {
        this.isModifyingUser = false;
        this.common.alertMessage(error);
        return;
      },
    );
  }
}
