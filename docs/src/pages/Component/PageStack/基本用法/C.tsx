import * as React from 'react';
import PageComponent from '../../../../../../app/PageComponent';
import Link from '../../../../../../components/Link';
// import setDocumetTitle from '../../../../../../utils/setDocumentTitle';

interface State {
}

class C extends PageComponent<any, State> {
  constructor(props: any, state: State) {
    super(props, state);
    this.init();
  }

  public didMount() {
    // eslint-disable-next-line no-console
    console.log('didMount');
  }
  // public componentDidMount(): void {
  //   setDocumetTitle('C');
  //   alert('componentDidMount, C页面进入了');
  // }

  public pageLeave() {
    alert('C页面离开了');
  }

  public pageEnter() {
    alert('C页面进入了');
  }

  public pageRender(): JSX.Element {
    return (
      <React.Fragment>
        <div id="goBack" onClick={() => Link.goBack()}>当前页面C，点击回到上一页</div>
      </React.Fragment>
    );
  }
}

export default C;