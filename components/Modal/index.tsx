import BSL from '../../typings';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as classNames from 'classnames';
import Mask from '../Mask';
import Container from '../Container';
import { getContainer } from '../../utils/getContainer';
import './index.scss';

export interface Props extends BSL.ComponentProps  {
  /**
   * 使用命令式调用时，值为undefined
   * 使用声明式调用时，值为boolean
   */
  visible: boolean | undefined;
  title?: string;
  /** 主体内容 */
  children?: any;
  dismissText?: string;
  okText?: string;
  /** 是否只有确认按钮 */
  onlyOk?: boolean;
  onOk?: () => void;
  onClose?: () => void;
}

interface ShowProps extends Omit<Props, 'visible'> {
}

let container: HTMLElement | null = null;
const prefixCls = 'bsl-modal';

function Modal(props: Props) {
  const { title, okText, dismissText, children, onlyOk } = props;
  const [stateVisible, setStateVisible] = React.useState(false);
  const realVisible = props.visible === undefined ? stateVisible : props.visible;
  const onClose = () => {
    // 使用命令式调用时，不用传visible参数
    if (props.visible === undefined) {
      setStateVisible(false);
    }

    if (props.onClose) {
      props.onClose();
    }
  };
  const onOk = () => {
    onClose();
    if (props.onOk) {
      props.onOk();
    }
  };

  React.useEffect(() => {
    // 使用命令式调用时，不用传visible参数
    if (props.visible === undefined) {
      setStateVisible(true);
    }

    return () => {
      // 防止意外关闭时也能调用onClose方法
      if (stateVisible === true) {
        onClose();
      }
    };
  }, []);

  return (
    <Mask
      contentCls={classNames(prefixCls, props.className)}
      style={props.style}
      id={props.id}
      visible={realVisible}
      closable={false}
    >
      {title ? <div className={`${prefixCls}-title`}>{title}</div> : null}
      <div className={`${prefixCls}-body`}>{children}</div>
      <Container className={`${prefixCls}-footer`} justifyContent="space-between">
      {!onlyOk ? (
        <React.Fragment>
          <div className={`${prefixCls}-footer-dismiss`} onClick={onClose} >{dismissText || '取消'}</div>
          <div className={`${prefixCls}-footer-sep`} />
          <div className={`${prefixCls}-footer-ok`} onClick={onOk}>{okText || '确定'}</div>
        </React.Fragment>
      ) : (
        <div className={`${prefixCls}-footer-button`} onClick={onOk}>{okText || '知道了'}</div>
      )}
      </Container>
    </Mask>
  );
}

Modal.show = function(props: ShowProps) {
  if (container) {
    ReactDom.unmountComponentAtNode(container);
    document.body.removeChild(container);
    container = null;
  }
  container = getContainer();
  ReactDom.render((
    <Modal visible={undefined} {...props} />
  ), container);
};

export default Modal;