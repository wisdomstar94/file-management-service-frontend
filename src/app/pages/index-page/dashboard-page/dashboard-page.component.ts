import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { CardInfo } from 'src/app/interfaces/card-info.interface';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { changeDestination } from 'src/app/store/destination/destination.action';
import { setActiveMenuKey } from 'src/app/store/menu/menu.action';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, DoCheck {

  cardInfoList: CardInfo[] = [
    {
      id: 'totalDownloadedCount',
      bgColor: 'red',
      mainTitle: '총 다운로드된 횟수',
      mainIconSvg: `<svg id="e57fdebc-1467-4e7c-8309-d8d547331071" data-name="레이어 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 89.65 99.38"><g id="ac70428a-f454-4d3e-8d25-314b5dfc01b3" data-name="surface1"><path d="M56.9,20.68h11L51.07,3V14.84A5.84,5.84,0,0,0,56.9,20.68Z" transform="translate(-5.18 -0.31)"/><path d="M68.07,46.18A26.76,26.76,0,1,0,94.82,72.94,26.78,26.78,0,0,0,68.07,46.18Zm14.37,29L69.32,89.3a1.81,1.81,0,0,1-2.62,0L53.6,75.22a1.81,1.81,0,0,1,.09-2.53,1.83,1.83,0,0,1,2.56.09l10,10.75V57.94a1.79,1.79,0,0,1,3.58,0V83.53l10-10.75a1.78,1.78,0,1,1,2.6,2.44Z" transform="translate(-5.18 -0.31)"/><path d="M38.69,65.24H19.24a1.8,1.8,0,0,1,0-3.59H39.88a31.42,31.42,0,0,1,4.55-7.83H19.24a1.79,1.79,0,1,1,0-3.58H47.83a30.78,30.78,0,0,1,20.26-7.71c.74,0,1.34.07,2.24.14V24.26H56.9a9.43,9.43,0,0,1-9.41-9.42V.31H13.15a8,8,0,0,0-8,8.08V76.72a7.93,7.93,0,0,0,8,8h27a29.79,29.79,0,0,1-2.4-11.82A30.26,30.26,0,0,1,38.69,65.24ZM19.24,39H41.92a1.79,1.79,0,0,1,0,3.58H19.24a1.79,1.79,0,1,1,0-3.58Z" transform="translate(-5.18 -0.31)"/></g></svg>`,
      mainResult: 0,
      resultUnit: '번',
      subTitle: '오늘 다운로드된 횟수',
      subResult: 0,
      subUnit: '번',
      isRefreshing: false,
      startRefresh: (): void => {
        const myObservable = this.http.post<any>(
          environment.api.dashboard.getDownloadedCount, {}, { withCredentials: true })
          .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
              const t = this;
          
              if (error.error instanceof ErrorEvent) {
                
              } else {
                
              }

              return error.error;      
            }),
          );

        myObservable.subscribe(
          data => {
            const item = this.getCardInfoItem('totalDownloadedCount');
            if (item === null) {
              return;
            }
            item.mainResult = data.totalCount;
            item.subResult = data.todayTotalCount;
          },
          error => {
            this.common.alertMessage(error);
            
          },
          () => {
            const item = this.getCardInfoItem('totalDownloadedCount');
            if (item === null) {
              return;
            }
            item.isRefreshing = false;
          },
        );
      },
    },
    {
      id: 'totalUploadedFileCount',
      bgColor: 'green',
      mainTitle: '총 업로드된 파일 갯수',
      mainIconSvg: `<svg id="a5b6e330-e051-4e63-b049-43c4f78fd2d6" data-name="레이어 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 89.56 98.39"><path d="M81,79a6.32,6.32,0,0,0-6.31,6.31V99.19L94.84,79Z" transform="translate(-5.29 -0.81)"/><path d="M23,13.42V86.58A12.64,12.64,0,0,0,35.56,99.19H68.35V85.32A12.66,12.66,0,0,1,81,72.7H94.84V13.42ZM60.78,64.5H38.08V58.2h22.7ZM79.71,49.37H38.08V43.06H79.7v6.31Zm0-15.14H38.08v-6.3H79.7v6.3Z" transform="translate(-5.29 -0.81)"/><path d="M5.29.81V74A12.64,12.64,0,0,0,16.64,86.51V7.11H77.19V.81Z" transform="translate(-5.29 -0.81)"/></svg>`,
      mainResult: 0,
      resultUnit: '개',
      subTitle: '오늘 업로드된 파일 갯수',
      subResult: 0,
      subUnit: '개',
      isRefreshing: false,
      startRefresh: (): void => {
        const myObservable = this.http.post<any>(
          environment.api.dashboard.getUploadedFileCount, {}, { withCredentials: true })
          .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
              const t = this;
          
              if (error.error instanceof ErrorEvent) {
                
              } else {
                
              }

              return error.error;      
            }),
          );

        myObservable.subscribe(
          data => {
            const item = this.getCardInfoItem('totalUploadedFileCount');
            if (item === null) {
              return;
            }
            item.mainResult = data.fileVersionTotalCount;
            item.subResult = data.fileTodayVersionCount;
          },
          error => {
            this.common.alertMessage(error);
          },
          () => {
            const item = this.getCardInfoItem('totalUploadedFileCount');
            if (item === null) {
              return;
            }
            item.isRefreshing = false;
          }, 
        );
      },
    },
    {
      id: 'totalDownloadedFileSize',
      bgColor: 'purple',
      mainTitle: '총 다운로드된 용량',
      mainIconSvg: `<svg id="b0b66e7d-1bf8-48e8-9529-9164874b10fa" data-name="레이어 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81.43 98.8"><g id="e1681079-2d65-48e1-9b5a-eb4f496457f2" data-name="Layer 1"><path d="M50.08.6C27.61.6,9.39,7.24,9.39,15.44V27.61c0,8.2,18.22,14.84,40.69,14.84s40.69-6.64,40.69-14.84V15.44C90.77,7.24,72.55.6,50.08.6Z" transform="translate(-9.35 -0.6)"/><path d="M50.08,49.55c-21.46,0-39.15-6.06-40.69-13.74-.08.36,0,20.1,0,20.1,0,8.2,18.22,14.84,40.69,14.84s40.69-6.64,40.69-14.84c0,0,0-19.74,0-20.1C89.2,43.49,71.54,49.55,50.08,49.55Z" transform="translate(-9.35 -0.6)"/><path d="M90.74,64.45c-1.55,7.68-19.2,13.74-40.66,13.74S10.93,72.13,9.38,64.45V84.56c0,8.2,18.22,14.84,40.69,14.84s40.69-6.64,40.69-14.84Z" transform="translate(-9.35 -0.6)"/></g></svg>`,
      mainResult: 0,
      resultUnit: 'MB',
      subTitle: '오늘 다운로드된 용량',
      subResult: 0,
      subUnit: 'MB',
      isRefreshing: false,
      startRefresh: (): void => {
        const myObservable = this.http.post<any>(
          environment.api.dashboard.getDownloadedSize, {}, { withCredentials: true })
          .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
              const t = this;
          
              if (error.error instanceof ErrorEvent) {
                
              } else {
                
              }

              return error.error;      
            }),
          );

        myObservable.subscribe(
          data => {
            const item = this.getCardInfoItem('totalDownloadedFileSize');
            if (item === null) {
              return;
            }

            const checkFileSize = this.common.checkFileSize(data.targetDateTotalSize);
            const checkSubFileSize = this.common.checkFileSize(data.todayTotalSizeByte);
            

            item.mainResult = Number((data.targetDateTotalSize / checkFileSize.division).toFixed(2));
            item.resultUnit = checkFileSize.unit;

            item.subResult = data.todayTotalSizeByte / checkSubFileSize.division;
            item.subUnit = checkSubFileSize.unit;
          },
          error => {
            this.common.alertMessage(error);
          },
          () => {
            const item = this.getCardInfoItem('totalDownloadedFileSize');
            if (item === null) {
              return;
            }
            item.isRefreshing = false;
          }, 
        );
      },
    },
    {
      id: 'totalFileDownloadTryCount',
      bgColor: 'blue',
      mainTitle: '총 파일 다운로드 시도 횟수',
      mainIconSvg: ``,
      mainResult: 0,
      resultUnit: '회',
      subTitle: '오늘 파일 다운로드 시도 횟수',
      subResult: 0,
      subUnit: '회',
      isRefreshing: false,
      startRefresh: (): void => {
        const myObservable = this.http.post<any>(
          environment.api.dashboard.getFileDownloadUrlAccessCount, {}, { withCredentials: true })
          .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
              const t = this;
          
              if (error.error instanceof ErrorEvent) {
                
              } else {
                
              }

              return error.error;      
            }),
          );

        myObservable.subscribe(
          data => {
            const item = this.getCardInfoItem('totalFileDownloadTryCount');
            if (item === null) {
              return;
            }
            item.mainResult = data.totalAccessCount;
            item.subResult = data.todayTotalAccessCount;
          },
          error => {
            this.common.alertMessage(error);
          },
          () => {
            const item = this.getCardInfoItem('totalFileDownloadTryCount');
            if (item === null) {
              return;
            }
            item.isRefreshing = false;
          }, 
        );
      },
    },
  ];

  constructor(
    private store: Store<{ destination: string[], activeMenuKey: string }>,
    private http: HttpClient,
    public common: CommonService,
  ) { 

  }

  ngOnInit(): void {
    const t = this;
    t.allRefresh();
  }

  ngDoCheck(): void {
    const t = this;
    t.store.dispatch(changeDestination({ destination: ['홈', '대시보드'] }));
    t.store.dispatch(setActiveMenuKey({ menuKey: 'khPJl1617523858875yO' }));
  }

  allRefresh(): void {
    const t = this;
    for (const item of t.cardInfoList) {
      item.startRefresh();
    }
  }

  getCardInfoItem(id: string): CardInfo | null {
    const t = this;

    for (const item of this.cardInfoList) {
      if (item.id === id) {
        return item;
      }
    }

    return null;
  }

  refreshButtonClick(item: CardInfo): void {
    const t = this;

    if (item.isRefreshing === true) {
      t.common.getAlertComponent()
        ?.setDefault()
        .setTitle('안내')
        .setMessage('새로고침 중입니다. 잠시만 기다려주세요.')
        .show();
      return;
    }

    item.isRefreshing = true;
    item.startRefresh();
  }
}
