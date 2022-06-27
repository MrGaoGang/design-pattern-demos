import { BaseReport } from "../base/base-report";
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
