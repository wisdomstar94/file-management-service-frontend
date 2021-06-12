import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CompanyFormBoxComponent } from 'src/app/components/company-form-box/company-form-box.component';
import { CodeItem } from 'src/app/interfaces/code-item.interface';
import { CompanyInfo } from 'src/app/interfaces/company-info.interface';
import { ModifyCompanyInfoData } from 'src/app/interfaces/modify-company-info-data.interface';
import { SelectItem } from 'src/app/interfaces/select-item.interface';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { changeDestination } from 'src/app/store/destination/destination.action';
import { setActiveMenuKey } from 'src/app/store/menu/menu.action';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit, DoCheck {
  @ViewChild('companyFormBox') companyFormBox!: CompanyFormBoxComponent;

  fixedCompanyName?: string;
  cleanCompanyInfo!: CompanyInfo;
  companyInfo!: CompanyInfo;
  companyStatusCodeList!: CodeItem[];
  companyStatusSelectItems!: SelectItem[];

  constructor(
    private store: Store<{ destination: string[], activeMenuKey: string }>,
    private route: ActivatedRoute,
    private router: Router,
    private common: CommonService,
    private ajax: AjaxService,
  ) { 
    const companyInfo: CompanyInfo = this.route.snapshot.data.companyInfo;
    this.fixedCompanyName = companyInfo.companyName;
  }

  ngOnInit(): void {
    // setInterval(() => {
    //   console.log(this.companyInfo);
    // }, 1000);
  } 

  ngDoCheck(): void {
    const t = this;
    t.store.dispatch(changeDestination({ destination: ['홈', '회사관리', '회사상세정보'] }));
    t.store.dispatch(setActiveMenuKey({ menuKey: 'kmRQ1617524080387RwV' }));
  }


  companyInfoEditButtonClick(): void {
    // console.log(this.companyInfo);
    if (!this.companyFormBox.companyInfoValidationCheck()) {
      return;
    }

    const data: ModifyCompanyInfoData = {
      companyKey: this.companyFormBox.companyInfo.companyKey!,
    };

    if (this.companyFormBox.isChanged('companyName')) {
      data.companyName = this.companyFormBox.companyInfo.companyName;
    }
     
    if (this.companyFormBox.isChanged('companyCEOName')) {
      data.companyCEOName = this.companyFormBox.companyInfo.companyCEOName;
    }
     
    if (this.companyFormBox.isChanged('companyCEOTel')) {
      data.companyCEOTel = this.companyFormBox.companyInfo.companyCEOTel;
    }

    if (this.companyFormBox.isChanged('companyTel')) {
      data.companyTel = this.companyFormBox.companyInfo.companyTel;
    } 
     
    if (this.companyFormBox.isChanged('companyBusinessNumber')) {
      data.companyBusinessNumber = this.companyFormBox.companyInfo.companyBusinessNumber;
    } 
     
    if (this.companyFormBox.isChanged('companyAddress')) {
      data.companyAddress = this.companyFormBox.companyInfo.companyAddress;
    } 

    if (this.companyFormBox.isChanged('memo')) {
      data.memo = this.companyFormBox.companyInfo.memo;
    } 
      
    if (this.companyFormBox.isChanged('companyStatus')) {
      data.companyStatus = this.companyFormBox.companyInfo.FmsCompanyStatusCodes?.code;
    } 

    console.log('data', data);

    if (Object.keys(data).length === 1) {
      this.common.getAlertComponent()?.setDefault().setMessage('수정된 부분이 없습니다.').show();
      return;
    }

    const observable = this.ajax.post(environment.api.company.modifyCompany, data);
    const subscribe = observable.subscribe(
      data => {
        console.log('response', data);
        if (data.result !== 'success') {
          this.common.alertMessage(data);
          return;
        }

        this.common.getAlertComponent()?.setDefault().setMessage('회사 정보가 수정되었습니다.').show();
        return;
      },
      error => {
        this.common.alertMessage(error);
        return;
      },
    );
  }

  goList(): void {
    this.router.navigate(['company']);
  }
}
