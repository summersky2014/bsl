import makeExports from './exports';
import { generateCSS } from './generate';
import { CSSProperties } from './type';
import { importantify } from './util';

const Aphrodite = makeExports();

function css(style: CSSProperties) {
  return style;
}

const {
  StyleSheet,
  StyleSheetServer,
  StyleSheetTestUtils,
  minify,
  flushToStyleTag,
  injectAndGetClassName,
  defaultSelectorHandlers,
  reset,
  resetInjectedStyle
} = Aphrodite;

export {
  StyleSheet,
  StyleSheetServer,
  StyleSheetTestUtils,
  css,
  minify,
  flushToStyleTag,
  injectAndGetClassName,
  defaultSelectorHandlers,
  reset,
  resetInjectedStyle,
  importantify,
  CSSProperties,
  generateCSS
};
