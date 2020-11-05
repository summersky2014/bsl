import { css, CSSProperties, StyleSheet } from '../../css-in-js';

const icon: CSSProperties = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1
};
const styles = StyleSheet.create({
  root: css({
    width: 58,
    height: 58,
    border: '1px solid #cccccc',
    position: 'relative'
  }),
  addIcon: css({
    ...icon,
    width: 28,
    height: 28,
    fill: '#cccccc'
  }),
  fileIcon: css({
    ...icon,
    width: 40,
    height: 40,
    fill: '#6a7fa5'
  }),
  input: css({
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
    opacity: 0
  }),
  img: css({
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1
  }),
  notUploaded: css({
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    background: 'rgba(255, 255, 255, 0.85)',
    pointerEvents: 'none',
    transition: 'height 0.3s'
  }),
  clear: css({
    width: 20,
    height: 20,
    fill: '#e94f4f',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
    transform: 'translate(50%, -50%)',
    background: '#fff',
    borderRadius: '50%'
  })
});

export default styles;