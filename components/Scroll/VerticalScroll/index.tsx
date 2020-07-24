import BetterScroll from '@better-scroll/core';
import * as React from 'react';
import { frame } from '../../../app/Scheduler';
import BSL from '../../../typings';

interface ScrollParams {
  x: number;
  y: number;
}

export interface Props extends BSL.ComponentProps {
  children: any;
  contentCls?: string;
  onScroll?: (params: ScrollParams) => void;
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
      eventPassthrough: 'horizontal',
      probeType: props.onScroll ? 3 : 0
    });
    const onScroll = (params: ScrollParams) => {
      frame(() => {
        props.onScroll!(params);
      });
    };
    if (props.onScroll) {
      scroll.current.on('scroll', onScroll);
    }
    
    return () => {
      if (props.onScroll) {
        scroll.current?.off('scroll', onScroll);
      }
      scroll.current?.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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