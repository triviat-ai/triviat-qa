/**
 * Login Test Data
 * Contains test data, expected texts, and assertions for login tests
 */

module.exports = {
  // Valid credentials from environment variables
  validCredentials: {
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
  },

  // Invalid test data
  invalidCredentials: {
    email: "invalid@example.com",
    password: "wrongpassword123",
  },

  // Empty fields
  emptyFields: {
    email: "",
    password: "",
  },

  // Invalid email formats
  invalidEmailFormats: {
    noAtSymbol: "invalidemail.com",
    noDomain: "invalid@",
    noLocalPart: "@example.com",
    spaces: "invalid email@example.com",
    specialChars: "invalid@#$%^&*()@example.com",
  },

  // Short passwords
  shortPassword: {
    email: "test@example.com",
    password: "123",
  },

  // Expected texts and messages
  expectedTexts: {
    signInHeading: "Sign In",
    signInButton: "Sign in",
    forgotPasswordButton: "Forgot Password",
    registerButton: "Register",
    dontHaveAccountText: "Don't have an account?",
    passwordPolicy:
      "Password must contain at least 8 characters, including uppercase, lowercase, digit, and special character.",
  },

  // Expected error messages (adjust based on actual application behavior)
  expectedErrors: {
    invalidCredentials: "Password or email is incorrect.",
    emptyEmail: "Email is required",
    emptyPassword: "Password is required",
    invalidEmailFormat: "Please enter a valid email address",
    emptyFields: "Please fill in all fields",
  },

  // Test scenarios data
  testScenarios: {
    successfulLogin: {
      description: "User should be able to login with valid credentials",
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
      expectedUrl: "/dashboard",
      shouldRedirect: true,
    },
    invalidEmail: {
      description: "User should see error with invalid email",
      email: "invalid@example.com",
      password: process.env.PASSWORD,
      shouldShowError: true,
    },
    invalidPassword: {
      description: "User should see error with invalid password",
      email: process.env.EMAIL,
      password: "wrongpassword",
      shouldShowError: true,
    },
    emptyEmail: {
      description: "User should see error when email is empty",
      email: "",
      password: "somepassword",
      shouldShowError: true,
    },
    emptyPassword: {
      description: "User should see error when password is empty",
      email: process.env.EMAIL,
      password: "",
      shouldShowError: true,
    },
    emptyFields: {
      description: "User should see error when both fields are empty",
      email: "",
      password: "",
      shouldShowError: true,
    },
    invalidEmailFormat: {
      description: "User should see error with invalid email format",
      email: "notanemail",
      password: "somepassword",
      shouldShowError: true,
    },
  },
};
