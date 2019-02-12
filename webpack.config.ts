/// <reference path="./typings/webpackConfig.d.ts" />

const task = require('./task').default;
const path = require('path');
webpackConfig = {
  entry: {
    app: path.resolve(__dirname, 'examples/App'),
  },
  dirname: __dirname,
  addVersion: false,
  publicPath: '/build/',
  tsInclude: [
    path.resolve(__dirname, 'examples'),
    path.resolve(__dirname, 'component'),
    path.resolve(__dirname, 'app')
  ]
};

module.exports = task(webpackConfig);