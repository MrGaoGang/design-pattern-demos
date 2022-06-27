import { AbstractPromoteCenterReportFactory } from "../abstract-factory";
import { PromoteBaseClickReport, PromoteBaseEnterReport } from "../report";
import { AbstractReport } from "../../base/base-report";

export interface AbstractSearchCardReportParams {
  promote_scene: string;
  search_key?: string;
  start_page?: string;
}

interface AbstractSearchCardReport
  extends AbstractReport<AbstractSearchCardReportParams> {}

//   针对卡片点击上报
class ConcreteSearchCardClickReport
  extends PromoteBaseClickReport<AbstractSearchCardReportParams>
  implements AbstractSearchCardReport
{
  constructor(params?: AbstractSearchCardReportParams) {
    super(params);
    //  TODO 处理 针对【搜索卡片进入推广中心】【点击上报】的特殊params
  }
}
// 进入推广中心的上报
class ConcreteSearchCardEnterReport
  extends PromoteBaseEnterReport<AbstractSearchCardReportParams>
  implements AbstractSearchCardReport
{
  constructor(params?: AbstractSearchCardReportParams) {
    super(params);
    //  TODO 处理 针对【搜索卡片进入推广中心】【初始化上报】的特殊params
  }
}

/**
 * 搜索卡片进入场景的实现工厂
 */
export class ConcreteSearchCardReportFactory
  implements AbstractPromoteCenterReportFactory<AbstractSearchCardReportParams>
{
  createPromoteCenterReport(): ConcreteSearchCardEnterReport {
    return new ConcreteSearchCardEnterReport();
  }
  createPromoteClickReport(): ConcreteSearchCardClickReport {
    return new ConcreteSearchCardClickReport();
  }
}
