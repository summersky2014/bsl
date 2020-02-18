/** 对IOS new Date的兼容 */
export default function(date: string | number): Date {
  if (typeof date === 'string') {
    if (date.indexOf(':') > 0) {
      return new Date(date.replace(/\-/g, '/'));
    }
  }
  return new Date(date);
}