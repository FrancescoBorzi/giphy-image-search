import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Giphy Image Search', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should correctly look for images', () => {
    page.navigateTo();
    page.searchInput.sendKeys('italian red wine');

    expect(page.images.count()).toBeGreaterThan(0);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
