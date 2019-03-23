interface WebpackConfig {
  dirname: string;
  entry?: {
    [key: string]: any;
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
  /** 平台 */
  platform?: '桌面' | '移动';
  /** 是否使用CSS Module */
  cssModule?: boolean;
  /** webpack插件 */
  plugins?: any[];
}

declare let webpackConfig: WebpackConfig;