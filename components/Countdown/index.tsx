import * as React from 'react';
import { addListener, ListenerCallback, removeListener } from '../../app/Scheduler';
import BSL from '../../typings';
import { dateformatReturnObject, ReturnObject } from '../../utils/date/dateformat';
import newDate from '../../utils/date/newDate';
import memoAreEqual from '../../utils/system/memoAreEqual';

export interface Props extends BSL.ComponentProps {
  /**
   * @param remainingTime 剩余时间
   */
  children: (remainingTime: ReturnObject, currentTime?: number) => any;
  /** 时间戳或倒计时毫秒或时间字符串，当number不足13位时value处理成倒计时毫秒 */
  value: number | string;
  /** 倒计时还未开始前的文本 */
  label?: any;
  /** 重置倒计时的标识 */
  resetId?: any;
  onClick?: () => boolean;
  /** 倒计时结束时触发 */
  onOver?: () => void;
}

function Countdown(props: Props) {
  const { className, id, style,  value, children, onClick } = props;
  const label = props.label || '';
  const isTimestamp = typeof value === 'string' || value.toString().length === 13;
  const defaultTime = isTimestamp ? 0 : value as number;
  const [time, setTime] = React.useState<number>(defaultTime);
  const [disabled, setDisabled] = React.useState(false);
  const countdown = React.useRef<ListenerCallback>();
  const currentTimeRef = React.useRef(0);
  const reset = () => {
    if (countdown.current) {
      setDisabled(false);
      setTime(defaultTime);
      removeListener(countdown.current);
    }
  };
  
  React.useEffect(() => {
    let targetTimestamp: number;
    let timer: number | NodeJS.Timer;
    if (disabled || !onClick) {   
      if (isTimestamp) {
        targetTimestamp = typeof value === 'number' ? value : newDate(value).getTime();
      } else {
        targetTimestamp = Date.now() + time;
      }
      countdown.current = (currentTime: number, overTime: number) => { 
        currentTimeRef.current = currentTime;
        if (overTime >= 1000) {
          const remainingTime = targetTimestamp - currentTime;
          if (remainingTime > 0) {
            setTime(remainingTime);
          } else {
            reset();
            if (props.onOver) {
              props.onOver();
            }
          }
          return true;
        }
        return false;
      };
      timer = setTimeout(() => {
        countdown.current!(Date.now(), 1000); 
      }, 0);
      addListener(countdown.current);
    }

    return () => {
      if (countdown.current) {
        removeListener(countdown.current);
      }
      if (timer) {
        clearTimeout(timer as number);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, value, disabled]);

  React.useEffect(() => {
    if (props.resetId !== undefined) {
      reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resetId]);
  
  return !onClick ? (
    <div
      className={className}
      id={id}
      style={style}
    >
      {time ? children(dateformatReturnObject(time), currentTimeRef.current) : label}
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
      {disabled ? children(dateformatReturnObject(time), currentTimeRef.current) : label}
    </button>
  );
}

export default React.memo(Countdown, memoAreEqual);