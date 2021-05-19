import { NavMenuInMenuItem } from "./nav-menu-in-menu-item";

export interface NavMenuItem {
  menuCategoryKey: string;
  menuCategoryName: string;
  menuList: NavMenuInMenuItem[];
}
