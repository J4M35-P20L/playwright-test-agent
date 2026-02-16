# Refactored Project Structure

## Overview
The project has been restructured to follow Page Object Model (POM) and Step Definitions patterns to eliminate code duplication and improve maintainability.

## New Structure

### 📁 `src/pages/` - Page Objects
Centralized locators and page interactions:

- **`BasePage.ts`** - Common page methods
- **`CompanySelectionPage.ts`** - Company dropdown logic
- **`FacilitySelectionPage.ts`** - Facility selection and Go button
- **`UnitsListPage.ts`** - Unit listing and selection
- **`UnitDetailsDialog.ts`** - Unit details dialog interactions
- **`AddNoteDialog.ts`** - Add note functionality
- **`FacilityManagementPage.ts`** - Main page combining all workflows
- **`index.ts`** - Central exports

### 📁 `src/steps/` - Step Definitions
Reusable test logic:

- **`FacilityManagementSteps.ts`** - High-level step functions

### 📁 `src/utils/` - Utilities
- **`browserCleanup.ts`** - Browser cleanup logic
- **`testDataLoader.ts`** - Test data management

## Benefits

### ✅ Before vs After

**Before (Old Structure):**
```typescript
// Duplicated in every test file
await page.getByText('Select▾').first().click();
await page.getByText('storEDGE Demo').click();
await page.getByText('Select▾').first().click();
await page.getByText('CK Self Storage').click();
// ... 30+ lines of repetitive code
```

**After (New Structure):**
```typescript
// Clean, reusable, maintainable
const facilitySteps = new FacilityManagementSteps(page);
await facilitySteps.completeFacilitySetup(url, 'storEDGE Demo', 'CK Self Storage');
```

## Usage Examples

### 1. Using Page Objects Directly
```typescript
import { FacilityManagementPage } from '../src/pages';

test('my test', async ({ page }) => {
  const facilityPage = new FacilityManagementPage(page);
  await facilityPage.companySelection.selectCompany('storEDGE Demo');
  await facilityPage.unitsList.selectDefaultTestUnit();
  await facilityPage.addNote.addNote('My test note');
});
```

### 2. Using Step Definitions (Recommended)
```typescript
import { FacilityManagementSteps } from '../src/steps/FacilityManagementSteps';

test('my test', async ({ page }) => {
  const steps = new FacilityManagementSteps(page);
  await steps.completeFacilitySetup(url);
  await steps.completeAddNoteWorkflowForDefaultUnit('Test note');
});
```

### 3. Mixing Both Approaches
```typescript
test('my test', async ({ page }) => {
  const steps = new FacilityManagementSteps(page);
  const facilityPage = new FacilityManagementPage(page);
  
  // High-level setup
  await steps.completeFacilitySetup(url);
  
  // Specific page interactions
  await facilityPage.addNote.enterNoteText('Specific text');
  await facilityPage.addNote.clearNoteText();
  await facilityPage.addNote.enterNoteText('New text');
  await facilityPage.addNote.submitNote();
});
```

## Migration Guide for Other Test Files

### Step 1: Update Imports
```typescript
// Add these imports to existing test files
import { FacilityManagementSteps } from '../src/steps/FacilityManagementSteps';
import { FacilityManagementPage } from '../src/pages';
```

### Step 2: Replace Duplicated Code
Find sections like:
```typescript
// OLD - Replace this pattern
await page.getByText('Select▾').first().click();
await page.getByText('storEDGE Demo').click();
await page.getByText('Select▾').first().click();
await page.getByText('CK Self Storage').click();
await page.getByText('Go').click();
```

With:
```typescript
// NEW - Use this instead
const steps = new FacilityManagementSteps(page);
await steps.completeFacilitySetup(testDataLoader.getLocalUrl());
```

### Step 3: Simplify Note Addition
Replace:
```typescript
// OLD
await page.getByText('+').first().click();
await page.getByRole('textbox', { name: 'Enter a short description...' }).fill('Test');
await page.getByText('Add Note').nth(1).click();
```

With:
```typescript
// NEW
await steps.openAddNoteDialog();
await steps.addNoteWithText('Test');
```

## Maintenance

### Adding New Locators
1. Add locators to the appropriate Page Object class
2. Create methods that use those locators
3. Optionally create high-level step definitions

### Updating Existing Locators
1. Update in the Page Object class (single location)
2. All tests using that locator automatically benefit

### New Workflows
1. Create new Page Object if needed
2. Create Step Definition methods for complex workflows
3. Update exports in `index.ts`

## Examples for Common Patterns

### Company Selection
```typescript
// Instead of: await page.getByText('Select▾').first().click();
await facilityPage.companySelection.selectCompany('Company Name');
```

### Unit Selection
```typescript
// Instead of: await page.getByText('API Unit-123').click();
await facilityPage.unitsList.selectUnitByName('API Unit-123');
```

### Add Note
```typescript
// Instead of: Multiple lines of form filling
await facilityPage.addNote.addNote('My note text');
```

This structure makes tests more maintainable, readable, and less prone to locator changes.