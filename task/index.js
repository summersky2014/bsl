"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const env = process.env.NODE_ENV;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const isDev = env === 'development' ? true : false;
function webpackConfig(params) {
    const { entry, dirname, publicPath, vender, cssModule } = params;
    const sassResources = params.sassResources || [];
    const addPlugins = params.plugins || [];
    const addVersion = params.addVersion === false ? false : true;
    const outputDir = params.outputDir || 'build';
    const pkg = JSON.parse(fs.readFileSync(path.resolve(dirname, 'package.json'), { encoding: 'utf8' }));
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
    const extract = [{
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
    }
    if (isDev && vender !== false) {
        plugins.push(new webpack.DllReferencePlugin({
            context: 'bsl',
            manifest: require('../vender/manifest.json')
        }));
    }
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
                    ]
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
                        symbolId: (filePath) => {
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
                }, {
                    test: /\.html$/,
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        outputPath: 'html/'
                    }
                }, {
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
                            warnings: false,
                            'drop_console': true,
                            'collapse_vars': true,
                            'reduce_vars': true
                        },
                        output: {
                            beautify: false,
                            comments: false
                        }
                    }
                })
            ]
        }
    };
}
exports.default = webpackConfig;
