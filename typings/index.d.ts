/// <reference path="./module.d.ts" />

import { RouteComponentProps } from 'react-router';
import { Location } from 'history';

declare namespace BSL {
  /** 运行时的环境变量 */
  type Env = 'development' | 'production' | 'prerelease';
  type RequestStatus = 'start' | 'end' | undefined;
  type OnClick<T> = (e: React.MouseEvent<T>, ...args: any[]) => void;
  /** 响应码 */
  type ResponseCode = (
    /** 请求成功，对应complete状态 */
    200 |
    /** 数据为空，对应empty状态 */
    404 |
    /** 请求超时, 对应timeout状态 */
    408 |
    /** 请求失败，对应fail状态 */
    500
  );

  interface PageProps<Match>  {
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
  interface RequestResponse {
    data: any;
    code: ResponseCode;
    msg: string;
  }
}

export default BSL;