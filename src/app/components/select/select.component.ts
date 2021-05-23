import { Component, Input, OnInit } from '@angular/core';
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

  constructor() { 
    // this.selectedValue = '';
    this.selectedInfo = {
      selectedValue: '',
    };
  }

  ngOnInit(): void {
    // console.log('..', this.selectItemList)
  }

}
