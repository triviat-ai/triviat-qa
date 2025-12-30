/**
 * Login Page Object Model
 * Contains all methods for interacting with the login page
 */

const loginLocators = require("../locators/loginLocators");

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to login page
   */
  async goto() {
    await this.page.goto("/");
  }

  /**
   * Fill email input field
   * @param {string} email - Email address to enter
   */
  async enterEmail(email) {
    await this.page.fill(loginLocators.emailInput, email);
  }

  /**
   * Fill password input field
   * @param {string} password - Password to enter
   */
  async enterPassword(password) {
    await this.page.fill(loginLocators.passwordInput, password);
  }

  /**
   * Click Sign In button
   */
  async clickSignIn() {
    await this.page.click(loginLocators.signInButton);
  }

  /**
   * Click Forgot Password button
   */
  async clickForgotPassword() {
    await this.page.click(loginLocators.forgotPasswordButton);
  }

  /**
   * Click Register button
   */
  async clickRegister() {
    await this.page.click(loginLocators.registerButton);
  }

  /**
   * Perform complete login action
   * @param {string} email - Email address
   * @param {string} password - Password
   */
  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignIn();
  }

  /**
   * Get error message text if present
   * @returns {Promise<string|null>} Error message text or null
   */
  async getErrorMessage() {
    try {
      const messageLocator = this.page
        .locator(loginLocators.errorMessageText)
        .first();
      if (await messageLocator.isVisible({ timeout: 3000 })) {
        const text = await messageLocator.textContent();
        if (text && text.trim().length > 0) return text.trim();
      }
      const rootLocator = this.page
        .locator(loginLocators.errorMessageRoot)
        .first();
      if (await rootLocator.isVisible({ timeout: 3000 })) {
        const text = await rootLocator.textContent();
        if (text && text.trim().length > 0) return text.trim();
      }
    } catch (e) {}
    return null;
  }

  /**
   * Get email field error message
   * @returns {Promise<string|null>} Error message text or null
   */
  async getEmailError() {
    try {
      const errorElement = await this.page
        .locator(loginLocators.emailError)
        .first();
      if (await errorElement.isVisible({ timeout: 2000 })) {
        return await errorElement.textContent();
      }
    } catch (e) {}
    return null;
  }

  /**
   * Get password field error message
   * @returns {Promise<string|null>} Error message text or null
   */
  async getPasswordError() {
    try {
      const errorElement = await this.page
        .locator(loginLocators.passwordError)
        .first();
      if (await errorElement.isVisible({ timeout: 2000 })) {
        return await errorElement.textContent();
      }
    } catch (e) {}
    return null;
  }

  /**
   * Check if Sign In heading is visible
   * @returns {Promise<boolean>}
   */
  async isSignInHeadingVisible() {
    return await this.page.locator(loginLocators.signInHeading).isVisible();
  }

  /**
   * Check if email input is visible
   * @returns {Promise<boolean>}
   */
  async isEmailInputVisible() {
    return await this.page.locator(loginLocators.emailInput).isVisible();
  }

  /**
   * Check if password input is visible
   * @returns {Promise<boolean>}
   */
  async isPasswordInputVisible() {
    return await this.page.locator(loginLocators.passwordInput).isVisible();
  }

  /**
   * Check if Sign In button is visible
   * @returns {Promise<boolean>}
   */
  async isSignInButtonVisible() {
    return await this.page.locator(loginLocators.signInButton).isVisible();
  }

  /**
   * Get current URL
   * @returns {Promise<string>}
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Wait for page to load
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForSelector(loginLocators.signInHeading);
  }

  /**
   * Wait for post-login Agents page (or main app) to be visible
   */
  async waitForAgentsPage() {
    await this.page.waitForTimeout(500);
    await this.page.waitForSelector(loginLocators.agentsTitleContainer);
  }

  /**
   * Clear email field
   */
  async clearEmail() {
    await this.page.fill(loginLocators.emailInput, "");
  }

  /**
   * Clear password field
   */
  async clearPassword() {
    await this.page.fill(loginLocators.passwordInput, "");
  }

  /**
   * Clear both fields
   */
  async clearFields() {
    await this.clearEmail();
    await this.clearPassword();
  }
}

module.exports = LoginPage;
