import { $, $$, browser } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl);
  }

  get searchInput() { return $('.image-search-input'); }
  get images() { return $$('.img-loaded'); }
}
