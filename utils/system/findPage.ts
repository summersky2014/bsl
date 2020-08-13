import { appData } from '../../app/core';
// import PageComponent from '../app/PageComponent';

type InstanceoPage<T> = T extends new (...args: any) => infer R ? R : undefined;

export default function findPage<T extends Function>(Page: T): InstanceoPage<T> | undefined {
  for (let i = appData.pages.length - 1; i >= 0; i--) {
    const item = appData.pages[i];
    if (item instanceof Page) {
      return item as InstanceoPage<T> | undefined;
    }
  }
}