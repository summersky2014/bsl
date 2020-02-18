/** 电话号码格式化，前三后四格式  */
export function telFormat(tel: string) {
  let newStr = '';

  for (let i = 0; i < tel.length; i++) {
    if (i === 3 || i === 7) {
      newStr += ' ';
    }
    newStr += tel[i];
  }

  return newStr;
}

