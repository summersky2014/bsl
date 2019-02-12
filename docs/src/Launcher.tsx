/// <reference path="../../typings/index.d.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, HashRouter } from 'react-router-dom';
import { Subscription, Context } from '../../app/core';
import App from '../../app/App';
import Home from './Home';

class Launcher extends React.Component {
  public render(): JSX.Element {
    return (
      <Subscription source={{}}>
        {(value: object) => (
          <Context.Provider value={value}>
            <HashRouter>
              <App>
                <Route exact key="Home" path="/" component={Home} />
              </App>
            </HashRouter>
          </Context.Provider>
        )}
      </Subscription>
    );
  }
}

ReactDOM.render(
  <Launcher />,
  document.getElementById('root')
);
