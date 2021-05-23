import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonColor } from 'src/app/types/button-color.type';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() color: ButtonColor = 'basic';
  @Input() marginRight: string = '0';
  @Output() onClick: EventEmitter<void> = new EventEmitter();

  constructor() { 

  }

  ngOnInit(): void {

  }

}
