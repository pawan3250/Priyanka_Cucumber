import { Before, After, BeforeAll, AfterAll, ITestCaseHookParameter, Status } from '@cucumber/cucumber';

import { CustomWorld } from './world';
import { Browser, chromium } from '@playwright/test';

let browser: Browser;

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
});

Before(async function (this: CustomWorld) {
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(30000);
    this.page.setDefaultNavigationTimeout(60000);
});

After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) { //current scenatrio

    if (scenario.result?.status === Status.FAILED && this.page) {
        const screenshot = await this.page.screenshot();
        this.attach(screenshot, 'image/png');//attach is a method from cucumber 
    }
    await this.page?.close();
    await this.context?.close();
});

AfterAll(async function () {
    await browser?.close();
});
