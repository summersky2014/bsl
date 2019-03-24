import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import './index.scss';

export interface Props extends BSL.ComponentProps {
  prefixCls?: string;
  children?: any | any[];
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';
  order?: number;
  flex?: number;
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  onClick?: BSL.OnClick<HTMLDivElement>;
}

const prefixCls = 'bsl-container';
const Container = React.forwardRef((props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    className, style, flexDirection, flexWrap, justifyContent, alignItems, alignContent, children, order, id,
    flex, alignSelf, onClick
  } = props;
  return (
    <div
      className={classNames(prefixCls, className, {
        [`${prefixCls}-flex`]: !!(justifyContent || alignItems || alignSelf || flexDirection),
        [`${prefixCls}-flexDirection-${flexDirection}`]: !!flexDirection,
        [`${prefixCls}-flexWrap-${flexWrap}`]: !!flexWrap,
        [`${prefixCls}-justifyContent-${justifyContent}`]: !!justifyContent,
        [`${prefixCls}-alignItems-${alignItems}`]: !!alignItems,
        [`${prefixCls}-alignContent-${alignContent}`]: !!alignContent,
        [`${prefixCls}-order-${order}`]: !!order,
        [`${prefixCls}-flex-${flex}`]: !!flex,
        [`${prefixCls}-alignSelf-${alignSelf}`]: !!alignSelf,
      })}
      style={style}
      id={id}
      ref={ref}
      onClick={onClick}
    >
      {children}
    </div>
  );
});
export default Container;
