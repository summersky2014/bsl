import { StyleSheet } from 'aphrodite/no-important';
import { clearfix } from '../../../styles/mixins';

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden'
  },
  wrap: clearfix() as any,
  item: {
    float: 'left'
  }
});

export default styles;