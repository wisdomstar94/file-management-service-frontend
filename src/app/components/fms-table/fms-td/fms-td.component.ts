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

  constructor() { 
    this.columnName = '';
    this.tableViewType = 'row';
  }

  ngOnInit(): void {
  }

}
