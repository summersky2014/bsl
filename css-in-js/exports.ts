import { defaultSelectorHandlers } from './generate';
import { hashString } from './util';
import type { SheetDefinition, RenderFunction, Extension } from './type';

/* @flow */
import {
  injectAndGetClassName,
  reset,
  resetInjectedStyle,
  startBuffering,
  flushToString,
  flushToStyleTag,
  addRenderedClassNames,
  getRenderedClassNames,
  getBufferedStyles,
} from './inject';

/* ::
import type { SelectorHandler } from './generate.js';

*/


const unminifiedHashFn = (str: string, key: string) => `${key}_${hashString(str)}`;

// StyleSheet.create is in a hot path so we want to keep as much logic out of it
// as possible. So, we figure out which hash function to use once, and only
// switch it out via minify() as necessary.
//
// This is in an exported function to make it easier to test.
export const initialHashFn = () => process.env.NODE_ENV === 'production'
  ? hashString
  : unminifiedHashFn;

let hashFn = initialHashFn();

const StyleSheet = {
  create(sheetDefinition: SheetDefinition): Record<string, string> {
    const keys = Object.keys(sheetDefinition);
    const recordCls: Record<string, string> = {};

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const val = sheetDefinition[key];
      const stringVal = JSON.stringify(val);
      const item = {
        _len: stringVal.length,
        _name: hashFn(stringVal, key),
        _definition: val,
      };
      recordCls[key] = injectAndGetClassName(item, []);
    }

  
    return recordCls;
  },

  rehydrate(renderedClassNames /* : string[] */ =[]) {
    addRenderedClassNames(renderedClassNames);
  },
};

/**
 * Utilities for using Aphrodite server-side.
 *
 * This can be minified out in client-only bundles by replacing `typeof window`
 * with `"object"`, e.g. via Webpack's DefinePlugin:
 *
 *   new webpack.DefinePlugin({
 *     "typeof window": JSON.stringify("object")
 *   })
 */
const StyleSheetServer = typeof window !== 'undefined'
  ? null
  : {
    renderStatic(renderFunc: RenderFunction) {
      reset();
      startBuffering();
      const html = renderFunc();
      const cssContent = flushToString();

      return {
        html: html,
        css: {
          content: cssContent,
          renderedClassNames: getRenderedClassNames(),
        },
      };
    },
  };

/**
 * Utilities for using Aphrodite in tests.
 *
 * Not meant to be used in production.
 */
const StyleSheetTestUtils = process.env.NODE_ENV === 'production'
  ? null
  : {
    /**
        * Prevent styles from being injected into the DOM.
        *
        * This is useful in situations where you'd like to test rendering UI
        * components which use Aphrodite without any of the side-effects of
        * Aphrodite happening. Particularly useful for testing the output of
        * components when you have no DOM, e.g. testing in Node without a fake DOM.
        *
        * Should be paired with a subsequent call to
        * clearBufferAndResumeStyleInjection.
        */
    suppressStyleInjection() {
      reset();
      startBuffering();
    },

    /**
        * Opposite method of preventStyleInject.
        */
    clearBufferAndResumeStyleInjection() {
      reset();
    },

    /**
        * Returns a string of buffered styles which have not been flushed
        *
        * @returns {string}  Buffer of styles which have not yet been flushed.
        */
    getBufferedStyles() {
      return getBufferedStyles();
    }
  };

/**
 * Generate the Aphrodite API exports, with given `selectorHandlers` and
 * `useImportant` state.
 */
export default function makeExports(selectorHandlers = defaultSelectorHandlers) {
  return {
    StyleSheet: {
      ...StyleSheet,

      /**
             * Returns a version of the exports of Aphrodite (i.e. an object
             * with `css` and `StyleSheet` properties) which have some
             * extensions included.
             *
             * @param {Array.<Object>} extensions: An array of extensions to
             *     add to this instance of Aphrodite. Each object should have a
             *     single property on it, defining which kind of extension to
             *     add.
             * @param {SelectorHandler} [extensions[].selectorHandler]: A
             *     selector handler extension. See `defaultSelectorHandlers` in
             *     generate.js.
             *
             * @returns {Object} An object containing the exports of the new
             *     instance of Aphrodite.
             */
      extend(extensions: Extension[]) {
        const extensionSelectorHandlers = extensions
        // Pull out extensions with a selectorHandler property
          .map(extension => extension.selectorHandler)
        // Remove nulls (i.e. extensions without a selectorHandler property).
          .filter(handler => handler);

        return makeExports(selectorHandlers.concat(extensionSelectorHandlers));
      },
    },

    StyleSheetServer,
    StyleSheetTestUtils,

    minify(shouldMinify: boolean) {
      hashFn = shouldMinify ? hashString : unminifiedHashFn;
    },
    flushToStyleTag,
    injectAndGetClassName,
    defaultSelectorHandlers,
    reset,
    resetInjectedStyle,
  };
}
