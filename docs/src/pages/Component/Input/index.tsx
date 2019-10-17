

import * as React from 'react';
import PageComponent from '../../../../../app/PageComponent';
import Markdown from '../../../components/Markdown';
import doc from './doc.md';

interface Props {
}

interface State {
}

class Page extends PageComponent<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);
    this.init();
  }

  public pageRender(): JSX.Element {
    return (
      <div>
        <Markdown source={doc} />
      </div>
    );
  }
}

export default Page;