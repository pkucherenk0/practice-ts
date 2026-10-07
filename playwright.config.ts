// Playwright Test runner config: browsers, retries, reporters, tracing, one typed file.
import os from 'node:os';
import { defineConfig, devices } from '@playwright/test';
import { API_BASE_URL, UI_BASE_URL } from './config/env';

const authFile = 'playwright/.auth/user.json';

export default defineConfig({
  testDir: './tests',
  forbidOnly: !!process.env.CI,

  // Run test files in parallel across worker processes.
  fullyParallel: true,
  ...(process.env.CI ? { workers: 4 } : {}),
  retries: process.env.CI ? 1 : 0,

  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    [
      'allure-playwright',
      {
        // Shown in the Environment widget on the report Overview.
        environmentInfo: {
          os_platform: os.platform(),
          node_version: process.version,
          ui_base_url: UI_BASE_URL,
          api_base_url: API_BASE_URL,
          ci: process.env.CI ? 'true' : 'false',
        },
      },
    ],
  ],

  use: {
    // fakestoreapi.com (API) is a different domain — the API client passes
    // absolute URLs itself, so this baseURL only ever applies to UI page.goto() calls.
    baseURL: UI_BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    launchOptions: { slowMo: Number(process.env.SLOWMO ?? 0) },
  },

  projects: [
    // Logs in once via the UI, saves the session to authFile. Every other
    // project depends on this and reuses the saved storageState instead of
    // repeating the login flow per test.
    { name: 'setup', testMatch: /.*\.setup\.ts/ },

    // Run the whole suite across chromium, firefox, webkit in one command.
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: authFile },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], storageState: authFile },
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], storageState: authFile },
      dependencies: ['setup'],
    },

    // Mobile emulation only matters for real browser pages, not the API project's
    // request context — restrict these two to tests/ui so API tests skip them.
    {
      name: 'mobile-chrome',
      testDir: './tests/ui',
      use: { ...devices['Pixel 7'], storageState: authFile },
      dependencies: ['setup'],
    },
    {
      name: 'mobile-safari',
      testDir: './tests/ui',
      use: { ...devices['iPhone 13'], storageState: authFile },
      dependencies: ['setup'],
    },
  ],
});
