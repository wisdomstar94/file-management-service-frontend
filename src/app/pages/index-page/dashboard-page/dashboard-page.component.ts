import { Component, DoCheck, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AjaxService } from 'src/app/services/ajax.service';
import { changeDestination } from 'src/app/store/destination/destination.action';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, DoCheck {

  constructor(
    private store: Store<{ destination: string[] }>,
  ) { 

  }

  ngOnInit(): void {
    const t = this;
  }

  ngDoCheck(): void {
    const t = this;
    t.store.dispatch(changeDestination({ destination: ['홈', '대시보드'] }));
  }
}
