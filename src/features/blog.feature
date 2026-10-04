Feature: Blog Page Functionality

@blog
Scenario: Verify the blog page loads successfully
Given I am on the SDET Unicorns blog page
Then I should see the blog page heading "Blog"

@blog
Scenario: Verify blog posts are displayed on the page
Given I am on the SDET Unicorns blog page
Then I should see the following blog posts:
|postTitle                                              |
|IFrame Sample                                          |
|Successful Marketing Ads for Your Business             |
|Let’s Building Your Business from Scratch              |
|The Best Place to Invest Your Money                    |
|The Big Seminar for Your Right Investment              |
             

@blog
Scenario: Open a blog post from the blog listing
Given I am on the SDET Unicorns blog page
When I open the blog post "Successful Marketing Ads for Your Business"
Then I should see the blog article heading "Successful Marketing Ads for Your Business"

@blog
Scenario: Search for a blog post
Given I am on the SDET Unicorns blog page
When I search for "marketing"
Then I should see the blog article heading "Successful Marketing Ads for Your Business"
