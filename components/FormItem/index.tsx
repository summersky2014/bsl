import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import { css } from 'aphrodite/no-important';
import styles from './style';

import variable from '../../utils/system/variable';
import anyuseTimeout, { ListenerCallback } from '../../hooks/anyuseTimeout';
import Container, { Props as ContainerProps } from '../Container';
import Icon from '../Icon';
import Toast from '../Toast';

const svgFile = {
  prompt: variable.svgRootPath + require('../../assets/prompt.svg').id,
  clear: variable.svgRootPath + require('../../assets/clear.svg').id
};

export interface Props extends ContainerProps {
  /** 校验失败的文字 */
  validatePrompt?: string;
  /** 必填为空提示文字 */
  requiredPrompt?: string;
  onClear?: () => void;
}

const prefixCls = 'bsl-formitem';
function FormItem(props: Props) {
  const [setTimeOut, clearTimeOut] = anyuseTimeout();
  const { className, children, requiredPrompt, validatePrompt } = props;
  const [promptVisible, setPromptVisible] = React.useState(false);
  const [clearVisbile, setClearVisible] = React.useState(false);
  const itemRef = React.useRef<HTMLElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const listenerCallback = React.useRef<ListenerCallback>();

  const toast = (msg: string) => {
    if (FormItem.toast) {
      FormItem.toast(msg);
    } else {
      Toast.show(msg, 'fail');
    }
  };

  React.useEffect(() => {
    if (itemRef.current === null && containerRef.current) {
      itemRef.current = containerRef.current.querySelector('.' + variable.bslComponent) as HTMLElement;
    }
    const setPromptIconVisible = () => {
      const state = itemRef.current!.dataset['state'] as BSL.RequestState;
      setPromptVisible(state === 'fail' || state === 'empty' ? true : false);
    };
    const onFocus = () => {
      if (props.onClear) {
        setClearVisible(true);
        setPromptVisible(false);
      }
    };
    const onBlur = () => {
      setPromptVisible(false);
      listenerCallback.current = setTimeOut(() => {
        setClearVisible(false);
        setPromptIconVisible();
      }, 100);
    };
    itemRef.current!.addEventListener('change', setPromptIconVisible);
    itemRef.current!.addEventListener('focus', onFocus);
    itemRef.current!.addEventListener('blur', onBlur);

    setPromptIconVisible();
    return () => {
      if (listenerCallback.current) {
        clearTimeOut(listenerCallback.current);
      }
      itemRef.current!.removeEventListener('change', setPromptIconVisible);
      itemRef.current!.removeEventListener('focus', onFocus);
      itemRef.current!.removeEventListener('blur', onBlur);
    };
  }, []);
  
  return (
    <Container
      alignItems="center"
      justifyContent="space-between"
      {...props}
      className={classNames(prefixCls, className)}
      ref={containerRef}
    >
      {children}
      <div className={classNames(css(promptVisible && styles.pormptBox), `${prefixCls}-pormptBox`)}>
        <Icon
          className={classNames(css(styles.prompt), `${prefixCls}-prompt`)}
          src={svgFile.prompt}
          onClick={() => {
            const state = itemRef.current!.dataset['state'] as BSL.RequestState;

            if (state === 'empty' && requiredPrompt) {
              toast(requiredPrompt);
            } else if (state === 'empty' && !requiredPrompt) {
              console.warn('缺少requiredPrompt');
            }

            if (state === 'fail' && validatePrompt) {
              toast(validatePrompt);
            } else if (state === 'fail' && !validatePrompt) {
              console.warn('缺少validatePrompt');
            }
          }}
          style={{
            display: promptVisible ? 'block' : 'none'
          }}
        />
        <Icon
          className={classNames(css(styles.clear), `${prefixCls}-clear`)}
          src={svgFile.clear}
          onClick={props.onClear}
          style={{
            display: clearVisbile ? 'block' : 'none'
          }}
        />
      </div>
    </Container>
  );
}

FormItem.toast = undefined as undefined | ((msg: string) => void);
export default FormItem;
