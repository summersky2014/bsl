import { css, StyleSheet } from '../../css-in-js';

const styles = StyleSheet.create({
  root: css({
    padding: '12px 0',
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    ':empty': {
      display: 'none'
    }
  })
});

export default styles;