import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Subscription, Context, dispatch } from '../../../../../../app/Scheduler';
import Form from '../../../../../../components/Form';
import FormItem from '../../../../../../components/FormItem';
import Input, { InputHelper } from '../../../../../../components/Input';
import Textarea, { TextareaHelper } from '../../../../../../components/Textarea';
import '../../../../../../styles/base.scss';

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
      {(value: object) => (
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
    dispatch();
  }, []);

  return (
    <Form>
      <FormItem>
        <Input
          value={inputHelper.value.get()}
          state={inputHelper.state}
          onChange={inputHelper.onChange}
          style={styles.input}
        />
      </FormItem>
      <br/>

      <FormItem>
        <Textarea
          value={textareaHelper.value.get()}
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
