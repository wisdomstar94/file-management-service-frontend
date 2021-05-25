import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { SearchBoxComponent } from 'src/app/components/search-box/search-box.component';
import { TableTopBoxComponent } from 'src/app/components/table-top-box/table-top-box.component';
import { CodeItem } from 'src/app/interfaces/code-item.interface';
import { CompanyItem } from 'src/app/interfaces/company-item.interface';
import { SearchItem } from 'src/app/interfaces/search-item.interface';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { changeDestination } from 'src/app/store/destination/destination.action';
import { setActiveMenuKey } from 'src/app/store/menu/menu.action';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss']
})
export class CompanyPageComponent implements OnInit, DoCheck {
  @ViewChild('companySearchBox') companySearchBox: SearchBoxComponent | undefined;
  @ViewChild('companyTableTopBox') companyTableTopBox: TableTopBoxComponent | undefined;

  searchItemList: SearchItem[] = [
    {
      uniqueID: 'companyName',
      searchType: 'text',
      itemTitle: '회사명',
      currentValue: '1',
    },
    {
      searchType: 'text',
      uniqueID: 'businessNumber',
      itemTitle: '사업자번호',
      currentValue: '2',
    },
    {
      uniqueID: 'companyAddress',
      searchType: 'text',
      itemTitle: '사업장주소',
      currentValue: '3',
    },
    {
      uniqueID: 'leaderName',
      searchType: 'text',
      itemTitle: '대표자명',
      currentValue: '4',
    },
    {
      uniqueID: 'leaderTel',
      searchType: 'text',
      itemTitle: '대표자 연락처',
      currentValue: '5',
    },
    {
      uniqueID: 'companyTel',
      searchType: 'text',
      itemTitle: '회사 전화번호',
      currentValue: '6',
    },
    {
      uniqueID: 'companyCreateDatetime',
      searchType: 'datetime',
      itemTitle: '등록일',
      startDatetime: '2021-05-01',
      endDatetime: '2021-05-22',
    },
    {
      uniqueID: 'companyStatus',
      searchType: 'checkbox',
      itemTitle: '상태',
      checkboxItemList: [],
    },
  ];

  isCompanyListAllCheck: boolean;
  companyList: CompanyItem[] = [];

  isCompanyListGetting = false;

  constructor(
    private store: Store<{ destination: string[], activeMenuKey: string }>,
    private route: ActivatedRoute,
    private common: CommonService,
    private ajax: AjaxService,
  ) { 
    const statusCodeList: CodeItem[] = this.route.snapshot.data.CompanyStatusCode;
    const companyStatusSearchItem = this.common.getSearchItem(this.searchItemList, 'companyStatus');
    if (companyStatusSearchItem !== undefined) {
      companyStatusSearchItem.checkboxItemList = statusCodeList.map((x) => {
        return {
          uniqueID: x.code,
          checkboxValue: x.code,
          labelText: x.codeName,
          checked: false,
        };
      });
    }
    
    this.isCompanyListAllCheck = false;
  }

  ngOnInit(): void {

  }

  ngDoCheck(): void {
    const t = this;
    t.store.dispatch(changeDestination({ destination: ['홈', '회사관리'] }));
    t.store.dispatch(setActiveMenuKey({ menuKey: 'kmRQ1617524080387RwV' }));
  }

  clearSearchItem(): void {
    const t = this;
    t.companySearchBox?.clearSearchItem();
  }

  companyListAllCheckChanged(): void {
    const t = this;

    // console.log('this.isCompanyListAllCheck', this.isCompanyListAllCheck);

    if (this.isCompanyListAllCheck === true) {
      for (const item of t.companyList) {
        item.isChecked = true;
      }
    } else {
      for (const item of t.companyList) {
        item.isChecked = false;
      }
    }
  }

  getList(page: number): void {
    const t = this;
    
    if (t.isCompanyListGetting === true) {
      t.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('목록을 가져오는 중입니다. 잠시만 기다려주세요.')
        .show();
      return;
    }

    const forms = {
      companyName: t.searchItemList.filter((x) => { if (x.uniqueID === 'companyName') { return x; } else { return; } })[0].currentValue,
      businessNumber: t.searchItemList.filter((x) => { if (x.uniqueID === 'businessNumber') { return x; } else { return; } })[0].currentValue,
      companyAddress: t.searchItemList.filter((x) => { if (x.uniqueID === 'companyAddress') { return x; } else { return; } })[0].currentValue,
      leaderName: t.searchItemList.filter((x) => { if (x.uniqueID === 'leaderName') { return x; } else { return; } })[0].currentValue,
      leaderTel: t.searchItemList.filter((x) => { if (x.uniqueID === 'leaderTel') { return x; } else { return; } })[0].currentValue,
      companyTel: t.searchItemList.filter((x) => { if (x.uniqueID === 'companyTel') { return x; } else { return; } })[0].currentValue,
      createdAtStart: t.searchItemList.filter((x) => { if (x.uniqueID === 'companyCreateDatetime') { return x; } else { return; } })[0].startDatetime,
      createdAtEnd: t.searchItemList.filter((x) => { if (x.uniqueID === 'companyCreateDatetime') { return x; } else { return; } })[0].endDatetime,
      companyStatus: t.searchItemList.filter((x) => { if (x.uniqueID === 'companyStatus') { return x; } else { return; } })[0].checkboxItemList?.filter((x) => { if (x.checked === true) { return x.checkboxValue; } else { return; } }).map((x) => { return x.checkboxValue; }),
    };

    // console.log('forms', forms);

    const data = {
      companyName: forms.companyName,
      businessNumber: forms.businessNumber,
      companyAddress: forms.companyAddress,
      leaderName: forms.leaderName,
      leaderTel: forms.leaderTel,
      companyTel: forms.companyTel,
      createdAtStart: forms.createdAtStart,
      createdAtEnd: forms.createdAtEnd,
      companyStatus: forms.companyStatus,

      page: page,
      pageViewCount: 10,
      viewCount: t.companyTableTopBox?.getViewCount(),
    };

    // console.log('data', data);

    t.isCompanyListGetting = true;

    const observable = t.ajax.post(
      environment.api.company.getCompany,
      data,
    );

    observable.subscribe(
      data => {
        t.isCompanyListGetting = false;
        const list: CompanyItem[] = data.list;
        t.companyList = list;
      },
      error => {
        t.isCompanyListGetting = false;

      }
    );
  }
}
