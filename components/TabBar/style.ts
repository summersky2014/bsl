import { css, StyleSheet } from '../../css-in-js';
import { border } from '../../styles/mixins';

const styles = StyleSheet.create({
  root: css({
    ...border('#e3e3e3', 'top'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    background: '#f7f7f7',
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 10
  }),
  item: css({
    margin: '0 auto',
    flex: 1,
    width: 0,
    paddingTop: 2
  }),
  icon: css({
    width: '100%',
    height: 20,
    fill: 'currentColor'
  }),
  text: css({
    color: 'currentColor',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 3
  })
});

export default styles;