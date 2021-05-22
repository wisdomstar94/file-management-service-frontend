import { Component, DoCheck, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SearchItem } from 'src/app/interfaces/search-item.interface';
import { changeDestination } from 'src/app/store/destination/destination.action';
import { setActiveMenuKey } from 'src/app/store/menu/menu.action';

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss']
})
export class CompanyPageComponent implements OnInit, DoCheck {
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
      itemTitle: '회사 연락처',
      currentValue: '6',
    },
    {
      uniqueID: 'companyCreateDatetime',
      searchType: 'datetime',
      itemTitle: '등록일',
      startDatetime: '2021-05-01',
      endDatetime: '2021-05-22',
    },
  ];

  constructor(
    private store: Store<{ destination: string[], activeMenuKey: string }>,
  ) { 

  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    const t = this;
    t.store.dispatch(changeDestination({ destination: ['홈', '회사관리'] }));
    t.store.dispatch(setActiveMenuKey({ menuKey: 'kmRQ1617524080387RwV' }));
  }
}
