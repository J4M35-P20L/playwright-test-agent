/**
 * Browser cleanup utility for Playwright tests
 * Ensures browsers are properly closed after each test, regardless of result
 */

export class BrowserCleanup {
  /**
   * Standard afterEach hook for browser cleanup
   * Use this in your test files: test.afterEach(BrowserCleanup.afterEachCleanup);
   */
  static async afterEachCleanup({ page, browser, context }: {
    page?: any;
    browser?: any;
    context?: any;
  }) {
    try {
      // Close the page if it exists and is not already closed
      if (page && !page.isClosed()) {
        await page.close();
        console.log('✅ Page closed successfully');
      }
      
      // Close the context if it exists
      if (context) {
        await context.close();
        console.log('✅ Context closed successfully');
      }
      
      // Close the browser if it exists
      if (browser) {
        await browser.close();
        console.log('✅ Browser closed successfully');
      }
    } catch (error) {
      console.log('⚠️ Browser cleanup completed with warnings:', error instanceof Error ? error.message : String(error));
    }
  }

  /**
   * Force cleanup for emergency situations
   * Can be called manually when needed
   */
  static async forceCleanup() {
    try {
      const { chromium, firefox, webkit } = require('@playwright/test');
      
      const browsers = [chromium, firefox, webkit];
      
      for (const browser of browsers) {
        try {
          const instance = await browser.launch();
          await instance.close();
        } catch (error) {
          // Ignore errors during force cleanup
        }
      }
      
      console.log('🔧 Force cleanup completed');
    } catch (error) {
      console.error('❌ Force cleanup failed:', error instanceof Error ? error.message : String(error));
    }
  }
}

/**
 * Example usage in test files:
 * 
 * import { BrowserCleanup } from '../src/utils/browserCleanup';
 * 
 * test.describe('Your Test Suite', () => {
 *   test.afterEach(BrowserCleanup.afterEachCleanup);
 *   
 *   test('your test', async ({ page }) => {
 *     // Your test code here
 *   });
 * });
 */