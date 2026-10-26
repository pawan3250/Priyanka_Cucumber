Feature: Shop Page Functionality

@shop
Scenario: Verify the shop section is visible
Given I am on the QA Masters shop page
Then I should see the shop page heading "Train With QA Masters"

@shop
Scenario: Verify products can be added to cart
Given I am on the QA Masters shop page
When I click the first product add to cart button
