interface FmsPermission {
  menuKey: string;
  permissionKey: string;
  permissionName: string;
  permissionDescription: string;
  sortNo: number;
  createdAt: string;
}

interface FmsPermissionGroup {
  permissionGroupKey: string;
  permissionGroupName: string;
  permissionGroupDescription: string;
  sortNo: number;
  createdAt: string;
}

export interface PermissionGroupUploadItem {
  seq: number;
  permissionGroupUploadKey: string;
  permissionGroupKey: string;
  permissionKey: string;
  createdAt: string;
  createdIp: string;
  isActive: string;
  FmsPermission: FmsPermission;
  FmsPermissionGroup: FmsPermissionGroup;
}

