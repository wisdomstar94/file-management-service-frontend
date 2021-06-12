import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-fms-textarea',
  templateUrl: './fms-textarea.component.html',
  styleUrls: ['./fms-textarea.component.scss']
})
export class FmsTextareaComponent implements OnInit {
  @Input() textareaValue!: string;
  @Input() disabled!: boolean;
  @Output() textareaValueChange = new EventEmitter<string>();

  constructor() { 

  }

  ngOnInit(): void {

  }

}
