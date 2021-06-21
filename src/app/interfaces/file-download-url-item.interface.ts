interface FmsFileDownloadUrlTargetUsers {
  userKey: string;
  userId: string;
}

interface FmsTargetFileVersions {
  fileVersionKey: string;
  fileVersionName: string;
}

interface FmsFileDownloadUrlStatusCodes {
  code: string;
  codeName: string;
}

interface FmsFileDownloadAccessConditionTypeCodes {
  code: string;
  codeName: string;
}

interface Conditions {
  conditionType: string;
  FmsFileDownloadAccessConditionTypeCodes: FmsFileDownloadAccessConditionTypeCodes;
}

export interface FileDownloadUrlItem {
  seq?: number;
  fileDownloadUrlKey?: string;
  downloadTargetUserKey?: string;
  fileVersionKey?: string | null;
  fileDownloadUrlAccessCount?: number;
  fileDownloadPossibleDateTimeStart?: string;
  fileDownloadPossibleDateTimeEnd?: string;
  fileDownloadLimitMaxCount?: number;
  fileDownloadCount?: number;
  createdAt?: string;
  fileDownloadUrlStatus?: string;
  FmsFileDownloadUrlTargetUsers?: FmsFileDownloadUrlTargetUsers;
  FmsTargetFileVersions?: FmsTargetFileVersions;
  FmsFileDownloadUrlStatusCodes?: FmsFileDownloadUrlStatusCodes;
  conditions?: Conditions[];
  isChecked?: boolean;
}
