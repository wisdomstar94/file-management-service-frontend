import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonColor } from 'src/app/types/button-color.type';

@Component({
  selector: 'app-fms-button',
  templateUrl: './fms-button.component.html',
  styleUrls: ['./fms-button.component.scss']
})
export class FmsButtonComponent implements OnInit {
  @Input() color: ButtonColor = 'basic';
  @Input() marginRight: string = '0';
  @Input() marginBottom: string = '0';
  @Output() onClick: EventEmitter<void> = new EventEmitter();

  constructor() { 

  }

  ngOnInit(): void {

  }

}
