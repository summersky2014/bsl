import { appData } from '../app/core';
import PageComponent from '../app/PageComponent';

type InstanceoPage<T> = T extends new (...args: any) => infer R ? R : undefined;

export default function findPage<T extends typeof PageComponent>(Page: T): InstanceoPage<T> | undefined {
  return appData.pages.find((item) => item instanceof Page) as InstanceoPage<T> | undefined;
}