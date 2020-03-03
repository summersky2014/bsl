import { StyleSheet, StyleDeclaration, CSSProperties } from 'aphrodite/no-important';

const size: StyleDeclaration = {
  width: 19,
  height: 19
};
const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center'
  } as CSSProperties,
  select: size,
  unselect: {
    ...size,
    border: '1px solid #aeaeae',
    borderRadius: '50%'
  },
  content: {
    fontSize: 14,
    color: '#000',
    marginLeft: 10
  }
});

export default styles;