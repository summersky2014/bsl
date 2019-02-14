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

          <Container id="test6" justifyContent="center" />
          <Container id="test7" justifyContent="flex-end" />
          <Container id="test8" justifyContent="flex-start" />
          <Container id="test9" justifyContent="space-around" />
          <Container id="test10" justifyContent="space-between" />

          <Container id="test11" alignSelf="auto" />
          <Container id="test12" alignSelf="baseline" />
          <Container id="test13" alignSelf="center" />
          <Container id="test14" alignSelf="flex-end" />
          <Container id="test15" alignSelf="flex-start" />
          <Container id="test16" alignSelf="stretch" />

          <Container id="test17" flexDirection="column" />
          <Container id="test18" flexDirection="column-reverse" />
          <Container id="test19" flexDirection="row" />
          <Container id="test20" flexDirection="row-reverse" />

          <Container id="test21" flexWrap="nowrap" />
          <Container id="test22" flexWrap="wrap" />
          <Container id="test23" flexWrap="wrap-reverse" />

          <Container id="test24" order={1} />
          <Container id="test25" order={2} />
          <Container id="test26" order={3} />

          <Container id="test27" flex={1} />
          <Container id="test28" flex={2} />
          <Container id="test29" flex={3} />
        </div>
      ), root);
    });

    expect(root.querySelector('#test1')).toHaveClass('bsl-container-flex bsl-container-alignItems-baseline');
    expect(root.querySelector('#test2')).toHaveClass('bsl-container-flex bsl-container-alignItems-center');
    expect(root.querySelector('#test3')).toHaveClass('bsl-container-flex bsl-container-alignItems-flex-end');
    expect(root.querySelector('#test4')).toHaveClass('bsl-container-flex bsl-container-alignItems-flex-start');
    expect(root.querySelector('#test5')).toHaveClass('bsl-container-flex bsl-container-alignItems-stretch');

    expect(root.querySelector('#test6')).toHaveClass('bsl-container-flex bsl-container-justifyContent-center');
    expect(root.querySelector('#test7')).toHaveClass('bsl-container-flex bsl-container-justifyContent-flex-end');
    expect(root.querySelector('#test8')).toHaveClass('bsl-container-flex bsl-container-justifyContent-flex-start');
    expect(root.querySelector('#test9')).toHaveClass('bsl-container-flex bsl-container-justifyContent-space-around');
    expect(root.querySelector('#test10')).toHaveClass('bsl-container-flex bsl-container-justifyContent-space-between');

    expect(root.querySelector('#test11')).toHaveClass('bsl-container-flex bsl-container-alignSelf-auto');
    expect(root.querySelector('#test12')).toHaveClass('bsl-container-flex bsl-container-alignSelf-baseline');
    expect(root.querySelector('#test13')).toHaveClass('bsl-container-flex bsl-container-alignSelf-center');
    expect(root.querySelector('#test14')).toHaveClass('bsl-container-flex bsl-container-alignSelf-flex-end');
    expect(root.querySelector('#test15')).toHaveClass('bsl-container-flex bsl-container-alignSelf-flex-start');
    expect(root.querySelector('#test16')).toHaveClass('bsl-container-flex bsl-container-alignSelf-stretch');

    expect(root.querySelector('#test17')).toHaveClass('bsl-container-flex bsl-container-flexDirection-column');
    expect(root.querySelector('#test18')).toHaveClass('bsl-container-flex bsl-container-flexDirection-column-reverse');
    expect(root.querySelector('#test19')).toHaveClass('bsl-container-flex bsl-container-flexDirection-row');
    expect(root.querySelector('#test20')).toHaveClass('bsl-container-flex bsl-container-flexDirection-row-reverse');

    expect(root.querySelector('#test21')).toHaveClass('bsl-container-flexWrap-nowrap');
    expect(root.querySelector('#test22')).toHaveClass('bsl-container-flexWrap-wrap');
    expect(root.querySelector('#test23')).toHaveClass('bsl-container-flexWrap-wrap-reverse');

    expect(root.querySelector('#test24')).toHaveClass('bsl-container-order-1');
    expect(root.querySelector('#test25')).toHaveClass('bsl-container-order-2');
    expect(root.querySelector('#test26')).toHaveClass('bsl-container-order-3');

    expect(root.querySelector('#test27')).toHaveClass('bsl-container-flex-1');
    expect(root.querySelector('#test28')).toHaveClass('bsl-container-flex-2');
    expect(root.querySelector('#test29')).toHaveClass('bsl-container-flex-3');
  });

  it('children', async () => {
    act(() => {
      ReactDOM.render((
        <div>
          <Container id="test30">children</Container>
        </div>
      ), root);
    });

    expect(root.querySelector('#test30')!.textContent).toBe('children');
  });
});