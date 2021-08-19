interface FmsCreaterUsers {
  userKey: string;
  userId: string;
}

interface FmsUpdaterUsers {
  userKey: string;
  userId: string;
}

interface FmsFileVersionStatusCodes {
  code: string;
  codeName: string;
}

export interface FileVersionItem {
  fileVersionKey?: string;
  fileVersionName?: string;
  fileVersionCode?: number;
  fileOriginalName?: string;
  fileSize?: number;
  fileDownloadName?: string;
  createrUserKey?: string;
  FmsCreaterUsers?: FmsCreaterUsers;
  createdAt?: string;
  updaterUserKey?: string;
  FmsUpdaterUsers?: FmsUpdaterUsers;
  updatedAt?: string;
  fileVersionMemo?: string;
  fileVersionDescription?: string;
  fileVersionStatus?: string;
  FmsFileVersionStatusCodes?: FmsFileVersionStatusCodes;
  isChecked?: boolean;
}
