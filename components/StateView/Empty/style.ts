import { create, css } from '../../../styles/css-in-js';

const styles = create({
  root: css({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }),
  label: css({
    color: 'rgba(0,0,0,0.65)',
    fontSize: '16px',
    paddingTop: '10px',
    textAlign: 'center'
  })
});

export default styles;