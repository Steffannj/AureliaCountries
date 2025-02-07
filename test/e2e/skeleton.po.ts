import {browser, element, by, By, $, $$, ExpectedConditions} from 'aurelia-protractor-plugin/protractor';

export class PageObjectSkeleton {
  getCurrentPageTitle() {
    return browser.getTitle();
  }

  async navigateTo(href) {
    const navigatingReady = browser.waitForRouterComplete();
    await element(by.css('a[href="' + href + '"]')).click();
    await navigatingReady;
    await browser.sleep(200);
  }
}
