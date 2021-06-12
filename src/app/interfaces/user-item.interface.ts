import { CodeItem } from "./code-item.interface";

interface FmsParentUsers {
  userKey: string;
  userId: string;
}

interface FmsCompany {
  companyKey: string;
  companyName: string;
}

interface FmsUserStatusCodes {
  code: string;
  codeName: string;
}

interface FmsPermissionGroups {
  permissionGroupKey: string;
  permissionGroupName: string;
}

export interface UserItem {
  seq?: number;
  userKey?: string;
  userId?: string;
  FmsParentUsers?: FmsParentUsers;
  FmsCompany?: FmsCompany;
  userName?: string;
  userPhone?: string;
  userMemo?: string;
  createdAt?: string;
  createdIp?: string;
  FmsUserStatusCodes?: FmsUserStatusCodes;
  FmsPermissionGroups?: FmsPermissionGroups;
  isChecked?: boolean;
}
