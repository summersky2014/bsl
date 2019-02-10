import BSL from '../typings';
import * as React from 'react';
import App, { push, Context, global } from './App';

export interface PageProps<Match> extends BSL.PageProps<Match> {
  entrytime: number;
}

abstract class PageComponent<Props, State, Match> extends React.Component<Props & PageProps<Match>, State> {
  constructor(props: Props & PageProps<Match>, state: State) {
    super(props, state);

    if (App.env === 'development') {
      setTimeout(() => {
        if (this.isCallInit === false) {
          console.warn(this, '请检查该页面构造函数中是否调用了init方法');
        }
      });
    }

    this.pageId = global.currentPageId;
    this.rootElemRef = React.createRef();
    this.getStaytime = this.getStaytime.bind(this);
    this.pageRender = this.pageRender.bind(this);
  }

  /** 是否调用了init方法 */
  private isCallInit: boolean = false;
  /** 是否进行登录认证 */
  public readonly loginAuth: boolean = false;
  /** 进入页面的时间 */
  public entrytime: number = Date.now();
  /** 当前页面id */
  private pageId: number = 0;
  /** 根元素的引用 */
  private readonly rootElemRef: React.RefObject<HTMLDivElement>;
  /** 当获取这个属性时，得到已经停留了的时间 */
  public getStaytime(): number {
    const levaeTime = Date.now();
    return levaeTime - this.entrytime;
  }

  /** Page初始化时调用 */
  protected init(): void {
    App.pages.push(this as PageComponent<any, any, any>);
    push(this.props as any);
    this.isCallInit = true;

    console.log(this, this.pageId, global.currentPageId)
    this.pageActive();
  }

  /** 执行后退路由的操作时，会在动画完成后调用 */
  // tslint:disable-next-line:no-empty
  public pageEnter(): void {}
  /** 执行push操作时，会在动画完成后调用上一个页面的pageLeave */
  // tslint:disable-next-line:no-empty
  public pageLeave(): void {}
  /** 当页面处于激活状态时触发，即后退到当前页或跳入到当前页都会触发 */
  // tslint:disable-next-line:no-empty
  public pageActive(): void {}
  /** 子类的页面渲染函数，用来替代render函数 */
  public abstract pageRender(): any;

  public shouldComponentUpdate(): boolean {
    if (this.rootElemRef.current) {
      const visible = this.pageId === global.currentPageId;
      console.log(this, this.pageId, global.currentPageId)
      this.rootElemRef.current.style.display = visible ? 'block' : 'none';
      return visible;
    } else {
      return true;
    }
  }

  public render(): JSX.Element {
    return (
      <div ref={this.rootElemRef}>
        <Context.Consumer>
          {this.pageRender}
        </Context.Consumer>
      </div>
    );
  }
}

export default PageComponent;