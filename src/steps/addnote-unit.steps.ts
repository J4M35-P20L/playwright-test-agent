import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Dialog } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { FacilityManagementSteps } from './FacilityManagementSteps';

// Helper to get or create FacilityManagementSteps instance per world
function getSteps(world: CustomWorld): FacilityManagementSteps {
  if (!(world as any)._facilitySteps) {
    (world as any)._facilitySteps = new FacilityManagementSteps(world.page);
  }
  return (world as any)._facilitySteps;
}

Given('the user is logged into the Edge portal', async function (this: CustomWorld) {
  const steps = getSteps(this);
  await steps.loginToEdgePortal();
});

Given('the user is on the Facility Units management page', async function (this: CustomWorld) {
  const steps = getSteps(this);
  await steps.navigateToUnitsPage();
});

Given('the user selects {string} from the Facility dropdown', async function (this: CustomWorld, facilityName: string) {
  const steps = getSteps(this);
  await steps.selectFacilityFromDropdown(facilityName);
});

When('the user clicks {string}', async function (this: CustomWorld, buttonText: string) {
  const steps = getSteps(this);
  await steps.clickButton(buttonText);
});

Then('the system displays the list of units for {string} with filters, unit status and status message', async function (this: CustomWorld, facilityName: string) {
  const steps = getSteps(this);
  await steps.verifyUnitsListDisplayed(facilityName);
});

When('the user selects unit {string} from the units list', async function (this: CustomWorld, unitName: string) {
  const steps = getSteps(this);
  await steps.selectUnitFromList(unitName);
});

When('the user opens the Add Note dialog for unit {string}', async function (this: CustomWorld, unitName: string) {
  const steps = getSteps(this);
  await steps.openAddNoteDialogForUnit(unitName);
});

When('the user enters {string} into the Note field', async function (this: CustomWorld, noteText: string) {
  const steps = getSteps(this);
  await steps.enterNoteText(noteText);
});

Then('the system shows the note saved confirmation', async function (this: CustomWorld) {
  const steps = getSteps(this);
  await steps.verifyNoteSavedConfirmation();
});

Then('the note {string} is visible against unit {string} in the Edge portal after the user logs out and logs back in', async function (this: CustomWorld, noteText: string, unitName: string) {
  const steps = getSteps(this);
  await steps.verifyNotePersistence(noteText, unitName);
});

Then('login to Edge portal {string}', async function (this: CustomWorld, url: string) {
  const steps = getSteps(this);
  await steps.loginToEdgePortalWithUrl(url);
});

Then('use usename {string}, password {string}', async function (this: CustomWorld, username: string, password: string) {
  const steps = getSteps(this);
  await steps.enterCredentials(username, password);
});

Then('click skip on sso page', async function (this: CustomWorld) {
  const steps = getSteps(this);
  await steps.skipSsoPage();
});

Then('click {string} in the left menu', async function (this: CustomWorld, menuItem: string) {
  const steps = getSteps(this);
  await steps.clickLeftMenuItem(menuItem);
});

Then('select {string} tab', async function (this: CustomWorld, tabName: string) {
  const steps = getSteps(this);
  await steps.selectTab(tabName);
});

Then('search for the unit used above steps, select it', async function (this: CustomWorld) {
  const steps = getSteps(this);
  await steps.searchAndSelectUnit();
});

Then('click {string} tab', async function (this: CustomWorld, tabName: string) {
  const steps = getSteps(this);
  await steps.selectTab(tabName);
});

Then('search for the latest message eneterd in above steps', async function (this: CustomWorld) {
  const steps = getSteps(this);
  await steps.verifyNoteInHistory();
});

// ──────────────────────────────────────────────
//  Negative scenario steps
// ──────────────────────────────────────────────

Given('no facility is selected in the Facility dropdown', async function (this: CustomWorld) {
  const steps = getSteps(this);
  await steps.verifyNoFacilitySelected();
});

Then('the system displays a validation message prompting the user to select a facility', async function (this: CustomWorld) {
  const steps = getSteps(this);
  await steps.verifyFacilityValidationMessage();
});

Then('no units are loaded', async function (this: CustomWorld) {
  const steps = getSteps(this);
  await steps.verifyNoUnitsLoaded();
});

Given('the user selects {string} and loads units', async function (this: CustomWorld, facilityName: string) {
  const steps = getSteps(this);
  await steps.selectFacilityAndLoadUnitsWithGo(facilityName);
});

Given('the user selects unit {string}', async function (this: CustomWorld, unitName: string) {
  const steps = getSteps(this);
  await steps.selectUnit(unitName);
});

When('the user opens the Add Note dialog and leaves the Note field empty', async function (this: CustomWorld) {
  const steps = getSteps(this);
  await steps.openAddNoteDialogAndLeaveEmpty();
});

