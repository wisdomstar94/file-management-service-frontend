import { FileVersionHistoryItem } from "./file-version-history-item.intreface";

export interface FileNormalInfo {
  fileDownloadName: string;
  fileSize: number;
  fileMimeType: string;
  requirePassword: boolean;
  fileVersionHistoryList: FileVersionHistoryItem[];
  fileDescription: string;
}