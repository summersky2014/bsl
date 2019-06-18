import * as React from 'react';
import PageComponent from '../../app/PageComponent';
import Link from '../../components/Link';

interface State {
  status: string;
}

class B extends PageComponent {
  constructor(props: any, state: any) {
    super(props, state);
    this.init();
  }

  public state: State = {
    status: ''
  };

  public pageActive(): void {
    setTimeout(() => {
      this.setState({
        status: 'pageActive'
      });
    }, 100);
  }

  public pageRender(): JSX.Element {
    return (
      <div>
        <div id="Bstatus">status: {this.state.status}</div>
        <br/>
        <Link to="/c" replace>B replace C</Link>
      </div>
    );
  }
}

export default B;