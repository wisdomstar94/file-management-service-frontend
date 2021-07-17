import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PaginationBoxComponent } from 'src/app/components/pagination-box/pagination-box.component';
import { SearchBoxComponent } from 'src/app/components/search-box/search-box.component';
import { TableTopBoxComponent } from 'src/app/components/table-top-box/table-top-box.component';
import { CodeItem } from 'src/app/interfaces/code-item.interface';
import { PermissionGroupItem } from 'src/app/interfaces/permission-group-item.interface';
import { SearchItem } from 'src/app/interfaces/search-item.interface';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { SearchOptionService } from 'src/app/services/search-option.service';
import { changeDestination } from 'src/app/store/destination/destination.action';
import { setActiveMenuKey } from 'src/app/store/menu/menu.action';
import { TableViewType } from 'src/app/types/table-view-type.type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {
  @ViewChild('permissionGroupSearchBox') permissionGroupSearchBox!: SearchBoxComponent;
  @ViewChild('permissionGroupTableTopBox') permissionGroupTableTopBox!: TableTopBoxComponent;
  @ViewChild('permissionGroupListPaginationBox') permissionGroupListPaginationBox!: PaginationBoxComponent;

  searchItemList: SearchItem[] = [
    {
      uniqueID: 'permissionGroupName',
      searchType: 'text',
      itemTitle: '권한 그룹명',
      currentValue: '',
    },
    {
      uniqueID: 'permissionGroupDescription',
      searchType: 'text',
      itemTitle: '권한 그룹 설명',
      currentValue: '',
    },
    {
      uniqueID: 'permissionGroupCreatedAt',
      searchType: 'datetime',
      itemTitle: '권한 그룹 등록일',
      startDatetime: '',
      endDatetime: '',
    },
    {
      uniqueID: 'permissionGroupStatus',
      searchType: 'checkbox',
      itemTitle: '권한 그룹 상태',
      checkboxItemList: [],
    },
  ];

  isPermissionGroupListAllCheck: boolean;
  permissionGroupTableViewType!: TableViewType;
  isPermissionGroupListGetting = false;
  isPermissionGroupDeleting = false;
  permissionGroupList: PermissionGroupItem[] = [];

  constructor(
    private store: Store<{ destination: string[], activeMenuKey: string }>,
    private route: ActivatedRoute,
    private router: Router,
    private common: CommonService,
    private ajax: AjaxService,
    private searchOption: SearchOptionService,
  ) { 
    this.isPermissionGroupListAllCheck = false;

    const permissionGroupStatusCodeList: CodeItem[] = this.route.snapshot.data.PermissionGroupStatusCode;
    const permissionGroupStatusSearchItem = this.common.getSearchItem(this.searchItemList, 'permissionGroupStatus');
    if (permissionGroupStatusSearchItem !== undefined) {
      permissionGroupStatusSearchItem.checkboxItemList = permissionGroupStatusCodeList.map((x) => {
        return {
          uniqueID: x.code,
          checkboxValue: x.code,
          labelText: x.codeName,
          checked: false,
        };
      });
    }

    if (this.searchOption.searchOption.permissionGroupSearchItemList.length !== 0) {
      this.searchItemList = this.searchOption.searchOption.permissionGroupSearchItemList;
    }
  }

  ngOnInit(): void {
    this.getList(1);
  }

  ngDoCheck(): void {
    const t = this;
    t.store.dispatch(changeDestination({ destination: ['홈', '권한 그룹 관리'] }));
    t.store.dispatch(setActiveMenuKey({ menuKey: 'ZCjC1617524137491OCy' }));
  }

  clearSearchItem(): void {
    const t = this;
    t.permissionGroupSearchBox?.clearSearchItem();
  }

  permissionGroupListAllCheckChanged(): void {
    const t = this;

    // console.log('this.isCompanyListAllCheck', this.isCompanyListAllCheck);

    if (this.isPermissionGroupListAllCheck === true) {
      for (const item of t.permissionGroupList) {
        item.isChecked = true;
      }
    } else {
      for (const item of t.permissionGroupList) {
        item.isChecked = false;
      }
    }
  }

  getList(page: number): void {
    const t = this;
    
    if (t.isPermissionGroupListGetting === true) {
      t.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('목록을 가져오는 중입니다. 잠시만 기다려주세요.')
        .show();
      return;
    }

    const forms = {
      permissionGroupName: t.searchItemList.filter((x) => { if (x.uniqueID === 'permissionGroupName') { return x; } else { return; } })[0].currentValue,
      permissionGroupDescription: t.searchItemList.filter((x) => { if (x.uniqueID === 'permissionGroupDescription') { return x; } else { return; } })[0].currentValue,
      createdAtStart: t.searchItemList.filter((x) => { if (x.uniqueID === 'permissionGroupCreatedAt') { return x; } else { return; } })[0].startDatetime + ' 00:00:00',
      createdAtEnd: t.searchItemList.filter((x) => { if (x.uniqueID === 'permissionGroupCreatedAt') { return x; } else { return; } })[0].endDatetime + ' 23:59:59',
      permissionGroupStatus: t.searchItemList.filter((x) => { if (x.uniqueID === 'permissionGroupStatus') { return x; } else { return; } })[0].checkboxItemList?.filter((x) => { if (x.checked === true) { return x.checkboxValue; } else { return; } }).map((x) => { return x.checkboxValue; }),
    };

    // console.log('forms', forms);

    const data = {
      permissionGroupName: forms.permissionGroupName,
      permissionGroupDescription: forms.permissionGroupDescription,
      createdAtStart: forms.createdAtStart,
      createdAtEnd: forms.createdAtEnd,
      permissionGroupStatus: forms.permissionGroupStatus,

      page: page,
      pageViewCount: 5,
      viewCount: t.permissionGroupTableTopBox?.getViewCount(),
    };

    // console.log('data', data);

    t.isPermissionGroupListGetting = true;
    this.searchOption.searchOption.permissionGroupSearchItemList = this.searchItemList;

    const observable = t.ajax.post(
      environment.api.permissionGroup.getPermissionGroup,
      data,
    );

    observable.subscribe(
      data => {
        t.isPermissionGroupListGetting = false;

        if (data.result === 'success') {
          const list: PermissionGroupItem[] = data.list;
          t.permissionGroupList = list;
          t.permissionGroupTableTopBox.setTotalCount(data.totalCount);
          t.permissionGroupListPaginationBox.setBoardCountInfo(data.getBoardCountInfo);
        } else {
          this.common.alertMessage(data);
        }
      },
      error => {
        t.isPermissionGroupListGetting = false;
        this.common.alertMessage(error);
      }
    );
  }

  permissionGroupDetailInfoButtonClick(item: PermissionGroupItem): void {
    console.log('item', item);

    if (typeof item.permissionGroupKey !== 'string' || item.permissionGroupKey === '') {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('상세정보를 볼 권한이 없습니다.')
        .show();
      return;
    }

    this.router.navigate(['permissionGroup/info/' + item.permissionGroupKey]);
    return;
  }

  permissionGroupDeleteButtonClick(): void {
    if (this.isPermissionGroupDeleting) {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('삭제 중입니다. 잠시만 기다려주세요.')
        .show();
      return;
    }

    const permissionGroupKey: string[] = [];

    for (const item of this.permissionGroupList) {
      if (item.isChecked) {
        permissionGroupKey.push(item.permissionGroupKey!);
      }
    }

    if (permissionGroupKey.length === 0) {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('선택된 권한 그룹이 없습니다.')
        .show();
      return;
    }

    this.common.getAlertComponent()
      ?.setDefault()
      .setTitle('안내')
      .setMessage('선택된 ' + permissionGroupKey.length + '개 권한 그룹을 삭제하시겠습니까?')
      .setCancelButton(true)
      .setConfirmButton(true)
      .setCancelCallback(() => {
        this.common.getAlertComponent()?.hide();
      })
      .setConfirmCallback(() => {
        this.deletePermissionGroup(permissionGroupKey);
        this.common.getAlertComponent()?.hide();
      })
      .show();
      return;
  }

  deletePermissionGroup(permissionGroupKey: string[]): void {
    if (this.isPermissionGroupDeleting) {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('삭제 중입니다. 잠시만 기다려주세요.')
        .show();
      return;
    }

    if (permissionGroupKey.length === 0) {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('삭제할 권한 그룹이 없습니다.')
        .show();
      return;
    }

    // console.log('permissionGroupKey', permissionGroupKey);

    const data = {
      permissionGroupKey: permissionGroupKey,
    };

    this.isPermissionGroupDeleting = true;
    const observable = this.ajax.post(environment.api.permissionGroup.deletePermissionGroup, data);
    const subscribe = observable.subscribe(
      data => {
        this.isPermissionGroupDeleting = false;
        // console.log('response', data);

        if (data.result !== 'success') {
          this.common.alertMessage(data);
          return;
        }

        this.common.getAlertComponent()
          ?.setDefault()
          .setMessage('선택된 권한 그룹이 삭제 되었습니다.')
          .setConfirmCallback(() => {
            this.common.getAlertComponent()?.hide();
            this.getList(1);
          })
          .show();
        return;
      },
      error => {
        this.isPermissionGroupDeleting = false;
        this.common.alertMessage(error);
        return;
      },
    );
  }

  permissionGroupUploadButtonClick(): void {
    this.router.navigate(['permissionGroup/upload']);
  }
}
