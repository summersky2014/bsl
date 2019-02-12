/// <reference path="../../typings/index.d.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as style from './App.scss';
import { Route, HashRouter } from 'react-router-dom';
import { Subscription, Context } from '../../app/core';
import menuConfig from './config/menus';
import AppStack from '../../app/PageStack';
import Alert from 'antd/lib/alert';
// import Menu from './components/Menu';

const menu: JSX.Element[] = [];
const isGridSupports: boolean = CSS.supports('display', 'grid');
menuConfig.forEach((item) => {
  if (item.children) {
    item.children.forEach((sub) => {
      menu.push(<Route exact key={sub.path} path={sub.path} component={sub.component} />);
    });
  } else {
    menu.push(<Route exact key={item.path} path={item.path} component={item.component} />);
  }
});

const App = () => (
  <React.Fragment>
    {isGridSupports !== true ? (
      <Alert
        banner
        message="浏览器版本过低，推荐使用chrome 57以上的浏览器"
        type="error"
        showIcon={false}
        style={{ textAlign: 'center' }}
      />
    ) : null}
    <div className={style.container}>
    {/* <HashRouter>
      <Route key="首页" component={Menu} />
    </HashRouter> */}
    <div className={style.main}>
      <div className={style.content}>
        <Subscription source={{}}>
          {(value: object) => (
            <Context.Provider value={value}>
              <HashRouter>
                <AppStack>{menu}</AppStack>
              </HashRouter>
            </Context.Provider>
          )}
        </Subscription>
      </div>
    </div>
  </div>
  </React.Fragment>
);
// class App extends React.Component {

//   private isGridSupports: boolean = CSS.supports('display', 'grid');

//   public render(): JSX.Element {
//     return (
//       <React.Fragment>
//         {this.isGridSupports !== true ? (
//           <Alert
//             banner
//             message="浏览器版本过低，推荐使用chrome 57以上的浏览器"
//             type="error"
//             showIcon={false}
//             style={{ textAlign: 'center' }}
//           />
//         ) : null}
//         <div className={style.container}>
//         <HashRouter>
//           <Route key="首页" component={Menu} />
//         </HashRouter>
//         <div className={style.main}>
//           <div className={style.content}>
//             <Subscription source={{}}>
//               {(value: object) => (
//                 <Context.Provider value={value}>
//                   <HashRouter>
//                     <AppStack>{menu}</AppStack>
//                   </HashRouter>
//                 </Context.Provider>
//               )}
//             </Subscription>
//           </div>
//         </div>
//       </div>
//       </React.Fragment>
//     );
//   }
// }

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
