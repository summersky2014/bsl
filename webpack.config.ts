/// <reference path="./typings/webpackConfig.d.ts" />

const task = require('./task').default;
const path = require('path');
const resolve = (filePath) => path.resolve(__dirname, filePath);

webpackConfig = {
  entry: {
    PageStack: resolve('examples/PageStack'),
    Container: resolve('examples/Container'),
    Icon: resolve('examples/Icon'),
  },
  dirname: __dirname,
  addVersion: false,
  vender: false,
  publicPath: '/build/',
  tsInclude: [
    resolve('examples'),
    resolve('component'),
    resolve('app'),
    resolve('hooks'),
    resolve('utils')
  ]
};

module.exports = task(webpackConfig);