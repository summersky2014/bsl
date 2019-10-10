import * as React from 'react';
import { Route } from 'react-router-dom';

export interface RoutesConifg {
  base: string;
  /**
   * key: 字段名称
   * value: 排序，从0开始
   */
  pathParams?: Record<string, number>;
  linkParams?: (...args: any[]) => (string | number)[];
  component: Function;
}

export default function(config: Record<string, RoutesConifg>) {
  const routes: JSX.Element[] = [];
  Object.keys(config).forEach((key) => {
    const item = config[key];
    const component = item.component as any as React.ComponentClass<any>;
    const pathParamsKeyArr: string[] = [];
    let pathParams = '';

    if (item.pathParams) {
      Object.keys(item.pathParams).forEach((k) => {
        const paramsIndex = item.pathParams![k];
        pathParamsKeyArr[paramsIndex] = k;
      });
    }

    pathParamsKeyArr.forEach((field) => {
      pathParams += '/:' + field;
    });

    routes.push(
      <Route exact key={key} path={item.base + pathParams} component={component} />
    );
  });

  return routes;
}
