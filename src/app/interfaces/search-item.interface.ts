import { SearchType } from "../types/search-type.type";
import { CheckboxItem } from "./checkbox-item.interface";

export interface SearchItem {
  uniqueID: string;
  searchType: SearchType;
  itemTitle: string;
  currentValue?: string;

  startDatetime?: string;
  endDatetime?: string;

  startNumber?: number;
  endNumber?: number;

  checkboxItemList?: CheckboxItem[];
}