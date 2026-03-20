const { test, expect } = require('@playwright/test');
require('dotenv').config();

const { LoginPage } = require('../Playwright/Pages/LoginPage');

test('login test', async ({ page }) => {
  test.setTimeout(120000);

  const loginPage = new LoginPage(page);
  await loginPage.goto();

  await loginPage.login(
    process.env.TEST_EMAIL,
    process.env.TEST_PASSWORD
  );
  await loginPage.clickCreateAppointment();
  await page.waitForLoadState('networkidle');
  
});