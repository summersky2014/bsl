import * as React from 'react';
import { Link } from 'react-router-dom';
import PageComponent from '../../app/PageComponent';
// import App from '../../app/App';
import model from './model';

interface State {
  count: number;
}

interface Props {
  count: number;
}

// interface Test {
//   a: {
//     b: {
//       c: string;
//     }
//   };
// }

// const immutable: ObObject<Test> = new ObObject({
//   defaultValue: {
//     a: {
//       b: {
//         c: '1'
//       }
//     }
//   }
// });
// const variable = {
//   a: {
//     b: {
//       c: '1'
//     }
//   }
// };
// const test = immutable.get();
// if (test) {
//   test.a.b.c = '2';
// }
// variable.a.b.c = '2';

const Count = (props: Props) => {
  // return (
  //   <Context.Consumer>
  //     {() => {
  //       console.log('count Consumer');
  //       return <div>{props.count}</div>;
  //     }}
  //   </Context.Consumer>
  // );
  return <div>{props.count}</div>;
};

class A extends PageComponent<any, State, any> {
  constructor(props: any, state: State) {
    super(props, state);
    this.init();
  }

  public state: State = {
    count: 0
  };

  // public componentDidMount(): void {
  //   console.log('componentDidMount, A页面进入了');
  //   setInterval(() => {
  //     // this.setState({
  //     //   count: this.state.count + 1
  //     // });
  //     model.num.value++;
  //     if (App.dispatch) {
  //       App.dispatch();
  //     }
  //   }, 1000);
  // }

  public pageLeave(): void {
    console.log('A页面离开了');
  }

  public pageEnter(): void {
    console.log('A页面进入了');
  }

  public pageRender(): JSX.Element {
    return (
      <div>
        <Link to="/a">A to A</Link>
          <Count count={model.num.value} />
          <Link to="/b">A to B</Link>
          <div>
            <div>11111111111111</div>
            <div>22222222222222</div>
            <div>33333333333333</div>
            <div>4444444444444444</div>
          </div>
          <br/>
        <Link to="/c" replace>A replace C</Link>
      </div>
    );
  }
}

export default A as any;