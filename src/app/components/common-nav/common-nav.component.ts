import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NavMenuInMenuItem } from 'src/app/interfaces/nav-menu-in-menu-item';
import { NavMenuItem } from 'src/app/interfaces/nav-menu-item';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-common-nav',
  templateUrl: './common-nav.component.html',
  styleUrls: ['./common-nav.component.scss']
})
export class CommonNavComponent implements OnInit {
  @Output() onInit = new EventEmitter();

  environment = environment;

  userMenuList: NavMenuItem[] = [];

  navStyle = {
    'width': '240px',
    'height': '100%',
  };

  navTopAreaStyle = {
    'height': '50px',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) { 

  }

  ngOnInit(): void {
    const t = this;
    t.onInit.emit(t);
    const userMenuList: NavMenuItem[] = t.route.snapshot.data.UserMenuList;
    t.setUserMenuList(userMenuList);
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
