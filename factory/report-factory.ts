function getQueryParams(params?: any): any {
  return {};
}

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

export interface AbstractReport<T extends object> {
  // 事件名称
  eventName: string;
  //   事件独立参数
  params: T;
  //   公共参数
  defaultParams: {
    // 主播id
    anchor_id: string;
    //  从哪里进入
    enter_form?: string;
    //   房间id,如果在直播的话
    room_id?: string;
    // 游戏id
    game_id?: string;
  };

  //   上报
  doReport(): void;
}

// 上报基础类
export class BaseReport<T extends object> implements AbstractReport<T> {
  constructor(params?: T) {
    const queryParams = getQueryParams(params);
    this.defaultParams = {
      anchor_id: queryParams["anchor_id"] || queryParams["user_id"],
      enter_form: queryParams["enter_from"],
      room_id: queryParams["room_id"],
      game_id: queryParams["id"],
    };
    this.eventName = "";
  }

  eventName: string;
  params!: T;
  defaultParams: {
    anchor_id: string;
    enter_form?: string | undefined;
    room_id?: string | undefined;
    game_id?: string | undefined;
  };

  doReport() {
    // 真实上报
    console.log({
      ...this.defaultParams,
      ...this.params,
    });
  }
}

// 针对推广点击的基础类
export class PromoteBaseClickReport<T extends object> extends BaseReport<T> {
  constructor(params?: T) {
    super(params);
    this.eventName = "livesdk_game_promote_anchor_promote_click";
  }
}
// 推广中心一进入的上报类
export class PromoteBaseEnterReport<T extends object> extends BaseReport<T> {
  constructor(params?: T) {
    super(params);
    this.eventName = "livesdk_game_promote_anchor_promote_hub_show";
  }
}

// 搜索卡片进入场景

// export interface AbstractSearchCardReportFactory {
//   // 推广中心曝光
// //   createPromoteCenterReport():
//   // 推广卡片点击
//   createPromoteClickReport(): AbstractSearchCardReport;
// }

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

export interface AbstractSearchCardReportParams {
  promote_scene: string;
  search_key?: string;
  start_page?: string;
}

export interface AbstractSearchCardReport
  extends AbstractReport<AbstractSearchCardReportParams> {}

//   针对卡片点击上报
export class ConcreteSearchCardClickReport
  extends PromoteBaseClickReport<AbstractSearchCardReportParams>
  implements AbstractSearchCardReport
{
  constructor(params?: AbstractSearchCardReportParams) {
    super(params);
    //  TODO 处理 针对【搜索卡片进入推广中心】【点击上报】的特殊params
  }
}
// 进入推广中心的上报
export class ConcreteSearchCardEnterReport
  extends PromoteBaseEnterReport<AbstractSearchCardReportParams>
  implements AbstractSearchCardReport
{
  constructor(params?: AbstractSearchCardReportParams) {
    super(params);
    //  TODO 处理 针对【搜索卡片进入推广中心】【初始化上报】的特殊params
  }
}

// 使用部分

const factory = new ConcreteSearchCardReportFactory();
const reporter = factory.createPromoteClickReport();
reporter.doReport();
