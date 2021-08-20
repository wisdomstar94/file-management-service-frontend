import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NavMenuItem } from '../interfaces/nav-menu-item.interface';
import { AjaxService } from '../services/ajax.service';

@Injectable({
  providedIn: 'root'
})
export class UserMenuListResolver implements Resolve<NavMenuItem[]> {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NavMenuItem[]> {
    const t = this;
    
    const userMenuListObservable = t.http.post<NavMenuItem[]>(
      environment.api.menu.getUserMenu, {}, { withCredentials: true })
      .pipe(
        retry(1),
        map(e => {
          let menuList: NavMenuItem[] = (e as any).menuCategoryListReal;
          // return of(menuList);
          if (menuList === undefined) {
            menuList = [];
          }
          return menuList;
        }),
        catchError((error: HttpErrorResponse) => {
          const t = this;
      
          if (error.error instanceof ErrorEvent) {
            // 클라이언트나 네트워크 문제로 발생한 에러.
            // console.error('An error occurred:', error.error.message);
          } else {
            // 백엔드에서 실패한 것으로 보낸 에러.
            // 요청으로 받은 에러 객체를 확인하면 원인을 확인할 수 있습니다.
            // console.error(
            //   `Backend returned code ${error.status}, ` +
            //   `body was: ${JSON.stringify(error.error)}`);
          }
      
          // 사용자가 이해할 수 있는 에러 메시지를 반환합니다.
          // return throwError('Something bad happened; please try again later.');
          // return of(error.error);  
          return of([]);
        }),
      );

    return userMenuListObservable;
  }
}
