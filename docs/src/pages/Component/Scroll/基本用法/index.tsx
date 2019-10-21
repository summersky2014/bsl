import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Horizontal from '../../../../../../components/Scroll/Horizontal';
import '../../../../../../styles/base.scss';

const style: Record<string, React.CSSProperties> = {
  horizontal: {
    width: '100%',
    userSelect: 'none'
  },
  item: {
    width: 50,
    textAlign: 'center'
  }
};

const Demo = () => {
  return (
    <div>
      <h2>横向滚动</h2>
      <Horizontal style={style.horizontal}>
        <React.Fragment>
          {new Array(10).fill(0).map((item, i) => (
            <div style={style.item} key={i}>{i}</div>
          ))}
        </React.Fragment>
      </Horizontal>
    </div>
  );
};

ReactDOM.render(<Demo />, document.getElementById('root'));
