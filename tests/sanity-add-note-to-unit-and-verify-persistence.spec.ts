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

  test('Sanity - Add note to a unit and verify persistence', async ({ page }) => {
    // Initialize step definitions
    const facilitySteps = new FacilityManagementSteps(page);

    // Navigate and setup facility (replaces multiple manual steps)
    await facilitySteps.completeFacilitySetup(
      testDataLoader.getLocalUrl(),
      'storEDGE Demo',
      'CK Self Storage'
    );

    // Select unit and verify details dialog
    await facilitySteps.selectDefaultTestUnitAndVerifyDetails();

    // Close unit details dialog  
    await facilitySteps.closeUnitDetailsDialog();

    // Complete add note workflow
    await facilitySteps.openAddNoteDialog();
    await facilitySteps.addNoteWithText('Test Playwright');

    // Verify note was saved successfully
    await facilitySteps.verifyNoteSavedSuccessfully();
  });
});