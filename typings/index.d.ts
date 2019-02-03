/// <reference path="./module.d.ts" />
/// <reference path="./lodash/index.d.ts" />

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
    className?: string;
    id?: string;
    style?: React.CSSProperties;
  }
}

export default BSL;