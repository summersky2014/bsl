import { Data } from '../components/Picker/Item';
import { DefaultProps } from '../components/DatePicker';
import getDaysInDate from './getDaysInDate';

interface Params {
  minDate: Date;
  maxDate: Date;
  mode: DefaultProps['mode'];
}

interface DateData {
  /** 只触发了最小时间 */
  min: Data[];
  /** 只触发了最大时间 */
  max: Data[];
  /** 最小和最大都没触发 */
  normal: Data[];
  /** 同时触发了最小和最大 */
  between: Data[];
}

/** 创建范围数据 */
function createRangeData(min: number, max: number, unit: string, children?: Data[]): Data[] {
  const data: Data[] = [];
  for (let i = min; i <= max; i++) {
    data.push({
      label: i + unit,
      value: i,
      children
    });
  }

  return data;
}

/** 获取分钟的数据 */
function getMinuteData(minDate: Date, maxDate: Date): DateData {
  const unit = '分';
  return {
    min: createRangeData(minDate.getMinutes(), 59, unit),
    max: createRangeData(0, maxDate.getMinutes(), unit),
    normal: createRangeData(0, 59, unit),
    between: createRangeData(minDate.getMinutes(), maxDate.getMinutes(), unit),
  };
}

/** 获取小时的数据 */
function getHourData(minDate: Date, maxDate: Date): DateData {
  const unit = '时';
  return {
    min: createRangeData(minDate.getHours(), 23, unit),
    max: createRangeData(0, maxDate.getHours(), unit),
    normal: createRangeData(0, 23, unit),
    between: createRangeData(minDate.getHours(), maxDate.getHours(), unit),
  };
}

/** 获取年份的数据 */
function getYearData(minDate: Date, maxDate: Date): DateData {
  const unit = '年';
  return {
    min: [],
    max: [],
    normal: [],
    between: createRangeData(minDate.getFullYear(), maxDate.getFullYear(), unit),
  };
}

/** 获取月份的数据 */
function getMonthData(minDate: Date, maxDate: Date): DateData {
  const unit = '月';
  return {
    min: createRangeData(minDate.getMonth() + 1, 12, unit),
    max: createRangeData(1, maxDate.getMonth() + 1, unit),
    normal: createRangeData(1, 12, unit),
    between: createRangeData(minDate.getMonth() + 1, maxDate.getMonth() + 1, unit),
  };
}

/** 获取联合类型的数据 */
function getUnionData(parent: Data[], children: DateData): Data[] {
  const minSlice = children.min;
  const maxSlice = children.max;
  const normalSlice = children.normal;
  const betweenSlice = children.between;

  if (parent.length > 1) {
    for (let i = 0; i < parent.length; i++) {
      if (i === 0) {
        parent[i].children = minSlice;
      } else if (i === parent.length - 1) {
        parent[i].children = maxSlice;
      } else {
        parent[i].children = normalSlice;
      }
    }
  } else {
    parent[0].children = betweenSlice;
  }

  return parent;
}

/** 获取年月日类型的数据 */
function getDateData(minDate: Date, maxDate: Date):  Data[] {
  const yearData = getYearData(minDate, maxDate).between;
  const monthData = getMonthData(minDate, maxDate);
  // 为了解决闰年也是28天的问题
  const yearmonth = JSON.parse(JSON.stringify(getUnionData(yearData, monthData)));
  const unit = '日';
  for (let i = 0; i < yearmonth.length; i++) {
    const month = yearmonth[i].children;
    // if (month) {
    if (month && month.length) {
      for (let l = 0; l < month.length; l++) {
        const date = new Date(yearmonth[i].value as number, month[l].value as number - 1);
        const child = month[l].children;

        if (minDate.getFullYear() === yearmonth[i].value && minDate.getMonth() + 1 === month[l].value && month.length === 1) {
          month[l].children = createRangeData(minDate.getDate(), maxDate.getDate(), unit);
        } else if (i === 0 && l === 0) {
          month[l].children = createRangeData(minDate.getDate(), getDaysInDate(minDate).length, unit);
        } else if (i === yearmonth.length - 1 && l ===  month.length - 1) {
          month[l].children = createRangeData(1, maxDate.getDate(), unit);
        } else if ((child && child.length === 0) || child === undefined) {
          month[l].children = createRangeData(1, getDaysInDate(date).length, unit);
        }
      }
    } else {
      month[0].children = createRangeData(getDaysInDate(minDate).length, getDaysInDate(maxDate).length, unit);
    }
    // }
  }

  return yearmonth;
}

/** 生成时间范围的数据 */
export default function createRangeDate(params: Params): Data[] {
  const { minDate, maxDate, mode } = params;
  let yearData!: Data[];
  let monthData!: DateData;
  let hourData!: DateData | Data[];
  let minuteData!: DateData;

  switch (mode) {
    case 'HHmm':
      hourData = getHourData(minDate, maxDate).between;
      minuteData = getMinuteData(minDate, maxDate);
      return getUnionData(hourData, minuteData);
    case 'yyMM':
      yearData = getYearData(minDate, maxDate).between;
      monthData = getMonthData(minDate, maxDate);
      return getUnionData(yearData, monthData);
    case 'yyMMdd':
      return getDateData(minDate, maxDate);
    case 'yyMMddHHmm':
      const yearmonth = getDateData(minDate, maxDate);
      hourData = getHourData(minDate, maxDate);
      minuteData = getMinuteData(minDate, maxDate);
      const hourEach = (type: 'min' | 'max' | 'normal' | 'between', parent: Data[]) => {
        if (parent.length) {
          for (let i = 0; i < parent.length; i++) {
            if (i === 0 && type === 'min') {
              parent[i].children = minuteData.min;
            } else if (i === parent.length - 1 && type === 'max') {
              parent[i].children = minuteData.max;
            } else {
              parent[i].children = minuteData.normal;
            }
          }
        } else if (type === 'between') {
          parent[0].children = minuteData.between;
        }
      };

      for (let y = 0; y < yearmonth.length; y++) {
        const month = yearmonth[y].children as Data[];

        for (let m = 0; m < month.length; m++) {
          const day = month[m].children as Data[];

          if (day.length) {
            for (let d = 0; d < day.length; d++) {
              if (d === 0 && y === 0 && m === 0) {
                day[d].children = hourData.min;
                hourEach('min', hourData.min);
              } else if (d === day.length - 1 && y === yearmonth.length - 1 && m === month.length - 1) {
                day[d].children = hourData.max;
                hourEach('max', hourData.max);
              } else {
                day[d].children = hourData.normal;
                hourEach('normal', hourData.normal);
              }
            }
          } else {
            day[0].children = hourData.between;
            hourEach('between', hourData.between);
          }
        }
      }
      return yearmonth;
    default:
      return [];
  }
}