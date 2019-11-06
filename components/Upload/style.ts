import { StyleSheet } from 'aphrodite/no-important';

const icon: React.CSSProperties = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1
};
const styles = StyleSheet.create({
  root: {
    width: 58,
    height: 58,
    border: '1px solid #cccccc',
    position: 'relative'
  },
  addIcon: Object.assign({}, icon, {
    width: 28,
    height: 28,
    fill: '#cccccc'
  }),
  fileIcon: Object.assign({}, icon, {
    width: 40,
    height: 40,
    fill: '#6a7fa5'
  }),
  input: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
    opacity: 0
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1
  },
  notUploaded: {
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    background: 'rgba(255, 255, 255, 0.85)',
    pointerEvents: 'none',
    transition: 'height 0.3s'
  },
  clear: {
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
  }
});

export default styles;