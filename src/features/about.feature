Feature: About Page Functionality

@about
Scenario: Verify the About page loads successfully
Given I am on the SDET Unicorns about page
Then I should see the about page heading "About"

@about
Scenario: Verify key about page sections are visible
Given I am on the SDET Unicorns about page
Then I should see the about page section "Our Story"
Then I should see the about page section "Our Mission"

@about
Scenario: Verify the contact link is visible on the About page
Given I am on the SDET Unicorns about page
Then I should see the about page link "Contact us"
