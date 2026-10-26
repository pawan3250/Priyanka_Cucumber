Feature: Curriculum Page Functionality

@curriculum
Scenario: Verify the curriculum section is visible
Given I am on the QA Masters home page
Then I should see the home navigation link "Curriculum"

@curriculum
Scenario: Open the curriculum CTA
Given I am on the QA Masters home page
When I click on the "Enroll Now" button
