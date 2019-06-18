import * as React from 'react';

interface Ref<T> {
  current: T | null;
}

export default function useRef<T>(value?: T): Ref<T> {
  return React.useMemo<Ref<T>>(() => {
    return {
      current: value !== undefined ? value : null
    };
  }, []);
}