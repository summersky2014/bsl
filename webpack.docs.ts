/// <reference path="./typings/webpackConfig.d.ts" />

const docsTask = require('./task').default;
const nodePath = require('path');
const CopyPlugin = require('copy-webpack-plugin');

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
  plugins: [
    new CopyPlugin([{
      from: './node_modules/antd/dist/antd.min.css',
      to: 'css/antd.min.css'
    }], {
      copyUnmodified: true
    }),
  ]
};
module.exports = docsTask(webpackConfig);