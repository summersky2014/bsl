import * as React from 'react';
import * as style from './index.scss';
import { Icon, Popover } from 'antd';
import * as QRCode from 'qrcode.react';

export interface Props {
  path: string;
}

function Phone(props: Props) {
  const { path } = props;
  const url = location.origin + location.pathname + path;

  return (
    <div className={style.component}>
      <div>
        <div className={style.appBar} />
        <div className={style.weixinBar}>
          <div className={style.weixinBarLeft}>
            <div className={style.weixinBarTitle}>鼠标放到右侧二维码上可以扫</div>
          </div>
          <Popover content={<QRCode value={url} />}>
            <Icon className={style.qrcodeIcon} type="qrcode" />
          </Popover>
        </div>
      </div>
      <div className={style.webview}>
        <iframe className={style.iframe} src={path} />
      </div>
    </div>
  );
}

export default Phone;