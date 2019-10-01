const webpack = require('webpack');
// @ts-ignore
const path = require('path');

const vendors = [
  'axios',
  '@better-scroll/core',
  'classnames',
  'core-js',
  'react',
  'react-dom',
  'react-router',
  'react-router-dom',
  'exif-js',
  'swipe-js-iso',
  'create-subscription',
  'intersection-observer'
];

module.exports = {
  output: {
    path: path.resolve(__dirname, '../vender'),
    filename: '[name].js',
    library: '[name]_[chunkhash]'
  },
  entry: {
    vendor: vendors
  },
  plugins: [
    new webpack.DllPlugin({
      path: './vender/manifest.json',
      name: '[name]_[chunkhash]',
      context: 'bsl'
    })
  ]
};