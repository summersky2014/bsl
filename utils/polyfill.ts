import 'core-js/es6/map';
import 'core-js/es6/map';
import 'core-js/es6/promise';
import 'core-js/es6/promise';
import 'core-js/es6/set';
import 'core-js/es6/set';

window.URLSearchParams = require('@ungap/url-search-params').default;

if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value: function (callback: any, type: any, quality: any) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const canvas = this;
      setTimeout(function() {
        const binStr = atob( canvas.toDataURL(type, quality).split(',')[1] );
        const len = binStr.length;
        const arr = new Uint8Array(len);

        for (let i = 0; i < len; i++) {
          arr[i] = binStr.charCodeAt(i);
        }

        callback(new Blob([arr], { type: type || 'image/png' }));
      });
    }
  });
}