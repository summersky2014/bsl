import BSL from 'bsl/typings';
import * as React from 'react';
import { css } from 'aphrodite/no-important';
import * as styles from './style';

import variable from 'bsl/utils/system/variable';
import Container from 'bsl/components/Container';
import Input, { InputHelper } from 'bsl/components/Input';
import Icon from 'bsl/components/Icon';

interface Props extends BSL.ComponentProps {
  onSearch: (value: string) => void;
}

const searchSvg = variable.svgRootPath + require('./search.svg').id;
const clearSvg = variable.svgRootPath + require('bsl/assets/clear.svg').id;

function Component(props: Props) {
  const inputHelper = React.useMemo(() => new InputHelper(), []);

  return (
    <form 
      className={css(styles.component.root)}
      onSubmit={(e) => {
        e.preventDefault();
        props.onSearch(inputHelper.getValue());
      }}
    >
      <Container alignItems="center" justifyContent="space-between" flex={1}>
        <Container className={css(styles.input.root)} alignItems="center" justifyContent="space-between" flex={1}>
          <Icon className={css(styles.input.searchSvg)} src={searchSvg} />
          <Container flex={1}>
            <Input
              className={css(styles.input.body)}
              value={inputHelper.getValue()}
              onChange={inputHelper.onChange}
              state={inputHelper.state}
              placeholder="请输入楼盘地址或名称"
            />
          </Container>
          <Container
            className={css(styles.input.clearBox)}
            alignItems="center"
            justifyContent="center"
            onClick={() => {
              inputHelper.onChange('');
            }}
          >
            <Icon className={css(styles.input.clearSvg)} src={clearSvg} />
          </Container>
        </Container>
        <button className={css(styles.submit.root)} type="submit">搜索</button>
      </Container>
    </form>
  );
}

export default Component;
