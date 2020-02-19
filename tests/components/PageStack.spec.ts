import { Page } from 'puppeteer';
import '@testing-library/jest-dom/extend-expect';

declare const page: Page;

describe('PageStack', () => {
  beforeEach(async () => {
    // http-server默认端口
    await page.goto('http://127.0.0.1:8080/docs/src/pages/Component/PageStack/%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95/index.html#/');
  });

  it('didMount', async () => {
    await page.waitForSelector('#Astatus');
    const status = await page.evaluate(() => {
      return document.querySelector('#Astatus')!.textContent;
    });

    await page.waitFor(1000);
    const count = await page.evaluate(() => {
      return document.querySelector('#count')!.textContent;
    });
    expect(status).toBe('status: init');
    expect(count).toBe('1');
  });

  // 测试Link组件的跳转，以及页面隐藏后不会再触发render
  it('Link.go', async () => {
    await page.click('#linkToB');
    const count = await page.evaluate(() => {
      return document.querySelector('#count')!.textContent;
    });
    expect(count).toBe('1');
  });

  it('pageEnter', async () => {
    await page.click('#linkToB');
    const status = await page.evaluate(() => {
      return window.status;
    });
    expect(status).toBe('enter');
  });

  it('pageLeave', async () => {
    await page.click('#linkToB');
    await page.evaluate(() => {
      history.back();
    });
    const status = await page.evaluate(() => {
      return window.status;
    });
    expect(status).toBe('leave');
  });

  it('pageActive', async () => {
    let status = '0';
    await page.click('#linkToC');
    status = await page.evaluate(() => {
      return window.status;
    });
    expect(status).toBe('1');
    // 测试Link.prelace方法
    await page.click('#replace');
    status = await page.evaluate(() => {
      return window.status;
    });
    expect(status).toBe('2');
  });
});