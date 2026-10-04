Feature: Contact Page Functionality

@contact
Scenario: Verify the Contact page loads successfully
Given I am on the SDET Unicorns contact page
Then I should see the contact page heading "Contact"

@contact
Scenario: Verify the contact form is visible
Given I am on the SDET Unicorns contact page
Then I should see the contact form fields

@contact
Scenario: Submit the contact form with valid data
Given I am on the SDET Unicorns contact page
When I fill the contact form with valid details
And I submit the contact form
