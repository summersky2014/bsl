import { StyleSheet } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    lineHeight: 1.3,
    resize: 'none',
    color: 'inherit',
    fontSize: 'inherit',
    padding: 0
  },
  wrap: {
    position: 'relative',
    minHeight: 100
  },
  pre: {
    fontSize: 'inherit',
    lineHeight: 1.3,
    margin: 0,
    width: '100%',
    padding: 0,
    opacity: 0,
    minHheight: 'inherit',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  },
  preHidden: {
    display: 'none'
  },
  auto: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  },
  wordcount: {
    position: 'absolute',
    fontSize: 14,
    color: '#999999'
  }
});

export default styles;