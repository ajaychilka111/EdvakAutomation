const { test, expect } = require('@playwright/test');

test.skip(process.env.CI, 'Skip in CI');
test('loginEdvak', async ({ browser }) => {
  test.setTimeout(200000);

  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
  });

  const page = await context.newPage();

  await login(page);
  await createAppointment(page);
});

// ✅ Proper reusable functions
async function login(page) {
  await page.goto("https://darwinapi.edvak.com/", {
    waitUntil: 'domcontentloaded'
  });

  await page.locator('input[type="email"]').fill("cetej11208@codgal.com");
  await page.locator('input[type="password"]').fill("Admin@123");
  await page.locator('button:has-text("Login")').click()

  await expect(page.locator('[data-title=Dashboard]')).toBeVisible({ timeout: 60000 });
 
}

async function createAppointment(page) {
  await page.locator("[name='patient_list']").click();
 // await page.waitForLoadState('networkidle');
  await page.locator("[id='edicon-77-mask0_129_2481']").click();

}
