import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavMenuItem } from 'src/app/interfaces/nav-menu-item';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {

  constructor(
    private common: CommonService,
    private router: Router,
    private route: ActivatedRoute,
  ) { 

  }

  ngOnInit(): void {
    const t = this;
  }

  testButton(): void {
    const t = this;
    t.router.navigate(['dashboard']);
  }
}
