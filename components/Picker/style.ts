import { StyleSheet } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  panel: {
    height: 238, /*34*7*/
    position: 'relative',
    zIndex: 1
  },
  content: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  item: {
    width: 0,
    height: '100%',
    textAlign: 'center',
    flex: 1,
    userSelect: 'none'
  },
  itemText: {
    fontSize: 14,
    height: 34,
    lineHeight: '34px',
    padding: '0 10px',
    whiteSpace: 'nowrap',
    position: 'relative',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    boxSizing: 'border-box'
  },
  mask: {
    margin: '0 auto',
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    zIndex: 3,
    backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), linear-gradient(to top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6))',
    backgroundPosition: 'top, bottom',
    backgroundSize: '100% 204px',
    backgroundRepeat: 'no-repeat',
    pointerEvents: 'none'
  },
  indicator: {
    boxSizing: 'border-box',
    width: '100%',
    height: 34,
    position: 'absolute',
    left: 0,
    top: 102,
    zIndex: 3,
    borderTop: '1px solid #ddd',
    borderBottom: '1px solid #ddd',
    pointerEvents: 'none'
  },
  popup: {
    bottom: 0,
    left: 0,
    width: '100%',
    height: '282px !important', // 44 + 238
    background: '#fff'
  },
  popupHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundImage: 'linear-gradient(to bottom, #e7e7e7, #e7e7e7, transparent, transparent)',
    backgroundPosition: 'bottom',
    backgroundSize: '100% 1px',
    backgroundRepeat: 'no-repeat',
    position: 'relative'
  },
  popupHeaderLeft: {
    paddingLeft: 15,
    paddingRight: 15
  },
  popupHeaderRight: {
    paddingLeft: 15,
    paddingRight: 15
  },
  popupButton: {
    color: '#0ae',
    fontSize: 14,
    height: 44,
    lineHeight: '44px',
    cursor: 'pointer',
    boxSizing: 'border-box',
    textAlign: 'center',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent'
  },
  popupTitle: {
    flex: 1,
    color: '#666',
    cursor: 'default',
    userSelect: 'none'
  },
  icon: {
    fill: 'currentColor',
    marginLeft: 10,
    width: 12,
    height: 12,
    position: 'relative',
    top: 1
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    cursor: 'pointer'
  },
  label: {
    width: '100%',
    textAlign: 'right'
  }
});

export default styles;