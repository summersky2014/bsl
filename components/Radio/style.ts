import { StyleSheet, StyleDeclaration } from 'aphrodite/no-important';

const size: StyleDeclaration = {
  width: 19,
  height: 19
};
const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignContent: 'center'
  },
  select: size,
  unselect: {
    ...size,
    border: '1px solid #aeaeae',
    borderRadius: '50%'
  },
  text: {
    fontSize: 14,
    color: '#000',
    marginLeft: 10
  }
});

export default styles;