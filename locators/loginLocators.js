/**
 * Login Page Locators
 * All selectors for the login page elements
 */

module.exports = {
  // Input fields
  emailInput: 'input[name="unique-email-field"]',
  passwordInput: 'input[name="unique-password-field"]',

  // Buttons
  signInButton: 'button:has-text("Sign in")',
  forgotPasswordButton: 'button:has-text("Forgot Password")',
  registerButton: 'button:has-text("Register")',

  // Headings and text
  signInHeading: 'h2:has-text("Sign In")',
  dontHaveAccountText: "text=Don't have an account?",
  agentsTitleContainer: ".agents-container__title-container",

  // Error messages (to be verified when they appear)
  // Root of the MUI alert / snackbar
  errorMessageRoot: ".MuiPaper-root",
  // Inner text of the MUI alert
  errorMessageText: ".MuiAlert-message",
  // Field-level helper texts
  emailError: ".MuiFormHelperText-root",
  passwordError: ".MuiFormHelperText-root",

  // Logo
  logo: 'img[alt="logo"]',
};
