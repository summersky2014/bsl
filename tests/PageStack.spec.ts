import { Page } from 'puppeteer';
import 'jest-dom/extend-expect';

declare const page: Page;

describe('PageStack', () => {
  beforeEach(async () => {
    // http-server默认端口
    await page.goto('http://127.0.0.1:8080/examples/PageStack');
  });

  it('页面初始化', async () => {
    const status = await page.evaluate(() => {
      return document.querySelector('#Astatus')!.textContent;
    });
    expect(status).toBe('status: init');
  });

  it('pageLeave', async () => {
    await page.click('#linkToB');
    const status = await page.evaluate(() => {
      return document.querySelector('#Aleave')!.textContent;
    });
    const display = await page.evaluate(() => {
      const pageElem = document.querySelector('#root')!.children[0] as HTMLDivElement;
      return pageElem.style.display;
    });
    expect(status).toBe('leave: true');
    expect(display).toBe('none');
  });

  it('pageActive', async () => {
    await page.click('#linkToB');
    await page.waitFor(100);
    const status = await page.evaluate(() => {
      return document.querySelector('#Bstatus')!.textContent;
    });
    expect(status).toBe('status: pageActive');
  });

  it('pageEnter', async () => {
    await page.click('#linkToB');
    await page.goBack();

    const status = await page.evaluate(() => {
      return document.querySelector('#Astatus')!.textContent;
    });
    const leavel = await page.evaluate(() => {
      return document.querySelector('#Aleave')!.textContent;
    });

    expect(status).toBe('status: pageEnter');
    expect(leavel).toBe('leave: false');
  });
});