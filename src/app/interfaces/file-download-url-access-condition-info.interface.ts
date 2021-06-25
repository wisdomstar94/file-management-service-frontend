import { ConditionInfoType } from "../types/condition-info-type.type";

export interface FileDownloadUrlAccessConditionInfo {
  fileAccessConditionKey: string;
  key: string;
  value: string;
  type: ConditionInfoType;
  conditionStatus: string;

  conditionTypeName?: string;
  conditionType?: string;
}