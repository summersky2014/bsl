import { JSDOM } from 'jsdom';

const jdom = new JSDOM();
// @ts-ignore
global.window = jdom.window;
// @ts-ignore
global.document = window.document;

let root: HTMLDivElement;

beforeEach(() => {
  root = document.createElement('div');
  document.body.appendChild(root);
});

afterEach(() => {
  document.body.removeChild(root as HTMLDivElement);
  // @ts-ignore
  root = null;
});

export {
  root
};