import yj from '../typings';
import * as React from 'react';
import PageStack, { push, getPrevPageClass, onPageLeave } from '.';
import global from './global';
import env from '../utils/env';
import setDocumetTitle from '../utils/setDocumetTitle';

export interface PageProps<Match> extends yj.PageProps<Match> {
  entrytime: number;
}

abstract class Page<Props, State, Match> extends React.Component<Props & PageProps<Match>, State> {
  constructor(props: Props & PageProps<Match>, state: State) {
    super(props, state);

    if (env === 'development') {
      setTimeout(() => {
        if (this.isCallInit === false) {
          console.warn(this, '请检查该页面构造函数中是否调用了_init方法');
        }
      });
    }

    this.pageElemRef = React.createRef();
    this.getStaytime = this.getStaytime.bind(this);
  }

  /** 是否调用了init方法 */
  private isCallInit: boolean = false;
  /** 对外显示的类名，一般和页面的类名相同 */
  public abstract readonly displayName: string;
  /** 页面名称，用于document.title */
  public abstract readonly pageName: string;
  /** 是否进行登录认证 */
  public readonly loginAuth: boolean = false;
  /** 进入页面的时间 */
  public entrytime: number = Date.now();
  protected readonly pageId: number = global.pageId;
  public readonly pageElemRef: React.RefObject<HTMLDivElement>;
  /** 行为记录类实例 */
  public readonly behavior: Behavior = new Behavior();
  /** 当获取这个属性时，得到已经停留了的时间 */
  public getStaytime(): number {
    const levaeTime = Date.now();
    return levaeTime - this.entrytime;
  }

  /** 执行后退路由的操作时，会在动画完成后调用 */
  // tslint:disable-next-line:no-empty
  public pageEnter(): void {}
  /** 执行push操作时，会在动画完成后调用上一个页面的pageLeave */
  // tslint:disable-next-line:no-empty
  public pageLeave(): void {}
  /** 当页面处于激活状态时触发 */
  // tslint:disable-next-line:no-empty
  public pageActive(): void {}

  /** Page初始化时调用 */
  protected init(): void {
    PageStack.component.push(this as Page<any, any, any>);
    push(this.props as any);
    this.isCallInit = true;

    if (this.pageName) {
       // 设置页面标题
      setDocumetTitle(this.pageName);
      this.pageActive();
    } else {
      console.warn(`页面的pageNmae属性为空，请设置pageName`);
    }

    if (global.history.action === 'REPLACE') {
      const currentComponent = global.replaceBeforeComponent;
      const toComponent = getPrevPageClass(1);
      onPageLeave(currentComponent, toComponent, 'enter');
    }
  }

  public shouldComponentUpdate(): boolean {
    if (this.pageElemRef.current) {
      const visible = this.pageId === global.pageId;
      this.pageElemRef.current.style.display = visible ? 'block' : 'none';
      return visible;
    } else {
      return true;
    }
  }
}

export default Page;