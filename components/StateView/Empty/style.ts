import { StyleSheet } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  label: {
    color: 'rgba(0,0,0,0.65)',
    fontSize: 16,
    paddingTop: 10,
    textAlign: 'center'
  }
});

export default styles;