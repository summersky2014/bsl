/** 对IOS new Date的兼容 */
export default function(dateStr: string): Date {
  if (dateStr.indexOf(':') > 0) {
    return new Date(dateStr.replace(/\-/g, '/'));
  } else {
    return new Date(dateStr);
  }
}