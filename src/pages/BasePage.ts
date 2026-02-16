import { Page, Locator } from '@playwright/test';

/**
 * Base Page Object class with common methods
 */
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to URL with complete DOM loading wait
   */
  async navigate(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.waitForCompletePageLoad();
  }

  /**
   * Wait for complete page load including DOM, network and any dynamic content
   */
  async waitForCompletePageLoad(timeout: number = 30000): Promise<void> {
    // Wait for DOM to be fully loaded
    await this.page.waitForLoadState('domcontentloaded', { timeout });
    
    // Wait for all network requests to complete
    await this.page.waitForLoadState('networkidle', { timeout });
    
    // Additional wait for any dynamic content or JavaScript to finish
    await this.page.waitForTimeout(500);
  }

  /**
   * Wait for locator to be available and visible
   */
  async waitForLocator(locator: Locator, timeout: number = 30000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.waitFor({ state: 'attached', timeout });
  }

  /**
   * Wait for element with enhanced loading checks
   */
  async waitForElement(selector: string, timeout: number = 30000): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
    await this.page.waitForSelector(selector, { state: 'attached', timeout });
  }

  /**
   * Click element with complete DOM wait
   */
  async clickElement(selector: string): Promise<void> {
    await this.waitForElement(selector);
    await this.page.click(selector);
    await this.waitForCompletePageLoad();
  }

  /**
   * Click locator with complete DOM wait
   */
  async clickLocator(locator: Locator): Promise<void> {
    await this.waitForLocator(locator);
    await locator.click();
    await this.waitForCompletePageLoad();
  }

  /**
   * Fill input with DOM wait
   */
  async fillInput(selector: string, text: string): Promise<void> {
    await this.waitForElement(selector);
    await this.page.fill(selector, text);
    await this.page.waitForTimeout(200); // Wait for input processing
  }

  /**
   * Fill locator input with DOM wait
   */
  async fillLocatorInput(locator: Locator, text: string): Promise<void> {
    await this.waitForLocator(locator);
    await locator.fill(text);
    await this.page.waitForTimeout(200); // Wait for input processing
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async getText(selector: string): Promise<string> {
    await this.waitForElement(selector);
    return await this.page.textContent(selector) || '';
  }

  async getLocatorText(locator: Locator): Promise<string> {
    await this.waitForLocator(locator);
    return await locator.textContent() || '';
  }

  async isElementVisible(selector: string): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, { state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async isLocatorVisible(locator: Locator): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}
