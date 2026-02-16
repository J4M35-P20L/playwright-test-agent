import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for Search functionality
 */
export class SearchPage extends BasePage {
  // Selectors
  private readonly searchInputSelector = 'input[type="search"]';
  private readonly searchButtonSelector = 'button[type="submit"]';
  private readonly resultsContainerSelector = '.search-results';

  constructor(page: Page) {
    super(page);
  }

  async searchFor(searchTerm: string): Promise<void> {
    await this.fillInput(this.searchInputSelector, searchTerm);
    await this.page.press(this.searchInputSelector, 'Enter');
  }

  async verifySearchResultsVisible(): Promise<boolean> {
    try {
      await this.waitForElement(this.resultsContainerSelector, 5000);
      return true;
    } catch {
      return false;
    }
  }

  async getSearchResultsCount(): Promise<number> {
    const results = await this.page.locator(`${this.resultsContainerSelector} .result-item`).count();
    return results;
  }
}
