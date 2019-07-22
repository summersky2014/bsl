import BSL from '../../typings/index';
import * as React from 'react';
import * as classNames from 'classnames';
import variable from '../../utils/variable';

export interface Props extends BSL.ComponentProps {
  onClick?: BSL.OnClick<SVGElement>;
  /** svg sprite的id */
  src: string;
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