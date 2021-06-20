import { YN } from "../types/yn.type";

export interface ModifyFileBasicInfoData {
  fileKey: string;
  fileLabelName?: string;
  fileMemo?: string;
  fileDescription?: string;
  fileScreenShot?: any;
  fileImageScreenShotInfoJsonString?: string;
  fileRepresentImage?: any;
  fileImageRepresentInfoJsonString?: string;
  fileStoreVersionHistoryOpen?: YN;
  fileStoreDescriptionOpen?: YN;
  fileStatus?: string;
}
