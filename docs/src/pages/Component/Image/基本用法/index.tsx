import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Image from '../../../../../../components/Image';
import '../../../../../../styles/normalize.scss';
import '../../../../../../styles/bsl.scss';

const logoPng = require('../../../../components/Menu/logo.png');

const Demo = () => {
  return (
    <div>
      <Image src={logoPng} />
    </div>
  );
};

ReactDOM.render(<Demo />, document.getElementById('root'));
