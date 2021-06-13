import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {
  userInfo!: UserInfo;

  constructor(
    private store: Store<{ destination: string[], activeMenuKey: string }>,
    private route: ActivatedRoute,
    private router: Router,
    private common: CommonService,
    private ajax: AjaxService,
  ) { 
    this.userInfo = this.route.snapshot.data.userInfo;
  }

  ngOnInit(): void {

  }

  goList(): void {
    this.router.navigate(['user']);
  }

  userInfoEditButtonClick(): void {
    
  }
}
