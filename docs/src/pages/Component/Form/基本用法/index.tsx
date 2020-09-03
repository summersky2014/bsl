import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Context, Subscription, updateLoop } from '../../../../../../app/Scheduler';
import Countdown from '../../../../../../components/Countdown';
import Form from '../../../../../../components/Form';
import FormItem from '../../../../../../components/FormItem';
import Input, { InputHelper } from '../../../../../../components/Input';
import Textarea, { TextareaHelper } from '../../../../../../components/Textarea';
import '../../../../../../styles/bsl.scss';
import '../../../../../../styles/normalize.scss';


const styles: Record<string, React.CSSProperties> = {
  input: {
    border: '1px solid #ccc',
    width: '90%',
    margin: '12px auto',
    padding: 12
  },
  button: {
    width: '100%',
    height: 50,
    background: '#0084ff',
    color: '#fff'
  }
};

const App = () => {
  return (
    <Subscription source={{}}>
      {(value: Record<string, unknown>) => (
        <Context.Provider value={value}>
          <Demo />
        </Context.Provider>
      )}
    </Subscription>
  );
};

const Demo = () => {
  const inputHelper = React.useMemo(() => new InputHelper({ required: true }), []);
  const textareaHelper = React.useMemo(() => new TextareaHelper({ required: true }), []);

  React.useEffect(() => {
    updateLoop();
  }, []);

  return (
    <Form>
      <Countdown
        value="2030-01-01"
        label="日期倒计时"
      >
        {(value) => <div>{value.day}天{value.hour}时{value.min}分{value.sec}秒</div>}
      </Countdown>
      <br/>

      <FormItem requiredPrompt="输入框必填">
        <Input
          value={inputHelper.getValue()}
          state={inputHelper.state}
          onChange={inputHelper.onChange}
          style={styles.input}
        />
      </FormItem>
      <br/>

      <FormItem requiredPrompt="文本域必填">
        <Textarea
          value={textareaHelper.getValue()}
          state={textareaHelper.state}
          onChange={textareaHelper.onChange}
          style={styles.input}
          placeholder="字数节点的样式需要自己写样式来调整"
          maxLength={100}
          wordCount
        />
      </FormItem>
      <br/>

      <button type="submit" style={styles.button}>提交</button>
    </Form>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
