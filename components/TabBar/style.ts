import { StyleSheet } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    borderTop: '1px solid #d2d2d2',
    background: '#f7f7f7',
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 10
  },
  item: {
    margin: '0 auto',
    flex: 1,
    width: 0,
    paddingTop: 2
  },
  icon: {
    width: '100%',
    height: 20,
    fill: 'currentColor'
  },
  text: {
    color: 'currentColor',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 3
  }
});

export default styles;