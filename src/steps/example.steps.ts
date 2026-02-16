import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { SearchPage } from '../pages/SearchPage';

Given('I navigate to {string}', async function (this: CustomWorld, url: string) {
  await this.page.goto(url);
});

When('I search for {string}', async function (this: CustomWorld, searchTerm: string) {
  const searchPage = new SearchPage(this.page);
  // Example: This is a placeholder - adjust selectors based on your actual website
  // await searchPage.searchFor(searchTerm);
  console.log(`Searching for: ${searchTerm}`);
});

Then('I should see search results', async function (this: CustomWorld) {
  // Example: This is a placeholder - adjust based on your actual website
  const title = await this.page.title();
  expect(title).toBeTruthy();
  console.log(`Page title: ${title}`);
});
