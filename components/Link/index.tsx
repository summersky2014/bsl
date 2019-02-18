import BSL from '../../typings';
import * as React from 'react';
import { appData } from '../../app/core';

export interface Props extends BSL.ComponentProps {
  /** 前往的页面 */
  to: string;
  /** 是否替换当前路由 */
  replace?: boolean;
  /** 路由跳转前执行 */
  onBefore?: (beforePathname: string, afterPathname: string) => void;
  /** 路由跳转后执行 */
  onAfter?: (beforePathname: string, afterPathname: string) => void;
  children?: any;
}

function link(url: string, replace: boolean): void {
  if (appData.history!.location.pathname !== url) {
    if (replace) {
      appData.history!.replace(url);
    } else {
      appData.history!.push(url);
    }
  }
}

const Link = (props: Props) => {
  const { className, style, id, children, to, replace, onBefore, onAfter } = props;
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
          link(to, true);
        } else {
          link(to, false);
        }

        if (onAfter) {
          onAfter(pathname, to);
        }
      }}
    >{children}</div>
  );
};

Link.go = function(url: string): void {
  link(url, false);
};
Link.replace = function(url: string): void {
  link(url, true);
};
Link.goBack = function(): void {
  appData.history!.goBack();
};

export default Link;