import * as React from 'react';
require('intersection-observer');

interface IntersectionObserverExtends extends IntersectionObserver {
  /**
   * To enable polling on only specific instances, set a POLL_INTERVAL value on the instance itself:
   * Note: the POLL_INTERVAL property must be set prior to calling the .observe method, or the default configuration will be used.
   */
  POLL_INTERVAL: number;
  // tslint:disable-next-line: max-line-length
  /** You can also choose to not check for intersections when the DOM changes by setting an observer's USE_MUTATION_OBSERVER property to false (either globally on the prototype or per-instance) */
  USE_MUTATION_OBSERVER: boolean;
}

/**
 * 同IntersectionObserver
 * @param htmlElementRef react.createRef()的返回值
 * @param callback 当元素出现在viewport的时候触发
 * @param options ｛
 *   once 是否只执行一次，默认为true
 *   POLL_INTERVAL Enabling polling for individual instance
 *   USE_MUTATION_OBSERVER Ignoring DOM changes
 * ｝
 */
export default function useIntersectionObserver(
  htmlElementRef: React.RefObject<HTMLElement>,
  callback: () => void,
  options?: {
    once?: boolean;
    POLL_INTERVAL?: number;
    USE_MUTATION_OBSERVER?: boolean;
  }
): IntersectionObserverExtends {
  const intersectionObserver = React.useMemo(() => {
    return new IntersectionObserver((entries) => {
      const once = !options || options.once !== false ? true : false;

      if (entries[0].isIntersecting === false) {
        return;
      }
      callback();
      if (once) {
        intersectionObserver.disconnect();
      }
    });
  }, []) as IntersectionObserverExtends;

  React.useEffect(() => {
    if (htmlElementRef.current) {
      if (options) {
        if (options.POLL_INTERVAL !== undefined) {
          intersectionObserver.POLL_INTERVAL = options.POLL_INTERVAL;
        }
        if (options.USE_MUTATION_OBSERVER !== undefined) {
          intersectionObserver.USE_MUTATION_OBSERVER = options.USE_MUTATION_OBSERVER;
        }
      }
      intersectionObserver.observe(htmlElementRef.current);
    }
    return intersectionObserver.disconnect;
  }, [htmlElementRef.current]);

  return intersectionObserver;
}