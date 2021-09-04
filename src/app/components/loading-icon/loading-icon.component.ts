import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

const opacityAnimation = trigger('opacityAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('200ms ease-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('200ms ease-out', style({ opacity: 0 })),
  ]),
]);

@Component({
  selector: 'app-loading-icon',
  templateUrl: './loading-icon.component.html',
  styleUrls: ['./loading-icon.component.scss'],
  animations: [
    opacityAnimation,
  ],
})
export class LoadingIconComponent implements OnInit {
  @Input() isShow: boolean;

  constructor() { 
    this.isShow = false;
  }

  ngOnInit(): void {

  }

  show(): void {
    this.isShow = true;
  }

  hide(): void {
    this.isShow = false;
  }
}
