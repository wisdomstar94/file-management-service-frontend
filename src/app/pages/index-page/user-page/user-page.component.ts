import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchOptionService } from 'src/app/services/search-option.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {

  constructor(
    private searchOption: SearchOptionService,
  ) { 

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.searchOption.searchOption.userSearchItemList = [];
  }
}
