import * as React from 'react';
import { Route } from 'react-router-dom';

export interface RoutesConifg {
  base: string;
  /** 按照参数顺序排序 */
  pathParams?: string[];
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
      item.pathParams.forEach((k, i) => {
        pathParamsKeyArr[i] = k.toString();
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
