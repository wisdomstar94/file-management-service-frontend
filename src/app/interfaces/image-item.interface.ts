export interface ImageItem {
  imageKey: string;
  imageUrl: string | ArrayBuffer;
  sortNo: number;
  file?: File;
  isShowSortControlBar?: boolean;
  isDeleted?: boolean;
}