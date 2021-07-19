import { YN } from "../types/yn.type";
import { FileDownloadUrlAccessConditionInfo } from "./file-download-url-access-condition-info.interface";

export interface UploadFileDownloadUrlData {
  downloadTargetUserKey: string;
  fileKey: string;
  fileVersionKey: string;
  fileDownloadPossibleDateTimeStart: string;
  fileDownloadPossibleDateTimeEnd: string;
  fileDownloadLimitMaxCount: string;
  fileDownloadUrlAccessConditionInfo?: FileDownloadUrlAccessConditionInfo[];
  fileDownloadUrlStatus: string;
  isPossibleDatetimeShow: YN;
  isDownloadCountInfoShow: YN;
}