/// <reference path="./typings/webpackConfig.d.ts" />

const task = require('./task').default;
const path = require('path');
webpackConfig = {
  entry: {
    PageStack: path.resolve(__dirname, 'examples/PageStack'),
    Container: path.resolve(__dirname, 'examples/Container'),
    Icon: path.resolve(__dirname, 'examples/Icon'),
  },
  dirname: __dirname,
  addVersion: false,
  vender: false,
  publicPath: '/build/',
  tsInclude: [
    path.resolve(__dirname, 'examples'),
    path.resolve(__dirname, 'component'),
    path.resolve(__dirname, 'app')
  ]
};

module.exports = task(webpackConfig);