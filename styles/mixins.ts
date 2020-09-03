import { StyleDeclaration } from 'aphrodite/no-important';

export const ellipsisStyle: StyleDeclaration = {
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
export function ellipsisLines(lines?: number): StyleDeclaration {
  return {
    display: '-webkit-box;',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical',
    whiteSpace: 'normal',
    ...ellipsisStyle
  };
}

/** 单行省略 */
export function ellipsis(): StyleDeclaration {
  return {
    width: 'auto',
    whiteSpace: 'nowrap',
    ...ellipsisStyle
  };
}

export function border(color: string, direction: 'left' | 'rgiht' | 'top' | 'bottom', position: 'before' | 'after' = 'after'): Record<string, StyleDeclaration | string> {
  let directionStyle!: StyleDeclaration;
  switch (direction) {
    case 'left':
      directionStyle = {
        width: '1px', 
        height: '200%',
        left: 0,
        top: 0
      };
      break;
    case 'rgiht':
      directionStyle = {
        width: '1px', 
        height: '200%',
        right: 0,
        top: 0
      };
      break;
    case 'top':
      directionStyle = {
        width: '200%', 
        height: '1px',
        left: 0,
        top: 0
      };
      break;
    case 'bottom':
      directionStyle = {
        width: '200%',
        height: '1px',
        left: 0,
        bottom: 0
      };
  }
  return {
    position: 'relative',
    [`:${position}`]: {
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
export function clearfix(): Record<string, StyleDeclaration> {
  const common: StyleDeclaration= {
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
