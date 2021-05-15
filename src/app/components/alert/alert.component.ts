import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';


const alertAnimation = trigger('alertAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('200ms ease-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('200ms ease-out', style({ opacity: 0 })),
  ]),
]);


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    alertAnimation,
  ]
})
export class AlertComponent implements OnInit {
  @Output() onInit = new EventEmitter();

  isShow = false;

  isCancelButtonShow = true;
  isConfirmButtonShow = true;

  title = '';
  message = '';

  cancelCallback!: (() => void) | undefined;
  confirmCallback!: (() => void) | undefined;

  events = { 
    cancelButtonClick: () => {
      const t = this;

      if (t.cancelCallback !== undefined) {
        t.cancelCallback();
        return;
      }

      t.hide();
    },
    confirmButtonClick: () => {
      const t = this;
      
      if (t.confirmCallback !== undefined) {
        t.confirmCallback();
        return;
      }

      t.hide();
    },
  };

  constructor() { 

  }

  ngOnInit(): void {
    const t = this;
    t.onInit.emit(t);
  }




  setDefault(): AlertComponent {
    const t = this;

    t.setTitle('안내');
    t.setMessage('');
    t.clearCancelCallback();
    t.clearConfirmCallback();
    t.setCancelButton(false);
    t.setConfirmButton(true);

    return t;
  }



  setTitle(v: string): AlertComponent {
    const t = this;
    t.title = v;
    return t;
  }

  clearTitle(): AlertComponent {
    const t = this;
    t.title = '';
    return t;
  }



  setMessage(v: string): AlertComponent {
    const t = this;
    t.message = v;
    return t;
  }

  clearMessage(): AlertComponent {
    const t = this;
    t.message = '';
    return t;
  }




  setCancelCallback(v: () => void): AlertComponent {
    const t = this;
    t.cancelCallback = v;
    return t;
  }

  clearCancelCallback(): AlertComponent {
    const t = this;
    t.cancelCallback = undefined;
    return t;
  }




  setConfirmCallback(v: () => void): AlertComponent {
    const t = this;
    t.confirmCallback = v;
    return t;
  }

  clearConfirmCallback(): AlertComponent {
    const t = this;
    t.confirmCallback = undefined;
    return t;
  }




  setCancelButton(v: boolean): AlertComponent {
    const t = this;
    t.isCancelButtonShow = v;
    return t;
  }

  setConfirmButton(v: boolean): AlertComponent {
    const t = this;
    t.isConfirmButtonShow = v;
    return t;
  }



  show(): void {
    const t = this;
    t.isShow = true;
  }

  hide(): void {
    const t = this;
    t.isShow = false;
  }
}
