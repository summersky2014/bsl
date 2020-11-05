import { css, CSSProperties, StyleSheet } from '../../css-in-js';
import { border } from '../../styles/mixins';

const buttonStyle: CSSProperties = {
  flex: 1,
  textAlign: 'center',
  fontSize: 18,
  cursor: 'pointer'
};
const styles = StyleSheet.create({
  root: css({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    width: 280,
    height: 'auto',
    paddingTop: 18,
    userSelect: 'none'
  }),
  title: css({
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    padding: '10px 0 18px',
    textAlign: 'center'
  }),
  body: css({
    padding: '0 18px 18px',
    fontSize: 14,
    color: '#999',
    textAlign: 'center'
  }),
  footer: css({
    ...border('#d2d3d5', 'top'),
    display: 'flex',
    position: 'relative',
    padding: '13px 0'
  }),
  dismiss: css({
    ...buttonStyle,
    color: '#e94f4f'
  }),
  ok: css({
    ...buttonStyle,
    color: '#09bb07'
  }),
  button: css({
    ...buttonStyle,
    color: '#09bb07'
  }),
  sep: css({
    ...border('#d2d3d5', 'left'),
    width: 1,
    height: '100%',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)'
  })
});

export default styles;