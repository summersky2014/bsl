interface WebpackConfig {
  dirname: string;
  entry: {
    [key: string]: string;
  };
  /** 文件输出路径 */
  outputDir?: string;
  /** 文件加载时的路径 */
  publicPath?: string;
  /** 是否添加版本号 */
  addVersion?: boolean;
  /** ts-loader include */
  tsInclude?: string[];
  /** 是否使用dll出来的vender */
  vender?: boolean;
  /** 是否使用CSS Module */
  cssModule?: boolean;
  /** webpack插件 */
  plugins?: string[];
  /** sass文件资源，用于全局引用 */
  sassResources?: string[];
  /** webpack的target配置 */
  target?: "web" | "webworker" | "node" | "async-node" | "node-webkit" | "atom" | "electron" | "electron-renderer" | "electron-preload" | "electron-main";
  /** webpack的externals配置 */
  externals?: string[];
}

declare let webpackConfig: WebpackConfig;