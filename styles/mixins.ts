import * as React from 'react';

export const ellipsisStyle: React.CSSProperties = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordWrap: 'break-word'
};

export function rem(value: number) {
  return (value / 2) / 14 + 'rem';
}

/**
 * 多行多余字符省略
 * @param $lines 省略行数
 */
export function ellipsisLines(lines?: number): React.CSSProperties {
  return {
    display: '-webkit-box;',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical',
    whiteSpace: 'normal',
    ...ellipsisStyle
  };
};

/** 单行省略 */
export function ellipsis(): React.CSSProperties {
  return {
    width: 'auto',
    whiteSpace: 'nowrap',
    ...ellipsisStyle
  };
};

export function border(color: string, direction: 'left' | 'rgiht' | 'top' | 'bottom'): Record<string, React.CSSProperties | string> {
  let directionStyle!: React.CSSProperties;
  switch (direction) {
    case 'left':
      directionStyle = {
        width: 1, 
        height: '200%',
        left: 0,
        top: 0
      };
      break;
    case 'rgiht':
      directionStyle = {
        width: 1, 
        height: '200%',
        right: 0,
        top: 0
      };
      break;
    case 'top':
      directionStyle = {
        width: '200%', 
        height: 1,
        left: 0,
        top: 0
      };
      break;
    case 'bottom':
      directionStyle = {
        width: '200%',
        height: 1,
        left: 0,
        bottom: 0
      };
  }
  return {
    position: 'relative',
    ':after': {
      content: '""', 
      position: 'absolute', 
      transform: 'scale(0.5)',
      transformOrigin: '0 0',
      background: color,
      pointerEvents: 'none',
      ...directionStyle
    }
  };
}

/** 清除浮动 */
export function clearfix(): Record<string, React.CSSProperties> {
  const common: React.CSSProperties= {
    content: '""',
    display: 'table'
  };
  return {
    ':before': common,
    ':after': Object.assign({}, common, {
      clear: 'both'
    }) 
  };
}
