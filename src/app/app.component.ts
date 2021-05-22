import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { AlertComponent } from './components/alert/alert.component';
import { CommonService } from './services/common.service';
import { setMobile, setPC } from './store/device-mode/device-mode.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '파일 관리 서비스';

  constructor(
    private common: CommonService,
    private store: Store<{ mobileMode: boolean }>,
  ) {

  }

  ngOnInit(): void {
    const t = this;
    t.checkSize();
  }

  onResized(): void {
    const t = this;
    t.checkSize();
  }

  checkSize(): void {
    const t = this;

    const windowWidth = window.innerWidth;

    if (windowWidth <= environment.mobileBaseWidth) {
      t.store.dispatch(setMobile());
    } else {
      t.store.dispatch(setPC());
    }
  }

  childComponentNgOnInited(component: any): void {
    const t = this;

    if (component instanceof AlertComponent) {
      t.common.setAlertComponent(component);
    }
  }
}
