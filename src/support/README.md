# Support Files

This folder contains support files for Cucumber/Playwright integration.

## Files

- **world.ts**: Custom World interface and constructor for sharing context between steps
- **hooks.ts**: Before/After hooks for test setup and teardown

## World

The `CustomWorld` interface extends Cucumber's World to include Playwright's `Page` and `BrowserContext`:

```typescript
export interface CustomWorld extends World {
  page: Page;
  context: BrowserContext;
}
```

## Hooks

Hooks are used to set up and tear down the test environment:

- **BeforeAll**: Launch browser once before all scenarios
- **Before**: Create new context and page before each scenario
- **After**: Close page and context after each scenario
- **AfterAll**: Close browser after all scenarios

## Customization

You can add more hooks or modify existing ones:

```typescript
Before({ tags: '@mobile' }, async function () {
  this.context = await browser.newContext({
    viewport: { width: 375, height: 667 }
  });
});
```
