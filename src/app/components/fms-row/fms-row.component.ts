import { Component, Input, OnInit } from '@angular/core';
import { TextAlign } from 'src/app/types/text-align.type';

@Component({
  selector: 'app-fms-row',
  templateUrl: './fms-row.component.html',
  styleUrls: ['./fms-row.component.scss']
})
export class FmsRowComponent implements OnInit {
  @Input() textAlign: TextAlign;
  @Input() display: string;
  @Input() isAlignItemsCenter: boolean;

  constructor() { 
    this.textAlign = 'right';
    this.display = 'block';
    this.isAlignItemsCenter = false;
  }

  ngOnInit(): void {

  }

}
