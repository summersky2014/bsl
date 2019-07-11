import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/promise';

window.URLSearchParams = require('@ungap/url-search-params').default || require('@ungap/url-search-params') as Window['URLSearchParams'];