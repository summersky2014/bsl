import { css, StyleSheet } from '../../css-in-js';

const styles = StyleSheet.create({
  root: css({
    position: 'relative',
    height: 'inherit',
    overflow: 'hidden',
    clear: 'both'
  }),
  slide: css({
    height: 'inherit',
    position: 'relative',
    left: 0,
    top: 0,
    whiteSpace: 'nowrap',
    transform: 'translate3d(0, 0, 0)'
  }),
  sideHidden: css({
    overflow: 'hidden'
  }),
  slideItem: css({
    display: 'block',
    height: '100%',
    float: 'left',
    overflow: 'hidden',
    textAlign: 'center',
    textDecoration: 'none',
    position: 'relative',
    zIndex: 1
  }),
  dot: css({
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: '12px',
    transform: 'translateZ(1px)',
    textAlign: 'center',
    fontSize: 0
  }),  
  dotItem: css({
    display: 'inline-block',
    margin: '0 4px',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.5)'
  }),
  dotItemActive: css({
    background: '#fff'
  })
});

export default styles;