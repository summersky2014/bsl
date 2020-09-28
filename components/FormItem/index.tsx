import * as classNames from 'classnames';
import * as React from 'react';
import anyuseTimeout, { ListenerCallback } from '../../hooks/anyuseTimeout';
import BSL from '../../typings';
import variable from '../../utils/system/variable';
import Container, { Props as ContainerProps } from '../Container';
import Icon from '../Icon';
import Toast from '../Toast';
import styles from './style';
require('mutationobserver-shim');

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

/** 查找为form的父节点 */
function findFormElement(itemRef: HTMLElement): HTMLFormElement | undefined {
  if (itemRef.tagName.toLocaleLowerCase() === 'form') {
    return itemRef as HTMLFormElement;
  } else if (itemRef.parentElement) {
    return findFormElement(itemRef.parentElement);
  }
}

function FormItem(props: Props) {
  const [setTimeOut, clearTimeOut] = anyuseTimeout();
  const { className, children, requiredPrompt, validatePrompt } = props;
  const [promptVisible, setPromptVisible] = React.useState(false);
  const [clearVisbile, setClearVisible] = React.useState(false);
  const itemRef = React.useRef<HTMLElement | null>(null);
  const formRef = React.useRef<HTMLFormElement>();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const listenerCallback = React.useRef<ListenerCallback>();
  const isTriggerChange = React.useRef(false);

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
      formRef.current = findFormElement(itemRef.current!);
    }

    const changeIconVisible = () => {
      const state = itemRef.current!.dataset['state'] as BSL.RequestState;

      if (state === 'fail' || state === 'empty') {
        setPromptVisible(true);
        setClearVisible(false);
      } else {
        setPromptVisible(false);
        if (props.onClear && isTriggerChange.current) {
          setClearVisible(true);
        }
      }
    };
    const onFocus = () => {
      changeIconVisible();
    };
    const onBlur = () => {
      listenerCallback.current = setTimeOut(() => {
        changeIconVisible();
        setClearVisible(false);
      }, 100);
    };
    const onSubmit = () => {
      listenerCallback.current = setTimeOut(changeIconVisible, 0);
    };
    const onChange = () => {  
      isTriggerChange.current = true;
      changeIconVisible();
    };
 
    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver((mutationsList, observer) => {
      for (let i = 0; i < mutationsList.length; i++) {
        const mutation = mutationsList[i];
        if (mutation.type === 'attributes') {
          changeIconVisible();
        }
      }
    });

    // 以上述配置开始观察目标节点
    observer.observe(itemRef.current!, {
      attributes: true,
      attributeFilter: ['data-state']
    });

    itemRef.current!.addEventListener('input', onChange);
    itemRef.current!.addEventListener('focus', onFocus);
    itemRef.current!.addEventListener('blur', onBlur);
    formRef.current?.addEventListener('submit',onSubmit);

    changeIconVisible();
    return () => {
      if (listenerCallback.current) {
        clearTimeOut(listenerCallback.current);
      }
      itemRef.current!.removeEventListener('change', onChange);
      itemRef.current!.removeEventListener('focus', onFocus);
      itemRef.current!.removeEventListener('blur', onBlur);
      formRef.current?.removeEventListener('submit', onSubmit);
      observer.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Container
      alignItems="center"
      justifyContent="space-between"
      {...props}
      className={classNames(prefixCls, className)}
      ref={containerRef}
    >
      {children ? children : null}
      <div className={classNames((promptVisible || clearVisbile) && styles.iconBox, `${prefixCls}-pormptBox`)}>
        <Icon
          className={classNames(styles.prompt, `${prefixCls}-prompt`)}
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
          className={classNames(styles.clear, `${prefixCls}-clear`)}
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