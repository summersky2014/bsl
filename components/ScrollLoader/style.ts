import { StyleSheet } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  root: {
    padding: '12px 0',
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    ':empty': {
      display: 'none'
    }
  }
});

export default styles;