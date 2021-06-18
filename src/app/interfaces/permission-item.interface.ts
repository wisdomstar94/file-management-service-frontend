import { YN } from "../types/yn.type";

interface FmsMenu {
  menuKey: string;
  menuName: string;
}

export interface PermissionItem {
  seq: number;
  menuKey: string;
  FmsMenu: FmsMenu;
  permissionKey: string;
  isActive?: YN;
  isChecked?: boolean;
  permissionName: string;
  permissionDescription: string;
  sortNo: number;
  createdAt: string;
}
