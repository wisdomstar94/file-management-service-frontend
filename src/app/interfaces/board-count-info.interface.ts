import { PageItem } from "./page-item.interface";

export interface BoardCountInfo {
  isNextExist: boolean;
  isPrevExist: boolean;
  lastPageNum: number;
  nextPage: number;
  prevPage: number;
  showPages: PageItem[];
}