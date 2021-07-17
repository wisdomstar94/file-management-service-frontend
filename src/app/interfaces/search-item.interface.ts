import { SearchType } from "../types/search-type.type";
import { CheckboxItem } from "./checkbox-item.interface";
import { SelectItem } from "./select-item.interface";

export interface SearchItem {
  uniqueID: string;
  searchType: SearchType;
  itemTitle: string;
  currentValue?: string;
  marginRight?: string;

  startDatetime?: string;
  endDatetime?: string;
  oneDatetime?: string;

  startNumber?: number;
  endNumber?: number;

  startYear?: string;
  startMonth?: string;
  endYear?: string;
  endMonth?: string;
  endLastDate?: string;

  checkboxItemList?: CheckboxItem[];

  selectItems?: SelectItem[];
}