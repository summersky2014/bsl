import * as React from 'react';
import PageComponent, { PageProps } from '../../../../app/PageComponent';
import Markdown from '../../components/Markdown';
import docs from './doc.md';

interface Props extends PageProps<Match> {
}

interface State {
}

interface Match {
}

class QuickStart extends PageComponent<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);
    this.init();
  }

  public pageRender(): JSX.Element {
    return (
      <div>
        <Markdown source={docs} />
      </div>
    );
  }
}

export default QuickStart;