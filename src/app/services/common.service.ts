import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AlertComponent } from '../components/alert/alert.component';
import { CommonComponent } from '../interfaces/common-component';
import { NavMenuItem } from '../interfaces/nav-menu-item';
import { ResponseData } from '../interfaces/response-data';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  components: CommonComponent = {
    alert: null,
  };

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) { 

  }

  alertMessage(res: ResponseData): void {
    const t = this;

    let msg = `- 응답코드 : ${res.code}\n`;
    msg += `- 응답메시지 : ${res.msg}`;

    t.getAlertComponent()
      ?.setDefault()
      .setTitle('안내')
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

  // --- //

  getResolveData(): any {
    const t = this;
    return t.route.snapshot.data;
  }

  transform(html: string) {
    if (typeof html !== 'string') {
      return '';
    }

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  checkFileSize(fileSize: number) {
    const t = this;

    if (fileSize < 1.0486e+9) {
      return {
        division: 1048576,
        unit: 'MB',
      };
    } else {
      return {
        division: 1.0486e+9,
        unit: 'GB',
      };
    }
  }
}
