/// <reference path="./typings/webpackConfig.d.ts" />

const docsTask = require('./task').default;
const nodePath = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const examplePath = './docs/src/pages/Component';

webpackConfig = {
  entry: {
    index: nodePath.resolve(__dirname, 'docs/src/App.tsx'),
    Container: nodePath.resolve(__dirname, examplePath, './Container/基本用法/index.tsx'),
    Icon: nodePath.resolve(__dirname, examplePath, './Icon/基本用法/index.tsx'),
    PageStack: nodePath.resolve(__dirname, examplePath, './PageStack/基本用法/index.tsx')
  },
  dirname: __dirname,
  addVersion: false,
  vender: false,
  outputDir: './docs/dist/',
  publicPath: '/bsl/docs/dist/',
  tsInclude: [
    nodePath.resolve(__dirname, 'docs'),
    nodePath.resolve(__dirname, 'component'),
    nodePath.resolve(__dirname, 'hooks'),
    nodePath.resolve(__dirname, 'utils'),
    nodePath.resolve(__dirname, 'app')
  ],
  plugins: [
    new CopyPlugin([{
      from: './node_modules/antd/dist/antd.min.css',
      to: 'css/antd.min.css'
    }], {
      copyUnmodified: true
    })
  ]
};
module.exports = docsTask(webpackConfig);