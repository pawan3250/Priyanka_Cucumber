import { Before, After, BeforeAll, AfterAll, ITestCaseHookParameter, Status } from '@cucumber/cucumber';

import { CustomWorld } from './world';
import { Browser, chromium, firefox, webkit } from '@playwright/test';
import { config } from '../config/config';

let browser: Browser;

BeforeAll(async function () {
    //cross browser logic:
    switch (config.browser.toLowerCase().trim()) {
        case 'firefox':
            browser = await firefox.launch({ headless: config.headless });
            break;
        case 'webkit':
            browser = await webkit.launch({ headless: config.headless });
            break;
        default:
            browser = await chromium.launch({ headless: config.headless });
            break;
    }
});

Before(async function (this: CustomWorld) {
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {

    if (scenario.result?.status === Status.FAILED && this.page) {
        const screenshot = await this.page.screenshot();
        this.attach(screenshot, 'image/png');
    }
    await this.page?.close();
    await this.context?.close();
});

AfterAll(async function () {
    await browser?.close();
});
