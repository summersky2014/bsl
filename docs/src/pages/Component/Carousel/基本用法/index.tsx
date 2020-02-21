import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Subscription, Context, updateLoop } from '../../../../../../app/Scheduler';
import Carousel from '../../../../../../components/Carousel';
import '../../../../../../styles/normalize.scss';
import '../../../../../../styles/bsl.scss';

const slide1 = require('./assets/slide1.png');
const slide2 = require('./assets/slide2.png');
const slide3 = require('./assets/slide3.png');

const App = () => {
  return (
    <Subscription source={{}}>
      {(value: object) => (
        <Context.Provider value={value}>
          <Demo />
        </Context.Provider>
      )}
    </Subscription>
  );
};

const Demo = () => {
  // @ts-ignore
  const [index, setIndex] = React.useState(0);

  // demo演示时需要的代码，实际项目中已配置好，不需要此段代码
  React.useEffect(() => {
    updateLoop();
  }, []);

  return (
    <Carousel
      index={index}
      // onChange={(i) => {
      //   console.log(i);
        
      //   setIndex(i);
      // }}
      // loop
      dots
      // autoplay
      style={{
        height: 150
      }}
    >
      <img src={slide1}  />
      <img src={slide2}  />
      <img src={slide3}  />
    </Carousel>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
