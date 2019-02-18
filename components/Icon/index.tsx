import BSL from '../../typings/index';
import * as React from 'react';

export interface Props extends
  Pick<BSL.ComponentProps, 'className'>,
  Pick<BSL.ComponentProps, 'style'>,
  Pick<BSL.ComponentProps, 'id'> {
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