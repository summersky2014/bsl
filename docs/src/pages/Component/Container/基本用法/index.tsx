import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Container from '../../../../../../components/Container';
import '../../../../../../styles/base.scss';

const style: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: '#88499c',
    fontSize: 28,
    height: 200,
    textAlign: 'center'
  },
  item: {
    backgroundColor: '#e77f24',
    width: 80,
    height: 60,
    lineHeight: '60px'
  },
  itemLarge: {
    height: 120,
    lineHeight: '120px'
  }
};

const Demo = () => {
  return (
    <div>
      <Container alignItems="center" style={style.container}>
        <Container order={1} flex={1} style={style.item}>1</Container>
        <Container style={style.item}>2</Container>
        <Container style={style.item}>3</Container>
        <Container style={Object.assign({}, style.item, style.itemLarge)}>4</Container>
        <Container style={style.item}>5</Container>
        <Container style={style.item}>6</Container>
        <Container style={style.item}>7</Container>
      </Container>
      <br />
      <Container justifyContent="space-between" style={style.container}>
        <Container style={style.item}>1</Container>
        <Container style={style.item}>2</Container>
        <Container style={style.item}>3</Container>
      </Container>
    </div>
  );
};

ReactDOM.render(<Demo />, document.getElementById('root'));
