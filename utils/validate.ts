const pattern = {
  /** 空格 */
  space: /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
  /** 数字 */
  number: /^\d+$/,
  /** 大写，小写，数字及特殊字符 */
  char: /((?=[\x21-\x7e]+)[^A-Za-z0-9])/,
  /** 姓名 */
  name: /^[\u4e00-\u9fa5]{1,20}$/,
  /** 手机号 */
  tel: /^(1\d{2}|852|853|832)\d{8}$|^886\d{9,10}$/,
  /** 座机号 */
  landline: /^((0\d{2,3})-)(\d{7,8})(-(\d{1,3}))?$/,
  /** 金额 */
  price: /^[0-9]+(.[0-9]{1,2})?$/,
  /** 正数 */
  integer: /^(-|\+)?\d+$/,
  /** 身份证号 */
  // tslint:disable-next-line:max-line-length
  idcard: 
  /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0\d|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
  // /** emoji */
  emoji: /\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]/g,
  email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
};

export default {
  /** 空格 */
  // space: /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
  // /** 数字 */
  // number: /^\d+$/,
  // /** 大写，小写，数字及特殊字符 */
  // char: /((?=[\x21-\x7e]+)[^A-Za-z0-9])/,
  /** 姓名 */
  name: (value: string) => {
    const regexp = new RegExp(pattern.name);
    return regexp.test(value);
  },
  /** 手机号 */
  tel: (value: string) => {
    const regexp = new RegExp(pattern.tel);
    return regexp.test(value);
  },
  email(value: string) {
    const regexp = new RegExp(pattern.email);
    return regexp.test(value);
  },
  // /** 座机号 */
  // landline: /^((0\d{2,3})-)(\d{7,8})(-(\d{1,3}))?$/,
  // /** 金额 */
  // price: /^[0-9]+(.[0-9]{1,2})?$/,
  /** 正数 */
  integer: (value: string) => {
    const regexp = new RegExp(pattern.integer);
    return regexp.test(value);
  },
  /** 身份证号 */
  idcard: (value: string) => {
    const regexp = new RegExp(pattern.idcard);
    return regexp.test(value);
  }
  // /** emoji */
  // emoji: /\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]/g
};