import * as React from 'react';
import { Link } from 'react-router-dom';
import PageComponent from '../../app/PageComponent';

interface State {
  status: string;
}

class A extends PageComponent<any, State, any> {
  constructor(props: any, state: State) {
    super(props, state);
    this.init();
  }

  public state: State = {
    status: 'init'
  };

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
    return (
      <div>
        <div id="Astatus">status: {this.state.status}</div>
        <div id="Aleave">leave: false</div>
        <Link id="linkToB" to="/b">A to B</Link>
        <br/>
        <Link to="/c" replace>A replace C</Link>
      </div>
    );
  }
}

export default A as any;