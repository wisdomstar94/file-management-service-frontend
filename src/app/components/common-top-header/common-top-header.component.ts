import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginInfo } from 'src/app/interfaces/login-info.interface';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { navOpen } from 'src/app/store/common-nav/common-nav.action';
import { DeviceMode } from 'src/app/types/device-mode.type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-common-top-header',
  templateUrl: './common-top-header.component.html',
  styleUrls: ['./common-top-header.component.scss']
})
export class CommonTopHeaderComponent implements OnInit {
  @Input() zIndex: number = 1;
  // topHeaderStyle = {
  //   'width': 'calc(100% - 240px)',
  //   'height': '50px',
  //   'display': 'block',
  //   'top': '0',
  //   'right': '0',
  //   'position': 'relative',
  //   'z-index': this.zIndex,
  // };
  topHeaderStyleWidth: string;
  topHeaderStyleDisplay: string;
  topHeaderStylePosition: string;

  destination$: Observable<string[]>;

  appTitle$: Observable<string>;

  deviceMode$: Observable<DeviceMode>;
  deviceMode: DeviceMode = 'pc';

  navWidth$: Observable<string>;
  navWidth = '';

  loginInfo: LoginInfo;

  isLogouting = false;

  constructor(
    private store: Store<{ destination: string[], appTitle: string, deviceMode: DeviceMode, navWidth: string }>,
    private route: ActivatedRoute,
    private router: Router,
    private common: CommonService,
    private ajax: AjaxService,
  ) {
    const t = this;

    this.topHeaderStyleWidth = 'calc(100% - 240px)';
    this.topHeaderStyleDisplay = 'block';
    this.topHeaderStylePosition = 'relative';

    this.destination$ = this.store.select('destination');
    this.destination$.subscribe(
      data => {

      },
    );

    this.appTitle$ = this.store.select('appTitle');

    this.deviceMode$ = this.store.select('deviceMode');
    this.deviceMode$.subscribe(
      data => {
        t.deviceMode = data;
        t.setDeviceStyle(t.deviceMode);
      }
    );

    this.navWidth$ = this.store.select('navWidth');
    this.navWidth$.subscribe(
      data => {
        t.navWidth = data;
        if (t.deviceMode === 'pc') {
          t.topHeaderStyleWidth = `calc(100% - ${t.navWidth})`;
        }
      }
    );

    this.loginInfo = this.route.snapshot.data.LoginInfo;
  }

  ngOnInit(): void {
    this.common.setCommonTopHeaderComponent(this);
  }

  setDeviceStyle(deviceMode: DeviceMode): void {
    const t = this;

    // const windowWidth = window.innerWidth;
    // const windowHeight = window.innerHeight;

    if (deviceMode === 'mobile') {
      t.topHeaderStyleWidth = '100%';
      t.topHeaderStyleDisplay = 'flex';
      t.topHeaderStylePosition = 'relative';
    } else {
      t.topHeaderStyleWidth = 'calc(100% - 240px)';
      t.topHeaderStyleDisplay = 'block';
      t.topHeaderStylePosition = 'fixed';
    }
  }

  mobileNavToggleButtonClick(): void {
    const t = this;
    t.store.dispatch(navOpen());
  }

  logoutButtonClick(): void {
    const t = this;

    if (t.isLogouting) {
      return;
    }

    const alertComponent = t.common.getAlertComponent();
    alertComponent
      ?.setDefault()
      .setTitle('로그아웃')
      .setMessage('로그아웃 하시겠습니까?')
      .setCancelButton(true)
      .setConfirmCallback(() => {
        t.isLogouting = true;

        const myObservable = t.ajax.post(
          environment.api.user.logout,
          {  }
        );
        myObservable.subscribe(
          data => {
            t.isLogouting = false;

            if (data instanceof HttpErrorResponse) {
              t.common.alertMessage(data.error);
              return;
            }

            alertComponent.hide();
            t.router.navigate(['login']);
          },
        )
      })
      .show();
  }
}