Then('the system displays a validation error {string}', async function (this: CustomWorld, errorMessage: string) {
  const steps = getSteps(this);
  await steps.verifyValidationError(errorMessage);
});

Then('the note is not saved', async function (this: CustomWorld) {
  const steps = getSteps(this);
  await steps.verifyNoteNotSaved();
});

// ──────────────────────────────────────────────
//  UI Compatibility steps
// ──────────────────────────────────────────────

Given('the user opens the Facility Units page on a desktop viewport', async function (this: CustomWorld) {
  const steps = getSteps(this);
  await steps.openUnitsPageOnDesktopViewport();
});

Then('the Note field and {string} control are visible and usable for a selected unit', async function (this: CustomWorld, controlName: string) {
  const steps = getSteps(this);
  await steps.verifyNoteFieldAndControlVisible(controlName);
});

When('the user opens the same page on a mobile-sized viewport', async function (this: CustomWorld) {
  const steps = getSteps(this);
  await steps.switchToMobileViewport();
});

Then('the Note field and {string} control remain accessible and usable for a selected unit', async function (this: CustomWorld, controlName: string) {
  const steps = getSteps(this);
  await steps.verifyNoteFieldAndControlVisible(controlName);
});

// ──────────────────────────────────────────────
//  Edge-case steps
// ──────────────────────────────────────────────

Given('the user selects {string} and unit {string}', async function (this: CustomWorld, facilityName: string, unitName: string) {
  const steps = getSteps(this);
  await steps.selectFacilityAndUnit(facilityName, unitName);
});

When('the user enters a note that is exactly the system\'s maximum allowed length', async function (this: CustomWorld) {
  const steps = getSteps(this);
  await steps.enterMaxLengthNote();
});

Then('the system accepts and saves the note and displays it against the unit', async function (this: CustomWorld) {
  const steps = getSteps(this);
  await steps.verifyNoteAcceptedAndDisplayed();
});

When('the user enters a note that exceeds the system\'s maximum allowed length', async function (this: CustomWorld) {
  const steps = getSteps(this);
  await steps.enterExceedingMaxLengthNote();
});

Then('the system displays a validation error indicating the note is too long', async function (this: CustomWorld) {
  const steps = getSteps(this);
  await steps.verifyNoteTooLongError();
});

When('the user enters a note containing special characters and HTML tags {string}', async function (this: CustomWorld, noteContent: string) {
  const steps = getSteps(this);
  await steps.enterNoteWithSpecialCharacters(noteContent);
});

Then('the system saves the note as plain text \\(no active HTML or script execution)', async function (this: CustomWorld) {
  const steps = getSteps(this);
  await steps.verifyHtmlNoteSavedAsPlainText();
});

Then('the rendered note shown in Edge escapes HTML so it displays as text', async function (this: CustomWorld) {
  const steps = getSteps(this);
  await steps.verifyHtmlEscapedAsText();
});





// Given steps
Given('the user is logged into the Edge portal', async function () {
  // Implementation depends on your login flow
  await this.page.goto(process.env.BASE_URL || 'https://dev.storedgefms.com');
  // Add login logic here
});

Given('the user is on the Facility Units management page', async function () {
  await this.page.goto('/facility-units'); // Adjust URL as needed
  await this.page.waitForLoadState('networkidle');
});

Given('the user selects {string} from the Facility dropdown', async function (facilityName: string) {
  // Try multiple selector strategies
  const dropdown = this.page.locator('select[name="facility"], select#facility, [data-testid="facility-dropdown"]').first();
  
  await dropdown.waitFor({ state: 'visible', timeout: 10000 });
  await dropdown.selectOption({ label: facilityName });
  
  // Store the selected facility for later use
  this.selectedFacility = facilityName;
});

Given('no facility is selected in the Facility dropdown', async function () {
  const dropdown = this.page.locator('select[name="facility"], select#facility, [data-testid="facility-dropdown"]').first();
  await dropdown.selectOption({ index: 0 }); // Select default/empty option
});

Given('the user selects {string} and unit {string}', async function (facilityName: string, unitName: string) {
  await this.page.locator('select[name="facility"], select#facility').selectOption({ label: facilityName });
  await this.page.locator('button:has-text("Go")').click();
  await this.page.waitForLoadState('networkidle');
  await this.page.locator(`text=${unitName}`).first().click();
  this.selectedUnit = unitName;
});

Given('the user opens the Facility Units page on a desktop viewport', async function () {
  await this.page.setViewportSize({ width: 1920, height: 1080 });
  await this.page.goto('/facility-units');
});

// When steps
When('the user clicks {string}', async function (buttonText: string) {
  await this.page.locator(`button:has-text("${buttonText}"), input[type="button"][value="${buttonText}"]`).click();
  await this.page.waitForLoadState('networkidle');
});

