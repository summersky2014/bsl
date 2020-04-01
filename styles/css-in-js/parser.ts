import { prefix } from 'inline-style-prefixer';
import cssRuleFormat, { isPseudo } from './stylesheet';
import { CSSProperties } from './type';

export type StyleDeclarationMap = Map<keyof CSSProperties, string | number>;
export type SheetDefinition<T> = {
  [P in keyof T]: CSSProperties | StyleDeclarationMap;
};

type Callback = (rule: string, value: string) => void;

/** 把对象拍平，取出伪类，只支持2层嵌套 */
function flatten<T>(sheetDefinition: SheetDefinition<T>): SheetDefinition<T> {
  const newSheet: any = {};

  Object.keys(sheetDefinition).forEach((wrapKey) => {
    const wrap = sheetDefinition[wrapKey as keyof typeof sheetDefinition] as any;
    const clsName = wrapKey + '-' + Date.now();
    Object.keys(wrap).forEach((rule) => {
      if (isPseudo(rule)) {
        newSheet[clsName + rule] = Object.assign({}, wrap[rule]);
        delete wrap[rule];
      }
    });
    newSheet[clsName] = sheetDefinition[wrapKey as keyof typeof sheetDefinition];
    sheetDefinition[wrapKey as keyof typeof sheetDefinition] = clsName as any;
  });

  return newSheet as SheetDefinition<T>;
}

function each(cssProperties: CSSProperties, callback: Callback) {
  Object.keys(cssProperties).forEach((key) => {
    const item = cssProperties[key];
    if (typeof item === 'object') {
      each(item as any, callback);
    } else {
      callback(key, cssProperties[key] as string);
    }
  });
}

function parser<T>(sheetDefinition: SheetDefinition<T>) {
  let css = '';
  const newSheet = flatten(sheetDefinition);

  Object.keys(newSheet).forEach((wrapKey) => {
    const wrap = newSheet[wrapKey as keyof typeof sheetDefinition];
    const rules: string[] = [];
    const stylePrefix = prefix(wrap);
    each(stylePrefix as any, (rule, value) => {
      rules.push(`${cssRuleFormat(wrapKey, rule)}: ${value}`);
    });
    css += `
      .${wrapKey} { ${rules.join(';')} }
    `;
  });

  return css;
}

export default parser;