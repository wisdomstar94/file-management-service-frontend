interface FmsPermissionGroupStatusCodes {
  code: string;
  codeName: string;
}

export interface PermissionGroupItem {
  seq?: number;
  permissionGroupKey?: string;
  permissionGroupName?: string;
  permissionGroupDescription?: string;
  sortNo?: number;
  createdAt?: string;
  createdIp?: string;
  updatedAt?: string;
  updatedIp?: string;
  FmsPermissionGroupStatusCodes?: FmsPermissionGroupStatusCodes;
  isChecked?: boolean;
}
