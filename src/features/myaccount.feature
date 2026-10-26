Feature: My Account Page Functionality

@myaccount
Scenario: Verify the My Account section is visible
Given I am on the QA Masters my account page
Then I should see the my account page heading "My Account"

@myaccount
Scenario: Verify the login form fields are visible
Given I am on the QA Masters my account page
Then I should see the login form fields

@myaccount
Scenario: Verify the registration form fields are visible
Given I am on the QA Masters my account page
Then I should see the register form fields
