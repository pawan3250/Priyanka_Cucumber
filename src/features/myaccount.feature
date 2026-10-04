Feature: My Account Page Functionality

@myaccount
Scenario: Verify the My Account page loads successfully
Given I am on the SDET Unicorns my account page
Then I should see the my account page heading "My account"

@myaccount
Scenario: Verify the login form is visible
Given I am on the SDET Unicorns my account page
Then I should see the login form fields

@myaccount
Scenario: Verify the registration form is visible
Given I am on the SDET Unicorns my account page
Then I should see the register form fields
