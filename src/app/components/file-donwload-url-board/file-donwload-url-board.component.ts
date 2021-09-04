import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CodeItem } from 'src/app/interfaces/code-item.interface';
import { FileDownloadUrlItem } from 'src/app/interfaces/file-download-url-item.interface';
import { SearchItem } from 'src/app/interfaces/search-item.interface';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { TableViewType } from 'src/app/types/table-view-type.type';
import { environment } from 'src/environments/environment';
import { FileDownloadUrlDetailPopupComponent } from '../file-download-url-detail-popup/file-download-url-detail-popup.component';
import { FileDownloadUrlLogPopupComponent } from '../file-download-url-log-popup/file-download-url-log-popup.component';
import { PaginationBoxComponent } from '../pagination-box/pagination-box.component';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { TableTopBoxComponent } from '../table-top-box/table-top-box.component';

@Component({
  selector: 'app-file-donwload-url-board',
  templateUrl: './file-donwload-url-board.component.html',
  styleUrls: ['./file-donwload-url-board.component.scss']
})
export class FileDonwloadUrlBoardComponent implements OnInit {
  environment = environment;

  @Input() fileKey!: string;

  @ViewChild('fileDownloadUrlSearchBox') fileDownloadUrlSearchBox!: SearchBoxComponent;
  @ViewChild('fileDownloadUrlTableTopBox') fileDownloadUrlTableTopBox!: TableTopBoxComponent;
  @ViewChild('fileDownloadUrlListPaginationBox') fileDownloadUrlListPaginationBox!: PaginationBoxComponent;

  @ViewChild('fileDownloadUrlDetailPopup') fileDownloadUrlDetailPopup!: FileDownloadUrlDetailPopupComponent;
  @ViewChild('fileDownloadUrlLogPopup') fileDownloadUrlLogPopup!: FileDownloadUrlLogPopupComponent;

  searchItemList: SearchItem[] = [
    {
      uniqueID: 'fileDownloadUrlKey',
      searchType: 'text',
      itemTitle: '다운로드 접근키',
      currentValue: '',
    },
    {
      uniqueID: 'fileDownloadLimitMaxCount',
      searchType: 'number',
      itemTitle: '다운로드 제한 횟수',
    },
    {
      uniqueID: 'fileDownloadPossibleDateTime',
      searchType: 'datetime',
      itemTitle: '다운로드 제한 기간',
      startDatetime: '',
      endDatetime: '',
    },
    {
      uniqueID: 'createdAt',
      searchType: 'datetime',
      itemTitle: 'URL 생성일',
      startDatetime: '',
      endDatetime: '',
    },
    {
      uniqueID: 'fileDownloadUrlAccessConditionType',
      searchType: 'checkbox',
      itemTitle: '다운로드 제한',
      checkboxItemList: [],
    },
    {
      uniqueID: 'fileDownloadUrlStatus',
      searchType: 'checkbox',
      itemTitle: '상태',
      checkboxItemList: [],
    },
  ];

  isFileDownloadUrlListAllCheck: boolean;
  fileDownloadUrlTableViewType!: TableViewType;
  isFileDownloadUrlListGetting = false;
  isFileDownloadUrlDeleting = false;
  fileDownloadUrlList: FileDownloadUrlItem[] = [];

  isSearchAreaShow: boolean;

