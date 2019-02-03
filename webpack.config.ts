/// <reference path="./typings/webpackConfig.d.ts" />

const task = require('./task').default;
const path = require('path');
webpackConfig = {
  entry: {
    'app/PageStack': path.resolve(__dirname, 'demo/PageStack'),
    // 'component/Auth': path.resolve(__dirname, '__demo/component/Auth'),
    // 'component/Banner': path.resolve(__dirname, '__demo/component/Banner'),
    // 'component/Button': path.resolve(__dirname, '__demo/component/Button'),
    // 'component/Border': path.resolve(__dirname, '__demo/component/Border'),
    // 'component/Calendar': path.resolve(__dirname, '__demo/component/Calendar'),
    // 'component/Carousel': path.resolve(__dirname, '__demo/component/Carousel'),
    // 'component/Choice': path.resolve(__dirname, '__demo/component/Choice'),
    // 'component/Container': path.resolve(__dirname, '__demo/component/Container'),
    // 'component/Countdown': path.resolve(__dirname, '__demo/component/Countdown'),
    // 'component/DatePicker': path.resolve(__dirname, '__demo/component/DatePicker'),
    // 'component/Form': path.resolve(__dirname, '__demo/component/Form'),
    // 'component/FormItem': path.resolve(__dirname, '__demo/component/FormItem'),
    // 'component/Filter': path.resolve(__dirname, '__demo/component/Filter'),
    // // 'component/Icon': path.resolve(__dirname, '_demo/component/Icon'),
    // // 'component/ImgView': path.resolve(__dirname, '_demo/component/ImgView'),
    // 'component/Input': path.resolve(__dirname, '__demo/component/Input'),
    // 'component/Keyboard': path.resolve(__dirname, '__demo/component/Keyboard'),
    // // 'component/List': path.resolve(__dirname, '__demo/component/List'),
    // // // 'component/Map': path.resolve(__dirname, '_demo/component/Map'),
    // 'component/Mask': path.resolve(__dirname, '__demo/component/Mask'),
    // // // 'component/Modal': path.resolve(__dirname, '_demo/component/Modal'),
    // 'component/PageStack': path.resolve(__dirname, '__demo/component/PageStack'),
    // 'component/Picker': path.resolve(__dirname, '__demo/component/Picker'),
    // 'component/Popup': path.resolve(__dirname, '__demo/component/Popup'),
    // // // 'component/Text': path.resolve(__dirname, '_demo/component/Text'),
    // // // 'component/View': path.resolve(__dirname, '_demo/component/View'),
    // 'component/VerticalScroll': path.resolve(__dirname, '__demo/component/VerticalScroll'),
  },
  dirname: __dirname,
  createRouter: false,
  addVersion: false,
  publicPath: '/build/',
  tsInclude: [
    path.resolve(__dirname, 'demo'),
    // path.resolve(__dirname, '_base'),
    path.resolve(__dirname, 'component'),
    // path.resolve(__dirname, 'chart'),
    // path.resolve(__dirname, 'model'),
    // path.resolve(__dirname, 'utils'),
    path.resolve(__dirname, 'app')
  ],
  // copy: [{
  //   orginPath: './node_modules/react-virtualized/styles.css',
  //   targetDir: './build/css',
  //   targetFileName: 'react-virtualized.css'
  // }]
};

module.exports = task(webpackConfig);