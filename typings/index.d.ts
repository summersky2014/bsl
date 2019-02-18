/// <reference path="./module.d.ts" />

import { RouteComponentProps } from 'react-router';
import { Location } from 'history';

declare namespace BSL {
  /** 运行时的环境变量 */
  type Env = 'development' | 'production' | 'prerelease';
  type RequestStatus = 'start' | 'end' | undefined;
  type OnClick<T> = (e: React.MouseEvent<T>, ...args: any[]) => void;
  
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
}

export default BSL;