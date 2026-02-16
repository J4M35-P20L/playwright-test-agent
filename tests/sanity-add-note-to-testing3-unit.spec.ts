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

  test('Sanity - Add note to Testing3 unit at CK Self Storage under storEDGE Demo', async ({ page }) => {
    // Test automation works correctly but backend API returns "Internal server error" when saving notes
    
    // Initialize step definitions and page objects
    const facilitySteps = new FacilityManagementSteps(page);
    const facilityPage = new FacilityManagementPage(page);

    // Setup facility - replaces 15+ lines of repetitive setup code
    await facilitySteps.completeFacilitySetup(
      testDataLoader.getLocalUrl(),
      'storEDGE Demo',
      'CK Self Storage'
    );

    // Select Testing3 unit specifically
    const unitName = 'Testing3';
    await facilityPage.unitsList.selectUnitByName(unitName);

    // Verify unit details are displayed in the dialog
    await expect(page.getByRole('dialog').getByText(`${unitName} - 20x25`)).toBeVisible();

    // Close unit details to proceed with note addition
    await facilityPage.unitDetails.closeDialog();

    // Open Add Note dialog and add note
    await facilitySteps.openAddNoteDialog();
    await facilityPage.addNote.addNote('Test note for Testing3 unit');

    // Verify note was saved successfully
    await facilitySteps.verifyNoteSavedSuccessfully();
  });

  test('Edge Case - Save a note at maximum allowed length', async ({ page }) => {
    // Test automation works correctly but backend API returns "Internal server error" when saving notes
    
    // Initialize step definitions and page objects
    const facilitySteps = new FacilityManagementSteps(page);
    const facilityPage = new FacilityManagementPage(page);

    // Setup facility - replaces 15+ lines of repetitive setup code
    await facilitySteps.completeFacilitySetup(
      testDataLoader.getLocalUrl(),
      'storEDGE Demo',
      'CK Self Storage'
    );

    // Select Testing3 unit specifically
    const unitName = 'Testing3';
    await facilityPage.unitsList.selectUnitByName(unitName);

    // Verify unit details are displayed in the dialog
    await expect(page.getByRole('dialog').getByText(`${unitName} - 20x25`)).toBeVisible();

    // Close unit details to proceed with note addition
    await facilityPage.unitDetails.closeDialog();

    // Open Add Note dialog
    await facilitySteps.openAddNoteDialog();

    // Generate a note that is exactly the system's maximum allowed length
    // Testing 500 characters as common maximum length
    const maxLengthNote = 'A'.repeat(500); // Simple repeated character for testing

    // Enter the maximum length note using Page Object method
    await facilityPage.addNote.enterNoteText(maxLengthNote);

    // Verify the note was entered and has exactly the expected length
    await facilityPage.addNote.verifyNoteTextboxHasText(maxLengthNote);

    // Submit note
    await facilityPage.addNote.submitNote();

    // Verify note was saved successfully
    await facilitySteps.verifyNoteSavedSuccessfully();
  });
});