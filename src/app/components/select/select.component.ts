import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'src/app/interfaces/select-item.interface';
import { SelectedInfo } from 'src/app/interfaces/selected-info.interface';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() selectItemList: SelectItem[] = [];
  @Input() selectedInfo: SelectedInfo;
  @Output() valueChanged = new EventEmitter();

  constructor() { 
    // this.selectedValue = '';
    this.selectedInfo = {
      selectedValue: '',
    };
  }

  ngOnInit(): void {
    // console.log('..', this.selectItemList)
  }

  ngModelChanged(): void {
    this.valueChanged.emit(this.selectedInfo.selectedValue);
  }
}
