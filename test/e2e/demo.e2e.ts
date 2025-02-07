import {PageObjectWelcome} from './welcome.po';
import {PageObjectSkeleton} from './skeleton.po';
import {config} from '../../protractor.conf';
import {browser, element, by, By, $, $$, ExpectedConditions} from 'aurelia-protractor-plugin/protractor';

describe('aurelia skeleton app', function() {
  let poWelcome: PageObjectWelcome;
  let poSkeleton: PageObjectSkeleton;

  beforeEach(async () => {
    poSkeleton = new PageObjectSkeleton();
    poWelcome = new PageObjectWelcome();

    await browser.loadAndWaitForAureliaPage(`${config.baseUrl}`);
  });

  it('should load the page and display the initial page title', async () => {
    await expect(await poSkeleton.getCurrentPageTitle()).toContain('Aurelia');
  });

  it('should display greeting', async () => {
    await expect(await poWelcome.getGreeting()).toBe('Welcome to the Aurelia Navigation App!');
  });

  it('should automatically write down the fullname', async () => {
    await poWelcome.setFirstname('Jane');
    await poWelcome.setLastname('Doe');

    // binding is not synchronous,
    // therefore we should wait some time until the binding is updated
    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        poWelcome.getFullnameElement(), 'JANE DOE'
      ), 200
    );
  });

  it('should show alert message when clicking submit button', async () => {
    await expect(await poWelcome.openAlertDialog()).toBe(true);
  });

  it('should navigate to users page', async () => {
    await poSkeleton.navigateTo('#/users');
    await expect(await poSkeleton.getCurrentPageTitle()).toBe('Github Users | Aurelia');
  });
});
