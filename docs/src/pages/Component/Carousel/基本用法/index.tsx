import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Carousel from '../../../../../../components/Carousel';
import Image from '../../../../../../components/Image';
import '../../../../../../styles/normalize.scss';
import '../../../../../../styles/bsl.scss';

const slide1 = require('./assets/slide1.png');
const slide2 = require('./assets/slide2.png');
const slide3 = require('./assets/slide3.png');

const styles: Record<string, React.CSSProperties> = {
  image: {
    width: '100%'
  }
};

const Demo = () => {
  const [index, setIndex] = React.useState(0);
  return (
    <Carousel
      index={index}
      callback={(i) => {
        setIndex(i);
      }}
    >
      <Image style={styles.image} src={slide1} />
      <Image style={styles.image} src={slide2} />
      <Image style={styles.image} src={slide3} />
    </Carousel>
  );
};

ReactDOM.render(<Demo />, document.getElementById('root'));
