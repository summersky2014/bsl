import leftPad from './leftPad';
import newDateFn from './newDate';
import { Value } from '../components/Picker/Item';

/**
 * 日期模式
 * 参考：https://www.zhihu.com/question/23730083
 */
export type Mode = (
  'ss' | 'mm' | 'HH' | 'dd' | 'MM' | 'yy' | 'HHmm' |
  'mmss' | 'HHmmss' | 'ddHHmmss' | 'MMddHHmmss' | 'yyMMddHHmmss' |
  'yyMM' | 'yyMMdd' | 'yyMMddHH' | 'yyMMddHHmm' | 'auto'
);

export interface ReturnObject {
  time: number;
  day: number;
  hour: number;
  min: number;
  sec: number;
}

export const SEC = 1000;
export const MIN = 60 * SEC;
export const HOUR = 60 * MIN;
export const DAY = 24 * HOUR;
export const MINMONTH = 28 * DAY;
export const MINYEAR = 365 * DAY;

function getValue(value: Value): string {
  return leftPad(value.value as number);
}

function pickerValueFormat(value: Value[], mode: Mode): string {
  if (value.length > 0) {
    switch (mode) {
      case 'yyMM':
        return `${value[0].value}-${getValue(value[1])}`;
      case 'yyMMdd':
        return `${value[0].value}-${getValue(value[1])}-${getValue(value[2])}`;
      case 'yyMMddHHmm':
        return `${value[0].value}-${getValue(value[1])}-${getValue(value[2])} ${getValue(value[3])}:${getValue(value[4])}`;
      default:
        return '';
    }
  }
  return '';
}

export default function dateformat(date: string | number | Date | Value[], mode: Mode, useLeftPad?: boolean): string {
  const type = typeof date;
  let newDate: Date;

  if (type === 'string') {
    newDate = newDateFn(date as string);
  } else if (type === 'number') {
    newDate = new Date(date as number);
  } else if (Array.isArray(date)) {
    return pickerValueFormat(date, mode);
  } else {
    newDate = date as Date;
  }

  const newTime = newDate.getTime();
  const year = useLeftPad ? leftPad(newDate.getFullYear()) : newDate.getFullYear();
  const month = useLeftPad ? leftPad(newDate.getMonth() + 1) : newDate.getMonth() + 1;
  const day = useLeftPad ? leftPad(newDate.getDate()) : newDate.getDate();
  const hour = useLeftPad ? leftPad(newDate.getHours()) : newDate.getHours();
  const min = useLeftPad ? leftPad(newDate.getMinutes()) : newDate.getMinutes();
  const sec = useLeftPad ? leftPad(newDate.getSeconds()) : newDate.getSeconds();
  const isAuto = mode === 'auto';
  let str = '';

  if (mode.indexOf('yy') >= 0 || (isAuto && newTime > MINYEAR)) {
    str += year.toString();
  }
  if (mode.indexOf('MM') >= 0 || (isAuto && newTime > MINMONTH)) {
    str += str ? '-' + month : month.toString();
  }
  if (mode.indexOf('dd') >= 0 || (isAuto && newTime > DAY)) {
    str += str ? '-' + day : day.toString();
  }
  if (mode.indexOf('HH') >= 0 || (isAuto && newTime > HOUR)) {
    str += str ? ' ' + hour : hour.toString();
  }
  if (mode.indexOf('mm') >= 0 || (isAuto && newTime > MIN)) {
    str += str ? ':' + min : min.toString();
  }
  if (mode.indexOf('ss') >= 0 || (isAuto && newTime > SEC)) {
    str += str ? ':' + sec : sec.toString();
  }

  return str;
}

export function dateformatReturnObject(date: string | number | Date | Value[]): ReturnObject {
  const type = typeof date;
  let newDate: Date;

  if (type === 'string') {
    newDate = newDateFn(date as string);
  } else if (type === 'number') {
    newDate = new Date(date as number);
  } else {
    newDate = date as Date;
  }

  const newTime = newDate.getTime();
  const day = Math.floor(newTime / DAY);
  const dayRemainder = newTime - day * DAY;
  const hour = dayRemainder > 0 ? Math.floor(dayRemainder / HOUR) : 0;
  const hourRemainder = dayRemainder - hour * HOUR;
  const min = hourRemainder > 0 ? Math.floor(hourRemainder / MIN) : 0;
  const minRemainde = hourRemainder - min * MIN;
  const sec = minRemainde > 0 ? Math.floor(minRemainde / SEC) : 0;

  return {
    time: newTime,
    day, hour, min, sec
  };
}