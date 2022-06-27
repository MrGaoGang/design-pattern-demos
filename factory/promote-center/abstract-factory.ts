import { PromoteBaseClickReport, PromoteBaseEnterReport } from "./report";

export interface AbstractPromoteCenterReportFactory<T extends object> {
  /**
   * 推广中心曝光
   */
  createPromoteCenterReport(): PromoteBaseEnterReport<T>;
  /**
   * 创建从搜索卡片进入的场景
   */
  createPromoteClickReport(): PromoteBaseClickReport<T>;
}


