class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');

    // ✅ Better selector strategies
    this.loginButton = page.locator('button:has-text("Login")');
    // OR:
    // this.loginButton = page.getByRole('button', { name: 'Login' });
    this.createAppointmentBtn = page.locator('[data-title="Patients"]');
  }

  async goto() {
    await this.page.goto('https://darwinapi.edvak.com/', {
     timeout: 120000, 
    // 'load' or 'commit' is often more stable than 'domcontentloaded'
    waitUntil: 'load'
    });
  }

  async login(email, password) {
    if (!email || !password) {
      throw new Error('Missing TEST_EMAIL or TEST_PASSWORD in .env');
    }
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    await Promise.all([
     this.page.waitForLoadState('networkidle'), // wait for navigation
      this.loginButton.click()
    ]);
  }

  async clickCreateAppointment() {
    
    await this.createAppointmentBtn.waitFor({ state: 'visible' ,timeout: 60000,});
    await this.createAppointmentBtn.click();
    this.page.waitForLoadState('networkidle');
  }

}

module.exports = { LoginPage };