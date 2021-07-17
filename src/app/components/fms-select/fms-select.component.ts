import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'src/app/interfaces/select-item.interface';

@Component({
  selector: 'app-fms-select',
  templateUrl: './fms-select.component.html',
  styleUrls: ['./fms-select.component.scss']
})
export class FmsSelectComponent implements OnInit {
  @Input() selectItems!: SelectItem[];
  @Input() selectedValue!: string;
  @Input() disabled!: boolean;
  @Input() width: string;
  @Output() valueChanged = new EventEmitter<string>();

  constructor() { 
    this.width = '100%';
  }

  ngOnInit(): void {

  }

}
