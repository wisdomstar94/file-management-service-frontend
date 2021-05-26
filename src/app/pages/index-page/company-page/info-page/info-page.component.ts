import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CompanyInfo } from 'src/app/interfaces/company-info.interface';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { changeDestination } from 'src/app/store/destination/destination.action';
import { setActiveMenuKey } from 'src/app/store/menu/menu.action';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit, DoCheck {
  companyInfo!: CompanyInfo;

  constructor(
    private store: Store<{ destination: string[], activeMenuKey: string }>,
    private route: ActivatedRoute,
    private router: Router,
    private common: CommonService,
    private ajax: AjaxService,
  ) { 
    const companyInfo: CompanyInfo = this.route.snapshot.data.companyInfo;
    // console.log('companyInfo', companyInfo);
    this.companyInfo = companyInfo;
  }

  ngOnInit(): void {

  }

  ngDoCheck(): void {
    const t = this;
    t.store.dispatch(changeDestination({ destination: ['홈', '회사관리', '회사상세정보'] }));
    t.store.dispatch(setActiveMenuKey({ menuKey: 'kmRQ1617524080387RwV' }));
  }
}
