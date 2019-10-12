/// <reference path="../typings/webpackConfig.d.ts" />
import * as path from 'path';
import * as fs from 'fs';
import * as webpack from 'webpack';
import BSL from '../typings';

interface Package {
  version: string;
}

type Config = webpack.Configuration;
const env = process.env.NODE_ENV as BSL.Env;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const isDev = env === 'development' ? true : false;

export default function webpackConfig(params: WebpackConfig): Config {
  const { entry, dirname, publicPath, vender, cssModule } = params;
  const sassResources = params.sassResources || [];
  const addPlugins = params.plugins || [];
  const addVersion = params.addVersion === false ? false : true;
  const outputDir = params.outputDir || 'build';
  const pkg: Package = JSON.parse(fs.readFileSync(path.resolve(dirname, 'package.json'), { encoding: 'utf8' }));
  const version = pkg.version;
  const filename = addVersion ? `[name]_${version}.js` : '[name].js';
  const tsInclude = params.tsInclude || [];
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
        version: JSON.stringify(version),
        outputDir: JSON.stringify(outputDir),
        publicPath: JSON.stringify(publicPath),
        addVersion: JSON.stringify(addVersion)
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new SpriteLoaderPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu/),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CleanWebpackPlugin(),
    new ExtractTextPlugin({
      filename: addVersion ? `css/[name]_${version}.css` : 'css/[name].css',
      allChunks: true
    }),
    new webpack.WatchIgnorePlugin([
      /\.d\.ts$/
    ]),
    ...addPlugins
  ];
  const extract: any[] = [{
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: [
        require('autoprefixer')()
      ],
      sourceMap: isDev
    }
  }, {
    loader: 'sass-loader',
    options: {
      outputStyle: 'expanded',
      sourceMap: isDev
    }
  }, {
    loader: 'sass-resources-loader',
    options: {
      resources: [
        path.resolve(__dirname, '../styles/mixins.scss'),
        path.resolve(__dirname, '../styles/variable.scss'),
        ...sassResources
      ]
    }
  }];

  if (cssModule !== false) {
    extract.unshift({
      loader: 'typings-for-css-modules-loader',
      options: {
        modules: true,
        namedExport: true,
        camelCase: true,
        minimize: !isDev,
        localIdentName: '[local]_[hash:base64:5]'
      }
    });
    // extract.unshift({
    //   loader: 'dts-css-modules-loader',
    //   options: {
    //     namedExport: true,
    //   }
    // }, {
    //   loader: 'css-loader',
    //   options: {
    //     modules: {
    //       mode: 'local',
    //       localIdentName: '[local]_[hash:base64:5]',
    //     },
    //     localsConvention: 'camelCaseOnly',
    //     // localIdentName: '[local]_[hash:base64:5]',
    //     onlyLocals: true,
    //   }
    // });
  }
  if (isDev && vender !== false) {
    plugins.push(new webpack.DllReferencePlugin({
      context: 'bsl',
      manifest: require('../vender/manifest.json')
    }));
  }
  // else  {
  //   plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  // }
  return {
    entry,
    devtool: isDev ? 'inline-source-map' : false,
    output: {
      publicPath,
      path: path.resolve(dirname, outputDir),
      filename: './js/' + filename,
      chunkFilename: 'js/' + filename
    },
    module: {
      rules: [{
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: [
          path.resolve(dirname, 'src'),
          ...tsInclude
        ],
        options: {
          // tsConfigFile: path.resolve(dirname, './tsconfig.json'),
        }
      }, {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        include: [
          path.resolve(dirname, 'src'),
          path.resolve(dirname, './node_modules/bsl'),
          ...tsInclude
        ]
      }, {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          esModule: false,
          symbolId: (filePath: string) => {
            const indexOfStr = 'src' + path.sep;
            const srcIndex = filePath.indexOf(indexOfStr);
            const symbolId = filePath.substr(srcIndex + indexOfStr.length).replace('.svg', '').replace(/\/|\\/g, '_');
            return symbolId;
          },
          spriteFilename: addVersion ? `/svg/sprite_${pkg.version}.svg` : `/svg/sprite.svg`
        }
      }, {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: 'img/'
        }
      },{
        test: /\.md$/,
        use: [{
          loader: "raw-loader"
        }]
      }, {
        test: /\.(scss)$/,
        use: ExtractTextPlugin.extract({
          use: extract
        })
      }]
    },
    resolve: {
      alias: {
        moment$: 'moment/moment.js'
      },
      extensions: ['.webpack.js', '.web.js', '.js', '.jsx', '.tsx', '.ts', '.web.ts', '.scss', '.css'],
      modules: isDev ? [path.resolve(dirname, 'node_modules')] : undefined,
      mainFields: isDev ? ['jsnext:main', 'main'] : undefined
    },
    plugins,
    stats: {
      children: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      entrypoints: false,
      reasons: false,
      source: false,
      modules: false,
      excludeAssets: [/\.(png|jpg|gif)$/]
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: 5,
            compress: {
              // 在UglifyJs删除没有用到的代码时不输出警告
              warnings: false,
              // 删除所有的 console 语句
              // 还可以兼容ie浏览器
              'drop_console': true,
              // 内嵌定义了但是只用到一次的变量
              'collapse_vars': true,
              // 提取出出现多次但是没有定义成变量去引用的静态值
              'reduce_vars': true
            },
            output: {
              // 最紧凑的输出
              beautify: false,
              // 删除所有的注释
              comments: false
            }
          }
        })
      ]
    }
  };
}