import * as React from 'react';
import * as style from './index.scss';
import SyntaxHighlighter from 'react-syntax-highlighter';
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';

interface Props {
  children?: string;
}

const Code = (props: Props) => {
  return (
    <div className={style.component}>
      <SyntaxHighlighter
        language="typescript"
        style={docco}
        wrapLines
      >
        {props.children}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code;
