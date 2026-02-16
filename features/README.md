# Cucumber Integration

This project now includes Cucumber (Gherkin) integration with Playwright!

## Directory Structure

```
features/
├── support/
│   ├── hooks.ts          # Before/After hooks for browser setup
│   └── world.ts          # Custom World for sharing context
├── step-definitions/
│   └── example.steps.ts  # Step definitions
└── example.feature       # Feature files (Gherkin syntax)
```

## Running Cucumber Tests

```bash
# Run all Cucumber tests
npm run test:cucumber

# Run with HTML report
npm run test:cucumber:report
```

## Writing Tests

### 1. Create Feature Files (`.feature`)
Write your test scenarios in Gherkin syntax in the `features/` directory.

Example:
```gherkin
Feature: Login functionality
  Scenario: Successful login
    Given I navigate to "https://example.com/login"
    When I enter username "user@example.com"
    And I enter password "password123"
    And I click the login button
    Then I should see the dashboard
```

### 2. Create Step Definitions (`.steps.ts`)
Implement the steps in TypeScript files in `features/step-definitions/`.

Example:
```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

Given('I navigate to {string}', async function (this: CustomWorld, url: string) {
  await this.page.goto(url);
});
```

## Configuration

- **cucumber.config.js**: Cucumber configuration
- **tsconfig.json**: TypeScript configuration for features
- **features/support/hooks.ts**: Browser lifecycle management
- **features/support/world.ts**: Custom World context

## Tips

- Access the Playwright `page` object via `this.page` in step definitions
- Access the browser `context` via `this.context`
- Reports are generated in the `reports/` directory
- Modify `features/support/hooks.ts` to customize browser options (headless, device emulation, etc.)
