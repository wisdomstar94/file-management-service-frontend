import { Component, Input, OnInit } from '@angular/core';
import { SearchItem } from 'src/app/interfaces/search-item.interface';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  @Input() searchItemList: SearchItem[] = [];

  constructor() { 

  }

  ngOnInit(): void {

  }

}
