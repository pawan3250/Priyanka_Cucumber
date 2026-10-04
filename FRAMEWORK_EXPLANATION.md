# Playwright Cucumber TypeScript Framework Explanation

## 1. What This Framework Is

This is a test automation framework built using:

- Playwright
- Cucumber
- TypeScript
- Page Object Model
- Cucumber HTML and JSON reports
- Optional Allure report generation

Playwright is used to automate browser actions such as opening a page, clicking a button, validating text, switching tabs, and checking elements.

Cucumber is used to write test scenarios in a readable format called Gherkin. Gherkin uses keywords such as `Feature`, `Scenario`, `Given`, `When`, `Then`, and `And`.

TypeScript gives type safety and helps catch coding mistakes before runtime.

The Page Object Model keeps locators and page-specific methods in separate page classes, so the step definition files stay clean and readable.

## 2. High-Level Execution Flow

The framework execution flow is:

```text
Feature File
    |
    v
Step Definition
    |
    v
Page Object Class
    |
    v
Playwright Browser Action
    |
    v
Assertion
    |
    v
Report
```

Example:

```gherkin
Then I should see the home page heading "Think different. Make different."
```

This step is matched with a step definition:

```ts
Then('I should see the home page heading {string}', async function (expectedHeading: string) {
  await expect(homePage.mainHeading).toHaveText(expectedHeading);
});
```

The step definition uses the `HomePage` page object:

```ts
this.mainHeading = page.getByRole('heading', { name: 'Think different. Make different.' });
```

So the plain English step from the feature file becomes a real Playwright browser validation.

## 3. Project Folder Structure

Current framework structure:

```text
PriyankaCucumberPlaywright2026
│
├── cucumber.json
├── package.json
├── tsconfig.json
│
├── scripts
│   ├── run-tests.js
│   └── generate-allure-results.js
│
├── src
│   ├── features
│   │   ├── home.feature
│   │   └── blog.feature
│   │
│   ├── pages
│   │   ├── Home.page.ts
│   │   └── Blog.page.ts
│   │
│   ├── steps
│   │   ├── home.step.ts
│   │   └── blog.step.ts
│   │
│   └── support
│       ├── hooks.ts
│       ├── world.ts
│       └── PlaywrightUtils.ts
│
└── reports
```

## 4. Feature Files

Feature files are stored in:

```text
src/features
```

Feature files describe the test scenarios in business-readable language.

Example from `home.feature`:

```gherkin
Feature: Home Page Functionality

@Login
Scenario: Verify the home loads successfully
Given I am on the SDET Unicorns home Page
Then I should see the home page heading "Think different. Make different."
And I should see the special sale heading "Special Sale: Elevate Your SDET Skills!"
```

Explanation:

- `Feature` describes the functionality being tested.
- `Scenario` describes one test case.
- `Given` describes the precondition.
- `When` describes the action.
- `Then` describes the expected result.
- `And` continues the previous step type.
- Tags such as `@Login`, `@data`, `@datatable`, and `@home` allow us to run selected scenarios.

## 5. Scenario Outline

A Scenario Outline is used when the same scenario should run with different test data.

Example:

```gherkin
Scenario Outline: Verify homepage navigation links are visible
Given I am on the SDET Unicorns home Page
Then I should see the home navigation link "<linkname>"

Examples:
| linkname   |
| Home       |
| About      |
| Shop       |
| Blog       |
| Contact    |
| My account |
```

This scenario runs once for each row in the `Examples` table.

So the same step runs for:

- Home
- About
- Shop
- Blog
- Contact
- My account

This reduces duplicate scenarios and makes data-driven testing easier.

## 6. Data Table

A Data Table is used when we want to pass multiple values into one step.

Example:

```gherkin
Then I should see the following pricing plans:
| planName |
| Silver   |
| Gold     |
| Platinum |
```

Matching step definition:

```ts
Then('I should see the following pricing plans:', async function (dataTable: DataTable) {
  const plans = dataTable.hashes().map((row) => row.planName);

  for (const plan of plans) {
    await expect(homePage.getPricingPlan(plan)).toBeVisible();
  }
});
```

Explanation:

