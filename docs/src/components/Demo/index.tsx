import * as React from 'react';
import * as styles from './index.scss';
import Code from '../Code';
import Phone from '../Phone';

interface Props  {
  title: string;
  component: string;
}

function Demo(props: Props) {
  const [code, setCode] = React.useState('');
  const { title, component } = props;
  const baseUrl = `docs/src/pages/Component/${component}/${title}/index`;
  
  React.useEffect(() => {
    fetch(baseUrl + '.tsx').then((response) => {
      return response.text();
    }).then((str) => {
      setCode(str.replace(/..\/..\/..\/..\/..\/../g, 'bsl'));
    });
  }, [baseUrl]);

  return (
    <div>
      <div className="markdown">
        <h2>{props.title}</h2>
      </div>
      <div className={styles.layout}>
        <Code>{code}</Code>
        <Phone path={baseUrl + '.html'} />
      </div>
    </div>
  );
}

export default Demo;
