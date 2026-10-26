Feature: Home Page Functionality

@home1
Scenario: Verify the home page loads successfully
Given I am on the QA Masters home page
Then I should see the home page heading "Tain With QA Masters"

@home
Scenario Outline: Verify homepage navigation links are visible
Given I am on the QA Masters home page
Then I should see the home navigation link "<linkname>"

Examples:
| linkname |
| Home |
| Curriculum |
| Blog |
| Contacts |
| Shop |
| My Account |
| Cart |

@home
Scenario: Verify the contact form is visible on the home page
Given I am on the QA Masters home page
Then I should see the contact form fields

@home
Scenario: Add an item to the cart from the shop page
Given I am on the QA Masters home page
When I click on the "Shop" button
And I click on the "Add to Cart" button





