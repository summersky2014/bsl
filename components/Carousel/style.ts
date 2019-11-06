import { StyleSheet } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
    visibility: 'hidden',
    position: 'relative'
  },
  wrapper: {
    overflow: 'hidden',
    position: 'relative'
  },
  child: {
    float: 'left',
    width: '100%',
    position: 'relative',
    transitionProperty: 'transform'
  }
});

export default styles;