- `dataTable.hashes()` converts the Gherkin table into an array of objects.
- `row.planName` reads the value from the `planName` column.
- The loop validates each pricing plan on the page.

## 7. Step Definitions

Step definition files are stored in:

```text
src/steps
```

Step definitions connect feature-file steps to automation code.

Example:

```ts
Given('I am on the SDET Unicorns home Page', async function () {
  homePage = new HomePage(this.page);
  await homePage.navigate();
});
```

Explanation:

- Cucumber reads the feature file step.
- It finds the matching step definition text.
- The step definition creates a page object.
- The page object performs the actual browser action.

Another example:

```ts
Then('I should see the home navigation link {string}', async function (linkName: string) {
  await expect(homePage.getNavigationLink(linkName)).toBeVisible();
});
```

Here `{string}` means the value is dynamic.

This feature step:

```gherkin
Then I should see the home navigation link "Blog"
```

passes `Blog` into the step definition as `linkName`.

## 8. Page Object Model

Page object files are stored in:

```text
src/pages
```

The Page Object Model keeps page locators and page actions in one place.

Example:

```ts
export class HomePage {
  readonly page: Page;
  readonly mainHeading: Locator;
  readonly specialSaleHeading: Locator;
  readonly learnMoreLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainHeading = page.getByRole('heading', { name: 'Think different. Make different.' });
    this.specialSaleHeading = page.getByText('Special Sale: Elevate Your SDET Skills!');
    this.learnMoreLink = page.getByRole('link', { name: 'Learn more' }).first();
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://practice.sdetunicorns.com/', { waitUntil: 'domcontentloaded' });
  }
}
```

Benefits:

- Locators are maintained in one file.
- Step definitions become cleaner.
- If a locator changes, we update only the page object.
- Page-specific actions stay reusable.
- The framework becomes easier to scale.

## 9. Hooks

Hooks are stored in:

```text
src/support/hooks.ts
```

Hooks control setup and cleanup.

Important hooks:

```ts
BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});
```

This launches the browser before all scenarios.

```ts
Before(async function () {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});
```

This creates a fresh browser context and page before each scenario.

```ts
After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, 'image/png');
  }

  await this.page?.close();
  await this.context?.close();
});
```

This takes a screenshot when a scenario fails, then closes the page and context.

```ts
AfterAll(async function () {
  await browser?.close();
});
```

This closes the browser after all scenarios finish.

## 10. World File

The world file is stored in:

```text
src/support/world.ts
```

The World object is shared across step definitions.

Example:

```ts
export class CustomWorld extends World {
  context!: BrowserContext;
  page!: Page;
  scenarioName = '';
}
```

Purpose:

- Stores the current browser context.
- Stores the current page.
- Allows different step definitions in the same scenario to use the same browser page.

Without the World object, each step would not easily share the same Playwright page.

## 11. Utility File

Utility methods are stored in:

```text
src/support/PlaywrightUtils.ts
```

This file contains reusable helper methods.

Examples:

```ts
static async checkCheckbox(locator: Locator): Promise<void> {
  if (!(await locator.isChecked())) {
    await locator.check();
  }
}
```

This checks a checkbox only if it is not already checked.

```ts
static async switchtoparentPage(context: BrowserContext, currentPage: Page): Promise<Page> {
  const pages = context.pages();

  if (pages.length <= 1) {
    return currentPage;
  }

  const parentPage = pages[0];
  await parentPage.bringToFront();
  return parentPage;
}
```

This helps switch back to the parent browser tab.

Utility files are useful when the same logic is needed in multiple places.

## 12. Cucumber Configuration

Configuration is stored in:

```text
cucumber.json
```

Example:

```json
{
  "default": {
    "require": ["src/steps/**/*.ts", "src/support/**/*.ts"],
    "requireModule": ["ts-node/register"],
    "paths": ["src/features/**/*.feature"],
    "format": [
      "progress",
      "html:reports/cucumber-report.html",
      "json:reports/cucumber-results.json"
    ],
    "formatOptions": { "snippetInterface": "async-await" }
  }
}
```

Explanation:

