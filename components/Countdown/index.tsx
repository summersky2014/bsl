import BSL from '../../typings';
import * as React from 'react';
import { addListener, removeListener, ListenerCallback } from '../../app/Scheduler';
import { dateformatReturnObject, ReturnObject } from '../../utils/dateformat';
import newDate from '../../utils/newDate';
import memoAreEqual from '../../utils/memoAreEqual';

interface Props extends BSL.ComponentProps {
  /**
   * @param remainingTime 剩余时间
   */
  children: (remainingTime: ReturnObject) => any;
  /** 时间戳或倒计时毫秒或时间字符串，当number不足13位时value处理成倒计时毫秒 */
  value: number | string;
  /** 倒计时还未开始前的文本 */
  label?: string;
  onClick?: () => boolean;
}

function Countdown(props: Props) {
  const { className, id, style,  value, children, onClick } = props;
  const label = props.label || '';
  const isTimestamp = typeof value === 'string' || value.toString().length === 13;
  const defaultTime = isTimestamp ? 0 : value as number;
  const [time, setTime] = React.useState<number>(defaultTime);
  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    let countdown: ListenerCallback | undefined;
    if (disabled || !onClick) {
      const targetTimestamp = typeof value === 'number' ? value : newDate(value).getTime();
      countdown = (currentTime: number, overTime: number) => { 
        if (overTime >= 1000) {
          const remainingTime = isTimestamp ? targetTimestamp - currentTime : time - 1000;
          
          if (remainingTime > 0) {
            setTime(remainingTime);
          } else if (countdown) {
            setDisabled(false);
            setTime(defaultTime);
            removeListener(countdown);
          }
          return true;
        }
        return false;
      };
      
      addListener(countdown);
    }

    return () => {
      if (countdown) {
        removeListener(countdown);
      }
    };
  }, [time, disabled]);
  
  return !onClick ? (
    <div
      className={className}
      id={id}
      style={style}
    >
      {time ? children(dateformatReturnObject(time)) : label}
    </div>
  ) : (
    <button
      className={className}
      id={id}
      style={style}
      disabled={disabled}
      type="button"
      onClick={() => {
        if (disabled === false) {
          if ((onClick && onClick())) {
            setDisabled(true);
          }
        }
      }}
    >
      {disabled ? children(dateformatReturnObject(time)) : label}
    </button>
  );
}

export default React.memo(Countdown, memoAreEqual);