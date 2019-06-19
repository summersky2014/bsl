import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import { RouteComponentProps } from 'react-router';
import Icon from '../Icon';
import Choice, { Value, Props as ChoiceProps } from '../Choice';
import Link from '../Link';
import './index.scss';

interface TabBarData extends Value {
  icon: string;
  pathname: string;
}

export interface Props<T extends Value> extends RouteComponentProps, BSL.ComponentProps, Pick<ChoiceProps<T>, 'data'> {
  itemCls?: string;
}

const prefixCls = 'bsl-tabbar';
function TabBar(props: Props<TabBarData>) {
  const { className, id, data, itemCls } = props;
  const selectedIndex = data.findIndex((item) => item.pathname === props.location.pathname);
  const [value, setValue] = React.useState<ChoiceProps<TabBarData>['value']>([data[selectedIndex]]);
  const [valueUpdateId, setValueUpdateId] = React.useState<number>(0);

  return (
    <Choice
      className={classNames(prefixCls, className)}
      itemCls={classNames(`${prefixCls}-item`, itemCls)}
      id={id}
      style={props.style}
      data={data}
      value={value}
      updateId={valueUpdateId}
      state="undefined"
      onChange={(newValue) => {
        const newPathname = (newValue[0] as TabBarData).pathname;
        const index = data.findIndex((item) => item.pathname === newPathname);

        setValue([data[index]]);
        setValueUpdateId(valueUpdateId + 1);
        Link.replace(newPathname);

        return true;
      }}
    >
      {(item, active) => (
        <React.Fragment>
          <Icon className={`${prefixCls}-icon`} src={(item as TabBarData).icon} />
          <div className={`${prefixCls}-text`}>{item.id}</div>
        </React.Fragment>
      )}
    </Choice>
  );
}

function areEqual(prevProps: Props<TabBarData>, nextProps: Props<TabBarData>): boolean {
  return prevProps.location.pathname === nextProps.location.pathname;
}

export default React.memo(TabBar, areEqual);