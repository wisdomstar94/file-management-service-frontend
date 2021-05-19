import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-content',
  templateUrl: './common-content.component.html',
  styleUrls: ['./common-content.component.scss']
})
export class CommonContentComponent implements OnInit {
  commonContentStyle = {
    'width': 'calc(100% - 240px)',
    'height': 'calc(100% - 50px)',
    'bottom': '0',
    'right': '0',
  };

  constructor() { 

  }

  ngOnInit(): void {
    const t = this;
    t.setSize();
  }

  onResize(): void {
    const t = this;
    t.setSize();
  }

  setSize(): void {
    const t = this;
    const windowHeight = window.innerHeight;
    const height = windowHeight - 50;
    t.commonContentStyle['height'] = height + 'px';
  }
}
