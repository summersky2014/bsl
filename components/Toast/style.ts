import { css, CSSProperties, StyleSheet } from '../../css-in-js';

const cirleAnim: Record<string, CSSProperties> = {
  '100%': {
    transform: 'rotate(360deg) translateZ(0)'
  }
};
const styles = StyleSheet.create({
  root: css({
    position: 'fixed',
    zIndex: 1000,
    opacity: 0,
    transition: 'opacity 0.3s',
    userSelect: 'none'
  }),
  mask: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  }),
  nomask: css({
    maxWidth: '50%',
    width: 'auto',
    left: '50%',
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)'
  }),
  text: css({
    minWidth: 60,
    maxWidth: 200,
    borderRadius: 3,
    color: '#fff',
    backgroundColor: 'rgba(58, 58, 58, 0.9)',
    padding: '12px 15px',
    textAlign: 'center',
    fontSize: 14
  }),
  textLabel: css({
    lineHeight: 1.5
  }),
  textIcon: css({
    borderRadius: 5,
    padding: 15
  }),
  textInfo: css({
    marginTop: 8
  }),
  fade: css({
    opacity: 1
  }),
  icon: css({
    margin: '0 auto',
    width: 36,
    height: 36,
    fill: '#fff'
  }),
  iconLoading: css({
    animationName: cirleAnim,
    animationDuration: '1s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  })
});

export default styles;