import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Facility Selection Page Object
 * Handles facility dropdown and Go button functionality
 */
export class FacilitySelectionPage extends BasePage {
  // Locators
  private readonly facilityDropdownButton: Locator;
  private readonly ckSelfStorageOption: Locator;
  private readonly goButton: Locator;

  constructor(page: Page) {
    super(page);
    this.facilityDropdownButton = this.page.getByText('Select▾').first();
    this.ckSelfStorageOption = this.page.getByText('CK Self Storage');
    this.goButton = this.page.getByText('Go');
  }

  /**
   * Open the facility dropdown  
   */
  async openFacilityDropdown(): Promise<void> {
    await this.waitForCompletePageLoad();
    await this.clickLocator(this.facilityDropdownButton);
  }

  /**
   * Select CK Self Storage from the facility dropdown
   */
  async selectCkSelfStorage(): Promise<void> {
    await this.waitForLocator(this.ckSelfStorageOption);
    await this.clickLocator(this.ckSelfStorageOption);
  }

  /**
   * Click Go button to load units for selected facility
   */
  async clickGoButton(): Promise<void> {
    await this.waitForLocator(this.goButton);
    await this.clickLocator(this.goButton);
    // Additional wait for units to load completely
    await this.page.waitForTimeout(1000);
  }

  /**
   * Complete facility selection process
   */
  async selectFacility(facilityName: string = 'CK Self Storage'): Promise<void> {
    await this.openFacilityDropdown();
    
    if (facilityName === 'CK Self Storage') {
      await this.selectCkSelfStorage();
    } else {
      const facilityOption = this.page.getByText(facilityName);
      await this.waitForLocator(facilityOption);
      await this.clickLocator(facilityOption);
    }
  }

  /**
   * Select facility and load units
   */
  async selectFacilityAndLoadUnits(facilityName: string = 'CK Self Storage'): Promise<void> {
    await this.selectFacility(facilityName);
    await this.clickGoButton();
  }

  /**
   * Verify facility dropdown is available
   */
  async verifyFacilityDropdownVisible(): Promise<void> {
    await this.waitForCompletePageLoad();
    await this.waitForLocator(this.facilityDropdownButton);
    await expect(this.facilityDropdownButton).toBeVisible();
  }

  /**
   * Verify Go button is available
   */
  async verifyGoButtonVisible(): Promise<void> {
    await this.waitForCompletePageLoad();
    await this.waitForLocator(this.goButton);
    await expect(this.goButton).toBeVisible();
  }
}