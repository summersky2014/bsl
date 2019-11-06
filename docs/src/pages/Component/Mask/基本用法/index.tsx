import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Mask from '../../../../../../components/Mask';
import '../../../../../../styles/normalize.scss';
import '../../../../../../styles/bsl.scss';

const style: Record<string, React.CSSProperties> = {
  content: {
    color: '#fff'
  }
};

const Demo = () => {
  return (
    <div>
      <Mask visible={true}>
        <div style={style.content}>这里是内容</div>
      </Mask>
    </div>
  );
};

ReactDOM.render(<Demo />, document.getElementById('root'));
