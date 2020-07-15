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
    // @ts-ignore
    window.status = 0;
  }

  public pageActive() {
    // @ts-ignore
    window.status++;
  }

  public pageRender(): JSX.Element {
    return (
      <React.Fragment>
        <div id="replace" onClick={() => Link.replace({ url: '/' })}>回到首页</div>
        <div id="replace" onClick={() => Link.back(-2)}>回退2页</div>
      </React.Fragment>
    );
  }
}

export default C;