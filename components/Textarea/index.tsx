import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import { appData } from '../../app/core';
import { FromTypeProps } from '../Form';
import TextareaHelper from './Helper';
import memoAreEqual from '../../utils/memoAreEqual';
import './index.scss';

interface Props extends BSL.ComponentProps, DefaultProps, FromTypeProps<string> {
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  wordCount?: boolean;
  wordCountCls?: string;
}

interface DefaultProps {
  /** textarea rows */
  rows?: number;
  /** 是否自动增长高度 */
  auto?: boolean;
}

const prefixCls = 'bsl-textarea';

function Textarea(props: Props) {
  const { auto, id, className, disabled, placeholder, wordCount, wordCountCls } = props;
  const rows = props.rows || 5;
  const maxLength = props.maxLength;
  const preRef = React.createRef<HTMLPreElement>();

  React.useEffect(() => {
    if (auto && preRef.current) {
      preRef.current.textContent = props.value;
    }
  }, [props.value]);

  return (
    <div className={classNames(`${prefixCls}-wrap`, className)}>
      <pre
        className={classNames({
          [`${prefixCls}-hidecode`]: auto,
          [`${prefixCls}-hidecode-hidden`]: !auto,
        })}
        ref={preRef}
      />
      <textarea
        id={id}
        className={classNames(prefixCls, {
          [`${prefixCls}-disabled`]: disabled,
          [`${prefixCls}-auto`]: auto
        })}
        placeholder={placeholder}
        value={props.value}
        maxLength={maxLength}
        disabled={disabled}
        onChange={(e) => {
          appData.inputFoucs = true;

          if (props.onChange) {
            props.onChange(e.target.value);
          }
        }}
        onKeyUp={(e) => {
          if (auto && preRef.current && e.keyCode === 13) {
            preRef.current.textContent += ' ';
          }
        }}
        rows={rows}
      />
      {wordCount ? (
        <div className={classNames(`${prefixCls}-wordcount`, wordCountCls)}>{props.value.length}/{maxLength}</div>
      ) : null}
    </div>
  );
}

function areEqual(prevProps: Props, nextProps: Props): boolean {
  return memoAreEqual(prevProps, nextProps);
}

export { TextareaHelper };
export default React.memo(Textarea, areEqual);
