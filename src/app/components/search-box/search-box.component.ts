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

  getValue(searchItemUniqueID: string): any {
    const t = this;
    let targetItem: SearchItem | undefined;
    for (const item of t.searchItemList) {
      if (item.uniqueID === searchItemUniqueID) {
        targetItem = item;
        break;
      }
    }

    if (targetItem === undefined) {
      console.error('not find id');
      throw new Error('not find id');
    }

    switch (targetItem.searchType) {
      case 'text':
        return targetItem.currentValue;
      case 'datetime':
        return {
          startDatetime: targetItem.startDatetime,
          endDatetime: targetItem.endDatetime,
        };
      case 'checkbox':
        const checkedItems: string[] = [];
        for (const checkboxItem of targetItem.checkboxItemList!) {
          if (checkboxItem.checked === true) {
            checkedItems.push(checkboxItem.checkboxValue);
          }
        }
        return checkedItems;
        
    }
  }

  clearSearchItem(): void {
    const t = this;

    for (const item of t.searchItemList) {
      switch (item.searchType) {
        case 'text': item.currentValue = ''; break;
        case 'datetime': item.startDatetime = ''; item.endDatetime = ''; break;
        case 'checkbox': item.checkboxItemList?.filter((x) => { x.checked = false; return; }); break;
      }
    }
  }
}
