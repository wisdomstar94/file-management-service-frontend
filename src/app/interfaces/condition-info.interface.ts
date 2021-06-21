interface FmsFileDownloadAccessConditionTypeCodes {
  code: string;
  codeName: string;
}

interface FmsFileDownloadAccessConditionStatusCodes {
  code: string;
  codeName: string;
}

export interface ConditionInfo {
  fileAccessConditionKey: string;
  fileDownloadUrlKey: string;
  conditionType: string;
  key: string;
  value: string;
  createdAt: string;
  createrUserKey: string;
  updatedAt: string;
  updaterUserKey: string;
  conditionStatus: string;
  FmsFileDownloadAccessConditionTypeCodes: FmsFileDownloadAccessConditionTypeCodes;
  FmsFileDownloadAccessConditionStatusCodes: FmsFileDownloadAccessConditionStatusCodes;
}
