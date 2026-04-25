import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";
import { LoginPage } from "../pages/Login.page";
import { ProductsPage } from "../pages/Products.page";
import { config } from "../config/config";

let loginPage: LoginPage;
let productPage: ProductsPage;

Given('I am logged in as a valid user', async function (this: CustomWorld) {
    loginPage = new LoginPage(this.page);
    productPage = new ProductsPage(this.page);

    await loginPage.navigate();
    await loginPage.enterUsername(config.users.standard.username);
    await loginPage.enterPassword(config.users.standard.password);
    await loginPage.clickLogin();
});

Then('I should see at least {int} product on the page', async function (this: CustomWorld, minCount: number) {
    const count = await productPage.getProductCount();  
    expect(count).toBeGreaterThanOrEqual(minCount);
});

When('I add {string} to the cart', async function (this: CustomWorld, productName: string) {
    await productPage.addProductToCart(productName);    
});

Then('the cart badge should show {string} item', async function (this: CustomWorld, expectedCount: string) {
    const actualCount = await productPage.getCartBadgeCount();
    expect(actualCount).toBe(expectedCount);
});

When('I sort products by {string}', async function (this: CustomWorld, sortOption: string) {
    await productPage.sortBy(sortOption);      
});


Then('the first product price should be the lowest', async function (this: CustomWorld) {
    const prices: number[] = await productPage.getAllPrices();  //[7.99, 9.99, 15.99, ....]
    const sortedPrices = prices.sort((a, b) => a - b); //[7.99, 8.99......]==>7.99
    console.log("the lowest price: " + sortedPrices[0]);
    expect(prices[0]).toBe(sortedPrices[0]);
});

