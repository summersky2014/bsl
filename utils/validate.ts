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
  tel: /^(1[0-9])\d{9}$/,
  /** 座机号 */
  landline: /^((0\d{2,3})-)(\d{7,8})(-(\d{1,3}))?$/,
  /** 金额 */
  price: /^[0-9]+(.[0-9]{1,2})?$/,
  /** 正数 */
  integer: /^(-|\+)?\d+$/,
  /** 身份证号 */
  // tslint:disable-next-line:max-line-length
  idcard: /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/,
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
  },
  // /** emoji */
  // emoji: /\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]/g
};