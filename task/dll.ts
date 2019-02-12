const webpack = require('webpack');
const path = require('path');

const vendors = [
  // 'axios',
  // 'better-scroll',
  // 'classnames',
  // 'lodash',
  // 'url-search-params',
  'react',
  'react-dom',
  'react-router',
  'react-router-dom',
];

module.exports = {
  output: {
    path: path.resolve(__dirname, '../vender'),
    filename: '[name].js',
    library: '[name]_[chunkhash]',
  },
  entry: {
    vendor: vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path: './vender/manifest.json',
      name: '[name]_[chunkhash]',
      context: 'bsl',
    }),
  ],
};