/** 对IOS new Date的兼容 */
export default function(date: string | number): Date {
  if (typeof date === 'string') {
    return new Date(date.replace(/\-/g, '/'));
  }
  return new Date(date);
}