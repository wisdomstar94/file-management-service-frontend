import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CodeItem } from 'src/app/interfaces/code-item.interface';
import { FileVersionItem } from 'src/app/interfaces/file-version-item.interface';
import { SearchItem } from 'src/app/interfaces/search-item.interface';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { TableViewType } from 'src/app/types/table-view-type.type';
import { environment } from 'src/environments/environment';
import { FileVersionDetailPopupComponent } from '../file-version-detail-popup/file-version-detail-popup.component';
import { PaginationBoxComponent } from '../pagination-box/pagination-box.component';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { TableTopBoxComponent } from '../table-top-box/table-top-box.component';

@Component({
  selector: 'app-file-version-board',
  templateUrl: './file-version-board.component.html',
  styleUrls: ['./file-version-board.component.scss']
})
export class FileVersionBoardComponent implements OnInit {
  @Input() fileKey!: string;

  @ViewChild('fileVersionSearchBox') fileVersionSearchBox!: SearchBoxComponent;
  @ViewChild('fileVersionTableTopBox') fileVersionTableTopBox!: TableTopBoxComponent;
  @ViewChild('fileVersionListPaginationBox') fileVersionListPaginationBox!: PaginationBoxComponent;

  @ViewChild('fileVersionDetailPopup') fileVersionDetailPopup!: FileVersionDetailPopupComponent;

  searchItemList: SearchItem[] = [
    {
      uniqueID: 'fileVersionName',
      searchType: 'text',
      itemTitle: '버전',
      currentValue: '',
    },
    {
      uniqueID: 'fileVersionCode',
      searchType: 'text',
      itemTitle: '버전코드',
      currentValue: '',
    },
    {
      uniqueID: 'fileOriginalName',
      searchType: 'text',
      itemTitle: '버전 원본 파일명',
      currentValue: '',
    },
    {
      uniqueID: 'createdAt',
      searchType: 'datetime',
      itemTitle: '업로드 날짜',
      startDatetime: '',
      endDatetime: '',
    },
    {
      uniqueID: 'fileVersionDescription',
      searchType: 'text',
      itemTitle: '버전 설명글',
      currentValue: '',
    },
    {
      uniqueID: 'fileVersionMemo',
      searchType: 'text',
      itemTitle: '버전 메모',
      currentValue: '',
    },
    {
      uniqueID: 'fileVersionStatus',
      searchType: 'checkbox',
      itemTitle: '상태',
      checkboxItemList: [],
    },
  ];

  isFileVersionListAllCheck: boolean;
  fileVersionTableViewType!: TableViewType;
  isFileVersionListGetting = false;
  isFileVersionDeleting = false;
  fileVersionList: FileVersionItem[] = [];

  isSearchAreaShow: boolean;
  isShowFileDownloadButton: boolean;

  constructor(
    private store: Store<{ destination: string[], activeMenuKey: string }>,
    private route: ActivatedRoute,
    private router: Router,
    public common: CommonService,
    private ajax: AjaxService,
  ) {
    this.isSearchAreaShow = true;
    this.isShowFileDownloadButton = false;

    if (this.route.snapshot.data.SearchAreaShowFlag[0] === false) {
      this.isSearchAreaShow = false;
    }

    this.isFileVersionListAllCheck = false;
    this.fileVersionTableViewType = 'row';
    this.fileKey = route.snapshot.params.fileKey;
    console.log('fileKey', this.fileKey);

    const statusCodeList: CodeItem[] = this.route.snapshot.data.FileVersionStatusCode;
    const fileStatusSearchItem = this.common.getSearchItem(this.searchItemList, 'fileVersionStatus');
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
    t.fileVersionSearchBox?.clearSearchItem();
  }

  fileVersionListAllCheckChanged(): void {
    const t = this;

    // console.log('this.isCompanyListAllCheck', this.isCompanyListAllCheck);

    if (this.isFileVersionListAllCheck === true) {
      for (const item of t.fileVersionList) {
        item.isChecked = true;
      }
    } else {
      for (const item of t.fileVersionList) {
        item.isChecked = false;
      }
    }
  }

