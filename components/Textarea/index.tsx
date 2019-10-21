import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import { appData } from '../../app/core';
import { FromTypeProps } from '../Form';
import TextareaHelper from './Helper';
import memoAreEqual from '../../utils/memoAreEqual';
import variable from '../../utils/variable';
import './index.scss';

interface Props extends BSL.ComponentProps, DefaultProps, FromTypeProps<string> {
  disabled?: boolean;
  placeholder?: string;
  /** 最大字数 */
  maxLength?: number;
  /** 是否显示字数 */
  wordCount?: boolean;
  /** 字数节点类名 */
  wordCountCls?: string;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

interface DefaultProps {
  /** textarea rows */
  rows?: number;
  /** 是否自动增长高度 */
  auto?: boolean;
}

const prefixCls = 'bsl-textarea';

function Textarea(props: Props) {
  const { auto, id, className, disabled, placeholder, wordCount, wordCountCls, state, onFocus } = props;
  const rows = props.rows || 5;
  const maxLength = props.maxLength;
  const preRef = React.createRef<HTMLPreElement>();

  React.useEffect(() => {
    if (auto && preRef.current) {
      preRef.current.textContent = props.value;
    }
  }, [props.value]);

  return (
    <div
      className={classNames(variable.bslComponent, `${prefixCls}-wrap`, className)}
      style={props.style}
      id={props.id}
      data-state={state}
    >
      <pre
        className={classNames({
          [`${prefixCls}-hidecode`]: auto,
          [`${prefixCls}-hidecode-hidden`]: !auto
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
        onFocus={onFocus}
        onKeyDown={(e) => {
          if (auto && preRef.current && e.keyCode === 13) {
            preRef.current.textContent += ' ';
          }
        }}
        rows={rows}
      />
      {wordCount ? (
        <div className={classNames(`${prefixCls}-wordcount`, wordCountCls)}>
          <span className={`${prefixCls}-wordcount-current`}>{props.value.length}</span>
          <span className={`${prefixCls}-wordcount-split`}>/</span>
          <span className={`${prefixCls}-wordcount-max`}>{maxLength}</span>
        </div>
      ) : null}
    </div>
  );
}

function areEqual(prevProps: Props, nextProps: Props): boolean {
  return memoAreEqual(prevProps, nextProps);
}

export { TextareaHelper };
export default React.memo(Textarea, areEqual);
