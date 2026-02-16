# Page Objects

This folder contains Page Object Model (POM) classes for the application under test.

## Structure

- **BasePage.ts**: Base class with common methods used across all pages
- **SearchPage.ts**: Page object for search functionality
- **index.ts**: Central export file for all page objects

## Usage

```typescript
import { SearchPage } from '../pages/SearchPage';

const searchPage = new SearchPage(page);
await searchPage.searchFor('Playwright');
```

## Creating New Page Objects

1. Create a new file in this folder (e.g., `LoginPage.ts`)
2. Extend the `BasePage` class
3. Define selectors as private readonly properties
4. Implement methods for page interactions
5. Export the class in `index.ts`

Example:

```typescript
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput = '#username';
  private readonly passwordInput = '#password';
  private readonly loginButton = 'button[type="submit"]';

  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }
}
```
