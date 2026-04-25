import { Page } from '@playwright/test';


export class ProductsPage {
    constructor(private page: Page) { }



    private locators = {
        inventoryItems: '.inventory_item',
        cartBadge: '.shopping_cart_link',
        sortDropDown: '[data-test="product-sort-container"]',
        itemPrices: '.inventory_item_price',
        addToCartBtn : (productName: string) => `//div[text()='${productName}']/ancestor::div[@class='inventory_item']//button`
    };

    async getProductCount() : Promise<number>{
        return await this.page.locator(this.locators.inventoryItems).count();
    }

    async addProductToCart(productName: string) {
        await this.page.locator(this.locators.addToCartBtn(productName)).click();
    }

    async getCartBadgeCount(): Promise<string | null> {
        return await this.page.locator(this.locators.cartBadge).textContent();
    }

    async sortBy(option: string) {
        await this.page.locator(this.locators.sortDropDown).selectOption({ label: option });
    }

    async getAllPrices(): Promise <number[]> {
        const priceTexts = await this.page.locator(this.locators.itemPrices).allTextContents();
        console.log("All the prices: " + priceTexts); //$29.99, $9.99
        return priceTexts.map(ele => parseFloat( ele.replace('$', ''))); //$29.99 --> "29.99" --> 29.99, 15.99, 14.99
    }

}