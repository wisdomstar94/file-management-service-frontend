import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
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
    // console.log('companyInfo', companyInfo);
    this.fixedCompanyName = companyInfo.companyName;
    this.cleanCompanyInfo = { ...companyInfo };
    this.companyInfo = companyInfo;

    this.companyStatusCodeList = this.route.snapshot.data.CompanyStatusCode;
    this.companyStatusSelectItems = this.companyStatusCodeList.map((x) => {
      return {
        optionUniqueID: x.code,
        optionValue: x.code,
        optionDisplayText: x.codeName,
        selected: false,
      };
    });
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

  companyInfoValidationCheck(): boolean {
    this.common.getAlertComponent()?.setDefault();

    if (this.companyInfo === undefined) {
      this.common.getAlertComponent()?.setMessage('회사 정보가 없습니다.').show();
      return false;
    }

    // companyName 체크
    if (typeof this.companyInfo.companyName !== 'string') {
      this.common.getAlertComponent()?.setMessage('회사명 정보가 없습니다.').show();
      return false;
    }

    if (this.companyInfo.companyName.trim() === '') {
      this.common.getAlertComponent()?.setMessage('회사명을 입력해주세요.').show();
      return false;
    }

    if (this.companyInfo.companyName.length > environment.stringLengthLimit.companyNameMaxLength) {
      this.common.getAlertComponent()?.setMessage('회사명은 ' + environment.stringLengthLimit.companyNameMaxLength + '자를 넘을 수 없습니다.').show();
      return false; 
    }

    // companyBusinessNumber 체크
    if (typeof this.companyInfo.companyBusinessNumber !== 'string') {
      this.common.getAlertComponent()?.setMessage('사업자번호 정보가 없습니다.').show();
      return false;
    }

    if (this.companyInfo.companyBusinessNumber.trim() === '') {
      this.common.getAlertComponent()?.setMessage('사업자번호를 입력해주세요.').show();
      return false;
    }

    if (this.companyInfo.companyBusinessNumber.length > environment.stringLengthLimit.companyBusinessNumberMaxLength) {
      this.common.getAlertComponent()?.setMessage('사업자번호는 ' + environment.stringLengthLimit.companyBusinessNumberMaxLength + '자를 넘을 수 없습니다.').show();
      return false; 
    }

    // companyAddress 체크
    if (typeof this.companyInfo.companyAddress !== 'string') {
      this.common.getAlertComponent()?.setMessage('사업장주소 정보가 없습니다.').show();
      return false;
    }

    if (this.companyInfo.companyAddress.trim() === '') {
      this.common.getAlertComponent()?.setMessage('사업장주소를 입력해주세요.').show();
      return false;
    }

    if (this.companyInfo.companyAddress.length > environment.stringLengthLimit.companyAddressMaxLength) {
      this.common.getAlertComponent()?.setMessage('사업장주소는 ' + environment.stringLengthLimit.companyAddressMaxLength + '자를 넘을 수 없습니다.').show();
      return false; 
    }

    // companyCEOName 체크
    if (typeof this.companyInfo.companyCEOName !== 'string') {
      this.common.getAlertComponent()?.setMessage('대표자명 정보가 없습니다.').show();
      return false;
    }

    if (this.companyInfo.companyCEOName.trim() === '') {
      this.common.getAlertComponent()?.setMessage('대표자명을 입력해주세요.').show();
      return false;
    }

    if (this.companyInfo.companyCEOName.length > environment.stringLengthLimit.companyCEONameMaxLength) {
      this.common.getAlertComponent()?.setMessage('대표자명은 ' + environment.stringLengthLimit.companyCEONameMaxLength + '자를 넘을 수 없습니다.').show();
      return false; 
    }

    // companyCEOTel 체크
    if (typeof this.companyInfo.companyCEOTel !== 'string') {
      this.common.getAlertComponent()?.setMessage('대표자 연락처 정보가 없습니다.').show();
      return false;
    }

    if (this.companyInfo.companyCEOTel.trim() === '') {
      this.common.getAlertComponent()?.setMessage('대표자 연락처를 입력해주세요.').show();
      return false;
    }

    if (this.companyInfo.companyCEOTel.length > environment.stringLengthLimit.companyCEOTelMaxLength) {
      this.common.getAlertComponent()?.setMessage('대표자 연락처는 ' + environment.stringLengthLimit.companyCEOTelMaxLength + '자를 넘을 수 없습니다.').show();
      return false; 
    }

    // companyTel 체크
    if (typeof this.companyInfo.companyTel !== 'string') {
      this.common.getAlertComponent()?.setMessage('회사 전화번호 정보가 없습니다.').show();
      return false;
    }

    if (this.companyInfo.companyTel.trim() === '') {
      this.common.getAlertComponent()?.setMessage('회사 전화번호를 입력해주세요.').show();
      return false;
    }

    if (this.companyInfo.companyTel.length > environment.stringLengthLimit.companyTelMaxLength) {
      this.common.getAlertComponent()?.setMessage('회사 전화번호는 ' + environment.stringLengthLimit.companyTelMaxLength + '자를 넘을 수 없습니다.').show();
      return false; 
    }

    // FmsCompanyStatusCodes.code 체크
    if (typeof this.companyInfo.FmsCompanyStatusCodes?.code !== 'string') {
      this.common.getAlertComponent()?.setMessage('회사 상태 정보가 없습니다.').show();
      return false;
    }

    if (this.companyInfo.FmsCompanyStatusCodes.code.trim() === '') {
      this.common.getAlertComponent()?.setMessage('회사 상태를 선택해주세요.').show();
      return false;
    }

    return true;
  }

  companyInfoEditButtonClick(): void {
    // console.log(this.companyInfo);
    if (!this.companyInfoValidationCheck()) {
      return;
    }

    const data: ModifyCompanyInfoData = {
      companyKey: this.companyInfo.companyKey!,
    };

    if (this.cleanCompanyInfo.companyName !== this.companyInfo.companyName) {
      data.companyName = this.companyInfo.companyName;
    }
     
    if (this.cleanCompanyInfo.companyCEOName !== this.companyInfo.companyCEOName) {
      data.companyCEOName = this.companyInfo.companyCEOName;
    }
     
    if (this.cleanCompanyInfo.companyCEOTel !== this.companyInfo.companyCEOTel) {
      data.companyCEOTel = this.companyInfo.companyCEOTel;
    }

    if (this.cleanCompanyInfo.companyTel !== this.companyInfo.companyTel) {
      data.companyTel = this.companyInfo.companyTel;
    } 
     
    if (this.cleanCompanyInfo.companyBusinessNumber !== this.companyInfo.companyBusinessNumber) {
      data.companyBusinessNumber = this.companyInfo.companyBusinessNumber;
    } 
     
    if (this.cleanCompanyInfo.companyAddress !== this.companyInfo.companyAddress) {
      data.companyAddress = this.companyInfo.companyAddress;
    } 

    if (this.cleanCompanyInfo.memo !== this.companyInfo.memo) {
      data.memo = this.companyInfo.memo;
    } 
      
    if (this.cleanCompanyInfo.FmsCompanyStatusCodes?.code !== this.companyInfo.FmsCompanyStatusCodes?.code) {
      data.companyStatus = this.companyInfo.FmsCompanyStatusCodes?.code;
    } 

    console.log('data', data);

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
