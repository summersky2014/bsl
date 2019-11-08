import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import { css } from 'aphrodite/no-important';
import styles from './style';

import * as Swipe from 'swipe-js-iso';
import memoAreEqual from '../../utils/memoAreEqual';

interface ISwipe {
  kill(): void;
  getPos(): number;
  slide(index: number, slideDuration: number | undefined): void;
}

interface Props extends BSL.ComponentProps {
  index: number;
  children: any;
  /**
   * speed of prev and next transitions in milliseconds.
   * @default 300
   */
  speed?: number;
  /**
   *  begin with auto slideshow (time in milliseconds between slides)
   */
  auto?: number;
  /**  
   * create an infinite feel with no endpoints
   * @default true
   */
  continuous?: boolean;
  /**
   * stop any touches on this container from scrolling the page
   * @default false
   */
  disableScroll?: boolean;
  /**
   * stop event propagation
   * @default false
   */
  stopPropagation?: boolean;
  /**
   * speed of transition in milliseconds)
   */
  slideDuration?: number;
  /**  使用0到1之间的数字调用滑动回调，表示已刷过的全宽度的百分比（例如0.5表示我们在两个图块之间） */
  swiping?: (progress: number) => void;
  callback?: (index: number, elem: HTMLDivElement) => void;
  transitionEnd?: Function;
}

function Carousel(props: Props) {
  const elemRef = React.createRef<HTMLDivElement>();
  const { id, className, index, speed, auto, continuous, disableScroll, stopPropagation, children } = props;
  const swipe = React.useRef<ISwipe | null>();

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
      swipe.current?.kill();
      swipe.current = Swipe(elemRef.current, swipeOptions) as ISwipe;
    }

    return () => {
      swipe.current?.kill();
      swipe.current = null;
    };
  }, [speed, auto, continuous, stopPropagation, disableScroll]);

  React.useEffect(() => {
    if (swipe.current) {
      if (swipe.current.getPos() !== props.index) {
        swipe.current.slide(props.index, props.slideDuration);
      }
    }
  }, [index]);

  return (
    <div
      id={id}
      ref={elemRef}
      className={classNames(css(styles.root), className)}
      style={props.style}
    >
      <div className={css(styles.wrapper)}>
        {React.Children.map(children, (child: React.ReactElement, i) =>  (
          <div className={ css(styles.child)} key={child.key || i}>{child}</div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(Carousel, memoAreEqual);
