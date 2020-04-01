const stylesheet = {
  'minHeight': 'min-height'
};

/** 是否是伪类 */
export function isPseudo(key: string) {
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
  const newRule = stylesheet[rule as keyof typeof stylesheet];

  if (newRule) {
    return newRule;
  } else if (isPseudo(rule)) {
    return clsName + rule;
  } else{
    return rule;
  }
}

export default cssRuleFormat;