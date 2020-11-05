import { css, StyleSheet } from '../../css-in-js';

const iconStyles = {
  width: '19px',
  height: '19px',
  borderRadius: '50%',
  cursor: 'pointer'
};
const styles = StyleSheet.create({
  prompt: css({
    ...iconStyles,
    background: '#ffe2e2',
    fill: '#ff0000'
  }),
  clear: css({
    ...iconStyles,
    background: '#fff',
    fill: '#a7a5a2'
  }),
  iconBox: css({
    paddingLeft: '12px'
  })
});

export default styles;