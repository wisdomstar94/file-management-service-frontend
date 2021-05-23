import { CodeItem } from "./code-item.interface";

export interface ColumnDataItem {
  columnVariable: string;
  columnValue: string | CodeItem;
}
