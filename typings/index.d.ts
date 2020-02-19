/// <reference path="./module.d.ts" />

import { RouteComponentProps } from 'react-router';
import { Location } from 'history';

declare namespace BSL {
  /** 运行时的环境变量 */
  type Env = 'development' | 'production' | 'prerelease';
  /** 状态类型 */
  type RequestState = 'complete' | 'empty' | 'fail'  | 'loading' | 'timeout' | 'undefined';
  type OnClick<T> = (e: React.MouseEvent<T>, ...args: any[]) => void;
  /** 响应码 */
  type ResponseCode = (
    /** 请求成功，对应complete状态 */
    200 |
    /** 未登录 */
    401 |
    /** 无权限 */
    403 |
    /** 数据为空，对应empty状态 */
    404 |
    /** 请求超时, 对应timeout状态 */
    408 |
    /** 请求失败，对应fail状态 */
    500
  );

  interface PageProps<Match> {
    match: RouteComponentProps<Match>['match'];
    location: Location;
  }

  interface ComponentProps {
    /** 组件根元素的类名 */
    className?: string;
    /** 组件根元素的id */
    id?: string;
    /** 组件根元素的样式 */
    style?: React.CSSProperties;
  }

  /** 请求的响应结构 */
  interface RequestResponse<T> {
    data: T;
    code: ResponseCode;
    msg: string;
    /** 缓存数据的key */
    cacheKey?: string;
  }
}

export default BSL;