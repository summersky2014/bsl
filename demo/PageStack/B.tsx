import * as React from 'react';
import { Link } from 'react-router-dom';
import PageComponent from '../../app/PageComponent';

class B extends PageComponent<any, any, any> {
  constructor(props: any, state: any) {
    super(props, state);
    this.init();
  }

  // private a: ObObject<number> = new ObObject({ defaultValue: 0 });
  // private b: ObObject<number> = new ObObject({ defaultValue: 10 });
  // private c: ObObject<number> = new ObObject({ defaultValue: 100 });

  public componentDidMount(): void {
    console.log('componentDidMount, B页面进入了');
  }

  public pageLeave(): void {
    console.log('B页面离开了');
  }

  public pageEnter(): void {
    console.log('B页面进入了');
  }

  private onAdd = () => {
    // this.a.set(this.a.get() + 1);
    // setTimeout(() => {
    // this.b.set(this.b.get() + 1);
    // });
    // setTimeout(() => {
    // this.c.set(this.c.get() + 1);
    // });
  }

  public pageRender(): JSX.Element {
    // console.log('render B');
    return (
      <div>
        <Link to="/c">B to C</Link>
        <br/>
        <Link to="/c" replace>B replace C</Link>
        <br/>
        <button onClick={this.onAdd}>add</button>
      </div>
    );
  }
}

export default B;