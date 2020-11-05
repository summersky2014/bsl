import { css, StyleSheet } from '../../css-in-js';

const styles = StyleSheet.create({
  panel: css({
    height: 238, /*34*7*/
    position: 'relative',
    zIndex: 1
  }),
  content: css({
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    overflow: 'hidden'
  }),
  item: css({
    width: 0,
    height: '100%',
    textAlign: 'center',
    flex: 1,
    userSelect: 'none'
  }),
  itemText: css({
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
  }),
  mask: css({
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
  }),
  indicator: css({
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
  }),
  popup: css({
    bottom: 0,
    left: 0,
    width: '100%',
    height: '282px !important', // 44 + 238
    background: '#fff'
  }),
  popupHeader: css({
    display: 'flex',
    justifyContent: 'space-between',
    backgroundImage: 'linear-gradient(to bottom, #e7e7e7, #e7e7e7, transparent, transparent)',
    backgroundPosition: 'bottom',
    backgroundSize: '100% 1px',
    backgroundRepeat: 'no-repeat',
    position: 'relative'
  }),
  popupHeaderLeft: css({
    paddingLeft: 15,
    paddingRight: 15
  }),
  popupHeaderRight: css({
    paddingLeft: 15,
    paddingRight: 15
  }),
  popupButton: css({
    color: '#0ae',
    fontSize: 14,
    height: 44,
    lineHeight: '44px',
    cursor: 'pointer',
    boxSizing: 'border-box',
    textAlign: 'center',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent'
  }),
  popupTitle: css({
    flex: 1,
    color: '#666',
    cursor: 'default',
    userSelect: 'none'
  }),
  icon: css({
    fill: 'currentColor',
    marginLeft: 5,
    width: 12,
    height: 12,
    position: 'relative',
    top: 1
  }),
  button: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    cursor: 'pointer'
  }),
  label: css({
    width: '100%',
    textAlign: 'right'
  })
});

export default styles;