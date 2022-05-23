import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FileDownloadUrlLogPopupComponent } from 'src/app/components/file-download-url-log-popup/file-download-url-log-popup.component';
import { SearchBoxComponent } from 'src/app/components/search-box/search-box.component';
import { TableTopBoxComponent } from 'src/app/components/table-top-box/table-top-box.component';
import { FileDownloadStateItem } from 'src/app/interfaces/file-download-state-item.interface';
import { FileDownloadUrlKeyItem } from 'src/app/interfaces/file-download-url-key-item';
import { FileItem } from 'src/app/interfaces/file-item.interface';
import { SearchItem } from 'src/app/interfaces/search-item.interface';
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
export class IndexPageComponent implements OnInit {
  @ViewChild('fileDownloadStateSearchBox') fileDownloadStateSearchBox!: SearchBoxComponent;
  @ViewChild('fileDownloadStateTableTopBox') fileDownloadStateTableTopBox!: TableTopBoxComponent;
  @ViewChild('fileDownloadUrlLogPopup') fileDownloadUrlLogPopup!: FileDownloadUrlLogPopupComponent;
  // @ViewChild('fileDownloadStatePaginationBox') fileDownloadStatePaginationBox!: PaginationBoxComponent;

  searchItemList: SearchItem[] = [
    // {
    //   uniqueID: 'userId',
    //   searchType: 'text',
    //   itemTitle: '회원 ID',
    //   currentValue: '',
    // },
    // {
    //   uniqueID: 'companyName',
    //   searchType: 'text',
    //   itemTitle: '회사명',
    //   currentValue: '',
    // },
    {
      uniqueID: 'targetYYYYMM',
      searchType: 'select',
      itemTitle: '조회 기간 (월단위)',
      selectItems: [],
      currentValue: '',
    }
  ];

  logYyyymmList: string[] = [];

  isFileDownloadStateListAllCheck: boolean;
  fileDownloadStateTableViewType!: TableViewType;
  isfileDownloadStateGetting = false;
  fileDownloadStateList: FileDownloadStateItem[] = [];

  isSearchAreaShow: boolean;

  constructor(
    private store: Store<{ destination: string[], activeMenuKey: string }>,
    private route: ActivatedRoute,
    private router: Router,
    private common: CommonService,
    private ajax: AjaxService,
  ) {
    this.isSearchAreaShow = true;

    if (this.route.snapshot.data.SearchAreaShowFlag[0] === false) {
      this.isSearchAreaShow = false;
    }

    this.isFileDownloadStateListAllCheck = false;
    this.fileDownloadStateTableViewType = 'row';

    this.logYyyymmList = this.route.snapshot.data.LogYyyymmList;
    const targetYYYYMMSearchItem = this.searchItemList.filter((x) => { if (x.uniqueID === 'targetYYYYMM') { return true; } else { return false; } })[0];
    targetYYYYMMSearchItem.selectItems = this.logYyyymmList.map((x) => {
      return {
        optionUniqueID: x,
        optionValue: x,
        optionDisplayText: x.substring(0, 4) + '년 ' + x.substring(4, 6) + '월',
        selected: false,
      };
    });
    targetYYYYMMSearchItem.currentValue = targetYYYYMMSearchItem.selectItems[0].optionValue;

  }

  ngOnInit(): void {
    this.getList(1);
  }

  ngDoCheck(): void {
    const t = this;
    t.store.dispatch(changeDestination({ destination: ['홈', '파일 다운로드 현황'] }));
    t.store.dispatch(setActiveMenuKey({ menuKey: 'njHLKh1617524193166T' }));
  }

  clearSearchItem(): void {
    const t = this;
    t.fileDownloadStateSearchBox?.clearSearchItem();
  }

  fileDownloadStateListAllCheckChanged(): void {
    const t = this;

    // console.log('this.isCompanyListAllCheck', this.isCompanyListAllCheck);

    if (this.isFileDownloadStateListAllCheck === true) {
      for (const item of t.fileDownloadStateList) {
        item.isChecked = true;
      }
    } else {
      for (const item of t.fileDownloadStateList) {
        item.isChecked = false;
      }
    }
  }

  getList(page: number): void {
    const t = this;

    if (t.isfileDownloadStateGetting === true) {
      t.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('목록을 가져오는 중입니다. 잠시만 기다려주세요.')
        .show();
      return;
    }

    const forms = {
      targetDateTime: this.searchItemList.filter((x) => {
        if (x.uniqueID === 'targetYYYYMM') { return true; } else { return false; }
      })[0].currentValue,
    };

    // console.log('forms', forms);

    const data = {
      targetDateTime: forms.targetDateTime?.substring(0, 4) + '-' + forms.targetDateTime?.substring(4, 6) + '-01 00:00:00',
    };

    // console.log('data', data);

    t.isfileDownloadStateGetting = true;

    const observable = t.ajax.post(
      environment.api.download.statistics,
      data,
    );

    observable.subscribe(
      data2 => {
        t.isfileDownloadStateGetting = false;

        if (data2 instanceof HttpErrorResponse) {
          this.common.alertMessage(data2.error);
        } else if (data2.result === 'success') {
          const list: FileDownloadStateItem[] = data2.list;
          t.fileDownloadStateList = list;
          t.fileDownloadStateTableTopBox.setTotalCount(list.length);
          // t.fileDownloadStatePaginationBox.setBoardCountInfo(data2.getBoardCountInfo);
        } else {
          this.common.alertMessage(data2);
        }
      },
    );
  }

  fileDownloadStateDetailInfoButtonClick(item: FileItem): void {
    // console.log('item', item);

    this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('준비중입니다.')
        .show();

    // if (typeof item.fileKey !== 'string' || item.fileKey === '') {
    //   this.common.getAlertComponent()
    //     ?.setDefault()
    //     .setTitle('안내')
    //     .setMessage('상세정보를 볼 권한이 없습니다.')
    //     .show();
    //   return;
    // }

    // this.router.navigate(['file/info/' + item.fileKey]);
    // return;
  }

  fileUploadButtonClick(): void {
    this.router.navigate(['file/upload']);
  }

  fileDownloadUrlKeyClicked(item: FileDownloadUrlKeyItem): void {
    const targetYYYYMMSearchItem = this.searchItemList.filter((x) => { if (x.uniqueID === 'targetYYYYMM') { return true; } else { return false; } })[0];
    console.log('targetYYYYMMSearchItem.currentValue', targetYYYYMMSearchItem.currentValue);
    // this.fileDownloadUrlLogPopup.selectedYYYYMMInfo.selectedValue = targetYYYYMMSearchItem.currentValue as string;
    // this.fileDownloadUrlLogPopup.selectedYYYYMMInfo.selectedValue = '202108';
    this.fileDownloadUrlLogPopup.show(item.fileDownloadUrlKey, targetYYYYMMSearchItem.currentValue as string);
  }
}
