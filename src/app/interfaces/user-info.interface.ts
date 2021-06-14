interface FmsCompany {
  companyKey: string;
  companyName: string;
}

interface FmsPermissionGroup {
  permissionGroupKey: string;
  permissionGroupName: string;
}

interface FmsUserStatusCodes {
  code: string;
  codeName: string;
}

export interface UserInfo {
  userKey: string;
  userId?: string;
  userPassword?: string;
  companyKey?: string;
  FmsCompany?: FmsCompany;
  userName?: string;
  userPhone?: string;
  userMemo?: string;
  createdAt?: string;
  createdIp?: string;
  permissionGroupKey?: string;
  FmsPermissionGroup?: FmsPermissionGroup;
  userStatus?: string;
  FmsUserStatusCodes?: FmsUserStatusCodes;
}
