import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodeItem } from 'src/app/interfaces/code-item.interface';
import { PermissionGroupInfo } from 'src/app/interfaces/permission-group-info.interface';
import { SelectItem } from 'src/app/interfaces/select-item.interface';
import { CommonService } from 'src/app/services/common.service';
import { PermissionGroupColumn } from 'src/app/types/permission-group-columns.type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-permission-group-form-box',
  templateUrl: './permission-group-form-box.component.html',
  styleUrls: ['./permission-group-form-box.component.scss']
})
export class PermissionGroupFormBoxComponent implements OnInit {
  cleanPermissionGroupInfo!: PermissionGroupInfo;
  permissionGroupInfo!: PermissionGroupInfo;
  permissionGroupStatusCode: CodeItem[] = [];
  permissionGroupStatusSelectItems: SelectItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private common: CommonService,
  ) { 
    this.permissionGroupInfo = this.route.snapshot.data.PermissionGroupInfo;
    // console.log('this.permissionGroupInfo', this.permissionGroupInfo);
    this.cleanPermissionGroupInfo = { ...this.permissionGroupInfo };
    if (this.permissionGroupInfo !== undefined) {
      this.cleanPermissionGroupInfo!.FmsPermissionGroupStatusCodes = { ...this.permissionGroupInfo!.FmsPermissionGroupStatusCodes! };
    } else {
      this.permissionGroupInfo = {
        permissionGroupName: '',
        permissionGroupDescription: '',
        permissionGroupStatus: 'PEGRS00000001',
        FmsPermissionGroupStatusCodes: {
          code: 'PEGRS00000001',
          codeName: '',
        },
      };
    }

    this.permissionGroupStatusCode = this.route.snapshot.data.PermissionGroupStatusCode;
    this.permissionGroupStatusSelectItems = this.permissionGroupStatusCode.map((x) => {
      return {
        optionUniqueID: x.code,
        optionValue: x.code,
        optionDisplayText: x.codeName,
        selected: false,
      };
    });
  }

  ngOnInit(): void {

  }

  infoValidationCheck(): boolean {
    this.common.getAlertComponent()?.setDefault();

    if (this.permissionGroupInfo === undefined) {
      this.common.getAlertComponent()?.setMessage('?????? ?????? ????????? ????????????.').show();
      return false;
    }

    // permissionGroupName ??????
    if (typeof this.permissionGroupInfo.permissionGroupName !== 'string') {
      this.common.getAlertComponent()?.setMessage('?????? ????????? ????????? ????????????.').show();
      return false;
    }

    if (this.permissionGroupInfo.permissionGroupName.trim() === '') {
      this.common.getAlertComponent()?.setMessage('?????? ???????????? ??????????????????.').show();
      return false;
    }

    if (this.permissionGroupInfo.permissionGroupName.length > environment.stringLengthLimit.permissionGroupNameMaxLength) {
      this.common.getAlertComponent()?.setMessage('?????? ???????????? ' + environment.stringLengthLimit.permissionGroupNameMaxLength + '?????? ?????? ??? ????????????.').show();
      return false; 
    }

    // permissionGroupDescription ??????
    if (typeof this.permissionGroupInfo.permissionGroupDescription !== 'string') {
      this.common.getAlertComponent()?.setMessage('?????? ?????? ?????? ????????? ????????????.').show();
      return false;
    }

    if (this.permissionGroupInfo.permissionGroupDescription.trim() === '') {
      this.common.getAlertComponent()?.setMessage('?????? ?????? ????????? ??????????????????.').show();
      return false;
    }

    // FmsPermissionGroupStatusCodes.code ??????
    if (typeof this.permissionGroupInfo.FmsPermissionGroupStatusCodes?.code !== 'string') {
      this.common.getAlertComponent()?.setMessage('?????? ?????? ????????? ??????????????????.').show();
      return false;
    } 

    return true;
  }

  isChanged(permissionGroupColumn: PermissionGroupColumn): boolean {
    let result = false;
    switch (permissionGroupColumn) {
      case 'permissionGroupName': 
        if (this.cleanPermissionGroupInfo.permissionGroupName !== this.permissionGroupInfo.permissionGroupName) {
          result = true;
        }
        break;
      case 'permissionGroupDescription':
        if (this.cleanPermissionGroupInfo.permissionGroupDescription !== this.permissionGroupInfo.permissionGroupDescription) {
          result = true;
        }
        break;
      case 'permissionGroupStatus': 
        if (this.cleanPermissionGroupInfo.FmsPermissionGroupStatusCodes?.code !== this.permissionGroupInfo.FmsPermissionGroupStatusCodes?.code) {
          result = true;
        }
        break;
    }
    return result;
  }
}
