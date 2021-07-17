import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchOptionService } from 'src/app/services/search-option.service';

@Component({
  selector: 'app-file-page',
  templateUrl: './file-page.component.html',
  styleUrls: ['./file-page.component.scss']
})
export class FilePageComponent implements OnInit, OnDestroy {

  constructor(
    private searchOption: SearchOptionService,
  ) { 
    
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.searchOption.searchOption.fileSearchItemList = [];
  }
}
