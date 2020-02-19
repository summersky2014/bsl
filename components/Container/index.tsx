import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import { css } from 'aphrodite/no-important';
import styles from './style';

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

const Container = React.forwardRef((props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    className, style, flexDirection, flexWrap, justifyContent, alignItems, alignContent, children, order, id,
    flex, alignSelf, onClick
  } = props;
  
  return (
    <div
      className={classNames(css(
        !!(justifyContent || alignItems || alignSelf || flexDirection) && styles.flex,
        !!flexDirection && styles[`flexDirection-${flexDirection}` as keyof typeof styles],
        !!flexWrap && styles[`flexWrap-${flexWrap}` as keyof typeof styles],
        !!justifyContent && styles[`justifyContent-${justifyContent}` as keyof typeof styles],
        !!alignItems && styles[`alignItems-${alignItems}` as keyof typeof styles],
        !!alignContent && styles[`alignContent-${alignContent}` as keyof typeof styles],
        !!alignSelf && styles[`alignSelf-${alignSelf}` as keyof typeof styles],
        order !== undefined && styles[`order-${order}` as keyof typeof styles],
        flex !== undefined && styles[`flex-${flex}` as keyof typeof styles]
      ), className)}
      style={style}
      id={id}
      ref={ref}
      onClick={onClick}
    >
      {children}
    </div>
  );
});

Container.displayName = 'Container';
export default Container;
