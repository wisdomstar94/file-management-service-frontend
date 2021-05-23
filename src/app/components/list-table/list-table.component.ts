import { Component, Input, OnInit } from '@angular/core';
import { ColumnDataItem } from 'src/app/interfaces/column-data-item.interface';
import { ColumnItem } from 'src/app/interfaces/column-item.interface';
import { SelectItem } from 'src/app/interfaces/select-item.interface';
import { SelectedInfo } from 'src/app/interfaces/selected-info.interface';
import { TableViewType } from 'src/app/types/table-view-type.type';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss']
})
export class ListTableComponent implements OnInit {
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

  @Input() columnList: ColumnItem[] = [];
  @Input() columnValueList: ColumnDataItem[][] = [];

  constructor() { 
    this.total = 0;
  }

  ngOnInit(): void {

  }

  getViewCount(): number {
    const t = this;
    return Number(t.viewCountInfo.selectedValue);
  }

  getColumnValue(columnIndex: number, columnValues: ColumnDataItem[]): any {
    const t = this;

    // console.log('columnValues', columnValues);

    // console.log('columnValueList', t.columnValueList);

    const columnVariable = t.columnList[columnIndex].columnVariable;

    const target: ColumnDataItem = columnValues.filter((x) => {
      if (x.columnVariable === columnVariable) {
        return x;
      } else {
        return;
      }
    })[0];

    if (target === undefined) {
      return '';
    }

    // console.log('target', target);
    if (typeof target.columnValue === 'object') {
      return target.columnValue.codeName;
    }

    return target.columnValue;
  }
}
