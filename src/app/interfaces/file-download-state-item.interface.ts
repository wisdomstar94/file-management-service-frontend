import { FileDownloadUrlKeyItem } from "./file-download-url-key-item";

export interface FileDownloadStateItem {
  downloadTargetUserKey: string;
  downloadTargetUserId: string;
  downloadTargetUserCompanyName: string;
  fileDownloadUrlKeyGroupingList: FileDownloadUrlKeyItem[];
  isChecked?: boolean;
}
