import { create, css } from '../../styles/css-in-js';

const size = {
  width: '19px',
  height: '19px'
};
const styles = create({
  root: css({
    display: 'flex',
    alignItems: 'center'
  }),
  select: css(size),
  unselect: css({
    ...size,
    border: '1px solid #aeaeae',
    borderRadius: '50%'
  }),
  content: css({
    fontSize: '14px',
    color: '#000',
    marginLeft: '10px'
  })
});

export default styles;