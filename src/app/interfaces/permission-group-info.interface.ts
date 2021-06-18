interface FmsPermissionGroupStatusCodes {
  code: string;
  codeName: string;
}

export interface PermissionGroupInfo {
  permissionGroupKey?: string;
  permissionGroupName?: string;
  permissionGroupDescription?: string;
  createdAt?: string;
  permissionGroupStatus?: string;
  FmsPermissionGroupStatusCodes?: FmsPermissionGroupStatusCodes;
}
