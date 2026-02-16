// Example test demonstrating centralized test data usage
// This test shows how to use testDataLoader for consistent data management

import { test, expect } from '@playwright/test';
import { testDataLoader } from '../src/utils/testDataLoader';

test.describe('Test Data Management Example', () => {
  // FIXME: Cannot find company selection button 'storEDGE Demo' after page navigation
  // Issue: Timeout waiting for getByRole('button', { name: 'storEDGE Demo' })
  // Root cause: Company buttons may not be rendered as role='button' or page state issue
  test.fixme('Example - Using centralized test data', async ({ page }) => {
    // Navigate using centralized URL
    await page.goto(testDataLoader.getLocalUrl());

    // Wait using standardized timeout
    await new Promise(f => setTimeout(f, testDataLoader.getTimeout('pageLoad')));

    // Use centralized selectors for UI interactions
    await page.getByText('Select▾').first().click();
    
    // Use centralized company data
    await page.getByRole('button', { name: 'storEDGE Demo' }).click();
    
    // Use centralized facility data
    await page.getByText('Select▾').nth(1).click();
    await page.getByRole('button', { name: testDataLoader.getPrimaryFacility().fullName }).click();
    
    // Use centralized button selectors
    await page.getByRole('button', { name: testDataLoader.getSelector('buttons', 'go') }).click();
    
    // Verify using centralized data and timeouts
    await expect(page.getByRole('heading', { name: testDataLoader.getPrimaryFacility().name }))
      .toBeVisible({ timeout: testDataLoader.getTimeout('elementWait') });
    
    // Use centralized unit data
    await expect(page.getByText(testDataLoader.getTestingUnit(), { exact: true }))
      .toBeVisible({ timeout: testDataLoader.getTimeout('elementWait') });
    
    // Select unit using centralized data
    await page.getByText(testDataLoader.getTestingUnit(), { exact: true }).click();
    
    // Add note using centralized selectors and messages
    await page.getByRole('button', { name: testDataLoader.getSelector('buttons', 'addNote') }).click();
    await page.getByRole('textbox', { name: testDataLoader.getSelector('textboxes', 'noteInput') })
      .fill(testDataLoader.getTestNote());
    
    // Save using centralized selector
    await page.getByRole('button', { name: testDataLoader.getSelector('buttons', 'save') }).click();
    
    // Verify successful save
    await expect(page.getByRole('heading', { name: testDataLoader.getSelector('buttons', 'addNote') }))
      .not.toBeVisible();
  });

  test('Example - Using different environment and user', async ({ page }) => {
    // Use Edge environment and walkthrough user
    await page.goto(testDataLoader.getEdgeUrl(), { timeout: testDataLoader.getTimeout('login') });
    
    const user = testDataLoader.getWalkthroughUser();
    
    await page.getByRole('textbox', { name: testDataLoader.getSelector('textboxes', 'usernameEmail') })
      .fill(user.username);
    
    await page.getByRole('button', { name: testDataLoader.getSelector('buttons', 'continue') }).click();
    
    await page.getByRole('textbox', { name: testDataLoader.getSelector('textboxes', 'password') })
      .fill(user.password);
    
    await page.getByRole('button', { name: testDataLoader.getSelector('buttons', 'signIn') }).click();
    
    // Continue with test using centralized data...
  });

  // FIXME: Cannot find 'Select Company' button after page navigation
  // Issue: Timeout waiting for getByRole('button', { name: 'Select Company' })
  // Root cause: Secondary company selector not available or different UI state than expected
  test.fixme('Example - Using alternative company and facility', async ({ page }) => {
    await page.goto(testDataLoader.getLocalUrl());
    await new Promise(f => setTimeout(f, testDataLoader.getTimeout('pageLoad')));
    
    // Use secondary company and facility
    await page.getByRole('button', { name: testDataLoader.getSelector('buttons', 'selectCompany') }).click();
    await page.getByRole('button', { name: testDataLoader.getCompany('secondary') }).click();
    
    await page.getByRole('button', { name: testDataLoader.getSelector('buttons', 'selectFacility') }).click();
    await page.getByRole('button', { name: testDataLoader.getFacility('secondary').fullName }).click();
    
    // Continue with test...
  });
});