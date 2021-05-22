import { NavMenuInMenuItem } from "./nav-menu-in-menu-item.interface";

export interface NavMenuItem {
  menuCategoryKey: string;
  menuCategoryName: string;
  menuList: NavMenuInMenuItem[];
}
