import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeItem } from 'src/app/interfaces/code-item.interface';
import { CompanyItem } from 'src/app/interfaces/company-item.interface';
import { PermissionGroupItem } from 'src/app/interfaces/permission-group-item.interface';
import { SelectItem } from 'src/app/interfaces/select-item.interface';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';

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
        companyKey: '',
        FmsCompany: {
          companyKey: '',
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

}
