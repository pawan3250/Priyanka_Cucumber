Feature: Blog Page Functionality

@blog
Scenario: Verify the blog navigation item is visible
Given I am on the QA Masters blog page
Then I should see the blog navigation link "Blog"

@blog
Scenario: Open the blog section from the home page
Given I am on the QA Masters blog page
When I open the blog section
Then I should see the blog content section
