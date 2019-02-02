interface WebpackConfig {
  dirname: string;
  entry?: {
    [key: string]: any;
  };
  /** 文件输出路径 */
  outputDir?: string;
  /** 文件加载时的路径 */
  publicPath?: string;
  /** 是否创建路由文件 */
  createRouter?: boolean;
  /** 是否清除output的目录 */
  execClean?: boolean;
  /** 是否添加版本号 */
  addVersion?: boolean;
  /** 复制文件到指定目录 */
  copy?: {
    orginPath: string;
    targetDir: string;
    targetFileName: string;
  }[];
  /** ts-loader include */
  tsInclude?: string[];
  /** 路由的模式 */
  historyMode?: 'hash' | 'browser';
  /** 是否使用dll出来的vender */
  vender?: boolean;
  /** 平台 */
  platform?: '桌面' | '移动';
  /** 是否使用CSS Module */
  cssModule?: boolean;
}

declare let webpackConfig: WebpackConfig;