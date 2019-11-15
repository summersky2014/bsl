import * as React from 'react';
import PageComponent from '../../../../../../app/PageComponent';
import Link from '../../../../../../components/Link';
import setDocumetTitle from '../../../../../../utils/setDocumetTitle';

interface State {
  status: string;
}

class B extends PageComponent<any, State> {
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

  public componentDidMount() {
    setDocumetTitle('B');
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