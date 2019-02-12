import * as React from 'react';
import { Link } from 'react-router-dom';
import PageComponent from '../../app/PageComponent';

interface State {
  status: string;
}

class B extends PageComponent<any, any, any> {
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
        <Link to="/c">B to C</Link>
        <br/>
        <Link to="/c" replace>B replace C</Link>
      </div>
    );
  }
}

export default B;