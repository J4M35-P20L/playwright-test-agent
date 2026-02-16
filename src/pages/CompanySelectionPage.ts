import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Company Selection Page Object
 * Handles company dropdown selection logic
 */
export class CompanySelectionPage extends BasePage {
  // Locators
  private readonly companyDropdownButton: Locator;
  private readonly storEdgeDemoOption: Locator;

  constructor(page: Page) {
    super(page);
    this.companyDropdownButton = this.page.getByText('Select▾').first();
    this.storEdgeDemoOption = this.page.getByText('storEDGE Demo');
  }

  /**
   * Click on the company dropdown to open it
   */
  async openCompanyDropdown(): Promise<void> {
    await this.waitForCompletePageLoad();
    await this.clickLocator(this.companyDropdownButton);
  }

  /**
   * Select storEDGE Demo from the company dropdown
   */
  async selectStorEdgeDemo(): Promise<void> {
    await this.waitForLocator(this.storEdgeDemoOption);
    await this.clickLocator(this.storEdgeDemoOption);
  }

  /**
   * Complete company selection process
   */
  async selectCompany(companyName: string = 'storEDGE Demo'): Promise<void> {
    await this.openCompanyDropdown();
    
    if (companyName === 'storEDGE Demo') {
      await this.selectStorEdgeDemo();
    } else {
      const companyOption = this.page.getByText(companyName);
      await this.waitForLocator(companyOption);
      await this.clickLocator(companyOption);
    }
  }

  /**
   * Verify company dropdown is available
   */
  async verifyCompanyDropdownVisible(): Promise<void> {
    await this.waitForCompletePageLoad();
    await this.waitForLocator(this.companyDropdownButton);
    await expect(this.companyDropdownButton).toBeVisible();
  }
}