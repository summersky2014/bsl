import { StyleSheet, StyleDeclaration } from 'aphrodite/no-important';

const popupEffect: StyleDeclaration = {
  animationDuration: '0.3s',
  animationFillMode: 'both',
  animationTimingFunction: 'cubic-bezier(0.55, 0, 0.55, 0.2)',
  animationPlayState: 'running'
};
const rmcPopupPickerFadeIn: Record<string, StyleDeclaration> = {
  '0%': {
    opacity: 0
  },
  '100%': {
    opacity: 1
  }
};
const rmcPopupPickerFadeOut: Record<string, StyleDeclaration> = {
  '0%': {
    opacity: 1
  },
  '100%': {
    opacity: 0
  }
};
const rmcPopupPickerSlideFadeIn: Record<string, StyleDeclaration> = {
  '0%': {
    transform: 'translate3d(0, 100%, 0)'
  },
  '100%': {
    transform: 'translate3d(0, 0, 0)'
  }
};
const rmcPopupPickerSlideFadeOut: Record<string, StyleDeclaration> = {
  '0%': {
    transform: 'translate3d(0, 0, 0)'
  },
  '100%': {
    transform: 'translate3d(0, 100%, 0)'
  }
};
const styles = StyleSheet.create({
  fadein: {
    ...popupEffect,
    opacity: 0,
    animationName: rmcPopupPickerFadeIn
  },
  fadeout: {
    ...popupEffect,
    animationName: rmcPopupPickerFadeOut
  },
  enter: {
    ...popupEffect,
    transform: 'translate3d(0, 100%, 0)',
    animationName: rmcPopupPickerSlideFadeIn
  },
  leave: {
    ...popupEffect,
    animationName: rmcPopupPickerSlideFadeOut
  }
});

export default styles;