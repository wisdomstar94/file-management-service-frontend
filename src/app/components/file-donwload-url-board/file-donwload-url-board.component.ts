import { HttpErrorResponse } from '@angular/common/http';
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
      itemTitle: '???????????? ?????????',
      currentValue: '',
    },
    {
      uniqueID: 'fileDownloadLimitMaxCount',
      searchType: 'number',
      itemTitle: '???????????? ?????? ??????',
    },
    {
      uniqueID: 'fileDownloadPossibleDateTime',
      searchType: 'datetime',
      itemTitle: '???????????? ?????? ??????',
      startDatetime: '',
      endDatetime: '',
    },
    {
      uniqueID: 'createdAt',
      searchType: 'datetime',
      itemTitle: 'URL ?????????',
      startDatetime: '',
      endDatetime: '',
    },
    {
      uniqueID: 'fileDownloadUrlAccessConditionType',
      searchType: 'checkbox',
      itemTitle: '???????????? ??????',
      checkboxItemList: [],
    },
    {
      uniqueID: 'fileDownloadUrlStatus',
      searchType: 'checkbox',
      itemTitle: '??????',
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
        .setTitle('??????')
        .setMessage('????????? ???????????? ????????????. ????????? ??????????????????.')
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
      data2 => {
        t.isFileDownloadUrlListGetting = false;

        if (data2 instanceof HttpErrorResponse) {
          this.common.alertMessage(data2.error);
        } else if (data2.result === 'success') {
          const list: FileDownloadUrlItem[] = data2.list;
          t.fileDownloadUrlList = list;
          t.fileDownloadUrlTableTopBox.setTotalCount(data2.totalCount);
          t.fileDownloadUrlListPaginationBox.setBoardCountInfo(data2.getBoardCountInfo);
        } else {
          this.common.alertMessage(data2);
        }
      },
    );
  }

  fileDownloadUrlDetailInfoButtonClick(item: FileDownloadUrlItem): void {
    // console.log('item', item);

    if (typeof item.fileDownloadUrlKey !== 'string' || item.fileDownloadUrlKey === '') {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('??????')
        .setMessage('??????????????? ??? ????????? ????????????.')
        .show();
      return;
    }

    this.fileDownloadUrlDetailPopup.show(item.fileDownloadUrlKey, 'modify');
  }

  fileDownloadUrlDeleteButtonClick(): void {
    if (this.isFileDownloadUrlDeleting) {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('??????')
        .setMessage('?????? ????????????. ????????? ??????????????????.')
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
        .setTitle('??????')
        .setMessage('????????? ?????? ???????????? URL??? ????????????.')
        .show();
      return;
    }

    this.common.getAlertComponent()
      ?.setDefault()
      .setTitle('??????')
      .setMessage('????????? ' + fileDownloadUrlKey.length + '??? ?????? ???????????? URL??? ?????????????????????????')
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
  }

  deleteFileDownloadUrl(fileDownloadUrlKey: string[]): void {
    if (this.isFileDownloadUrlDeleting) {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('??????')
        .setMessage('?????? ????????????. ????????? ??????????????????.')
        .show();
      return;
    }

    if (fileDownloadUrlKey.length === 0) {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('??????')
        .setMessage('????????? ?????? ???????????? URL??? ????????????.')
        .show();
      return;
    }

    // console.log('fileDownloadUrlKey', fileDownloadUrlKey);

    const data = {
      fileDownloadUrlKey: fileDownloadUrlKey,
    };

    this.isFileDownloadUrlDeleting = true;
    const observable = this.ajax.post(environment.api.fileDownloadUrl.deleteFileDownloadUrl, data);
    observable.subscribe(
      data2 => {
        this.isFileDownloadUrlDeleting = false;
        // console.log('response', data2);

        if (data2 instanceof HttpErrorResponse) {
          this.common.alertMessage(data2.error);
          return;
        } else if (data2.result !== 'success') {
          this.common.alertMessage(data2);
          return;
        }

        this.common.getAlertComponent()
          ?.setDefault()
          .setMessage('????????? ?????? ???????????? URL??? ?????? ???????????????.')
          .setConfirmCallback(() => {
            this.common.getAlertComponent()?.hide();
            this.getList(1);
          })
          .show();
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
