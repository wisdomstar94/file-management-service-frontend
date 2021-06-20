import { FileImageInfoType } from "../types/file-image-info-type.type";

export interface FileImageInfo {
  infoType: FileImageInfoType;
  fileImageKey: string;
  sortNo: number;
}