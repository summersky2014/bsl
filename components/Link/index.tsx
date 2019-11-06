import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
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
  /** 是否在一个新的标签页打开 */
  newPage?: boolean;
}

export interface Params {
  url: string;
  replace: boolean;
  query?: (string | number)[];
  newPage?: boolean;
}

function link(params: Params): void {
  const { url, replace, query, newPage } = params;
  const qsurl = query ? `${url}/${query.join('/')}` : url;
  if (appData.history?.location.pathname !== qsurl) {
    if (newPage) {
      window.open(qsurl, '_blank');
    } else {
      if (replace) {
        appData.history!.replace(qsurl);
      } else {
        appData.history!.push(qsurl);
      }
    }
  }
}

const prefixCls = 'bsl-link';
const Link = (props: Props) => {
  const { className, style, id, children, to, replace, onBefore, onAfter, query, newPage } = props;
  return (
    <div
      className={classNames(prefixCls, className)}
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
          link({ url: to, replace: true, query, newPage });
        } else {
          link({ url: to, replace: false, query, newPage });
        }

        if (onAfter) {
          onAfter(pathname, to);
        }
      }}
    >{children}</div>
  );
};

Link.go = function(params: Omit<Params, 'replace'>): void {
  link({ ...params, replace: false });
};
Link.replace = function(params: Omit<Omit<Params, 'replace'>, 'newPage'>): void {
  link({ ...params, replace: true });
};
Link.goBack = function(): void {
  appData.history!.goBack();
};

export default Link;