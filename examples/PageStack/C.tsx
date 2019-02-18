import * as React from 'react';
import PageComponent from '../../app/PageComponent';
import Link from '../../components/Link';

class C extends PageComponent<any, any, any> {
  constructor(props: any, state: any) {
    super(props, state);
    this.init();
  }

  public componentDidMount(): void {
    console.log('componentDidMount, C页面进入了');
  }

  public pageLeave(): void {
    console.log('C页面离开了');
  }

  public pageEnter(): void {
    console.log('C页面进入了');
  }

  public pageRender(): JSX.Element {
    return (
      <div id="goBack" onClick={Link.goBack}>当前页面C，点击回到上一页</div>
    );
  }
}

export default C;