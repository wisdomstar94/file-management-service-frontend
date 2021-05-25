import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BoardCountInfo } from 'src/app/interfaces/board-count-info.interface';

@Component({
  selector: 'app-pagination-box',
  templateUrl: './pagination-box.component.html',
  styleUrls: ['./pagination-box.component.scss']
})
export class PaginationBoxComponent implements OnInit {
  boardCountInfo!: BoardCountInfo;
  @Output() pageClicked = new EventEmitter();

  constructor() { 
    
  }

  ngOnInit(): void {

  }

  setBoardCountInfo(v: BoardCountInfo): void {
    this.boardCountInfo = v;
  }

  paginationItemClick(page: number): void {
    this.pageClicked.emit(page);
  }
}
