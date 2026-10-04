Feature: Shop Page Functionality

@shop
Scenario: Verify the shop page loads successfully
Given I am on the SDET Unicorns shop page
Then I should see the shop page heading "Shop"

@shop
Scenario: Verify products are displayed on the shop page
Given I am on the SDET Unicorns shop page
Then I should see the following products:
|productName|
|Branded Converse|
|Canon Antique Camera|
|Converse|
|Headphone|
|Ladies Jeans|
|Mini Speaker|

@shop
Scenario: Verify the product categories are visible
Given I am on the SDET Unicorns shop page
Then I should see the shop product category "Clothes"
Then I should see the shop product category "Shoes"
Then I should see the shop product category "Watch"
