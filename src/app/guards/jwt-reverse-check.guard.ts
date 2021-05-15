import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AjaxService } from '../services/ajax.service';

@Injectable({
  providedIn: 'root'
})
export class JwtReverseCheckGuard implements CanActivate {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const t = this;
    const jwtCheckObservable = t.http.post<any>(
      environment.api.user.authCheck, {}, {})
      .pipe(
        map(e => {
          if (e) {
            t.router.navigate(['']);
            return false;
          } else {
            return true;
          }
        }),
        catchError((error: HttpErrorResponse) => {
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
          return of(true);
        }),
      );

    return jwtCheckObservable;
  }
}
