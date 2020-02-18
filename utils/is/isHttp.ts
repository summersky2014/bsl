/** url是否是http协议 */
export default function isHttp(url: string): boolean {
  return url.indexOf('http://')  >= 0 || url.indexOf('https://') >= 0 || url.indexOf('./') >= 0 || url.indexOf('../') >= 0;
}