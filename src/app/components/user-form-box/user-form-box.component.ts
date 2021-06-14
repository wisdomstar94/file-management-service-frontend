import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeItem } from 'src/app/interfaces/code-item.interface';
import { CompanyItem } from 'src/app/interfaces/company-item.interface';
import { PermissionGroupItem } from 'src/app/interfaces/permission-group-item.interface';
import { SelectItem } from 'src/app/interfaces/select-item.interface';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { UserColumn } from 'src/app/types/user-columns.type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-form-box',
  templateUrl: './user-form-box.component.html',
  styleUrls: ['./user-form-box.component.scss']
})
export class UserFormBoxComponent implements OnInit {
  cleanUserInfo!: UserInfo;
  userInfo!: UserInfo;
  
  userStatusCodeList: CodeItem[] = [];
  userStatusSelectItems: SelectItem[] = [];

  permissionGroupList: PermissionGroupItem[] = [];
  permissionGroupSelectItems: SelectItem[] = [];

  companyList: CompanyItem[] = [];
  companyListSelectItems: SelectItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private common: CommonService,
    private ajax: AjaxService,
  ) { 
    const userInfo: UserInfo = this.route.snapshot.data.UserInfo;
    console.log('userInfo', userInfo);
    this.userInfo = userInfo;
    this.cleanUserInfo = { ...userInfo };
    if (this.userInfo === undefined || this.userInfo === null) {
      this.userInfo = {
        userKey: '',
        userId: '',
        userPassword: '',
        companyKey: '',
        FmsCompany: {
          companyKey: 'ovau1623568601311tXN',
          companyName: '',
        },
        userName: '',
        userPhone: '',
        userMemo: '',
        createdAt: '',
        createdIp: '',
        permissionGroupKey: '',
        FmsPermissionGroup: {
          permissionGroupKey: '',
          permissionGroupName: '',
        },
        userStatus: 'USRST00000001',
        FmsUserStatusCodes: {
          code: 'USRST00000001',
          codeName: '정상',
        },
      };
    }
    this.cleanUserInfo.FmsCompany = { ...userInfo?.FmsCompany! };
    this.cleanUserInfo.FmsPermissionGroup = { ...userInfo?.FmsPermissionGroup! };
    this.cleanUserInfo.FmsUserStatusCodes = { ...userInfo?.FmsUserStatusCodes! };

    this.userStatusCodeList = this.route.snapshot.data.UserStatusCode;
    this.userStatusSelectItems = this.userStatusCodeList.map((x) => {
      return {
        optionUniqueID: x.code,
        optionValue: x.code,
        optionDisplayText: x.codeName,
        selected: false,
      };
    });

    this.permissionGroupList = this.route.snapshot.data.PermissionGroupList;
    console.log('this.permissionGroupList', this.permissionGroupList);
    this.permissionGroupSelectItems = this.permissionGroupList.map((x) => {
      let selected = false;
      if (x.permissionGroupKey === this.userInfo.permissionGroupKey) {
        selected = true;
      }

      return {
        optionUniqueID: x.permissionGroupKey,
        optionValue: x.permissionGroupKey,
        optionDisplayText: x.permissionGroupName,
        selected: selected,
      };
    });

    this.companyList = this.route.snapshot.data.CompanyList;
    this.companyListSelectItems = this.companyList.map((x) => {
      let selected = false;
      if (x.companyKey === this.userInfo.companyKey) {
        selected = true;
      }

      return {
        optionUniqueID: x.companyKey as string,
        optionValue: x.companyKey as string,
        optionDisplayText: x.companyName as string,
        selected: selected,
      };
    });
  }

  ngOnInit(): void {

  }

  infoValidationCheck(): boolean {
    this.common.getAlertComponent()?.setDefault();

    if (this.userInfo === undefined) {
      this.common.getAlertComponent()?.setMessage('회원 정보가 없습니다.').show();
      return false;
    }

    // userId 체크
    if (typeof this.userInfo.userId !== 'string') {
      this.common.getAlertComponent()?.setMessage('회원 ID 정보가 없습니다.').show();
      return false;
    }

    if (this.userInfo.userId.trim() === '') {
      this.common.getAlertComponent()?.setMessage('회원 ID를 입력해주세요.').show();
      return false;
    }

    if (this.userInfo.userId.length > environment.stringLengthLimit.userIdMaxLength) {
      this.common.getAlertComponent()?.setMessage('회원 ID는 ' + environment.stringLengthLimit.userIdMaxLength + '자를 넘을 수 없습니다.').show();
      return false; 
    }

    // FmsCompany.companyKey 체크
    if (typeof this.userInfo.FmsCompany?.companyKey !== 'string') {
      this.common.getAlertComponent()?.setMessage('회사를 선택해주세요.').show();
      return false;
    }

    if (this.userInfo.FmsCompany.companyKey.trim() === '') {
      this.common.getAlertComponent()?.setMessage('회사를 선택해주세요.').show();
      return false;
    }

    // userPassword 체크
    if (typeof this.userInfo.userKey !== 'string' || this.userInfo.userKey === '') {
      if (typeof this.userInfo.userPassword !== 'string') {
        this.common.getAlertComponent()?.setMessage('비밀번호를 입력해주세요.').show();
        return false; 
      }

      if (this.userInfo.userPassword.trim() === '') {
        this.common.getAlertComponent()?.setMessage('비밀번호를 입력해주세요.').show();
        return false; 
      }

      if (this.userInfo.userPassword.length < environment.stringLengthLimit.userPasswordMinLength) {
        this.common.getAlertComponent()?.setMessage('비밀번호는 ' + environment.stringLengthLimit.userPasswordMinLength + '자 이상이어야 합니다.').show();
        return false; 
      }

      if (this.userInfo.userPassword.length > environment.stringLengthLimit.userPasswordMaxLength) {
        this.common.getAlertComponent()?.setMessage('비밀번호는 ' + environment.stringLengthLimit.userPasswordMaxLength + '자를 넘을 수 없습니다.').show();
        return false; 
      }
    } else {
      if (typeof this.userInfo.userPassword === 'string' && this.userInfo.userPassword !== '') {
        if (this.userInfo.userPassword.length < environment.stringLengthLimit.userPasswordMinLength) {
          this.common.getAlertComponent()?.setMessage('비밀번호는 ' + environment.stringLengthLimit.userPasswordMinLength + '자 이상이어야 합니다.').show();
          return false; 
        }
  
        if (this.userInfo.userPassword.length > environment.stringLengthLimit.userPasswordMaxLength) {
          this.common.getAlertComponent()?.setMessage('비밀번호는 ' + environment.stringLengthLimit.userPasswordMaxLength + '자를 넘을 수 없습니다.').show();
          return false; 
        } 
      }
    }

    // userName 체크
    if (typeof this.userInfo.userName !== 'string') {
      this.common.getAlertComponent()?.setMessage('회원명 정보가 없습니다.').show();
      return false;
    }

    if (this.userInfo.userName.trim() === '') {
      this.common.getAlertComponent()?.setMessage('회원명을 입력해주세요.').show();
      return false;
    }

    if (this.userInfo.userName.length > environment.stringLengthLimit.userNameMaxLength) {
      this.common.getAlertComponent()?.setMessage('회원명은 ' + environment.stringLengthLimit.userNameMaxLength + '자를 넘을 수 없습니다.').show();
      return false; 
    }

    // userPhone 체크
    if (typeof this.userInfo.userPhone !== 'string') {
      this.common.getAlertComponent()?.setMessage('휴대폰번호 정보가 없습니다.').show();
      return false;
    }

    if (this.userInfo.userPhone.trim() === '') {
      this.common.getAlertComponent()?.setMessage('휴대폰번호를 입력해주세요.').show();
      return false;
    }

    if (this.userInfo.userPhone.length > environment.stringLengthLimit.userPhoneMaxLength) {
      this.common.getAlertComponent()?.setMessage('휴대폰번호는 ' + environment.stringLengthLimit.userPhoneMaxLength + '자를 넘을 수 없습니다.').show();
      return false; 
    }

    // FmsPermissionGroup.permissionGroupKey 체크
    if (typeof this.userInfo.FmsPermissionGroup?.permissionGroupKey !== 'string') {
      this.common.getAlertComponent()?.setMessage('권한 그룹 정보가 없습니다.').show();
      return false;
    }

    if (this.userInfo.FmsPermissionGroup.permissionGroupKey.trim() === '') {
      this.common.getAlertComponent()?.setMessage('권한 그룹을 선택해주세요.').show();
      return false;
    }

    // FmsUserStatusCodes.code 체크
    if (typeof this.userInfo.FmsUserStatusCodes?.code !== 'string') {
      this.common.getAlertComponent()?.setMessage('상태 정보가 없습니다.').show();
      return false;
    }

    if (this.userInfo.FmsUserStatusCodes.code.trim() === '') {
      this.common.getAlertComponent()?.setMessage('상태를 선택해주세요.').show();
      return false;
    }

    // userMemo 체크
    if (typeof this.userInfo.userMemo !== 'string') {
      this.common.getAlertComponent()?.setMessage('메모 정보가 없습니다.').show();
      return false;
    }

    return true;
  }

  isChanged(userColumn: UserColumn): boolean {
    let result = false;
    switch (userColumn) {
      case 'userId': 
        if (this.cleanUserInfo.userId !== this.userInfo.userId) {
          result = true;
        }
        break;
      case 'userPassword':
        if (typeof this.userInfo.userPassword === 'string') {
          if (this.userInfo.userPassword.trim() !== '') {
            return true;
          }
        }
        break;
      case 'companyKey': 
        if (this.cleanUserInfo.FmsCompany?.companyKey !== this.userInfo.FmsCompany?.companyKey) {
          result = true;
        }
        break;
      case 'userName': 
        if (this.cleanUserInfo.userName !== this.userInfo.userName) {
          result = true;
        }
        break;
      case 'userPhone': 
        if (this.cleanUserInfo.userPhone !== this.userInfo.userPhone) {
          result = true;
        }
        break;
      case 'permissionGroupKey': 
        if (this.cleanUserInfo.FmsPermissionGroup?.permissionGroupKey !== this.userInfo.FmsPermissionGroup?.permissionGroupKey) {
          result = true;
        }
        break;
      case 'userStatus': 
        if (this.cleanUserInfo.FmsUserStatusCodes?.code !== this.userInfo.FmsUserStatusCodes?.code) {
          result = true;
        }
        break;
      case 'userMemo': 
        if (this.cleanUserInfo.userMemo !== this.userInfo.userMemo) {
          result = true;
        }
        break;
    }
    return result;
  }
}
