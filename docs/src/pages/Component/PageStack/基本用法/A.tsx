import * as React from 'react';
import PageComponent from '../../../../../../app/PageComponent';
import Link from '../../../../../../components/Link';
import setDocumetTitle from '../../../../../../utils/setDocumentTitle';

interface State {
  status: string;
  count: number;
}

class A extends PageComponent<any, State> {
  constructor(props: Record<string, unknown>, state: State) {
    super(props, state);
    this.init();
  }

  public state: State = {
    status: '',
    count: 0
  };

  public didMount(): void {
    setDocumetTitle('A');
    this.setState({
      status: 'init'
    });
    setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1000);
  }

  // public pageEnter() {
  //   console.log('pageEnter');
  // }

  public pageRender(): JSX.Element {
    // push新路由后，render函数不会被触发
    return (
      <div>
        <div id="count">{this.state.count}</div>
        <div id="Astatus">status: {this.state.status}</div>
        <Link id="linkToB" to="/b">A to B</Link>
        <br/>
        <Link id="linkToC" to="/c">A to C</Link>
      </div>
    );
  }
}

export default A;