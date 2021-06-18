import { PermissionItem } from "./permission-item.interface";

export interface PermissionGrouppingItem {
  menuKey: string;
  menuName: string;
  permissionList: PermissionItem[];
}