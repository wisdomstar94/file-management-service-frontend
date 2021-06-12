import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputValueInfo } from 'src/app/interfaces/input-value-info.interface';

@Component({
  selector: 'app-fms-input',
  templateUrl: './fms-input.component.html',
  styleUrls: ['./fms-input.component.scss']
})
export class FmsInputComponent implements OnInit {
  @Input() inputValue!: string;
  @Input() disabled!: boolean;
  @Output() inputValueChange = new EventEmitter<string>();

  constructor() { 

  }

  ngOnInit(): void {

  }

}
