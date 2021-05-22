import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { NavMenuInMenuItem } from 'src/app/interfaces/nav-menu-in-menu-item';
import { NavMenuItem } from 'src/app/interfaces/nav-menu-item';
import { environment } from 'src/environments/environment';
import { navOpen, navClose, navModeBasic, navModeMinimal, changeNavWidth } from 'src/app/store/common-nav/common-nav.action';
import { DeviceMode } from 'src/app/types/device-mode';
import { animate, style, transition, trigger } from '@angular/animations';
import { NavMode } from 'src/app/types/nav-mode';

const navAnimation = trigger('navAnimation', [
  transition(':enter', [
    style({ left: '-100%' }),
    animate('300ms ease-out', style({ left: '0' })),
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({ left: '-100%' })),
  ]),
]);

const navBackgroundAnim = trigger('navBackgroundAnim', [
  transition(':enter', [
    style({ opacity: '0' }),
    animate('300ms ease-out', style({ opacity: '1' })),
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({ opacity: '0' })),
  ]),
]);

@Component({
  selector: 'app-common-nav',
  templateUrl: './common-nav.component.html',
  styleUrls: ['./common-nav.component.scss'],
  animations: [
    navAnimation,
    navBackgroundAnim,
  ],
})
export class CommonNavComponent implements OnInit {
  @Output() onInit = new EventEmitter();

  environment = environment;

  userMenuList: NavMenuItem[] = [];
  deviceMode$: Observable<DeviceMode>;
  deviceMode: DeviceMode = 'pc';
  navOpend$ = of(false);

  navAnimationDisabled = true;

  navStyle = {
    'width': '240px',
    'height': '100%',
    'position': 'fixed',
    'top': '0',
    'left': '0',
  };

  navTopAreaStyle = {
    'display': 'flex',
    'height': '50px',
  };

  appTitle$: Observable<string>;

  navMode$: Observable<NavMode>;
  navMode: NavMode = 'basic';

  navWidth$: Observable<string>;
  navWidth = '';

  activeMenuKey$: Observable<string>;

  navAppTitleClass = {
    'minimal': false,
  };

  navToggleButtonAreaClass = {
    'minimal': false,
  };

  categoryNameRowClass = {
    'minimal': false,
  };

  menuIconAreaClass = {
    'minimal': false,
  };

  constructor(
    private store: Store<{ deviceMode: DeviceMode, navOpend: boolean, appTitle: string, navMode: NavMode, navWidth: string, activeMenuKey: string }>,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) { 
    const t = this;
    this.deviceMode$ = this.store.select('deviceMode');
    this.deviceMode$.subscribe(
      data => {
        t.deviceMode = data;
        t.setDeviceStyle(t.deviceMode);
      }
    );

    this.navOpend$ = this.store.select('navOpend');
    this.navOpend$.subscribe(
      data => {
        
      }
    );

    this.appTitle$ = this.store.select('appTitle');

    this.navMode$ = this.store.select('navMode');
    this.navMode$.subscribe(
      data => {
        t.navMode = data;
        if (t.navMode === 'minimal') {
          t.store.dispatch(changeNavWidth({ navWidth: '50px' }));
          t.navAppTitleClass['minimal'] = true;
          t.navToggleButtonAreaClass['minimal'] = true;
          t.categoryNameRowClass['minimal'] = true;
          t.menuIconAreaClass['minimal'] = true;
          t.navTopAreaStyle['display'] = 'block';
          t.navTopAreaStyle['height'] = '260px';
        } else {
          t.store.dispatch(changeNavWidth({ navWidth: '240px' }));
          t.navAppTitleClass['minimal'] = false;
          t.navToggleButtonAreaClass['minimal'] = false;
          t.categoryNameRowClass['minimal'] = false;
          t.menuIconAreaClass['minimal'] = false;
          t.navTopAreaStyle['display'] = 'flex';
          t.navTopAreaStyle['height'] = '50px';
        }
      }
    );

    this.navWidth$ = this.store.select('navWidth');
    this.navWidth$.subscribe(
      data => {
        t.navWidth = data;
        t.navStyle['width'] = data;
      }
    );

    this.activeMenuKey$ = this.store.select('activeMenuKey');
    this.activeMenuKey$.subscribe(
      data => {
        t.activeMenu(data);
      }
    );
  }

  ngOnInit(): void {
    const t = this;
    t.onInit.emit(t);
    const userMenuList: NavMenuItem[] = t.route.snapshot.data.UserMenuList;
    t.setUserMenuList(userMenuList);
    // setTimeout(() => {
    //   t.store.dispatch(changeNavWidth({ navWidth: '350px' }));
    // }, 2000);
  }

  setDeviceStyle(deviceMode: DeviceMode): void {
    const t = this;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (deviceMode === 'mobile') {
      // mobile
      t.store.dispatch(navModeBasic());
      setTimeout(() => {
        t.navStyle['width'] = `calc(100% - 60px)`;
        t.navStyle['height'] = windowHeight + 'px';
        // t.navStyle['left'] = -(windowWidth - 60) + 'px';
        t.navAnimationDisabled = false;
      });
    } else {
      // pc
      t.navStyle['width'] = '240px';
      t.navStyle['height'] = windowHeight + 'px';
      t.navStyle['left'] = '0';
      t.navAnimationDisabled = true;
    }
  }

  setUserMenuList(v: NavMenuItem[]): void {
    const t = this;
    t.userMenuList = v;
  }

  getMenuIconPath(item: NavMenuInMenuItem): string {
    const t = this;

    if (typeof item.menuIconPath !== 'string') {
      return '';
    }

    return environment.baseUrl + item.menuIconPath;
  }

  transform(html: string) {
    if (typeof html !== 'string') {
      return '';
    }

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  menuButtonClick(item: NavMenuInMenuItem): void {
    const t = this;

    if (typeof item.menuLink !== 'string') {
      return;
    }

    for (const item3 of t.userMenuList) {
      const menuList = item3.menuList;

      for (const item2 of menuList) {
        if (item2 === item) {
          item2.menuActive = true;
        } else {
          item2.menuActive = false;
        }
      }
    }

    t.store.dispatch(navClose());

    t.router.navigate([item.menuLink]);
    return;
  }

  activeMenu(menuKey: string): void {
    const t = this;

    for (const item3 of t.userMenuList) {
      const menuList = item3.menuList;

      for (const item2 of menuList) {
        if (item2.menuKey === menuKey) {
          item2.menuActive = true;
        } else {
          item2.menuActive = false;
        }
      }
    }
  }

  navBackgroundClick(): void {
    const t = this;
    t.store.dispatch(navClose());
  }

  pcNavToggleButtonClick(): void {
    const t = this;
    
    if (t.navMode === 'basic') {
      t.store.dispatch(navModeMinimal());
    } else {
      t.store.dispatch(navModeBasic());
    }
  }
}
