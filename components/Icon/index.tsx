import BSL from '../../typings/index';
import * as React from 'react';
import * as classNames from 'classnames';
import variable from '../../utils/variable';

export interface Props extends BSL.ComponentProps {
  onClick?: BSL.OnClick<SVGElement>;
  /** svg sprite的id */
  src: string;
  /** 是否隐藏图标，只是对display做修改，不会移除组件，适合于隐藏/显示的场景 */
  hide?: boolean;
}

const Icon = (props: Props) => {
  return (
    <svg
      className={classNames(props.className, variable.bslComponent)}
      style={props.style}
      onClick={props.onClick}
      id={props.id}
      data-hide={props.hide}
    >
      <use xlinkHref={props.src} />
    </svg>
  );
};

export default Icon;