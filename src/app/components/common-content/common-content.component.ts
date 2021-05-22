import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeviceMode } from 'src/app/types/device-mode.type';
import { NavMode } from 'src/app/types/nav-mode.type';

@Component({
  selector: 'app-common-content',
  templateUrl: './common-content.component.html',
  styleUrls: ['./common-content.component.scss']
})
export class CommonContentComponent implements OnInit {
  commonContentStyle = {
    'width': 'calc(100% - 240px)',
    'height': 'calc(100% - 50px)',
    'bottom': '0',
    'right': '0',
  };

  deviceMode$: Observable<DeviceMode>;

  navWidth$: Observable<string>;

  navMode$: Observable<NavMode>;

  commonContentClass = {
    'mobile': false,
  };

  constructor(
    private store: Store<{ deviceMode: DeviceMode, navWidth: string, navMode: NavMode }>,
  ) { 
    const t = this;

    this.deviceMode$ = this.store.select('deviceMode');
    this.deviceMode$.subscribe(
      data => {
        if (data === 'mobile') {
          // mobile
          setTimeout(() => {
            t.commonContentClass['mobile'] = true;
            t.commonContentStyle['width'] = '100%';
          });
        } else {
          // pc
          t.commonContentClass['mobile'] = false;
          t.commonContentStyle['width'] = 'calc(100% - 240px)';
        }
      }
    );

    this.navMode$ = this.store.select('navMode');
    this.navMode$.subscribe(
      data => {
        if (data === 'minimal') {
          // minimal
          t.commonContentStyle['width'] = 'calc(100% - 50px)';
        } else {
          // basic
          t.commonContentStyle['width'] = 'calc(100% - 240px)';
        }
      }
    );

    this.navWidth$ = this.store.select('navWidth');
  }

  ngOnInit(): void {
    const t = this;
    t.setSize();
  }

  onResize(): void {
    const t = this;
    t.setSize();
  }

  setSize(): void {
    const t = this;
    const windowHeight = window.innerHeight;
    const height = windowHeight - 50;
    t.commonContentStyle['height'] = height + 'px';
  }
}
