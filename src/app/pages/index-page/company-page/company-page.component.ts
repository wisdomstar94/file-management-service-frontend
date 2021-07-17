import { Component, DoCheck, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SearchOptionService } from 'src/app/services/search-option.service';

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss'],
})
export class CompanyPageComponent implements OnInit, DoCheck, OnDestroy {
  constructor(
    private searchOption: SearchOptionService,
  ) { 
    
  }

  ngOnInit(): void {

  }

  ngDoCheck(): void {
    
  }

  ngOnDestroy(): void {
    this.searchOption.searchOption.companySearchItemList = [];
  }
} 
