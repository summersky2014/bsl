import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { root } from './helpers';
import Icon from '../../components/Icon';
import '@testing-library/jest-dom/extend-expect';
import variable from '../../utils/system/variable';

describe('Icon', () => {
  it('基本功能', async () => {
    act(() => {
      ReactDOM.render((
        <Icon id="test1" src="test.svg" />
      ), root);
    });

    expect(root.querySelector('#test1')).toHaveClass(variable.bslComponent);
    expect(root.querySelector('#test1')).toContainHTML('<use xlink:href="test.svg"></use>');
  });
});