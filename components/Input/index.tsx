import * as React from 'react';
import * as classNames from 'classnames';
import { appData } from '../../app/core';
import { FromTypeProps } from '../Form';
import Helper from './Helper';
import memoAreEqual from '../../utils/memoAreEqual';

type Omit_onChange = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;
type Omit_onChange_value = Omit<Omit_onChange, 'value'>;

interface HTMLInputElementExtends extends HTMLInputElement {
  scrollIntoViewIfNeeded: () => void;
}

export interface Props extends Omit_onChange_value, FromTypeProps<string> {
}

function Input(props: Props) {
  const { onFocus, onChange, type, state, className, value } = props;
  const inputRef = React.useRef<null | HTMLInputElementExtends>(null);

  return (
    <input
      {...props}
      className={classNames('bsl_component', className)}
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
        if (inputRef.current && inputRef.current.scrollIntoViewIfNeeded) {
          inputRef.current.scrollIntoViewIfNeeded();
        }
        if (onFocus) {
          onFocus(e);
        }
      }}
    />
  );
}

function areEqual(prevProps: Props, nextProps: Props): boolean {
  return memoAreEqual(prevProps, nextProps);
}

export { Helper as InputHelper };
export default React.memo(Input, areEqual);
