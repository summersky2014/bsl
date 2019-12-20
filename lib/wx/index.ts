/// <reference path="./type.d.ts" />
import { ImageView } from '../../components/Image';
import isHttp from '../../utils/isHttp';

declare const wx: typeof WechatJSSDK;
const { hex_sha1 } = require('./sha1.js');

interface OnShareParams {
  title: string;
  desc: string;
  imgUrl: string;
  link?: string;
  callback?: () => void;
}

interface InitConfigParams {
  appId: string;
  ticket: string;
  apiList: WechatJSSDK.JSApiList[];
  routerMode: 'hash' | 'browser';
}
/** 是否是微信浏览器 */
export const isWxClient = !!window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i);

// 需要屏蔽的按钮
const conventionMenuItem: WechatJSSDK.MenuList[] = [
  'menuItem:share:qq',
  'menuItem:share:weiboApp',
  'menuItem:share:facebook',
  'menuItem:share:QZone',
  'menuItem:editTag',
  'menuItem:delete',
  'menuItem:copyUrl',
  'menuItem:originPage',
  'menuItem:readMode',
  'menuItem:openWithQQBrowser',
  'menuItem:openWithSafari',
  'menuItem:share:email',
  'menuItem:share:brand'
];

function getHttpUrl(src: string | undefined) {
  const host = ImageView.defaultHost;
  const url = src && isHttp(src) ? src : host + src;

  return url;
}

/** 初始化配置，对应wx.config */
export function initConfig(params: InitConfigParams) {
  if (isWxClient === false) {
    return;
  }
  const { apiList, appId, ticket, routerMode } = params;
  const timestamp = new Date().getTime().toString();
  const nonceStr = 'ak0os7h1dojn51ojvs5r8lfwsq3debsu';
  const url = routerMode === 'browser' ? window.location.href : window.location.href.split('#')[0];
  const data = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;
  const signature = hex_sha1(data);
  wx.config({
    debug: false,
    appId,
    timestamp,
    nonceStr,
    signature,
    jsApiList: apiList
  });
}

/** 隐藏所有非基础按钮接口 */
export function hideAllNonBaseMenuItem() {
  if (isWxClient === false) {
    return;
  }
  wx.ready(() => {
    wx.hideAllNonBaseMenuItem();
  });
}

/** 常见隐藏菜单配置 */
export function hideConventionMenuItem() {
  if (isWxClient === false) {
    return;
  }
  wx.ready(() => {
    // @ts-ignore
    wx.showOptionMenu();
    wx.hideMenuItems({
      menuList: conventionMenuItem
    });
  });
}

/** 在常见菜单配置基础隐藏所有分享 */
export function hideShareMenuItem() {
  if (isWxClient === false) {
    return;
  }
  wx.ready(() => {
    const menuList: WechatJSSDK.MenuList[] = [
      ...conventionMenuItem,
      'menuItem:share:appMessage',
      'menuItem:share:timeline',
      'menuItem:favorite'
    ];
    // @ts-ignore
    wx.showOptionMenu();
    wx.hideMenuItems({
      menuList
    });
  });
}

/** 微信分享 */
export function onShare(params: OnShareParams): void {
  if (isWxClient === false) {
    return;
  }
  wx.ready(() => {
    const callback = params.callback;
    const title = params.title;
    const desc = params.desc;
    const imgUrl = params.imgUrl && getHttpUrl(params.imgUrl);
    // const pathname = global.history.location.pathname;
    const link = (params && params.link) || location.href;

    hideConventionMenuItem();
    ['updateAppMessageShareData', 'updateTimelineShareData'].forEach((item) => {
      // @ts-ignore
      wx[item]({
        title,
        desc,
        link,
        imgUrl,
        success: callback
      });
    })
  });
}

export function chooseWXPay(options: WechatJSSDK.chooseWxPayOptions) {
  wx.chooseWXPay(options);
}