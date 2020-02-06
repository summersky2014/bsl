import { StyleSheet } from 'aphrodite/no-important';

const iconStyles = {
  width: 19,
  height: 19,
  borderRadius: '50%',
  cursor: 'pointer'
};
const styles = StyleSheet.create({
  prompt: {
    ...iconStyles,
    background: '#ffe2e2',
    fill: '#ff0000'
  },
  clear: {
    ...iconStyles,
    background: '#fff',
    fill: '#a7a5a2'
  },
  pormptBox: {
    paddingLeft: 12
  }
});

export default styles;