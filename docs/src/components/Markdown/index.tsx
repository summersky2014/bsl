import * as React from 'react';
import * as showdown from 'showdown';
import './index.scss';

interface Props {
  source: string;
}

const converter = new showdown.Converter();
function Markdown(props: Props) {
  const elemRef = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    if (elemRef.current) {
      const mdElem = elemRef.current;
      const linkElem = mdElem.querySelectorAll('a[href^="http"]') as NodeListOf<HTMLAnchorElement>;
      const length = linkElem.length;

      for (let i = 0; i < length; i++) {
        linkElem[0].target = '_blank';
      }
    }
  }, []);

  return (
    <div
      className="markdown"
      ref={elemRef}
      dangerouslySetInnerHTML={{ __html: converter.makeHtml(props.source) }}
    />
  );
}

export default Markdown;
