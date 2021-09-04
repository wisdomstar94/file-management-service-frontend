import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { FileDownloadUrlLogItem } from 'src/app/interfaces/file-download-url-log-item';
import { SelectItem } from 'src/app/interfaces/select-item.interface';
import { SelectedInfo } from 'src/app/interfaces/selected-info.interface';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { TableViewType } from 'src/app/types/table-view-type.type';
import { environment } from 'src/environments/environment';
import { PaginationBoxComponent } from '../pagination-box/pagination-box.component';
import { PopupBoxComponent } from '../popup-box/popup-box.component';
import { TableTopBoxComponent } from '../table-top-box/table-top-box.component';

@Component({
  selector: 'app-file-download-url-log-popup',
  templateUrl: './file-download-url-log-popup.component.html',
  styleUrls: ['./file-download-url-log-popup.component.scss']
})
export class FileDownloadUrlLogPopupComponent implements OnInit, OnChanges {
  @ViewChild('popupBox') popupBox!: PopupBoxComponent;
  @ViewChild('fileDownloadUrlLogTableTopBox') fileDownloadUrlLogTableTopBox!: TableTopBoxComponent;
  @ViewChild('fileDownloadUrlLogListPaginationBox') fileDownloadUrlLogListPaginationBox!: PaginationBoxComponent;
  @Input() fileDownloadUrlKey: string;
  @Input() isShow: boolean;
  fileDownloadUrlLogTableViewType: TableViewType;
  isFileDownloadUrlLogGetting: boolean;
  fileDownloadUrlLogList: FileDownloadUrlLogItem[];
  LogYyyymmListSelectItemList: SelectItem[];
  selectedYYYYMMInfo: SelectedInfo;

  constructor(
    private common: CommonService,
    private store: Store<{ destination: string[], activeMenuKey: string }>,
    private ajax: AjaxService,
    private route: ActivatedRoute,
  ) { 
    this.isShow = true;
    this.fileDownloadUrlLogTableViewType = 'card';
    this.fileDownloadUrlKey = '';
    this.isFileDownloadUrlLogGetting = false;
    this.fileDownloadUrlLogList = [];


    const yyyymmList: string[] = this.route.snapshot.data.LogYyyymmList;
    this.LogYyyymmListSelectItemList = yyyymmList.map((x) => {
      return {
        optionUniqueID: x, 
        optionValue: x, 
        optionDisplayText: x.substr(0, 4) + '년 ' + x.substr(4, 2) + '월', 
        selected: false,
      };
    });
    this.selectedYYYYMMInfo = {
      selectedValue: this.LogYyyymmListSelectItemList[0].optionValue,
    };
  }

  ngOnInit(): void {

  }

  clear(): void {
    this.fileDownloadUrlLogTableTopBox?.setViewCount('10');
    this.fileDownloadUrlLogList = [];
    this.selectedYYYYMMInfo = {
      selectedValue: this.LogYyyymmListSelectItemList[0].optionValue,
    };
  }

  getList(page: number): void {
    // console.log('this.selectedYYYYMMInfo', this.selectedYYYYMMInfo);
    // console.log(this.fileDownloadUrlLogTableTopBox.getViewCount());
    // return;

    if (this.fileDownloadUrlKey === '') {
      return;
    }

    if (this.isFileDownloadUrlLogGetting === true) {
      this.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('목록을 가져오는 중입니다. 잠시만 기다려주세요.')
        .show();
      return;
    }

    const data = {
      fileDownloadUrlKey: this.fileDownloadUrlKey,
      targetYYYYMM: this.selectedYYYYMMInfo.selectedValue,

      page: page,
      pageViewCount: 5,
      viewCount: this.fileDownloadUrlLogTableTopBox.getViewCount(),
    };

    // console.log('data', data);

    this.isFileDownloadUrlLogGetting = true;

    const observable = this.ajax.post(
      environment.api.fileDownloadUrl.getFileDownloadUrlLog,
      data,
    );

    observable.subscribe(
      data => {
        this.isFileDownloadUrlLogGetting = false;

        if (data.result === 'success') {
          const list: FileDownloadUrlLogItem[] = data.list;
          this.fileDownloadUrlLogList = list;
          this.fileDownloadUrlLogTableTopBox.setTotalCount(data.totalCount);
          this.fileDownloadUrlLogListPaginationBox.setBoardCountInfo(data.getBoardCountInfo);
        } else {
          this.common.alertMessage(data);
        }
      },
      error => {
        this.isFileDownloadUrlLogGetting = false;
        this.common.alertMessage(error);
      }
    );
  } 

  ngOnChanges(): void {
    // this.checkIsShow();
  }

  checkIsShow(): void {
    if (this.isShow) {
      this.common.givePriorityContent();
    } else {
      setTimeout(() => {
        this.common.givePriorityNav();
      }, 200);
    }
  }

  closeButtonClick(): void {
    this.isShow = false;
  }

  show(fileDownloadUrlKey: string, targetYYYYMM?: string): void {
    this.common.givePriorityContent();
    this.fileDownloadUrlKey = fileDownloadUrlKey;
    this.clear();
    if (typeof targetYYYYMM === 'string') {
      this.selectedYYYYMMInfo.selectedValue = targetYYYYMM;
    }
    this.getList(1);

    setTimeout(() => {
      this.isShow = true;
    }, 100);
  }

  hide(): void {
    setTimeout(() => {
      this.common.givePriorityNav();
    }, 200);
    this.isShow = false;
  }
}
