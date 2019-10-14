

import * as React from 'react';
import PageComponent from '../../../../../app/PageComponent';
import Markdown from '../../../components/Markdown';
import Demo from '../../../components/Demo';
import doc from './doc.md';

interface Props {
}

interface State {
}

class Carousel extends PageComponent<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);
    this.init();
  }

  public pageRender(): JSX.Element {
    return (
      <div>
        <Markdown source={doc} />
        <Demo component="Carousel" title="基本用法" />
      </div>
    );
  }
}

export default Carousel;