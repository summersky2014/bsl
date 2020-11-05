import { css, StyleSheet } from '../../../css-in-js';
import { clearfix } from '../../../styles/mixins';

const styles = StyleSheet.create({
  root: css({
    overflow: 'hidden'
  }),
  wrap: clearfix() as any,
  item: css({
    float: 'left'
  })
});

export default styles;