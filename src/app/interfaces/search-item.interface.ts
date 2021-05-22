import { SearchType } from "../types/search-type.type";

export interface SearchItem {
  uniqueID: string;
  searchType: SearchType;
  itemTitle: string;
  currentValue?: string;
  startDatetime?: string;
  endDatetime?: string;
}