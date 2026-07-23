// @ts-check
import { defineConfig, devices } from "@playwright/test";
import { time } from "node:console";


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./tests",
  timeout: 100 * 1000,
  expect: {
    timeout: 100 * 1000,
  },
   reporter: [
    ['html'],
    ['allure-playwright']
  ],
  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
        headless: false,
        screenshot: "on",
        video: "retain-on-failure",
        trace: "retain-on-failure",
      },
    },
    {
      name: "safari",
      use: {
        browserName: "webkit",
        headless: false,
        screenshot: "on",
        video: "retain-on-failure",
        trace: "retain-on-failure",
        
      },
    },
  ],
};
export default config;
