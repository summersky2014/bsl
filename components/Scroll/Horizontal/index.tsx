import BSL from '../../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import { css } from 'aphrodite/no-important';
import styles from './style';

import * as BetterScroll from '@better-scroll/core';

export interface Props extends BSL.ComponentProps {
  children: JSX.Element[] | JSX.Element;
  /** 用于自动移动到被查询到的元素位置上 */
  query?: string;
}

/** 获取样式的数值，有小数会向上加1 */
function getNumberByComputed(computed: string | null): number {
  const cssValue = computed || '0';
  const float = parseFloat(cssValue);

  return isNaN(float) ? 0 : Math.ceil(float);
}

function HorizontalScroll(props: Props) {
  const elemRef = React.useRef<HTMLDivElement>(null);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const scroll = React.useRef<BetterScroll.default>();
  /** 上一次容器的宽度 */
  const prevFrameWidth = React.useRef<number>();
  const [scrollWidth, setScrollWidth] = React.useState<string | number>('inherit');
  /** 是否已经初始化 */
  const [inited, setInited] = React.useState(false);
  /** 计算容器的宽度 */
  const calcFrameWidth = (): number => {
    let frameWidth = 0;
    if (wrapRef.current) {
      const children = wrapRef.current.children;

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        child.classList.add(css(styles.item));
        const isAbsolute = getComputedStyle(child).position === 'absolute';

        if (!isAbsolute) {
          const width = getNumberByComputed(getComputedStyle(child).width);
          const marginLeft = getNumberByComputed(getComputedStyle(child).marginLeft);
          const marginRight = getNumberByComputed(getComputedStyle(child).marginRight);
          frameWidth += width + marginLeft + marginRight;
        }
      }
    }

    return frameWidth;
  };
  /** 自动移动滚动条横坐标 */
  const autoMove = (query: string) => {
    const elem = document.querySelector('.' + query);

    if (elem && scroll.current) {
      const offsetLeft = (elem as HTMLDivElement).offsetLeft;
      const marginLeft = getNumberByComputed(getComputedStyle(elem).marginLeft);
      const x = -offsetLeft + marginLeft;
      scroll.current.scrollTo(x, 0);
    }
  };

  React.useEffect(() => {
    const width = calcFrameWidth();

    if (width) {
      prevFrameWidth.current = width;
      setScrollWidth(width);

      if (scroll.current) {
        scroll.current.destroy();
      } else if (elemRef.current) {
        scroll.current = new BetterScroll.default(elemRef.current, {
          scrollX: true,
          scrollY: false,
          eventPassthrough: 'vertical'
        });
        setInited(true);
      }
    }

    if (props.query) {
      autoMove(props.query);
    }
    // 如果dom更新后的宽度和之前的宽度不一致就刷新scroll
    if (scroll.current && prevFrameWidth && width && prevFrameWidth.current !== width) {
      prevFrameWidth.current = width;
      setScrollWidth(width);
      scroll.current.refresh();
    }

    return () => {
      if (scroll.current) {
        scroll.current.destroy();
      }
    };
  }, [props.query]);

  React.useEffect(() => {
    if (inited && scroll.current) {
      scroll.current.refresh();
    }
  }, [inited]);

  return (
    <div
      className={classNames(css(styles.root), props.className)}
      style={props.style}
      ref={elemRef}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div
        className={css(styles.wrap)}
        ref={wrapRef}
        style={{
          width: scrollWidth
        }}
      >{props.children}</div>
    </div>
  );
}

export default HorizontalScroll;