import BSL from '../../typings/index';
import * as React from 'react';

export interface Props extends BSL.ComponentProps {
  onClick?: BSL.OnClick<SVGElement>;
  /** svg sprite的id */
  src: string;
}

const Icon = (props: Props) => {
  return (
    <svg
      className={props.className}
      style={props.style}
      onClick={props.onClick}
      id={props.id}
    >
      <use xlinkHref={props.src} />
    </svg>
  );
};

export default Icon;