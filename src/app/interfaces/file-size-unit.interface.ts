import { FileSizeType } from "../types/file-size-type.type";

export interface FileSizeUnit {
  size: number;
  sizeToFixed: string;
  unit: FileSizeType;
}