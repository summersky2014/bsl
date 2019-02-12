import * as React from 'react';
// import { Link } from 'react-router-dom';
import PageComponent from '../../app/PageComponent';

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
      <div>
        C
      </div>
    );
  }
}

export default C;