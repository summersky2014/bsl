/** 用于传送门组件创建容器 */
function getContainer(id?: string): HTMLElement {
  const uuid = id || `bsl_container_${Date.now()}`;
  let container = document.getElementById(uuid);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', uuid);
    document.body.appendChild(container);
  }
  return container;
}

function removeContainer(uuid: string) {
  const container = document.getElementById(uuid) as HTMLElement;
  if (container && container.parentNode) {
    container.parentNode.removeChild(container);
  }
}

export { getContainer, removeContainer } ;