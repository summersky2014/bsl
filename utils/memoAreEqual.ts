export default function areEqual<T>(prevProps: T, nextProps: T, interceptor?: (key: keyof T) => boolean): boolean {
  const keys = Object.keys(nextProps);
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i] as keyof T;

    if (interceptor && interceptor(k)) {
      return false;
    }

    if (typeof nextProps[k] !== 'function' && nextProps[k] !== prevProps[k]) {
      return false;
    }
  }

  return true;
}