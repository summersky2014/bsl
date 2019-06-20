import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/es/promise';

window.URLSearchParams = require('@ungap/url-search-params').default || require('@ungap/url-search-params') as Window['URLSearchParams'];