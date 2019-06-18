type Env = 'development' | 'production' | 'prerelease';

const env = process.env.NODE_ENV as Env;
const publicPath = process.env.publicPath;
const version = process.env.version;
const outputDir = process.env.outputDir;
const svgRootPath = publicPath + `svg/sprite_${version}.svg#`;

const variable = {
  /** 环境变量 */
  env,
  /** 项目的版本号 */
  version,
  /** 打包输出路径 */
  outputDir,
  /** 资源加载的路径 */
  publicPath,
  /** svg文件根路径 */
  svgRootPath,
  /** 内置组件类名 */
  bslComponent: 'bsl_component'
};

export default variable;