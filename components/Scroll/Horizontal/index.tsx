import BSL from '../../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import * as BetterScroll from 'better-scroll';
import './index.scss';

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

const prefixCls = 'bsl-scroll-horizontal';
function HorizontalScroll(props: Props) {
  const elemRef = React.createRef<HTMLDivElement>();
  const wrapRef = React.createRef<HTMLDivElement>();
  const scroll = React.useRef<BetterScroll.default>();
  /** 上一次容器的宽度 */
  const prevFrameWidth = React.useRef<number>();
  const [scrollWidth, setScrollWidth] = React.useState<string | number>('inherit');
  /** 计算容器的宽度 */
  const calcFrameWidth = (): number => {
    let frameWidth = 0;
    if (wrapRef.current) {
      const children = wrapRef.current.children;

      for (let i = 0; i < children.length; i++) {
        children[i].classList.add(`${prefixCls}-item`);
        const width = getNumberByComputed(getComputedStyle(children[i]).width);
        const marginLeft = getNumberByComputed(getComputedStyle(children[i]).marginLeft);
        const marginRight = getNumberByComputed(getComputedStyle(children[i]).marginRight);
        frameWidth += width + marginLeft + marginRight;
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
          bindToWrapper: true,
          eventPassthrough: 'vertical'
        });
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

  return (
    <div
      className={classNames(prefixCls, props.className)}
      style={props.style}
      ref={elemRef}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div
        className={`${prefixCls}-wrap`}
        ref={wrapRef}
        style={{
          width: scrollWidth,
        }}
      >{props.children}</div>
    </div>
  );
}

export default HorizontalScroll;