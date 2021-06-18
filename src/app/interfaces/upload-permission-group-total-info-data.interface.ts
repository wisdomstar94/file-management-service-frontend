import { PermissionKeyItem } from "./permission-key-item.interface";

export interface UploadPermissionGroupTotalInfoData {
  permissionKeyInfo: PermissionKeyItem[];

  permissionGroupName: string;
  permissionGroupDescription: string;
  permissionGroupStatus: string;
}
