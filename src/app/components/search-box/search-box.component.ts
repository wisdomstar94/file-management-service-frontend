import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchItem } from 'src/app/interfaces/search-item.interface';
import { SelectItem } from 'src/app/interfaces/select-item.interface';
import { CommonService } from 'src/app/services/common.service';
import * as dayjs from 'dayjs';
import { Store } from '@ngrx/store';
import { DeviceMode } from 'src/app/types/device-mode.type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  @Output() onEnter = new EventEmitter();

  @Input() searchItemList: SearchItem[] = [];
  @Input() isRightButtonShow: boolean;

  years: string[] = [];
  yearSelectItems: SelectItem[];

  months: string[] = [];
  monthSelectItems: SelectItem[];

  deviceMode: DeviceMode;
  deviceMode$: Observable<DeviceMode>;

  constructor(
    private common: CommonService,
    private store: Store<{ deviceMode: DeviceMode }>,
  ) { 
    this.isRightButtonShow = true;

    const token1 = this.common.getUniqueToken(20);
    for (let i = 2021; i <= 2099; i++) {
      this.years.push(i.toString());
    }
    this.yearSelectItems = this.years.map((x) => {
      return {
        optionUniqueID: token1 + '_' + x, 
        optionValue: x, 
        optionDisplayText: x + '년', 
        selected: false,
      };
    });

    const token2 = this.common.getUniqueToken(20);
    for (let i = 1; i <= 12; i++) {
      this.months.push(i.toString());
    }
    this.monthSelectItems = this.months.map((x) => {
      return {
        optionUniqueID: token2 + '_' + x, 
        optionValue: this.common.fillZero(Number(x), 2), 
        optionDisplayText: x + '월', 
        selected: false,
      };
    });
    // this.yearSelectItems =


    this.deviceMode = 'pc';
    this.deviceMode$ = this.store.select('deviceMode');
    this.deviceMode$.subscribe(
      data => {
        this.deviceMode = data as DeviceMode;
        if (this.deviceMode === 'pc') {

        } else {
          
        }
      }
    );
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
        case 'one-datetime': item.oneDatetime = ''; break;
        case 'checkbox': item.checkboxItemList?.filter((x) => { x.checked = false; return; }); break;
        case 'number': item.startNumber = '' as any; item.endNumber = '' as any; break;
        case 'year-month': item.startYear = ''; item.startMonth = ''; item.endYear = ''; item.endMonth = ''; item.endLastDate = ''; break;
        case 'select':  
          item.currentValue = '';
          if (Array.isArray(item.selectItems)) {
            const firstValue = item.selectItems[0].optionValue;
            item.currentValue = firstValue;
          }
          break;
      }
    }
  }

  searchFormKeyPress(event: KeyboardEvent): void {
    // console.log('event', event);
    if (event.key === 'Enter') {
      this.onEnter.emit();
    }
  }

  getSearchItem(uniqueID: string): SearchItem | null {
    for (const item of this.searchItemList) {
      if (item.uniqueID === uniqueID) {
        return item;
      }
    }

    return null;
  }

  endChanged(item: SearchItem): void {
    const year = item.endYear;
    const month = item.endMonth;
    const date = '01';

    const lastDate = this.common.getLastDate(dayjs(year + '-' + month + date));
    item.endLastDate = lastDate;
  }
}
