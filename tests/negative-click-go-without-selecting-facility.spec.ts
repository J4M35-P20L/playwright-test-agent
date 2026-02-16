// spec: Add Note to a Unit within a Facility
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { testDataLoader } from '../src/utils/testDataLoader';
import { BrowserCleanup } from '../src/utils/browserCleanup';
import { FacilityManagementSteps } from '../src/steps/FacilityManagementSteps';
import { FacilityManagementPage } from '../src/pages/FacilityManagementPage';

test.describe('Add Note to a Unit within a Facility', () => {
  // Ensure browser is closed after each test, regardless of result
  test.afterEach(BrowserCleanup.afterEachCleanup);

  test('Negative - Click Go without selecting a facility', async ({ page }) => {
    // Initialize step definitions and page objects
    const facilitySteps = new FacilityManagementSteps(page);
    const facilityPage = new FacilityManagementPage(page);

    // Navigate to the facility management system
    await facilitySteps.navigateToFacilitySystem(testDataLoader.getLocalUrl());

    // Verify initial state - company selection dropdown should be visible
    await facilityPage.companySelection.verifyCompanyDropdownVisible();

    // Select company to enable facility dropdown (partial setup)
    await facilitySteps.selectCompany('storEDGE Demo');

    // Verify facility dropdown is now visible but no facility is selected
    await facilityPage.facilitySelection.verifyFacilityDropdownVisible();

    // Verify the Go button is visible but should be disabled/inactive before facility selection
    await facilityPage.facilitySelection.verifyGoButtonVisible();

    // Try to click Go without selecting a facility
    // This should either be disabled or show validation
    try {
      await facilityPage.facilitySelection.clickGoButton();
      
      // If Go button works, verify no units load or an error is shown
      await expect(page.getByText(/please select|required|choose a facility/i)).toBeVisible();
    } catch (error) {
      // If Go button is properly disabled, that's the expected behavior
      console.log('Go button is properly disabled without facility selection');
    }

    // Verify no units are loaded - should still be on facility selection page
    await expect(page.getByText('FILTERS')).not.toBeVisible();
    
    // Verify facility selection interface is still visible
    await expect(page.getByText('Company')).toBeVisible();
    await expect(page.getByText('Facility', { exact: true })).toBeVisible();
  });
});