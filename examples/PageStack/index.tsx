import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, HashRouter } from 'react-router-dom';
import { Subscription, Context } from '../../app/Scheduler';
import AppStack from '../../app/PageStack';
import A from './A';
import B from './B';
import C from './C';

class App extends React.Component {
  public render(): JSX.Element {
    return (
      <Subscription source={{}}>
        {(value: object) => (
          <Context.Provider value={value}>
            <HashRouter>
              <AppStack>
                <Route exact key="a" path="/" component={A} />
                <Route exact key="aa" path="/a" component={A} />
                <Route exact key="b" path="/b" component={B} />
                <Route exact key="c" path="/c" component={C} />
              </AppStack>
            </HashRouter>
          </Context.Provider>
        )}
      </Subscription>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
