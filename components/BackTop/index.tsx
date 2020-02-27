import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import variable from '../../utils/system/variable';
import TWEEN from '../../utils/tween';
import { ListenerCallback } from '../../hooks/anyuseTimeout';
import { addListener, removeListener } from '../../app/Scheduler';

interface Props extends BSL.ComponentProps, DefaultProps {
  /** 点击按钮的回调函数 */
  onClick?: () => void;
  /** 自定义内容 */
  children: JSX.Element;
}

interface DefaultProps {
  /**
   * 设置需要监听其滚动事件的元素
   * @default Window
   */
  target?: HTMLElement | Window;
  /**
   * 滚动高度达到此参数值才出现 BackTop
   * @default 400
   */
  visibilityHeight?: number;
  /**
   * 持续时间
   * @default 500
   */
  duration?: number;
  /**
   * 缓动函数
   * @default TWEEN.Easing.Quartic.InOut
   */
  easing?: (k: number) => number;
}

const defaultProps: Required<DefaultProps> = {
  target: window,
  visibilityHeight: 400,
  duration: 500,
  easing: TWEEN.Easing.Quartic.InOut
};
function getOffset(target: HTMLElement | Window) {
  if (target === window) {
    return {
      x: target.scrollX,
      y: target.scrollY
    };
  } else {
    return {
      x: (target as HTMLElement).offsetLeft,
      y: (target as HTMLElement).offsetTop
    };
  }
}

function BackTop(props: Props) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const isComplete = React.useRef(true);

  React.useEffect(() => {
    const listenerCallback: ListenerCallback = (time, overTime) => {
      TWEEN.update();
      return false;
    };
    const setVisible = () => {
      rootRef.current!.style.display = getOffset(props.target!).y >= props.visibilityHeight! ? 'block' : 'none';
    };
    
    setVisible();
    addListener(listenerCallback);
    props.target!.addEventListener('scroll', setVisible);
    return () => {
      removeListener(listenerCallback);
      props.target!.removeEventListener('scroll', setVisible);
    };
  }, []);

  return (
    <div 
      className={classNames(variable.bslComponent, props.className)}
      id={props.id}
      style={{
        ...props.style,
        display: 'none'
      }}
      ref={rootRef}
      onClick={() => {
        if (isComplete.current === false) {
          return;
        }
        isComplete.current = false;
        const scroll = getOffset(props.target!);
        new TWEEN.Tween(scroll) 
          .to({ x: scroll.x, y: 0 }, props.duration!)
          .easing(props.easing!)
          .onUpdate(() => {
            props.target!.scrollTo(scroll.x, scroll.y);
          })
          .onComplete(() => {
            isComplete.current = true;
          })
          .start();
      }}
    >
      {props.children}
    </div>
  );
}

BackTop.defaultProps = defaultProps;
export default BackTop;
