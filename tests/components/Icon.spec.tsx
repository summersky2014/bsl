import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-test-renderer';
import { root } from './helpers';
import Icon from '../../components/Icon';
import 'jest-dom/extend-expect';

describe('Icon', () => {
  it('src', async () => {
    act(() => {
      ReactDOM.render((
        <div>
          <Icon id="test1" src="test.svg" />
        </div>
      ), root);
    });
    expect(root.querySelector('#test1')).toContainHTML('<use xlink:href="test.svg"></use>');
  });
});