When('the user selects unit {string} from the units list', async function (unitName: string) {
  await this.page.locator(`[data-testid="unit-${unitName}"], tr:has-text("${unitName}"), .unit-row:has-text("${unitName}")`).first().click();
  this.selectedUnit = unitName;
});

When('the user opens the Add Note dialog for unit {string}', async function (unitName: string) {
  await this.page.locator(`button:has-text("Add Note"), [data-testid="add-note-button"]`).click();
  await this.page.locator('[role="dialog"], .modal, .dialog').waitFor({ state: 'visible' });
});

When('the user enters {string} into the Note field', async function (noteText: string) {
  await this.page.locator('textarea[name="note"], textarea#note, [data-testid="note-field"]').fill(noteText);
  this.enteredNote = noteText;
});

When('the user opens the Add Note dialog and leaves the Note field empty', async function () {
  await this.page.locator(`button:has-text("Add Note")`).click();
  await this.page.locator('textarea[name="note"], textarea#note').fill('');
});

When('the user enters a note that is exactly the system\'s maximum allowed length', async function () {
  const maxLength = 5000; // Adjust based on your system
  this.enteredNote = 'A'.repeat(maxLength);
  await this.page.locator('textarea[name="note"]').fill(this.enteredNote);
});

When('the user enters a note that exceeds the system\'s maximum allowed length', async function () {
  const maxLength = 5001; // Adjust based on your system
  this.enteredNote = 'A'.repeat(maxLength);
  await this.page.locator('textarea[name="note"]').fill(this.enteredNote);
});

When('the user enters a note containing special characters and HTML tags {string}', async function (noteContent: string) {
  await this.page.locator('textarea[name="note"]').fill(noteContent);
  this.enteredNote = noteContent;
});

When('the user opens the same page on a mobile-sized viewport', async function () {
  await this.page.setViewportSize({ width: 375, height: 667 });
});

// Then steps
Then('the system displays the list of units for {string} with filters, unit status and status message', async function (facilityName: string) {
  await expect(this.page.locator('[data-testid="units-list"], .units-container')).toBeVisible();
  await expect(this.page.locator('[data-testid="filters"], .filters')).toBeVisible();
});

Then('the system shows the note saved confirmation', async function () {
  await expect(this.page.locator('text=/saved|success/i, [data-testid="success-message"]')).toBeVisible();
});

Then('the note {string} is visible against unit {string} in the Edge portal after the user logs out and logs back in', async function (noteText: string, unitName: string) {
  // This step requires logout/login flow - implement based on your app
  await this.page.locator('[data-testid="logout"], button:has-text("Logout")').click();
  // Re-login and verify
});

Then('the system displays a validation message prompting the user to select a facility', async function () {
  await expect(this.page.locator('text=/select.*facility/i, [role="alert"]')).toBeVisible();
});

Then('no units are loaded', async function () {
  await expect(this.page.locator('[data-testid="units-list"]')).not.toBeVisible();
});

Then('the system displays a validation error {string}', async function (errorMessage: string) {
  await expect(this.page.locator(`text=${errorMessage}, [role="alert"]:has-text("${errorMessage}")`)).toBeVisible();
});

Then('the note is not saved', async function () {
  // Verify note doesn't appear in the list or database
  await expect(this.page.locator(`text=${this.enteredNote}`)).not.toBeVisible();
});

Then('the Note field and {string} control are visible and usable for a selected unit', async function (controlText: string) {
  await expect(this.page.locator('textarea[name="note"]')).toBeVisible();
  await expect(this.page.locator(`button:has-text("${controlText}")`)).toBeEnabled();
});

Then('the Note field and {string} control remain accessible and usable for a selected unit', async function (controlText: string) {
  await expect(this.page.locator('textarea[name="note"]')).toBeVisible();
  await expect(this.page.locator(`button:has-text("${controlText}")`)).toBeEnabled();
});

Then('the system accepts and saves the note and displays it against the unit', async function () {
  await expect(this.page.locator('text=/saved|success/i')).toBeVisible();
});

Then('the system displays a validation error indicating the note is too long', async function () {
  await expect(this.page.locator('text=/too long|maximum length|exceeds/i')).toBeVisible();
});

Then('the system saves the note as plain text \\(no active HTML or script execution)', async function () {
  // Verify no script execution
  const dialogs: Dialog[] = [];
  this.page.on('dialog', (dialog: Dialog) => dialogs.push(dialog));
  await this.page.waitForTimeout(1000);
  expect(dialogs.length).toBe(0);
});

Then('the rendered note shown in Edge escapes HTML so it displays as text', async function () {
  const noteElement = this.page.locator('[data-testid="note-content"]').first();
  const innerHTML = await noteElement.innerHTML();
  expect(innerHTML).toContain('&lt;script&gt;');
});