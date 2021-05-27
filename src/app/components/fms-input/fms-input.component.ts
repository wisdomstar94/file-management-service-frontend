import { Component, Input, OnInit } from '@angular/core';
import { InputValueInfo } from 'src/app/interfaces/input-value-info.interface';

@Component({
  selector: 'app-fms-input',
  templateUrl: './fms-input.component.html',
  styleUrls: ['./fms-input.component.scss']
})
export class FmsInputComponent implements OnInit {
  @Input() inputValueInfo!: InputValueInfo;

  constructor() { 

  }

  ngOnInit(): void {

  }

}
