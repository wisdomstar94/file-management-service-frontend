import { Component, OnInit } from '@angular/core';
import { ResultObject } from 'src/app/interfaces/result-object';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  resultObject: ResultObject;

  constructor() { 
    this.resultObject = {
      code: 0,
      msg: '에러가 발생하였습니다.',
    };
  }

  ngOnInit(): void {
    this.checkResultObject();
  }

  checkResultObject(): void {
    const resultObjectString: string | null = localStorage.getItem(environment.localStorageName.fileDownloadUrlErrorResult);
    if (resultObjectString !== null) {
      const resultObject: ResultObject = JSON.parse(resultObjectString);
      this.resultObject = resultObject;
    }
  }
}
