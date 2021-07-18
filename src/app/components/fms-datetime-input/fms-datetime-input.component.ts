import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Observable, of, Subscriber } from 'rxjs';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-fms-datetime-input',
  templateUrl: './fms-datetime-input.component.html',
  styleUrls: ['./fms-datetime-input.component.scss']
})
export class FmsDatetimeInputComponent implements OnInit, OnChanges {
  @Input() value!: string;
  valueObservable: Observable<string>;
  valueSubscriber!: Subscriber<string>;
  @Input() dateValue: string;
  @Input() timeValue: string;
  @Input() fixedSecond: string;

  @Output() valueChanged = new EventEmitter();

  constructor() { 
    this.value = ' ';
    this.valueObservable = new Observable((observer) => {
      this.valueSubscriber = observer;
    });

    this.dateValue = '';
    this.timeValue = '';
    this.fixedSecond = '00';
  }

  dataInit(): void {
    this.dateValue = '';
    this.timeValue = '';
  }

  ngOnInit(): void {
    // this.valueCheck();
    // console.log('this.value', this.value);
    // setInterval(() => {
    //   console.log('this.value', this.value);
    // }, 1000); 
  }

  ngOnChanges(): void {
    // console.log('dateValue', this.dateValue);
    // console.log('timeValue', this.timeValue);
    // console.log('this.value', this.value);
    this.valueCheck();
  }

  valueCheck(): void {
    if (this.value === undefined) {
      return;
    }

    if (!dayjs(this.value).isValid()) {
      console.error(`날짜 형식의 문자열이 아닙니다.`);
      return;
    }

    const dataSplit = this.value.split(' ');
    const date = dataSplit[0];
    const time = dataSplit[1];

    this.dateValue = date;
    this.timeValue = time;
  }

  valueChange(): void {
    // console.log([this.dateValue, this.timeValue]);
    
    let temp = '';
    if (this.timeValue.length === 8) {
      temp = this.dateValue + ' ' + this.timeValue;
    } else {
      temp = this.dateValue + ' ' + this.timeValue + ':' + this.fixedSecond;
    }

    this.value = temp;
    this.valueChanged.emit(this.value);
  }
} 
