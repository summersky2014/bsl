import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { root } from './helpers';
import Container from '../../components/Container';
import '@testing-library/jest-dom/extend-expect';

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
    
    // 测试alignItems
    expect(root.querySelector('#test1')!.className.indexOf('flex')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test1')!.className.indexOf('alignItems-baseline')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test2')!.className.indexOf('alignItems-center')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test3')!.className.indexOf('alignItems-flex-end')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test4')!.className.indexOf('alignItems-flex-start')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test5')!.className.indexOf('alignItems-stretch')).toBeGreaterThanOrEqual(0);

    // 测试justifyContent
    expect(root.querySelector('#test6')!.className.indexOf('flex')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test6')!.className.indexOf('justifyContent-center')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test7')!.className.indexOf('justifyContent-flex-end')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test8')!.className.indexOf('justifyContent-flex-start')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test9')!.className.indexOf('justifyContent-space-around')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test10')!.className.indexOf('justifyContent-space-between')).toBeGreaterThanOrEqual(0);

    // 测试alignSelf
    expect(root.querySelector('#test11')!.className.indexOf('flex')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test11')!.className.indexOf('alignSelf-auto')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test12')!.className.indexOf('alignSelf-baseline')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test13')!.className.indexOf('alignSelf-center')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test14')!.className.indexOf('alignSelf-flex-end')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test15')!.className.indexOf('alignSelf-flex-start')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test16')!.className.indexOf('alignSelf-stretch')).toBeGreaterThanOrEqual(0);

    // 测试flexDirection
    expect(root.querySelector('#test17')!.className.indexOf('flex')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test17')!.className.indexOf('flexDirection-column')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test18')!.className.indexOf('flexDirection-column-reverse')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test19')!.className.indexOf('flexDirection-row')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test20')!.className.indexOf('flexDirection-row-reverse')).toBeGreaterThanOrEqual(0);

    // 测试flexDirection
    expect(root.querySelector('#test21')!.className.indexOf('flex')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test21')!.className.indexOf('flexWrap-nowrap')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test22')!.className.indexOf('flexWrap-wrap')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test23')!.className.indexOf('flexWrap-wrap-reverse')).toBeGreaterThanOrEqual(0);

    expect(root.querySelector('#test24')!.className.indexOf('order-1')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test25')!.className.indexOf('order-2')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test26')!.className.indexOf('order-3')).toBeGreaterThanOrEqual(0);

    expect(root.querySelector('#test27')!.className.indexOf('flex-1')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test28')!.className.indexOf('flex-2')).toBeGreaterThanOrEqual(0);
    expect(root.querySelector('#test29')!.className.indexOf('flex-3')).toBeGreaterThanOrEqual(0);
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