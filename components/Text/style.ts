import { StyleSheet } from 'aphrodite/no-important';
import { ellipsis, ellipsisLines } from '../../styles/mixins';

const styles = StyleSheet.create({
  ellipsis: ellipsis() as any,
  ellipsisLines: ellipsisLines() as any,
  justify: {
    display: 'flex'
  },
  justifyItem: {
    flex: 1
  }
});

export default styles;