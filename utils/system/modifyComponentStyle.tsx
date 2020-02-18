/** 修改第三方组件的样式 */
function modifyComponentStyle(container: string | HTMLElement, selector: string, classNames: string) {
  const containerElem = typeof container === 'string' ? document.querySelector(container) : container;
  const elem = containerElem?.querySelector(selector);

  if (elem?.classList.contains(classNames) === false) {
    elem.classList.add(classNames);
  }
}

export default modifyComponentStyle;