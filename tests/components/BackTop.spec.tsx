import { Page } from 'puppeteer';
import '@testing-library/jest-dom/extend-expect';
import variable from '../../utils/system/variable';

declare const page: Page;

describe('BackTop', () => {
  beforeEach(async () => {
    // http-server默认端口
    await page.goto('http://127.0.0.1:8080/docs/src/pages/Component/BackTop/%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95/index.html');
  });
  it('基本功能', async () => {
    await page.waitForSelector('#backtop');
    const result = await page.evaluate((bslComponent) => {
      const element = document.querySelector('#backtop') as HTMLDivElement;
      const hide = element.style.display === 'none';
      return {
        className: element.classList.contains(bslComponent) && element.classList.contains('test'),
        style: element.style.padding === '5px',
        hide
      };
    }, variable.bslComponent);

    // 显示组件的默认距离值
    await page.evaluate(() => {
      window.scrollTo({ top: 401 });
    });
    await page.waitFor(50);
    const visible = await page.evaluate(() => {
      const element = document.querySelector('#backtop') as HTMLDivElement;
      return element.style.display === 'block';
    });
    
    // 点击之后默认500毫秒的滚动动画持续时间
    await page.evaluate(() => {
      const element = document.querySelector('#backtop') as HTMLDivElement;
      element.click();
    });
    await page.waitFor(200);
    const top1 = await page.evaluate(() => {
      return window.scrollY > 0;
    });
    await page.waitFor(500);
    const top2 = await page.evaluate(() => {
      return window.scrollY === 0;
    });

    expect(result.className).toBe(true);
    expect(result.style).toBe(true);
    expect(result.hide).toBe(true);
    expect(visible).toBe(true);
    expect(top1 && top2).toBe(true);
  });
});