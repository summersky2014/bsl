import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import { css } from 'aphrodite/no-important';
import styles from './style';

import variable from '../../utils/variable';
import Container, { Props as ContainerProps } from '../Container';
import Icon from '../Icon';
import Toast from '../Toast';

const svgFile = {
  prompt: variable.svgRootPath + require('../../assets/prompt.svg').id
};

export interface Props extends ContainerProps {
  /** 校验失败的文字 */
  validatePrompt?: string;
  /** 必填为空提示文字 */
  requiredPrompt?: string;
}

const prefixCls = 'bsl-formitem';
function FormItem(props: Props) {
  const { className, children, requiredPrompt, validatePrompt } = props;
  const [promptVisible, setPromptVisible] = React.useState(false);
  const itemRef = React.useRef<HTMLElement | null>(null);
  const containerRef = React.createRef<HTMLDivElement>();

  const toast = (msg: string) => {
    if (FormItem.toast) {
      FormItem.toast(msg);
    } else {
      Toast.show(msg, 'fail');
    }
  };
  const setPromptVisibleFn = () => {
    if (itemRef.current) {
      const state = itemRef.current.dataset['state'] as BSL.RequestState;
      setPromptVisible(state === 'fail' || state === 'empty' ? true : false);
    }
  };

  React.useEffect(() => {
    if (itemRef.current === null && containerRef.current) {
      itemRef.current = containerRef.current.querySelector('.' + variable.bslComponent) as HTMLElement;
      setPromptVisibleFn();
    } else {
      setPromptVisibleFn();
    }
  });

  return (
    <Container
      alignItems="center"
      justifyContent="space-between"
      {...props}
      className={classNames(prefixCls, className)}
      ref={containerRef}
    >
      {children}
      <div className={classNames(css(styles.pormptBox), `${prefixCls}-pormptBox`)}>
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
      </div>
    </Container>
  );
}

FormItem.toast = undefined as undefined | ((msg: string) => void);
export default FormItem;
