import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { Page, BrowserContext } from '@playwright/test';

export interface CustomWorld extends World {
  page: Page;
  context: BrowserContext;
}

class CustomWorldConstructor extends World implements CustomWorld {
  page!: Page;
  context!: BrowserContext;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorldConstructor);
