interface FileDownloadUrlKeyItem {
  fileDownloadUrlKey: string;
  fileLabelName: string;
  fileVersionName: string;
  downloadCount: number;
}

export interface FileDownloadStateItem {
  downloadTargetUserKey: string;
  downloadTargetUserId: string;
  downloadTargetUserCompanyName: string;
  fileDownloadUrlKeyGroupingList: FileDownloadUrlKeyItem[];
  isChecked?: boolean;
}
