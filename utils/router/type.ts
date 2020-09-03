import isEmpty from '../is/isEmpty';

/** 格式：_序号_名称
 * true: 必选
 * false: 可选
 */
// const match = {
//   '_1_symbol': true,
//   '_2_date': false
// } as const;

type O<T, K extends keyof T> = T[K] extends true ? string : string | null;
type Optional<T> = {
  [K in keyof T]: O<T, K>;
}
export type Match<T> = Record<keyof T, string>;

export default function create<T>(match: T) {
  const linkParams = (params: Optional<T>) => {
    const keys = Object.keys(match);
    const routeParams = [];
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i] as keyof T;
      if (isEmpty(params[k]) === false) {
        routeParams.push(encodeURIComponent(params[k]!));
      }
    }
    return routeParams;
  };
  /** 路由参数名称及顺序，这个可以不用改 */
  const pathParams = Object.keys(match).map((key) => `${key}${match[key as keyof typeof match] ? '' : '?'}`);

  return {
    linkParams,
    pathParams
  };
}