import BetterScroll from '@better-scroll/core';
import { css } from 'aphrodite/no-important';
import * as classNames from 'classnames';
import * as React from 'react';
import anyuseTimeout, { ListenerCallback } from '../../hooks/anyuseTimeout';
import BSL from '../../typings';
import memoAreEqual from '../../utils/system/memoAreEqual';
import Dots from './Dots';
import Slide, { BaseProps as SlideProps } from './Slide';
import styles from './style';

const slidePlugins = require('@better-scroll/slide');
export interface Props extends BSL.ComponentProps, SlideProps, DefaultProps {
  /** 滑动块的样式 */
  slideCls?: string;
  /** 指示器样式 */
  dotCls?: string;
  /** 是否开启指示器圆点 */
  dots?: boolean;
  /** 是否自动轮播 */
  autoplay?: boolean;
  /** 是否在垂直方向开启滚动 */
  eventPassthrough?: boolean;
  /** 更新内容重构dom */
  refreshId?: string | number;
  /** 刷新之后是否自动跳转到当前index */
  refreshAfterAutoGotoPage?: boolean;
  /** 调用refresh之后触发 */
  onRefresh?: () => void;
  /** 滑动后触发的事件 */
  onChange?: (index: number, direction: 'prev' | 'next', isAuto: boolean) => void;
  /** 触发时机：slide 的 currentPage 值将要改变时,先于onRefresh触发 */
  slideWillChange?: (pageX: number) => void;
}

interface DefaultProps {
  /** 当前的索引 */
  index?: number;
  /** 跳转到指定索引需要的时间 */
  goToIndexDuration?: number;
  /** 自动间隔时间 */
  interval?: number;
  /** 是否开启滑动，默认为true */
  disabled?: boolean;
}

const prefixCls = 'bsl-carousel';

BetterScroll.use(slidePlugins);

const defaultProps: DefaultProps = {
  index: 0,
  interval: 3000,
  disabled: false,
  goToIndexDuration: 0
};
function Carousel(props: Props) {
  const { autoplay, index, children, goToIndexDuration, disabled, loop, dots, eventPassthrough, refreshId } = props;
  const [setTimeOut, clearTimeOut] = anyuseTimeout();
  const elemRef = React.useRef<HTMLDivElement>(null);
  const bsScroll = React.useRef<BetterScroll>();
  const timer = React.useRef<ListenerCallback>();
  /** 是否是自动轮播触发的滑动 */
  const slideIsAuto = React.useRef(false);
  /** 是否是手指滑动触发 */
  const slideIsTouch = React.useRef(false);
  const count = React.Children.count(children);
  const [width, setWidth] = React.useState(0);
  /** 自动轮播 */
  const slideAutoplay = () => { 
    if (timer.current) {
      clearTimeOut(timer.current);
    }
    if (autoplay) {
      // 自动轮播
      timer.current = setTimeOut(() => {
        slideIsAuto.current = true;
        bsScroll.current?.next();
      }, props.interval as number);
    }
  };

  React.useEffect(() => {
    if (bsScroll.current) {
      bsScroll.current.refresh();
      if (props.refreshAfterAutoGotoPage) {
        bsScroll.current.goToPage(index, 0, 0, 0);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, refreshId]);
  
  React.useLayoutEffect(() => {
    const onBeforeSlide = () => {
      if (autoplay && timer.current) {
        clearTimeOut(timer.current);
      }
      slideIsTouch.current = false;
    };
    const onAfterSlide = () => {
      if (bsScroll.current) {
        // 当前索引
        const nowIndex = bsScroll.current.getCurrentPage().pageX;
        // slide滑动的方向，通过计算索引差值来实现
        const direction = bsScroll.current.movingDirectionX === -1 ? 'prev' : 'next';
 
        if (props.onChange) {
          props.onChange(nowIndex, direction, slideIsAuto.current || slideIsTouch.current);
        }
        slideAutoplay();
        // 还原初始化状态
        slideIsTouch.current = false;
        slideIsAuto.current = false;
      }
    };
  
    if (elemRef.current) {
      if (elemRef.current.clientWidth !== width) {
        setWidth(elemRef.current.clientWidth);
      }
  
      if (width) {
        if (elemRef.current.clientHeight === 0) {
          console.error('Carousel组件容器上没有高度，有可能会导致程序错误');
        }

        bsScroll.current = new BetterScroll(elemRef.current, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          eventPassthrough: eventPassthrough ? 'vertical' : undefined,
          click: true,
          slide: {
            loop,
            threshold: 100
          },
          bounce: false
        });
        
        if (index !== 0) {
          bsScroll.current.goToPage(index, 0, 0, 0);
        }

        if (props.onRefresh) {
          bsScroll.current.on('refresh', props.onRefresh);
        }
        if (props.slideWillChange) {
          bsScroll.current.on('slideWillChange', props.slideWillChange);
        }
        bsScroll.current.on('scrollEnd', onAfterSlide);
        bsScroll.current.on('beforeScrollStart', onBeforeSlide);
        bsScroll.current.on('touchEnd', () => {
          slideIsTouch.current = true;
          slideAutoplay();
        });
      }
    }
    
    return () => {
      bsScroll.current?.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loop, width]);

  React.useEffect(() => {
    if (bsScroll.current) {
      const prevIndex = bsScroll.current.getCurrentPage().pageX;
  
      if (index !== prevIndex) {
        bsScroll.current.goToPage(index, 0, 0, goToIndexDuration);
      }
    }
  }, [index, goToIndexDuration]);

  React.useEffect(() => {
    if (bsScroll.current) {
      if (disabled) {
        bsScroll.current.disable();
      } else {
        bsScroll.current.enable();
      }
    }
  }, [disabled]);

  React.useEffect(() => {
    // 初始化自动轮播
    slideAutoplay();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  React.useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeOut(timer.current);
      }
      if (bsScroll.current) {
        bsScroll.current.destroy();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={classNames(css(styles.root), prefixCls, props.className)}
      style={props.style}
      ref={elemRef}
    >
      {width && (
        <Slide
          className={classNames(props.slideCls, eventPassthrough === undefined && styles.sideHidden)}
          slideWidth={width}
          loop={loop}
          slideCount={count}
        >{children}</Slide>
      )}
      {dots && count && (
        <Dots className={props.dotCls} activeIndex={index!} count={count} />
      )}
    </div>
  );
}

Carousel.defaultProps = defaultProps;
export default React.memo(Carousel, memoAreEqual);