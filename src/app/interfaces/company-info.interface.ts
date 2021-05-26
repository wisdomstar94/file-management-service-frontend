import { CodeItem } from "./code-item.interface";

export interface CompanyInfo {
  companyKey?: string;
  companyName?: string;
  companyBusinessNumber?: string;
  companyAddress?: string;
  companyCEOName?: string;
  companyCEOTel?: string;
  companyTel?: string; 
  createdAt?: string;
  memo?: string;
  companyStatus?: string;
  FmsCompanyStatusCodes?: CodeItem;
}
