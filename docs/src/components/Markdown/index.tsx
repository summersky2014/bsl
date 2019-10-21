import * as React from 'react';
import * as showdown from 'showdown';
import { appData } from '../../../../app/core';
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
      const linkElem = mdElem.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
      const length = linkElem.length;

      for (let i = 0; i < length; i++) {
        if (linkElem[0].href.indexOf(location.host) < 0) {
          linkElem[0].target = '_blank';
        } else {
          linkElem[0].onclick = (e) => {
            e.preventDefault();
            appData.history!.push(linkElem[0].href.replace(location.origin, ''));
          };
        }
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
