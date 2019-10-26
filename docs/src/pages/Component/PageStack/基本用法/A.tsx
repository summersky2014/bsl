import * as React from 'react';
import PageComponent from '../../../../../../app/PageComponent';
import Link from '../../../../../../components/Link';
import setDocumetTitle from '../../../../../../utils/setDocumetTitle/setDocumetTitle';

interface State {
  status: string;
  count: number;
}

class A extends PageComponent<any, State> {
  constructor(props: {}, state: State) {
    super(props, state);
    this.init();
  }

  public state: State = {
    status: 'init',
    count: 0
  };

  public componentDidMount(): void {
    setDocumetTitle('A');
    setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1000);
  }

  public pageEnter(): void {
    // pageEnter的执行先于页面显示，所以稍微延后一下执行
    this.setState({
      status: 'pageEnter'
    });
    document.querySelector('#Aleave')!.textContent = 'leave: false';
  }

  public pageLeave(): void {
    // 页面跳转后，隐藏的页面不再会更新页面
    // this.setState({
    //   status: 'pageLeave'
    // });
    // 只能操作dom来实现
    document.querySelector('#Aleave')!.textContent = 'leave: true';
  }

  public pageRender(): JSX.Element {
    // push新路由后，render函数不会被触发
    return (
      <div>
        <div id="Astatus">status: {this.state.status}</div>
        <div id="Aleave">leave: false</div>
        <Link id="linkToB" to="/b">A to B</Link>
        <br/>
        <Link id="linkToC" to="/c">A to C</Link>
      </div>
    );
  }
}

export default A;