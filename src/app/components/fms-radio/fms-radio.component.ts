import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RadioItem } from 'src/app/interfaces/radio-item.interface';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-fms-radio',
  templateUrl: './fms-radio.component.html',
  styleUrls: ['./fms-radio.component.scss']
})
export class FmsRadioComponent implements OnInit {
  @Input() radioName: string = '';
  @Input() radioItems: RadioItem[] = [];
  @Input() checkedValue: string = '';
  @Output() valueChanged = new EventEmitter();

  constructor(
    private common: CommonService,
  ) { 
    this.radioName = this.common.getUniqueToken(20);
  }

  ngOnInit(): void {

  }

  radioCheckedValueChanged(e: string): void {
    this.checkedValue = e;
    this.valueChanged.emit(e);
  }

  setValue(v: string): void {
    this.checkedValue = v;
  }

  getValue(): string {
    return this.checkedValue;
  }
}
