import BSL from '../typings';
import * as React from 'react';
import { push, appData } from './core';
import { Context } from './Scheduler';
import variable from '../utils/system/variable';

export interface PageProps<Match> extends BSL.PageProps<Match> {
  entrytime: number;
}

abstract class PageComponent<P, S> extends React.Component<P, S> {
  constructor(props: P, state: S) {
    super(props, state);

    if (appData.env === 'development') {
      setTimeout(() => {
        if (this.isCallInit === false) {
          console.warn(this, '请检查该页面构造函数中是否调用了init方法');
        }
      });
    }

    this.pageId = appData.currentPageId;
    this.rootElemRef = React.createRef();
    this.getStaytime = this.getStaytime.bind(this);
    this.pageRender = this.pageRender.bind(this);
  }

  /** 当前页面id */
  private pageId = 0;
  /** 根元素的引用 */
  private readonly rootElemRef: React.RefObject<HTMLDivElement>;
  /** 是否调用了init方法 */
  private isCallInit = false;
  /** 子类是否重载了componentDidMount */
  private isOverloadDidmount = true;
  /** 进入页面的时间 */
  public entrytime: number = Date.now();
  /** 当获取这个属性时，得到已经停留了的时间 */
  public getStaytime(): number {
    const levaeTime = Date.now();
    return levaeTime - this.entrytime;
  }

  /** Page初始化时调用 */
  protected init() {
    appData.pages.push(this as PageComponent<{}, {}>);
    this.isCallInit = true;

    if (variable.env === 'development') {
      setTimeout(() => {
        if (this.isOverloadDidmount) {
          console.error('PageComponent的子类不能实现componentDidMount,请改用didMount');
        }
      }, 1000);
    }
  }

  /** 执行后退路由的操作时，会在动画完成后调用 */
  public pageEnter(): void {
    // 需要子类来实现
  }

  /** 执行push操作时，会在动画完成后调用上一个页面的pageLeave */
  public pageLeave(): void {
    // 需要子类来实现
  }

  /** 当页面处于激活状态时触发，即后退到当前页或跳入到当前页都会触发 */
  public pageActive(): void {
    // 需要子类来实现
  }

  /** 用于替代componentDidMount */
  protected didMount(): void {
    // 需要子类来实现
  }

  /** 子类的页面渲染函数，用来替代render函数 */
  public abstract pageRender(): any;

  public componentDidMount() {
    this.isOverloadDidmount = false;
    push(this.props as any);
    this.rootElemRef.current!.style.display = 'block';
    this.didMount();
  }

  public shouldComponentUpdate(): boolean {
    if (this.rootElemRef.current) {
      const visible = this.pageId === appData.currentPageId;
      const display = visible ? 'block' : 'none';
      
      if (this.rootElemRef.current.style.display !== display) {
        this.rootElemRef.current.style.display = display;
      }
      return visible;
    } else {
      return true;
    }
  }

  public render(): JSX.Element {
    return (
      <div ref={this.rootElemRef} style={{ display: 'none' }}>
        <Context.Consumer>
          {this.pageRender}
        </Context.Consumer>
      </div>
    );
  }
}

export default PageComponent;