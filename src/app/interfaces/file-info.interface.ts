import { YN } from "../types/yn.type";

interface FmsFileStatusCodes {
  code: string;
  codeName: string;
}

export interface FileInfo {
  fileKey?: string;
  fileLabelName?: string;
  fileMemo?: string;
  fileDescription?: string;
  fileStoreVersionHistoryOpen?: YN;
  fileStoreDescriptionOpen?: YN;
  fileStatus?: string;
  FmsFileStatusCodes?: FmsFileStatusCodes;
}
