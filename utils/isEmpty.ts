/** 简单的判断非空 */
export default function isEmpty(value: any): boolean {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else if (value && typeof value === 'object' && Object.keys(value).length === 0) {
    return true;
  } else {
    return value === undefined || value === null || (typeof value === 'string' && value === '');
  }
}