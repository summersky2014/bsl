import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import { css } from 'aphrodite/no-important';
import styles from './style';

export interface BaseProps {
  /** 是否开启循环 */
  loop?: boolean;
  children?: JSX.Element[] | JSX.Element;
}

interface Props extends BaseProps, BSL.ComponentProps {
  slideWidth: number;
  slideCount: number;
}

const prefixCls = 'bsl-carousel-slide';
// 设置容器总宽度
function setFrameWidth(slideWidth: number, count: number, loop?: boolean): number {
  let width = 0;

  for (let i = 0; i < count; i++) {
    width += slideWidth;
  }

  if (loop) {
    width += 2 * slideWidth;
  }

  return width;
}

const Slide = (props: Props) => {
  const { children, slideWidth, slideCount, loop } = props;
  // slide总宽度
  const frameWidth = setFrameWidth(slideWidth, slideCount, loop);
  
  return (
    <div
      className={classNames(css(styles.slide), prefixCls, props.className)}
      style={{
        width: frameWidth
      }}
    >
      {children && React.Children.map(children, (child, i) => {
        return React.cloneElement(child as React.ReactElement<any>, {
          className: classNames(css(styles.slideItem), `${prefixCls}-item`, (child as React.ReactElement<any>).props.className),
          style: {
            width: slideWidth,
            ...(child as React.ReactElement<any>).props.style
          }
        });
      })}
    </div>
  );
};

export default Slide;