  constructor(
    private store: Store<{ destination: string[], activeMenuKey: string }>,
    private route: ActivatedRoute,
    private router: Router,
    private common: CommonService,
    private ajax: AjaxService,
  ) { 
    this.isSearchAreaShow = true;

    if (this.route.snapshot.data.SearchAreaShowFlag[1] === false) {
      this.isSearchAreaShow = false;
    }	

    this.isFileDownloadUrlListAllCheck = false;
    this.fileDownloadUrlTableViewType = 'row';
    this.fileKey = route.snapshot.params.fileKey;
    console.log('fileKey', this.fileKey);

    // FileDownloadUrlConditionTypeCode
    // FileDownloadUrlStatusCode

    const conditionCodeList: CodeItem[] = this.route.snapshot.data.FileDownloadUrlConditionTypeCode;
    const confitionSearchItem = this.common.getSearchItem(this.searchItemList, 'fileDownloadUrlAccessConditionType');
    if (confitionSearchItem !== undefined) {
      confitionSearchItem.checkboxItemList = conditionCodeList.map((x) => {
        return {
          uniqueID: x.code,
          checkboxValue: x.code,
          labelText: x.codeName,
          checked: false,
        };
      });
    }

    const statusCodeList: CodeItem[] = this.route.snapshot.data.FileDownloadUrlStatusCode;
    const fileStatusSearchItem = this.common.getSearchItem(this.searchItemList, 'fileDownloadUrlStatus');
    if (fileStatusSearchItem !== undefined) {
      fileStatusSearchItem.checkboxItemList = statusCodeList.map((x) => {
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

  clearSearchItem(): void {
    const t = this;
    t.fileDownloadUrlSearchBox?.clearSearchItem();
  }

  fileDownloadUrlListAllCheckChanged(): void {
    const t = this;

    // console.log('this.isCompanyListAllCheck', this.isCompanyListAllCheck);

    if (this.isFileDownloadUrlListAllCheck === true) {
      for (const item of t.fileDownloadUrlList) {
        item.isChecked = true;
      }
    } else {
      for (const item of t.fileDownloadUrlList) {
        item.isChecked = false;
      }
    }
  }

  getList(page: number): void {
    const t = this;
    
    if (t.isFileDownloadUrlListGetting === true) {
      t.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('목록을 가져오는 중입니다. 잠시만 기다려주세요.')
        .show();
      return;
    }

    const forms = {
      fileDownloadUrlKey: t.searchItemList.filter((x) => { if (x.uniqueID === 'fileDownloadUrlKey') { return x; } else { return; } })[0].currentValue,
      fileDownloadLimitMaxCountStart: t.searchItemList.filter((x) => { if (x.uniqueID === 'fileDownloadLimitMaxCount') { return x; } else { return; } })[0].startNumber,
      fileDownloadLimitMaxCountEnd: t.searchItemList.filter((x) => { if (x.uniqueID === 'fileDownloadLimitMaxCount') { return x; } else { return; } })[0].endNumber,
      fileDownloadPossibleDateTimeStart: t.searchItemList.filter((x) => { if (x.uniqueID === 'fileDownloadPossibleDateTime') { return x; } else { return; } })[0].startDatetime + ' 00:00:00',
      fileDownloadPossibleDateTimeEnd: t.searchItemList.filter((x) => { if (x.uniqueID === 'fileDownloadPossibleDateTime') { return x; } else { return; } })[0].endDatetime + ' 23:59:59',
      createdAtStart: t.searchItemList.filter((x) => { if (x.uniqueID === 'createdAt') { return x; } else { return; } })[0].startDatetime + ' 00:00:00',
      createdAtEnd: t.searchItemList.filter((x) => { if (x.uniqueID === 'createdAt') { return x; } else { return; } })[0].endDatetime + ' 23:59:59',
      fileDownloadUrlAccessConditionType: t.searchItemList.filter((x) => { if (x.uniqueID === 'fileDownloadUrlAccessConditionType') { return x; } else { return; } })[0].checkboxItemList?.filter((x) => { if (x.checked === true) { return x.checkboxValue; } else { return; } }).map((x) => { return x.checkboxValue; }),
      fileDownloadUrlStatus: t.searchItemList.filter((x) => { if (x.uniqueID === 'fileDownloadUrlStatus') { return x; } else { return; } })[0].checkboxItemList?.filter((x) => { if (x.checked === true) { return x.checkboxValue; } else { return; } }).map((x) => { return x.checkboxValue; }),
    };

    // console.log('forms', forms);

    const data = {
      fileKey: this.fileKey,
      fileDownloadUrlKey: forms.fileDownloadUrlKey,
      fileDownloadLimitMaxCountStart: forms.fileDownloadLimitMaxCountStart,
      fileDownloadLimitMaxCountEnd: forms.fileDownloadLimitMaxCountEnd,
      fileDownloadPossibleDateTimeStart: forms.fileDownloadPossibleDateTimeStart,
      fileDownloadPossibleDateTimeEnd: forms.fileDownloadPossibleDateTimeEnd,
      createdAtStart: forms.createdAtStart,
      createdAtEnd: forms.createdAtEnd,
      fileDownloadUrlAccessConditionType: forms.fileDownloadUrlAccessConditionType,
      fileDownloadUrlStatus: forms.fileDownloadUrlStatus,
      
      page: page,
      pageViewCount: 5,
      viewCount: t.fileDownloadUrlTableTopBox?.getViewCount(),
    };

    // console.log('data', data);

    t.isFileDownloadUrlListGetting = true;

    const observable = t.ajax.post(
      environment.api.fileDownloadUrl.getFileDownloadUrl,
      data,
    );

    observable.subscribe(
      data => {
        t.isFileDownloadUrlListGetting = false;

        if (data.result === 'success') {
          const list: FileDownloadUrlItem[] = data.list;
          t.fileDownloadUrlList = list;
          t.fileDownloadUrlTableTopBox.setTotalCount(data.totalCount);
          t.fileDownloadUrlListPaginationBox.setBoardCountInfo(data.getBoardCountInfo);
        } else {
          this.common.alertMessage(data);
        }
      },
      error => {
        t.isFileDownloadUrlListGetting = false;
        this.common.alertMessage(error);
      }
    );
  }

  fileDownloadUrlDetailInfoButtonClick(item: FileDownloadUrlItem): void {
    // console.log('item', item);

    if (typeof item.fileDownloadUrlKey !== 'string' || item.fileDownloadUrlKey === '') {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('상세정보를 볼 권한이 없습니다.')
        .show();
      return;
    }

    this.fileDownloadUrlDetailPopup.show(item.fileDownloadUrlKey, 'modify');
    // this.router.navigate(['file/info/' + item.fileVersionKey]);
    return;
  }

  fileDownloadUrlDeleteButtonClick(): void {
    if (this.isFileDownloadUrlDeleting) {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('삭제 중입니다. 잠시만 기다려주세요.')
        .show();
      return;
    }

    const fileDownloadUrlKey: string[] = [];

    for (const item of this.fileDownloadUrlList) {
      if (item.isChecked) {
        fileDownloadUrlKey.push(item.fileDownloadUrlKey!);
      }
    }

    if (fileDownloadUrlKey.length === 0) {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('선택된 파일 다운로드 URL이 없습니다.')
        .show();
      return;
    }

    this.common.getAlertComponent()
      ?.setDefault()
      .setTitle('안내')
      .setMessage('선택된 ' + fileDownloadUrlKey.length + '개 파일 다운로드 URL을 삭제하시겠습니까?')
      .setCancelButton(true)
      .setConfirmButton(true)
      .setCancelCallback(() => {
        this.common.getAlertComponent()?.hide();
      })
      .setConfirmCallback(() => {
        this.deleteFileDownloadUrl(fileDownloadUrlKey);
        this.common.getAlertComponent()?.hide();
      })
      .show();
      return;
  }

  deleteFileDownloadUrl(fileDownloadUrlKey: string[]): void {
    if (this.isFileDownloadUrlDeleting) {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('삭제 중입니다. 잠시만 기다려주세요.')
        .show();
      return;
    }

    if (fileDownloadUrlKey.length === 0) {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('삭제할 파일 다운로드 URL이 없습니다.')
        .show();
      return;
    }
    
    // console.log('fileDownloadUrlKey', fileDownloadUrlKey);

    const data = {
      fileDownloadUrlKey: fileDownloadUrlKey,
    };

    this.isFileDownloadUrlDeleting = true;
    const observable = this.ajax.post(environment.api.fileDownloadUrl.deleteFileDownloadUrl, data);
    const subscribe = observable.subscribe(
      data => {
        this.isFileDownloadUrlDeleting = false;
        // console.log('response', data);

        if (data.result !== 'success') {
          this.common.alertMessage(data);
          return;
        }

        this.common.getAlertComponent()
          ?.setDefault()
          .setMessage('선택된 파일 다운로드 URL이 삭제 되었습니다.')
          .setConfirmCallback(() => {
            this.common.getAlertComponent()?.hide();
            this.getList(1);
          })
          .show();
        return;
      },
      error => {
        this.isFileDownloadUrlDeleting = false;
        this.common.alertMessage(error);
        return;
      },
    );
  }

  fileDownloadUrlUploadButtonClick(): void {
    // this.router.navigate(['file/upload']);
    this.fileDownloadUrlDetailPopup.show('', 'upload');
  } 
  
  fileDownloadUrlLogCheckButtonClick(item: FileDownloadUrlItem): void {
    this.fileDownloadUrlLogPopup.show(item.fileDownloadUrlKey as string);
  }
}
