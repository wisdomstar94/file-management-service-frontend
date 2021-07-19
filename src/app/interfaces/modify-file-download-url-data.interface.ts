import { YN } from "../types/yn.type";
import { FileDownloadUrlAccessConditionInfo } from "./file-download-url-access-condition-info.interface";

export interface ModifyFileDownloadUrlData {
  fileDownloadUrlKey: string;
  downloadTargetUserKey?: string;
  fileVersionKey?: string;
  fileDownloadPossibleDateTimeStart?: string;
  fileDownloadPossibleDateTimeEnd?: string;
  fileDownloadLimitMaxCount?: string;
  fileDownloadCount?: string;
  fileDownloadUrlAccessConditionInfo?: FileDownloadUrlAccessConditionInfo[];
  fileDownloadUrlStatus?: string;
  isPossibleDatetimeShow?: YN;
  isDownloadCountInfoShow?: YN;
}