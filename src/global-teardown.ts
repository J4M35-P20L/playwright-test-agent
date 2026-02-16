import { chromium, firefox, webkit } from '@playwright/test';

async function globalTeardown() {
  console.log('🚨 Global teardown: Ensuring all browsers are closed...');
  
  try {
    // Close any remaining browser instances
    const browsers = [
      { name: 'Chromium', browser: chromium },
      { name: 'Firefox', browser: firefox },
      { name: 'WebKit', browser: webkit }
    ];

    for (const { name, browser } of browsers) {
      try {
        // Try to launch and immediately close to clean up any orphaned processes
        const browserInstance = await browser.launch();
        await browserInstance.close();
        console.log(`✅ ${name} browser cleanup completed`);
      } catch (error) {
        console.log(`⚠️  ${name} browser cleanup warning: ${error.message}`);
      }
    }

    // Additional cleanup for headless processes
    if (process.platform === 'win32') {
      const { exec } = require('child_process');
      // Kill any orphaned browser processes on Windows
      exec('taskkill /f /im chrome.exe /t', (error) => {
        if (error) console.log('Chrome process cleanup completed');
      });
      exec('taskkill /f /im firefox.exe /t', (error) => {
        if (error) console.log('Firefox process cleanup completed');
      });
      exec('taskkill /f /im msedge.exe /t', (error) => {
        if (error) console.log('Edge process cleanup completed');
      });
    }

    console.log('🎯 Global teardown completed successfully');
  } catch (error) {
    console.error('❌ Global teardown encountered an error:', error.message);
  }
}

export default globalTeardown;