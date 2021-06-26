import { SearchType } from "../types/search-type.type";
import { CheckboxItem } from "./checkbox-item.interface";
import { SelectItem } from "./select-item.interface";

export interface SearchItem {
  uniqueID: string;
  searchType: SearchType;
  itemTitle: string;
  currentValue?: string;

  startDatetime?: string;
  endDatetime?: string;
  oneDatetime?: string;

  startNumber?: number;
  endNumber?: number;

  checkboxItemList?: CheckboxItem[];

  selectItems?: SelectItem[];
}