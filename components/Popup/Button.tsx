import * as React from 'react';
import * as classNames from 'classnames';
import { View } from './index';

function Button(props: View) {
  const { disabled, onClick, className, children } = props;

  return (
    <div
      className={classNames(className, 'bsl_component')}
      onClick={onClick}
      data-disabled={{disabled}}
    >
      {children}
    </div>
  );
}

export default Button;