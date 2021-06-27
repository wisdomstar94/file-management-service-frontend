import { CodeItem } from "./code-item.interface";

interface FmsCompanyInfoUser {
  userKey: string;
  userId: string;
}

export interface CompanyItem {
  seq?: number;
  companyKey?: string;
  companyName?: string;
  companyBusinessNumber?: string;
  companyAddress?: string;
  companyCEOName?: string;
  companyCEOTel?: string;
  companyTel?: string;
  createdAt?: string;
  memo?: string;
  FmsCompanyStatusCodes?: CodeItem;
  FmsCompanyInfoUser?: FmsCompanyInfoUser;
  isChecked?: boolean;
}