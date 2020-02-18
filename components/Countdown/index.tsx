import BSL from '../../typings';
import * as React from 'react';
import { addListener, removeListener, ListenerCallback } from '../../app/Scheduler';
import { dateformatReturnObject, ReturnObject } from '../../utils/date/dateformat';
import newDate from '../../utils/date/newDate';
import memoAreEqual from '../../utils/system/memoAreEqual';

interface Props extends BSL.ComponentProps {
  /**
   * @param remainingTime 剩余时间
   */
  children: (remainingTime: ReturnObject) => any;
  /** 时间戳或倒计时毫秒或时间字符串，当number不足13位时value处理成倒计时毫秒 */
  value: number | string;
  /** 倒计时还未开始前的文本 */
  label?: string;
  /** 重置倒计时的标识 */
  resetId?: any;
  onClick?: () => boolean;
}

function Countdown(props: Props) {
  const { className, id, style,  value, children, onClick } = props;
  const label = props.label || '';
  const isTimestamp = typeof value === 'string' || value.toString().length === 13;
  const defaultTime = isTimestamp ? 0 : value as number;
  const [time, setTime] = React.useState<number>(defaultTime);
  const [disabled, setDisabled] = React.useState(false);
  const countdown = React.useRef<ListenerCallback>();
  const reset = () => {
    if (countdown.current) {
      setDisabled(false);
      setTime(defaultTime);
      removeListener(countdown.current);
    }
  };

  React.useEffect(() => {
    let targetTimestamp: number;
    if (disabled || !onClick) {   
      if (isTimestamp) {
        targetTimestamp = typeof value === 'number' ? value : newDate(value).getTime();
      } else {
        targetTimestamp = Date.now() + time;
      }
      countdown.current = (currentTime: number, overTime: number) => { 
        if (overTime >= 1000) {
          const remainingTime = targetTimestamp - currentTime;
          
          if (remainingTime > 0) {
            setTime(remainingTime);
          } else {
            reset();
          }
          return true;
        }
        return false;
      };      
      addListener(countdown.current);
    }

    return () => {
      if (countdown.current) {
        removeListener(countdown.current);
      }
    };
  }, [time, disabled]);

  React.useEffect(() => {
    if (props.resetId !== undefined) {
      reset();
    }
  }, [props.resetId]);
  
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