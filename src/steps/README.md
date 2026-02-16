# Step Definitions

This folder contains Cucumber step definitions that map feature file steps to actual code implementation.

## Files

- **example.steps.ts**: Example step definitions for search functionality

## Usage

Step definitions use Cucumber expressions to match steps in feature files:

```typescript
Given('I navigate to {string}', async function (this: CustomWorld, url: string) {
  await this.page.goto(url);
});
```

## Creating New Step Definitions

1. Create a new file (e.g., `login.steps.ts`)
2. Import required dependencies
3. Use page objects for interactions
4. Implement step definitions using Given/When/Then

Example:

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';

Given('I am on the login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.navigate('/login');
});

When('I login with username {string} and password {string}', 
  async function (this: CustomWorld, username: string, password: string) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(username, password);
});
```
