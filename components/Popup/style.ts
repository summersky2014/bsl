import { css, CSSProperties, StyleSheet } from '../../css-in-js';

const popupEffect: CSSProperties = {
  animationDuration: '0.3s',
  animationFillMode: 'both',
  animationTimingFunction: 'cubic-bezier(0.55, 0, 0.55, 0.2)',
  animationPlayState: 'running'
};
const rmcPopupPickerFadeIn: Record<string, CSSProperties> = {
  '0%': {
    opacity: 0
  },
  '100%': {
    opacity: 1
  }
};
const rmcPopupPickerFadeOut: Record<string, CSSProperties> = {
  '0%': {
    opacity: 1
  },
  '100%': {
    opacity: 0
  }
};
const rmcPopupPickerSlideFadeIn: Record<string, CSSProperties> = {
  '0%': {
    transform: 'translate3d(0, 100%, 0)'
  },
  '100%': {
    transform: 'translate3d(0, 0, 0)'
  }
};
const rmcPopupPickerSlideFadeOut: Record<string, CSSProperties> = {
  '0%': {
    transform: 'translate3d(0, 0, 0)'
  },
  '100%': {
    transform: 'translate3d(0, 100%, 0)'
  }
};
const styles = StyleSheet.create({
  fadein: css({
    ...popupEffect,
    opacity: 0,
    animationName: rmcPopupPickerFadeIn
  }),
  fadeout: css({
    ...popupEffect,
    animationName: rmcPopupPickerFadeOut
  }),
  enter: css({
    ...popupEffect,
    transform: 'translate3d(0, 100%, 0)',
    animationName: rmcPopupPickerSlideFadeIn
  }),
  leave: css({
    ...popupEffect,
    animationName: rmcPopupPickerSlideFadeOut
  })
});

export default styles;