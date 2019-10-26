import device from '../device';
import anyuseTimeout from '../../hooks/anyuseTimeout';

const iosSetDocumentTitle = require('./iosSetDocumentTitle.html');

export default function setDocumetTitle(title: string): void {
  if (!title) {
    console.warn('标题为空，请设置Page.pageName');
  }

  if (device.system === 'ios') {
    const [setTimeOut] = anyuseTimeout();
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'display: none';
    iframe.src = iosSetDocumentTitle;
    iframe.onload = function() {
      setTimeOut(() => document.body.removeChild(iframe), 300);
    };
    document.body.appendChild(iframe);
  }

  document.title = title;
}