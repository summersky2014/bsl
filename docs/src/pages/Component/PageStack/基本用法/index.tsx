import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, RouteComponentProps, Switch } from 'react-router-dom';
import AppStack from '../../../../../../app/PageStack';
import { Context, Subscription } from '../../../../../../app/Scheduler';
import TabBar from '../../../../../../components/TabBar';
import A from './A';
import B from './B';
import C from './C';

const tabData = [{
  icon: '',
  pathname: '/',
  id: 'A'
}, {
  icon: '',
  pathname: '/b',
  id: 'B'
}, {
  icon: '',
  pathname: '/c',
  id: 'C'
}];

function AppTabBar(props: RouteComponentProps) {
  return (
    <TabBar {...props} data={tabData} />
  );
}

class App extends React.Component {
  public render(): JSX.Element {
    return (
      <Subscription source={{}}>
        {(value: Record<string, unknown>) => (
          <Context.Provider value={value}>
            <HashRouter>
              <AppStack>
                <Route exact key="a" path="/" component={A} />
                <Route exact key="b" path="/b" component={B} />
                <Route exact key="c" path="/c" component={C} />
              </AppStack>
            </HashRouter>
            <HashRouter>
              <Switch>
                <Route exact key="a" path="/" component={AppTabBar} />
                <Route exact key="b" path="/b" component={AppTabBar} />
                <Route exact key="c" path="/c" component={AppTabBar} />
              </Switch>
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
