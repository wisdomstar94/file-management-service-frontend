import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AlertComponent } from '../components/alert/alert.component';
import { CommonComponent } from '../interfaces/common-componen.interfacet';
import { NavMenuItem } from '../interfaces/nav-menu-item.interface';
import { ResponseData } from '../interfaces/response-data.interface';
import { SearchItem } from '../interfaces/search-item.interface';

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

  getSearchItem(searchItemList: SearchItem[], searchItemUniqueID: string): SearchItem {
    const t = this;
    let targetItem: SearchItem | undefined;
    for (const item of searchItemList) {
      if (item.uniqueID === searchItemUniqueID) {
        targetItem = item;
        break;
      }
    }

    if (targetItem === undefined) {
      console.error('not find id');
      throw new Error('not find id');
    }

    return targetItem;
  }

  getRandomNumber(min: number, max: number): number {
    const ranNum = Math.floor(Math.random()*(max-min+1)) + min;
    return ranNum;
  }

  getRandomString(strLength: number): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < strLength; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  getUniqueToken(strLength: number): string {
    const timestamp = new Date().getTime();
    const timestamp_length = timestamp.toString().length;
    const str_max_length = strLength - timestamp_length;
    const first_length = this.getRandomNumber(1, str_max_length);
    const second_length = str_max_length - first_length;
    const token = ''.concat(
      this.getRandomString(first_length),
      new Date().getTime().toString(),
      this.getRandomString(second_length),
    );
    return token;
  }
}
