import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-fms-link',
  templateUrl: './fms-link.component.html',
  styleUrls: ['./fms-link.component.scss']
})
export class FmsLinkComponent implements OnInit {
  @Output() onClick = new EventEmitter();

  constructor() { 

  }

  ngOnInit(): void {

  }

  linkClicked(): void {
    this.onClick.emit();
  }
}
