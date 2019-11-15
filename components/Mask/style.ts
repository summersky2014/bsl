import { StyleSheet } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  root: {
    position: 'fixed',
    width: '100%',
    height: '100vh',
    zIndex: 10,
    top: 0,
    left: 0
  },
  content: {
    position: 'absolute',
    outline: 0,
    zIndex: 2
  },
  bg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: 'rgba(55, 55, 55, 0.6)'
  }
});

export default styles;