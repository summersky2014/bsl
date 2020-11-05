import { css, StyleSheet } from '../../css-in-js';
import { ellipsis, ellipsisLines } from '../../styles/mixins';

const styles = StyleSheet.create({
  ellipsis: ellipsis() as any,
  ellipsisLines: ellipsisLines() as any,
  justify: css({
    display: 'flex'
  }),
  justifyItem: css({
    flex: 1
  })
});

export default styles;