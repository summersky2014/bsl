"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodePath = require("path");
const task_1 = require("./task");
const CopyPlugin = require('copy-webpack-plugin');
const examplePath = './docs/src/pages/Component';
const isDev = process.env.NODE_ENV === 'development';
const webpackConfig = {
    entry: {
        index: nodePath.resolve(__dirname, 'docs/src/App.tsx'),
        BackTop: nodePath.resolve(__dirname, examplePath, './BackTop/基本用法/index.tsx'),
        Carousel: nodePath.resolve(__dirname, examplePath, './Carousel/基本用法/index.tsx'),
        Choice: nodePath.resolve(__dirname, examplePath, './Choice/基本用法/index.tsx'),
        Container: nodePath.resolve(__dirname, examplePath, './Container/基本用法/index.tsx'),
        Countdown: nodePath.resolve(__dirname, examplePath, './Countdown/基本用法/index.tsx'),
        DatePicker: nodePath.resolve(__dirname, examplePath, './DatePicker/基本用法/index.tsx'),
        Download: nodePath.resolve(__dirname, examplePath, './Download/基本用法/index.tsx'),
        Form: nodePath.resolve(__dirname, examplePath, './Form/基本用法/index.tsx'),
        Icon: nodePath.resolve(__dirname, examplePath, './Icon/基本用法/index.tsx'),
        Image: nodePath.resolve(__dirname, examplePath, './Image/基本用法/index.tsx'),
        Mask: nodePath.resolve(__dirname, examplePath, './Mask/基本用法/index.tsx'),
        Modal: nodePath.resolve(__dirname, examplePath, './Modal/基本用法/index.tsx'),
        Picker: nodePath.resolve(__dirname, examplePath, './Picker/基本用法/index.tsx'),
        Popup: nodePath.resolve(__dirname, examplePath, './Popup/基本用法/index.tsx'),
        PageStack: nodePath.resolve(__dirname, examplePath, './PageStack/基本用法/index.tsx'),
        RequestView: nodePath.resolve(__dirname, examplePath, './RequestView/基本用法/index.tsx'),
        Scroll: nodePath.resolve(__dirname, examplePath, './Scroll/基本用法/index.tsx'),
        ScrollLoader: nodePath.resolve(__dirname, examplePath, './ScrollLoader/基本用法/index.tsx'),
        Tab: nodePath.resolve(__dirname, examplePath, './Tab/基本用法/index.tsx'),
        Text: nodePath.resolve(__dirname, examplePath, './Text/基本用法/index.tsx'),
        Toast: nodePath.resolve(__dirname, examplePath, './Toast/基本用法/index.tsx'),
        Upload: nodePath.resolve(__dirname, examplePath, './Upload/基本用法/index.tsx')
    },
    dirname: __dirname,
    addVersion: false,
    vender: false,
    outputDir: './docs/dist/',
    publicPath: isDev ? '/docs/dist/' : '/bsl/docs/dist/',
    tsInclude: [
        nodePath.resolve(__dirname, 'docs'),
        nodePath.resolve(__dirname, 'component'),
        nodePath.resolve(__dirname, 'hooks'),
        nodePath.resolve(__dirname, 'utils'),
        nodePath.resolve(__dirname, 'app'),
        nodePath.resolve(__dirname, 'styles')
    ],
    plugins: [
        new CopyPlugin([{
                from: './node_modules/antd/es/style/index.css',
                to: 'css/antd.css'
            }, {
                from: './node_modules/antd/es/alert/style/index.css',
                to: 'css/antd.alert.css'
            }, {
                from: './node_modules/antd/es/icon/style/index.css',
                to: 'css/antd.icon.css'
            }, {
                from: './node_modules/antd/es/popover/style/index.css',
                to: 'css/antd.popover.css'
            }], {
            copyUnmodified: true
        })
    ]
};
module.exports = task_1.default(webpackConfig);
