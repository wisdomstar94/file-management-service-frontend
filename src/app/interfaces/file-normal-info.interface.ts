import { YN } from "../types/yn.type";
import { FileVersionHistoryItem } from "./file-version-history-item.intreface";

export interface FileNormalInfo {
  fileDownloadName: string;
  fileSize: number;
  fileMimeType: string;
  requirePassword: boolean;
  fileVersionHistoryList: FileVersionHistoryItem[];
  fileDescription: string;
  isPossibleDatetimeShow: YN;
  fileDownloadPossibleDateTimeStart?: string;
  fileDownloadPossibleDateTimeEnd?: string;
  isDownloadCountInfoShow: YN;
  fileDownloadCount?: number;
  fileDownloadLimitMaxCount?: number;
}