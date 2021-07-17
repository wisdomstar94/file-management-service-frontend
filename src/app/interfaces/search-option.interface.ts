import { SearchItem } from "./search-item.interface";

export interface SearchOption {
  companySearchItemList: SearchItem[];
  fileSearchItemList: SearchItem[];
  permissionGroupSearchItemList: SearchItem[];
  userSearchItemList: SearchItem[];
}