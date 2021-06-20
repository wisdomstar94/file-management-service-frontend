interface FmsFiles {
  fileKey: string;
  fileLabelName: string;
}

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


export interface FileVersionInfo {
  fileVersionKey?: string;
  fileKey?: string;
  fileVersionName?: string;
  fileVersionCode?: string;
  fileOriginalName?: string;
  fileDownloadName?: string;
  fileVersionMemo?: string;
  fileVersionDescription?: string;
  filePath?: string;
  fileSize?: number;
  fileMimeType?: string;
  createrUserKey?: string;
  createdAt?: string;
  createdIp?: string;
  updaterUserKey?: string;
  updatedAt?: string;
  updatedIp?: string;
  fileVersionStatus?: string;
  FmsFiles?: FmsFiles;
  FmsCreaterUsers?: FmsCreaterUsers;
  FmsUpdaterUsers?: FmsUpdaterUsers;
  FmsFileVersionStatusCodes?: FmsFileVersionStatusCodes;
}