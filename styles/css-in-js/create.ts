import parser, { SheetDefinition } from './parser';

interface StyleElement extends HTMLStyleElement {
  styleSheet: any;
}

function create<T>(sheetDefinition: SheetDefinition<T>): { [K in keyof T]: string } {
  const css = parser(sheetDefinition);
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style') as StyleElement;
  
  head.appendChild(style);
  style.type = 'text/css';
  if (style.styleSheet) {
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  return sheetDefinition as any;
}

export default create;