import * as React from 'react';
import * as style from './index.scss';
import Icon from 'antd/lib/icon';
import * as QRCode from 'qrcode.react';
import Popover from 'antd/lib/popover';

export interface Props {
  path: string;
}

function Phone(props: Props) {
  const { path } = props;

  return (
    <div className={style.component}>
      <div>
        <div className={style.appBar} />
        <div className={style.weixinBar}>
          <div className={style.weixinBarLeft}>
            <div className={style.weixinBarTitle}>鼠标放到右侧二维码上可以扫</div>
          </div>
          <Popover content={<QRCode value={path} />}>
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