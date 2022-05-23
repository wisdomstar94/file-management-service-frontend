export interface CardInfo {
  id: string;
  bgColor: string;
  mainTitle: string;
  mainIconSvg: string;
  mainResult: number;
  resultUnit: string;
  subTitle: string;
  subResult: number;
  subUnit?: string;
  isRefreshing: boolean;
  startRefresh: () => void;
}