  getList(page: number): void {
    const t = this;

    if (t.isFileVersionListGetting === true) {
      t.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('목록을 가져오는 중입니다. 잠시만 기다려주세요.')
        .show();
      return;
    }

    const forms = {
      fileVersionName: t.searchItemList.filter((x) => { if (x.uniqueID === 'fileVersionName') { return x; } else { return; } })[0].currentValue,
      fileVersionCode: t.searchItemList.filter((x) => { if (x.uniqueID === 'fileVersionCode') { return x; } else { return; } })[0].currentValue,
      fileOriginalName: t.searchItemList.filter((x) => { if (x.uniqueID === 'fileOriginalName') { return x; } else { return; } })[0].currentValue,
      createdAtStart: t.searchItemList.filter((x) => { if (x.uniqueID === 'createdAt') { return x; } else { return; } })[0].startDatetime + ' 00:00:00',
      createdAtEnd: t.searchItemList.filter((x) => { if (x.uniqueID === 'createdAt') { return x; } else { return; } })[0].endDatetime + ' 23:59:59',
      fileVersionDescription: t.searchItemList.filter((x) => { if (x.uniqueID === 'fileVersionDescription') { return x; } else { return; } })[0].currentValue,
      fileVersionMemo: t.searchItemList.filter((x) => { if (x.uniqueID === 'fileVersionMemo') { return x; } else { return; } })[0].currentValue,
      fileVersionStatus: t.searchItemList.filter((x) => { if (x.uniqueID === 'fileVersionStatus') { return x; } else { return; } })[0].checkboxItemList?.filter((x) => { if (x.checked === true) { return x.checkboxValue; } else { return; } }).map((x) => { return x.checkboxValue; }),
    };

    // console.log('forms', forms);

    const data = {
      fileKey: this.fileKey,
      fileVersionName: forms.fileVersionName,
      fileVersionCodeStart: forms.fileVersionCode,
      fileVersionCodeEnd: forms.fileVersionCode,
      fileOriginalName: forms.fileOriginalName,
      createdAtStart: forms.createdAtStart,
      createdAtEnd: forms.createdAtEnd,
      fileVersionDescription: forms.fileVersionDescription,
      fileVersionMemo: forms.fileVersionMemo,
      fileVersionStatus: forms.fileVersionStatus,

      page: page,
      pageViewCount: 5,
      viewCount: t.fileVersionTableTopBox?.getViewCount(),
    };

    // console.log('data', data);

    t.isFileVersionListGetting = true;

    const observable = t.ajax.post(
      environment.api.fileVersion.getFileVersion,
      data,
    );

    observable.subscribe(
      data2 => {
        t.isFileVersionListGetting = false;
        t.isShowFileDownloadButton = data2.isShowFileDownloadButton;

        if (data2 instanceof HttpErrorResponse) {
          this.common.alertMessage(data2.error);
        } else if (data2.result === 'success') {
          const list: FileVersionItem[] = data2.list;
          t.fileVersionList = list;
          t.fileVersionTableTopBox.setTotalCount(data2.totalCount);
          t.fileVersionListPaginationBox.setBoardCountInfo(data2.getBoardCountInfo);
        } else {
          this.common.alertMessage(data2);
        }
      },
    );
  }

  fileVersionDetailInfoButtonClick(item: FileVersionItem): void {
    // console.log('item', item);

    if (typeof item.fileVersionKey !== 'string' || item.fileVersionKey === '') {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('상세정보를 볼 권한이 없습니다.')
        .show();
      return;
    }

    this.fileVersionDetailPopup.show(item.fileVersionKey, 'modify');
  }

  fileVersionDeleteButtonClick(): void {
    if (this.isFileVersionDeleting) {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('삭제 중입니다. 잠시만 기다려주세요.')
        .show();
      return;
    }

    const fileVersionKey: string[] = [];

    for (const item of this.fileVersionList) {
      if (item.isChecked) {
        fileVersionKey.push(item.fileVersionKey!);
      }
    }

    if (fileVersionKey.length === 0) {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('선택된 파일 버전이 없습니다.')
        .show();
      return;
    }

    this.common.getAlertComponent()
      ?.setDefault()
      .setTitle('안내')
      .setMessage('선택된 ' + fileVersionKey.length + '개 파일 버전을 삭제하시겠습니까?')
      .setCancelButton(true)
      .setConfirmButton(true)
      .setCancelCallback(() => {
        this.common.getAlertComponent()?.hide();
      })
      .setConfirmCallback(() => {
        this.deleteFileVersion(fileVersionKey);
        this.common.getAlertComponent()?.hide();
      })
      .show();
  }

  deleteFileVersion(fileVersionKey: string[]): void {
    if (this.isFileVersionDeleting) {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('삭제 중입니다. 잠시만 기다려주세요.')
        .show();
      return;
    }

    if (fileVersionKey.length === 0) {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('삭제할 파일 버전이 없습니다.')
        .show();
      return;
    }

    // console.log('fileVersionKey', fileVersionKey);

    const data = {
      fileVersionKey: fileVersionKey,
    };

    this.isFileVersionDeleting = true;
    const observable = this.ajax.post(environment.api.fileVersion.deleteFileVersion, data);
    observable.subscribe(
      data2 => {
        this.isFileVersionDeleting = false;
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
          .setMessage('선택된 파일 버전이 삭제 되었습니다.')
          .setConfirmCallback(() => {
            this.common.getAlertComponent()?.hide();
            this.getList(1);
          })
          .show();
      },
    );
  }

  fileVersionUploadButtonClick(): void {
    // this.router.navigate(['file/upload']);
    this.fileVersionDetailPopup.show('', 'upload');
  }

  executeFileDownload(item: FileVersionItem): void {
    const baseUrl = environment.baseUrl;
    const link = baseUrl + '/api/download/fileAdmin/' + item.fileVersionKey;
    // console.log('link', link);
    location.href = link;
  }
}
