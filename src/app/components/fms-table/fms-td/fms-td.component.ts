import { Component, Input, OnInit } from '@angular/core';
import { TableViewType } from 'src/app/types/table-view-type.type';

@Component({
  selector: 'app-fms-td',
  templateUrl: './fms-td.component.html',
  styleUrls: ['./fms-td.component.scss']
})
export class FmsTdComponent implements OnInit {
  @Input() columnName: string;
  @Input() tableViewType: TableViewType;
  @Input() contentWidth: string;

  constructor() { 
    this.columnName = '';
    this.tableViewType = 'row';
    this.contentWidth = 'auto';
  }

  ngOnInit(): void {
  }

}
