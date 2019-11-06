import { StyleSheet } from 'aphrodite/no-important';

function createOrder() {
  const order: Record<string, React.CSSProperties> = {};
  for (let i = 0; i < 10; i++) {
    order[`order-${i}`] = {
      order: i
    };
  }

  return order;
}

function createFlex() {
  const flex: Record<string, React.CSSProperties> = {};
  for (let i = 0; i < 10; i++) {
    flex[`flex-${i}`] = {
      flex: i
    };
  }

  return flex;
}

const styles = StyleSheet.create({
  flex: {
    display: 'flex'
  },
  'flexDirection-row': {
    flexDirection: 'row'
  },
  'flexDirection-row-reverse': {
    flexDirection: 'row-reverse'
  },
  'flexDirection-column-reverse': {
    flexDirection: 'column-reverse'
  },
  'flexDirection-column': {
    flexDirection: 'column'
  },
  'flexWrap-nowrap': {
    flexWrap: 'nowrap'
  },
  'flexWrap-wrap': {
    flexWrap: 'wrap'
  },
  'flexWrap-wrap-reverse': {
    flexWrap: 'wrap-reverse'
  },
  'justifyContent-flex-start': {
    justifyContent: 'flex-start'
  },
  'justifyContent-flex-end': {
    justifyContent: 'flex-end'
  },
  'justifyContent-center': {
    justifyContent: 'center'
  },
  'justifyContent-space-between': {
    justifyContent: 'space-between'
  },
  'justifyContent-space-around': {
    justifyContent: 'space-around'
  },
  'alignItems-flex-start': {
    alignItems: 'flex-start'
  },
  'alignItems-flex-end': {
    alignItems: 'flex-end'
  },
  'alignItems-center': {
    alignItems: 'center'
  },
  'alignItems-baseline': {
    alignItems: 'baseline'
  },
  'alignItems-stretch': {
    alignItems: 'stretch'
  },
  'alignContent-flex-start': {
    alignContent: 'flex-start'
  },
  'alignContent-flex-end': {
    alignContent: 'flex-end'
  },
  'alignContent-space-between': {
    alignContent: 'space-between'
  },
  'alignContent-center': {
    alignContent: 'center'
  },
  'alignContent-space-around': {
    alignContent: 'space-around'
  },
  'alignContent-stretch': {
    alignContent: 'stretch'
  },
  'alignSelf-auto': {
    alignSelf: 'auto'
  },
  'alignSelf-flex-start': {
    alignSelf: 'flex-start'
  },
  'alignSelf-flex-end': {
    alignSelf: 'flex-end'
  },
  'alignSelf-center': {
    alignSelf: 'center'
  },
  'alignSelf-baseline': {
    alignSelf: 'baseline'
  },
  'alignSelf-stretch': {
    alignSelf: 'stretch'
  },
  ...createOrder(),
  ...createFlex()
});

export default styles;