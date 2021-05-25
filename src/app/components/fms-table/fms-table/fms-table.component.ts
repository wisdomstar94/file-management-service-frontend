import { Component, Input, OnInit } from '@angular/core';
import { TableViewType } from 'src/app/types/table-view-type.type';

@Component({
  selector: 'app-fms-table',
  templateUrl: './fms-table.component.html',
  styleUrls: ['./fms-table.component.scss']
})
export class FmsTableComponent implements OnInit {
  @Input() tableViewType: TableViewType;

  constructor() { 
    this.tableViewType = 'row';
  }

  ngOnInit(): void {
    
  }

}
