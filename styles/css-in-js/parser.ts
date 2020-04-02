import { prefix } from 'inline-style-prefixer';
import randomString from '../../utils/randomString';
import { CSSProperties } from './type';

export type StyleDeclarationMap = Map<keyof CSSProperties, string | number>;
export type SheetDefinition<T> = {
  [P in keyof T]: CSSProperties | StyleDeclarationMap;
};
type Callback = (rule: string, value: string) => void;

const UPPERCASE_RE = /([A-Z])/g;
const UPPERCASE_RE_TO_KEBAB = (match: string): string => `-${match.toLowerCase()}`;

function kebabifyStyleName(string: string) {
  const result = string.replace(UPPERCASE_RE, UPPERCASE_RE_TO_KEBAB);
  if (result[0] === 'm' && result[1] === 's' && result[2] === '-') {
    return `-${result}`;
  }
  return result;
};

/** 是否是伪类 */
function isPseudo(key: string) {
  const firstChar = key[0];

  if (firstChar === ':') {
    return true;
  }
  return false;
}

/** 
 * 把驼峰命名转换成CSS的规则命名
 * 判断规则是否是伪类，如果是伪类则处理成类名
 * */
function cssRuleFormat(clsName: string, rule: string) {
  const format = kebabifyStyleName(rule);
  if (isPseudo(format)) {
    return clsName + format;
  } else {
    return format;
  }
}

/** 把对象拍平，取出伪类，只支持2层嵌套 */
function flatten<T>(sheetDefinition: SheetDefinition<T>): SheetDefinition<T> {
  const newSheet: any = {};
  const sheetDefinitionKeys = Object.keys(sheetDefinition);

  for (let i = 0; i < sheetDefinitionKeys.length; i++) {
    const wrapKey = sheetDefinitionKeys[i];
    const wrap = sheetDefinition[wrapKey as keyof typeof sheetDefinition] as any; 
    const clsName = `${wrapKey}-${randomString(6)}-${Date.now()}`;
    const wrapKeys = Object.keys(wrap);

    for (let j = 0;j < wrapKeys.length; j++) {
      const rule = wrapKeys[j];
      if (isPseudo(rule)) {
        newSheet[clsName + rule] = Object.assign({}, wrap[rule]);
        delete wrap[rule];
      }
    }
    newSheet[clsName] = sheetDefinition[wrapKey as keyof typeof sheetDefinition];
    sheetDefinition[wrapKey as keyof typeof sheetDefinition] = clsName as any;
  }
  return newSheet as SheetDefinition<T>;
}

function each(cssProperties: CSSProperties, callback: Callback) {
  const keys = Object.keys(cssProperties);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const item = cssProperties[key];
    if (typeof item === 'object' && Array.isArray(item) === false) {
      each(item as any, callback);
    } else {
      callback(key, cssProperties[key] as string);
    }
  }
}

function parser<T>(sheetDefinition: SheetDefinition<T>) {
  const newSheet = flatten(sheetDefinition);
  const keys = Object.keys(newSheet);
  let css = '';

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const wrap = newSheet[key as keyof typeof sheetDefinition];
    const rules: string[] = [];
    const stylePrefix = prefix(wrap);
    
    each(stylePrefix as any, (rule, value) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          rules.push(`${cssRuleFormat(key, rule)}: ${item}`);
        });
      } else {
        rules.push(`${cssRuleFormat(key, rule)}: ${value}`);
      }
    });
    css += `
      .${key} { ${rules.join(';')} }
    `;
  }
 
  return css;
}

export default parser;