import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PaginationBoxComponent } from 'src/app/components/pagination-box/pagination-box.component';
import { SearchBoxComponent } from 'src/app/components/search-box/search-box.component';
import { TableTopBoxComponent } from 'src/app/components/table-top-box/table-top-box.component';
import { CodeItem } from 'src/app/interfaces/code-item.interface';
import { SearchItem } from 'src/app/interfaces/search-item.interface';
import { UserItem } from 'src/app/interfaces/user-item.interface';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { changeDestination } from 'src/app/store/destination/destination.action';
import { setActiveMenuKey } from 'src/app/store/menu/menu.action';
import { TableViewType } from 'src/app/types/table-view-type.type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit, DoCheck {
  @ViewChild('userSearchBox') userSearchBox!: SearchBoxComponent;
  @ViewChild('userTableTopBox') userTableTopBox!: TableTopBoxComponent;
  @ViewChild('userListPaginationBox') userListPaginationBox!: PaginationBoxComponent;

  searchItemList: SearchItem[] = [
    {
      uniqueID: 'userId',
      searchType: 'text',
      itemTitle: 'ID',
      currentValue: '',
    },
    {
      uniqueID: 'companyName',
      searchType: 'text',
      itemTitle: '회사명',
      currentValue: '',
    },
    {
      uniqueID: 'userName',
      searchType: 'text',
      itemTitle: '회원이름',
      currentValue: '',
    },
    {
      uniqueID: 'userPhone',
      searchType: 'text',
      itemTitle: '휴대폰번호',
      currentValue: '',
    },
    {
      uniqueID: 'userCreateDatetime',
      searchType: 'datetime',
      itemTitle: '가입일',
      startDatetime: '',
      endDatetime: '',
    },
    {
      uniqueID: 'userStatus',
      searchType: 'checkbox',
      itemTitle: '상태',
      checkboxItemList: [],
    },
    {
      uniqueID: 'createdIp',
      searchType: 'text',
      itemTitle: '가입 IP',
      currentValue: '',
    },
  ];

  isUserListAllCheck: boolean;
  userTableViewType!: TableViewType;
  isUserListGetting = false;
  userList: UserItem[] = [];

  constructor(
    private store: Store<{ destination: string[], activeMenuKey: string }>,
    private route: ActivatedRoute,
    private router: Router,
    private common: CommonService,
    private ajax: AjaxService,
  ) { 
    this.isUserListAllCheck = false;

    const statusCodeList: CodeItem[] = this.route.snapshot.data.UserStatusCode;
    const userStatusSearchItem = this.common.getSearchItem(this.searchItemList, 'userStatus');
    if (userStatusSearchItem !== undefined) {
      userStatusSearchItem.checkboxItemList = statusCodeList.map((x) => {
        return {
          uniqueID: x.code,
          checkboxValue: x.code,
          labelText: x.codeName,
          checked: false,
        };
      });
    }
  }

  ngOnInit(): void {
    this.getList(1);
  }

  ngDoCheck(): void {
    const t = this;
    t.store.dispatch(changeDestination({ destination: ['홈', '회원관리'] }));
    t.store.dispatch(setActiveMenuKey({ menuKey: 'wjajq1617524117533xg' }));
  }

  clearSearchItem(): void {
    const t = this;
    t.userSearchBox?.clearSearchItem();
  }

  userListAllCheckChanged(): void {
    const t = this;

    // console.log('this.isCompanyListAllCheck', this.isCompanyListAllCheck);

    if (this.isUserListAllCheck === true) {
      for (const item of t.userList) {
        item.isChecked = true;
      }
    } else {
      for (const item of t.userList) {
        item.isChecked = false;
      }
    }
  }

  getList(page: number): void {
    const t = this;
    
    if (t.isUserListGetting === true) {
      t.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('목록을 가져오는 중입니다. 잠시만 기다려주세요.')
        .show();
      return;
    }

    const forms = {
      userId: t.searchItemList.filter((x) => { if (x.uniqueID === 'userId') { return x; } else { return; } })[0].currentValue,
      companyName: t.searchItemList.filter((x) => { if (x.uniqueID === 'companyName') { return x; } else { return; } })[0].currentValue,
      userName: t.searchItemList.filter((x) => { if (x.uniqueID === 'userName') { return x; } else { return; } })[0].currentValue,
      userPhone: t.searchItemList.filter((x) => { if (x.uniqueID === 'userPhone') { return x; } else { return; } })[0].currentValue,
      createdAtStart: t.searchItemList.filter((x) => { if (x.uniqueID === 'userCreateDatetime') { return x; } else { return; } })[0].startDatetime + ' 00:00:00',
      createdAtEnd: t.searchItemList.filter((x) => { if (x.uniqueID === 'userCreateDatetime') { return x; } else { return; } })[0].endDatetime + ' 23:59:59',
      userStatus: t.searchItemList.filter((x) => { if (x.uniqueID === 'userStatus') { return x; } else { return; } })[0].checkboxItemList?.filter((x) => { if (x.checked === true) { return x.checkboxValue; } else { return; } }).map((x) => { return x.checkboxValue; }),
      createdIp: t.searchItemList.filter((x) => { if (x.uniqueID === 'createdIp') { return x; } else { return; } })[0].currentValue,
    };

    // console.log('forms', forms);

    const data = {
      userId: forms.userId,
      companyName: forms.companyName,
      userName: forms.userName,
      userPhone: forms.userPhone,
      createdAtStart: forms.createdAtStart,
      createdAtEnd: forms.createdAtEnd,
      userStatus: forms.userStatus,
      createdIp: forms.createdIp,

      page: page,
      pageViewCount: 5,
      viewCount: t.userTableTopBox?.getViewCount(),
    };

    // console.log('data', data);

    t.isUserListGetting = true;

    const observable = t.ajax.post(
      environment.api.user.getUser,
      data,
    );

    observable.subscribe(
      data => {
        t.isUserListGetting = false;

        if (data.result === 'success') {
          const list: UserItem[] = data.list;
          t.userList = list;
          t.userTableTopBox.setTotalCount(data.totalCount);
          t.userListPaginationBox.setBoardCountInfo(data.getBoardCountInfo);
        } else {
          this.common.alertMessage(data);
        }
      },
      error => {
        t.isUserListGetting = false;
        this.common.alertMessage(error);
      }
    );
  }

  userDetailInfoButtonClick(item: UserItem): void {
    console.log('item', item);

    if (typeof item.userKey !== 'string' || item.userKey === '') {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('상세정보를 볼 권한이 없습니다.')
        .show();
      return;
    }

    this.router.navigate(['user/info/' + item.userKey]);
    return;
  }

  userUploadButtonClick(): void {

  }
}