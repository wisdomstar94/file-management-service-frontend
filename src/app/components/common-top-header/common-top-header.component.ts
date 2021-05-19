import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-top-header',
  templateUrl: './common-top-header.component.html',
  styleUrls: ['./common-top-header.component.scss']
})
export class CommonTopHeaderComponent implements OnInit {
  topHeaderStyle = {
    'width': 'calc(100% - 240px)',
    'height': '50px',
    'top': '0',
    'right': '0',
  };

  constructor() { 

  }

  ngOnInit(): void {

  }

}
