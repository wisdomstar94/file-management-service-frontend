import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NavMenuItem } from 'src/app/interfaces/nav-menu-item';
import { CommonService } from 'src/app/services/common.service';
import { changeDestination } from 'src/app/store/destination/destination.action';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit, DoCheck {

  constructor(
    private store: Store<{ destination: string[] }>,
    private common: CommonService,
    private router: Router,
    private route: ActivatedRoute,
  ) { 

  }

  ngOnInit(): void {
    const t = this;
  }

  ngDoCheck(): void {
    const t = this;
    t.store.dispatch(changeDestination({ destination: ['홈'] }));
  }

  testButton(): void {
    const t = this;
    t.router.navigate(['dashboard']);
  }
}
