@products
Feature: Product Functionality

    Background:
        Given I am logged in as a valid user

    @smoke
    Scenario: Verify products are displayed on inventory page
         Then I should see at least 1 product on the page

    @regression @cart
    Scenario: Add a product to cart
        When I add "Sauce Labs Backpack" to the cart
        Then the cart badge should show "1" item

    @regression @sort
    Scenario: Sort products by price low to high
        When I sort products by "Price (low to high)"
        Then the first product price should be the lowest