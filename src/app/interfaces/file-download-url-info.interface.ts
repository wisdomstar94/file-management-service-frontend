import { YN } from "../types/yn.type";

interface FmsFileDownloadUrlTargetUsers {
  userKey: string;
  userId: string;
  userName: string;
}

interface FmsTargetFiles {
  fileKey: string;
  fileLabelName: string;
}

interface FmsTargetFileVersions {
  fileVersionKey: string;
  fileKey: string;
  fileVersionName: string;
  fileVersionCode: string;
  fileDownloadName: string;
}

interface FmsCreaterUsers {
  userKey: string;
  userId: string;
  userName: string;
}

interface FmsUpdaterUsers {
  userKey: string;
  userId: string;
  userName: string;
}

interface FmsFileDownloadUrlStatusCodes {
  code: string;
  codeName: string;
}

export interface FileDownloadUrlInfo {
  fileDownloadUrlKey?: string;
  downloadTargetUserKey?: string;
  fileKey?: string;
  fileVersionKey?: string;
  fileDownloadUrlAccessCount?: string;
  fileDownloadPossibleDateTimeStart?: string;
  fileDownloadPossibleDateTimeEnd?: string;
  fileDownloadLimitMaxCount?: string;
  fileDownloadCount?: string;
  isPossibleDatetimeShow?: YN;
  isDownloadCountInfoShow?: YN;
  createdAt?: string;
  createdIp?: string;
  createrUserKey?: string;
  updatedAt?: string;
  updatedIp?: string;
  updaterUserKey?: string;
  fileDownloadUrlStatus?: string;
  FmsFileDownloadUrlTargetUsers?: FmsFileDownloadUrlTargetUsers;
  FmsTargetFiles?: FmsTargetFiles;
  FmsTargetFileVersions?: FmsTargetFileVersions;
  FmsCreaterUsers?: FmsCreaterUsers;
  FmsUpdaterUsers?: FmsUpdaterUsers;
  FmsFileDownloadUrlStatusCodes?: FmsFileDownloadUrlStatusCodes;
}
