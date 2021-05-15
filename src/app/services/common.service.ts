import { Injectable } from '@angular/core';
import { AlertComponent } from '../components/alert/alert.component';
import { CommonComponent } from '../interfaces/common-component';
import { ResponseData } from '../interfaces/response-data';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  components: CommonComponent = {
    alert: null,
  };

  constructor() { 

  }



  alertMessage(res: ResponseData): void {
    const t = this;

    let msg = `- 응답코드 : ${res.code}\n`;
    msg += `- 응답메시지 : ${res.msg}`;

    t.getAlertComponent()
      ?.setTitle('안내')
      .setMessage(msg)
      .setCancelButton(false)
      .clearCancelCallback()
      .setConfirmButton(true)
      .clearConfirmCallback()
      .show();
  }

  


  setAlertComponent(v: AlertComponent): void {
    const t = this;
    t.components.alert = v;
  }

  getAlertComponent(): AlertComponent | null {
    const t = this;
    return t.components.alert;
  }


}
