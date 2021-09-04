import { IpInfo } from "./ip-info";

export interface FileDownloadUrlLogItem {
  fileDownloadUrlKey: string;
  fileLabelNameLogAt: string;
  fileVersionCodeLogAt: number;
  fileVersionNameLogAt: string;
  fileDownloadNameLogAt: string;
  createdIp: string;
  createdIpInfo: IpInfo;
  createdAt: string;
}
