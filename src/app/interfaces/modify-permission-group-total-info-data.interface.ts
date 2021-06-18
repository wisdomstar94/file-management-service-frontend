import { PermissionKeyItem } from "./permission-key-item.interface";

export interface ModifyPermissionGroupTotalInfoData {
  permissionGroupKey?: string;
  permissionKeyInfo?: PermissionKeyItem[];

  permissionGroupName?: string;
  permissionGroupDescription?: string;
  permissionGroupStatus?: string;
}
