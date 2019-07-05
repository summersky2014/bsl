import * as React from 'react';
import PageComponent from '../app/PageComponent';
import { Route } from 'react-router-dom';

export interface RoutesConifg {
  [name: string]: {
    base: string;
    pathParams?: string;
    linkParams?: (string | number)[];
    component: typeof PageComponent;
  };
}

export default function(config: RoutesConifg) {
  const routes: JSX.Element[] = [];
  Object.keys(config).forEach((key) => {
    const item = config[key];
    const component = item.component as any as React.ComponentClass<any>;
    routes.push(
      <Route exact key={key} path={item.base + item.pathParams || ''} component={component} />
    );
  });

  return routes;
}
