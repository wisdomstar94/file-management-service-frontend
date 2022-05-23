import { HttpErrorResponse } from '@angular/common/http';
import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CompanyFormBoxComponent } from 'src/app/components/company-form-box/company-form-box.component';
import { UploadCompanyInfoData } from 'src/app/interfaces/upload-company-info-data.interface';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { changeDestination } from 'src/app/store/destination/destination.action';
import { setActiveMenuKey } from 'src/app/store/menu/menu.action';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss']
})
export class UploadPageComponent implements OnInit, DoCheck {
  @ViewChild('companyFormBox') companyFormBox!: CompanyFormBoxComponent;
  isUploadingCompany: boolean;

  constructor(
    private store: Store<{ destination: string[], activeMenuKey: string }>,
    private route: ActivatedRoute,
    private router: Router,
    private ajax: AjaxService,
    private common: CommonService,
  ) {
    this.isUploadingCompany = false;
  }

  ngOnInit(): void {

  }

  ngDoCheck(): void {
    const t = this;
    t.store.dispatch(changeDestination({ destination: ['홈', '회사관리', '회사 등록'] }));
    t.store.dispatch(setActiveMenuKey({ menuKey: 'kmRQ1617524080387RwV' }));
  }

  companyUploadButtonClick(): void {
    if (this.isUploadingCompany) {
      this.common.getAlertComponent()
          ?.setDefault()
          .setMessage('등록중입니다. 잠시만 기다려주세요.')
          .show();
      return;
    }

    if (!this.companyFormBox.companyInfoValidationCheck()) {
      return;
    }

    const data: UploadCompanyInfoData = {
      companyName: this.companyFormBox.companyInfo.companyName!,
      companyCEOName: this.companyFormBox.companyInfo.companyCEOName!,
      companyCEOTel: this.companyFormBox.companyInfo.companyCEOTel!,
      companyTel: this.companyFormBox.companyInfo.companyTel!,
      companyBusinessNumber: this.companyFormBox.companyInfo.companyBusinessNumber!,
      companyAddress: this.companyFormBox.companyInfo.companyAddress!,
      memo: this.companyFormBox.companyInfo.memo! === '' ? null! : this.companyFormBox.companyInfo.memo!,
      companyStatus: this.companyFormBox.companyInfo?.FmsCompanyStatusCodes?.code!,
    };

    // console.log('data', data);

    this.isUploadingCompany = true;

    const observable = this.ajax.post(environment.api.company.createCompany, data);
    observable.subscribe(
      data2 => {
        this.isUploadingCompany = false;
        console.log('response', data2);

        if (data2 instanceof HttpErrorResponse) {
          this.common.alertMessage(data2.error);
          return;
        } else if (data2.result !== 'success') {
          this.common.alertMessage(data2);
          return;
        }

        this.common.getAlertComponent()
          ?.setDefault()
          .setMessage('회사가 등록되었습니다.')
          .setConfirmCallback(() => {
            this.common.getAlertComponent()?.hide();
            this.router.navigate(['company']);
          })
          .show();
      },
    );
  }

  goList(): void {
    this.router.navigate(['company']);
  }
}
