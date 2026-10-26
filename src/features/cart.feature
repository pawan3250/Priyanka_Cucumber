Feature: Cart Page Functionality

@cart
Scenario: Verify the cart link is visible
Given I am on the QA Masters home page
Then I should see the cart link "Cart"

@cart
Scenario: Verify add to cart button is available on the shop page
Given I am on the QA Masters home page
When I click on the "Shop" button
Then I should see the add to cart button
