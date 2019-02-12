/// <reference path="./typings/webpackConfig.d.ts" />

const docsTask = require('./task').default;
const nodePath = require('path');
webpackConfig = {
  entry: {
    index: nodePath.resolve(__dirname, 'docs/src/Launcher.tsx'),
  },
  dirname: __dirname,
  addVersion: false,
  vender: false,
  outputDir: './docs/build/',
  tsInclude: [
    nodePath.resolve(__dirname, 'docs'),
    nodePath.resolve(__dirname, 'component'),
    nodePath.resolve(__dirname, 'app')
  ]
};

module.exports = docsTask(webpackConfig);