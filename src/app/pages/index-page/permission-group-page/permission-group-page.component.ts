import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchOptionService } from 'src/app/services/search-option.service';

@Component({
  selector: 'app-permission-group-page',
  templateUrl: './permission-group-page.component.html',
  styleUrls: ['./permission-group-page.component.scss']
})
export class PermissionGroupPageComponent implements OnInit, OnDestroy {

  constructor(
    private searchOption: SearchOptionService,
  ) { 

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.searchOption.searchOption.permissionGroupSearchItemList = [];
  }
}
