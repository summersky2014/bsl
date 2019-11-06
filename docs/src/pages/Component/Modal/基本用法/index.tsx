import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Modal from '../../../../../../components/Modal';
import '../../../../../../styles/normalize.scss';
import '../../../../../../styles/bsl.scss';

const style: Record<string, React.CSSProperties> = {
  button: {
    display: 'block',
    width: '100%',
    height: 50,
    margin: '12px 0',
    background: '#1890ff',
    color: '#fff'
  }
};

const Demo = () => {
  const [doubleBtn, setDoubleBtn] = React.useState(false);
  const [onlyoneBtn, setOnlyoneBtn] = React.useState(false);
  return (
    <div>
      <button style={style.button} onClick={() => setOnlyoneBtn(true)}>显示单按钮模态框</button>
      <button style={style.button} onClick={() => setDoubleBtn(true)}>显示双按钮模态框</button>
      <Modal
        visible={doubleBtn}
        title="这里是标题"
        onClose={() => setDoubleBtn(false)}
        onOk={() => setDoubleBtn(false)}
      >
        <div>这里是内容</div>
      </Modal>
      <Modal
        visible={onlyoneBtn}
        title="这里是标题"
        onOk={() => setOnlyoneBtn(false)}
        onlyOk
      >
        <div>这里是内容</div>
      </Modal>
    </div>
  );
};

ReactDOM.render(<Demo />, document.getElementById('root'));
