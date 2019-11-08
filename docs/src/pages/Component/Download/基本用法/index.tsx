import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Download from '../../../../../../components/Download';
import '../../../../../../styles/normalize.scss';
import '../../../../../../styles/bsl.scss';

const styles: Record<string, React.CSSProperties> = {
  button: {
    width: '100%',
    height: 50,
    lineHeight: '50px',
    backgroundColor: '#3690cf',
    textAlign: 'center',
    color: '#fff'
  }
};

const Demo = () => {
  return (
    <div>
      <Download src="http://108.61.219.200/vultr.com.100MB.bin">
        {(process, state) => (
          <button style={styles.button}>{state === 'loading' ? `下载进度${process.toFixed(2)}%` : '开始下载'}</button>
        )}
      </Download>
    </div>
  );
};

ReactDOM.render(<Demo />, document.getElementById('root'));
