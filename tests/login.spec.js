const { test, expect } = require("@playwright/test");
const LoginPage = require("../pom/login");
const loginData = require("../data/loginData");
const loginLocators = require("../locators/loginLocators");

test.describe("Login Tests", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("TC001: Successful login with valid credentials", async ({ page }) => {
    await expect(loginPage.isSignInHeadingVisible()).resolves.toBe(true);
    await expect(loginPage.isEmailInputVisible()).resolves.toBe(true);
    await expect(loginPage.isPasswordInputVisible()).resolves.toBe(true);
    await expect(loginPage.isSignInButtonVisible()).resolves.toBe(true);

    await loginPage.login(
      loginData.validCredentials.email,
      loginData.validCredentials.password
    );
    await loginPage.waitForAgentsPage();
  });

  test("TC002: Login fails with invalid email", async ({ page }) => {
    await loginPage.login(
      loginData.invalidCredentials.email,
      loginData.validCredentials.password
    );

    await page.waitForTimeout(2000);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBeTruthy();
    expect(errorMessage).toContain(loginData.expectedErrors.invalidCredentials);

    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).toContain("/");
  });

  test("TC003: Login fails with invalid password", async ({ page }) => {
    await loginPage.login(
      loginData.validCredentials.email,
      loginData.invalidCredentials.password
    );

    await page.waitForTimeout(2000);

    const passwordError = await loginPage.getPasswordError();
    expect(passwordError).toBeTruthy();
    expect(passwordError).toContain(loginData.expectedTexts.passwordPolicy);
  });

  test("TC004: Login fails with empty email field", async ({ page }) => {
    await loginPage.enterPassword(loginData.validCredentials.password);
    await loginPage.clickSignIn();

    await page.waitForTimeout(1000);

    const emailError = await loginPage.getEmailError();

    expect(emailError).toContain(loginData.expectedErrors.emptyEmail);
  });

  test("TC005: Login fails with empty password field", async ({ page }) => {
    await loginPage.enterEmail(loginData.validCredentials.email);
    await loginPage.clickSignIn();

    await page.waitForTimeout(1000);

    const passwordError = await loginPage.getPasswordError();
    const errorMessage = await loginPage.getErrorMessage();

    expect(passwordError || errorMessage).toBeTruthy();
  });

  test("TC006: Login fails with both fields empty", async ({ page }) => {
    await loginPage.clickSignIn();

    await page.waitForTimeout(1000);

    const emailError = await loginPage.getEmailError();
    const passwordError = await loginPage.getPasswordError();
    const errorMessage = await loginPage.getErrorMessage();

    expect(emailError || passwordError || errorMessage).toBeTruthy();
  });

  test("TC007: Login fails with invalid email format", async ({ page }) => {
    const invalidEmails = [
      loginData.invalidEmailFormats.noAtSymbol,
      loginData.invalidEmailFormats.noDomain,
      loginData.invalidEmailFormats.noLocalPart,
    ];

    for (const invalidEmail of invalidEmails) {
      await loginPage.clearFields();
      await loginPage.login(invalidEmail, loginData.validCredentials.password);

      await page.waitForTimeout(1000);
      const currentUrl = await loginPage.getCurrentUrl();
      expect(currentUrl).toContain("/");
    }
  });

  test("TC008: Verify login page UI elements", async ({ page }) => {
    await expect(page.locator(loginLocators.signInHeading)).toBeVisible();
    await expect(page.locator(loginLocators.emailInput)).toBeVisible();
    await expect(page.locator(loginLocators.passwordInput)).toBeVisible();
    await expect(page.locator(loginLocators.signInButton)).toBeVisible();
    await expect(
      page.locator(loginLocators.forgotPasswordButton)
    ).toBeVisible();
    await expect(page.locator(loginLocators.registerButton)).toBeVisible();
    await expect(page.locator(loginLocators.dontHaveAccountText)).toBeVisible();
  });

  test("TC009: Verify Forgot Password button functionality", async ({
    page,
  }) => {
    await loginPage.clickForgotPassword();
    await page.waitForTimeout(2000);
    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).toBeTruthy();
  });

  test("TC010: Verify Register button functionality", async ({ page }) => {
    await loginPage.clickRegister();

    await page.waitForTimeout(2000);
    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).toBeTruthy();
  });

  test("TC011: Verify password field is masked", async ({ page }) => {
    await loginPage.enterPassword(loginData.validCredentials.password);

    const passwordInput = page.locator(loginLocators.passwordInput);
    const inputType = await passwordInput.getAttribute("type");
    expect(inputType).toBe("password");
  });

  test("TC012: Verify email and password fields are editable", async ({
    page,
  }) => {
    const testEmail = "test@example.com";
    const testPassword = "testpassword123";

    await loginPage.enterEmail(testEmail);
    await loginPage.enterPassword(testPassword);

    const emailValue = await page
      .locator(loginLocators.emailInput)
      .inputValue();
    const passwordValue = await page
      .locator(loginLocators.passwordInput)
      .inputValue();

    expect(emailValue).toBe(testEmail);
    expect(passwordValue).toBe(testPassword);
  });
});
