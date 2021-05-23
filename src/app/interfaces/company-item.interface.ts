import { CodeItem } from "./code-item.interface";

export interface CompanyItem {
  seq?: number;
  companyName?: string;
  companyBusinessNumber?: string;
  companyAddress?: string;
  companyCEOName?: string;
  companyCEOTel?: string;
  companyTel?: string;
  createdAt?: string;
  memo?: string;
  companyStatus?: CodeItem;
}