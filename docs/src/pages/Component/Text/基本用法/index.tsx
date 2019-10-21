import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Text from '../../../../../../components/Text';
import '../../../../../../styles/base.scss';

const style: Record<string, React.CSSProperties> = {
  width: {
    width: 150
  }
}; 

const Demo = () => {
  return (
    <div>
      <h2>单行省略</h2>
      <Text style={style.width} ellipsis>单行省略单行省略单行省略</Text>
      <br/>

      <h2>多行省略</h2>
      <Text style={style.width} ellipsisLines={2}>多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略多行省略</Text>
      <br/>

      <h2>两端对齐</h2>
      <Text style={style.width} justify>两端对齐</Text>
      <br/>
    </div>
  );
};

ReactDOM.render(<Demo />, document.getElementById('root'));
