import { Component, Input, OnInit } from '@angular/core';
import { SelectItem } from 'src/app/interfaces/select-item.interface';
import { SelectedInfo } from 'src/app/interfaces/selected-info.interface';
import { TableViewType } from 'src/app/types/table-view-type.type';

@Component({
  selector: 'app-table-top-box',
  templateUrl: './table-top-box.component.html',
  styleUrls: ['./table-top-box.component.scss']
})
export class TableTopBoxComponent implements OnInit {
  total: number;

  @Input() tableViewType: TableViewType = 'row';

  viewCountSelectList: SelectItem[] = [
    {
      optionUniqueID: '5',
      optionDisplayText: '5개',
      optionValue: '5',
      selected: false,
    },
    {
      optionUniqueID: '10',
      optionDisplayText: '10개',
      optionValue: '10',
      selected: true,
    },
    {
      optionUniqueID: '20',
      optionDisplayText: '20개',
      optionValue: '20',
      selected: false,
    },
    {
      optionUniqueID: '50',
      optionDisplayText: '50개',
      optionValue: '50',
      selected: false,
    },
    {
      optionUniqueID: '100',
      optionDisplayText: '100개',
      optionValue: '100',
      selected: false,
    },
  ];

  viewCountInfo: SelectedInfo = {
    selectedValue: '10',
  };

  constructor() { 
    this.total = 0;
  }

  ngOnInit(): void {
    
  }

  getViewCount(): number {
    const t = this;
    return Number(t.viewCountInfo.selectedValue);
  }
}
