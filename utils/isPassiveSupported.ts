/** 判断是否支持passive特性 */
function passive(): boolean {
  let passiveSupported = false;

  try {
    const options = Object.defineProperty({}, 'passive', {
      get: () => {
        passiveSupported = true;
      },
    });
    window.addEventListener('test', null as any, options);
  // tslint:disable-next-line:no-empty
  } catch (err) {
  }
  return passiveSupported;
}

const isSupported = passive();

export default isSupported;