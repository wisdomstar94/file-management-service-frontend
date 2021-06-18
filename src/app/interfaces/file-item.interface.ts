import { CodeItem } from "./code-item.interface";

interface FmsCreaterUsers {
  userKey: string;
  userId: string;
}

interface FmsFileStatusCodes {
  code: string;
  codeName: string;
}

export interface FileItem {
  seq?: number;
  fileKey?: string;
  fileLabelName?: string;
  fileMemo?: string;
  fileDescription?: string;
  recentFileVersionFileName?: string;
  recentFileVersionCreatedAt?: string;
  createdAt?: string;
  createrUserKey?: string;
  recentFileVersionCreaterUserKey?: string;
  recentFileVersionCreaterUserId?: string;
  FmsCreaterUsers?: FmsCreaterUsers;
  fileStatus?: string;
  FmsFileStatusCodes?: FmsFileStatusCodes;
  fileDownloadUrlCount?: number;

  isChecked?: boolean;
}
