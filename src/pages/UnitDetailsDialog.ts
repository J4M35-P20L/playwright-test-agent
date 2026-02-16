import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Unit Details Dialog Page Object
 * Handles unit details dialog interactions
 */
export class UnitDetailsDialog extends BasePage {
  // Locators
  private readonly unitDetailsHeader: Locator;
  private readonly closeButton: Locator;
  private readonly unitStatus: Locator;

  constructor(page: Page) {
    super(page);
    this.unitDetailsHeader = this.page.getByText('Unit Details');
    this.closeButton = this.page.getByText('X', { exact: true });
    this.unitStatus = this.page.locator('[data-testid="unit-status"]'); // Generic selector
  }

  /**
   * Verify unit details dialog is open
   */
  async verifyDialogIsOpen(): Promise<void> {
    await this.waitForCompletePageLoad();
    await this.waitForLocator(this.unitDetailsHeader);
    await expect(this.unitDetailsHeader).toBeVisible();
  }

  /**
   * Close the unit details dialog
   */
  async closeDialog(): Promise<void> {
    await this.waitForLocator(this.closeButton);
    await this.clickLocator(this.closeButton);
  }

  /**
   * Verify unit details dialog is closed
   */
  async verifyDialogIsClosed(): Promise<void> {
    await this.page.waitForTimeout(500); // Wait for close animation
    await expect(this.unitDetailsHeader).not.toBeVisible();
  }

  /**
   * Get unit status text
   */
  async getUnitStatus(): Promise<string> {
    try {
      await this.waitForLocator(this.unitStatus);
      return (await this.unitStatus.textContent()) || '';
    } catch {
      // If specific status locator doesn't exist, try to find status in general text
      return '';
    }
  }

  /**
   * Verify dialog opened and then close it
   */
  async verifyAndCloseDialog(): Promise<void> {
    await this.verifyDialogIsOpen();
    await this.closeDialog();
    await this.verifyDialogIsClosed();
  }

  /**
   * Wait for dialog to load completely
   */
  async waitForDialogToLoad(): Promise<void> {
    await this.waitForCompletePageLoad();
    await this.verifyDialogIsOpen();
  }
}