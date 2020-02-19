import * as React from 'react';
import PageComponent from '../../../../../../app/PageComponent';
import Link from '../../../../../../components/Link';

interface State {
}

class B extends PageComponent<any, State> {
  constructor(props: any, state: any) {
    super(props, state);
    this.init();
  }

  public pageEnter() {
    window.status = 'enter';
  }

  public pageLeave() {
    window.status = 'leave';
  }

  public pageRender(): JSX.Element {
    return (
      <div>
        <Link to="/c">B to C</Link>
      </div>
    );
  }
}

export default B;