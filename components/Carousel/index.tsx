import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import * as Swipe from 'swipe-js-iso';
import memoAreEqual from '../../utils/memoAreEqual';
import './index.scss';

interface Props extends BSL.ComponentProps {
  index: number;
  children: any;
  updateId?: boolean;
  speed?: number;
  auto?: number;
  continuous?: boolean;
  disableScroll?: boolean;
  stopPropagation?: boolean;
  slideDuration?: number;
  /**  使用0到1之间的数字调用滑动回调，表示已刷过的全宽度的百分比（例如0.5表示我们在两个图块之间） */
  swiping?: (progress: number) => void;
  callback?: (index: number, elem: HTMLDivElement) => void;
  transitionEnd?: Function;
}

const prefixCls = 'bsl-carousel';
function Carousel(props: Props) {
  const elemRef = React.createRef<HTMLDivElement>();
  const { id, className, index, speed, auto, continuous, disableScroll, stopPropagation, children, updateId } = props;
  const swipe = React.useRef<any>();

  React.useEffect(() => {
    const swipeOptions = {
      startSlide: props.index,
      speed: props.speed,
      auto: props.auto,
      continuous: props.continuous,
      disableScroll: props.disableScroll,
      stopPropagation: props.stopPropagation,
      swiping: props.swiping,
      transitionEnd: props.transitionEnd,
      callback: props.callback
    };
    if (elemRef.current) {
      if (swipe.current) {
        swipe.current.kill();
      }
      swipe.current = Swipe(elemRef.current, swipeOptions);
    }
    return () => {
      swipe.current.kill();
      swipe.current = null;
    };
  }, [speed, auto, continuous, stopPropagation, disableScroll, updateId]);

  React.useEffect(() => {
    if (swipe.current && swipe.current.getPos() !== props.index) {
      swipe.current.slide(props.index, props.slideDuration);
    }
  }, [index]);

  return (
    <div
      id={id}
      ref={elemRef}
      className={classNames(prefixCls, className)}
      style={props.style}
    >
      <div className={`${prefixCls}-wrapper`}>
        {React.Children.map(children, (child: React.ReactElement, i) =>  (
          <div className={`${prefixCls}-child`} key={child.key || i}>{child}</div>
        ))}
      </div>
    </div>
  );
}

function areEqual(prevProps: Props, nextProps: Props): boolean {
  return memoAreEqual(prevProps, nextProps, (key) => {
    return key === 'updateId' ? nextProps.updateId !== prevProps.updateId : false;
  });
}

export default React.memo(Carousel, areEqual) ;
