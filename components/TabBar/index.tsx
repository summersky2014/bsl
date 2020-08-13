import { css } from 'aphrodite/no-important';
import * as classNames from 'classnames';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import BSL from '../../typings';
import memoAreEqual from '../../utils/system/memoAreEqual';
import variable from '../../utils/system/variable';
import Choice, { Props as ChoiceProps, Value } from '../Choice';
import Icon from '../Icon';
import Link, { Props as LinkProps } from '../Link';
import styles from './style';

interface LinkQuery {
  query?: LinkProps['query'];
}

interface TabBarData extends Value {
  icon: string;
  pathname: string;
}

export interface Props<T extends Value> extends Partial<RouteComponentProps>, BSL.ComponentProps, Pick<ChoiceProps<T>, 'data'> {
  itemCls?: string;
  iconCls?: string;
  activeCls?: string;
  textCls?: string;
  /** 没有传入RouteComponentProps时，就需要手动指定selectedIndex */
  selectedIndex?: number;
}

function TabBar(props: Props<TabBarData & LinkQuery>) {
  const { className, id, data, itemCls } = props;
  const selectedIndex = props.location ? data.findIndex((item) => props.location!.pathname.indexOf(item.pathname) >= 0) : props.selectedIndex!;
  const [value, setValue] = React.useState<ChoiceProps<TabBarData>['value']>([data[selectedIndex]]);
  const [valueUpdateId, setValueUpdateId] = React.useState<number>(0);

  if (variable.env === 'development' && selectedIndex === undefined) {
    console.error('RouteComponentProps或selectedIndex必传一个');
  }

  return (
    <Choice
      className={classNames(css(styles.root), className)}
      itemCls={classNames(css(styles.item), itemCls)}
      id={id}
      style={props.style}
      data={data}
      value={value}
      // updateId={valueUpdateId}
      state="undefined"
      onChange={(newValue) => {
        const current = newValue[0] as TabBarData & LinkQuery;
        const newPathname = current.pathname;
        const index = data.findIndex((item) => item.pathname === newPathname);

        setValue([data[index]]);
        setValueUpdateId(valueUpdateId + 1);
        Link.replace({
          url: newPathname,
          query: current.query
        });

        return true;
      }}
    >
      {(item, active) => (
        <React.Fragment>
          <Icon 
            className={classNames(css(styles.icon), props.iconCls, {
              [props.activeCls || '']: active
            })}
            src={(item as TabBarData).icon}
          />
          <div
            className={classNames(css(styles.text), props.textCls, {
              [props.activeCls || '']: active
            })}
          >{item.id}</div>
        </React.Fragment>
      )}
    </Choice>
  );
}

function areEqual(prevProps: Props<TabBarData>, nextProps: Props<TabBarData>): boolean {
  return memoAreEqual(prevProps, nextProps, (key) => {
    return key === 'location' ? prevProps.location?.pathname !== nextProps.location?.pathname : false;
  }); 
}

export default React.memo(TabBar, areEqual);