Feature: Contact Page Functionality

@contact
Scenario: Verify the contact form loads
Given I am on the QA Masters contact page
Then I should see the contact page heading "Send Us a Message"

@contact
Scenario: Verify the contact form fields are visible
Given I am on the QA Masters contact page
Then I should see the contact form fields

@contact
Scenario: Submit the contact form with valid data
Given I am on the QA Masters contact page
When I fill the contact form with valid details
And I submit the contact form
