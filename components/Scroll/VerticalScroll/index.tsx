import BSL from '../../../typings';
import * as React from 'react';
import BetterScroll from '@better-scroll/core';

export interface Props extends BSL.ComponentProps {
  children: any;
  contentCls?: string;
}

function VerticalScroll(props: Props) {
  const { className, style, children, contentCls, id } = props;
  const elemRef = React.useRef<HTMLDivElement>(null);
  const scroll = React.useRef<BetterScroll>();
  
  React.useEffect(() => {
    if (scroll.current) {
      scroll.current.refresh();
    }
  });

  React.useEffect(() => {
    scroll.current = new BetterScroll(elemRef.current!, {
      scrollX: false,
      scrollY: true,
      eventPassthrough: 'horizontal'
    });

    return () => {
      scroll.current?.destroy();
    };
  }, []);
  
  return (
    <div
      className={className}
      id={id}
      ref={elemRef}
      style={{
        ...style,
        overflow: 'hidden'
      }}
    >
      <div className={contentCls}>{children}</div>
    </div>
  );
}

export default VerticalScroll;