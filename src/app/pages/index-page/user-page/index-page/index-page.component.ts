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
  isUserDeleting = false;
  userList: UserItem[] = [];

  constructor(
    private store: Store<{ destination: string[], activeMenuKey: string }>,
    private route: ActivatedRoute,
    private router: Router,
    private common: CommonService,
    private ajax: AjaxService,
    private searchOption: SearchOptionService,
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

    if (this.searchOption.searchOption.userSearchItemList.length !== 0) {
      this.searchItemList = this.searchOption.searchOption.userSearchItemList;
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
    this.searchOption.searchOption.userSearchItemList = this.searchItemList;

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

  userDeleteButtonClick(): void {
    if (this.isUserDeleting) {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('삭제 중입니다. 잠시만 기다려주세요.')
        .show();
      return;
    }

    const userKey: string[] = [];

    for (const item of this.userList) {
      if (item.isChecked) {
        userKey.push(item.userKey!);
      }
    }

    if (userKey.length === 0) {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('선택된 회원이 없습니다.')
        .show();
      return;
    }

    this.common.getAlertComponent()
      ?.setDefault()
      .setTitle('안내')
      .setMessage('선택된 ' + userKey.length + '개 회원을 삭제하시겠습니까?')
      .setCancelButton(true)
      .setConfirmButton(true)
      .setCancelCallback(() => {
        this.common.getAlertComponent()?.hide();
      })
      .setConfirmCallback(() => {
        this.deleteUser(userKey);
        this.common.getAlertComponent()?.hide();
      })
      .show();
      return;
  }

  deleteUser(userKey: string[]): void {
    if (this.isUserDeleting) {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('삭제 중입니다. 잠시만 기다려주세요.')
        .show();
      return;
    }

    if (userKey.length === 0) {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('삭제할 회원이 없습니다.')
        .show();
      return;
    }

    // console.log('userKey', userKey);

    const data = {
      userKey: userKey,
    };

    this.isUserDeleting = true;
    const observable = this.ajax.post(environment.api.user.deleteUser, data);
    const subscribe = observable.subscribe(
      data => {
        this.isUserDeleting = false;
        // console.log('response', data);

        if (data.result !== 'success') {
          this.common.alertMessage(data);
          return;
        }

        this.common.getAlertComponent()
          ?.setDefault()
          .setMessage('선택된 회원이 삭제 되었습니다.')
          .setConfirmCallback(() => {
            this.common.getAlertComponent()?.hide();
            this.getList(1);
          })
          .show();
        return;
      },
      error => {
        this.isUserDeleting = false;
        this.common.alertMessage(error);
        return;
      },
    );
  }

  userUploadButtonClick(): void {
    this.router.navigate(['user/upload']);
  }
}
