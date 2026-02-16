import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Units List Page Object
 * Handles unit listing, selection, and unit-related actions
 */
export class UnitsListPage extends BasePage {
  // Locators
  private readonly facilityNameHeader: (facilityName: string) => Locator;
  private readonly filtersSection: Locator;
  private readonly unitByName: (unitName: string) => Locator;
  private readonly firstAvailableUnit: Locator;
  private readonly addNoteButton: Locator;

  constructor(page: Page) {
    super(page);
    this.facilityNameHeader = (facilityName: string) => this.page.getByText(facilityName).nth(1);
    this.filtersSection = this.page.getByText('FILTERS');
    this.unitByName = (unitName: string) => this.page.getByText(unitName, { exact: true });
    this.firstAvailableUnit = this.page.getByText('API Unit-2025-05-14-ao49y');
    this.addNoteButton = this.page.getByText('+').first();
  }

  /**
   * Verify units list page is loaded properly
   */
  async verifyUnitsPageLoaded(facilityName: string = 'CK Self Storage'): Promise<void> {
    await this.waitForCompletePageLoad();
    const facilityHeader = this.facilityNameHeader(facilityName);
    await this.waitForLocator(facilityHeader);
    await this.waitForLocator(this.filtersSection);
    await expect(facilityHeader).toBeVisible();
    await expect(this.filtersSection).toBeVisible();
  }

  /**
   * Click on a specific unit to view details
   */
  async selectUnitByName(unitName: string): Promise<void> {
    // Wait for complete page and units to load
    await this.waitForCompletePageLoad();
    // Use filter to match unit name that may include size info like "Testing3 - 20x25"
    const unitLocator = this.page.getByText(new RegExp(`^${unitName}\s*-?\s*.*`)).first();
    await this.waitForLocator(unitLocator);
    await this.clickLocator(unitLocator);
  }

  /**
   * Click on the default test unit
   */
  async selectDefaultTestUnit(): Promise<void> {
    await this.waitForCompletePageLoad();
    await this.waitForLocator(this.firstAvailableUnit);
    await this.clickLocator(this.firstAvailableUnit);
  }

  /**
   * Click the Add Note button (+)
   */
  async clickAddNoteButton(): Promise<void> {
    // Wait for any loading overlays to disappear and page to be ready
    await this.waitForCompletePageLoad();
    await this.page.waitForTimeout(1000); // Wait for any animations or overlays
    await this.waitForLocator(this.addNoteButton);
    // Use force click to bypass potential overlay elements if necessary
    await this.addNoteButton.click({ force: true });
    // Wait for dialog to appear
    await this.page.waitForTimeout(500);
    await this.waitForCompletePageLoad();
  }

  /**
   * Get list of all visible units (for validation/data collection)
   */
  async getAllVisibleUnits(): Promise<string[]> {
    await this.waitForCompletePageLoad();
    // This could be implemented to return all unit names
    // For now, return empty array
    return [];
  }

  /**
   * Verify specific unit is available in the list
   */
  async verifyUnitExists(unitName: string): Promise<void> {
    await this.waitForCompletePageLoad();
    const unitLocator = this.unitByName(unitName);
    await this.waitForLocator(unitLocator);
    await expect(unitLocator).toBeVisible();
  }

  /**
   * Verify facilities and filters are displayed
   */
  async verifyPageElements(facilityName: string = 'CK Self Storage'): Promise<void> {
    await this.verifyUnitsPageLoaded(facilityName);
  }
}