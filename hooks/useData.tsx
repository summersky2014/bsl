import * as React from 'react';
import Dispatcher from '../app/Dispatcher';

function useData<T>(value: T, isSaveRawData?: boolean) {
  const data = React.useMemo(() => new Dispatcher(value, isSaveRawData), []);

  return data;
}

export default useData;
