/// <reference path="./typings/webpackConfig.d.ts" />

const docsTask = require('./task').default;
const nodePath = require('path');
webpackConfig = {
  entry: {
    index: nodePath.resolve(__dirname, 'docs/src/App.tsx'),
  },
  dirname: __dirname,
  addVersion: false,
  vender: false,
  outputDir: './docs/dist/',
  tsInclude: [
    nodePath.resolve(__dirname, 'docs'),
    nodePath.resolve(__dirname, 'component'),
    nodePath.resolve(__dirname, 'app')
  ],
  copy: [{
    orginPath: './node_modules/antd/dist/antd.min.css',
    targetDir: 'docs/dist/css',
    targetFileName: 'antd.min.css'
  }],
};

module.exports = docsTask(webpackConfig);