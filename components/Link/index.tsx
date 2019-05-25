import BSL from '../../typings';
import * as React from 'react';
import { appData } from '../../app/core';

export interface Props extends BSL.ComponentProps {
  /** 前往的页面 */
  to: string;
  /** 是否替换当前路由 */
  replace?: boolean;
  children?: any;
  /** 页面参数 */
  query?: (string | number)[];
  /** 路由跳转前执行 */
  onBefore?: (beforePathname: string, afterPathname: string) => void;
  /** 路由跳转后执行 */
  onAfter?: (beforePathname: string, afterPathname: string) => void;
}

function link(url: string, replace: boolean, query?: (string | number)[]): void {
  const qsurl = query ? `${url}/${query.join('/')}` : url;
  if (appData.history!.location.pathname !== qsurl) {
    if (replace) {
      appData.history!.replace(qsurl);
    } else {
      appData.history!.push(qsurl);
    }
  }
}

const Link = (props: Props) => {
  const { className, style, id, children, to, replace, onBefore, onAfter, query } = props;
  return (
    <div
      className={className}
      style={style}
      id={id}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const pathname = appData.history!.location.pathname;

        if (onBefore) {
          onBefore(pathname, to);
        }

        if (replace) {
          link(to, true, query);
        } else {
          link(to, false, query);
        }

        if (onAfter) {
          onAfter(pathname, to);
        }
      }}
    >{children}</div>
  );
};

Link.go = function(url: string, query?: (string | number)[]): void {
  link(url, false, query);
};
Link.replace = function(url: string, query?: (string | number)[]): void {
  link(url, true, query);
};
Link.goBack = function(): void {
  appData.history!.goBack();
};

export default Link;