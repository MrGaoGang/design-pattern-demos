// 同学1给的
interface FilterParams {
  // 字段名称
  key: string;
  // 字段值
  value: string;
  // ...
}
// 同学2给的
interface InitFilter {
  // 字段名称
  filterKey: string;
  // 字段值
  filterValue: string;
  // ...
}
// 同学2给到的
interface GlobalFilter {
  // 字段名称
  globalKey: string;
  // 字段值
  globalValue: string;
  // ...
}
// 筛选区域
const filter: Array<FilterParams> = [...];
// 初始化筛选条件
const initFilter: Array<InitFilter> = [...];
// 全局筛选条件
const globalFilter: Array<GlobalFilter> = [...];
type AnyObject = {
  [key: string]: any;
};
// 用户需求，走筛选区域 filter + initFilter 组合，走全局搜索 走 globalFilter + initFilter组合

// 传统编写代码的方式
// 可能接口请求参数 来源与不同的地方
const axiosConfig = {
  method: inputConfig.method,
  url: urlConfig.url,
  params: params,
};

const params: AnyObject = {};
initFilter.forEach((ele) => {
  params[ele.filterKey] = ele.filterValue;
});
if (globalFilter.length > 0) {
  globalFilter.forEach((ele) => {
    params[ele.globalKey] = ele.globalValue;
  });
} else {
  filter.forEach((ele) => {
    params[ele.key] = ele.value;
  });
}
axiosConfig.params = params;
axios.request(axiosConfig);

interface TableQueryParams {
  // 筛选区域
  filter: Array<FilterParams>;
  // 初始化筛选条件
  initFilter: Array<InitFilter>;
  // 全局筛选条件
  globalFilter: Array<GlobalFilter>;
}

class TableAxiosParamsBuilder {
  private axiosConfig: AxiosConfig;
  private filterParams: AnyObject;
  private globalParams: AnyObject;
  private initParams: AnyObject;

  constructor() {
    this.axiosConfig = {};
    this.filterParams = {};
    this.globalParams = {};
    this.initParams = {};
  }
  seUrl(url: string) {
    this.axiosConfig.url = url;
    return this;
  }
  setMethod(method: string) {
    this.axiosConfig.method = method;
    return this;
  }
  setFilter(filter: Array<FilterParams>) {
    filter.forEach((ele) => {
      this.filterParams[ele.key] = ele.value;
    });
    return this;
  }
  setGloablFilter(filter: Array<GlobalFilter>) {
    filter.forEach((ele) => {
      this.globalParams[ele.globalKey] = ele.globalKey;
    });
    return this;
  }
  setInitFilter(filter: Array<InitFilter>) {
    filter.forEach((ele) => {
      this.initParams[ele.filterKey] = ele.filterValue;
    });
    return this;
  }
  private buildGloablParams() {
    return {
      ...this.initParams,
      ...this.globalParams,
    };
  }

  private buildFilterParams() {
    return {
      ...this.initParams,
      ...this.filterParams,
    };
  }
  build() {
    if (Object.keys(this.globalParams).length > 0) {
      return {
        ...this.axiosConfig,
        params: this.buildGloablParams(),
      };
    } else {
      return {
        ...this.axiosConfig,
        params: this.buildFilterParams(),
      };
    }
  }
}


const builder = new TableAxiosParamsBuilder();
builder
    .seUrl(urlConfig.url)
    .setMethod(inputConfig.method)
    .setGloablFilter(globalFilter)
    .setInitFilter(initFilter)
    .setFilter(filter)

axios.request(builder.build())