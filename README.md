# triviat-qa

Repository used for Automation Tests with Playwright.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd triviat-qa
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests with UI mode (interactive)
```bash
npm run test:ui
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests in headed mode (visible browser)
```bash
npm run test:headed
```

### View test report
```bash
npm run test:report
```

## Project Structure

```
triviat-qa/
├── tests/              # Test files directory
├── playwright.config.js # Playwright configuration
├── package.json        # Project dependencies and scripts
└── README.md          # This file
```

## Configuration

The Playwright configuration is located in `playwright.config.js`. The default configuration includes:

- **Test Directory**: `./tests`
- **Browsers**: Chromium, Firefox, and WebKit
- **Parallel Execution**: Enabled
- **Retries**: 2 retries on CI, 0 locally
- **Reporter**: HTML reporter
- **Trace**: Collected on first retry

You can customize the configuration by editing `playwright.config.js`.

## Writing Tests

Create your test files in the `tests/` directory. Example test structure:

```javascript
const { test, expect } = require('@playwright/test');

test('example test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)
