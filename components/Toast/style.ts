import { StyleSheet, StyleDeclaration } from 'aphrodite/no-important';

const cirleAnim: Record<string, StyleDeclaration> = {
  '100%': {
    transform: 'rotate(360deg) translateZ(0)'
  }
};
const styles = StyleSheet.create({
  root: {
    position: 'fixed',
    zIndex: 1000,
    opacity: 0,
    transition: 'opacity 0.3s',
    userSelect: 'none'
  },
  mask: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  nomask: {
    maxWidth: '50%',
    width: 'auto',
    left: '50%',
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)'
  },
  text: {
    minWidth: 60,
    maxWidth: 200,
    borderRadius: 3,
    color: '#fff',
    backgroundColor: 'rgba(58, 58, 58, 0.9)',
    padding: '12px 15px',
    textAlign: 'center',
    fontSize: 14
  },
  textLabel: {
    lineHeight: 1.5
  },
  textIcon: {
    borderRadius: 5,
    padding: 15
  },
  textInfo: {
    marginTop: 8
  },
  fade: {
    opacity: 1
  },
  icon: {
    margin: '0 auto',
    width: 36,
    height: 36,
    fill: '#fff'
  },
  iconLoading: {
    animationName: cirleAnim,
    animationDuration: '1s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  }
});

export default styles;