- `paths` tells Cucumber where feature files are located.
- `require` tells Cucumber where step definitions and support files are located.
- `requireModule` allows Cucumber to execute TypeScript files using `ts-node/register`.
- `format` controls the reports generated after execution.
- `html:reports/cucumber-report.html` generates an HTML report.
- `json:reports/cucumber-results.json` generates a JSON report.

## 13. Package Scripts

Scripts are stored in:

```text
package.json
```

Important commands:

```bash
npm test
```

Runs the Cucumber tests.

```bash
npm run test:home
```

Runs scenarios with the `@home` tag.

```bash
npm run test:allure
```

Runs tests and generates Allure results.

```bash
npm run allure:report
```

Generates the Allure HTML report.

```bash
npm run allure:open
```

Opens the Allure report.

## 14. Tags

Tags are used to group and selectively run scenarios.

Example:

```gherkin
@home
Scenario: click on learn more
```

Run only this tagged scenario:

```bash
npm run test:home
```

Tags are useful for:

- Smoke tests
- Regression tests
- Module-wise execution
- Running one feature area
- Separating stable and work-in-progress tests

## 15. Reports

The framework generates reports under:

```text
reports
```

Cucumber reports:

```text
reports/cucumber-report.html
reports/cucumber-results.json
```

Allure results:

```text
reports/allure-results
```

Allure report:

```text
reports/allure-report
```

Reports help review:

- Passed scenarios
- Failed scenarios
- Failed step details
- Error messages
- Screenshots for failed tests

## 16. How a Test Runs Internally

Consider this scenario:

```gherkin
Scenario: Verify the home loads successfully
Given I am on the SDET Unicorns home Page
Then I should see the home page heading "Think different. Make different."
```

Internal execution:

1. Cucumber reads `home.feature`.
2. Cucumber finds the matching `Given` step in `home.step.ts`.
3. The `Given` step creates a `HomePage` object.
4. `HomePage.navigate()` opens the website using Playwright.
5. Cucumber moves to the `Then` step.
6. The `Then` step validates the heading.
7. Playwright checks the actual page text.
8. Cucumber records pass or fail.
9. Report files are generated.

## 17. Current Framework Status

Current completed area:

- Home page feature
- Home page step definitions
- Home page object
- Browser setup and teardown
- Screenshot on failure
- Cucumber HTML and JSON report setup
- Allure result generation script

Current placeholder area:

- `blog.feature` is currently empty.
- `blog.step.ts` currently has imports only.
- `Blog.page.ts` has page object locators and methods ready for future blog tests.

This means the Home module is ready for demonstration and practice. The Blog module can be used as an assignment or next enhancement.

## 18. Good Practices Used In This Framework

The framework follows these good practices:

- Feature files are separate from automation code.
- Step definitions are separate from page locators.
- Page Object Model is used.
- Browser setup and cleanup are handled in hooks.
- A custom World object shares `page` and `context`.
- TypeScript is used with strict mode.
- Reports are generated automatically.
- Screenshots are attached for failed scenarios.
- Tags are used for selective execution.

## 19. Suggested Explanation For Students

You can explain it like this:

```text
In this framework, Cucumber is responsible for reading the test scenarios written in English.
Each Gherkin step is connected to a TypeScript step definition.
The step definition calls a page object method or locator.
The page object uses Playwright to interact with the browser.
Hooks open and close the browser.
World shares the browser page between steps.
Reports are generated after execution.
```

Short version:

```text
Feature files describe what to test.
Step definitions describe how to test.
Page objects store where and how to interact with the page.
Hooks manage browser setup and cleanup.
Playwright performs the real browser automation.
```

## 20. Recommended Next Improvements

These improvements are optional but useful before expanding the framework:

- Add actual blog scenarios in `blog.feature`.
- Add matching blog step definitions in `blog.step.ts`.
- Rename methods to consistent casing, for example `selectByValue` instead of `selectByvalue`.
- Add environment configuration for URLs.
- Add browser configuration for headless or headed mode.
- Add reusable fixture or config for timeout values.
- Add README setup instructions.
- Add more tags such as `@smoke` and `@regression`.

The framework is ready to share for learning the core Playwright Cucumber structure, especially for the Home page flow.
