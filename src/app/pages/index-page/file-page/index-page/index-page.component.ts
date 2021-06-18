import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PaginationBoxComponent } from 'src/app/components/pagination-box/pagination-box.component';
import { SearchBoxComponent } from 'src/app/components/search-box/search-box.component';
import { TableTopBoxComponent } from 'src/app/components/table-top-box/table-top-box.component';
import { CodeItem } from 'src/app/interfaces/code-item.interface';
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
export class IndexPageComponent implements OnInit, DoCheck {
  @ViewChild('fileSearchBox') fileSearchBox!: SearchBoxComponent;
  @ViewChild('fileTableTopBox') fileTableTopBox!: TableTopBoxComponent;
  @ViewChild('fileListPaginationBox') fileListPaginationBox!: PaginationBoxComponent;

  searchItemList: SearchItem[] = [
    {
      uniqueID: 'fileLabelName',
      searchType: 'text',
      itemTitle: '파일 라벨명',
      currentValue: '',
    },
    {
      uniqueID: 'fileMemo',
      searchType: 'text',
      itemTitle: '파일 메모',
      currentValue: '',
    },
    {
      uniqueID: 'fileDescription',
      searchType: 'text',
      itemTitle: '파일 설명',
      currentValue: '',
    },
    {
      uniqueID: 'createdAt',
      searchType: 'datetime',
      itemTitle: '파일 등록일',
      startDatetime: '',
      endDatetime: '',
    },
    {
      uniqueID: 'fileStatus',
      searchType: 'checkbox',
      itemTitle: '상태',
      checkboxItemList: [],
    },
  ];

  isFileListAllCheck: boolean;
  fileTableViewType!: TableViewType;
  isFileListGetting = false;
  fileList: FileItem[] = [];

  constructor(
    private store: Store<{ destination: string[], activeMenuKey: string }>,
    private route: ActivatedRoute,
    private router: Router,
    private common: CommonService,
    private ajax: AjaxService,
  ) { 
    this.isFileListAllCheck = false;

    const statusCodeList: CodeItem[] = this.route.snapshot.data.FileStatusCode;
    const fileStatusSearchItem = this.common.getSearchItem(this.searchItemList, 'fileStatus');
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

  ngDoCheck(): void {
    const t = this;
    t.store.dispatch(changeDestination({ destination: ['홈', '파일관리'] }));
    t.store.dispatch(setActiveMenuKey({ menuKey: 'Ig1617524166484wTSHK' }));
  }

  clearSearchItem(): void {
    const t = this;
    t.fileSearchBox?.clearSearchItem();
  }

  fileListAllCheckChanged(): void {
    const t = this;

    // console.log('this.isCompanyListAllCheck', this.isCompanyListAllCheck);

    if (this.isFileListAllCheck === true) {
      for (const item of t.fileList) {
        item.isChecked = true;
      }
    } else {
      for (const item of t.fileList) {
        item.isChecked = false;
      }
    }
  }

  getList(page: number): void {
    const t = this;
    
    if (t.isFileListGetting === true) {
      t.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('목록을 가져오는 중입니다. 잠시만 기다려주세요.')
        .show();
      return;
    }

    const forms = {
      fileLabelName: t.searchItemList.filter((x) => { if (x.uniqueID === 'fileLabelName') { return x; } else { return; } })[0].currentValue,
      fileMemo: t.searchItemList.filter((x) => { if (x.uniqueID === 'fileMemo') { return x; } else { return; } })[0].currentValue,
      fileDescription: t.searchItemList.filter((x) => { if (x.uniqueID === 'fileDescription') { return x; } else { return; } })[0].currentValue,
      createdAtStart: t.searchItemList.filter((x) => { if (x.uniqueID === 'createdAt') { return x; } else { return; } })[0].startDatetime + ' 00:00:00',
      createdAtEnd: t.searchItemList.filter((x) => { if (x.uniqueID === 'createdAt') { return x; } else { return; } })[0].endDatetime + ' 23:59:59',
      fileStatus: t.searchItemList.filter((x) => { if (x.uniqueID === 'fileStatus') { return x; } else { return; } })[0].checkboxItemList?.filter((x) => { if (x.checked === true) { return x.checkboxValue; } else { return; } }).map((x) => { return x.checkboxValue; }),
    };

    // console.log('forms', forms);

    const data = {
      fileLabelName: forms.fileLabelName,
      fileMemo: forms.fileMemo,
      fileDescription: forms.fileDescription,
      createdAtStart: forms.createdAtStart,
      createdAtEnd: forms.createdAtEnd,
      fileStatus: forms.fileStatus, 

      page: page,
      pageViewCount: 5,
      viewCount: t.fileTableTopBox?.getViewCount(),
    };

    // console.log('data', data);

    t.isFileListGetting = true;

    const observable = t.ajax.post(
      environment.api.file.getFile,
      data,
    );

    observable.subscribe(
      data => {
        t.isFileListGetting = false;

        if (data.result === 'success') {
          const list: FileItem[] = data.list;
          t.fileList = list;
          t.fileTableTopBox.setTotalCount(data.totalCount);
          t.fileListPaginationBox.setBoardCountInfo(data.getBoardCountInfo);
        } else {
          this.common.alertMessage(data);
        }
      },
      error => {
        t.isFileListGetting = false;
        this.common.alertMessage(error);
      }
    );
  }

  fileDetailInfoButtonClick(item: FileItem): void {
    // console.log('item', item);

    if (typeof item.fileKey !== 'string' || item.fileKey === '') {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('상세정보를 볼 권한이 없습니다.')
        .show();
      return;
    }

    this.router.navigate(['file/info/' + item.fileKey]);
    return;
  }

  fileUploadButtonClick(): void {
    this.router.navigate(['file/upload']);
  }  
}
