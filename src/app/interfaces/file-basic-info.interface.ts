import { YN } from "../types/yn.type";
import { FileImageItem } from "./file-image-item.interface";
import { FileInfo } from "./file-info.interface";

export interface FileBasicInfo {
  fileInfo: FileInfo;
  fileScreenShotImageInfo: FileImageItem[];
  fileRepresentImageInfo: FileImageItem[];
}
