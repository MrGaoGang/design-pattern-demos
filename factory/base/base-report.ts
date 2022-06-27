function getQueryParams(params?: any): any {
  return {};
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