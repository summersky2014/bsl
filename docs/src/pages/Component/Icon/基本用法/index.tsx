import * as React from 'react';
import * as ReactDOM from 'react-dom';

import variable from '../../../../../../utils/variable';
import Icon from '../../../../../../components/Icon';
import '../../../../../../styles/base.scss';

const checkCircle =  variable.svgRootPath + require('./assets/cross-circle.svg').id;
const checkCircleO = variable.svgRootPath + require('./assets/check-circle-o.svg').id;
const crossCircle =  variable.svgRootPath + require('./assets/cross-circle.svg').id;
const crossCirclO =  variable.svgRootPath + require('./assets/cross-circle-o.svg').id;

const style: Record<string, React.CSSProperties> = {
  icon: {
    width: 34,
    height: 34,
    fill: 'aquamarine',
    display: 'block',
    marginTop: 5
  }
};

const Demo = () => {
  return (
    <div>
      <div>cross-circle</div>
      <Icon src={checkCircle} style={style.icon} />
      <br/>

      <div>check-circle-o</div>
      <Icon src={checkCircleO} style={style.icon} />
      <br/>

      <div>cross-circle</div>
      <Icon src={crossCircle} style={style.icon} />
      <br/>

      <div>cross-circle-o</div>
      <Icon src={crossCirclO} style={style.icon} />
    </div>
  );
};

ReactDOM.render(<Demo />, document.getElementById('root'));
