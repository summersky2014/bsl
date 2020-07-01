import * as classNames from 'classnames';
import * as React from 'react';
import { appData } from '../../app/core';
import anyuseTimeout, { ListenerCallback } from '../../hooks/anyuseTimeout';
import memoAreEqual from '../../utils/system/memoAreEqual';
import variable from '../../utils/system/variable';
import { FromTypeProps } from '../Form';
import Helper from './Helper';

type OmitAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>;
// type Omit_onChange_value = Omit<Omit_onChange, 'value'>;

interface HTMLInputElementExtends extends HTMLInputElement {
  scrollIntoViewIfNeeded: () => void;
}

export interface Props extends OmitAttributes, FromTypeProps<string> {
}

export const prefixCls = 'bsl-input';
function Input(props: Props) {
  const { onFocus, onChange, type, state, className, value } = props;
  const inputRef = React.useRef<HTMLInputElementExtends>(null);
  const [setTimeOut, clearTimeOut] = anyuseTimeout();
  const listenerCallback = React.useRef<ListenerCallback>();
  const isFocus = React.useRef(false);

  React.useEffect(() => {
    const onResize = () => {
      if (inputRef.current && isFocus.current && inputRef.current.scrollIntoViewIfNeeded) {
        inputRef.current.scrollIntoViewIfNeeded();
      }
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (listenerCallback.current) {
        clearTimeOut(listenerCallback.current);
      }
    };
  }, [clearTimeOut]);

  return (
    <input
      {...props}
      className={classNames(variable.bslComponent, prefixCls, className)}
      ref={inputRef}
      data-state={state}
      autoComplete={type === 'password' ? 'new-password' : undefined}
      value={value}
      onChange={(e) => {
        appData.inputFoucs = true;
        if (onChange) {
          onChange(e.target.value);
        }
      }}
      onFocus={(e) => {
        isFocus.current = true;
        listenerCallback.current = setTimeOut(() => {
          if (inputRef.current && inputRef.current.scrollIntoViewIfNeeded) {
            inputRef.current.scrollIntoViewIfNeeded();
          }
        }, 150);
        if (onFocus) {
          onFocus(e);
        }
      }}
      onBlur={(e) => {
        isFocus.current = false;
        if (props.onBlur) {
          props.onBlur(e);
        }
      }}
    />
  );
}

export { Helper as InputHelper };
export default React.memo(Input, memoAreEqual);
