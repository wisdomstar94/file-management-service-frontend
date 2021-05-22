import { Component, DoCheck, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeDestination } from 'src/app/store/destination/destination.action';
import { setActiveMenuKey } from 'src/app/store/menu/menu.action';

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss']
})
export class CompanyPageComponent implements OnInit, DoCheck {

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
