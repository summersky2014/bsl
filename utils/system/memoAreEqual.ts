export default function areEqual<T>(prevProps: T, nextProps: T, interceptor?: (key: keyof T) => boolean): boolean {
  const keys = Object.keys(nextProps);
  const length = keys.length;
  for (let i = 0; i < length; i++) {
    const k = keys[i] as keyof T;

    if (interceptor && interceptor(k)) {
      return false;
    }

    if (k === 'children') {
      continue;
    }

    if (typeof nextProps[k] !== 'function' && k !== 'children' && nextProps[k] !== prevProps[k]) {
      return false;
    }
  }

  return true;
}