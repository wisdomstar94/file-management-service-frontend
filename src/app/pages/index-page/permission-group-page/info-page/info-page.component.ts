import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PermissionFormBoxComponent } from 'src/app/components/permission-form-box/permission-form-box.component';
import { PermissionGroupFormBoxComponent } from 'src/app/components/permission-group-form-box/permission-group-form-box.component';
import { ModifyPermissionGroupTotalInfoData } from 'src/app/interfaces/modify-permission-group-total-info-data.interface';
import { PermissionKeyItem } from 'src/app/interfaces/permission-key-item.interface';
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
  @ViewChild('permissionGroupFormBox') permissionGroupFormBox!: PermissionGroupFormBoxComponent;
  @ViewChild('permissionFormBox') permissionFormBox!: PermissionFormBoxComponent;
  isModifyingPermissionGroup: boolean;
  isCopyingPermissionGroup: boolean;

  constructor(
    private store: Store<{ destination: string[], activeMenuKey: string }>,
    private route: ActivatedRoute,
    private router: Router,
    private common: CommonService,
    private ajax: AjaxService,
  ) { 
    this.isModifyingPermissionGroup = false; 
    this.isCopyingPermissionGroup = false;
  }

  ngOnInit(): void {

  }

  ngDoCheck(): void {
    const t = this;
    t.store.dispatch(changeDestination({ destination: ['홈', '권한 그룹 관리', '권한 그룹 상세정보'] }));
    t.store.dispatch(setActiveMenuKey({ menuKey: 'ZCjC1617524137491OCy' }));
  }

  goList(): void {
    this.router.navigate(['permissionGroup']);
  }

  permissionGroupCopyButtonClick(): void {
    if (this.isCopyingPermissionGroup) {
      this.common.getAlertComponent()?.setDefault().setMessage('복제 중입니다. 잠시만 기다려주세요.').show();
      return;
    }

    this.common.getAlertComponent()?.setDefault()
      .setMessage('권한 그룹을 복제하시겠습니까?')
      .setConfirmButton(true)
      .setCancelButton(true)
      .setConfirmCallback(() => {
        this.copyPermissionGroup();
        this.common.getAlertComponent()?.hide();
      })
      .setCancelCallback(() => {
        this.common.getAlertComponent()?.hide();
      })
      .show();
    return;
  }

  copyPermissionGroup(): void {
    if (this.isCopyingPermissionGroup) {
      this.common.getAlertComponent()?.setDefault().setMessage('복제 중입니다. 잠시만 기다려주세요.').show();
      return;
    }

    this.isCopyingPermissionGroup = true;

    const data = {
      permissionGroupKey: this.permissionGroupFormBox.permissionGroupInfo.permissionGroupKey,
    };

    const observable = this.ajax.post(environment.api.permissionGroup.copyPermissionGroup, data);
    const subscribe = observable.subscribe(
      data => {
        this.isCopyingPermissionGroup = false;
        console.log('response', data);
        if (data.result !== 'success') {
          this.common.alertMessage(data);
          return;
        }

        this.common.getAlertComponent()?.setDefault().setMessage('권한 그룹이 복제 되었습니다. 목록으로 돌아가시면 확인 가능합니다.').show();
        return;
      },
      error => {
        this.isCopyingPermissionGroup = false;
        this.common.alertMessage(error);
        return;
      },
    );
  }

  permissionGroupInfoEditButtonClick(): void {
    if (this.isModifyingPermissionGroup) {
      this.common.getAlertComponent()?.setDefault().setMessage('수정 중입니다. 잠시만 기다려주세요.').show();
      return;
    }
    // console.log(this.companyInfo);
    if (!this.permissionGroupFormBox.infoValidationCheck()) {
      return;
    }

    if (typeof this.permissionGroupFormBox.permissionGroupInfo.permissionGroupKey !== 'string' || this.permissionGroupFormBox.permissionGroupInfo.permissionGroupKey === '') {
      this.common.getAlertComponent()?.setDefault().setMessage('수정할 권한 그릅이 없습니다.').show();
      return;
    }

    const data: ModifyPermissionGroupTotalInfoData = {
      permissionGroupKey: this.permissionGroupFormBox.permissionGroupInfo.permissionGroupKey,
    };

    if (this.permissionGroupFormBox.isChanged('permissionGroupName')) {
      data.permissionGroupName = this.permissionGroupFormBox.permissionGroupInfo.permissionGroupName;
    }
     
    if (this.permissionGroupFormBox.isChanged('permissionGroupDescription')) {
      data.permissionGroupDescription = this.permissionGroupFormBox.permissionGroupInfo.permissionGroupDescription;
    }
     
    if (this.permissionGroupFormBox.isChanged('permissionGroupStatus')) {
      data.permissionGroupStatus = this.permissionGroupFormBox.permissionGroupInfo.FmsPermissionGroupStatusCodes?.code;
    }

    const permissionKeyInfo: PermissionKeyItem[] = this.permissionFormBox.getPermissionActiveStatusInfo().map((x) => {
      return {
        permissionKey: x.permissionKey as string,
        isActive: x.isActive as YN,
      };
    });

    data.permissionKeyInfo = permissionKeyInfo;

    // console.log('data', data);
    // return;

    // if (Object.keys(data).length <= 2) {
    //   this.common.getAlertComponent()?.setDefault().setMessage('수정된 부분이 없습니다.').show();
    //   return;
    // }

    const observable = this.ajax.post(environment.api.permissionGroupUpload.applyPermissionGroupUpload, data);
    const subscribe = observable.subscribe(
      data => {
        this.isModifyingPermissionGroup = false;
        console.log('response', data);
        if (data.result !== 'success') {
          this.common.alertMessage(data);
          return;
        }

        this.common.getAlertComponent()?.setDefault().setMessage('권한 그룹 정보가 수정되었습니다.').show();
        return;
      },
      error => {
        this.isModifyingPermissionGroup = false;
        this.common.alertMessage(error);
        return;
      },
    );
  }

}
