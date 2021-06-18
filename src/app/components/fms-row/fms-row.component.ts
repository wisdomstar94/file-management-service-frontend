import { Component, Input, OnInit } from '@angular/core';
import { TextAlign } from 'src/app/types/text-align.type';

@Component({
  selector: 'app-fms-row',
  templateUrl: './fms-row.component.html',
  styleUrls: ['./fms-row.component.scss']
})
export class FmsRowComponent implements OnInit {
  @Input() textAlign: TextAlign;

  constructor() { 
    this.textAlign = 'right';
  }

  ngOnInit(): void {

  }

}
