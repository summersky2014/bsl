import * as React from 'react';
import Container, { Props as ContainerProps } from '../Container';
import Icon from '../Icon';
import variable from '../../utils/variable';
import Toast from '../Toast';
import { Type } from '../SwitchView';
import './index.scss';

const svgFile = {
  prompt: variable.svgRootPath + require('../../assets/prompt.svg').id,
};

interface Props extends ContainerProps {
  /** 校验失败的文字 */
  validatePrompt?: string;
  /** 必填为空提示文字 */
  requiredPrompt?: string;
}

const prefixCls = 'bsl-formitem';
function FormItem(props: Props) {
  const { children, requiredPrompt, validatePrompt } = props;
  const [promptVisible, setPromptVisible] = React.useState(false);
  const itemRef = React.useRef<HTMLElement | null>(null);
  const containerRef = React.createRef<HTMLDivElement>();

  const setPromptVisibleFn = function() {
    if (itemRef.current) {
      const state = itemRef.current.dataset['state'] as Type;
      setPromptVisible(state === 'fail' || state === 'empty' ? true : false);
    }
  };

  React.useEffect(() => {
    if (itemRef.current === null && containerRef.current) {
      itemRef.current = containerRef.current.querySelector('.' + variable.bslComponent) as HTMLElement;
    } else {
      setPromptVisibleFn();
    }
  });

  return (
    <Container
      alignItems="center"
      justifyContent="space-between"
      {...props}
      ref={containerRef}
    >
      {children}
      <Icon
        className={`${prefixCls}-prompt`}
        src={svgFile.prompt}
        onClick={() => {
          const state = itemRef.current!.dataset['state'] as Type;

          if (state === 'empty' && requiredPrompt) {
            Toast.show(requiredPrompt, 'fail');
          } else if (state === 'empty' && !requiredPrompt) {
            console.warn('缺少requiredPrompt');
          }

          if (state === 'fail' && validatePrompt) {
            Toast.show(validatePrompt, 'fail');
          } else if (state === 'fail' && !validatePrompt) {
            console.warn('缺少validatePrompt');
          }
        }}
        style={{
          display: promptVisible ? 'block' : 'none'
        }}
      />
    </Container>
  );
}

export default FormItem;
