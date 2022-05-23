import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, retry, take } from 'rxjs/operators';
import { HttpOptions } from '../interfaces/http-options.interface';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {
  constructor(
    private http: HttpClient,
  ) {

  }

  post(url: string, data: any, httpOptions?: HttpOptions): Observable<any> {
    const t = this;


    if (httpOptions !== undefined) {
      httpOptions.withCredentials = true;
    } else {
      httpOptions = {
        withCredentials: true,
      };
    }


    return this.http.post<any>(url, data, httpOptions)
      .pipe(
        retry(1), // 요청이 실패하면 1번 더 시도합니다.
        take(1),
        catchError(t.handleError),
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // 클라이언트나 네트워크 문제로 발생한 에러.
      console.error('An error occurred:', error.error.message);
    } else {
      // 백엔드에서 실패한 것으로 보낸 에러.
      // 요청으로 받은 에러 객체를 확인하면 원인을 확인할 수 있습니다.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${JSON.stringify(error.error)}`);
    }

    // 사용자가 이해할 수 있는 에러 메시지를 반환합니다.
    // return throwError('Something bad happened; please try again later.');
    return of(error);
  }
}
