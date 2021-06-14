import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserFormBoxComponent } from 'src/app/components/user-form-box/user-form-box.component';
import { UploadUserInfoData } from 'src/app/interfaces/upload-user-info-data.interface';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { changeDestination } from 'src/app/store/destination/destination.action';
import { setActiveMenuKey } from 'src/app/store/menu/menu.action';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss']
})
export class UploadPageComponent implements OnInit, DoCheck {
  @ViewChild('userFormBox') userFormBox!: UserFormBoxComponent;
  isUploadingUser: boolean;

  constructor(
    private store: Store<{ destination: string[], activeMenuKey: string }>,
    private route: ActivatedRoute,
    private router: Router,
    private ajax: AjaxService,
    private common: CommonService,
  ) { 
    this.isUploadingUser = false;
  }

  ngOnInit(): void {

  }

  ngDoCheck(): void {
    const t = this;
    t.store.dispatch(changeDestination({ destination: ['홈', '회원관리', '회원 등록'] }));
    t.store.dispatch(setActiveMenuKey({ menuKey: 'wjajq1617524117533xg' }));
  }

  userUploadButtonClick(): void {
    if (this.isUploadingUser) {
      this.common.getAlertComponent()
          ?.setDefault()
          .setMessage('등록중입니다. 잠시만 기다려주세요.')
          .show();
      return;
    }

    if (!this.userFormBox.infoValidationCheck()) {
      return;
    }

    const data: UploadUserInfoData = {
      companyKey: this.userFormBox.userInfo.FmsCompany?.companyKey!,
      userLevel: 'USLEV00000002',
      permissionGroupKey: this.userFormBox.userInfo.FmsPermissionGroup?.permissionGroupKey!,
      userId: this.userFormBox.userInfo.userId!,
      userPassword: this.userFormBox.userInfo.userPassword!,
      userName: this.userFormBox.userInfo.userName!,
      userPhone: this.userFormBox.userInfo.userPhone!,
      userMemo: this.userFormBox.userInfo.userMemo!,
      userStatus: this.userFormBox.userInfo.FmsUserStatusCodes?.code!,
    };

    // console.log('data', data);

    this.isUploadingUser = true;

    const observable = this.ajax.post(environment.api.user.createUser, data);
    const subscribe = observable.subscribe(
      data => {
        this.isUploadingUser = false;
        console.log('response', data);

        if (data.result !== 'success') {
          this.common.alertMessage(data);
          return;
        }

        this.common.getAlertComponent()
          ?.setDefault()
          .setMessage('회원이 등록되었습니다.')
          .setConfirmCallback(() => {
            this.common.getAlertComponent()?.hide();
            this.router.navigate(['user']);
          })
          .show();
        return;
      },
      error => {
        this.isUploadingUser = false;
        this.common.alertMessage(error);
        return;
      },
    );
  }

  goList(): void {
    this.router.navigate(['user']);
  }
}
