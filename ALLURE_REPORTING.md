# Allure Reporting Integration

This project includes Allure reporting for both Playwright and Cucumber tests!

## Overview

Allure provides beautiful, interactive HTML reports with detailed test execution information, screenshots, logs, and historical trends.

## Quick Start

### For Playwright Tests

```bash
# Run Playwright tests and generate + open Allure report
npm run test:allure

# Or step by step:
npm run test                    # Run tests
npm run allure:generate         # Generate report
npm run allure:open            # Open report in browser
```

### For Cucumber Tests

```bash
# Run Cucumber tests and generate + open Allure report
npm run test:cucumber:allure

# Or step by step:
npm run test:cucumber          # Run Cucumber tests
npm run allure:generate        # Generate report
npm run allure:open           # Open report in browser
```

### Serve Allure Report (Alternative)

```bash
# Run any tests, then serve the report (auto-refreshes)
npm run allure:serve
```

## Available NPM Scripts

| Script | Description |
|--------|-------------|
| `npm run test:allure` | Run Playwright tests + generate + open Allure report |
| `npm run test:cucumber:allure` | Run Cucumber tests + generate + open Allure report |
| `npm run allure:generate` | Generate Allure report from existing results |
| `npm run allure:open` | Open the generated Allure report in browser |
| `npm run allure:serve` | Start temporary web server with report (auto-refresh) |

## Configuration

### Playwright Configuration
Located in [playwright.config.ts](../playwright.config.ts):
```typescript
reporter: [
  ['html'],
  ['allure-playwright', {
    detail: true,
    outputFolder: 'allure-results',
    suiteTitle: false
  }]
]
```

### Cucumber Configuration
Located in [cucumber.config.js](../cucumber.config.js):
```javascript
format: [
  'progress',
  'html:reports/cucumber-report.html',
  'json:reports/cucumber-report.json',
  'allure-cucumberjs/reporter'
],
formatOptions: { 
  snippetInterface: 'async-await',
  resultsDir: 'allure-results'
}
```

## Report Features

Allure reports include:
- ✅ Test execution status (passed/failed/skipped)
- 📊 Test execution timeline
- 📈 Historical trends (requires multiple test runs)
- 🖼️ Screenshots on failures (when configured)
- 📝 Step-by-step test execution details
- 🏷️ Categories and tags
- 📎 Attachments and logs
- 🔄 Retry information
- ⏱️ Execution time statistics

## Directories

- **allure-results/** - Raw test results (generated after test runs)
- **allure-report/** - Generated HTML report (created by `allure:generate`)

Both directories are ignored in `.gitignore` and should not be committed.

## Enhancing Reports

### Add Descriptions in Tests

**Playwright:**
```typescript
import { test } from '@playwright/test';
import { allure } from 'allure-playwright';

test('my test', async ({ page }) => {
  await allure.description('Test description here');
  await allure.severity('critical');
  // ... test code
});
```

**Cucumber:**
Add descriptions and tags in your `.feature` files:
```gherkin
@critical @login
Feature: User Authentication
  As a user
  I want to be able to log in
  So that I can access my account

  @smoke
  Scenario: Successful login
    Given I am on the login page
    When I enter valid credentials
    Then I should be logged in
```

## Troubleshooting

- If reports don't generate, ensure tests have run first
- Clear old results: `rm -rf allure-results allure-report` (or `Remove-Item -Recurse -Force allure-results, allure-report` on PowerShell)
- Check that `allure-commandline` is properly installed

## CI/CD Integration

For CI environments, you can:
1. Run tests: `npm test` or `npm run test:cucumber`
2. Generate report: `npm run allure:generate`
3. Publish `allure-report` folder as artifact
