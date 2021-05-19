import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { NavMenuInMenuItem } from 'src/app/interfaces/nav-menu-in-menu-item';
import { NavMenuItem } from 'src/app/interfaces/nav-menu-item';
import { environment } from 'src/environments/environment';
import { changeNavWidth } from '../store/common-nav/common-nav.action';

@Component({
  selector: 'app-common-nav',
  templateUrl: './common-nav.component.html',
  styleUrls: ['./common-nav.component.scss']
})
export class CommonNavComponent implements OnInit {
  @Output() onInit = new EventEmitter();

  environment = environment;

  userMenuList: NavMenuItem[] = [];
  navWidth$: Observable<string>;
  
  navStyle = {
    'width': 'auto',
    'height': '100%',
  };

  navTopAreaStyle = {
    'height': '50px',
  };

  constructor(
    private store: Store<{ navWidth: string }>,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) { 
    this.navWidth$ = this.store.select('navWidth');
    this.navWidth$.subscribe(
      data => {
        this.navStyle['width'] = data;
      },
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

    t.router.navigate([item.menuLink]);
    return;
  }
}
