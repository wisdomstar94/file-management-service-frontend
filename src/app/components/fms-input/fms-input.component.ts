import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputValueInfo } from 'src/app/interfaces/input-value-info.interface';
import { InputType } from 'src/app/types/input-type.type';

@Component({
  selector: 'app-fms-input',
  templateUrl: './fms-input.component.html',
  styleUrls: ['./fms-input.component.scss']
})
export class FmsInputComponent implements OnInit {
  @Input() inputValue!: string;
  @Input() inputType!: InputType;
  @Input() disabled!: boolean;
  @Input() placeHolder: string;
  @Output() inputValueChange = new EventEmitter<string>();

  constructor() { 
    this.inputType = 'text';
    this.placeHolder = '';
  }

  ngOnInit(): void {

  }

}
