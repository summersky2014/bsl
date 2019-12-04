import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dialog, { Props as DialogProps } from './Dialog';
import { getContainer, removeContainer } from '../../utils/getContainer';

export interface Props extends DialogProps {
  /** 显示状态 */
  visible: boolean;
}

class Mask extends React.Component<Props> {
  private uuid = `bsl_portal_${Date.now()}`;

  public componentWillUnmount(): void {
    removeContainer(this.uuid);
  }

  public shouldComponentUpdate(nextProps: Props): boolean {
    const visible = nextProps.visible;
    return this.props.visible || visible;
  }

  public render(): React.ReactPortal | null {
    const { visible, children } = this.props;
 
    return visible ? ReactDOM.createPortal(
      <Dialog
        {...this.props}
      >{children}</Dialog>,
      getContainer(this.uuid)
    ) : null;
  }
}

export default Mask;