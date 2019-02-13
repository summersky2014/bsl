import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-test-renderer';
import { root } from './helpers';
import Container from '../components/Container';
import 'jest-dom/extend-expect';

describe('Container', () => {
  it('类名设置', async () => {
    act(() => {
      ReactDOM.render((
        <div>
          <Container id="test1" alignItems="baseline" />
          <Container id="test2" alignItems="center" />
          <Container id="test3" alignItems="flex-end" />
          <Container id="test4" alignItems="flex-start" />
          <Container id="test5" alignItems="stretch" />
        </div>
      ), root);
    });
    expect(root.querySelector('#test1')).toHaveClass('bsl-container-flex bsl-container-alignItems-baseline');
    expect(root.querySelector('#test2')).toHaveClass('bsl-container-flex bsl-container-alignItems-center');
    expect(root.querySelector('#test3')).toHaveClass('bsl-container-flex bsl-container-alignItems-flex-end');
    expect(root.querySelector('#test4')).toHaveClass('bsl-container-flex bsl-container-alignItems-flex-start');
    expect(root.querySelector('#test5')).toHaveClass('bsl-container-flex bsl-container-alignItems-stretch');
  });
});