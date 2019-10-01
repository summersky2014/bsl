import * as React from 'react';
import PageComponent from '../../app/PageComponent';
import Link from '../../components/Link';

interface State {
  content: string;
}

class C extends PageComponent<any, State> {
  constructor(props: any, state: State) {
    super(props, state);
    this.init();
  }

  public state: State = {
    content: ''
  }

  public componentDidMount(): void {
    this.setState({
      content: 'componentDidMount, C页面进入了'
    });
  }

  public pageLeave(): void {
    this.setState({
      content: 'C页面离开了'
    });
  }

  public pageEnter(): void {
    this.setState({
      content: 'C页面进入了'
    });
  }

  public pageRender(): JSX.Element {
    return (
      <React.Fragment>
        <div></div>
        <div id="goBack" onClick={Link.goBack}>当前页面C，点击回到上一页</div>
      </React.Fragment>
    );
  }
}

export default C;