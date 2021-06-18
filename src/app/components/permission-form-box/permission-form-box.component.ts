import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PermissionGroupUploadItem } from 'src/app/interfaces/permission-group-upload-item.interface';
import { PermissionGrouppingItem } from 'src/app/interfaces/permission-groupping-item.interface';
import { PermissionItem } from 'src/app/interfaces/permission-item.interface';

@Component({
  selector: 'app-permission-form-box',
  templateUrl: './permission-form-box.component.html',
  styleUrls: ['./permission-form-box.component.scss']
})
export class PermissionFormBoxComponent implements OnInit {
  permissionAllList: PermissionGrouppingItem[] = [];
  permissionGroupUploadList: PermissionGroupUploadItem[] = [];

  constructor(
    private route: ActivatedRoute,
  ) { 
    this.permissionAllList = this.route.snapshot.data.PermissionAllList;
    this.permissionGroupUploadList = this.route.snapshot.data.PermissionGroupUploadList;
    this.applyUploadedPermission();
  }

  ngOnInit(): void {

  }

  private applyUploadedPermission(): void {
    for (const item of this.permissionAllList) {
      for (const item2 of item.permissionList) {
        const matchedPermissionItem = this.permissionGroupUploadList.filter((x) => {
          if (x.permissionKey === item2.permissionKey) {
            return true;
          } else {
            return false;
          }
        })[0];

        if (matchedPermissionItem === undefined) {
          continue;
        }

        if (matchedPermissionItem.isActive === 'Y') {
          item2.isActive = 'Y';
          item2.isChecked = true;
        } else {
          item2.isActive = 'N';
          item2.isChecked = false;
        }
      }
    }
  }

  changedCheckbox(item: PermissionItem, event: boolean): void {
    // console.log(item, event);
    // 여기 이어서 작업하면 됨 2021-06-16 17:58:00
    if (event) {
      item.isActive = 'Y';
      item.isChecked = true;
    } else {
      item.isActive = 'N';
      item.isChecked = false;
    }
  }

  getPermissionActiveStatusInfo(): PermissionItem[] {
    const activeStatusExistPermissions: PermissionItem[] = [];

    for (const item of this.permissionAllList) {
      for (const item2 of item.permissionList) {
        if (typeof item2.isActive === 'string') {
          activeStatusExistPermissions.push(item2);
        }
      }
    }

    return activeStatusExistPermissions;
  }
}
