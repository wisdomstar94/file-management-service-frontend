import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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

  destination$: Observable<string[]>;

  constructor(
    private store: Store<{ destination: string[] }>,
  ) { 
    this.destination$ = this.store.select('destination');
    this.destination$.subscribe(
      data => {
        console.log(data);
      },
    );
  }

  ngOnInit(): void {

  }

}
