const userAgent = navigator.userAgent;
const system: 'android' | 'ios' = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? 'ios' : 'android';

function getChromeVersion(): number {
  const arr = userAgent.split(' ');
  let chromeVersion = '';

  for (let i = 0; i < arr.length; i++) {
    if (/chrome/i.test(arr[i])) {
      chromeVersion = arr[i];
    }
  }

  if (chromeVersion) {
    return Number(chromeVersion.split('/')[1].split('.')[0]);
  } else {
    return 0;
  }
}

function getIosVersion(): number {
  const str = userAgent.toLowerCase();
  const ver = str.match(/cpu iphone os (.*?) like mac os/);

  return ver ? Number(ver[1].replace(/_/g, '.')) : 0;
}

export default {
  width: document.documentElement ? document.documentElement.clientWidth : 0,
  height: document.documentElement ? document.documentElement.clientHeight : 0,
  userAgent,
  system,
  version: system === 'ios' ? getIosVersion() : getChromeVersion()
};