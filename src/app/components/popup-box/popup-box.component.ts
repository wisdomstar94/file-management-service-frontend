import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

const popupAnimation = trigger('popupAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('200ms ease-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('200ms ease-out', style({ opacity: 0 })),
  ]),
]);

@Component({
  selector: 'app-popup-box',
  templateUrl: './popup-box.component.html',
  styleUrls: ['./popup-box.component.scss'],
  animations: [
    popupAnimation,
  ],
})
export class PopupBoxComponent implements OnInit {
  @Input() zIndex: string;
  @Input() padding: string;
  @Input() borderRadius: string;

  @Input() isShow: boolean;
  @Input() isBackgroundClickClose: boolean;

  constructor() { 
    this.zIndex = '2';
    this.padding = '20px';
    this.borderRadius = '4px';

    this.isShow = false;
    this.isBackgroundClickClose = false;
  }

  ngOnInit(): void {

  }

  show(): void {
    this.isShow = true;
  }

  hide(): void {
    this.isShow = false;
  }

  backgroundClicked(event: MouseEvent): void {
    if (this.isBackgroundClickClose === true) {
      this.hide();
    }
  }
}
