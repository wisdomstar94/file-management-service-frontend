import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PermissionFormBoxComponent } from 'src/app/components/permission-form-box/permission-form-box.component';
import { PermissionGroupFormBoxComponent } from 'src/app/components/permission-group-form-box/permission-group-form-box.component';
import { PermissionKeyItem } from 'src/app/interfaces/permission-key-item.interface';
import { UploadPermissionGroupTotalInfoData } from 'src/app/interfaces/upload-permission-group-total-info-data.interface';
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
export class UploadPageComponent implements OnInit, DoCheck {
  @ViewChild('permissionGroupFormBox') permissionGroupFormBox!: PermissionGroupFormBoxComponent;
  @ViewChild('permissionFormBox') permissionFormBox!: PermissionFormBoxComponent;
  isUploadingPermissionGroup: boolean;

  constructor(
    private store: Store<{ destination: string[], activeMenuKey: string }>,
    private route: ActivatedRoute,
    private router: Router,
    private common: CommonService,
    private ajax: AjaxService,
  ) { 
    this.isUploadingPermissionGroup = false; 
  }

  ngOnInit(): void {

  }

  ngDoCheck(): void {
    const t = this;
    t.store.dispatch(changeDestination({ destination: ['홈', '권한 그룹 관리', '권한 그룹 신규 등록'] }));
    t.store.dispatch(setActiveMenuKey({ menuKey: 'ZCjC1617524137491OCy' }));
  }

  goList(): void {
    this.router.navigate(['permissionGroup']);
  }

  permissionGroupInfoEditButtonClick(): void {
    if (this.isUploadingPermissionGroup) {
      this.common.getAlertComponent()?.setDefault().setMessage('등록 중입니다. 잠시만 기다려주세요.').show();
      return;
    }
    // console.log(this.companyInfo);
    if (!this.permissionGroupFormBox.infoValidationCheck()) {
      return;
    }

    const permissionKeyInfo: PermissionKeyItem[] = this.permissionFormBox.getPermissionActiveStatusInfo().map((x) => {
      return {
        permissionKey: x.permissionKey as string,
        isActive: x.isActive as YN,
      };
    });

    const data: UploadPermissionGroupTotalInfoData = {
      permissionGroupName: this.permissionGroupFormBox.permissionGroupInfo.permissionGroupName!,
      permissionGroupDescription: this.permissionGroupFormBox.permissionGroupInfo.permissionGroupDescription!,
      permissionGroupStatus: this.permissionGroupFormBox.permissionGroupInfo.FmsPermissionGroupStatusCodes?.code!,
      permissionKeyInfo: permissionKeyInfo,
    };

    const observable = this.ajax.post(environment.api.permissionGroupUpload.applyPermissionGroupUpload, data);
    const subscribe = observable.subscribe(
      data => {
        this.isUploadingPermissionGroup = false;
        console.log('response', data);
        if (data.result !== 'success') {
          this.common.alertMessage(data);
          return;
        }

        this.common.getAlertComponent()?.setDefault()
          .setConfirmCallback(() => {
            this.router.navigate(['permissionGroup']);
            this.common.getAlertComponent()?.hide();
          })
          .setMessage('권한 그룹 정보가 등록되었습니다.').show();
        return;
      },
      error => {
        this.isUploadingPermissionGroup = false;
        this.common.alertMessage(error);
        return;
      },
    );
  }
}
