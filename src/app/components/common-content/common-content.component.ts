import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { DeviceMode } from 'src/app/types/device-mode.type';
import { NavMode } from 'src/app/types/nav-mode.type';

@Component({
  selector: 'app-common-content',
  templateUrl: './common-content.component.html',
  styleUrls: ['./common-content.component.scss']
})
export class CommonContentComponent implements OnInit {
  @Input() zIndex: number = 1;
  // commonContentStyle = {
  //   'width': 'calc(100% - 240px)',
  //   'height': 'calc(100% - 50px)',
  //   'bottom': '0',
  //   'right': '0',
  //   'z-index': this.zIndex,
  // };
  commonContentWidth: string;
  commonContentHeight: string;

  deviceMode$: Observable<DeviceMode>;

  navWidth$: Observable<string>;

  navMode$: Observable<NavMode>;

  commonContentClass = {
    'mobile': false,
  };

  constructor(
    private store: Store<{ deviceMode: DeviceMode, navWidth: string, navMode: NavMode }>,
    private common: CommonService,
  ) { 
    const t = this;

    this.commonContentWidth = 'calc(100% - 240px)';
    this.commonContentHeight = 'calc(100% - 50px)';

    this.deviceMode$ = this.store.select('deviceMode');
    this.deviceMode$.subscribe(
      data => {
        if (data === 'mobile') {
          // mobile
          setTimeout(() => {
            t.commonContentClass['mobile'] = true;
            t.commonContentWidth = '100%';
          });
        } else {
          // pc
          t.commonContentClass['mobile'] = false;
          t.commonContentWidth = 'calc(100% - 240px)';
        }
      }
    );

    this.navMode$ = this.store.select('navMode');
    this.navMode$.subscribe(
      data => {
        if (data === 'minimal') {
          // minimal
          t.commonContentWidth = 'calc(100% - 50px)';
        } else {
          // basic
          t.commonContentWidth = 'calc(100% - 240px)';
        }
      }
    );

    this.navWidth$ = this.store.select('navWidth');
  }

  ngOnInit(): void {
    const t = this;
    t.common.setCommonContentComponent(this);
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
    t.commonContentHeight = height + 'px';
  }
}
