import { StyleSheet } from 'aphrodite/no-important';

const popupEffect: React.CSSProperties = {
  animationDuration: '0.3s',
  animationFillMode: 'both',
  animationTimingFunction: 'cubic-bezier(0.55, 0, 0.55, 0.2)',
  animationPlayState: 'running'
};
const rmcPopupPickerFadeIn: Record<string, React.CSSProperties> = {
  '0%': {
    opacity: 0
  },
  '100%': {
    opacity: 1
  }
};
const rmcPopupPickerFadeOut: Record<string, React.CSSProperties> = {
  '0%': {
    opacity: 1
  },
  '100%': {
    opacity: 0
  }
};
const rmcPopupPickerSlideFadeIn: Record<string, React.CSSProperties> = {
  '0%': {
    transform: 'translate3d(0, 100%, 0)'
  },
  '100%': {
    transform: 'translate3d(0, 0, 0)'
  }
};
const rmcPopupPickerSlideFadeOut: Record<string, React.CSSProperties> = {
  '0%': {
    transform: 'translate3d(0, 0, 0)'
  },
  '100%': {
    transform: 'translate3d(0, 100%, 0)'
  }
};
const styles = StyleSheet.create({
  fadein: Object.assign({}, popupEffect, {
    opacity: 0,
    animationName: rmcPopupPickerFadeIn
  }),
  fadeout:  Object.assign({}, popupEffect, {
    animationName: rmcPopupPickerFadeOut
  }),
  enter: Object.assign({}, popupEffect, {
    transform: 'translate3d(0, 100%, 0)',
    animationName: rmcPopupPickerSlideFadeIn
  }),
  leave: Object.assign({}, popupEffect, {
    animationName: rmcPopupPickerSlideFadeOut
  })
});

export default styles;