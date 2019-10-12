import variable from '../../../utils/variable';

const isDev = variable.env === 'development';
export const rawUrl = isDev ? '' : 'https://raw.githubusercontent.com/summersky2014/bsl/master';
