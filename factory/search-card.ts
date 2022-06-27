import { AbstractReport, BaseReport } from "./report-factory";
export interface AbstractSearchCardReportParams {
  promote_scene: string;
  search_key?: string;
  start_page?: string;
}

export interface AbstractSearchCardReport
  extends AbstractReport<AbstractSearchCardReportParams> {}

export class ConcreteSearchCardReport extends BaseReport<AbstractSearchCardReportParams> {
  constructor(params?: AbstractSearchCardReportParams) {
    super(params);
    //  TODO 处理 特殊params
  }
}
