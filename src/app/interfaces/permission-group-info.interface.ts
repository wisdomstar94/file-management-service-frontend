interface FmsPermissionGroupStatusCodes {
  code: string;
  codeName: string;
}

interface FmsPermissionGroupInfoUser {
  userKey: string;
  userId: string;
}

interface FmsPermissionGroupInfos {
  permissionGroupKey: string;
  FmsPermissionGroupInfoUser: FmsPermissionGroupInfoUser;
}

export interface PermissionGroupInfo {
  permissionGroupKey?: string;
  permissionGroupName?: string;
  permissionGroupDescription?: string;
  createdAt?: string;
  permissionGroupStatus?: string;
  FmsPermissionGroupStatusCodes?: FmsPermissionGroupStatusCodes;
  FmsPermissionGroupInfos?: FmsPermissionGroupInfos;
}
