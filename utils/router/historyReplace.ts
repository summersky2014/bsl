import * as History from 'history';

interface ExtendsWinodw extends Window {
  route: string;
  forward: string;
}

declare const window: ExtendsWinodw;

function getValue(value: string | undefined | null) {
  if (value && value !== 'undefined' && value !== 'null') {
    return value;
  }
  return '';
}

function getRoute(): string | null {
  const urlp = new URLSearchParams(window.location.search);
  const routeKey = getValue(urlp.get('route')) || getValue(urlp.get('?route')) || getValue(urlp.get('%3Froute')) || getValue(urlp.get('%3froute')) || window.route;
  const forward = getValue(urlp.get('forward')) || getValue(urlp.get('?forward')) || getValue(urlp.get('%3Fforward')) || getValue(urlp.get('%3fforward')) || window.forward;

  return routeKey || forward;
}

function hexToString(hex: string): string {
  const arr = hex.split('');
  let out = '';

  for (let i = 0; i < arr.length / 2; i++) {
    const tmp = parseInt('0x' + arr[i * 2] + arr[i * 2 + 1], 16);
    const charValue = String.fromCharCode(tmp);

    out += charValue;
  }

  return decodeURIComponent(out);
}

export default function historyReplace(customRoute?: string): void {
  const hash = window.location.hash;
  
  // 如果有自定义路由，优先跳转自定义路由
  if (customRoute) {
    const history = History.createHashHistory();
    history.replace(customRoute);
  } else if (!hash) {
    /*
    * 如果hahs不存在就代表是从分享链接进来的或是从入口进入到首页
    * 如果是从分享进来的，第一次会从route参数进入跳转，后面再刷新就不会再读取route参数，可以防止刷新后回到分享进来的页面
    */
    const route = getRoute();
    const history = History.createHashHistory();

    if (route) {
      history.replace(hexToString(route));
    }
  }
}